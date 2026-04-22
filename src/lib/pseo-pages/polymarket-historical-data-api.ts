import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b51', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data API: Full Documentation & Quick Start',
  slug: 'polymarket-historical-data-api',
  excerpt: 'Complete documentation for the Polymarket historical data API. Get started in minutes with free API access to historical order book snapshots from PolyHistorical.',
  metaTitle: 'Polymarket Historical Data API — Free Access & Full Docs | PolyHistorical',
  metaDescription: 'Get free API access to Polymarket historical data. Full documentation, endpoints, authentication, and code examples for the PolyHistorical API.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<p>The <strong>Polymarket historical data API</strong> from PolyHistorical gives you programmatic access to complete order book history from Polymarket prediction markets. It's free to start, fast to integrate, and built for developers and researchers.</p>

<h2>Why You Need a Polymarket Historical Data API</h2>
<p>Polymarket does not provide historical order book data through its own API. Once a market closes, the data disappears. PolyHistorical fills this gap by archiving every order book snapshot and making it available through a simple REST API.</p>

<h2>API Quick Start</h2>
<p>Get up and running in under 5 minutes:</p>
<pre><code># Python example
import requests

API_KEY = "your_free_api_key"
headers = {"X-API-Key": API_KEY}

# Step 1: List recent BTC 5-minute markets
markets = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "5m", "limit": 5},
    headers=headers
).json()

# Step 2: Get snapshots for a market
slug = markets["markets"][0]["slug"]
data = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    params={"limit": 100, "include_orderbook": True},
    headers=headers
).json()
print(f"Retrieved {len(data['snapshots'])} snapshots")
</code></pre>

<h2>Key API Endpoints</h2>
<table>
<thead><tr><th>Endpoint</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>GET /v1/markets</code></td><td>List all markets with filtering by coin, type, and resolution status</td></tr>
<tr><td><code>GET /v1/markets/{slug}</code></td><td>Get details for a single market by slug</td></tr>
<tr><td><code>GET /v1/markets/{slug}/snapshots</code></td><td>Fetch time-series snapshots with optional order book depth</td></tr>
<tr><td><code>GET /v1/markets/by-market-id/{id}/snapshots</code></td><td>Fetch snapshots using the Polymarket market ID</td></tr>
</tbody>
</table>

<h2>Free Tier Includes</h2>
<ul>
<li>Recent BTC market historical data (last 50 for 5m/15m, last 24 for 1h/4h, last 5 for 24h)</li>
<li>Up to 1,000 API calls per day, 60 per minute</li>
<li>Full order book depth on every snapshot</li>
<li>No credit card required</li>
</ul>

<h2>Pro &amp; Enterprise Tier</h2>
<ul>
<li>Full BTC, ETH, and SOL market history — all timeframes, no limits</li>
<li>Up to 300 requests/min, 50,000 requests/day (Pro) or custom limits (Enterprise)</li>
<li>Priority support</li>
</ul>
<p>The PolyHistorical API is the easiest way to access Polymarket historical data programmatically. Sign up free and start building today.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-api-documentation">Polymarket Historical Data API Documentation</a></li>
  <li><a href="/p/polyhistorical-api-authentication-guide">PolyHistorical API Authentication Guide</a></li>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices</a></li>
  </ul>`,
};

export default page;
