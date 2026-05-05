# Polymarket BTC Odds Today: Live Bitcoin Up/Down Prediction Markets

> How Polymarket BTC odds work — Bitcoin Up/Down prediction markets, how share prices map to probabilities, and how to access historical BTC markets via PolyHistorical.

*Category: Crypto Trading*

Looking for **Polymarket BTC odds today**? Polymarket runs short-duration Bitcoin Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of BTC closing higher or lower than its open. PolyHistorical archives every order book snapshot from these markets so you can study them after they resolve.

## What Are Polymarket BTC Odds?

Polymarket BTC odds aren't sportsbook lines. Each Bitcoin Up/Down market is a binary prediction market with two outcomes — **Up** and **Down** — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability that the market is assigning to each outcome.

## How to Read a Polymarket BTC Price

Prices on Polymarket are quoted in cents on the dollar between $0 and $1. The conversion to traditional odds formats is purely mathematical:

| Polymarket price | Implied probability | Decimal odds | American odds |
| --- | --- | --- | --- |
| $0.10 | 10% | 10.00 | +900 |
| $0.25 | 25% | 4.00 | +300 |
| $0.50 | 50% | 2.00 | +100 |
| $0.75 | 75% | 1.33 | -300 |
| $0.90 | 90% | 1.11 | -900 |

The formulas: `implied_probability = price`, `decimal_odds = 1 / price`, and `american_odds = (1 / price - 1) × 100` for prices below $0.50, or `-100 / (1 / price - 1)` for prices at or above $0.50.

## BTC Market Timeframes Covered

Polymarket runs five Bitcoin Up/Down timeframes in parallel. PolyHistorical captures all of them:

- **5-minute (5m)**
- **15-minute (15m)**
- **1-hour (1h)**
- **4-hour (4h)**
- **24-hour (24h)**

Browse live and resolved BTC markets at [polyhistorical.com/markets/btc](/markets/btc) — every market lists its open time, resolution status, and full snapshot history.

## Querying BTC Markets via the API

The PolyHistorical API exposes Polymarket BTC markets through a simple REST interface. Authenticate with your API key in the `X-API-Key` header:

```
import requests

headers = {"X-API-Key": "your_api_key"}

# List recent BTC 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
```

## What's Available on the Free Plan

The Starter plan is free, no credit card required, and covers BTC markets only. Per the current plan limits:

- BTC 5m & 15m — last 50 markets
- BTC 1h & 4h — last 24 markets
- BTC 24h — last 5 markets
- 60 requests/minute, 1,000 requests/day
- Order book depth and sub-second snapshot granularity included

For unlimited BTC history (plus ETH and SOL), upgrade to [Pro at $11/month](/pricing).

## Get Started

Sign up free at [polyhistorical.com/signup](/signup) to get an API key and start querying Polymarket BTC market data.

## Related Resources

- [Polymarket Crypto Odds Today: BTC, ETH & SOL](/p/polymarket-crypto-odds-today)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)

---
Source: https://polyhistorical.com/p/polymarket-btc-odds-today
