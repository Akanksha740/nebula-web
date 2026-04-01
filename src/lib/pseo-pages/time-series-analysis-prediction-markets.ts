import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b33', categorySlug: 'market-data', categoryName: 'Market Data Guides',
  title: 'Time-Series Analysis for Prediction Market Data',
  slug: 'time-series-analysis-prediction-markets',
  excerpt: 'How to apply time-series analysis techniques to Polymarket historical order book data for trend detection and forecasting.',
  metaTitle: 'Time-Series Analysis for Prediction Markets | PolyHistorical',
  metaDescription: 'Apply time-series analysis to Polymarket historical data. Learn autocorrelation, trend detection, seasonality, and forecasting techniques for prediction markets.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Time-Series Analysis for Prediction Market Data</h1>
  <h2>Time-Series Analysis for Prediction Markets</h2>
  <p>Prediction market data from Polymarket is inherently time-series data — prices, order book depth, and spreads all change over time. Applying <strong>time-series analysis techniques</strong> to PolyHistorical order book snapshots reveals patterns, trends, and anomalies that can inform trading strategies.</p>

  <h2>Key Time-Series Techniques</h2>
  <table>
  <thead><tr><th>Technique</th><th>Purpose</th><th>Best For</th></tr></thead>
  <tbody>
  <tr><td>Moving Averages</td><td>Smooth noise, identify trends</td><td>Trend detection in midpoint prices</td></tr>
  <tr><td>Autocorrelation (ACF)</td><td>Detect repeating patterns</td><td>Finding cyclical behavior in spreads</td></tr>
  <tr><td>Stationarity Tests (ADF)</td><td>Check if data is mean-reverting</td><td>Validating mean reversion strategies</td></tr>
  <tr><td>ARIMA</td><td>Forecast future values</td><td>Short-term price forecasting</td></tr>
  <tr><td>Seasonal Decomposition</td><td>Separate trend, season, residual</td><td>Identifying time-of-day patterns</td></tr>
  </tbody>
  </table>

  <h2>Extracting Time Series from Order Books</h2>
  <p>PolyHistorical provides raw order book snapshots. To perform time-series analysis, first extract scalar time series from these snapshots:</p>
  <ul>
  <li><strong>Midpoint price series:</strong> (best_bid + best_ask) / 2 at each timestamp</li>
  <li><strong>Spread series:</strong> best_ask - best_bid over time</li>
  <li><strong>Depth series:</strong> Total bid volume or ask volume at each snapshot</li>
  <li><strong>Imbalance series:</strong> (bid_vol - ask_vol) / (bid_vol + ask_vol)</li>
  </ul>

  <h2>Trend Detection</h2>
  <p>Simple and exponential moving averages help identify whether a prediction market probability is trending up or down. A <strong>short-term MA crossing above a long-term MA</strong> (golden cross) may signal increasing probability of the outcome occurring. With PolyHistorical's sub-second data, you can compute MAs at very fine granularity.</p>

  <h3>Seasonality in Prediction Markets</h3>
  <p>Polymarket Up/Down markets often exhibit time-of-day seasonality. Crypto markets are most active during US and European trading hours, which affects order book depth and spreads. Seasonal decomposition of PolyHistorical data can isolate these patterns from underlying trends.</p>

  <h2>Stationarity and Mean Reversion</h2>
  <p>Augmented Dickey-Fuller (ADF) tests on prediction market price series reveal whether prices are stationary or have unit roots. Many prediction market spreads and imbalance metrics are <strong>mean-reverting</strong>, making them candidates for mean reversion trading strategies.</p>

  <h2>Forecasting with ARIMA</h2>
  <p>ARIMA models can forecast short-term movements in prediction market metrics. Fit an ARIMA model to historical midpoint prices or spreads from PolyHistorical, then use the forecast to inform entry/exit decisions. Note that prediction market prices are bounded, so consider <strong>logit-transformed ARIMA</strong> for better results near 0 or 1.</p>

  <h2>Getting Started</h2>
  <p>Pull 30 days of order book history from PolyHistorical's API, extract your preferred time series, and apply these techniques using Python libraries like <strong>statsmodels</strong>, <strong>pandas</strong>, and <strong>scipy</strong>. The free tier covers BTC markets for initial analysis.</p>`,
};

export default page;
