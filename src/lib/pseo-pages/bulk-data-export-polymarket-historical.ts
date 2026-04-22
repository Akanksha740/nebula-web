import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b37', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'Bulk Data Export Guide: Download Polymarket Historical Data',
  slug: 'bulk-data-export-polymarket-historical',
  excerpt: 'How to export large datasets of Polymarket historical order book data using the PolyHistorical API.',
  metaTitle: 'Bulk Data Export for Polymarket Historical Data | PolyHistorical',
  metaDescription: 'Download Polymarket historical order book data in bulk using the PolyHistorical API. Pagination, storage, and best practices for large dataset management.',
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Export in Bulk?</h2>
<p>While the PolyHistorical REST API is great for on-demand queries, many use cases require <strong>large historical datasets</strong> stored locally — backtesting frameworks, machine learning pipelines, and academic research all benefit from having complete order book history available offline.</p>

<h2>How Bulk Export Works</h2>
<p>PolyHistorical does not have a dedicated bulk export endpoint. Instead, you build your dataset by paginating through the standard API endpoints:</p>
<ol>
<li><strong>List markets</strong> with <code>GET /v1/markets?coin=BTC&amp;limit=100&amp;offset=0</code></li>
<li><strong>Fetch snapshots</strong> for each market with <code>GET /v1/markets/{slug}/snapshots?limit=1000&amp;offset=0</code></li>
<li><strong>Paginate</strong> using <code>offset</code> to get all snapshots (each request returns up to 1,000)</li>
<li><strong>Save locally</strong> in your preferred format — JSON, CSV, or database</li>
</ol>

<h2>Python Example: Full Market Export</h2>
<pre><code>import requests
import json

API_KEY = "your_api_key"
headers = {"X-API-Key": API_KEY}
BASE = "https://api.polyhistorical.com/v1"

# List all resolved BTC 5m markets
markets = requests.get(f"{BASE}/markets", headers=headers, params={
    "coin": "BTC", "market_type": "5m", "resolved": True, "limit": 100
}).json()["markets"]

# Export snapshots for each market
for market in markets:
    slug = market["slug"]
    offset = 0
    all_snapshots = []
    while True:
        data = requests.get(
            f"{BASE}/markets/{slug}/snapshots",
            headers=headers,
            params={"include_orderbook": True, "limit": 1000, "offset": offset}
        ).json()
        all_snapshots.extend(data["snapshots"])
        if len(data["snapshots"]) &lt; 1000:
            break
        offset += 1000

    # Save to JSON
    with open(f"{slug}.json", "w") as f:
        json.dump(all_snapshots, f)
    print(f"Exported {len(all_snapshots)} snapshots for {slug}")
</code></pre>

<h2>Storage Considerations</h2>
<ul>
<li>Each market's snapshot data with order books can be several megabytes</li>
<li>Consider storing only the fields you need (e.g., just prices, not full order book depth)</li>
<li>Use <code>include_orderbook=false</code> to significantly reduce data size when you only need price data</li>
<li>A local SQLite or PostgreSQL database works well for storing and querying exported data</li>
</ul>

<h2>Incremental Sync Strategy</h2>
<p>After your initial export, set up an <strong>incremental sync</strong> that fetches only new markets each day. Track the last exported market's start_time and query from that point forward. This keeps your local dataset current without re-downloading everything.</p>

<h2>Rate Limit Considerations</h2>
<p>The free Starter plan allows 1,000 requests/day (60/min). A full export may take multiple days on the free plan. The Pro plan at <strong>$11/month</strong> gives you 50,000 requests/day (300/min), making bulk exports much faster.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-download">Polymarket Historical Data Download: CSV, JSON & Bulk Export</a></li>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices for PolyHistorical API</a></li>
  <li><a href="/p/polyhistorical-api-authentication-guide">PolyHistorical API Authentication and Security Guide</a></li>
  </ul>`,
};

export default page;
