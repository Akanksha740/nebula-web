import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b27', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Portfolio Risk Analysis with Polymarket Historical Data',
  slug: 'portfolio-risk-analysis-polymarket',
  excerpt: 'How to perform portfolio risk analysis on prediction market positions using historical order book data from PolyHistorical.',
  metaTitle: 'Portfolio Risk Analysis with Polymarket Data | PolyHistorical',
  metaDescription: 'Learn how to measure and manage risk for Polymarket prediction market portfolios using historical order book data. VaR, stress testing, and correlation analysis.',
  ogImage: '/og/use-cases.png', createdAt: '', updatedAt: '',
  content: `<h2>Why Risk Analysis Matters for Prediction Markets</h2>
  <p>Prediction market portfolios carry unique risks compared to traditional crypto holdings. Polymarket contracts have binary outcomes, time decay, and liquidity constraints that require specialized risk analysis. Using <strong>PolyHistorical order book data</strong>, you can quantify these risks before they materialize.</p>

  <h2>Key Risk Metrics for Prediction Market Portfolios</h2>
  <table>
  <thead><tr><th>Metric</th><th>Description</th><th>Data Required</th></tr></thead>
  <tbody>
  <tr><td>Value at Risk (VaR)</td><td>Maximum expected loss at a given confidence level</td><td>Historical price series from order book midpoints</td></tr>
  <tr><td>Max Drawdown</td><td>Largest peak-to-trough decline</td><td>Time-series of portfolio value</td></tr>
  <tr><td>Liquidity Risk</td><td>Cost of liquidating positions quickly</td><td>Order book depth at each timestamp</td></tr>
  <tr><td>Correlation Risk</td><td>How positions move together</td><td>Multi-market order book history</td></tr>
  <tr><td>Event Risk</td><td>Impact of market resolution events</td><td>Historical order books around past resolutions</td></tr>
  </tbody>
  </table>

  <h2>Calculating Value at Risk with PolyHistorical Data</h2>
  <p>To calculate VaR for a Polymarket portfolio, fetch historical midpoint prices for each market using the PolyHistorical API. Then compute daily returns and apply either <strong>historical simulation</strong> (using actual return distribution) or <strong>parametric VaR</strong> (assuming normal distribution).</p>

  <h3>Steps for Historical VaR</h3>
  <ul>
  <li>Pull 30 days of order book snapshots for each market in your portfolio</li>
  <li>Calculate midpoint prices at regular intervals (e.g., every 5 minutes)</li>
  <li>Compute percentage returns between intervals</li>
  <li>Sort returns and find the 5th percentile (for 95% VaR)</li>
  <li>Multiply by portfolio value to get dollar VaR</li>
  </ul>

  <h2>Liquidity Risk Assessment</h2>
  <p>Prediction markets often have thinner order books than traditional exchanges. PolyHistorical's <strong>full depth data</strong> lets you measure how much it would cost to exit a position at any historical point. Calculate the volume-weighted average price (VWAP) across multiple price levels to estimate realistic liquidation costs.</p>

  <h3>What to Watch For</h3>
  <ul>
  <li>Markets with wide bid-ask spreads have higher liquidation costs</li>
  <li>Order book depth tends to thin out before market resolution</li>
  <li>Correlations between BTC Up/Down markets can increase during volatile periods</li>
  <li>Newer markets typically have less liquidity than established ones</li>
  </ul>

  <h2>Stress Testing Your Portfolio</h2>
  <p>Use historical order book data from past high-volatility events to stress test current positions. PolyHistorical lets you replay how order books behaved during previous market shocks, giving you realistic scenarios for worst-case portfolio outcomes.</p>

  <h2>Getting Started</h2>
  <p>Sign up for a free PolyHistorical account to access BTC market order book history. Upgrade to Pro at <strong>$11/month</strong> for full multi-market data needed for comprehensive portfolio risk analysis across all Polymarket prediction markets.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/volatility-modeling-prediction-markets">Volatility Modeling for Prediction Markets</a></li>
  <li><a href="/p/liquidity-analysis-polymarket">Liquidity Analysis for Polymarket Markets</a></li>
  <li><a href="/p/strategy-evaluation-metrics-prediction-markets">Strategy Evaluation Metrics for Prediction Market Backtests</a></li>
  </ul>`,
};

export default page;
