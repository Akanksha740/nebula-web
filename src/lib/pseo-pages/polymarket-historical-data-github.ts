import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b53', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data on GitHub: Open-Source Tools & Libraries',
  slug: 'polymarket-historical-data-github',
  excerpt: 'Looking for Polymarket historical data on GitHub? Learn how to use the PolyHistorical REST API with open-source languages and tools to build your own data pipelines.',
  metaTitle: 'Polymarket Historical Data GitHub — Tools & Code Examples | PolyHistorical',
  metaDescription: 'Access Polymarket historical data using the PolyHistorical REST API. Code examples in Python and JavaScript to build your own tools, pipelines, and backtesting scripts.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Polymarket Historical Data on GitHub: Open-Source Tools & Libraries</h1>
<p>Looking for <strong>Polymarket historical data on GitHub</strong>? While there isn't a dedicated open-source SDK yet, the PolyHistorical REST API is simple enough to integrate directly into any project using standard HTTP libraries.</p>

<h2>No SDK Needed — Just a REST API</h2>
<p>PolyHistorical's API uses standard REST conventions with JSON responses. You can call it from any language with an HTTP client — no special library required. Authentication is a single <code>X-API-Key</code> header.</p>

<h2>Python Example: Fetch Polymarket Historical Data</h2>
<pre><code>import requests

API_KEY = "your_free_api_key"
headers = {"X-API-Key": API_KEY}
BASE = "https://api.polyhistorical.com/v1"

# List recent BTC 5-minute markets
markets = requests.get(f"{BASE}/markets", headers=headers, params={
    "coin": "BTC", "market_type": "5m", "resolved": True, "limit": 10
}).json()

# Fetch snapshots with full order book for the first market
slug = markets["markets"][0]["slug"]
data = requests.get(
    f"{BASE}/markets/{slug}/snapshots",
    headers=headers,
    params={"include_orderbook": True, "limit": 1000}
).json()

print(f"Loaded {len(data['snapshots'])} order book snapshots for {slug}")
</code></pre>

<h2>JavaScript / Node.js Example</h2>
<pre><code>const API_KEY = "your_free_api_key";
const headers = { "X-API-Key": API_KEY };

const marketsRes = await fetch(
  "https://api.polyhistorical.com/v1/markets?coin=BTC&amp;market_type=5m&amp;limit=5",
  { headers }
);
const { markets } = await marketsRes.json();
const slug = markets[0].slug;

const snapRes = await fetch(
  \`https://api.polyhistorical.com/v1/markets/\${slug}/snapshots?include_orderbook=true&amp;limit=1000\`,
  { headers }
);
const { snapshots } = await snapRes.json();
console.log(\`Loaded \${snapshots.length} snapshots\`);
</code></pre>

<h2>Build Your Own Tools</h2>
<p>With just the <code>requests</code> library in Python or <code>fetch</code> in JavaScript, you can build:</p>
<ul>
<li><strong>Data pipelines</strong> — scripts that fetch new market data daily and store it locally</li>
<li><strong>Backtesting engines</strong> — replay historical order books to simulate trading strategies</li>
<li><strong>Visualization dashboards</strong> — plot price and order book depth over time</li>
<li><strong>Research notebooks</strong> — Jupyter notebooks for exploratory analysis of prediction market data</li>
</ul>

<h2>Getting Started</h2>
<p>All you need is a free PolyHistorical API key. Sign up at no cost, grab your key from the dashboard, and start building with real Polymarket historical data using any language or framework you prefer.</p>`,
};

export default page;
