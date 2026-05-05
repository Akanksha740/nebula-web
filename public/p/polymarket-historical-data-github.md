# Polymarket Historical Data on GitHub: Open-Source Tools & Libraries

> Looking for Polymarket historical data on GitHub? Learn how to use the PolyHistorical REST API with open-source languages and tools to build your own data pipelines.

*Category: Polymarket Historical Data*

Looking for **Polymarket historical data on GitHub**? While there isn't a dedicated open-source SDK yet, the PolyHistorical REST API is simple enough to integrate directly into any project using standard HTTP libraries.

## No SDK Needed — Just a REST API

PolyHistorical's API uses standard REST conventions with JSON responses. You can call it from any language with an HTTP client — no special library required. Authentication is a single `X-API-Key` header.

## Python Example: Fetch Polymarket Historical Data

```
import requests

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
```

## JavaScript / Node.js Example

```
const API_KEY = "your_free_api_key";
const headers = { "X-API-Key": API_KEY };

const marketsRes = await fetch(
  "https://api.polyhistorical.com/v1/markets?coin=BTC&market_type=5m&limit=5",
  { headers }
);
const { markets } = await marketsRes.json();
const slug = markets[0].slug;

const snapRes = await fetch(
  \`https://api.polyhistorical.com/v1/markets/\${slug}/snapshots?include_orderbook=true&limit=1000\`,
  { headers }
);
const { snapshots } = await snapRes.json();
console.log(\`Loaded \${snapshots.length} snapshots\`);
```

## Build Your Own Tools

With just the `requests` library in Python or `fetch` in JavaScript, you can build:

- **Data pipelines** — scripts that fetch new market data daily and store it locally
- **Backtesting engines** — replay historical order books to simulate trading strategies
- **Visualization dashboards** — plot price and order book depth over time
- **Research notebooks** — Jupyter notebooks for exploratory analysis of prediction market data

## Getting Started

All you need is a free PolyHistorical API key. Sign up at no cost, grab your key from the dashboard, and start building with real Polymarket historical data using any language or framework you prefer.

## Related Resources

- [Polymarket Historical Data Download](/p/polymarket-historical-data-download)
- [Developer Guide to Backtesting API](/p/polymarket-historical-data-api-backtesting-dev)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-github
