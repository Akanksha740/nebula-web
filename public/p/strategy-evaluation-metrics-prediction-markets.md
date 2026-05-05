# Strategy Evaluation Metrics for Prediction Market Backtests

> Key performance metrics for evaluating backtested prediction market strategies — Sharpe ratio, drawdown, win rate, and more.

*Category: Backtesting*

## Why Metrics Matter

A profitable backtest is not enough — you need to evaluate **how** profits are generated and whether the strategy is robust. The right metrics reveal risk-adjusted performance, consistency, and whether your strategy will survive real-world conditions on Polymarket prediction markets.

## Essential Performance Metrics

| Metric | Formula / Description | Good Threshold |
| --- | --- | --- |
| Sharpe Ratio | (Mean Return - Risk-Free Rate) / Std Dev of Returns | > 1.5 for prediction markets |
| Sortino Ratio | (Mean Return - Target) / Downside Deviation | > 2.0 |
| Max Drawdown | Largest peak-to-trough equity decline | < 20% of capital |
| Profit Factor | Gross Profits / Gross Losses | > 1.5 |
| Win Rate | Winning Trades / Total Trades | Context-dependent |
| Calmar Ratio | Annualized Return / Max Drawdown | > 2.0 |

## Sharpe Ratio

The Sharpe ratio measures **risk-adjusted returns** — how much return you earn per unit of risk. For prediction market strategies backtested on PolyHistorical data, a Sharpe above 1.5 indicates a strong strategy, while below 0.5 suggests the returns do not adequately compensate for the risk taken.

### Calculating Sharpe from Backtest Data

- Calculate returns for each period (hourly or daily)
- Compute the mean and standard deviation of returns
- Sharpe = (mean_return - risk_free_rate) / std_dev
- Annualize by multiplying by sqrt(periods_per_year)

## Maximum Drawdown

Max drawdown measures the **worst peak-to-trough decline** in your equity curve. This is arguably the most important risk metric because it determines whether you can psychologically and financially survive the strategy's worst period.

## Win Rate vs Payoff Ratio

Win rate alone is misleading. A strategy with a 30% win rate can be highly profitable if winning trades are much larger than losing trades. Conversely, a 90% win rate strategy can be destroyed by rare large losses. Always evaluate win rate together with the **average win / average loss ratio**.

### Strategy Archetypes

- **High win rate, low payoff:** Spread capture, market making (70%+ win rate, small wins)
- **Low win rate, high payoff:** Trend following, event trading (30-40% win rate, large wins)
- **Balanced:** Mean reversion strategies (50-60% win rate, moderate wins)

## Metrics Specific to Prediction Markets

Beyond standard trading metrics, prediction market strategies should be evaluated on:

- **Resolution accuracy:** How often does your strategy correctly predict the outcome?
- **Edge per trade:** Average profit relative to the bid-ask spread (must exceed spread)
- **Liquidity utilization:** How much of available depth your strategy actually accesses
- **Turnover ratio:** Trading frequency relative to available markets

## Using PolyHistorical for Evaluation

PolyHistorical's sub-second order book data lets you compute these metrics with **realistic execution assumptions**. Account for slippage using actual order book depth at each timestamp, and include Polymarket fee calculations in your return series for accurate metric computation.

## Related Resources

- [Walk-Forward Optimization for Prediction Market Strategies](/p/walk-forward-optimization-prediction-markets)
- [Monte Carlo Simulation for Prediction Market Backtests](/p/monte-carlo-simulation-prediction-markets)
- [Data Cleaning for Prediction Market Backtests](/p/data-cleaning-prediction-market-backtests)

---
Source: https://polyhistorical.com/p/strategy-evaluation-metrics-prediction-markets
