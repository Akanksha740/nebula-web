# null

*Category: API & Developers*

## Two Different APIs, Two Different Purposes

Polymarket has its own API (the CLOB API) for live trading and current market data. PolyHistorical is a separate service that provides **historical order book snapshots** — data that Polymarket itself doesn't store or expose.

## Feature Comparison

| Feature | Polymarket CLOB API | PolyHistorical API |
| --- | --- | --- |
| Live Order Book | ✓ Current state | ✓ Historical snapshots |
| Historical Order Books | ✗ Not available | ✓ Sub-second, full depth |
| Place Orders | ✓ | ✗ Read-only |
| Market Metadata | ✓ Current markets | ✓ Including resolved |
| Resolved Market Data | Limited | ✓ Full snapshot history |
| Authentication | Wallet signature | API key |
| Rate Limits | Varies | 60-300 req/min by plan |
| Pricing | Free | Free tier + $11/mo Pro |

## When to Use Polymarket API

- You're building a **live trading bot** that places and manages orders
- You need the current order book state for real-time decisions
- You're integrating with Polymarket wallets or positions

## When to Use PolyHistorical API

- You're **backtesting strategies** and need historical order book data
- You're doing research on resolved markets (data that no longer exists on Polymarket)
- You need time-series analysis of order book evolution
- You want a simple API key auth instead of wallet signatures

## Using Both Together

The best trading systems use both: PolyHistorical for strategy development and backtesting, Polymarket CLOB API for live execution. Develop your edge with historical data, then deploy it live.

## Related Resources

- [Polymarket Historical Data API Documentation](/p/polymarket-historical-data-api-documentation)
- [PolyHistorical API Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Building a Polymarket Trading Bot](/p/building-polymarket-trading-bot)

---
Source: https://polyhistorical.com/p/polymarket-api-vs-polyhistorical-api
