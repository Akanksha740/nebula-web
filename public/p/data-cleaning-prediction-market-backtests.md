# Data Cleaning for Prediction Market Backtests

> How to clean and prepare Polymarket historical order book data for accurate backtesting and strategy development.

*Category: Backtesting*

## Why Data Cleaning Matters

Raw historical data — even from high-quality sources like PolyHistorical — needs cleaning and preparation before use in backtesting. **Dirty data leads to unreliable backtests**, which leads to strategies that fail in live trading. Investing time in data quality pays dividends in strategy reliability.

## Common Data Issues in Prediction Market Data

| Issue | Cause | Impact on Backtest |
| --- | --- | --- |
| Missing Snapshots | Network latency, API downtime | Gaps in price series, incorrect returns |
| Duplicate Timestamps | Retry logic, clock sync issues | Double-counting signals, inflated volume |
| Outlier Prices | Momentary thin books, fat-finger orders | False signals, unrealistic backtest returns |
| Stale Order Books | Low activity periods | False liquidity signals, unrealistic fills |
| Timezone Issues | Mixed UTC/local timestamps | Misaligned signals and execution |

## Step 1: Handle Missing Data

Check for gaps in your timestamp series. PolyHistorical provides snapshots approximately every 300ms, so gaps longer than a few seconds indicate missing data.

- **Forward fill:** Use the last known order book state for short gaps (< 5 seconds)
- **Interpolation:** Interpolate midpoint prices for moderate gaps (< 1 minute)
- **Mark and skip:** Flag periods with long gaps (> 1 minute) and exclude from backtest
- **Never backfill:** Do not use future data to fill past gaps (look-ahead bias)

## Step 2: Remove Duplicates

Check for duplicate timestamps in your dataset. If duplicates exist, keep the one with the most complete order book data (highest total depth). Remove exact duplicates entirely.

## Step 3: Filter Outliers

Prediction market prices should be between 0 and 1. Additionally, filter for unrealistic price moves:

- Remove snapshots where midpoint price is outside [0.01, 0.99] unless near resolution
- Flag price changes exceeding 3 standard deviations from the rolling mean
- Check that bid-ask spread is positive (best_ask > best_bid)
- Verify that Up + Down complement prices approximately equal 1.00

## Step 4: Validate Order Book Integrity

Each order book snapshot should satisfy basic consistency rules:

- Bid prices should be in **descending order**
- Ask prices should be in **ascending order**
- No negative volumes at any price level
- Best bid must be strictly less than best ask

## Step 5: Standardize Timestamps

Convert all timestamps to **UTC Unix milliseconds** for consistency. This eliminates timezone confusion and makes time-range queries straightforward. PolyHistorical returns timestamps in UTC by default, but verify this in your data pipeline.

## Step 6: Build Validation Checks

Automate your data cleaning pipeline with validation checks that run before every backtest. Log warnings for any data anomalies so you can investigate before they corrupt your results. A few hours spent on data cleaning saves days of debugging false backtest results.

## PolyHistorical Data Quality

PolyHistorical maintains high data quality standards, but no data source is perfect. The cleaning steps above ensure your backtesting pipeline is robust regardless of upstream data quality. Start with the free tier to develop your cleaning pipeline, then scale to Pro at **$11/month** for production use.

## Related Resources

- [Polymarket Historical Data Download: CSV, JSON & Bulk Export](/p/polymarket-historical-data-download)
- [Strategy Evaluation Metrics for Prediction Market Backtests](/p/strategy-evaluation-metrics-prediction-markets)
- [Polymarket Historical Data API: Full Documentation](/p/polymarket-historical-data-api)

---
Source: https://polyhistorical.com/p/data-cleaning-prediction-market-backtests
