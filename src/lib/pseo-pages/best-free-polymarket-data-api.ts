import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b13', categorySlug: 'alternatives', categoryName: 'Alternatives',
  title: 'Best Free Polymarket Data API',
  slug: 'best-free-polymarket-data-api',
  excerpt: "PolyHistorical offers the most generous free tier for Polymarket historical data — no credit card required.",
  metaTitle: 'Best Free Polymarket Data API | PolyHistorical',
  metaDescription: 'Access Polymarket historical data for free. PolyHistorical offers the best free API for order book snapshots, market data, and backtesting.',
  ogImage: '/og/alternatives.png', createdAt: '', updatedAt: '',
  content: `<h2>Free Polymarket Data Options</h2>
  <p>There are limited options for accessing Polymarket historical data for free. Here's how they compare:</p>

  <h2>Free Tier Comparison</h2>
  <table>
  <thead><tr><th>Feature</th><th>PolyHistorical Free</th><th>Polymarket CLOB API</th><th>Dune Analytics</th></tr></thead>
  <tbody>
  <tr><td>Historical Order Books</td><td>&#10003; Sub-second snapshots</td><td>&#10007; Live only</td><td>&#10007;</td></tr>
  <tr><td>Resolved Market Data</td><td>&#10003;</td><td>Limited</td><td>&#10003; On-chain only</td></tr>
  <tr><td>Order Book Depth</td><td>&#10003; Full depth</td><td>&#10003; Current only</td><td>&#10007;</td></tr>
  <tr><td>Rate Limit</td><td>60 req/min, 1K/day</td><td>Varies</td><td>Query-based</td></tr>
  <tr><td>Auth Method</td><td>API key</td><td>Wallet signature</td><td>Account</td></tr>
  <tr><td>Credit Card Required</td><td>No</td><td>No</td><td>No</td></tr>
  </tbody>
  </table>

  <h2>What You Get Free on PolyHistorical</h2>
  <ul>
  <li><strong>BTC, ETH, and SOL</strong> Up/Down prediction market data</li>
  <li><strong>Recent market history:</strong> Last 50 markets (5m/15m), 24 (1h/4h), 5 (24h)</li>
  <li><strong>Full order book depth</strong> on every snapshot</li>
  <li><strong>Sub-second granularity</strong> (300ms intervals)</li>
  <li><strong>No credit card, no trial period</strong> — free means free</li>
  </ul>

  <h2>Quick Start</h2>
  <pre><code>curl -H "X-API-Key: YOUR_FREE_KEY" \
  "https://api.polyhistorical.com/v1/markets?coin=BTC&active=true"</code></pre>
  <p>Sign up at <a href="/signup">polyhistorical.com/signup</a> to get your free API key in 30 seconds.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-free-vs-paid">Free vs Paid API Comparison</a></li>
  <li><a href="/p/getting-started-polyhistorical-python">Python Quick Start Guide</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  </ul>`,
};

export default page;
