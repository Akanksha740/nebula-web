# Polymarket Historical Data Availability: What Data Exists & How Far Back

> Full breakdown of Polymarket historical data availability — which markets are covered, how far back the data goes, and snapshot granularity on PolyHistorical.

*Category: Polymarket Historical Data*

One of the most common questions we get: *"How much Polymarket historical data do you actually have?"* Here's the complete breakdown of **Polymarket historical data availability** on PolyHistorical.

## Markets Covered

| Coin | Timeframes | Direction | Status |
| --- | --- | --- | --- |
| BTC | 5m, 15m, 1hr, 4hr, 24hr | Up & Down | Active |
| ETH | 5m, 15m, 1hr | Up & Down | Coming soon |
| SOL | 5m, 15m, 1hr | Up & Down | Coming soon |

## How Far Back Does the Data Go?

PolyHistorical has been recording Polymarket order book data since the early days of the BTC Up/Down markets. The archive continues to grow every day as new snapshots are captured in real-time. The Pro plan gives you access to the full historical archive.

## Free Tier vs Pro Access

| Market Type | Starter (Free) | Pro ($11/mo) |
| --- | --- | --- |
| BTC 5m & 15m | Last 50 markets | All historical |
| BTC 1hr & 4hr | Last 24 markets | All historical |
| BTC 24hr | Last 5 markets | All historical |

## Snapshot Granularity

Snapshots are captured at **sub-second resolution** — the highest available anywhere for Polymarket data. This means:

- A 5-minute market window can contain **hundreds of snapshots**
- You get enough resolution to study micro-structure, detect patterns, and simulate realistic execution
- All snapshots within an accessible market are included on every plan — no snapshot limits

## Data Depth per Snapshot

Each snapshot includes price data by default. With `include_orderbook=true`, you also get:

- Full bid ladder for Up and Down outcomes — every price level and size
- Full ask ladder for Up and Down outcomes — every price level and size
- Coin price at snapshot time
- Up and Down outcome prices (0-1)

## Free Access

Start with the free Starter plan — no credit card required. Access recent BTC markets immediately. Upgrade to Pro at $11/month for full historical access to all markets.

## Related Resources

- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [Polymarket Historical Data API](/p/polymarket-historical-data-api)
- [Download Historical Data](/p/polymarket-historical-data-download)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-availability
