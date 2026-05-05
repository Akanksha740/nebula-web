# How to Analyze Polymarket Up/Down Markets

> A complete guide to analyzing Polymarket BTC, ETH, and SOL Up/Down prediction markets using historical data.

*Category: Crypto Trading*

## What Are Up/Down Markets?

Polymarket's Up/Down markets are binary prediction markets that ask: "Will BTC (or ETH/SOL) be above or below a strike price at a specific time?" Each market has two outcomes — **Up** and **Down** — priced between $0 and $1, representing probabilities.

## Market Structure

| Component | Description | Example |
| --- | --- | --- |
| Strike Price | The reference price at market creation | BTC $94,500 |
| Up Price | Probability BTC will be above strike | $0.55 (55%) |
| Down Price | Probability BTC will be below strike | $0.45 (45%) |
| Timeframe | Duration until resolution | 5m, 15m, 1h, 4h, 24h |
| Resolution | Final BTC price vs strike | Pays $1 to winner |

## Key Analysis Techniques

### 1. Price-Probability Mapping

The Up price directly represents the market's estimated probability. If Up is priced at $0.62, the market thinks there's a 62% chance BTC will be above the strike at resolution.

### 2. Spread Analysis

The bid-ask spread reveals liquidity and consensus. Tight spreads ($0.01-0.02) indicate strong market agreement. Wide spreads ($0.05+) suggest uncertainty or low liquidity — potential opportunity for patient traders.

### 3. Depth Imbalance

Compare total bid depth vs ask depth in the order book. A strong imbalance (e.g., 3:1 bids to asks) can signal incoming price movement in that direction.

### 4. Cross-Timeframe Analysis

Compare the same coin across different timeframes. If the 5m market is pricing Up at $0.55 but the 1h market is at $0.65, there may be a short-term pessimism that the longer timeframe doesn't share.

## Getting Historical Data

```
import requests

resp = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    headers={"X-API-Key": "your_key"},
    params={"coin": "BTC", "market_type": "5m"}
)
for m in resp.json()["data"]:
    print(f"{m['slug']} — Up: {m['price_up']}")
```

## Related Resources

- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)
- [Polymarket BTC Odds Today](/p/polymarket-btc-odds-today)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/how-to-analyze-polymarket-up-down-markets
