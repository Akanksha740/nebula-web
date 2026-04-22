import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b61', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Historical Polymarket Data: Free Access to Past Order Book Snapshots',
  slug: 'historical-polymarket-data',
  excerpt: 'Get free access to historical Polymarket data. PolyHistorical archives every order book snapshot from Polymarket prediction markets so you can analyze past market behavior.',
  metaTitle: 'Historical Polymarket Data — Free Order Book Archive | PolyHistorical',
  metaDescription: 'Access historical Polymarket data for free. PolyHistorical archives order book snapshots from BTC Up/Down prediction markets with sub-second resolution.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<p>Looking for <strong>historical Polymarket data</strong>? Polymarket doesn't keep order book history once a market resolves — but PolyHistorical does. We archive every snapshot so you can access past prediction market data anytime, for free.</p>

<h2>What Historical Polymarket Data Is Available?</h2>
<p>PolyHistorical captures and stores time-series snapshots from Polymarket's BTC, ETH, and SOL Up/Down prediction markets. Each snapshot includes:</p>
<ul>
<li><strong>Timestamp</strong> — exact time in UTC with sub-second precision</li>
<li><strong>Coin price</strong> — the underlying BTC price at snapshot time</li>
<li><strong>Up/Down prices</strong> — outcome prices between 0 and 1</li>
<li><strong>Full order book depth</strong> — every bid and ask level with sizes (when requested)</li>
</ul>

<h2>Why Historical Polymarket Data Matters</h2>
<p>Without historical data, you're trading blind. Historical Polymarket data lets you:</p>
<ul>
<li><strong>Backtest strategies</strong> — validate trading ideas against real past market conditions</li>
<li><strong>Study market microstructure</strong> — understand how order books evolve before and after resolution</li>
<li><strong>Build quantitative models</strong> — train models on real historical patterns, not synthetic data</li>
<li><strong>Conduct academic research</strong> — study prediction market efficiency and price discovery</li>
</ul>

<h2>How to Access Historical Polymarket Data</h2>
<p>PolyHistorical provides a REST API with four main endpoints:</p>
<table>
<thead><tr><th>Endpoint</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>GET /v1/markets</code></td><td>List markets by coin, type, and resolution status</td></tr>
<tr><td><code>GET /v1/markets/{slug}</code></td><td>Get details for a single market</td></tr>
<tr><td><code>GET /v1/markets/{slug}/snapshots</code></td><td>Fetch historical snapshots with optional order book depth</td></tr>
<tr><td><code>GET /v1/markets/by-market-id/{id}/snapshots</code></td><td>Fetch snapshots by Polymarket market ID</td></tr>
</tbody>
</table>

<h2>Quick Start Example</h2>
<pre><code>import requests

headers = {"X-API-Key": "your_free_api_key"}

# Find a resolved BTC 5-minute market
markets = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "5m", "resolved": True, "limit": 1},
    headers=headers
).json()

slug = markets["markets"][0]["slug"]

# Get all historical snapshots for that market
data = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    params={"include_orderbook": True, "limit": 1000},
    headers=headers
).json()

print(f"Retrieved {len(data['snapshots'])} historical snapshots")
</code></pre>

<h2>Free Tier</h2>
<p>Sign up for free — no credit card required. The Starter plan gives you access to recent BTC markets (last 50 for 5m/15m, last 24 for 1h/4h, last 5 for 24h) with 1,000 API calls per day. Upgrade to Pro at $11/month for full historical access to all markets.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API</a></li>
  <li><a href="/p/polymarket-historical-data-availability">Data Availability</a></li>
  </ul>`,
};

export default page;
