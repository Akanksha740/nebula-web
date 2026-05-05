# Liquidity Analysis for Polymarket Markets

> How to measure and analyze liquidity in Polymarket prediction markets using historical order book depth data.

*Category: Use Cases*

## Why Liquidity Analysis Matters

Liquidity determines how easily you can enter and exit prediction market positions without moving the price. For Polymarket traders, understanding liquidity patterns using **PolyHistorical order book data** is essential for optimal execution and strategy development.

## Liquidity Metrics You Can Calculate

| Metric | What It Measures | PolyHistorical Data Used |
| --- | --- | --- |
| Bid-Ask Spread | Cost of immediate round-trip trade | Best bid and best ask prices |
| Market Depth | Volume available within X% of midpoint | Full order book depth |
| Resilience | How quickly the book recovers after a large trade | Sequential order book snapshots |
| Kyle's Lambda | Price impact per unit of volume | Price changes relative to volume |
| Amihud Illiquidity | Absolute return per dollar of volume | Price returns and trading volume |

## Measuring Market Depth

Market depth measures how much volume is available at or near the current price. Using PolyHistorical's **full order book depth data**, you can calculate depth at multiple levels — for example, the total volume within 1%, 2%, and 5% of the midpoint price.

### Depth Analysis Steps

- Fetch full order book snapshots from the PolyHistorical API
- Calculate the midpoint price from best bid and best ask
- Sum bid volume within 1%, 2%, 5% of midpoint
- Sum ask volume within the same ranges
- Track depth over time to identify liquidity patterns

## Liquidity Patterns in Prediction Markets

Polymarket prediction markets exhibit distinct liquidity patterns that differ from traditional exchanges:

- **Time-of-day effects:** Liquidity tends to be higher during US trading hours
- **Event-driven thinning:** Order books thin out before major news events as market makers pull orders
- **Resolution approach:** Liquidity often decreases as markets near their resolution date
- **Price-level dependency:** Markets at extreme prices (near 0 or 1) have less liquidity

## Practical Applications

Liquidity analysis informs multiple trading decisions. **Market makers** use depth data to set optimal quote widths. **Algo traders** use liquidity patterns to time entries and exits. **Researchers** use liquidity metrics to study prediction market efficiency and microstructure.

### Building a Liquidity Dashboard

- Track real-time and historical spread for each Polymarket market
- Monitor depth changes to detect liquidity events
- Compare liquidity across different market types (5m, 15m, 1h, 4h, 24h)
- Alert on unusual liquidity changes that may signal informed trading

## Get Started

PolyHistorical's free tier includes full order book depth for BTC markets — everything you need to start building liquidity analysis tools. The Pro plan at **$11/month** extends coverage to all markets for comprehensive liquidity monitoring.

## Related Resources

- [Understanding Bid-Ask Spread in Prediction Markets](/p/understanding-bid-ask-spread-prediction-markets)
- [Spread Trading Strategies for Prediction Markets](/p/spread-trading-prediction-markets)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)

---
Source: https://polyhistorical.com/p/liquidity-analysis-polymarket
