# Polymarket ETH Odds Today: Live Ethereum Up/Down Prediction Market Lines

> How Polymarket ETH odds work — Ethereum Up/Down prediction markets, how share prices map to probabilities, and how to access historical ETH markets via PolyHistorical.

*Category: Crypto Trading*

Looking for **Polymarket ETH odds today**? Polymarket runs Ethereum Up/Down prediction markets across five timeframes — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour — that price the live probability of ETH closing higher or lower than its open. PolyHistorical archives every order book snapshot from these markets so you can study them after they resolve.

## What Are Polymarket ETH Odds?

Polymarket ETH odds are binary prediction market prices. Each Ethereum Up/Down market has two outcomes — **Up** and **Down** — and traders buy and sell shares that pay out $1 if their side wins. Because of that payout structure, the share price is directly the implied probability the market is assigning to each outcome.

## How to Read a Polymarket ETH Price

Prices on Polymarket are quoted in cents on the dollar between $0 and $1. The conversion to traditional odds formats is purely mathematical:

| Polymarket price | Implied probability | Decimal odds | American odds |
| --- | --- | --- | --- |
| $0.10 | 10% | 10.00 | +900 |
| $0.25 | 25% | 4.00 | +300 |
| $0.50 | 50% | 2.00 | +100 |
| $0.75 | 75% | 1.33 | -300 |
| $0.90 | 90% | 1.11 | -900 |

Formulas: `implied_probability = price` and `decimal_odds = 1 / price`.

## ETH Market Timeframes Covered

Polymarket runs three Ethereum Up/Down timeframes in parallel. PolyHistorical captures all of them:

- **5-minute (5m)**
- **15-minute (15m)**
- **1-hour (1h)**

Browse live and resolved ETH markets at [polyhistorical.com/markets/eth](/markets/eth) — every market lists its open time, resolution status, and full snapshot history.

## Querying ETH Markets via the API

The PolyHistorical API exposes Polymarket ETH markets through a simple REST interface. Authenticate with your API key in the `X-API-Key` header:

```
import requests

headers = {"X-API-Key": "your_api_key"}

# List recent ETH 1-hour markets
res = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "ETH", "market_type": "1h", "limit": 10},
    headers=headers,
).json()

for m in res["markets"]:
    print(m["slug"], "resolved=", m["resolved"])
```

## What Plan Do I Need?

ETH market data is part of the Pro plan. The free Starter plan is limited to BTC markets only — ETH and SOL coverage requires upgrading. Per the current plan limits:

- **Starter (Free)** — BTC markets only, ETH not included
- **Pro ($11/month)** — full BTC, ETH, and SOL coverage with unlimited history, 300 req/min, 50,000 req/day
- **Enterprise** — custom rate limits and dedicated infrastructure

See [polyhistorical.com/pricing](/pricing) for the full plan comparison.

## Get Started

Sign up free at [polyhistorical.com/signup](/signup) to get an API key, then upgrade to Pro to unlock Polymarket ETH market data.

## Related Resources

- [Polymarket Crypto Odds Today: BTC, ETH & SOL](/p/polymarket-crypto-odds-today)
- [Polymarket BTC Odds Today](/p/polymarket-btc-odds-today)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/polymarket-eth-odds-today
