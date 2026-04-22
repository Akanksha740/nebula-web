import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b4', categorySlug: 'compare', categoryName: 'Comparisons',
  title: 'PolyHistorical vs Dune Analytics for Prediction Market Research',
  slug: 'polyhistorical-vs-dune-analytics',
  excerpt: 'Comparing PolyHistorical API data with Dune Analytics for Polymarket research and analysis.',
  metaTitle: 'PolyHistorical vs Dune Analytics: Prediction Market Data Compared',
  metaDescription: 'Compare PolyHistorical and Dune Analytics for Polymarket prediction market research. See differences in data types, query methods, and use cases.',
  ogImage: '/og/compare.png', createdAt: '', updatedAt: '',
  content: `<h2>Overview</h2>
  <p>Dune Analytics is a community-driven on-chain analytics platform where users write SQL queries against blockchain data. PolyHistorical is a purpose-built API for <strong>Polymarket order book history</strong> with sub-second snapshots. They serve different needs in the prediction market research stack.</p>

  <h2>Data Comparison</h2>
  <table>
  <thead><tr><th>Feature</th><th>PolyHistorical</th><th>Dune Analytics</th></tr></thead>
  <tbody>
  <tr><td>Order Book Snapshots</td><td>&#10003; Full depth, sub-second</td><td>&#10007; Not available</td></tr>
  <tr><td>On-Chain Trades</td><td>&#10007;</td><td>&#10003; Full transaction history</td></tr>
  <tr><td>Bid/Ask Depth Over Time</td><td>&#10003; 300ms granularity</td><td>&#10007;</td></tr>
  <tr><td>Market Resolution Data</td><td>&#10003; Via API</td><td>&#10003; Via SQL queries</td></tr>
  <tr><td>Query Method</td><td>REST API</td><td>SQL (community dashboards)</td></tr>
  <tr><td>Real-Time Data</td><td>&#10003; Near real-time snapshots</td><td>Minutes to hours delay</td></tr>
  </tbody>
  </table>

  <h2>When to Use PolyHistorical</h2>
  <ul>
  <li>You need <strong>order book depth history</strong> — bid/ask levels, spread, and liquidity over time</li>
  <li>You're backtesting strategies that depend on order book state, not just trades</li>
  <li>You need sub-second granularity for high-frequency analysis</li>
  <li>You want a clean REST API without writing SQL</li>
  </ul>

  <h2>When to Use Dune Analytics</h2>
  <ul>
  <li>You need <strong>on-chain transaction data</strong> — who traded, when, and at what price</li>
  <li>You're analyzing wallet-level behavior or market participation patterns</li>
  <li>You want community-built dashboards and visualizations</li>
  <li>You need cross-protocol analysis (Polymarket + other DeFi protocols)</li>
  </ul>

  <h2>Using Both Together</h2>
  <p>The most powerful research combines both: use Dune for on-chain trade flow and wallet analysis, and PolyHistorical for the order book context around those trades. For example, correlate large on-chain trades (from Dune) with order book depth changes (from PolyHistorical) to understand market impact.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polyhistorical-vs-the-graph">PolyHistorical vs The Graph for Polymarket Data</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  <li><a href="/p/best-prediction-market-data-providers-2025">Best Prediction Market Data Providers in 2025</a></li>
  </ul>`,
};

export default page;
