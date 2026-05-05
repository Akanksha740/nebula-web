# Polymarket Crypto Odds Today: BTC, ETH & SOL Up/Down Markets

> How Polymarket crypto odds work across BTC, ETH, and SOL Up/Down prediction markets — pricing, conversion to traditional odds, and how to query historical snapshots.

*Category: Crypto Trading*

Looking for **Polymarket crypto odds today**? Polymarket runs continuous Up/Down prediction markets for the three crypto assets covered by PolyHistorical — Bitcoin, Ethereum, and Solana — across 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour windows. PolyHistorical archives every order book snapshot so you can study how odds evolved after a market resolves.

## What Are Polymarket Crypto Odds?

Polymarket crypto odds are binary prediction market prices, not sportsbook lines. Each Up/Down market resolves based on whether the underlying asset closes above or below its opening price. Outcomes trade between $0 and $1, and because each winning $1 share pays $1, the share price is directly the implied probability the market is assigning to that outcome.

## Crypto Markets Covered

| Asset | Plan required | Browse |
| --- | --- | --- |
| BTC | Starter (Free) and above | [/markets/btc](/markets/btc) |
| ETH | Pro ($11/month) and above | [/markets/eth](/markets/eth) |
| SOL | Pro ($11/month) and above | [/markets/sol](/markets/sol) |

## How to Read Polymarket Crypto Prices

Polymarket prices are quoted in cents on the dollar between $0 and $1. Conversion to traditional odds formats is purely mathematical:

| Polymarket price | Implied probability | Decimal odds | American odds |
| --- | --- | --- | --- |
| $0.10 | 10% | 10.00 | +900 |
| $0.25 | 25% | 4.00 | +300 |
| $0.50 | 50% | 2.00 | +100 |
| $0.75 | 75% | 1.33 | -300 |
| $0.90 | 90% | 1.11 | -900 |

Formulas: `implied_probability = price` and `decimal_odds = 1 / price`.

## Timeframes Covered

Each asset (BTC, ETH, SOL) has the same five Up/Down timeframes available through PolyHistorical:

- **5-minute (5m)**
- **15-minute (15m)**
- **1-hour (1h)**
- **4-hour (4h)**
- **24-hour (24h)**

## Querying Crypto Markets via the API

The PolyHistorical API uses the same endpoint shape for every coin — only the `coin` query parameter changes. Authenticate with your API key in the `X-API-Key` header:

```
import requests

headers = {"X-API-Key": "your_api_key"}

for coin in ("BTC", "ETH", "SOL"):
    res = requests.get(
        "https://api.polyhistorical.com/v1/markets",
        params={"coin": coin, "market_type": "1h", "limit": 5},
        headers=headers,
    ).json()
    print(f"{coin}: {len(res['markets'])} markets returned")
```

## Plan Comparison

- **Starter (Free)** — BTC only. Last 50 markets for 5m/15m, last 24 for 1h/4h, last 5 for 24h. 60 req/min, 1,000 req/day. No credit card required.
- **Pro ($11/month)** — Full BTC, ETH, and SOL coverage with unlimited history. 300 req/min, 50,000 req/day.
- **Enterprise** — Custom rate limits, dedicated infrastructure, hands-on onboarding.

See [polyhistorical.com/pricing](/pricing) for the full plan breakdown.

## Get Started

Sign up free at [polyhistorical.com/signup](/signup) to get an API key. Start on Starter for BTC, then upgrade to Pro to unlock ETH and SOL markets.

## Related Resources

- [Polymarket BTC Odds Today](/p/polymarket-btc-odds-today)
- [Polymarket ETH Odds Today](/p/polymarket-eth-odds-today)
- [Polymarket SOL Odds Today](/p/polymarket-sol-odds-today)

---
Source: https://polyhistorical.com/p/polymarket-crypto-odds-today
