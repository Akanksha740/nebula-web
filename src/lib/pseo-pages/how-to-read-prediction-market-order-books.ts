import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b31', categorySlug: 'market-data', categoryName: 'Market Data Guides',
  title: 'How to Read Prediction Market Order Books',
  slug: 'how-to-read-prediction-market-order-books',
  excerpt: 'A beginner-friendly guide to reading and interpreting order books in Polymarket prediction markets.',
  metaTitle: 'How to Read Prediction Market Order Books | PolyHistorical',
  metaDescription: 'Learn how to read and interpret Polymarket prediction market order books. Understand bids, asks, depth, spread, and what they tell you about market sentiment.',
  ogImage: '/og/market-data.png', createdAt: '', updatedAt: '',
  content: `<h2>What Is a Prediction Market Order Book?</h2>
  <p>An order book is a real-time list of outstanding buy orders (bids) and sell orders (asks) for a prediction market contract. On Polymarket, each <strong>BTC, ETH, or SOL Up/Down market</strong> has its own order book showing the prices and quantities at which traders are willing to buy or sell outcome shares.</p>

  <h2>Anatomy of a Polymarket Order Book</h2>
  <table>
  <thead><tr><th>Component</th><th>Description</th><th>Example</th></tr></thead>
  <tbody>
  <tr><td>Best Bid</td><td>Highest price a buyer will pay</td><td>$0.52</td></tr>
  <tr><td>Best Ask</td><td>Lowest price a seller will accept</td><td>$0.54</td></tr>
  <tr><td>Bid-Ask Spread</td><td>Difference between best ask and best bid</td><td>$0.02</td></tr>
  <tr><td>Midpoint</td><td>Average of best bid and best ask</td><td>$0.53</td></tr>
  <tr><td>Depth</td><td>Total volume available at each price level</td><td>500 shares at $0.52</td></tr>
  </tbody>
  </table>

  <h2>Reading the Bid Side</h2>
  <p>The bid side shows all outstanding buy orders, sorted from highest price to lowest. The <strong>best bid</strong> is the highest price any buyer is currently offering. Deeper bids (at lower prices) represent buyers willing to buy only at a discount. A deep bid side with large volumes suggests strong buying interest and support for the current price.</p>

  <h3>What Bid Depth Tells You</h3>
  <ul>
  <li>Large bid volumes near the midpoint indicate strong support</li>
  <li>Thin bid depth means the price could drop quickly on a sell</li>
  <li>Increasing bid depth over time signals growing bullish sentiment</li>
  <li>Sudden bid withdrawals may indicate informed sellers entering the market</li>
  </ul>

  <h2>Reading the Ask Side</h2>
  <p>The ask side shows all outstanding sell orders, sorted from lowest to highest price. The <strong>best ask</strong> is the lowest price at which someone will sell shares. A heavy ask side near the current price suggests selling pressure and potential resistance to price increases.</p>

  <h2>Understanding Prediction Market Prices</h2>
  <p>In Polymarket, prices represent <strong>implied probabilities</strong>. A midpoint of $0.65 means the market collectively estimates a 65% probability of that outcome occurring. This is fundamentally different from traditional asset prices — prediction market prices are bounded between $0 and $1.</p>

  <h3>Key Differences from Exchange Order Books</h3>
  <ul>
  <li>Prices are bounded between 0 and 1 (probability range)</li>
  <li>Contracts settle at exactly $0 or $1 (binary outcome)</li>
  <li>Complementary markets exist (e.g., BTC Up and BTC Down sum to ~$1)</li>
  <li>Time decay affects pricing as resolution approaches</li>
  </ul>

  <h2>Using PolyHistorical to Study Order Books</h2>
  <p>PolyHistorical captures <strong>sub-second order book snapshots</strong> for every Polymarket BTC, ETH, and SOL Up/Down market. This lets you study how order books evolve over time — watch bids build before events, observe how the spread tightens as consensus forms, and analyze depth changes around market resolution. Start with the free tier to explore BTC, ETH, and SOL market order books today.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/understanding-bid-ask-spread-prediction-markets">Understanding Bid-Ask Spread in Prediction Markets</a></li>
  <li><a href="/p/liquidity-analysis-polymarket">Liquidity Analysis for Polymarket Markets</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  </ul>`,
};

export default page;
