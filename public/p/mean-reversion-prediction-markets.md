# Mean Reversion Strategies in Prediction Markets

> Applying mean reversion trading strategies to Polymarket Up/Down markets using historical order book data.

*Category: Crypto Trading*

## Mean Reversion in Prediction Markets

Mean reversion is the tendency of prices to return to their average value after deviating. In prediction markets, this phenomenon is particularly strong because prices represent **probabilities** — and probability estimates tend to oscillate around the true likelihood of an event occurring.

## Why Prediction Markets Mean-Revert

- **Bounded prices:** Prices are constrained between 0 and 1, creating natural resistance at extremes
- **Overreaction to news:** Traders often push prices too far after news events, creating reversion opportunities
- **Liquidity-driven deviations:** Large orders in thin markets push prices away from fair value temporarily
- **Noise trading:** Uninformed trading activity creates short-term deviations that informed traders correct

## Measuring Mean Reversion with PolyHistorical Data

| Test | Purpose | Interpretation |
| --- | --- | --- |
| Augmented Dickey-Fuller | Test for stationarity | Reject null = mean-reverting |
| Hurst Exponent | Measure persistence | H < 0.5 = mean-reverting |
| Half-Life | Speed of reversion | Lower = faster reversion |
| Variance Ratio | Compare variance at different scales | Ratio < 1 = mean-reverting |

### Calculating Half-Life of Mean Reversion

The half-life tells you how long it typically takes for the price to revert halfway back to its mean. Using PolyHistorical order book midpoint prices, fit an **Ornstein-Uhlenbeck process** to the data and extract the mean reversion speed parameter. Shorter half-lives indicate faster reversion and potentially more frequent trading opportunities.

## Building a Mean Reversion Strategy

- **Step 1:** Fetch historical midpoint prices from PolyHistorical for your target market
- **Step 2:** Calculate a rolling mean (e.g., 2-hour moving average)
- **Step 3:** Compute z-scores: (price - mean) / standard_deviation
- **Step 4:** Enter positions when z-score exceeds threshold (e.g., |z| > 2)
- **Step 5:** Exit when price reverts to the mean (z-score near 0)

## Practical Considerations

Mean reversion is not guaranteed — sometimes prices move away from the mean and stay there because **fundamental probabilities have changed**. Distinguish between temporary deviations (noise) and permanent shifts (signal) by:

- Checking if major news events occurred during the deviation
- Comparing order book depth before and after the move
- Monitoring correlated markets for confirmation
- Using adaptive lookback periods that respond to changing volatility

## Backtest Before You Trade

Use PolyHistorical's 30-day rolling history to backtest mean reversion strategies across multiple markets and time periods. The free tier covers BTC markets; Pro at **$11/month** gives you multi-market data to test across the full Polymarket universe.

## Related Resources

- [Scalping Strategies for Polymarket Prediction Markets](/p/scalping-strategies-polymarket)
- [Volatility Modeling for Prediction Markets](/p/volatility-modeling-prediction-markets)
- [Walk-Forward Optimization for Prediction Market Strategies](/p/walk-forward-optimization-prediction-markets)

---
Source: https://polyhistorical.com/p/mean-reversion-prediction-markets
