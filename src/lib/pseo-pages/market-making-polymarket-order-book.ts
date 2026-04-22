import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b10', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Market Making on Polymarket: Using Order Book History',
  slug: 'market-making-polymarket-order-book',
  excerpt: 'How to develop market making strategies for Polymarket using historical order book depth data.',
  metaTitle: 'Market Making on Polymarket with Order Book Data',
  metaDescription: 'Develop market making strategies for Polymarket prediction markets. Analyze historical order book depth, spreads, and inventory risk with PolyHistorical.',
  ogImage: '/og/use-cases.png', createdAt: '', updatedAt: '',
  content: `<h2>Market Making in Prediction Markets</h2>
  <p>Market makers provide liquidity by continuously quoting bid and ask prices. On Polymarket, this means placing limit orders on both sides of BTC, ETH, and SOL Up/Down markets. PolyHistorical's order book history lets you <strong>analyze historical spreads, depth, and competition</strong> before committing capital.</p>

  <h2>Key Metrics for Market Makers</h2>
  <table>
  <thead><tr><th>Metric</th><th>What It Tells You</th><th>PolyHistorical Data</th></tr></thead>
  <tbody>
  <tr><td>Bid-Ask Spread</td><td>Revenue opportunity per round trip</td><td>price_up + price_down spreads</td></tr>
  <tr><td>Depth at Best</td><td>Competition from other market makers</td><td>Top-of-book sizes over time</td></tr>
  <tr><td>Depth Stability</td><td>How often the book gets swept</td><td>Order book snapshots at 300ms</td></tr>
  <tr><td>Adverse Selection</td><td>Risk of trading against informed flow</td><td>Price moves after fills</td></tr>
  <tr><td>Inventory Duration</td><td>How long positions are held</td><td>Market resolution times</td></tr>
  </tbody>
  </table>

  <h2>Strategy Development Workflow</h2>
  <ol>
  <li><strong>Analyze historical spreads:</strong> Use PolyHistorical to find markets with consistently wide spreads (your revenue)</li>
  <li><strong>Study depth patterns:</strong> Identify when competitor depth is thin (your opportunity)</li>
  <li><strong>Model adverse selection:</strong> Measure how often the market moves against passive orders</li>
  <li><strong>Backtest quoting strategy:</strong> Simulate placing orders on historical order books</li>
  <li><strong>Optimize parameters:</strong> Spread width, position limits, inventory skew</li>
  </ol>

  <h2>Risk Factors</h2>
  <ul>
  <li><strong>Inventory risk:</strong> Prediction markets resolve — holding the wrong side at resolution means total loss of that position</li>
  <li><strong>Adverse selection:</strong> Informed traders may pick off your quotes before you can cancel</li>
  <li><strong>Gas costs:</strong> On-chain order placement and cancellation costs erode thin margins</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/understanding-bid-ask-spread-prediction-markets">Understanding Bid-Ask Spread in Prediction Markets</a></li>
  <li><a href="/p/liquidity-analysis-polymarket">Liquidity Analysis for Polymarket Markets</a></li>
  <li><a href="/p/spread-trading-prediction-markets">Spread Trading Strategies for Prediction Markets</a></li>
  </ul>`,
};

export default page;
