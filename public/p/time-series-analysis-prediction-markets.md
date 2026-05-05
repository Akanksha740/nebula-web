# Time-Series Analysis for Prediction Market Data

> How to apply time-series analysis techniques to Polymarket historical order book data for trend detection and forecasting.

*Category: Market Data Guides*

## Time-Series Analysis for Prediction Markets

Prediction market data from Polymarket is inherently time-series data — prices, order book depth, and spreads all change over time. Applying **time-series analysis techniques** to PolyHistorical order book snapshots reveals patterns, trends, and anomalies that can inform trading strategies.

## Key Time-Series Techniques

| Technique | Purpose | Best For |
| --- | --- | --- |
| Moving Averages | Smooth noise, identify trends | Trend detection in midpoint prices |
| Autocorrelation (ACF) | Detect repeating patterns | Finding cyclical behavior in spreads |
| Stationarity Tests (ADF) | Check if data is mean-reverting | Validating mean reversion strategies |
| ARIMA | Forecast future values | Short-term price forecasting |
| Seasonal Decomposition | Separate trend, season, residual | Identifying time-of-day patterns |

## Extracting Time Series from Order Books

PolyHistorical provides raw order book snapshots. To perform time-series analysis, first extract scalar time series from these snapshots:

- **Midpoint price series:** (best_bid + best_ask) / 2 at each timestamp
- **Spread series:** best_ask - best_bid over time
- **Depth series:** Total bid volume or ask volume at each snapshot
- **Imbalance series:** (bid_vol - ask_vol) / (bid_vol + ask_vol)

## Trend Detection

Simple and exponential moving averages help identify whether a prediction market probability is trending up or down. A **short-term MA crossing above a long-term MA** (golden cross) may signal increasing probability of the outcome occurring. With PolyHistorical's sub-second data, you can compute MAs at very fine granularity.

### Seasonality in Prediction Markets

Polymarket Up/Down markets often exhibit time-of-day seasonality. Crypto markets are most active during US and European trading hours, which affects order book depth and spreads. Seasonal decomposition of PolyHistorical data can isolate these patterns from underlying trends.

## Stationarity and Mean Reversion

Augmented Dickey-Fuller (ADF) tests on prediction market price series reveal whether prices are stationary or have unit roots. Many prediction market spreads and imbalance metrics are **mean-reverting**, making them candidates for mean reversion trading strategies.

## Forecasting with ARIMA

ARIMA models can forecast short-term movements in prediction market metrics. Fit an ARIMA model to historical midpoint prices or spreads from PolyHistorical, then use the forecast to inform entry/exit decisions. Note that prediction market prices are bounded, so consider **logit-transformed ARIMA** for better results near 0 or 1.

## Getting Started

Pull 30 days of order book history from PolyHistorical's API, extract your preferred time series, and apply these techniques using Python libraries like **statsmodels**, **pandas**, and **scipy**. The free tier covers BTC, ETH, and SOL markets for initial analysis.

## Related Resources

- [Volatility Modeling for Prediction Markets](/p/volatility-modeling-prediction-markets)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)
- [Walk-Forward Optimization for Prediction Market Strategies](/p/walk-forward-optimization-prediction-markets)

---
Source: https://polyhistorical.com/p/time-series-analysis-prediction-markets
