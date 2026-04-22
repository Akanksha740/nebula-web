import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b56', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data Availability: What Data Exists & How Far Back',
  slug: 'polymarket-historical-data-availability',
  excerpt: 'Full breakdown of Polymarket historical data availability — which markets are covered, how far back the data goes, and snapshot granularity on PolyHistorical.',
  metaTitle: 'Polymarket Historical Data Availability — Coverage & Depth | PolyHistorical',
  metaDescription: 'Find out exactly what Polymarket historical data is available on PolyHistorical — markets covered, date ranges, snapshot frequency, and data depth.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<p>One of the most common questions we get: <em>"How much Polymarket historical data do you actually have?"</em> Here's the complete breakdown of <strong>Polymarket historical data availability</strong> on PolyHistorical.</p>

<h2>Markets Covered</h2>
<table>
<thead><tr><th>Coin</th><th>Timeframes</th><th>Direction</th><th>Status</th></tr></thead>
<tbody>
<tr><td>BTC</td><td>5m, 15m, 1hr, 4hr, 24hr</td><td>Up &amp; Down</td><td>Active</td></tr>
<tr><td>ETH</td><td>5m, 15m, 1hr, 4hr, 24hr</td><td>Up &amp; Down</td><td>Coming soon</td></tr>
<tr><td>SOL</td><td>5m, 15m, 1hr, 4hr, 24hr</td><td>Up &amp; Down</td><td>Coming soon</td></tr>
</tbody>
</table>

<h2>How Far Back Does the Data Go?</h2>
<p>PolyHistorical has been recording Polymarket order book data since the early days of the BTC Up/Down markets. The archive continues to grow every day as new snapshots are captured in real-time. The Pro plan gives you access to the full historical archive.</p>

<h2>Free Tier vs Pro Access</h2>
<table>
<thead><tr><th>Market Type</th><th>Starter (Free)</th><th>Pro ($11/mo)</th></tr></thead>
<tbody>
<tr><td>BTC 5m &amp; 15m</td><td>Last 50 markets</td><td>All historical</td></tr>
<tr><td>BTC 1hr &amp; 4hr</td><td>Last 24 markets</td><td>All historical</td></tr>
<tr><td>BTC 24hr</td><td>Last 5 markets</td><td>All historical</td></tr>
</tbody>
</table>

<h2>Snapshot Granularity</h2>
<p>Snapshots are captured at <strong>sub-second resolution</strong> — the highest available anywhere for Polymarket data. This means:</p>
<ul>
<li>A 5-minute market window can contain <strong>hundreds of snapshots</strong></li>
<li>You get enough resolution to study micro-structure, detect patterns, and simulate realistic execution</li>
<li>All snapshots within an accessible market are included on every plan — no snapshot limits</li>
</ul>

<h2>Data Depth per Snapshot</h2>
<p>Each snapshot includes price data by default. With <code>include_orderbook=true</code>, you also get:</p>
<ul>
<li>Full bid ladder for Up and Down outcomes — every price level and size</li>
<li>Full ask ladder for Up and Down outcomes — every price level and size</li>
<li>Coin price at snapshot time</li>
<li>Up and Down outcome prices (0-1)</li>
</ul>

<h2>Free Access</h2>
<p>Start with the free Starter plan — no credit card required. Access recent BTC markets immediately. Upgrade to Pro at $11/month for full historical access to all markets.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API</a></li>
  <li><a href="/p/polymarket-historical-data-download">Download Historical Data</a></li>
  </ul>`,
};

export default page;
