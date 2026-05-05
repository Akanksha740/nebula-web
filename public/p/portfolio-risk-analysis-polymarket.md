# Portfolio Risk Analysis with Polymarket Historical Data

> How to perform portfolio risk analysis on prediction market positions using historical order book data from PolyHistorical.

*Category: Use Cases*

## Why Risk Analysis Matters for Prediction Markets

Prediction market portfolios carry unique risks compared to traditional crypto holdings. Polymarket contracts have binary outcomes, time decay, and liquidity constraints that require specialized risk analysis. Using **PolyHistorical order book data**, you can quantify these risks before they materialize.

## Key Risk Metrics for Prediction Market Portfolios

| Metric | Description | Data Required |
| --- | --- | --- |
| Value at Risk (VaR) | Maximum expected loss at a given confidence level | Historical price series from order book midpoints |
| Max Drawdown | Largest peak-to-trough decline | Time-series of portfolio value |
| Liquidity Risk | Cost of liquidating positions quickly | Order book depth at each timestamp |
| Correlation Risk | How positions move together | Multi-market order book history |
| Event Risk | Impact of market resolution events | Historical order books around past resolutions |

## Calculating Value at Risk with PolyHistorical Data

To calculate VaR for a Polymarket portfolio, fetch historical midpoint prices for each market using the PolyHistorical API. Then compute daily returns and apply either **historical simulation** (using actual return distribution) or **parametric VaR** (assuming normal distribution).

### Steps for Historical VaR

- Pull 30 days of order book snapshots for each market in your portfolio
- Calculate midpoint prices at regular intervals (e.g., every 5 minutes)
- Compute percentage returns between intervals
- Sort returns and find the 5th percentile (for 95% VaR)
- Multiply by portfolio value to get dollar VaR

## Liquidity Risk Assessment

Prediction markets often have thinner order books than traditional exchanges. PolyHistorical's **full depth data** lets you measure how much it would cost to exit a position at any historical point. Calculate the volume-weighted average price (VWAP) across multiple price levels to estimate realistic liquidation costs.

### What to Watch For

- Markets with wide bid-ask spreads have higher liquidation costs
- Order book depth tends to thin out before market resolution
- Correlations between BTC Up/Down markets can increase during volatile periods
- Newer markets typically have less liquidity than established ones

## Stress Testing Your Portfolio

Use historical order book data from past high-volatility events to stress test current positions. PolyHistorical lets you replay how order books behaved during previous market shocks, giving you realistic scenarios for worst-case portfolio outcomes.

## Getting Started

Sign up for a free PolyHistorical account to access BTC market order book history. Upgrade to Pro at **$11/month** for full multi-market data needed for comprehensive portfolio risk analysis across all Polymarket prediction markets.

## Related Resources

- [Volatility Modeling for Prediction Markets](/p/volatility-modeling-prediction-markets)
- [Liquidity Analysis for Polymarket Markets](/p/liquidity-analysis-polymarket)
- [Strategy Evaluation Metrics for Prediction Market Backtests](/p/strategy-evaluation-metrics-prediction-markets)

---
Source: https://polyhistorical.com/p/portfolio-risk-analysis-polymarket
