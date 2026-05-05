// Generates per-page .md files and llms-full.txt from the pSEO source.
// Run via `npm run prebuild` (executed automatically before `build`).
//
// Inputs:
//   src/lib/pseo-pages/*.ts       — one file per pSEO page (regex-parsed)
//   Hand-coded marketing sections — Home, Features, Pricing, Markets
//
// Outputs:
//   public/p/<slug>.md            — one .md per pSEO page (URL: /p/<slug>.md)
//   public/index.md               — homepage content
//   public/features.md
//   public/pricing.md
//   public/markets.md
//   public/llms-full.txt          — concatenation of everything for AI ingestion

import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pseoDir = resolve(root, 'src/lib/pseo-pages');
const publicDir = resolve(root, 'public');
const pOutDir = resolve(publicDir, 'p');

const SITE = 'https://polyhistorical.com';

// ─── Parsing ────────────────────────────────────────────────────────────────

const FIELD_RE = (name) => new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);

function extractStringField(src, name) {
  const m = src.match(FIELD_RE(name));
  return m ? m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;
}

function extractContent(src) {
  // content is always the last field, ending with `,\n};
  const m = src.match(/content:\s*`([\s\S]+?)`,\s*};\s*\n?\s*(?:export\s+default)/);
  if (!m) throw new Error('content template literal not found');
  return m[1];
}

function parsePseoFile(src) {
  return {
    slug: extractStringField(src, 'slug'),
    title: extractStringField(src, 'title'),
    metaTitle: extractStringField(src, 'metaTitle'),
    metaDescription: extractStringField(src, 'metaDescription'),
    excerpt: extractStringField(src, 'excerpt'),
    categorySlug: extractStringField(src, 'categorySlug'),
    categoryName: extractStringField(src, 'categoryName'),
    contentHtml: extractContent(src),
  };
}

// ─── HTML → Markdown ────────────────────────────────────────────────────────

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&apos;': "'", '&nbsp;': ' ',
  '&#10003;': '✓', '&#10007;': '✗', '&check;': '✓', '&cross;': '✗',
  '&mdash;': '—', '&ndash;': '–', '&hellip;': '…',
  '&rsquo;': '’', '&lsquo;': '‘',
  '&rdquo;': '”', '&ldquo;': '“',
};

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-zA-Z]+;|&#\d+;/g, (m) => ENTITIES[m] ?? m);
}

function inlineToMd(html) {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '  \n')
      .replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**')
      .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
      .replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*')
      .replace(/<i>([\s\S]*?)<\/i>/gi, '*$1*')
      .replace(/<code>([\s\S]*?)<\/code>/gi, (_, x) => '`' + decodeEntities(x) + '`')
      .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
      .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1')
  ).replace(/\s+/g, ' ').trim();
}

function tableToMd(tableHtml) {
  // Extract rows; treat <th> as header row, all <tr> in tbody as body rows.
  const rows = [];
  const trMatches = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  let headerCols = null;
  for (const tr of trMatches) {
    const cells = [...tr[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => inlineToMd(m[2]));
    if (!cells.length) continue;
    const isHeader = /<th\b/i.test(tr[1]);
    if (isHeader && !headerCols) {
      headerCols = cells;
    } else {
      rows.push(cells);
    }
  }
  if (!headerCols && rows.length) {
    headerCols = rows.shift();
  }
  if (!headerCols) return '';
  const width = headerCols.length;
  const lines = [];
  lines.push('| ' + headerCols.map(escPipe).join(' | ') + ' |');
  lines.push('| ' + Array(width).fill('---').join(' | ') + ' |');
  for (const row of rows) {
    const padded = row.concat(Array(Math.max(0, width - row.length)).fill(''));
    lines.push('| ' + padded.slice(0, width).map(escPipe).join(' | ') + ' |');
  }
  return lines.join('\n') + '\n\n';
}

function escPipe(s) {
  return String(s).replace(/\|/g, '\\|');
}

function listToMd(html, ordered) {
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => inlineToMd(m[1]));
  return items.map((it, i) => (ordered ? `${i + 1}. ${it}` : `- ${it}`)).join('\n') + '\n\n';
}

function htmlToMarkdown(html) {
  // Walk top-level block elements in order. Use a regex that captures
  // <h1-6>, <p>, <pre>, <ul>, <ol>, <table>, <blockquote>, <hr>.
  const blockRe = /<(h[1-6]|p|pre|ul|ol|table|blockquote|hr)\b[^>]*>([\s\S]*?)<\/\1>|<hr\s*\/?>/gi;
  let out = '';
  let lastEnd = 0;
  for (const m of html.matchAll(blockRe)) {
    // Anything in between top-level blocks gets dropped (it's whitespace in practice).
    lastEnd = m.index + m[0].length;
    if (m[0].match(/^<hr/i)) {
      out += '---\n\n';
      continue;
    }
    const tag = m[1].toLowerCase();
    const inner = m[2];
    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag[1]);
      out += '#'.repeat(level) + ' ' + inlineToMd(inner) + '\n\n';
    } else if (tag === 'p') {
      const text = inlineToMd(inner);
      if (text) out += text + '\n\n';
    } else if (tag === 'pre') {
      const codeMatch = inner.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
      const body = decodeEntities(codeMatch ? codeMatch[1] : inner).replace(/^\n+|\n+$/g, '');
      out += '```\n' + body + '\n```\n\n';
    } else if (tag === 'ul') {
      out += listToMd(inner, false);
    } else if (tag === 'ol') {
      out += listToMd(inner, true);
    } else if (tag === 'table') {
      out += tableToMd(inner);
    } else if (tag === 'blockquote') {
      const text = inlineToMd(inner);
      out += text.split('\n').map((l) => '> ' + l).join('\n') + '\n\n';
    }
  }
  return out.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// ─── Hand-coded marketing-page markdown ─────────────────────────────────────

const homeMd = `# PolyHistorical — Polymarket Order Book Data API

> 300ms order book snapshots for every BTC, ETH, and SOL Polymarket market. Full bid/ask depth, 13,000+ resolved markets. Built for traders, bots, and researchers.

PolyHistorical is an independent historical-data API for Polymarket prediction markets. It is not affiliated with, endorsed by, or connected to Polymarket or any exchange. The product captures the full Level-2 order book at 300ms intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.

## What you get

- **Order book depth** — every bid, every ask, every price level, for both UP and DOWN tokens. Compute realistic slippage, model fills, measure liquidity.
- **300ms snapshots** — sub-second resolution lets you see depth shifts that minute-level candles hide.
- **REST API** — sub-50ms responses, pagination, filtering, rate limits suitable for both manual research and automated workloads.
- **Strategy Replay (Pro)** — pick a resolved market, define entry/exit rules in dropdowns, watch the market replay tick-by-tick with your strategy applied. PnL, drawdown, slippage, and win rate computed from real fills on the actual order book.
- **Complete archive** — markets stay available forever after resolution, with winners, final volumes, and settlement metadata preserved.

## Markets covered

- BTC Up/Down — 5m, 15m, 1h, 4h, 24h
- ETH Up/Down — 5m, 15m, 1h
- SOL Up/Down — 5m, 15m, 1h

Reference prices sourced from Binance and Chainlink. 13,000+ resolved markets in the archive.

## Pricing summary

- **Starter** — Free, no credit card. BTC last 50 (5m & 15m), last 24 (1h & 4h), last 5 (24h). 60 req/min, 1,000 req/day.
- **Pro** — $11/month. All BTC, ETH, SOL markets, unlimited history, Strategy Replay, priority support. 300 req/min, 50,000 req/day.
- **Enterprise** — Custom. Custom endpoints, dedicated infra, flexible rate limits, hands-on onboarding.

See [pricing.md](${SITE}/pricing.md) for full details.

## FAQ

### Is PolyHistorical affiliated with Polymarket?

No. PolyHistorical is an independent data provider, not affiliated with, endorsed by, or connected to Polymarket or any exchange.

### How granular is the snapshot data?

Full order book state at 300ms intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.

### Is the API built for automated access?

Yes. Sub-50ms responses, pagination, filtering, and rate limits designed for both manual research and automated workloads.

### What markets are supported?

BTC Up/Down across 5m, 15m, 1h, 4h, and 24h timeframes; ETH and SOL across 5m, 15m, and 1h. Each market includes complete order book history from open to resolution.

### How is this different from candle/OHLC data?

Candles summarize price movement. PolyHistorical gives you the full order book — every bid, every ask, every price level. You can simulate realistic fills with actual slippage, measure spread dynamics, and see depth shifts that candles hide.

### Can I try before paying?

Yes. The free Starter tier gives you access to recent BTC markets with full order book depth and 300ms resolution. No credit card required.

### Can I see how my strategy would have played out on a past market?

Yes. Pro includes Strategy Replay. Pick any resolved market, define entry/exit rules with dropdowns, and watch the market replay tick-by-tick with your strategy applied. PnL, drawdown, slippage, and win rate are computed from real fills on the actual order book, not estimates.
`;

const featuresMd = `# Features

> Full order book depth, sub-second snapshots, and a fast REST API for Polymarket BTC, ETH, and SOL Up/Down historical data.

## Strategy Replay (Pro)

Pick a resolved market, define entry and exit rules in dropdowns, and watch the market replay tick-by-tick with your strategy applied.

- No-code condition builder
- Tick-by-tick playback
- Real fills + slippage
- PnL, drawdown, win rate

## Order Book Depth

Every bid and ask at every price level for UP and DOWN tokens. Compute slippage, model fills, and measure real liquidity.

- Full bid/ask ladder
- Both UP & DOWN books
- Size at each level
- Synced with BTC/ETH/SOL price

## Sub-second Resolution

Snapshots faster than once per second. Each one timestamped and paired with BTC/ETH reference prices from Binance and Chainlink.

- <1s capture interval (300ms)
- ISO 8601 timestamps
- Binance + Chainlink feeds
- BTC, ETH & SOL markets

## Fast API

Responses under 50ms. Built for backtesting loops that iterate over thousands of snapshots without waiting.

- <50ms latency
- Efficient pagination
- Optional depth param
- Compressed responses

## REST + JSON

Standard REST endpoints. Filter by coin, timeframe, resolved status. Include or exclude orderbook depth per request.

- GET-only interface
- Query string filters
- Consistent envelope
- Detailed error codes

## Complete Archive

Markets stay available forever after resolution. Winners, final volumes, and settlement metadata preserved.

- 31+ days retained
- Winner + settlement
- Final volume data
- Full snapshot history

## Market Metadata

Every market includes slug, IDs, start/end times, condition/CLOB tokens, and resolution status out of the box.

- Polymarket IDs
- CLOB token pairs
- Start / end times
- Resolution metadata

## Use cases

- **Strategy Backtesting** — Simulate order placement against real historical depth. Know exactly what would have filled, at what price, and when.
- **Liquidity Research** — Measure how spreads, depth, and book imbalance evolve from market open through resolution across timeframes.
- **Bot Development** — Train and validate market-making or signal-based bots on deterministic historical data before deploying capital.
`;

const pricingMd = `# Pricing

> Simple pricing for Polymarket historical data. Free tier included. Pro and Enterprise plans for full order book access.

Start free. Upgrade when you need unlimited history or higher throughput.

## Plans

### Starter — $0 (no credit card)

Market access:
- BTC 5m & 15m — Last 50
- BTC 1h & 4h — Last 24
- BTC 24h — Last 5

Includes:
- Sub-second granularity
- Order book depth
- 60 req/min, 1,000 req/day
- 1 API key

Excludes: ETH markets, SOL markets, unlimited history, Strategy Replay, priority support.

### Pro — $11/month

Market access:
- BTC 5m, 15m, 1h, 4h, 24h — All
- ETH 5m, 15m, 1h — All
- SOL 5m, 15m, 1h — All

Includes:
- Everything in Starter
- Unlimited market history
- ETH & SOL market data
- No-code Strategy Replay
- Priority support
- 300 req/min, 50,000 req/day
- 3 API keys

### Enterprise — Custom

- All markets
- Custom endpoints
- Dedicated infrastructure
- Flexible rate limits
- No-code Strategy Replay
- Hands-on onboarding
- Custom rate limits, unlimited daily requests
- Up to 33 API keys

Contact: support@polyhistorical.com

## Rate limits

| Plan | Req/min | Req/day |
| --- | --- | --- |
| Starter | 60 | 1,000 |
| Pro | 300 | 50,000 |
| Enterprise | Custom | Unlimited |

## FAQ

### Can I switch plans anytime?

Yes. Upgrades take effect immediately. Downgrades apply at the end of the current billing cycle.

### What payment methods work?

Visa, MasterCard, American Express, PayPal, and cryptocurrency (BTC, ETH, USDT, and more via Cryptomus). Enterprise customers can also pay by invoice.

### Is there a Pro trial?

The free tier lets you evaluate the data with full depth and resolution. Need to test Pro limits? Reach out and we can arrange access.

### What happens if I exceed rate limits?

The API returns 429 with a Retry-After header. Upgrade to Pro or Enterprise for higher limits.

### What is Strategy Replay?

A no-code feature included with Pro and Enterprise. Pick any resolved market, define entry/exit conditions in dropdowns, and watch the market replay tick-by-tick with your strategy applied. Get PnL, win rate, max drawdown, and slippage from real fills on the actual order book.
`;

const marketsMd = `# Markets

> Browse every Polymarket Up/Down market PolyHistorical archives, with complete order book history from open to resolution.

## Coverage

| Coin | Timeframes |
| --- | --- |
| BTC | 5m, 15m, 1h, 4h, 24h |
| ETH | 5m, 15m, 1h |
| SOL | 5m, 15m, 1h |

Every market includes:
- Polymarket slug and IDs
- Condition/CLOB tokens
- Start and end times
- Resolution status and winner
- Full 300ms order book snapshots from open through resolution
- BTC/ETH/SOL reference prices from Binance and Chainlink

## How Up/Down markets work

Each Up/Down market is a binary prediction market with two outcomes — **Up** and **Down**. Traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price equals the implied probability that the market is assigning to each outcome.

A 5-minute BTC Up/Down market opens, runs for five minutes, then resolves Up if BTC closed higher than the open price (or Down if it closed lower). The order book during that five-minute window is what PolyHistorical captures at 300ms resolution.

## Live odds

- [Polymarket BTC odds today](${SITE}/p/polymarket-btc-odds-today)
- [Polymarket ETH odds today](${SITE}/p/polymarket-eth-odds-today)
- [Polymarket SOL odds today](${SITE}/p/polymarket-sol-odds-today)
- [Polymarket crypto odds today](${SITE}/p/polymarket-crypto-odds-today)
`;

// ─── Build pSEO markdown for a single page ──────────────────────────────────

function pseoToMarkdown(page) {
  const body = htmlToMarkdown(page.contentHtml);
  const url = `${SITE}/p/${page.slug}`;
  const lines = [];
  lines.push(`# ${page.title}`);
  lines.push('');
  if (page.excerpt) {
    lines.push(`> ${page.excerpt}`);
    lines.push('');
  }
  if (page.categoryName) {
    lines.push(`*Category: ${page.categoryName}*`);
    lines.push('');
  }
  lines.push(body.trim());
  lines.push('');
  lines.push(`---`);
  lines.push(`Source: ${url}`);
  lines.push('');
  return lines.join('\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  // Clean and recreate the per-page output dir.
  await rm(pOutDir, { recursive: true, force: true });
  await mkdir(pOutDir, { recursive: true });

  const files = (await readdir(pseoDir)).filter((f) => f.endsWith('.ts'));
  files.sort();

  const pages = [];
  for (const f of files) {
    const src = await readFile(join(pseoDir, f), 'utf8');
    let page;
    try {
      page = parsePseoFile(src);
    } catch (err) {
      console.error(`[generate-llms-content] failed to parse ${f}: ${err.message}`);
      throw err;
    }
    if (!page.slug) throw new Error(`missing slug in ${f}`);
    pages.push(page);
    const md = pseoToMarkdown(page);
    await writeFile(join(pOutDir, `${page.slug}.md`), md, 'utf8');
  }

  // Write hand-coded marketing pages.
  await writeFile(join(publicDir, 'index.md'), homeMd, 'utf8');
  await writeFile(join(publicDir, 'features.md'), featuresMd, 'utf8');
  await writeFile(join(publicDir, 'pricing.md'), pricingMd, 'utf8');
  await writeFile(join(publicDir, 'markets.md'), marketsMd, 'utf8');

  // Build llms-full.txt — concatenate everything for AI ingestion.
  const today = new Date().toISOString().slice(0, 10);
  const sections = [];
  sections.push(`# llms-full.txt — PolyHistorical`);
  sections.push('');
  sections.push(`> Full content export of polyhistorical.com for LLM ingestion. Generated ${today}.`);
  sections.push('');
  sections.push(`Site: ${SITE}`);
  sections.push(`Docs: https://docs.polyhistorical.com`);
  sections.push(`Index: ${SITE}/llms.txt`);
  sections.push('');
  sections.push('---');
  sections.push('');

  // Marketing pages first.
  sections.push('<!-- page: / -->');
  sections.push(homeMd.trim());
  sections.push('');
  sections.push('---');
  sections.push('');

  sections.push('<!-- page: /features -->');
  sections.push(featuresMd.trim());
  sections.push('');
  sections.push('---');
  sections.push('');

  sections.push('<!-- page: /pricing -->');
  sections.push(pricingMd.trim());
  sections.push('');
  sections.push('---');
  sections.push('');

  sections.push('<!-- page: /markets -->');
  sections.push(marketsMd.trim());
  sections.push('');
  sections.push('---');
  sections.push('');

  // pSEO pages, grouped by category.
  const byCategory = new Map();
  for (const p of pages) {
    const k = p.categoryName || 'Uncategorized';
    if (!byCategory.has(k)) byCategory.set(k, []);
    byCategory.get(k).push(p);
  }
  const orderedCats = [
    'Polymarket Historical Data',
    'Comparisons',
    'Use Cases',
    'Market Data Guides',
    'API & Developers',
    'Alternatives',
    'Crypto Trading',
    'Backtesting',
  ];
  const remaining = [...byCategory.keys()].filter((c) => !orderedCats.includes(c));
  const catOrder = [...orderedCats.filter((c) => byCategory.has(c)), ...remaining];

  for (const cat of catOrder) {
    sections.push(`# Category: ${cat}`);
    sections.push('');
    const ps = byCategory.get(cat).sort((a, b) => a.slug.localeCompare(b.slug));
    for (const p of ps) {
      sections.push(`<!-- page: /p/${p.slug} -->`);
      sections.push(pseoToMarkdown(p).trim());
      sections.push('');
      sections.push('---');
      sections.push('');
    }
  }

  await writeFile(join(publicDir, 'llms-full.txt'), sections.join('\n'), 'utf8');

  console.log(`[generate-llms-content] wrote ${pages.length} pSEO .md files to public/p/`);
  console.log(`[generate-llms-content] wrote index.md, features.md, pricing.md, markets.md`);
  console.log(`[generate-llms-content] wrote llms-full.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
