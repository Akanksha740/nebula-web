import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b21', categorySlug: 'market-data', categoryName: 'Market Data Guides',
  title: 'What is Polymarket Order Book Data?',
  slug: 'what-is-polymarket-order-book-data',
  excerpt: 'Understanding order book data in Polymarket prediction markets — what it is, why it matters, and how to access it.',
  metaTitle: 'What is Polymarket Order Book Data? | PolyHistorical',
  metaDescription: 'Learn what Polymarket order book data is, how it works, and why it matters for prediction market trading, research, and backtesting.',
  ogImage: '/og/market-data.png', createdAt: '', updatedAt: '',
  content: `<h2>Order Books in Prediction Markets</h2>
  <p>An order book is a real-time ledger of all outstanding buy (bid) and sell (ask) orders for a prediction market contract. On Polymarket, every BTC, ETH, and SOL Up/Down market has two order books — one for the "Up" outcome and one for the "Down" outcome.</p>

  <h2>Anatomy of a Polymarket Order Book</h2>
  <table>
  <thead><tr><th>Component</th><th>Description</th><th>Example</th></tr></thead>
  <tbody>
  <tr><td>Bids</td><td>Prices buyers are willing to pay</td><td>$0.52, $0.51, $0.50...</td></tr>
  <tr><td>Asks</td><td>Prices sellers are willing to accept</td><td>$0.54, $0.55, $0.56...</td></tr>
  <tr><td>Spread</td><td>Gap between best bid and best ask</td><td>$0.02</td></tr>
  <tr><td>Depth</td><td>Total size at each price level</td><td>500 shares at $0.52</td></tr>
  <tr><td>Midpoint</td><td>Average of best bid and ask</td><td>$0.53</td></tr>
  </tbody>
  </table>

  <h2>Why Order Book Data Matters</h2>
  <ul>
  <li><strong>Price discovery:</strong> The order book shows where supply meets demand — the real market price</li>
  <li><strong>Liquidity assessment:</strong> Deep books mean easier execution; thin books mean higher slippage</li>
  <li><strong>Sentiment signals:</strong> Heavy bid-side depth suggests bullish sentiment; heavy ask-side suggests bearish</li>
  <li><strong>Strategy development:</strong> Backtesting with order book data produces more realistic results than price-only backtests</li>
  </ul>

  <h2>Historical vs Live Order Books</h2>
  <p>Polymarket shows you the <strong>current</strong> order book, but once a market resolves, that data disappears. PolyHistorical captures snapshots every 300ms, preserving the complete order book history for every market — including resolved ones.</p>

  <h2>Accessing Order Book Data</h2>
  <pre><code>curl -H "X-API-Key: YOUR_KEY" \
  "https://api.polyhistorical.com/v1/markets/SLUG/snapshots?include_orderbook=true"</code></pre>
  <p>Each snapshot includes full bid/ask depth, prices, volume, liquidity, and coin price at that moment.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/how-to-read-prediction-market-order-books">How to Read Prediction Market Order Books</a></li>
  <li><a href="/p/understanding-bid-ask-spread-prediction-markets">Understanding Bid-Ask Spread in Prediction Markets</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  </ul>`,
};

export default page;
