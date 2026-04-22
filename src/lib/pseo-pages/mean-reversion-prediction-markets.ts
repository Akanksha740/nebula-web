import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b43', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Mean Reversion Strategies in Prediction Markets',
  slug: 'mean-reversion-prediction-markets',
  excerpt: 'Applying mean reversion trading strategies to Polymarket Up/Down markets using historical order book data.',
  metaTitle: 'Mean Reversion in Prediction Markets | PolyHistorical',
  metaDescription: 'Learn how to apply mean reversion strategies to Polymarket prediction markets. Use historical order book data to identify overextended prices and trade the reversion.',
  ogImage: '/og/crypto-trading.png', createdAt: '', updatedAt: '',
  content: `<h2>Mean Reversion in Prediction Markets</h2>
  <p>Mean reversion is the tendency of prices to return to their average value after deviating. In prediction markets, this phenomenon is particularly strong because prices represent <strong>probabilities</strong> — and probability estimates tend to oscillate around the true likelihood of an event occurring.</p>

  <h2>Why Prediction Markets Mean-Revert</h2>
  <ul>
  <li><strong>Bounded prices:</strong> Prices are constrained between 0 and 1, creating natural resistance at extremes</li>
  <li><strong>Overreaction to news:</strong> Traders often push prices too far after news events, creating reversion opportunities</li>
  <li><strong>Liquidity-driven deviations:</strong> Large orders in thin markets push prices away from fair value temporarily</li>
  <li><strong>Noise trading:</strong> Uninformed trading activity creates short-term deviations that informed traders correct</li>
  </ul>

  <h2>Measuring Mean Reversion with PolyHistorical Data</h2>
  <table>
  <thead><tr><th>Test</th><th>Purpose</th><th>Interpretation</th></tr></thead>
  <tbody>
  <tr><td>Augmented Dickey-Fuller</td><td>Test for stationarity</td><td>Reject null = mean-reverting</td></tr>
  <tr><td>Hurst Exponent</td><td>Measure persistence</td><td>H &lt; 0.5 = mean-reverting</td></tr>
  <tr><td>Half-Life</td><td>Speed of reversion</td><td>Lower = faster reversion</td></tr>
  <tr><td>Variance Ratio</td><td>Compare variance at different scales</td><td>Ratio &lt; 1 = mean-reverting</td></tr>
  </tbody>
  </table>

  <h3>Calculating Half-Life of Mean Reversion</h3>
  <p>The half-life tells you how long it typically takes for the price to revert halfway back to its mean. Using PolyHistorical order book midpoint prices, fit an <strong>Ornstein-Uhlenbeck process</strong> to the data and extract the mean reversion speed parameter. Shorter half-lives indicate faster reversion and potentially more frequent trading opportunities.</p>

  <h2>Building a Mean Reversion Strategy</h2>
  <ul>
  <li><strong>Step 1:</strong> Fetch historical midpoint prices from PolyHistorical for your target market</li>
  <li><strong>Step 2:</strong> Calculate a rolling mean (e.g., 2-hour moving average)</li>
  <li><strong>Step 3:</strong> Compute z-scores: (price - mean) / standard_deviation</li>
  <li><strong>Step 4:</strong> Enter positions when z-score exceeds threshold (e.g., |z| > 2)</li>
  <li><strong>Step 5:</strong> Exit when price reverts to the mean (z-score near 0)</li>
  </ul>

  <h2>Practical Considerations</h2>
  <p>Mean reversion is not guaranteed — sometimes prices move away from the mean and stay there because <strong>fundamental probabilities have changed</strong>. Distinguish between temporary deviations (noise) and permanent shifts (signal) by:</p>
  <ul>
  <li>Checking if major news events occurred during the deviation</li>
  <li>Comparing order book depth before and after the move</li>
  <li>Monitoring correlated markets for confirmation</li>
  <li>Using adaptive lookback periods that respond to changing volatility</li>
  </ul>

  <h2>Backtest Before You Trade</h2>
  <p>Use PolyHistorical's 30-day rolling history to backtest mean reversion strategies across multiple markets and time periods. The free tier covers BTC markets; Pro at <strong>$11/month</strong> gives you multi-market data to test across the full Polymarket universe.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/scalping-strategies-polymarket">Scalping Strategies for Polymarket Prediction Markets</a></li>
  <li><a href="/p/volatility-modeling-prediction-markets">Volatility Modeling for Prediction Markets</a></li>
  <li><a href="/p/walk-forward-optimization-prediction-markets">Walk-Forward Optimization for Prediction Market Strategies</a></li>
  </ul>`,
};

export default page;
