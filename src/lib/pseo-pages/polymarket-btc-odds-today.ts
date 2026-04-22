import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b63', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Polymarket BTC Odds Today: Live Bitcoin Up/Down Prediction Markets',
  slug: 'polymarket-btc-odds-today',
  excerpt: 'How Polymarket BTC odds work — Bitcoin Up/Down prediction markets, how share prices map to probabilities, and how to access historical BTC markets via PolyHistorical.',
  metaTitle: 'Polymarket BTC Odds Today — Bitcoin Up/Down Prediction Markets | PolyHistorical',
  metaDescription: 'How Polymarket BTC odds work. Read live Bitcoin Up/Down prediction markets and access historical BTC market snapshots through the free PolyHistorical API.',
  ogImage: '/og/crypto-trading.png', createdAt: '', updatedAt: '',
  content: `<p>Looking for <strong>Polymarket BTC odds today</strong>? Polymarket runs short-duration Bitcoin Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of BTC closing higher or lower than its open. PolyHistorical archives every order book snapshot from these markets so you can study them after they resolve.</p>

<h2>What Are Polymarket BTC Odds?</h2>
<p>Polymarket BTC odds aren't sportsbook lines. Each Bitcoin Up/Down market is a binary prediction market with two outcomes — <strong>Up</strong> and <strong>Down</strong> — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability that the market is assigning to each outcome.</p>

<h2>How to Read a Polymarket BTC Price</h2>
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
<p>The formulas: <code>implied_probability = price</code>, <code>decimal_odds = 1 / price</code>, and <code>american_odds = (1 / price - 1) × 100</code> for prices below $0.50, or <code>-100 / (1 / price - 1)</code> for prices at or above $0.50.</p>

<h2>BTC Market Timeframes Covered</h2>
<p>Polymarket runs five Bitcoin Up/Down timeframes in parallel. PolyHistorical captures all of them:</p>
<ul>
<li><strong>5-minute (5m)</strong></li>
<li><strong>15-minute (15m)</strong></li>
<li><strong>1-hour (1h)</strong></li>
<li><strong>4-hour (4h)</strong></li>
<li><strong>24-hour (24h)</strong></li>
</ul>
<p>Browse live and resolved BTC markets at <a href="/markets/btc">polyhistorical.com/markets/btc</a> — every market lists its open time, resolution status, and full snapshot history.</p>

<h2>Querying BTC Markets via the API</h2>
<p>The PolyHistorical API exposes Polymarket BTC markets through a simple REST interface. Authenticate with your API key in the <code>X-API-Key</code> header:</p>
<pre><code>import requests

headers = {"X-API-Key": "your_api_key"}

# List recent BTC 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
</code></pre>

<h2>What's Available on the Free Plan</h2>
<p>The Starter plan is free, no credit card required, and covers BTC markets only. Per the current plan limits:</p>
<ul>
<li>BTC 5m &amp; 15m — last 50 markets</li>
<li>BTC 1h &amp; 4h — last 24 markets</li>
<li>BTC 24h — last 5 markets</li>
<li>60 requests/minute, 1,000 requests/day</li>
<li>Order book depth and sub-second snapshot granularity included</li>
</ul>
<p>For unlimited BTC history (plus ETH and SOL), upgrade to <a href="/pricing">Pro at $11/month</a>.</p>

<h2>Get Started</h2>
<p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> to get an API key and start querying Polymarket BTC market data.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-crypto-odds-today">Polymarket Crypto Odds Today: BTC, ETH & SOL</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  <li><a href="/p/how-to-read-prediction-market-order-books">How to Read Prediction Market Order Books</a></li>
  </ul>`,
};

export default page;
