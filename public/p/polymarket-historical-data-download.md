# Polymarket Historical Data Download: CSV, JSON & Bulk Export

> Download Polymarket historical data in CSV and JSON formats. PolyHistorical offers free API access to historical order book snapshots for offline analysis.

*Category: Polymarket Historical Data*

Need to **download Polymarket historical data** for offline analysis? PolyHistorical's API lets you fetch complete order book history and save it locally in any format you need.

## How to Download Data

PolyHistorical provides a REST API that returns JSON responses. You can fetch data programmatically and convert it to your preferred format:

### Save as JSON

```
import requests
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
```

### Save as CSV with pandas

```
import pandas as pd

df = pd.DataFrame(data["snapshots"])
df.to_csv("snapshots.csv", index=False)
```

## What's Included in Each Snapshot

Every snapshot from the API contains:

- **time** — snapshot timestamp (ISO 8601, UTC)
- **coin_price** — underlying coin price at snapshot time
- **price_up** — price of the "Up" outcome (0-1)
- **price_down** — price of the "Down" outcome (0-1)
- **orderbook_up** — full bids and asks for the "Up" outcome (when `include_orderbook=true`)
- **orderbook_down** — full bids and asks for the "Down" outcome (when `include_orderbook=true`)

## Bulk Download Strategy

To download large amounts of data, paginate through markets and their snapshots:

1. Use `GET /v1/markets?coin=BTC&market_type=5m&limit=100` to list markets
2. For each market, fetch snapshots with `GET /v1/markets/{slug}/snapshots?limit=1000`
3. Use `offset` to paginate through markets with more than 1000 snapshots
4. Save each batch to your local database or file system

## Free Tier Access

The Starter (free) plan gives you access to recent BTC markets — last 50 for 5m/15m, last 24 for 1h/4h, and last 5 for 24h. All snapshots within those markets are included. Upgrade to Pro at **$11/month** for full historical access to all BTC markets.

## Related Resources

- [Bulk Data Export Guide](/p/bulk-data-export-polymarket-historical)
- [Polymarket Historical Data API](/p/polymarket-historical-data-api)
- [Polymarket Historical Data on GitHub](/p/polymarket-historical-data-github)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-download
