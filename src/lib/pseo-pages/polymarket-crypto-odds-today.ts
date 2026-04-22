import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b66', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Polymarket Crypto Odds Today: BTC, ETH & SOL Up/Down Markets',
  slug: 'polymarket-crypto-odds-today',
  excerpt: 'How Polymarket crypto odds work across BTC, ETH, and SOL Up/Down prediction markets — pricing, conversion to traditional odds, and how to query historical snapshots.',
  metaTitle: 'Polymarket Crypto Odds Today — BTC, ETH & SOL Markets | PolyHistorical',
  metaDescription: 'How Polymarket crypto odds work across BTC, ETH, and SOL Up/Down markets. Read prices as probabilities and access historical snapshots via PolyHistorical.',
  ogImage: '/og/crypto-trading.png', createdAt: '', updatedAt: '',
  content: `<p>Looking for <strong>Polymarket crypto odds today</strong>? Polymarket runs continuous Up/Down prediction markets for the three crypto assets covered by PolyHistorical — Bitcoin, Ethereum, and Solana — across 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour windows. PolyHistorical archives every order book snapshot so you can study how odds evolved after a market resolves.</p>

<h2>What Are Polymarket Crypto Odds?</h2>
<p>Polymarket crypto odds are binary prediction market prices, not sportsbook lines. Each Up/Down market resolves based on whether the underlying asset closes above or below its opening price. Outcomes trade between $0 and $1, and because each winning $1 share pays $1, the share price is directly the implied probability the market is assigning to that outcome.</p>

<h2>Crypto Markets Covered</h2>
<table>
<thead><tr><th>Asset</th><th>Plan required</th><th>Browse</th></tr></thead>
<tbody>
<tr><td>BTC</td><td>Starter (Free) and above</td><td><a href="/markets/btc">/markets/btc</a></td></tr>
<tr><td>ETH</td><td>Pro ($11/month) and above</td><td><a href="/markets/eth">/markets/eth</a></td></tr>
<tr><td>SOL</td><td>Pro ($11/month) and above</td><td><a href="/markets/sol">/markets/sol</a></td></tr>
</tbody>
</table>

<h2>How to Read Polymarket Crypto Prices</h2>
<p>Polymarket prices are quoted in cents on the dollar between $0 and $1. Conversion to traditional odds formats is purely mathematical:</p>
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

<h2>Timeframes Covered</h2>
<p>Each asset (BTC, ETH, SOL) has the same five Up/Down timeframes available through PolyHistorical:</p>
<ul>
<li><strong>5-minute (5m)</strong></li>
<li><strong>15-minute (15m)</strong></li>
<li><strong>1-hour (1h)</strong></li>
<li><strong>4-hour (4h)</strong></li>
<li><strong>24-hour (24h)</strong></li>
</ul>

<h2>Querying Crypto Markets via the API</h2>
<p>The PolyHistorical API uses the same endpoint shape for every coin — only the <code>coin</code> query parameter changes. Authenticate with your API key in the <code>X-API-Key</code> header:</p>
<pre><code>import requests

headers = {"X-API-Key": "your_api_key"}

for coin in ("BTC", "ETH", "SOL"):
    res = requests.get(
        "https://api.polyhistorical.com/v1/markets",
        params={"coin": coin, "market_type": "1h", "limit": 5},
        headers=headers,
    ).json()
    print(f"{coin}: {len(res['markets'])} markets returned")
</code></pre>

<h2>Plan Comparison</h2>
<ul>
<li><strong>Starter (Free)</strong> — BTC only. Last 50 markets for 5m/15m, last 24 for 1h/4h, last 5 for 24h. 60 req/min, 1,000 req/day. No credit card required.</li>
<li><strong>Pro ($11/month)</strong> — Full BTC, ETH, and SOL coverage with unlimited history. 300 req/min, 50,000 req/day.</li>
<li><strong>Enterprise</strong> — Custom rate limits, dedicated infrastructure, hands-on onboarding.</li>
</ul>
<p>See <a href="/pricing">polyhistorical.com/pricing</a> for the full plan breakdown.</p>

<h2>Get Started</h2>
<p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> to get an API key. Start on Starter for BTC, then upgrade to Pro to unlock ETH and SOL markets.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-btc-odds-today">Polymarket BTC Odds Today</a></li>
  <li><a href="/p/polymarket-eth-odds-today">Polymarket ETH Odds Today</a></li>
  <li><a href="/p/polymarket-sol-odds-today">Polymarket SOL Odds Today</a></li>
  </ul>`,
};

export default page;
