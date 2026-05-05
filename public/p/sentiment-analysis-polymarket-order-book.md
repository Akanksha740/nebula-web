# Sentiment Analysis Using Polymarket Order Book Data

> How to derive market sentiment signals from Polymarket order book depth and historical bid-ask patterns.

*Category: Use Cases*

## Order Books as Sentiment Indicators

Polymarket order books contain rich sentiment information that goes beyond simple price data. By analyzing the **depth, imbalance, and dynamics** of bids and asks, you can extract actionable sentiment signals using historical data from PolyHistorical.

## Key Sentiment Metrics from Order Book Data

| Metric | Formula | Interpretation |
| --- | --- | --- |
| Bid-Ask Imbalance | (Bid Volume - Ask Volume) / Total Volume | Positive = bullish sentiment, negative = bearish |
| Depth Ratio | Bid Depth within 5% / Ask Depth within 5% | Higher ratio = stronger buying interest |
| Spread Trend | Change in bid-ask spread over time | Narrowing = increasing confidence, widening = uncertainty |
| Large Order Presence | Orders > 2x average size | Institutional interest or informed trading |

## Bid-Ask Imbalance Analysis

The bid-ask imbalance is one of the most powerful sentiment signals available in order book data. When the **bid side is significantly deeper** than the ask side, it suggests more participants want to buy the outcome — a bullish signal. PolyHistorical's sub-second snapshots let you track how this imbalance evolves in real time.

### How to Calculate It

- Fetch order book snapshots at regular intervals using the PolyHistorical API
- Sum bid volume within a defined price range (e.g., top 10 levels)
- Sum ask volume within the same range
- Compute the ratio: (bid_vol - ask_vol) / (bid_vol + ask_vol)
- Track this ratio over time to identify sentiment shifts

## Spread as a Confidence Indicator

The bid-ask spread in prediction markets reflects market uncertainty. A **tight spread** (e.g., 0.01-0.02) indicates strong consensus on the outcome probability. A **wide spread** (e.g., 0.05+) suggests disagreement or low liquidity. Tracking spread trends with PolyHistorical data reveals how sentiment is crystallizing over time.

## Order Flow Sentiment

By comparing consecutive order book snapshots, you can infer **net order flow** — whether new orders are predominantly bids or asks. A sustained period of bid-side order flow typically precedes price increases in prediction markets.

### Practical Applications

- Build a sentiment dashboard tracking bid-ask imbalance across all Polymarket markets
- Create alerts when sentiment metrics cross predefined thresholds
- Combine order book sentiment with external news events for trading signals
- Use historical sentiment patterns to improve prediction accuracy

## Getting Started with Sentiment Analysis

PolyHistorical's free tier gives you access to BTC market order book history — enough to prototype sentiment analysis models. Upgrade to Pro at **$11/month** for multi-market coverage and build a comprehensive sentiment analysis pipeline across all Polymarket prediction markets.

## Related Resources

- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)
- [Volume Analysis for Polymarket Trading](/p/volume-analysis-polymarket-trading)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/sentiment-analysis-polymarket-order-book
