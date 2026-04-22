import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b32', categorySlug: 'market-data', categoryName: 'Market Data Guides',
  title: 'Understanding Bid-Ask Spread in Prediction Markets',
  slug: 'understanding-bid-ask-spread-prediction-markets',
  excerpt: 'What the bid-ask spread tells you about Polymarket liquidity, efficiency, and trading opportunities.',
  metaTitle: 'Bid-Ask Spread in Prediction Markets Explained | PolyHistorical',
  metaDescription: 'Understand what the bid-ask spread means in Polymarket prediction markets. Learn how spread analysis reveals liquidity, trading costs, and market efficiency.',
  ogImage: '/og/market-data.png', createdAt: '', updatedAt: '',
  content: `<h2>What Is the Bid-Ask Spread?</h2>
  <p>The bid-ask spread is the difference between the highest price a buyer will pay (best bid) and the lowest price a seller will accept (best ask). In Polymarket prediction markets, this spread directly represents the <strong>cost of immediate trading</strong> and reflects market liquidity and efficiency.</p>

  <h2>Spread Components in Prediction Markets</h2>
  <table>
  <thead><tr><th>Component</th><th>Description</th><th>Impact on Spread</th></tr></thead>
  <tbody>
  <tr><td>Inventory Risk</td><td>Market makers' risk of holding positions</td><td>Higher risk = wider spread</td></tr>
  <tr><td>Information Asymmetry</td><td>Risk of trading against informed traders</td><td>More asymmetry = wider spread</td></tr>
  <tr><td>Competition</td><td>Number of active market makers</td><td>More competition = tighter spread</td></tr>
  <tr><td>Volatility</td><td>Expected price movement</td><td>Higher volatility = wider spread</td></tr>
  <tr><td>Time to Resolution</td><td>How soon the market settles</td><td>Approaching resolution can widen or tighten</td></tr>
  </tbody>
  </table>

  <h2>Typical Spreads on Polymarket</h2>
  <p>Polymarket prediction market spreads vary significantly by market type and conditions. <strong>Liquid BTC/ETH/SOL 24h markets</strong> often have spreads of $0.01-0.03, while shorter timeframe markets (5m, 15m) may have wider spreads of $0.03-0.08 due to higher uncertainty and faster resolution.</p>

  <h3>Spread by Market Type</h3>
  <ul>
  <li><strong>24h Up/Down markets:</strong> Typically $0.01-0.03 — most liquid, most market maker activity</li>
  <li><strong>4h markets:</strong> Usually $0.02-0.04 — good liquidity, moderate uncertainty</li>
  <li><strong>1h markets:</strong> Often $0.02-0.05 — higher turnover, moderate spreads</li>
  <li><strong>5m/15m markets:</strong> Can reach $0.05-0.10 — high uncertainty, fast resolution</li>
  </ul>

  <h2>What Spread Changes Tell You</h2>
  <p>Monitoring spread changes over time reveals important market dynamics. Use PolyHistorical's <strong>historical order book snapshots</strong> to track how spreads behave:</p>
  <ul>
  <li><strong>Narrowing spread:</strong> Increasing consensus on outcome probability, growing liquidity</li>
  <li><strong>Widening spread:</strong> Rising uncertainty, market makers pulling back, or approaching a volatile event</li>
  <li><strong>Sudden spike:</strong> May indicate a news event or large informed trade</li>
  <li><strong>Gradual tightening before resolution:</strong> Outcome becoming clear to market participants</li>
  </ul>

  <h2>Trading Implications</h2>
  <p>Understanding spreads helps you optimize execution. <strong>Limit orders</strong> inside the spread let you avoid paying the full spread cost. PolyHistorical data shows you historical spread patterns so you can time orders for periods of tighter spreads, reducing trading costs.</p>

  <h2>Analyzing Historical Spreads with PolyHistorical</h2>
  <p>PolyHistorical captures the full order book at sub-second intervals, giving you precise spread measurements at every point in time. Calculate rolling average spreads, identify time-of-day patterns, and study how spreads react to external events — all from the API's historical data.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/how-to-read-prediction-market-order-books">How to Read Prediction Market Order Books</a></li>
  <li><a href="/p/spread-trading-prediction-markets">Spread Trading Strategies for Prediction Markets</a></li>
  <li><a href="/p/liquidity-analysis-polymarket">Liquidity Analysis for Polymarket Markets</a></li>
  </ul>`,
};

export default page;
