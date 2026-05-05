# Market Making on Polymarket: Using Order Book History

> How to develop market making strategies for Polymarket using historical order book depth data.

*Category: Use Cases*

## Market Making in Prediction Markets

Market makers provide liquidity by continuously quoting bid and ask prices. On Polymarket, this means placing limit orders on both sides of BTC, ETH, and SOL Up/Down markets. PolyHistorical's order book history lets you **analyze historical spreads, depth, and competition** before committing capital.

## Key Metrics for Market Makers

| Metric | What It Tells You | PolyHistorical Data |
| --- | --- | --- |
| Bid-Ask Spread | Revenue opportunity per round trip | price_up + price_down spreads |
| Depth at Best | Competition from other market makers | Top-of-book sizes over time |
| Depth Stability | How often the book gets swept | Order book snapshots at 300ms |
| Adverse Selection | Risk of trading against informed flow | Price moves after fills |
| Inventory Duration | How long positions are held | Market resolution times |

## Strategy Development Workflow

1. **Analyze historical spreads:** Use PolyHistorical to find markets with consistently wide spreads (your revenue)
2. **Study depth patterns:** Identify when competitor depth is thin (your opportunity)
3. **Model adverse selection:** Measure how often the market moves against passive orders
4. **Backtest quoting strategy:** Simulate placing orders on historical order books
5. **Optimize parameters:** Spread width, position limits, inventory skew

## Risk Factors

- **Inventory risk:** Prediction markets resolve — holding the wrong side at resolution means total loss of that position
- **Adverse selection:** Informed traders may pick off your quotes before you can cancel
- **Gas costs:** On-chain order placement and cancellation costs erode thin margins

## Related Resources

- [Understanding Bid-Ask Spread in Prediction Markets](/p/understanding-bid-ask-spread-prediction-markets)
- [Liquidity Analysis for Polymarket Markets](/p/liquidity-analysis-polymarket)
- [Spread Trading Strategies for Prediction Markets](/p/spread-trading-prediction-markets)

---
Source: https://polyhistorical.com/p/market-making-polymarket-order-book
