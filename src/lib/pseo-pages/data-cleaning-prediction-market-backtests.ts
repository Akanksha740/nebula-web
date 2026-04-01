import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b49', categorySlug: 'backtesting', categoryName: 'Backtesting',
  title: 'Data Cleaning for Prediction Market Backtests',
  slug: 'data-cleaning-prediction-market-backtests',
  excerpt: 'How to clean and prepare Polymarket historical order book data for accurate backtesting and strategy development.',
  metaTitle: 'Data Cleaning for Prediction Market Backtests | PolyHistorical',
  metaDescription: 'Learn how to clean and prepare Polymarket order book data for backtesting. Handle missing data, outliers, and timestamps for accurate prediction market backtests.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Data Cleaning for Prediction Market Backtests</h1>
  <h2>Why Data Cleaning Matters</h2>
  <p>Raw historical data — even from high-quality sources like PolyHistorical — needs cleaning and preparation before use in backtesting. <strong>Dirty data leads to unreliable backtests</strong>, which leads to strategies that fail in live trading. Investing time in data quality pays dividends in strategy reliability.</p>

  <h2>Common Data Issues in Prediction Market Data</h2>
  <table>
  <thead><tr><th>Issue</th><th>Cause</th><th>Impact on Backtest</th></tr></thead>
  <tbody>
  <tr><td>Missing Snapshots</td><td>Network latency, API downtime</td><td>Gaps in price series, incorrect returns</td></tr>
  <tr><td>Duplicate Timestamps</td><td>Retry logic, clock sync issues</td><td>Double-counting signals, inflated volume</td></tr>
  <tr><td>Outlier Prices</td><td>Momentary thin books, fat-finger orders</td><td>False signals, unrealistic backtest returns</td></tr>
  <tr><td>Stale Order Books</td><td>Low activity periods</td><td>False liquidity signals, unrealistic fills</td></tr>
  <tr><td>Timezone Issues</td><td>Mixed UTC/local timestamps</td><td>Misaligned signals and execution</td></tr>
  </tbody>
  </table>

  <h2>Step 1: Handle Missing Data</h2>
  <p>Check for gaps in your timestamp series. PolyHistorical provides snapshots approximately every 500ms, so gaps longer than a few seconds indicate missing data.</p>
  <ul>
  <li><strong>Forward fill:</strong> Use the last known order book state for short gaps (&lt; 5 seconds)</li>
  <li><strong>Interpolation:</strong> Interpolate midpoint prices for moderate gaps (&lt; 1 minute)</li>
  <li><strong>Mark and skip:</strong> Flag periods with long gaps (&gt; 1 minute) and exclude from backtest</li>
  <li><strong>Never backfill:</strong> Do not use future data to fill past gaps (look-ahead bias)</li>
  </ul>

  <h2>Step 2: Remove Duplicates</h2>
  <p>Check for duplicate timestamps in your dataset. If duplicates exist, keep the one with the most complete order book data (highest total depth). Remove exact duplicates entirely.</p>

  <h2>Step 3: Filter Outliers</h2>
  <p>Prediction market prices should be between 0 and 1. Additionally, filter for unrealistic price moves:</p>
  <ul>
  <li>Remove snapshots where midpoint price is outside [0.01, 0.99] unless near resolution</li>
  <li>Flag price changes exceeding 3 standard deviations from the rolling mean</li>
  <li>Check that bid-ask spread is positive (best_ask > best_bid)</li>
  <li>Verify that Up + Down complement prices approximately equal 1.00</li>
  </ul>

  <h2>Step 4: Validate Order Book Integrity</h2>
  <p>Each order book snapshot should satisfy basic consistency rules:</p>
  <ul>
  <li>Bid prices should be in <strong>descending order</strong></li>
  <li>Ask prices should be in <strong>ascending order</strong></li>
  <li>No negative volumes at any price level</li>
  <li>Best bid must be strictly less than best ask</li>
  </ul>

  <h2>Step 5: Standardize Timestamps</h2>
  <p>Convert all timestamps to <strong>UTC Unix milliseconds</strong> for consistency. This eliminates timezone confusion and makes time-range queries straightforward. PolyHistorical returns timestamps in UTC by default, but verify this in your data pipeline.</p>

  <h2>Step 6: Build Validation Checks</h2>
  <p>Automate your data cleaning pipeline with validation checks that run before every backtest. Log warnings for any data anomalies so you can investigate before they corrupt your results. A few hours spent on data cleaning saves days of debugging false backtest results.</p>

  <h2>PolyHistorical Data Quality</h2>
  <p>PolyHistorical maintains high data quality standards, but no data source is perfect. The cleaning steps above ensure your backtesting pipeline is robust regardless of upstream data quality. Start with the free tier to develop your cleaning pipeline, then scale to Pro at <strong>$11/month</strong> for production use.</p>`,
};

export default page;
