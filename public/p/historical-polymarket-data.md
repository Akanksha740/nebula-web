# Historical Polymarket Data: Free Access to Past Order Book Snapshots

> Get free access to historical Polymarket data. PolyHistorical archives every order book snapshot from Polymarket prediction markets so you can analyze past market behavior.

*Category: Polymarket Historical Data*

Looking for **historical Polymarket data**? Polymarket doesn't keep order book history once a market resolves — but PolyHistorical does. We archive every snapshot so you can access past prediction market data anytime, for free.

## What Historical Polymarket Data Is Available?

PolyHistorical captures and stores time-series snapshots from Polymarket's BTC, ETH, and SOL Up/Down prediction markets. Each snapshot includes:

- **Timestamp** — exact time in UTC with sub-second precision
- **Coin price** — the underlying BTC price at snapshot time
- **Up/Down prices** — outcome prices between 0 and 1
- **Full order book depth** — every bid and ask level with sizes (when requested)

## Why Historical Polymarket Data Matters

Without historical data, you're trading blind. Historical Polymarket data lets you:

- **Backtest strategies** — validate trading ideas against real past market conditions
- **Study market microstructure** — understand how order books evolve before and after resolution
- **Build quantitative models** — train models on real historical patterns, not synthetic data
- **Conduct academic research** — study prediction market efficiency and price discovery

## How to Access Historical Polymarket Data

PolyHistorical provides a REST API with four main endpoints:

| Endpoint | Description |
| --- | --- |
| `GET /v1/markets` | List markets by coin, type, and resolution status |
| `GET /v1/markets/{slug}` | Get details for a single market |
| `GET /v1/markets/{slug}/snapshots` | Fetch historical snapshots with optional order book depth |
| `GET /v1/markets/by-market-id/{id}/snapshots` | Fetch snapshots by Polymarket market ID |

## Quick Start Example

```
import requests

headers = {"X-API-Key": "your_free_api_key"}

# Find a resolved BTC 5-minute market
markets = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "5m", "resolved": True, "limit": 1},
    headers=headers
).json()

slug = markets["markets"][0]["slug"]

# Get all historical snapshots for that market
data = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    params={"include_orderbook": True, "limit": 1000},
    headers=headers
).json()

print(f"Retrieved {len(data['snapshots'])} historical snapshots")
```

## Free Tier

Sign up for free — no credit card required. The Starter plan gives you access to recent BTC markets (last 50 for 5m/15m, last 24 for 1h/4h, last 5 for 24h) with 1,000 API calls per day. Upgrade to Pro at $11/month for full historical access to all markets.

## Related Resources

- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [Polymarket Historical Data API](/p/polymarket-historical-data-api)
- [Data Availability](/p/polymarket-historical-data-availability)

---
Source: https://polyhistorical.com/p/historical-polymarket-data
