# Polymarket Historical Data: Complete Guide to Free Order Book History

> Everything you need to know about accessing Polymarket historical data for free — order book snapshots, API access, and downloadable datasets from PolyHistorical.

*Category: Polymarket Historical Data*

If you're looking for **Polymarket historical data**, you've come to the right place. PolyHistorical is the only platform that gives you complete, historical order book data from Polymarket prediction markets — and you can start using it **completely free**.

## What Polymarket Historical Data Is Available?

PolyHistorical archives every order book snapshot from Polymarket's BTC, ETH, and SOL Up/Down prediction markets. This includes:

- **Full bid and ask depth** — not just top-of-book, but the entire order book at every level
- **Sub-second resolution** — snapshots captured at sub-second intervals
- **Multiple timeframes** — 5-minute, 15-minute, 1-hour, 4-hour, and 24-hour markets
- **Growing historical archive** — enough data to build and validate serious trading strategies

## Why Use PolyHistorical for Polymarket Historical Data?

Polymarket itself does not offer a historical data API. Once a market resolves, the order book data is gone. PolyHistorical solves this by continuously recording every snapshot so you can access it anytime — for research, backtesting, or building trading algorithms.

- **Free Starter tier** — access recent BTC market history with no credit card, no trial period
- **REST API** — clean, well-documented endpoints you can query from Python, JavaScript, or any language
- **Full order book depth** — use `include_orderbook=true` to get complete bid/ask ladders
- **Sub-second granularity** — the highest resolution Polymarket data available anywhere

## API Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /v1/markets` | List markets filtered by coin, type, and resolution status |
| `GET /v1/markets/{slug}` | Get details for a single market |
| `GET /v1/markets/{slug}/snapshots` | Fetch time-series snapshots with optional order book depth |
| `GET /v1/markets/by-market-id/{id}/snapshots` | Fetch snapshots using Polymarket market ID |

## How to Get Started

1. **Sign up for free** at PolyHistorical — no credit card required
2. **Get your API key** from the dashboard
3. **Start querying** historical order book data immediately via the `X-API-Key` header

Whether you're a quant researcher, a prediction market trader, or a developer building tools — PolyHistorical gives you the Polymarket historical data you need, for free.

## Related Resources

- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)
- [Polymarket Historical Data Download: CSV, JSON & Bulk Export](/p/polymarket-historical-data-download)
- [PolyHistorical API Authentication Guide](/p/polyhistorical-api-authentication-guide)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-guide
