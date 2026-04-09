import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b65', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Polymarket SOL Odds Today: Live Solana Up/Down Prediction Markets',
  slug: 'polymarket-sol-odds-today',
  excerpt: 'How Polymarket SOL odds work — Solana Up/Down prediction markets, how share prices map to probabilities, and how to access SOL markets via PolyHistorical Pro.',
  metaTitle: 'Polymarket SOL Odds Today — Solana Up/Down Markets | PolyHistorical',
  metaDescription: 'How Polymarket SOL odds work. Read live Solana Up/Down prediction markets and access SOL market snapshots through the PolyHistorical Pro plan.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Polymarket SOL Odds Today: Live Solana Up/Down Prediction Markets</h1>
<p>Looking for <strong>Polymarket SOL odds today</strong>? Polymarket runs Solana Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of SOL closing higher or lower than its open. PolyHistorical now archives every order book snapshot from these SOL markets alongside its existing BTC and ETH coverage.</p>

<h2>What Are Polymarket SOL Odds?</h2>
<p>Polymarket SOL odds are binary prediction market prices. Each Solana Up/Down market has two outcomes — <strong>Up</strong> and <strong>Down</strong> — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability the market is assigning to each outcome.</p>

<h2>How to Read a Polymarket SOL Price</h2>
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

<h2>SOL Market Timeframes Covered</h2>
<p>Polymarket runs five Solana Up/Down timeframes in parallel — the same set offered for BTC and ETH:</p>
<ul>
<li><strong>5-minute (5m)</strong></li>
<li><strong>15-minute (15m)</strong></li>
<li><strong>1-hour (1h)</strong></li>
<li><strong>4-hour (4h)</strong></li>
<li><strong>24-hour (24h)</strong></li>
</ul>
<p>Browse live and resolved SOL markets at <a href="/markets/sol">polyhistorical.com/markets/sol</a> — every market lists its open time, resolution status, and full snapshot history.</p>

<h2>Querying SOL Markets via the API</h2>
<p>The PolyHistorical API exposes Polymarket SOL markets through the same endpoints used for BTC and ETH. Authenticate with your API key in the <code>X-API-Key</code> header:</p>
<pre><code>import requests

headers = {"X-API-Key": "your_pro_api_key"}

# List recent SOL 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "SOL", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
</code></pre>

<h2>What Plan Do I Need?</h2>
<p>SOL market data is part of the Pro plan. The free Starter plan is limited to BTC markets only — SOL coverage requires upgrading. Per the current plan limits:</p>
<ul>
<li><strong>Starter (Free)</strong> — BTC markets only, SOL not included</li>
<li><strong>Pro ($11/month)</strong> — full BTC, ETH, and SOL coverage with unlimited history, 300 req/min, 50,000 req/day</li>
<li><strong>Enterprise</strong> — custom rate limits and dedicated infrastructure</li>
</ul>
<p>See <a href="/pricing">polyhistorical.com/pricing</a> for the full plan comparison.</p>

<h2>Get Started</h2>
<p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> to get an API key, then upgrade to Pro to unlock Polymarket SOL market data.</p>`,
};

export default page;
