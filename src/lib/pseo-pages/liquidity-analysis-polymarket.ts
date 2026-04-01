import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b30', categorySlug: 'use-cases', categoryName: 'Use Cases',
  title: 'Liquidity Analysis for Polymarket Markets',
  slug: 'liquidity-analysis-polymarket',
  excerpt: 'How to measure and analyze liquidity in Polymarket prediction markets using historical order book depth data.',
  metaTitle: 'Liquidity Analysis for Polymarket Prediction Markets | PolyHistorical',
  metaDescription: 'Measure and analyze liquidity in Polymarket prediction markets. Use order book depth, spread, and turnover data from PolyHistorical for liquidity research.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Liquidity Analysis for Polymarket Markets</h1>
  <h2>Why Liquidity Analysis Matters</h2>
  <p>Liquidity determines how easily you can enter and exit prediction market positions without moving the price. For Polymarket traders, understanding liquidity patterns using <strong>PolyHistorical order book data</strong> is essential for optimal execution and strategy development.</p>

  <h2>Liquidity Metrics You Can Calculate</h2>
  <table>
  <thead><tr><th>Metric</th><th>What It Measures</th><th>PolyHistorical Data Used</th></tr></thead>
  <tbody>
  <tr><td>Bid-Ask Spread</td><td>Cost of immediate round-trip trade</td><td>Best bid and best ask prices</td></tr>
  <tr><td>Market Depth</td><td>Volume available within X% of midpoint</td><td>Full order book depth</td></tr>
  <tr><td>Resilience</td><td>How quickly the book recovers after a large trade</td><td>Sequential order book snapshots</td></tr>
  <tr><td>Kyle's Lambda</td><td>Price impact per unit of volume</td><td>Price changes relative to volume</td></tr>
  <tr><td>Amihud Illiquidity</td><td>Absolute return per dollar of volume</td><td>Price returns and trading volume</td></tr>
  </tbody>
  </table>

  <h2>Measuring Market Depth</h2>
  <p>Market depth measures how much volume is available at or near the current price. Using PolyHistorical's <strong>full order book depth data</strong>, you can calculate depth at multiple levels — for example, the total volume within 1%, 2%, and 5% of the midpoint price.</p>

  <h3>Depth Analysis Steps</h3>
  <ul>
  <li>Fetch full order book snapshots from the PolyHistorical API</li>
  <li>Calculate the midpoint price from best bid and best ask</li>
  <li>Sum bid volume within 1%, 2%, 5% of midpoint</li>
  <li>Sum ask volume within the same ranges</li>
  <li>Track depth over time to identify liquidity patterns</li>
  </ul>

  <h2>Liquidity Patterns in Prediction Markets</h2>
  <p>Polymarket prediction markets exhibit distinct liquidity patterns that differ from traditional exchanges:</p>
  <ul>
  <li><strong>Time-of-day effects:</strong> Liquidity tends to be higher during US trading hours</li>
  <li><strong>Event-driven thinning:</strong> Order books thin out before major news events as market makers pull orders</li>
  <li><strong>Resolution approach:</strong> Liquidity often decreases as markets near their resolution date</li>
  <li><strong>Price-level dependency:</strong> Markets at extreme prices (near 0 or 1) have less liquidity</li>
  </ul>

  <h2>Practical Applications</h2>
  <p>Liquidity analysis informs multiple trading decisions. <strong>Market makers</strong> use depth data to set optimal quote widths. <strong>Algo traders</strong> use liquidity patterns to time entries and exits. <strong>Researchers</strong> use liquidity metrics to study prediction market efficiency and microstructure.</p>

  <h3>Building a Liquidity Dashboard</h3>
  <ul>
  <li>Track real-time and historical spread for each Polymarket market</li>
  <li>Monitor depth changes to detect liquidity events</li>
  <li>Compare liquidity across different market types (5m, 15m, 1h, 4h, 24h)</li>
  <li>Alert on unusual liquidity changes that may signal informed trading</li>
  </ul>

  <h2>Get Started</h2>
  <p>PolyHistorical's free tier includes full order book depth for BTC markets — everything you need to start building liquidity analysis tools. The Pro plan at <strong>$11/month</strong> extends coverage to all markets for comprehensive liquidity monitoring.</p>`,
};

export default page;
