import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b67', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Subsecond Data: 300ms Order Book Snapshots',
  slug: 'polymarket-subsecond-data',
  excerpt: 'Access Polymarket subsecond data with 300ms order book snapshots. PolyHistorical captures full bid/ask depth at sub-second intervals for BTC, ETH, and SOL Up/Down markets.',
  metaTitle: 'Polymarket Subsecond Data: 300ms Order Book Snapshots | PolyHistorical',
  metaDescription: 'Get Polymarket subsecond data — 300ms order book snapshots with full bid/ask depth for BTC, ETH, and SOL. Free API access from PolyHistorical.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<h2>What Is Polymarket Subsecond Data?</h2>
  <p>Polymarket subsecond data refers to <strong>order book snapshots captured at intervals below one second</strong> — specifically every 300 milliseconds. PolyHistorical is the only provider that archives Polymarket order books at this granularity, giving you 200x more data points than minute-level providers.</p>

  <h2>Why Subsecond Granularity Matters</h2>
  <table>
  <thead><tr><th>Use Case</th><th>Subsecond (300ms)</th><th>Minute-Level (60s)</th></tr></thead>
  <tbody>
  <tr><td>5-minute market analysis</td><td>~1,000 snapshots per market</td><td>5 snapshots per market</td></tr>
  <tr><td>Scalping strategy backtests</td><td>Realistic fill simulation</td><td>Not viable</td></tr>
  <tr><td>Order book sweep detection</td><td>Captures the event as it happens</td><td>Usually missed entirely</td></tr>
  <tr><td>Spread dynamics</td><td>See spreads open, narrow, and widen</td><td>Only average spread visible</td></tr>
  <tr><td>Market microstructure research</td><td>Publication-quality granularity</td><td>Insufficient for most studies</td></tr>
  <tr><td>Slippage modeling</td><td>Accurate execution simulation</td><td>Rough approximation only</td></tr>
  </tbody>
  </table>

  <h2>What Each Snapshot Contains</h2>
  <p>Every 300ms snapshot from PolyHistorical includes:</p>
  <ul>
  <li><strong>Timestamp</strong> — precise capture time</li>
  <li><strong>Price Up / Price Down</strong> — last trade prices for both outcomes</li>
  <li><strong>Full order book (Up)</strong> — all bid and ask levels with sizes</li>
  <li><strong>Full order book (Down)</strong> — all bid and ask levels with sizes</li>
  <li><strong>Volume</strong> — cumulative market volume</li>
  <li><strong>Liquidity</strong> — total available liquidity</li>
  <li><strong>Coin price</strong> — BTC/ETH/SOL spot price at that moment</li>
  </ul>

  <h2>Coverage</h2>
  <p>Subsecond snapshots are captured for all Polymarket Up/Down markets across:</p>
  <ul>
  <li><strong>Coins:</strong> BTC, ETH, SOL</li>
  <li><strong>Timeframes:</strong> 5-minute, 15-minute, 1-hour, 4-hour, 24-hour</li>
  <li><strong>History:</strong> Unlimited on Pro ($11/mo), recent markets on the free Starter tier</li>
  </ul>

  <h2>Fetch Subsecond Data via API</h2>
  <pre><code>import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
snapshots = resp.json()["data"]
print(f"Snapshots: {len(snapshots)} at ~300ms intervals")
for snap in snapshots[:3]:
    bids = len(snap["orderbook_up"]["bids"])
    asks = len(snap["orderbook_up"]["asks"])
    print(f"  {snap['time']} — Up: {snap['price_up']}, {bids} bids, {asks} asks")</code></pre>

  <h2>Subsecond Data for Backtesting</h2>
  <p>Subsecond data is critical for realistic backtesting of prediction market strategies. With 300ms snapshots, you can:</p>
  <ul>
  <li><strong>Simulate limit order fills</strong> by checking the actual order book state at each decision point</li>
  <li><strong>Model slippage</strong> by walking through order book depth rather than using a flat percentage</li>
  <li><strong>Test timing-sensitive strategies</strong> like scalping, where entry/exit precision matters</li>
  <li><strong>Detect microstructure patterns</strong> like depth clustering, spoofing, and liquidity cycles</li>
  </ul>

  <h2>How It Compares</h2>
  <table>
  <thead><tr><th>Provider</th><th>Polymarket Order Book History</th><th>Granularity</th><th>Price</th></tr></thead>
  <tbody>
  <tr><td>PolyHistorical</td><td>&#10003; Full depth</td><td>300ms (subsecond)</td><td>Free / $11 Pro</td></tr>
  <tr><td>Polymarket CLOB API</td><td>&#10007; Live only</td><td>Real-time (no history)</td><td>Free</td></tr>
  <tr><td>Dune Analytics</td><td>&#10007; On-chain trades only</td><td>Block-level</td><td>Free / paid</td></tr>
  <tr><td>Kaiko / Amberdata</td><td>&#10007; No prediction markets</td><td>10s-1min (CEX only)</td><td>$5,000+/mo</td></tr>
  </tbody>
  </table>

  <h2>Get Started</h2>
  <p>Sign up free at <a href="/signup">polyhistorical.com/signup</a> — no credit card required. Start querying Polymarket subsecond order book data in under 2 minutes.</p>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/sub-second-vs-minute-level-market-data">Sub-Second vs Minute-Level Data: Why Granularity Matters</a></li>
  <li><a href="/p/polymarket-historical-data-api">Polymarket Historical Data API: Full Documentation</a></li>
  <li><a href="/p/scalping-strategies-polymarket">Scalping Strategies for Polymarket Prediction Markets</a></li>
  </ul>`,
};

export default page;
