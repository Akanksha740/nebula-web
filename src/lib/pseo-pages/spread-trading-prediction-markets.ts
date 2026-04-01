import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b45', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'Spread Trading Strategies for Prediction Markets',
  slug: 'spread-trading-prediction-markets',
  excerpt: 'How to trade spreads between correlated Polymarket prediction markets using historical order book data.',
  metaTitle: 'Spread Trading in Prediction Markets | PolyHistorical',
  metaDescription: 'Learn spread trading strategies for Polymarket. Trade the relationship between correlated prediction markets using historical order book data from PolyHistorical.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Spread Trading Strategies for Prediction Markets</h1>
  <h2>What Is Spread Trading?</h2>
  <p>Spread trading involves simultaneously buying one contract and selling a related contract to profit from the <strong>price difference (spread) between them</strong>. In Polymarket prediction markets, multiple related markets create natural spread trading opportunities — particularly between different timeframes and correlated assets.</p>

  <h2>Types of Prediction Market Spreads</h2>
  <table>
  <thead><tr><th>Spread Type</th><th>Example</th><th>Edge Source</th></tr></thead>
  <tbody>
  <tr><td>Complementary Spread</td><td>BTC Up + BTC Down should = ~$1</td><td>Mispricings when sum deviates from $1</td></tr>
  <tr><td>Cross-Asset Spread</td><td>BTC Up vs ETH Up (same timeframe)</td><td>Correlation divergence between BTC and ETH</td></tr>
  <tr><td>Calendar Spread</td><td>BTC 1h Up vs BTC 4h Up</td><td>Timeframe-specific probability differences</td></tr>
  <tr><td>Relative Value</td><td>Market A at 0.55 vs Model at 0.60</td><td>Mispricing relative to fair value model</td></tr>
  </tbody>
  </table>

  <h2>Complementary Market Spreads</h2>
  <p>The most fundamental spread in prediction markets: BTC Up and BTC Down contracts for the same timeframe should sum to approximately $1.00. When they deviate — say BTC Up at $0.52 and BTC Down at $0.51 (sum = $1.03) — you can sell both to lock in the $0.03 spread, or buy both when the sum is below $1.00.</p>

  <h3>How to Identify Complementary Mispricings</h3>
  <ul>
  <li>Fetch both Up and Down order books simultaneously from PolyHistorical</li>
  <li>Calculate the sum of best bids and best asks for each pair</li>
  <li>Monitor for deviations from $1.00 beyond transaction costs</li>
  <li>Backtest the frequency and magnitude of these deviations using historical data</li>
  </ul>

  <h2>Cross-Asset Spread Trading</h2>
  <p>BTC and ETH prices are highly correlated. When BTC Up is priced significantly differently from ETH Up for the same timeframe, it may indicate a temporary mispricing. PolyHistorical lets you analyze <strong>historical correlation patterns</strong> between BTC and ETH prediction markets to calibrate your spread strategy.</p>

  <h2>Calendar Spread Analysis</h2>
  <p>Different timeframe markets (5m, 15m, 1h, 4h, 24h) should have logically consistent probabilities. If the 1h BTC Up is priced at 0.55 but the 4h BTC Up covering the same period is at 0.45, there may be a spread opportunity. Use PolyHistorical data to study how these relationships behave historically.</p>

  <h2>Risk Management for Spread Trading</h2>
  <ul>
  <li><strong>Execution risk:</strong> You must fill both legs of the spread — partial fills create directional exposure</li>
  <li><strong>Liquidity risk:</strong> Check order book depth on both sides before entering</li>
  <li><strong>Correlation breakdown:</strong> Spreads based on historical correlations can fail during unusual events</li>
  <li><strong>Transaction costs:</strong> Gas fees and Polymarket fees eat into spread profits</li>
  </ul>

  <h2>Backtesting Spread Strategies</h2>
  <p>Spread strategies require <strong>multi-market order book data</strong> for accurate backtesting. PolyHistorical Pro at $11/month provides synchronized order book history for all markets, letting you reconstruct historical spread opportunities and test execution assumptions. Start prototyping with the free BTC data tier.</p>`,
};

export default page;
