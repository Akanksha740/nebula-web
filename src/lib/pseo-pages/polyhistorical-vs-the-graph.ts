import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b6', categorySlug: 'compare', categoryName: 'Comparisons',
  title: 'PolyHistorical vs The Graph for Polymarket Data',
  slug: 'polyhistorical-vs-the-graph',
  excerpt: 'How PolyHistorical compares to The Graph protocol for accessing Polymarket data.',
  metaTitle: 'PolyHistorical vs The Graph: Polymarket Data Compared',
  metaDescription: 'Compare PolyHistorical and The Graph for Polymarket data access. See differences in data types, query methods, granularity, and use cases.',
  ogImage: '/og/compare.png', createdAt: '', updatedAt: '',
  content: `<h2>Overview</h2>
  <p>The Graph is a decentralized indexing protocol that lets developers query blockchain data via GraphQL subgraphs. PolyHistorical is a centralized API purpose-built for <strong>Polymarket order book snapshots</strong>. They index fundamentally different data.</p>

  <h2>Data Comparison</h2>
  <table>
  <thead><tr><th>Feature</th><th>PolyHistorical</th><th>The Graph</th></tr></thead>
  <tbody>
  <tr><td>Order Book History</td><td>&#10003; Full depth, 300ms</td><td>&#10007; Not indexed</td></tr>
  <tr><td>On-Chain Events</td><td>&#10007;</td><td>&#10003; Via subgraphs</td></tr>
  <tr><td>Query Language</td><td>REST API</td><td>GraphQL</td></tr>
  <tr><td>Data Freshness</td><td>Sub-second</td><td>Block-level (seconds to minutes)</td></tr>
  <tr><td>Setup Required</td><td>API key only</td><td>Deploy or find a subgraph</td></tr>
  <tr><td>Pricing</td><td>Free tier + $11/mo Pro</td><td>GRT token costs for queries</td></tr>
  </tbody>
  </table>

  <h2>When to Use PolyHistorical</h2>
  <ul>
  <li>You need <strong>order book depth and spread history</strong> that doesn't exist on-chain</li>
  <li>You want a simple REST API without deploying subgraphs</li>
  <li>You need sub-second granularity for backtesting or market analysis</li>
  </ul>

  <h2>When to Use The Graph</h2>
  <ul>
  <li>You need <strong>on-chain event data</strong> (trades, mints, burns, transfers)</li>
  <li>You're building a dApp that queries blockchain state</li>
  <li>You need cross-protocol data from multiple DeFi protocols</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polyhistorical-vs-dune-analytics">PolyHistorical vs Dune Analytics</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API</a></li>
  <li><a href="/p/best-prediction-market-data-providers-2025">Best Prediction Market Data Providers in 2025</a></li>
  </ul>`,
};

export default page;
