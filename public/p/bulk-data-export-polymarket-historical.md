# Bulk Data Export Guide: Download Polymarket Historical Data

> How to export large datasets of Polymarket historical order book data using the PolyHistorical API.

*Category: API & Developers*

## Why Export in Bulk?

While the PolyHistorical REST API is great for on-demand queries, many use cases require **large historical datasets** stored locally — backtesting frameworks, machine learning pipelines, and academic research all benefit from having complete order book history available offline.

## How Bulk Export Works

PolyHistorical does not have a dedicated bulk export endpoint. Instead, you build your dataset by paginating through the standard API endpoints:

1. **List markets** with `GET /v1/markets?coin=BTC&limit=100&offset=0`
2. **Fetch snapshots** for each market with `GET /v1/markets/{slug}/snapshots?limit=1000&offset=0`
3. **Paginate** using `offset` to get all snapshots (each request returns up to 1,000)
4. **Save locally** in your preferred format — JSON, CSV, or database

## Python Example: Full Market Export

```
import requests
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
        if len(data["snapshots"]) < 1000:
            break
        offset += 1000

    # Save to JSON
    with open(f"{slug}.json", "w") as f:
        json.dump(all_snapshots, f)
    print(f"Exported {len(all_snapshots)} snapshots for {slug}")
```

## Storage Considerations

- Each market's snapshot data with order books can be several megabytes
- Consider storing only the fields you need (e.g., just prices, not full order book depth)
- Use `include_orderbook=false` to significantly reduce data size when you only need price data
- A local SQLite or PostgreSQL database works well for storing and querying exported data

## Incremental Sync Strategy

After your initial export, set up an **incremental sync** that fetches only new markets each day. Track the last exported market's start_time and query from that point forward. This keeps your local dataset current without re-downloading everything.

## Rate Limit Considerations

The free Starter plan allows 1,000 requests/day (60/min). A full export may take multiple days on the free plan. The Pro plan at **$11/month** gives you 50,000 requests/day (300/min), making bulk exports much faster.

## Related Resources

- [Polymarket Historical Data Download: CSV, JSON & Bulk Export](/p/polymarket-historical-data-download)
- [Rate Limiting Best Practices for PolyHistorical API](/p/rate-limiting-best-practices-polyhistorical)
- [PolyHistorical API Authentication and Security Guide](/p/polyhistorical-api-authentication-guide)

---
Source: https://polyhistorical.com/p/bulk-data-export-polymarket-historical
