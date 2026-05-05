# Polymarket Historical Data: Free vs Paid API Comparison

> Comparing free and paid options for accessing Polymarket historical market data.

*Category: Comparisons*

## Free vs Paid: What Do You Get?

PolyHistorical offers both free and paid tiers for accessing Polymarket historical order book data. Here's exactly what's included at each level.

## Plan Comparison

| Feature | Starter (Free) | Pro ($11/mo) | Enterprise |
| --- | --- | --- | --- |
| Coins | BTC, ETH, SOL | BTC, ETH, SOL | BTC, ETH, SOL |
| Market History | Last 50 (5m/15m), 24 (1h/4h), 5 (24h) | Unlimited | Unlimited |
| Order Book Depth | ✓ | ✓ | ✓ |
| Snapshot Granularity | Sub-second | Sub-second | Sub-second |
| Rate Limit | 60 req/min, 1K/day | 300 req/min, 50K/day | Custom |
| Credit Card Required | No | Yes | Invoice |

## When Free Is Enough

- You're **exploring** prediction market data for the first time
- You're building a prototype or proof of concept
- You only need recent market history for quick analysis
- You're a student or academic doing initial research

## When to Upgrade to Pro

- You need **unlimited historical depth** for comprehensive backtesting
- You're running automated strategies that need higher rate limits
- You need ETH and SOL data alongside BTC
- You're building a production application or trading bot

## Quick Start

```
curl -H "X-API-Key: YOUR_KEY" \
  "https://api.polyhistorical.com/v1/markets?coin=BTC&active=true"
```

Sign up free at [polyhistorical.com/signup](/signup) — no credit card required. Upgrade anytime from the dashboard.

## Related Resources

- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)
- [Best Free Polymarket Data API](/p/best-free-polymarket-data-api)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-free-vs-paid
