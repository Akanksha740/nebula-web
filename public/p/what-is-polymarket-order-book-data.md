# What is Polymarket Order Book Data?

> Understanding order book data in Polymarket prediction markets — what it is, why it matters, and how to access it.

*Category: Market Data Guides*

## Order Books in Prediction Markets

An order book is a real-time ledger of all outstanding buy (bid) and sell (ask) orders for a prediction market contract. On Polymarket, every BTC, ETH, and SOL Up/Down market has two order books — one for the "Up" outcome and one for the "Down" outcome.

## Anatomy of a Polymarket Order Book

| Component | Description | Example |
| --- | --- | --- |
| Bids | Prices buyers are willing to pay | $0.52, $0.51, $0.50... |
| Asks | Prices sellers are willing to accept | $0.54, $0.55, $0.56... |
| Spread | Gap between best bid and best ask | $0.02 |
| Depth | Total size at each price level | 500 shares at $0.52 |
| Midpoint | Average of best bid and ask | $0.53 |

## Why Order Book Data Matters

- **Price discovery:** The order book shows where supply meets demand — the real market price
- **Liquidity assessment:** Deep books mean easier execution; thin books mean higher slippage
- **Sentiment signals:** Heavy bid-side depth suggests bullish sentiment; heavy ask-side suggests bearish
- **Strategy development:** Backtesting with order book data produces more realistic results than price-only backtests

## Historical vs Live Order Books

Polymarket shows you the **current** order book, but once a market resolves, that data disappears. PolyHistorical captures snapshots every 300ms, preserving the complete order book history for every market — including resolved ones.

## Accessing Order Book Data

```
curl -H "X-API-Key: YOUR_KEY" \
  "https://api.polyhistorical.com/v1/markets/SLUG/snapshots?include_orderbook=true"
```

Each snapshot includes full bid/ask depth, prices, volume, liquidity, and coin price at that moment.

## Related Resources

- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)
- [Understanding Bid-Ask Spread in Prediction Markets](/p/understanding-bid-ask-spread-prediction-markets)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)

---
Source: https://polyhistorical.com/p/what-is-polymarket-order-book-data
