import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b17', categorySlug: 'crypto-trading', categoryName: 'Crypto Trading',
  title: 'How to Analyze Polymarket Up/Down Markets',
  slug: 'how-to-analyze-polymarket-up-down-markets',
  excerpt: 'A complete guide to analyzing Polymarket BTC, ETH, and SOL Up/Down prediction markets using historical data.',
  metaTitle: 'How to Analyze Polymarket Up/Down Markets | PolyHistorical',
  metaDescription: 'Learn how to analyze Polymarket BTC, ETH, and SOL Up/Down prediction markets. Use historical order book data to understand pricing, trends, and opportunities.',
  ogImage: '/og/crypto-trading.png', createdAt: '', updatedAt: '',
  content: `<h2>What Are Up/Down Markets?</h2>
  <p>Polymarket's Up/Down markets are binary prediction markets that ask: "Will BTC (or ETH/SOL) be above or below a strike price at a specific time?" Each market has two outcomes — <strong>Up</strong> and <strong>Down</strong> — priced between $0 and $1, representing probabilities.</p>

  <h2>Market Structure</h2>
  <table>
  <thead><tr><th>Component</th><th>Description</th><th>Example</th></tr></thead>
  <tbody>
  <tr><td>Strike Price</td><td>The reference price at market creation</td><td>BTC $94,500</td></tr>
  <tr><td>Up Price</td><td>Probability BTC will be above strike</td><td>$0.55 (55%)</td></tr>
  <tr><td>Down Price</td><td>Probability BTC will be below strike</td><td>$0.45 (45%)</td></tr>
  <tr><td>Timeframe</td><td>Duration until resolution</td><td>5m, 15m, 1h, 4h, 24h</td></tr>
  <tr><td>Resolution</td><td>Final BTC price vs strike</td><td>Pays $1 to winner</td></tr>
  </tbody>
  </table>

  <h2>Key Analysis Techniques</h2>
  <h3>1. Price-Probability Mapping</h3>
  <p>The Up price directly represents the market's estimated probability. If Up is priced at $0.62, the market thinks there's a 62% chance BTC will be above the strike at resolution.</p>

  <h3>2. Spread Analysis</h3>
  <p>The bid-ask spread reveals liquidity and consensus. Tight spreads ($0.01-0.02) indicate strong market agreement. Wide spreads ($0.05+) suggest uncertainty or low liquidity — potential opportunity for patient traders.</p>

  <h3>3. Depth Imbalance</h3>
  <p>Compare total bid depth vs ask depth in the order book. A strong imbalance (e.g., 3:1 bids to asks) can signal incoming price movement in that direction.</p>

  <h3>4. Cross-Timeframe Analysis</h3>
  <p>Compare the same coin across different timeframes. If the 5m market is pricing Up at $0.55 but the 1h market is at $0.65, there may be a short-term pessimism that the longer timeframe doesn't share.</p>

  <h2>Getting Historical Data</h2>
  <pre><code>import requests

resp = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    headers={"X-API-Key": "your_key"},
    params={"coin": "BTC", "market_type": "5m"}
)
for m in resp.json()["data"]:
    print(f"{m['slug']} — Up: {m['price_up']}")</code></pre>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/how-to-read-prediction-market-order-books">How to Read Prediction Market Order Books</a></li>
  <li><a href="/p/polymarket-btc-odds-today">Polymarket BTC Odds Today</a></li>
  <li><a href="/p/polymarket-historical-data-guide">Polymarket Historical Data: Complete Guide</a></li>
  </ul>`,
};

export default page;
