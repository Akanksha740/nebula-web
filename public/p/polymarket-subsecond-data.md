# Polymarket Subsecond Data: 300ms Order Book Snapshots

> Access Polymarket subsecond data with 300ms order book snapshots. PolyHistorical captures full bid/ask depth at sub-second intervals for BTC, ETH, and SOL Up/Down markets.

*Category: Polymarket Historical Data*

## What Is Polymarket Subsecond Data?

Polymarket subsecond data refers to **order book snapshots captured at intervals below one second** — specifically every 300 milliseconds. PolyHistorical is the only provider that archives Polymarket order books at this granularity, giving you 200x more data points than minute-level providers.

## Why Subsecond Granularity Matters

| Use Case | Subsecond (300ms) | Minute-Level (60s) |
| --- | --- | --- |
| 5-minute market analysis | ~1,000 snapshots per market | 5 snapshots per market |
| Scalping strategy backtests | Realistic fill simulation | Not viable |
| Order book sweep detection | Captures the event as it happens | Usually missed entirely |
| Spread dynamics | See spreads open, narrow, and widen | Only average spread visible |
| Market microstructure research | Publication-quality granularity | Insufficient for most studies |
| Slippage modeling | Accurate execution simulation | Rough approximation only |

## What Each Snapshot Contains

Every 300ms snapshot from PolyHistorical includes:

- **Timestamp** — precise capture time
- **Price Up / Price Down** — last trade prices for both outcomes
- **Full order book (Up)** — all bid and ask levels with sizes
- **Full order book (Down)** — all bid and ask levels with sizes
- **Volume** — cumulative market volume
- **Liquidity** — total available liquidity
- **Coin price** — BTC/ETH/SOL spot price at that moment

## Coverage

Subsecond snapshots are captured for all Polymarket Up/Down markets across:

- **Coins:** BTC, ETH, SOL
- **Timeframes:** 5-minute, 15-minute, 1-hour, 4-hour, 24-hour
- **History:** Unlimited on Pro ($11/mo), recent markets on the free Starter tier

## Fetch Subsecond Data via API

```
import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
snapshots = resp.json()["data"]
print(f"Snapshots: {len(snapshots)} at ~300ms intervals")
for snap in snapshots[:3]:
    bids = len(snap["orderbook_up"]["bids"])
    asks = len(snap["orderbook_up"]["asks"])
    print(f"  {snap['time']} — Up: {snap['price_up']}, {bids} bids, {asks} asks")
```

## Subsecond Data for Backtesting

Subsecond data is critical for realistic backtesting of prediction market strategies. With 300ms snapshots, you can:

- **Simulate limit order fills** by checking the actual order book state at each decision point
- **Model slippage** by walking through order book depth rather than using a flat percentage
- **Test timing-sensitive strategies** like scalping, where entry/exit precision matters
- **Detect microstructure patterns** like depth clustering, spoofing, and liquidity cycles

## How It Compares

| Provider | Polymarket Order Book History | Granularity | Price |
| --- | --- | --- | --- |
| PolyHistorical | ✓ Full depth | 300ms (subsecond) | Free / $11 Pro |
| Polymarket CLOB API | ✗ Live only | Real-time (no history) | Free |
| Dune Analytics | ✗ On-chain trades only | Block-level | Free / paid |
| Kaiko / Amberdata | ✗ No prediction markets | 10s-1min (CEX only) | $5,000+/mo |

## Get Started

Sign up free at [polyhistorical.com/signup](/signup) — no credit card required. Start querying Polymarket subsecond order book data in under 2 minutes.

## Related Resources

- [Sub-Second vs Minute-Level Data: Why Granularity Matters](/p/sub-second-vs-minute-level-market-data)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)
- [Scalping Strategies for Polymarket Prediction Markets](/p/scalping-strategies-polymarket)

---
Source: https://polyhistorical.com/p/polymarket-subsecond-data
