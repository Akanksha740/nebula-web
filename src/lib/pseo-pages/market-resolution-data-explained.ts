import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b34', categorySlug: 'market-data', categoryName: 'Market Data Guides',
  title: 'Market Resolution Data Explained: How Polymarket Settles',
  slug: 'market-resolution-data-explained',
  excerpt: 'Understanding how Polymarket markets resolve, what settlement data looks like, and how to use resolution history in your analysis.',
  metaTitle: 'Polymarket Market Resolution Data Explained | PolyHistorical',
  metaDescription: 'Learn how Polymarket prediction markets resolve and settle. Understand resolution data, settlement mechanics, and how to use resolution history for research.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Market Resolution Data Explained: How Polymarket Settles</h1>
  <h2>How Polymarket Markets Resolve</h2>
  <p>Polymarket prediction markets have defined resolution criteria — for BTC/ETH/SOL Up/Down markets, the resolution is based on whether the asset price is above or below a strike price at a specific time. Understanding this resolution process is critical for anyone analyzing historical data from <strong>PolyHistorical</strong>.</p>

  <h2>Resolution Mechanics for Up/Down Markets</h2>
  <table>
  <thead><tr><th>Market Type</th><th>Resolution Time</th><th>Resolution Criteria</th></tr></thead>
  <tbody>
  <tr><td>5-minute</td><td>Every 5 minutes</td><td>BTC/ETH/SOL price vs strike at end of 5-min window</td></tr>
  <tr><td>15-minute</td><td>Every 15 minutes</td><td>BTC/ETH/SOL price vs strike at end of 15-min window</td></tr>
  <tr><td>1-hour</td><td>Every hour</td><td>BTC/ETH/SOL price vs strike at end of hour</td></tr>
  <tr><td>4-hour</td><td>Every 4 hours</td><td>BTC/ETH/SOL price vs strike at end of 4-hour block</td></tr>
  <tr><td>24-hour</td><td>Daily</td><td>BTC/ETH/SOL price vs strike at end of day (UTC)</td></tr>
  </tbody>
  </table>

  <h2>What Resolution Data Looks Like</h2>
  <p>When a market resolves, the outcome is binary: <strong>Yes ($1)</strong> or <strong>No ($0)</strong>. If BTC is above the strike price at resolution, the "Up" contract pays $1 and the "Down" contract pays $0. PolyHistorical captures the full order book history leading up to each resolution, letting you study how prices converge to the final outcome.</p>

  <h3>Pre-Resolution Order Book Behavior</h3>
  <ul>
  <li>As the outcome becomes clearer, prices move toward $0 or $1</li>
  <li>The bid-ask spread typically narrows as uncertainty decreases</li>
  <li>Order book depth may thin as market makers reduce exposure</li>
  <li>Some markets see a last-minute flurry of activity from informed traders</li>
  </ul>

  <h2>Using Resolution History for Research</h2>
  <p>Historical resolution data is invaluable for several types of analysis:</p>
  <ul>
  <li><strong>Calibration studies:</strong> Do markets priced at 0.70 actually resolve Yes 70% of the time?</li>
  <li><strong>Market efficiency:</strong> How quickly do prices incorporate new information before resolution?</li>
  <li><strong>Strategy evaluation:</strong> Test whether your model would have been profitable across past resolutions</li>
  <li><strong>Convergence analysis:</strong> How far before resolution do prices begin converging to the outcome?</li>
  </ul>

  <h2>Resolution Edge Cases</h2>
  <p>Understanding edge cases helps avoid surprises in your analysis. Some considerations for Polymarket resolution data:</p>
  <ul>
  <li><strong>Disputed resolutions</strong> may have unusual order book behavior in the final moments</li>
  <li><strong>Markets near the strike</strong> can have high uncertainty until the very last second</li>
  <li><strong>Oracle delays</strong> occasionally cause brief periods where the outcome is known but not yet settled</li>
  <li><strong>Complementary markets</strong> (Up/Down pairs) should always sum to approximately $1</li>
  </ul>

  <h2>Accessing Resolution Data with PolyHistorical</h2>
  <p>PolyHistorical stores order book snapshots through and beyond market resolution. This means you can reconstruct exactly how the order book looked 1 minute, 5 minutes, or 1 hour before each resolution — critical for backtesting and market efficiency research. Start exploring with the free tier for BTC markets.</p>`,
};

export default page;
