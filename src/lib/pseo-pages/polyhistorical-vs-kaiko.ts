import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b1', categorySlug: 'compare', categoryName: 'Comparisons',
  title: 'PolyHistorical vs Kaiko: Prediction Market Data Compared',
  slug: 'polyhistorical-vs-kaiko',
  excerpt: 'How does PolyHistorical compare to Kaiko for crypto prediction market data? We break down pricing, data granularity, and coverage.',
  metaTitle: 'PolyHistorical vs Kaiko: Prediction Market Data Comparison',
  metaDescription: 'Compare PolyHistorical and Kaiko for crypto market data. See differences in prediction market coverage, pricing, order book granularity, and API features.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>PolyHistorical vs Kaiko: Prediction Market Data Compared</h1>
  <h2>Overview</h2>
  <p>Kaiko is a well-known institutional crypto market data provider covering centralized exchanges. PolyHistorical focuses specifically on <strong>Polymarket prediction market data</strong> with sub-second order book snapshots — a niche Kaiko does not cover.</p>

  <h2>Data Coverage</h2>
  <table>
  <thead><tr><th>Feature</th><th>PolyHistorical</th><th>Kaiko</th></tr></thead>
  <tbody>
  <tr><td>Prediction Market Data</td><td>&#10003; Full order book history</td><td>&#10007; Not available</td></tr>
  <tr><td>BTC/ETH/SOL Up/Down Markets</td><td>&#10003; 5m, 15m, 1h, 4h, 24h</td><td>&#10007;</td></tr>
  <tr><td>Snapshot Granularity</td><td>Sub-second (500ms)</td><td>10s–1min (exchange data)</td></tr>
  <tr><td>CEX Spot/Derivatives</td><td>&#10007;</td><td>&#10003; 100+ exchanges</td></tr>
  <tr><td>Order Book Depth</td><td>&#10003; Full bid/ask depth</td><td>&#10003; Top of book + depth</td></tr>
  </tbody>
  </table>

  <h2>Pricing</h2>
  <p>Kaiko's institutional plans start at <strong>$5,000+/month</strong>. PolyHistorical offers a <strong>free tier</strong> with BTC data and a Pro plan at <strong>$11/month</strong> for all coins with unlimited history.</p>

  <h2>When to Choose PolyHistorical</h2>
  <ul>
  <li>You need <strong>Polymarket-specific</strong> historical order book data</li>
  <li>You want sub-second granularity for backtesting prediction markets</li>
  <li>You're a startup or indie developer who can't afford institutional pricing</li>
  </ul>

  <h2>When to Choose Kaiko</h2>
  <ul>
  <li>You need broad CEX coverage across 100+ exchanges</li>
  <li>You're building institutional-grade trading infrastructure</li>
  <li>You need derivatives and options data</li>
  </ul>`,
};

export default page;
