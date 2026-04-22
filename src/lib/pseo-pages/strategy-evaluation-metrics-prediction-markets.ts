import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b48', categorySlug: 'backtesting', categoryName: 'Backtesting',
  title: 'Strategy Evaluation Metrics for Prediction Market Backtests',
  slug: 'strategy-evaluation-metrics-prediction-markets',
  excerpt: 'Key performance metrics for evaluating backtested prediction market strategies — Sharpe ratio, drawdown, win rate, and more.',
  metaTitle: 'Strategy Evaluation Metrics for Prediction Markets | PolyHistorical',
  metaDescription: 'Essential metrics for evaluating prediction market trading strategies. Learn Sharpe ratio, max drawdown, profit factor, and more using Polymarket backtest data.',
  ogImage: '/og/backtesting.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Metrics Matter</h2>
  <p>A profitable backtest is not enough — you need to evaluate <strong>how</strong> profits are generated and whether the strategy is robust. The right metrics reveal risk-adjusted performance, consistency, and whether your strategy will survive real-world conditions on Polymarket prediction markets.</p>

  <h2>Essential Performance Metrics</h2>
  <table>
  <thead><tr><th>Metric</th><th>Formula / Description</th><th>Good Threshold</th></tr></thead>
  <tbody>
  <tr><td>Sharpe Ratio</td><td>(Mean Return - Risk-Free Rate) / Std Dev of Returns</td><td>&gt; 1.5 for prediction markets</td></tr>
  <tr><td>Sortino Ratio</td><td>(Mean Return - Target) / Downside Deviation</td><td>&gt; 2.0</td></tr>
  <tr><td>Max Drawdown</td><td>Largest peak-to-trough equity decline</td><td>&lt; 20% of capital</td></tr>
  <tr><td>Profit Factor</td><td>Gross Profits / Gross Losses</td><td>&gt; 1.5</td></tr>
  <tr><td>Win Rate</td><td>Winning Trades / Total Trades</td><td>Context-dependent</td></tr>
  <tr><td>Calmar Ratio</td><td>Annualized Return / Max Drawdown</td><td>&gt; 2.0</td></tr>
  </tbody>
  </table>

  <h2>Sharpe Ratio</h2>
  <p>The Sharpe ratio measures <strong>risk-adjusted returns</strong> — how much return you earn per unit of risk. For prediction market strategies backtested on PolyHistorical data, a Sharpe above 1.5 indicates a strong strategy, while below 0.5 suggests the returns do not adequately compensate for the risk taken.</p>

  <h3>Calculating Sharpe from Backtest Data</h3>
  <ul>
  <li>Calculate returns for each period (hourly or daily)</li>
  <li>Compute the mean and standard deviation of returns</li>
  <li>Sharpe = (mean_return - risk_free_rate) / std_dev</li>
  <li>Annualize by multiplying by sqrt(periods_per_year)</li>
  </ul>

  <h2>Maximum Drawdown</h2>
  <p>Max drawdown measures the <strong>worst peak-to-trough decline</strong> in your equity curve. This is arguably the most important risk metric because it determines whether you can psychologically and financially survive the strategy's worst period.</p>

  <h2>Win Rate vs Payoff Ratio</h2>
  <p>Win rate alone is misleading. A strategy with a 30% win rate can be highly profitable if winning trades are much larger than losing trades. Conversely, a 90% win rate strategy can be destroyed by rare large losses. Always evaluate win rate together with the <strong>average win / average loss ratio</strong>.</p>

  <h3>Strategy Archetypes</h3>
  <ul>
  <li><strong>High win rate, low payoff:</strong> Spread capture, market making (70%+ win rate, small wins)</li>
  <li><strong>Low win rate, high payoff:</strong> Trend following, event trading (30-40% win rate, large wins)</li>
  <li><strong>Balanced:</strong> Mean reversion strategies (50-60% win rate, moderate wins)</li>
  </ul>

  <h2>Metrics Specific to Prediction Markets</h2>
  <p>Beyond standard trading metrics, prediction market strategies should be evaluated on:</p>
  <ul>
  <li><strong>Resolution accuracy:</strong> How often does your strategy correctly predict the outcome?</li>
  <li><strong>Edge per trade:</strong> Average profit relative to the bid-ask spread (must exceed spread)</li>
  <li><strong>Liquidity utilization:</strong> How much of available depth your strategy actually accesses</li>
  <li><strong>Turnover ratio:</strong> Trading frequency relative to available markets</li>
  </ul>

  <h2>Using PolyHistorical for Evaluation</h2>
  <p>PolyHistorical's sub-second order book data lets you compute these metrics with <strong>realistic execution assumptions</strong>. Account for slippage using actual order book depth at each timestamp, and include Polymarket fee calculations in your return series for accurate metric computation.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/walk-forward-optimization-prediction-markets">Walk-Forward Optimization for Prediction Market Strategies</a></li>
  <li><a href="/p/monte-carlo-simulation-prediction-markets">Monte Carlo Simulation for Prediction Market Backtests</a></li>
  <li><a href="/p/data-cleaning-prediction-market-backtests">Data Cleaning for Prediction Market Backtests</a></li>
  </ul>`,
};

export default page;
