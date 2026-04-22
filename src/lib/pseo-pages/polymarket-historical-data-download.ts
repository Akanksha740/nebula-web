import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b52', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data Download: CSV, JSON & Bulk Export',
  slug: 'polymarket-historical-data-download',
  excerpt: 'Download Polymarket historical data in CSV and JSON formats. PolyHistorical offers free API access to historical order book snapshots for offline analysis.',
  metaTitle: 'Polymarket Historical Data Download — Free API Access | PolyHistorical',
  metaDescription: 'Download Polymarket historical data for free via the PolyHistorical API. Fetch order book snapshots and save them locally for backtesting and research.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<p>Need to <strong>download Polymarket historical data</strong> for offline analysis? PolyHistorical's API lets you fetch complete order book history and save it locally in any format you need.</p>

<h2>How to Download Data</h2>
<p>PolyHistorical provides a REST API that returns JSON responses. You can fetch data programmatically and convert it to your preferred format:</p>

<h3>Save as JSON</h3>
<pre><code>import requests
import json

API_KEY = "your_free_api_key"
headers = {"X-API-Key": API_KEY}

# Fetch snapshots for a market
slug = "btc-updown-5m-1774975800"
data = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    params={"include_orderbook": True, "limit": 1000},
    headers=headers
).json()

# Save to file
with open("snapshots.json", "w") as f:
    json.dump(data["snapshots"], f)
</code></pre>

<h3>Save as CSV with pandas</h3>
<pre><code>import pandas as pd

df = pd.DataFrame(data["snapshots"])
df.to_csv("snapshots.csv", index=False)
</code></pre>

<h2>What's Included in Each Snapshot</h2>
<p>Every snapshot from the API contains:</p>
<ul>
<li><strong>time</strong> — snapshot timestamp (ISO 8601, UTC)</li>
<li><strong>coin_price</strong> — underlying coin price at snapshot time</li>
<li><strong>price_up</strong> — price of the "Up" outcome (0-1)</li>
<li><strong>price_down</strong> — price of the "Down" outcome (0-1)</li>
<li><strong>orderbook_up</strong> — full bids and asks for the "Up" outcome (when <code>include_orderbook=true</code>)</li>
<li><strong>orderbook_down</strong> — full bids and asks for the "Down" outcome (when <code>include_orderbook=true</code>)</li>
</ul>

<h2>Bulk Download Strategy</h2>
<p>To download large amounts of data, paginate through markets and their snapshots:</p>
<ol>
<li>Use <code>GET /v1/markets?coin=BTC&amp;market_type=5m&amp;limit=100</code> to list markets</li>
<li>For each market, fetch snapshots with <code>GET /v1/markets/{slug}/snapshots?limit=1000</code></li>
<li>Use <code>offset</code> to paginate through markets with more than 1000 snapshots</li>
<li>Save each batch to your local database or file system</li>
</ol>

<h2>Free Tier Access</h2>
<p>The Starter (free) plan gives you access to recent BTC markets — last 50 for 5m/15m, last 24 for 1h/4h, and last 5 for 24h. All snapshots within those markets are included. Upgrade to Pro at <strong>$11/month</strong> for full historical access to all BTC markets.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/bulk-data-export-polymarket-historical">Bulk Data Export Guide</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API</a></li>
  <li><a href="/p/polymarket-historical-data-github">Polymarket Historical Data on GitHub</a></li>
  </ul>`,
};

export default page;
