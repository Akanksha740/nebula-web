# Market Resolution Data Explained: How Polymarket Settles

> Understanding how Polymarket markets resolve, what settlement data looks like, and how to use resolution history in your analysis.

*Category: Market Data Guides*

## How Polymarket Markets Resolve

Polymarket prediction markets have defined resolution criteria — for BTC/ETH/SOL Up/Down markets, the resolution is based on whether the asset price is above or below a strike price at a specific time. Understanding this resolution process is critical for anyone analyzing historical data from **PolyHistorical**.

## Resolution Mechanics for Up/Down Markets

| Market Type | Resolution Time | Resolution Criteria |
| --- | --- | --- |
| 5-minute | Every 5 minutes | BTC/ETH/SOL price vs strike at end of 5-min window |
| 15-minute | Every 15 minutes | BTC/ETH/SOL price vs strike at end of 15-min window |
| 1-hour | Every hour | BTC/ETH/SOL price vs strike at end of hour |
| 4-hour | Every 4 hours | BTC/ETH/SOL price vs strike at end of 4-hour block |
| 24-hour | Daily | BTC/ETH/SOL price vs strike at end of day (UTC) |

## What Resolution Data Looks Like

When a market resolves, the outcome is binary: **Yes ($1)** or **No ($0)**. If BTC is above the strike price at resolution, the "Up" contract pays $1 and the "Down" contract pays $0. PolyHistorical captures the full order book history leading up to each resolution, letting you study how prices converge to the final outcome.

### Pre-Resolution Order Book Behavior

- As the outcome becomes clearer, prices move toward $0 or $1
- The bid-ask spread typically narrows as uncertainty decreases
- Order book depth may thin as market makers reduce exposure
- Some markets see a last-minute flurry of activity from informed traders

## Using Resolution History for Research

Historical resolution data is invaluable for several types of analysis:

- **Calibration studies:** Do markets priced at 0.70 actually resolve Yes 70% of the time?
- **Market efficiency:** How quickly do prices incorporate new information before resolution?
- **Strategy evaluation:** Test whether your model would have been profitable across past resolutions
- **Convergence analysis:** How far before resolution do prices begin converging to the outcome?

## Resolution Edge Cases

Understanding edge cases helps avoid surprises in your analysis. Some considerations for Polymarket resolution data:

- **Disputed resolutions** may have unusual order book behavior in the final moments
- **Markets near the strike** can have high uncertainty until the very last second
- **Oracle delays** occasionally cause brief periods where the outcome is known but not yet settled
- **Complementary markets** (Up/Down pairs) should always sum to approximately $1

## Accessing Resolution Data with PolyHistorical

PolyHistorical stores order book snapshots through and beyond market resolution. This means you can reconstruct exactly how the order book looked 1 minute, 5 minutes, or 1 hour before each resolution — critical for backtesting and market efficiency research. Start exploring with the free tier for BTC, ETH, and SOL markets.

## Related Resources

- [Polymarket Historical Data Availability](/p/polymarket-historical-data-availability)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)

---
Source: https://polyhistorical.com/p/market-resolution-data-explained
