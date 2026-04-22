import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b14', categorySlug: 'api-developers', categoryName: 'API & Developers',
  title: "Polymarket API vs PolyHistorical API: What's the Difference?",
  slug: 'polymarket-api-vs-polyhistorical-api',
  excerpt: "Understanding the difference between Polymarket's official API and PolyHistorical's historical data API.",
  metaTitle: "Polymarket API vs PolyHistorical API | What's the Difference?",
  metaDescription: "Compare Polymarket's official API with PolyHistorical's historical data API. See differences in data, use cases, and when to use each.",
  ogImage: '/og/api-developers.png', createdAt: '', updatedAt: '',
  content: `<h2>Two Different APIs, Two Different Purposes</h2>
  <p>Polymarket has its own API (the CLOB API) for live trading and current market data. PolyHistorical is a separate service that provides <strong>historical order book snapshots</strong> — data that Polymarket itself doesn't store or expose.</p>

  <h2>Feature Comparison</h2>
  <table>
  <thead><tr><th>Feature</th><th>Polymarket CLOB API</th><th>PolyHistorical API</th></tr></thead>
  <tbody>
  <tr><td>Live Order Book</td><td>&#10003; Current state</td><td>&#10003; Historical snapshots</td></tr>
  <tr><td>Historical Order Books</td><td>&#10007; Not available</td><td>&#10003; Sub-second, full depth</td></tr>
  <tr><td>Place Orders</td><td>&#10003;</td><td>&#10007; Read-only</td></tr>
  <tr><td>Market Metadata</td><td>&#10003; Current markets</td><td>&#10003; Including resolved</td></tr>
  <tr><td>Resolved Market Data</td><td>Limited</td><td>&#10003; Full snapshot history</td></tr>
  <tr><td>Authentication</td><td>Wallet signature</td><td>API key</td></tr>
  <tr><td>Rate Limits</td><td>Varies</td><td>60-300 req/min by plan</td></tr>
  <tr><td>Pricing</td><td>Free</td><td>Free tier + $11/mo Pro</td></tr>
  </tbody>
  </table>

  <h2>When to Use Polymarket API</h2>
  <ul>
  <li>You're building a <strong>live trading bot</strong> that places and manages orders</li>
  <li>You need the current order book state for real-time decisions</li>
  <li>You're integrating with Polymarket wallets or positions</li>
  </ul>

  <h2>When to Use PolyHistorical API</h2>
  <ul>
  <li>You're <strong>backtesting strategies</strong> and need historical order book data</li>
  <li>You're doing research on resolved markets (data that no longer exists on Polymarket)</li>
  <li>You need time-series analysis of order book evolution</li>
  <li>You want a simple API key auth instead of wallet signatures</li>
  </ul>

  <h2>Using Both Together</h2>
  <p>The best trading systems use both: PolyHistorical for strategy development and backtesting, Polymarket CLOB API for live execution. Develop your edge with historical data, then deploy it live.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-api-documentation">Polymarket Historical Data API Documentation</a></li>
  <li><a href="/p/polyhistorical-api-authentication-guide">PolyHistorical API Authentication Guide</a></li>
  <li><a href="/p/building-polymarket-trading-bot">Building a Polymarket Trading Bot</a></li>
  </ul>`,
};

export default page;
