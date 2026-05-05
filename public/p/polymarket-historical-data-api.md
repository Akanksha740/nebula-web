# Polymarket Historical Data API: Full Documentation & Quick Start

> Complete documentation for the Polymarket historical data API. Get started in minutes with free API access to historical order book snapshots from PolyHistorical.

*Category: Polymarket Historical Data*

The **Polymarket historical data API** from PolyHistorical gives you programmatic access to complete order book history from Polymarket prediction markets. It's free to start, fast to integrate, and built for developers and researchers.

## Why You Need a Polymarket Historical Data API

Polymarket does not provide historical order book data through its own API. Once a market closes, the data disappears. PolyHistorical fills this gap by archiving every order book snapshot and making it available through a simple REST API.

## API Quick Start

Get up and running in under 5 minutes:

```
# Python example
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
```

## Key API Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /v1/markets` | List all markets with filtering by coin, type, and resolution status |
| `GET /v1/markets/{slug}` | Get details for a single market by slug |
| `GET /v1/markets/{slug}/snapshots` | Fetch time-series snapshots with optional order book depth |
| `GET /v1/markets/by-market-id/{id}/snapshots` | Fetch snapshots using the Polymarket market ID |

## Free Tier Includes

- Recent BTC market historical data (last 50 for 5m/15m, last 24 for 1h/4h, last 5 for 24h)
- Up to 1,000 API calls per day, 60 per minute
- Full order book depth on every snapshot
- No credit card required

## Pro & Enterprise Tier

- Full BTC, ETH, and SOL market history — all timeframes, no limits
- Up to 300 requests/min, 50,000 requests/day (Pro) or custom limits (Enterprise)
- Priority support

The PolyHistorical API is the easiest way to access Polymarket historical data programmatically. Sign up free and start building today.

## Related Resources

- [Polymarket Historical Data API Documentation](/p/polymarket-historical-data-api-documentation)
- [PolyHistorical API Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Rate Limiting Best Practices](/p/rate-limiting-best-practices-polyhistorical)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-api
