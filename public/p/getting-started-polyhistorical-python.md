# Getting Started with PolyHistorical API in Python

> Quick start guide for accessing Polymarket historical data with Python and the PolyHistorical API.

*Category: API & Developers*

## Prerequisites

- Python 3.8+
- `requests` library (`pip install requests`)
- A free PolyHistorical API key from [polyhistorical.com/signup](/signup)

## Step 1: List Active Markets

```
import requests

API_KEY = "your_api_key"
BASE = "https://api.polyhistorical.com/v1"

resp = requests.get(
    f"{BASE}/markets",
    headers={"X-API-Key": API_KEY},
    params={"coin": "BTC", "active": "true"}
)
markets = resp.json()["data"]
for m in markets:
    print(f"{m['slug']} — Up: {m['price_up']}, Down: {m['price_down']}")
```

## Step 2: Fetch Snapshots with Order Book

```
slug = markets[0]["slug"]
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
    print(f"  Asks: {len(snap['orderbook_up']['asks'])} levels")
```

## Step 3: Convert to pandas DataFrame

```
import pandas as pd

df = pd.DataFrame(snapshots)
df["time"] = pd.to_datetime(df["time"])
df["price_up"] = df["price_up"].astype(float)
df["price_down"] = df["price_down"].astype(float)
df["spread"] = df["price_up"] + df["price_down"] - 1
print(df[["time", "price_up", "price_down", "spread"]].head())
```

## Common Patterns

| Task | Endpoint | Key Params |
| --- | --- | --- |
| List markets | GET /v1/markets | coin, active, market_type |
| Get snapshots | GET /v1/markets/{slug}/snapshots | include_orderbook, limit |
| Get single market | GET /v1/markets/{slug} | — |

## Related Resources

- [JavaScript/Node.js Quick Start](/p/polyhistorical-api-javascript-quickstart)
- [API Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Rate Limiting Best Practices](/p/rate-limiting-best-practices-polyhistorical)

---
Source: https://polyhistorical.com/p/getting-started-polyhistorical-python
