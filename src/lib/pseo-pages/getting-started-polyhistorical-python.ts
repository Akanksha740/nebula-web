import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b15', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: 'Getting Started with PolyHistorical API in Python',
  slug: 'getting-started-polyhistorical-python',
  excerpt: 'Quick start guide for accessing Polymarket historical data with Python and the PolyHistorical API.',
  metaTitle: 'PolyHistorical Python Quick Start Guide',
  metaDescription: 'Get started with PolyHistorical API in Python. Fetch Polymarket historical order book data, parse snapshots, and build analysis pipelines in minutes.',
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>Prerequisites</h2>
  <ul>
  <li>Python 3.8+</li>
  <li><code>requests</code> library (<code>pip install requests</code>)</li>
  <li>A free PolyHistorical API key from <a href="/signup">polyhistorical.com/signup</a></li>
  </ul>

  <h2>Step 1: List Active Markets</h2>
  <pre><code>import requests

API_KEY = "your_api_key"
BASE = "https://api.polyhistorical.com/v1"

resp = requests.get(
    f"{BASE}/markets",
    headers={"X-API-Key": API_KEY},
    params={"coin": "BTC", "active": "true"}
)
markets = resp.json()["data"]
for m in markets:
    print(f"{m['slug']} — Up: {m['price_up']}, Down: {m['price_down']}")</code></pre>

  <h2>Step 2: Fetch Snapshots with Order Book</h2>
  <pre><code>slug = markets[0]["slug"]
resp = requests.get(
    f"{BASE}/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true", "limit": "10"}
)
snapshots = resp.json()["data"]
for snap in snapshots:
    print(f"Time: {snap['time']}")
    print(f"  Up: {snap['price_up']}, Down: {snap['price_down']}")
    print(f"  Bids: {len(snap['orderbook_up']['bids'])} levels")
    print(f"  Asks: {len(snap['orderbook_up']['asks'])} levels")</code></pre>

  <h2>Step 3: Convert to pandas DataFrame</h2>
  <pre><code>import pandas as pd

df = pd.DataFrame(snapshots)
df["time"] = pd.to_datetime(df["time"])
df["price_up"] = df["price_up"].astype(float)
df["price_down"] = df["price_down"].astype(float)
df["spread"] = df["price_up"] + df["price_down"] - 1
print(df[["time", "price_up", "price_down", "spread"]].head())</code></pre>

  <h2>Common Patterns</h2>
  <table>
  <thead><tr><th>Task</th><th>Endpoint</th><th>Key Params</th></tr></thead>
  <tbody>
  <tr><td>List markets</td><td>GET /v1/markets</td><td>coin, active, market_type</td></tr>
  <tr><td>Get snapshots</td><td>GET /v1/markets/{slug}/snapshots</td><td>include_orderbook, limit</td></tr>
  <tr><td>Get single market</td><td>GET /v1/markets/{slug}</td><td>—</td></tr>
  </tbody>
  </table>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polyhistorical-api-javascript-quickstart">JavaScript/Node.js Quick Start</a></li>
  <li><a href="/p/polyhistorical-api-authentication-guide">API Authentication Guide</a></li>
  <li><a href="/p/rate-limiting-best-practices-polyhistorical">Rate Limiting Best Practices</a></li>
  </ul>`,
};

export default page;
