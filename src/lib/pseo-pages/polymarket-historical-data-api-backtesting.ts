import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b54', categorySlug: 'polymarket-historical-data', categoryName: 'Polymarket Historical Data',
  title: 'Polymarket Historical Data API for Backtesting Trading Strategies',
  slug: 'polymarket-historical-data-api-backtesting',
  excerpt: 'Use the Polymarket historical data API from PolyHistorical to backtest prediction market trading strategies with real order book data — completely free.',
  metaTitle: 'Polymarket Historical Data API for Backtesting — Free Access | PolyHistorical',
  metaDescription: 'Backtest prediction market trading strategies using the free Polymarket historical data API. Real order book data, sub-second resolution, from PolyHistorical.',
  ogImage: null, createdAt: '', updatedAt: '',
  content: `<h1>Polymarket Historical Data API for Backtesting Trading Strategies</h1>
<p>Want to backtest trading strategies on Polymarket? The <strong>Polymarket historical data API</strong> from PolyHistorical gives you the real order book data you need — for free.</p>

<h2>Why Backtest with Real Polymarket Historical Data?</h2>
<p>Backtesting against synthetic or simulated data gives you false confidence. Real historical order book data reveals how your strategy would have actually performed, including:</p>
<ul>
<li><strong>Realistic fill simulation</strong> — see if your orders would have been filled at the depth available</li>
<li><strong>Slippage estimation</strong> — understand how order book depth affects your execution price</li>
<li><strong>Spread dynamics</strong> — factor in real bid-ask spreads, not theoretical midpoints</li>
<li><strong>Liquidity patterns</strong> — identify when markets are thick or thin</li>
</ul>

<h2>API-Powered Backtesting Workflow</h2>
<ol>
<li><strong>List markets</strong> via <code>GET /v1/markets</code> to find BTC 5m markets in your target date range</li>
<li><strong>Fetch snapshots</strong> for each market via <code>GET /v1/markets/{slug}/snapshots?include_orderbook=true</code></li>
<li><strong>Replay the order book</strong> snapshot by snapshot in your backtesting engine</li>
<li><strong>Simulate order execution</strong> against real depth at each timestamp</li>
<li><strong>Calculate performance metrics</strong> — PnL, Sharpe ratio, max drawdown</li>
</ol>

<h2>Python Example</h2>
<pre><code>import requests

API_KEY = "your_free_api_key"
headers = {"X-API-Key": API_KEY}

# Get a resolved BTC 5m market
markets = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    params={"coin": "BTC", "market_type": "5m", "resolved": True, "limit": 1},
    headers=headers
).json()

slug = markets["markets"][0]["slug"]

# Fetch all snapshots with order book
data = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    params={"include_orderbook": True, "limit": 1000},
    headers=headers
).json()

# Replay and backtest
for snap in data["snapshots"]:
    price_up = snap["price_up"]
    price_down = snap["price_down"]
    # Your strategy logic here
</code></pre>

<h2>Free Tier for Backtesting</h2>
<p>The Starter plan includes recent BTC market history — enough to build and validate strategies before committing to Pro. No credit card, no trial expiration. Just sign up and start backtesting with real Polymarket historical data.</p>`,
};

export default page;
