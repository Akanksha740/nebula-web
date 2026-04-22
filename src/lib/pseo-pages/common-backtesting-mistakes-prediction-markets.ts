import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b20', categorySlug: 'backtesting', categoryName: 'Backtesting',
  title: 'Common Backtesting Mistakes with Prediction Market Data',
  slug: 'common-backtesting-mistakes-prediction-markets',
  excerpt: 'Avoid these common pitfalls when backtesting strategies on Polymarket historical data.',
  metaTitle: 'Common Backtesting Mistakes with Prediction Market Data',
  metaDescription: 'Avoid the most common backtesting mistakes when testing prediction market strategies. Learn about look-ahead bias, overfitting, and slippage modeling.',
  ogImage: '/og/backtesting.png', createdAt: '', updatedAt: '',
  content: `<h2>The Most Common Mistakes</h2>
  <p>Backtesting prediction market strategies is different from traditional market backtesting. Here are the pitfalls that trip up even experienced quants.</p>

  <h2>Mistake 1: Ignoring Order Book Depth</h2>
  <p>Testing with midpoint prices assumes infinite liquidity. In prediction markets, <strong>depth can be very thin</strong> — a $500 order can move the price by 5-10%. Always use PolyHistorical order book data to simulate realistic fills.</p>

  <h2>Mistake 2: Look-Ahead Bias</h2>
  <p>Using future information in past decisions. Common examples:</p>
  <ul>
  <li>Using the market's resolution outcome to filter which markets to trade</li>
  <li>Calculating indicators using the full snapshot series instead of only data available at each point</li>
  <li>Optimizing parameters on the same data you test on</li>
  </ul>

  <h2>Mistake 3: Overfitting to Historical Patterns</h2>
  <p>Prediction markets evolve — liquidity patterns, market maker behavior, and participant composition change over time. A strategy tuned to historical quirks won't generalize. Use <strong>walk-forward optimization</strong> to test robustness.</p>

  <h2>Mistake 4: Ignoring Transaction Costs</h2>
  <table>
  <thead><tr><th>Cost</th><th>Typical Range</th><th>Impact on Scalping</th></tr></thead>
  <tbody>
  <tr><td>Polymarket fees</td><td>0-2%</td><td>High</td></tr>
  <tr><td>Gas costs</td><td>Variable</td><td>Critical for small trades</td></tr>
  <tr><td>Slippage</td><td>1-5% on thin books</td><td>Strategy-breaking</td></tr>
  </tbody>
  </table>

  <h2>Mistake 5: Survivorship Bias</h2>
  <p>Only testing on markets that had high volume or clear outcomes. Include thin and messy markets in your backtest — PolyHistorical stores data for all markets, not just the popular ones.</p>

  <h2>Mistake 6: Not Accounting for Bounded Prices</h2>
  <p>Prediction market prices are bounded between $0 and $1. Standard statistical tools (normal distributions, unbounded models) don't apply cleanly. Use logit transforms for better modeling.</p>

  <h2>How to Avoid These</h2>
  <ul>
  <li>Use <strong>PolyHistorical order book data</strong> for realistic execution simulation</li>
  <li>Split data into train/test sets with walk-forward validation</li>
  <li>Include all transaction costs in your P&L calculations</li>
  <li>Test across multiple market types and timeframes</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/walk-forward-optimization-prediction-markets">Walk-Forward Optimization</a></li>
  <li><a href="/p/strategy-evaluation-metrics-prediction-markets">Strategy Evaluation Metrics</a></li>
  <li><a href="/p/backtesting-framework-polymarket-python">Backtesting Framework for Polymarket with Python</a></li>
  </ul>`,
};

export default page;
