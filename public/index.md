# PolyHistorical — Polymarket Order Book Data API

> 300ms order book snapshots for every BTC, ETH, and SOL Polymarket market. Full bid/ask depth, 13,000+ resolved markets. Built for traders, bots, and researchers.

PolyHistorical is an independent historical-data API for Polymarket prediction markets. It is not affiliated with, endorsed by, or connected to Polymarket or any exchange. The product captures the full Level-2 order book at 300ms intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.

## What you get

- **Order book depth** — every bid, every ask, every price level, for both UP and DOWN tokens. Compute realistic slippage, model fills, measure liquidity.
- **300ms snapshots** — sub-second resolution lets you see depth shifts that minute-level candles hide.
- **REST API** — sub-50ms responses, pagination, filtering, rate limits suitable for both manual research and automated workloads.
- **Strategy Replay (Pro)** — pick a resolved market, define entry/exit rules in dropdowns, watch the market replay tick-by-tick with your strategy applied. PnL, drawdown, slippage, and win rate computed from real fills on the actual order book.
- **Complete archive** — markets stay available forever after resolution, with winners, final volumes, and settlement metadata preserved.

## Markets covered

- BTC Up/Down — 5m, 15m, 1h, 4h, 24h
- ETH Up/Down — 5m, 15m, 1h
- SOL Up/Down — 5m, 15m, 1h

Reference prices sourced from Binance and Chainlink. 13,000+ resolved markets in the archive.

## Pricing summary

- **Starter** — Free, no credit card. BTC last 50 (5m & 15m), last 24 (1h & 4h), last 5 (24h). 60 req/min, 1,000 req/day.
- **Pro** — $11/month. All BTC, ETH, SOL markets, unlimited history, Strategy Replay, priority support. 300 req/min, 50,000 req/day.
- **Enterprise** — Custom. Custom endpoints, dedicated infra, flexible rate limits, hands-on onboarding.

See [pricing.md](https://polyhistorical.com/pricing.md) for full details.

## FAQ

### Is PolyHistorical affiliated with Polymarket?

No. PolyHistorical is an independent data provider, not affiliated with, endorsed by, or connected to Polymarket or any exchange.

### How granular is the snapshot data?

Full order book state at 300ms intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.

### Is the API built for automated access?

Yes. Sub-50ms responses, pagination, filtering, and rate limits designed for both manual research and automated workloads.

### What markets are supported?

BTC Up/Down across 5m, 15m, 1h, 4h, and 24h timeframes; ETH and SOL across 5m, 15m, and 1h. Each market includes complete order book history from open to resolution.

### How is this different from candle/OHLC data?

Candles summarize price movement. PolyHistorical gives you the full order book — every bid, every ask, every price level. You can simulate realistic fills with actual slippage, measure spread dynamics, and see depth shifts that candles hide.

### Can I try before paying?

Yes. The free Starter tier gives you access to recent BTC markets with full order book depth and 300ms resolution. No credit card required.

### Can I see how my strategy would have played out on a past market?

Yes. Pro includes Strategy Replay. Pick any resolved market, define entry/exit rules with dropdowns, and watch the market replay tick-by-tick with your strategy applied. PnL, drawdown, slippage, and win rate are computed from real fills on the actual order book, not estimates.
