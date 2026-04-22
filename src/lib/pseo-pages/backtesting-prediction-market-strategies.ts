import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b7', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Backtesting Prediction Market Strategies with Historical Order Books',
  slug: 'backtesting-prediction-market-strategies',
  excerpt: 'Learn how to backtest trading strategies on Polymarket using historical order book data from PolyHistorical.',
  metaTitle: 'Backtest Prediction Market Strategies with Order Book Data',
  metaDescription: 'Learn how to backtest Polymarket trading strategies using historical order book data. Step-by-step guide with examples using PolyHistorical API.',
  ogImage: '/og/use-cases.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Backtest with Order Book Data?</h2>
  <p>Most backtesting uses trade or price data alone, but prediction market strategies depend on <strong>order book state</strong> — depth, spread, and liquidity. PolyHistorical provides sub-second order book snapshots that let you simulate realistic execution conditions.</p>

  <h2>Backtesting Workflow</h2>
  <table>
  <thead><tr><th>Step</th><th>Action</th><th>Tool</th></tr></thead>
  <tbody>
  <tr><td>1. Data Collection</td><td>Fetch historical snapshots via API</td><td>PolyHistorical API</td></tr>
  <tr><td>2. Strategy Definition</td><td>Define entry/exit rules based on order book signals</td><td>Python / your language</td></tr>
  <tr><td>3. Simulation</td><td>Replay snapshots and simulate trades with realistic slippage</td><td>Custom backtester</td></tr>
  <tr><td>4. Evaluation</td><td>Calculate Sharpe ratio, drawdown, win rate</td><td>pandas / numpy</td></tr>
  <tr><td>5. Optimization</td><td>Walk-forward optimization to avoid overfitting</td><td>PolyHistorical + scipy</td></tr>
  </tbody>
  </table>

  <h2>Example: Spread-Based Entry</h2>
  <pre><code>import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"
resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
snapshots = resp.json()["data"]
for snap in snapshots:
    spread = float(snap["price_up"]) + float(snap["price_down"]) - 1
    if spread > 0.05:
        print(f"Wide spread at {snap['time']}: {spread:.4f}")
</code></pre>

  <h2>Key Considerations</h2>
  <ul>
  <li><strong>Slippage modeling:</strong> Use order book depth to estimate fill prices, not just midpoint</li>
  <li><strong>Transaction costs:</strong> Include gas fees and Polymarket trading fees</li>
  <li><strong>Look-ahead bias:</strong> Only use data available at the time of each simulated decision</li>
  <li><strong>Market impact:</strong> For larger positions, model how your order would consume depth</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/backtesting-framework-polymarket-python">Backtesting Framework for Polymarket with Python</a></li>
  <li><a href="/p/strategy-evaluation-metrics-prediction-markets">Strategy Evaluation Metrics for Prediction Market Backtests</a></li>
  <li><a href="/p/polymarket-historical-data-for-backtesting">Polymarket Historical Data for Backtesting: Step-by-Step Guide</a></li>
  </ul>`,
};

export default page;
