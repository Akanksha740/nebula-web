# Polymarket Historical Data API Documentation: Endpoints, Auth & Examples

> Full API documentation for Polymarket historical data — endpoints, authentication, rate limits, and code examples. Free access via PolyHistorical.

*Category: Polymarket Historical Data*

This is the complete **Polymarket historical data API documentation** for PolyHistorical. Everything you need to start fetching prediction market order book data — for free.

## Base URL

```
https://api.polyhistorical.com/v1
```

## Authentication

Include your API key in the `X-API-Key` header with every request:

```
curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.polyhistorical.com/v1/markets?coin=BTC&limit=5
```

Get a free API key by signing up at PolyHistorical. No credit card required.

## Endpoints

### GET /v1/markets

List all markets with filtering and pagination. Returns markets sorted by start_time descending.

| Parameter | Required | Description |
| --- | --- | --- |
| `coin` | Yes | Cryptocurrency: BTC, ETH, SOL |
| `market_type` | No | Filter by type: 5m, 15m, 1hr, 4hr, 24hr |
| `resolved` | No | Filter by resolution status (true/false) |
| `limit` | No | Results to return, 1-100 (default 100) |
| `offset` | No | Pagination offset (default 0) |

### GET /v1/markets/{slug}

Get detailed data for a single market by its slug.

### GET /v1/markets/{slug}/snapshots

Fetch time-series snapshots for a specific market, including price data and optional order book depth.

| Parameter | Required | Description |
| --- | --- | --- |
| `limit` | No | Snapshots to return, 1-1000 (default 1000) |
| `offset` | No | Pagination offset (default 0) |
| `include_orderbook` | No | Include full order book bids/asks (default false) |

### GET /v1/markets/by-market-id/{marketId}/snapshots

Same as above, but uses the Polymarket market ID instead of the slug. Useful when you have the market ID from Polymarket directly.

## Rate Limits

| Plan | Requests/min | Requests/day |
| --- | --- | --- |
| Starter (Free) | 60 | 1,000 |
| Pro ($11/mo) | 300 | 50,000 |
| Enterprise | Custom | Unlimited |

## Market Access by Plan

| Market Type | Starter (Free) | Pro / Enterprise |
| --- | --- | --- |
| BTC 5m & 15m | Last 50 markets | All |
| BTC 1h & 4h | Last 24 markets | All |
| BTC 24h | Last 5 markets | All |
| ETH 5m, 15m & 1h | — | All |
| SOL 5m, 15m & 1h | — | All |

ETH and SOL markets require a Pro or Enterprise plan. All snapshots within an accessible market are included on every plan — no snapshot limits.

## Get Started

Sign up for free, get your API key, and start querying Polymarket historical data in minutes. The free tier has no expiration — use it as long as you need.

## Related Resources

- [PolyHistorical API Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Rate Limiting Best Practices](/p/rate-limiting-best-practices-polyhistorical)
- [Polymarket Historical Data API](/p/polymarket-historical-data-api)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-api-documentation
