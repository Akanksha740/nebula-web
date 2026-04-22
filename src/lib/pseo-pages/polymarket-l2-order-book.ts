import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b68', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket L2 Order Book: Full Depth Historical Data',
  slug: 'polymarket-l2-order-book',
  excerpt: 'Access Polymarket L2 order book data — full depth bid/ask snapshots at 300ms intervals. PolyHistorical archives every level of the order book for BTC, ETH, and SOL Up/Down markets.',
  metaTitle: 'Polymarket L2 Order Book Data: Full Depth History | PolyHistorical',
  metaDescription: 'Get Polymarket L2 order book data with full bid/ask depth at 300ms intervals. Historical snapshots for BTC, ETH, and SOL prediction markets. Free API access.',
  ogImage: '/og/polymarket-historical-data.png', createdAt: '', updatedAt: '',
  content: `<h2>What Is L2 Order Book Data?</h2>
  <p>L2 (Level 2) order book data shows <strong>every price level</strong> in the order book — not just the best bid and ask (L1), but the full depth of resting orders at each price point. On Polymarket, this means seeing exactly how many shares are available at $0.50, $0.51, $0.52, and so on for both Up and Down outcome tokens.</p>

  <h2>L1 vs L2 Order Book Data</h2>
  <table>
  <thead><tr><th>Feature</th><th>L1 (Top of Book)</th><th>L2 (Full Depth)</th></tr></thead>
  <tbody>
  <tr><td>Price Levels</td><td>Best bid + best ask only</td><td>All bid and ask levels</td></tr>
  <tr><td>Depth Visibility</td><td>Size at top level only</td><td>Size at every price level</td></tr>
  <tr><td>Spread</td><td>&#10003;</td><td>&#10003; Plus depth behind it</td></tr>
  <tr><td>Slippage Estimation</td><td>Not possible</td><td>&#10003; Walk the book to simulate fills</td></tr>
  <tr><td>Liquidity Analysis</td><td>Surface-level only</td><td>&#10003; Full liquidity profile</td></tr>
  <tr><td>Market Making</td><td>Insufficient</td><td>&#10003; See competitor depth</td></tr>
  </tbody>
  </table>

  <h2>Why L2 Data Matters for Prediction Markets</h2>
  <ul>
  <li><strong>Slippage modeling:</strong> Walk through the order book to calculate actual fill prices for any order size — critical for realistic backtesting</li>
  <li><strong>Liquidity assessment:</strong> See how much capital is available within 1%, 2%, or 5% of the midpoint</li>
  <li><strong>Market maker analysis:</strong> Identify where liquidity providers are placing their depth and how it shifts over time</li>
  <li><strong>Support/resistance detection:</strong> Large resting orders at specific price levels act as barriers to price movement</li>
  <li><strong>Order flow imbalance:</strong> Compare total bid depth vs ask depth to gauge directional sentiment</li>
  </ul>

  <h2>PolyHistorical L2 Data Structure</h2>
  <p>Each snapshot from PolyHistorical includes the complete L2 order book for both the Up and Down outcome tokens:</p>
  <pre><code>{
  "time": "2026-04-27T14:30:00.300Z",
  "price_up": "0.5800",
  "price_down": "0.4200",
  "coin_price": "94521.50",
  "orderbook_up": {
    "bids": [
      { "price": "0.5700", "size": "1250.00" },
      { "price": "0.5600", "size": "800.00" },
      { "price": "0.5500", "size": "2100.00" }
    ],
    "asks": [
      { "price": "0.5800", "size": "950.00" },
      { "price": "0.5900", "size": "1400.00" },
      { "price": "0.6000", "size": "3200.00" }
    ]
  },
  "orderbook_down": {
    "bids": [ ... ],
    "asks": [ ... ]
  }
}</code></pre>

  <h2>Fetch L2 Order Book History</h2>
  <pre><code>import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1430"

resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
for snap in resp.json()["data"][:3]:
    book = snap["orderbook_up"]
    bid_depth = sum(float(l["size"]) for l in book["bids"])
    ask_depth = sum(float(l["size"]) for l in book["asks"])
    imbalance = (bid_depth - ask_depth) / (bid_depth + ask_depth)
    print(f"{snap['time']} — Bid depth: {bid_depth:.0f}, Ask depth: {ask_depth:.0f}, Imbalance: {imbalance:+.2f}")</code></pre>

  <h2>Use Cases for L2 History</h2>
  <table>
  <thead><tr><th>Use Case</th><th>What L2 Data Enables</th></tr></thead>
  <tbody>
  <tr><td>Backtesting</td><td>Simulate realistic fills by walking the book at each decision point</td></tr>
  <tr><td>Market Making</td><td>Analyze historical spread and depth to calibrate quoting strategies</td></tr>
  <tr><td>Scalping</td><td>Detect short-lived depth imbalances that precede price moves</td></tr>
  <tr><td>Academic Research</td><td>Study market microstructure, price impact, and liquidity provision</td></tr>
  <tr><td>Risk Management</td><td>Estimate worst-case slippage for position sizing</td></tr>
  </tbody>
  </table>

  <h2>Coverage & Pricing</h2>
  <ul>
  <li><strong>Coins:</strong> BTC, ETH, SOL Up/Down markets</li>
  <li><strong>Timeframes:</strong> 5m, 15m, 1h, 4h, 24h</li>
  <li><strong>Granularity:</strong> 300ms snapshots with full L2 depth</li>
  <li><strong>Free tier:</strong> Recent markets, no credit card required</li>
  <li><strong>Pro ($11/mo):</strong> Unlimited historical depth for all coins</li>
  </ul>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/what-is-polymarket-order-book-data">What Is Polymarket Order Book Data?</a></li>
  <li><a href="/p/polymarket-subsecond-data">Polymarket Subsecond Data: 300ms Snapshots</a></li>
  <li><a href="/p/how-to-read-prediction-market-order-books">How to Read Prediction Market Order Books</a></li>
  </ul>`,
};

export default page;
