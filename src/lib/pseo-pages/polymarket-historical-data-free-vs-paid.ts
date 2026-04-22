import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b5', categorySlug: 'compare', categoryName: 'Comparisons',
  title: 'Polymarket Historical Data: Free vs Paid API Comparison',
  slug: 'polymarket-historical-data-free-vs-paid',
  excerpt: 'Comparing free and paid options for accessing Polymarket historical market data.',
  metaTitle: 'Free vs Paid Polymarket Historical Data API | PolyHistorical',
  metaDescription: 'Compare free and paid options for Polymarket historical data. See what you get on each PolyHistorical tier — data coverage, rate limits, and features.',
  ogImage: '/og/compare.png', createdAt: '', updatedAt: '',
  content: `<h2>Free vs Paid: What Do You Get?</h2>
  <p>PolyHistorical offers both free and paid tiers for accessing Polymarket historical order book data. Here's exactly what's included at each level.</p>

  <h2>Plan Comparison</h2>
  <table>
  <thead><tr><th>Feature</th><th>Starter (Free)</th><th>Pro ($11/mo)</th><th>Enterprise</th></tr></thead>
  <tbody>
  <tr><td>Coins</td><td>BTC, ETH, SOL</td><td>BTC, ETH, SOL</td><td>BTC, ETH, SOL</td></tr>
  <tr><td>Market History</td><td>Last 50 (5m/15m), 24 (1h/4h), 5 (24h)</td><td>Unlimited</td><td>Unlimited</td></tr>
  <tr><td>Order Book Depth</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td></tr>
  <tr><td>Snapshot Granularity</td><td>Sub-second</td><td>Sub-second</td><td>Sub-second</td></tr>
  <tr><td>Rate Limit</td><td>60 req/min, 1K/day</td><td>300 req/min, 50K/day</td><td>Custom</td></tr>
  <tr><td>Credit Card Required</td><td>No</td><td>Yes</td><td>Invoice</td></tr>
  </tbody>
  </table>

  <h2>When Free Is Enough</h2>
  <ul>
  <li>You're <strong>exploring</strong> prediction market data for the first time</li>
  <li>You're building a prototype or proof of concept</li>
  <li>You only need recent market history for quick analysis</li>
  <li>You're a student or academic doing initial research</li>
  </ul>

  <h2>When to Upgrade to Pro</h2>
  <ul>
  <li>You need <strong>unlimited historical depth</strong> for comprehensive backtesting</li>
  <li>You're running automated strategies that need higher rate limits</li>
  <li>You need ETH and SOL data alongside BTC</li>
  <li>You're building a production application or trading bot</li>
  </ul>

  <h2>Quick Start</h2>
  <pre><code>curl -H "X-API-Key: YOUR_KEY" \
  "https://api.polyhistorical.com/v1/markets?coin=BTC&active=true"</code></pre>
  <p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> — no credit card required. Upgrade anytime from the dashboard.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API: Full Documentation</a></li>
  <li><a href="/p/best-free-polymarket-data-api">Best Free Polymarket Data API</a></li>
  </ul>`,
};

export default page;
