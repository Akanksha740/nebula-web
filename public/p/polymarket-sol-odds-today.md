# Polymarket SOL Odds Today: Live Solana Up/Down Prediction Markets

> How Polymarket SOL odds work — Solana Up/Down prediction markets, how share prices map to probabilities, and how to access SOL markets via PolyHistorical Pro.

*Category: Crypto Trading*

Looking for **Polymarket SOL odds today**? Polymarket runs Solana Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of SOL closing higher or lower than its open. PolyHistorical now archives every order book snapshot from these SOL markets alongside its existing BTC and ETH coverage.

## What Are Polymarket SOL Odds?

Polymarket SOL odds are binary prediction market prices. Each Solana Up/Down market has two outcomes — **Up** and **Down** — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability the market is assigning to each outcome.

## How to Read a Polymarket SOL Price

Prices on Polymarket are quoted in cents on the dollar between $0 and $1. The conversion to traditional odds formats is purely mathematical:

| Polymarket price | Implied probability | Decimal odds | American odds |
| --- | --- | --- | --- |
| $0.10 | 10% | 10.00 | +900 |
| $0.25 | 25% | 4.00 | +300 |
| $0.50 | 50% | 2.00 | +100 |
| $0.75 | 75% | 1.33 | -300 |
| $0.90 | 90% | 1.11 | -900 |

Formulas: `implied_probability = price` and `decimal_odds = 1 / price`.

## SOL Market Timeframes Covered

Polymarket runs three Solana Up/Down timeframes in parallel:

- **5-minute (5m)**
- **15-minute (15m)**
- **1-hour (1h)**

Browse live and resolved SOL markets at [polyhistorical.com/markets/sol](/markets/sol) — every market lists its open time, resolution status, and full snapshot history.

## Querying SOL Markets via the API

The PolyHistorical API exposes Polymarket SOL markets through the same endpoints used for BTC and ETH. Authenticate with your API key in the `X-API-Key` header:

```
import requests

headers = {"X-API-Key": "your_pro_api_key"}

# List recent SOL 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "SOL", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
```

## What Plan Do I Need?

SOL market data is part of the Pro plan. The free Starter plan is limited to BTC markets only — SOL coverage requires upgrading. Per the current plan limits:

- **Starter (Free)** — BTC markets only, SOL not included
- **Pro ($11/month)** — full BTC, ETH, and SOL coverage with unlimited history, 300 req/min, 50,000 req/day
- **Enterprise** — custom rate limits and dedicated infrastructure

See [polyhistorical.com/pricing](/pricing) for the full plan comparison.

## Get Started

Sign up free at [polyhistorical.com/signup](/signup) to get an API key, then upgrade to Pro to unlock Polymarket SOL market data.

## Related Resources

- [Polymarket Crypto Odds Today: BTC, ETH & SOL](/p/polymarket-crypto-odds-today)
- [Polymarket BTC Odds Today](/p/polymarket-btc-odds-today)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/polymarket-sol-odds-today
