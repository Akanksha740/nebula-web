import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b64', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Polymarket ETH Odds Today: Live Ethereum Up/Down Prediction Market Lines',
  slug: 'polymarket-eth-odds-today',
  excerpt: 'How Polymarket ETH odds work — Ethereum Up/Down prediction markets, how share prices map to probabilities, and how to access historical ETH markets via PolyHistorical.',
  metaTitle: 'Polymarket ETH Odds Today — Ethereum Up/Down Markets | PolyHistorical',
  metaDescription: 'How Polymarket ETH odds work. Read live Ethereum Up/Down prediction markets and access historical ETH market snapshots through PolyHistorical (Pro plan).',
  ogImage: '/og/crypto-trading.png', createdAt: '', updatedAt: '',
  content: `<p>Looking for <strong>Polymarket ETH odds today</strong>? Polymarket runs Ethereum Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of ETH closing higher or lower than its open. PolyHistorical archives every order book snapshot from these markets so you can study them after they resolve.</p>

<h2>What Are Polymarket ETH Odds?</h2>
<p>Polymarket ETH odds are binary prediction market prices. Each Ethereum Up/Down market has two outcomes — <strong>Up</strong> and <strong>Down</strong> — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability the market is assigning to each outcome.</p>

<h2>How to Read a Polymarket ETH Price</h2>
<p>Prices on Polymarket are quoted in cents on the dollar between $0 and $1. The conversion to traditional odds formats is purely mathematical:</p>
<table>
<thead><tr><th>Polymarket price</th><th>Implied probability</th><th>Decimal odds</th><th>American odds</th></tr></thead>
<tbody>
<tr><td>$0.10</td><td>10%</td><td>10.00</td><td>+900</td></tr>
<tr><td>$0.25</td><td>25%</td><td>4.00</td><td>+300</td></tr>
<tr><td>$0.50</td><td>50%</td><td>2.00</td><td>+100</td></tr>
<tr><td>$0.75</td><td>75%</td><td>1.33</td><td>-300</td></tr>
<tr><td>$0.90</td><td>90%</td><td>1.11</td><td>-900</td></tr>
</tbody>
</table>
<p>Formulas: <code>implied_probability = price</code> and <code>decimal_odds = 1 / price</code>.</p>

<h2>ETH Market Timeframes Covered</h2>
<p>Polymarket runs three Ethereum Up/Down timeframes in parallel. PolyHistorical captures all of them:</p>
<ul>
<li><strong>5-minute (5m)</strong></li>
<li><strong>15-minute (15m)</strong></li>
<li><strong>1-hour (1h)</strong></li>
</ul>
<p>Browse live and resolved ETH markets at <a href="/markets/eth">polyhistorical.com/markets/eth</a> — every market lists its open time, resolution status, and full snapshot history.</p>

<h2>Querying ETH Markets via the API</h2>
<p>The PolyHistorical API exposes Polymarket ETH markets through a simple REST interface. Authenticate with your API key in the <code>X-API-Key</code> header:</p>
<pre><code>import requests

headers = {"X-API-Key": "your_api_key"}

# List recent ETH 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "ETH", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
</code></pre>

<h2>What Plan Do I Need?</h2>
<p>ETH market data is part of the Pro plan. The free Starter plan is limited to BTC markets only — ETH and SOL coverage requires upgrading. Per the current plan limits:</p>
<ul>
<li><strong>Starter (Free)</strong> — BTC markets only, ETH not included</li>
<li><strong>Pro ($11/month)</strong> — full BTC, ETH, and SOL coverage with unlimited history, 300 req/min, 50,000 req/day</li>
<li><strong>Enterprise</strong> — custom rate limits and dedicated infrastructure</li>
</ul>
<p>See <a href="/pricing">polyhistorical.com/pricing</a> for the full plan comparison.</p>

<h2>Get Started</h2>
<p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> to get an API key, then upgrade to Pro to unlock Polymarket ETH market data.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-crypto-odds-today">Polymarket Crypto Odds Today: BTC, ETH & SOL</a></li>
  <li><a href="/p/polymarket-btc-odds-today">Polymarket BTC Odds Today</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  </ul>`,
};

export default page;
