# Polymarket L2 Order Book: Full Depth Historical Data

> Access Polymarket L2 order book data — full depth bid/ask snapshots at 300ms intervals. PolyHistorical archives every level of the order book for BTC, ETH, and SOL Up/Down markets.

*Category: Polymarket Historical Data*

## What Is L2 Order Book Data?

L2 (Level 2) order book data shows **every price level** in the order book — not just the best bid and ask (L1), but the full depth of resting orders at each price point. On Polymarket, this means seeing exactly how many shares are available at $0.50, $0.51, $0.52, and so on for both Up and Down outcome tokens.

## L1 vs L2 Order Book Data

| Feature | L1 (Top of Book) | L2 (Full Depth) |
| --- | --- | --- |
| Price Levels | Best bid + best ask only | All bid and ask levels |
| Depth Visibility | Size at top level only | Size at every price level |
| Spread | ✓ | ✓ Plus depth behind it |
| Slippage Estimation | Not possible | ✓ Walk the book to simulate fills |
| Liquidity Analysis | Surface-level only | ✓ Full liquidity profile |
| Market Making | Insufficient | ✓ See competitor depth |

## Why L2 Data Matters for Prediction Markets

- **Slippage modeling:** Walk through the order book to calculate actual fill prices for any order size — critical for realistic backtesting
- **Liquidity assessment:** See how much capital is available within 1%, 2%, or 5% of the midpoint
- **Market maker analysis:** Identify where liquidity providers are placing their depth and how it shifts over time
- **Support/resistance detection:** Large resting orders at specific price levels act as barriers to price movement
- **Order flow imbalance:** Compare total bid depth vs ask depth to gauge directional sentiment

## PolyHistorical L2 Data Structure

Each snapshot from PolyHistorical includes the complete L2 order book for both the Up and Down outcome tokens:

```
{
  "time": "2026-04-27T14:30:00.300Z",
  "price_up": "0.5800",
  "price_down": "0.4200",
  "coin_price": "94521.50",
  "orderbook_up": {
    "bids": [
      { "price": "0.5700", "size": "1250.00" },
      { "price": "0.5600", "size": "800.00" },
      { "price": "0.5500", "size": "2100.00" }
    ],
    "asks": [
      { "price": "0.5800", "size": "950.00" },
      { "price": "0.5900", "size": "1400.00" },
      { "price": "0.6000", "size": "3200.00" }
    ]
  },
  "orderbook_down": {
    "bids": [ ... ],
    "asks": [ ... ]
  }
}
```

## Fetch L2 Order Book History

```
import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1430"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
for snap in resp.json()["data"][:3]:
    book = snap["orderbook_up"]
    bid_depth = sum(float(l["size"]) for l in book["bids"])
    ask_depth = sum(float(l["size"]) for l in book["asks"])
    imbalance = (bid_depth - ask_depth) / (bid_depth + ask_depth)
    print(f"{snap['time']} — Bid depth: {bid_depth:.0f}, Ask depth: {ask_depth:.0f}, Imbalance: {imbalance:+.2f}")
```

## Use Cases for L2 History

| Use Case | What L2 Data Enables |
| --- | --- |
| Backtesting | Simulate realistic fills by walking the book at each decision point |
| Market Making | Analyze historical spread and depth to calibrate quoting strategies |
| Scalping | Detect short-lived depth imbalances that precede price moves |
| Academic Research | Study market microstructure, price impact, and liquidity provision |
| Risk Management | Estimate worst-case slippage for position sizing |

## Coverage & Pricing

- **Coins:** BTC, ETH, SOL Up/Down markets
- **Timeframes:** 5m, 15m, 1h, 4h, 24h
- **Granularity:** 300ms snapshots with full L2 depth
- **Free tier:** Recent markets, no credit card required
- **Pro ($11/mo):** Unlimited historical depth for all coins

## Related Resources

- [What Is Polymarket Order Book Data?](/p/what-is-polymarket-order-book-data)
- [Polymarket Subsecond Data: 300ms Snapshots](/p/polymarket-subsecond-data)
- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)

---
Source: https://polyhistorical.com/p/polymarket-l2-order-book
