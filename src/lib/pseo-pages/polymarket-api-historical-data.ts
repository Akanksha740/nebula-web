import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b62', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket API Historical Data: How to Get Past Market Snapshots',
  slug: 'polymarket-api-historical-data',
  excerpt: 'Learn how to access Polymarket API historical data through PolyHistorical. Get past order book snapshots, price history, and market data via a free REST API.',
  metaTitle: 'Polymarket API Historical Data — Free REST API Access | PolyHistorical',
  metaDescription: 'Access Polymarket API historical data for free. PolyHistorical provides a REST API with past order book snapshots, price history, and market resolution data.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<p>Polymarket's own API focuses on live markets — it doesn't provide <strong>Polymarket API historical data</strong> for resolved markets. PolyHistorical fills this gap with a dedicated REST API that serves archived order book snapshots for past prediction markets.</p>

<h2>Polymarket API vs PolyHistorical API</h2>
<table>
<thead><tr><th>Feature</th><th>Polymarket API</th><th>PolyHistorical API</th></tr></thead>
<tbody>
<tr><td>Live market data</td><td>Yes</td><td>No (historical only)</td></tr>
<tr><td>Historical order books</td><td>No</td><td>Yes — full bid/ask depth</td></tr>
<tr><td>Resolved market data</td><td>Limited</td><td>Complete archive</td></tr>
<tr><td>Sub-second snapshots</td><td>No</td><td>Yes</td></tr>
<tr><td>Free tier</td><td>Yes</td><td>Yes — no credit card needed</td></tr>
</tbody>
</table>

<h2>API Endpoints for Historical Data</h2>
<p>PolyHistorical's API is purpose-built for accessing past Polymarket data:</p>

<h3>1. List Historical Markets</h3>
<pre><code>GET https://api.polyhistorical.com/v1/markets?coin=BTC&amp;market_type=5m&amp;resolved=true&amp;limit=50</code></pre>
<p>Returns resolved BTC 5-minute markets, sorted by start_time descending. Filter by <code>coin</code>, <code>market_type</code> (5m, 15m, 1hr, 4hr, 24hr), and <code>resolved</code> status.</p>

<h3>2. Get Market Details</h3>
<pre><code>GET https://api.polyhistorical.com/v1/markets/{slug}</code></pre>
<p>Returns full details for a single market including resolution outcome, final volume, and coin prices at start and end.</p>

<h3>3. Get Historical Snapshots</h3>
<pre><code>GET https://api.polyhistorical.com/v1/markets/{slug}/snapshots?include_orderbook=true&amp;limit=1000</code></pre>
<p>Returns time-series snapshots for a market. Each snapshot includes coin price, Up/Down outcome prices, and optionally the full order book with bids and asks.</p>

<h2>Authentication</h2>
<p>All requests require an API key in the <code>X-API-Key</code> header:</p>
<pre><code>curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.polyhistorical.com/v1/markets?coin=BTC&amp;limit=5"</code></pre>

<h2>Python Quick Start</h2>
<pre><code>import requests

headers = {"X-API-Key": "your_free_api_key"}
BASE = "https://api.polyhistorical.com/v1"

# Get resolved markets
markets = requests.get(f"{BASE}/markets", headers=headers, params={
    "coin": "BTC", "market_type": "5m", "resolved": True, "limit": 10
}).json()["markets"]

# Fetch historical snapshots for each
for market in markets:
    data = requests.get(
        f"{BASE}/markets/{market['slug']}/snapshots",
        headers=headers,
        params={"include_orderbook": True, "limit": 1000}
    ).json()
    print(f"{market['slug']}: {len(data['snapshots'])} snapshots, winner={market['winner']}")
</code></pre>

<h2>Rate Limits &amp; Pricing</h2>
<table>
<thead><tr><th>Plan</th><th>Requests/min</th><th>Requests/day</th><th>Market Access</th></tr></thead>
<tbody>
<tr><td>Starter (Free)</td><td>60</td><td>1,000</td><td>Recent BTC markets</td></tr>
<tr><td>Pro ($11/mo)</td><td>300</td><td>50,000</td><td>All historical markets</td></tr>
<tr><td>Enterprise</td><td>Custom</td><td>Unlimited</td><td>All + custom endpoints</td></tr>
</tbody>
</table>
<p>Sign up for free at PolyHistorical to start accessing Polymarket API historical data today.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-api-documentation">API Documentation</a></li>
  <li><a href="/p/polyhistorical-api-authentication-guide">Authentication Guide</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Complete Guide</a></li>
  </ul>`,
};

export default page;
