# Polymarket API Historical Data: How to Get Past Market Snapshots

> Learn how to access Polymarket API historical data through PolyHistorical. Get past order book snapshots, price history, and market data via a free REST API.

*Category: Polymarket Historical Data*

Polymarket's own API focuses on live markets — it doesn't provide **Polymarket API historical data** for resolved markets. PolyHistorical fills this gap with a dedicated REST API that serves archived order book snapshots for past prediction markets.

## Polymarket API vs PolyHistorical API

| Feature | Polymarket API | PolyHistorical API |
| --- | --- | --- |
| Live market data | Yes | No (historical only) |
| Historical order books | No | Yes — full bid/ask depth |
| Resolved market data | Limited | Complete archive |
| Sub-second snapshots | No | Yes |
| Free tier | Yes | Yes — no credit card needed |

## API Endpoints for Historical Data

PolyHistorical's API is purpose-built for accessing past Polymarket data:

### 1. List Historical Markets

```
GET https://api.polyhistorical.com/v1/markets?coin=BTC&market_type=5m&resolved=true&limit=50
```

Returns resolved BTC 5-minute markets, sorted by start_time descending. Filter by `coin`, `market_type` (5m, 15m, 1hr, 4hr, 24hr), and `resolved` status.

### 2. Get Market Details

```
GET https://api.polyhistorical.com/v1/markets/{slug}
```

Returns full details for a single market including resolution outcome, final volume, and coin prices at start and end.

### 3. Get Historical Snapshots

```
GET https://api.polyhistorical.com/v1/markets/{slug}/snapshots?include_orderbook=true&limit=1000
```

Returns time-series snapshots for a market. Each snapshot includes coin price, Up/Down outcome prices, and optionally the full order book with bids and asks.

## Authentication

All requests require an API key in the `X-API-Key` header:

```
curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.polyhistorical.com/v1/markets?coin=BTC&limit=5"
```

## Python Quick Start

```
import requests

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
```

## Rate Limits & Pricing

| Plan | Requests/min | Requests/day | Market Access |
| --- | --- | --- | --- |
| Starter (Free) | 60 | 1,000 | Recent BTC markets |
| Pro ($11/mo) | 300 | 50,000 | All historical markets |
| Enterprise | Custom | Unlimited | All + custom endpoints |

Sign up for free at PolyHistorical to start accessing Polymarket API historical data today.

## Related Resources

- [API Documentation](/p/polymarket-historical-data-api-documentation)
- [Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/polymarket-api-historical-data
