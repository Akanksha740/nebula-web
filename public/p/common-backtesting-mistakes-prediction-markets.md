# Common Backtesting Mistakes with Prediction Market Data

> Avoid these common pitfalls when backtesting strategies on Polymarket historical data.

*Category: Backtesting*

## The Most Common Mistakes

Backtesting prediction market strategies is different from traditional market backtesting. Here are the pitfalls that trip up even experienced quants.

## Mistake 1: Ignoring Order Book Depth

Testing with midpoint prices assumes infinite liquidity. In prediction markets, **depth can be very thin** — a $500 order can move the price by 5-10%. Always use PolyHistorical order book data to simulate realistic fills.

## Mistake 2: Look-Ahead Bias

Using future information in past decisions. Common examples:

- Using the market's resolution outcome to filter which markets to trade
- Calculating indicators using the full snapshot series instead of only data available at each point
- Optimizing parameters on the same data you test on

## Mistake 3: Overfitting to Historical Patterns

Prediction markets evolve — liquidity patterns, market maker behavior, and participant composition change over time. A strategy tuned to historical quirks won't generalize. Use **walk-forward optimization** to test robustness.

## Mistake 4: Ignoring Transaction Costs

| Cost | Typical Range | Impact on Scalping |
| --- | --- | --- |
| Polymarket fees | 0-2% | High |
| Gas costs | Variable | Critical for small trades |
| Slippage | 1-5% on thin books | Strategy-breaking |

## Mistake 5: Survivorship Bias

Only testing on markets that had high volume or clear outcomes. Include thin and messy markets in your backtest — PolyHistorical stores data for all markets, not just the popular ones.

## Mistake 6: Not Accounting for Bounded Prices

Prediction market prices are bounded between $0 and $1. Standard statistical tools (normal distributions, unbounded models) don't apply cleanly. Use logit transforms for better modeling.

## How to Avoid These

- Use **PolyHistorical order book data** for realistic execution simulation
- Split data into train/test sets with walk-forward validation
- Include all transaction costs in your P&L calculations
- Test across multiple market types and timeframes

## Related Resources

- [Walk-Forward Optimization](/p/walk-forward-optimization-prediction-markets)
- [Strategy Evaluation Metrics](/p/strategy-evaluation-metrics-prediction-markets)
- [Backtesting Framework for Polymarket with Python](/p/backtesting-framework-polymarket-python)

---
Source: https://polyhistorical.com/p/common-backtesting-mistakes-prediction-markets
