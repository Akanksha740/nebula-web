# Polymarket Parquet Data: Download Order Book History in Parquet Format

> Download Polymarket historical order book data in Parquet format. PolyHistorical provides columnar Parquet exports for fast analysis of BTC, ETH, and SOL prediction markets.

*Category: Polymarket Historical Data*

## Why Parquet for Polymarket Data?

Apache Parquet is a **columnar storage format** designed for efficient analytical queries. For Polymarket order book data — where you often query specific columns (prices, depths, timestamps) across millions of rows — Parquet offers massive advantages over CSV or JSON.

## Parquet vs Other Formats

| Feature | Parquet | CSV | JSON |
| --- | --- | --- | --- |
| File Size | 5-10x smaller (compressed) | Baseline | 2-3x larger than CSV |
| Read Speed | Column pruning — read only what you need | Must scan full rows | Must parse full objects |
| Type Safety | ✓ Schema embedded | ✗ Everything is strings | Partial (no decimals) |
| pandas Loading | pd.read_parquet() — fast | pd.read_csv() — slow for large files | pd.read_json() — slowest |
| Nested Data | ✓ Supports nested order books | ✗ Requires flattening | ✓ Native |
| Spark / DuckDB | ✓ Native support | Requires parsing | Requires parsing |

## Data Schema

PolyHistorical Parquet exports include the following columns per snapshot:

| Column | Type | Description |
| --- | --- | --- |
| time | timestamp | Snapshot capture time (UTC) |
| price_up | decimal | Last trade price for Up outcome |
| price_down | decimal | Last trade price for Down outcome |
| coin_price | decimal | BTC/ETH/SOL spot price |
| volume | decimal | Cumulative market volume |
| liquidity | decimal | Total available liquidity |
| orderbook_up | struct | Full L2 bids/asks for Up token |
| orderbook_down | struct | Full L2 bids/asks for Down token |

## Loading Parquet Data in Python

```
import pandas as pd

# Load Parquet file — only read the columns you need
df = pd.read_parquet(
    "btc-5m-snapshots.parquet",
    columns=["time", "price_up", "price_down", "coin_price"]
)
print(f"Loaded {len(df):,} snapshots")
print(df.head())

# Calculate spread
df["spread"] = df["price_up"] + df["price_down"] - 1
print(f"Mean spread: {df['spread'].mean():.4f}")
```

## Using DuckDB for Fast Queries

```
import duckdb

# Query Parquet directly without loading into memory
result = duckdb.sql("""
    SELECT
        date_trunc('hour', time) AS hour,
        avg(price_up) AS avg_up,
        avg(price_down) AS avg_down,
        count(*) AS snapshots
    FROM 'btc-5m-snapshots.parquet'
    GROUP BY 1
    ORDER BY 1
""")
print(result.fetchdf())
```

## How to Get Parquet Exports

1. **API + conversion:** Fetch snapshots via the PolyHistorical API and save as Parquet using `df.to_parquet()`
2. **Bulk export:** Use the bulk data export endpoint to download large datasets, then convert to Parquet for offline analysis

```
import requests
import pandas as pd

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
df = pd.DataFrame(resp.json()["data"])
df.to_parquet(f"{slug}.parquet", index=False)
print(f"Saved {len(df)} snapshots to {slug}.parquet")
```

## When to Use Parquet

- **Large-scale backtesting:** Analyzing thousands of markets with millions of snapshots
- **Repeated analysis:** Load once, query many times — Parquet reads are 10-100x faster than CSV
- **Distributed processing:** Spark, Dask, and other frameworks read Parquet natively
- **Storage efficiency:** Archive months of order book history in a fraction of the CSV size

## Related Resources

- [Polymarket Historical Data Download: CSV, JSON & Bulk Export](/p/polymarket-historical-data-download)
- [Bulk Data Export Guide](/p/bulk-data-export-polymarket-historical)
- [Polymarket L2 Order Book: Full Depth Historical Data](/p/polymarket-l2-order-book)

---
Source: https://polyhistorical.com/p/polymarket-parquet-data
