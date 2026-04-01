import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b59', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data API Documentation: Endpoints, Auth & Examples',
  slug: 'polymarket-historical-data-api-documentation',
  excerpt: 'Full API documentation for Polymarket historical data — endpoints, authentication, rate limits, and code examples. Free access via PolyHistorical.',
  metaTitle: 'Polymarket Historical Data API Documentation | PolyHistorical',
  metaDescription: 'Complete API documentation for Polymarket historical data. Endpoints, authentication, rate limits, response formats, and code examples. Free access on PolyHistorical.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Polymarket Historical Data API Documentation: Endpoints, Auth & Examples</h1>
<p>This is the complete <strong>Polymarket historical data API documentation</strong> for PolyHistorical. Everything you need to start fetching prediction market order book data — for free.</p>

<h2>Base URL</h2>
<pre><code>https://api.polyhistorical.com/v1</code></pre>

<h2>Authentication</h2>
<p>Include your API key in the <code>X-API-Key</code> header with every request:</p>
<pre><code>curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.polyhistorical.com/v1/markets?coin=BTC&amp;limit=5</code></pre>
<p>Get a free API key by signing up at PolyHistorical. No credit card required.</p>

<h2>Endpoints</h2>

<h3>GET /v1/markets</h3>
<p>List all markets with filtering and pagination. Returns markets sorted by start_time descending.</p>
<table>
<thead><tr><th>Parameter</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>coin</code></td><td>Yes</td><td>Cryptocurrency: BTC, ETH, SOL</td></tr>
<tr><td><code>market_type</code></td><td>No</td><td>Filter by type: 5m, 15m, 1hr, 4hr, 24hr</td></tr>
<tr><td><code>resolved</code></td><td>No</td><td>Filter by resolution status (true/false)</td></tr>
<tr><td><code>limit</code></td><td>No</td><td>Results to return, 1-100 (default 100)</td></tr>
<tr><td><code>offset</code></td><td>No</td><td>Pagination offset (default 0)</td></tr>
</tbody>
</table>

<h3>GET /v1/markets/{slug}</h3>
<p>Get detailed data for a single market by its slug.</p>

<h3>GET /v1/markets/{slug}/snapshots</h3>
<p>Fetch time-series snapshots for a specific market, including price data and optional order book depth.</p>
<table>
<thead><tr><th>Parameter</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>limit</code></td><td>No</td><td>Snapshots to return, 1-1000 (default 1000)</td></tr>
<tr><td><code>offset</code></td><td>No</td><td>Pagination offset (default 0)</td></tr>
<tr><td><code>include_orderbook</code></td><td>No</td><td>Include full order book bids/asks (default false)</td></tr>
</tbody>
</table>

<h3>GET /v1/markets/by-market-id/{marketId}/snapshots</h3>
<p>Same as above, but uses the Polymarket market ID instead of the slug. Useful when you have the market ID from Polymarket directly.</p>

<h2>Rate Limits</h2>
<table>
<thead><tr><th>Plan</th><th>Requests/min</th><th>Requests/day</th></tr></thead>
<tbody>
<tr><td>Starter (Free)</td><td>60</td><td>1,000</td></tr>
<tr><td>Pro ($11/mo)</td><td>300</td><td>50,000</td></tr>
<tr><td>Enterprise</td><td>Custom</td><td>Unlimited</td></tr>
</tbody>
</table>

<h2>Free Tier Market Access</h2>
<table>
<thead><tr><th>Market Type</th><th>Starter (Free)</th><th>Pro</th></tr></thead>
<tbody>
<tr><td>BTC 5m &amp; 15m</td><td>Last 50 markets</td><td>All</td></tr>
<tr><td>BTC 1h &amp; 4h</td><td>Last 24 markets</td><td>All</td></tr>
<tr><td>BTC 24h</td><td>Last 5 markets</td><td>All</td></tr>
</tbody>
</table>
<p>All snapshots within an accessible market are included on every plan — no snapshot limits.</p>

<h2>Get Started</h2>
<p>Sign up for free, get your API key, and start querying Polymarket historical data in minutes. The free tier has no expiration — use it as long as you need.</p>`,
};

export default page;
