import type { PseoPageFull } from '../api';

const page: PseoPageFull = {
  id: 'b19', categorySlug: 'backtesting', categoryName: 'Backtesting',
  title: 'Backtesting Framework for Polymarket with Python',
  slug: 'backtesting-framework-polymarket-python',
  excerpt: 'Build a complete backtesting framework for Polymarket prediction markets using Python and PolyHistorical data.',
  metaTitle: 'Backtesting Framework for Polymarket with Python',
  metaDescription: 'Build a Python backtesting framework for Polymarket prediction markets. Fetch historical order book data, simulate trades, and evaluate strategies.',
  ogImage: '/og/backtesting.png', createdAt: '', updatedAt: '',
  content: `<h2>Framework Architecture</h2>
  <p>A solid backtesting framework for prediction markets needs four components: <strong>data fetching, strategy logic, execution simulation, and performance evaluation</strong>. Here's how to build each with Python and PolyHistorical.</p>

  <h2>Step 1: Data Fetcher</h2>
  <pre><code>import requests
import pandas as pd

class PolyHistoricalClient:
    def __init__(self, api_key):
        self.base = "https://api.polyhistorical.com/v1"
        self.headers = {"X-API-Key": api_key}

    def get_snapshots(self, slug, include_orderbook=True):
        resp = requests.get(
            f"{self.base}/markets/{slug}/snapshots",
            headers=self.headers,
            params={"include_orderbook": str(include_orderbook).lower()}
        )
        return pd.DataFrame(resp.json()["data"])</code></pre>

  <h2>Step 2: Strategy Interface</h2>
  <pre><code>class Strategy:
    def on_snapshot(self, snapshot):
        """Return 'buy_up', 'buy_down', 'sell', or None"""
        raise NotImplementedError

class SpreadStrategy(Strategy):
    def __init__(self, threshold=0.06):
        self.threshold = threshold

    def on_snapshot(self, snap):
        spread = float(snap["price_up"]) + float(snap["price_down"]) - 1
        if spread > self.threshold:
            return "buy_up" if float(snap["price_up"]) < 0.5 else "buy_down"
        return None</code></pre>

  <h2>Step 3: Execution Simulator</h2>
  <pre><code>def backtest(client, slug, strategy):
    df = client.get_snapshots(slug)
    trades, pnl = [], 0
    position = None

    for _, snap in df.iterrows():
        signal = strategy.on_snapshot(snap)
        if signal and not position:
            position = {"side": signal, "entry": float(snap["price_up"])}
        elif position:
            # Close at resolution
            winner = snap.get("winner")
            if winner:
                payout = 1.0 if position["side"] == f"buy_{winner.lower()}" else 0.0
                pnl += payout - position["entry"]
                trades.append(pnl)
                position = None
    return trades</code></pre>

  <h2>Step 4: Evaluation</h2>
  <table>
  <thead><tr><th>Metric</th><th>Formula</th><th>Target</th></tr></thead>
  <tbody>
  <tr><td>Win Rate</td><td>Winning trades / Total trades</td><td>&gt; 55%</td></tr>
  <tr><td>Sharpe Ratio</td><td>Mean return / Std deviation</td><td>&gt; 1.0</td></tr>
  <tr><td>Max Drawdown</td><td>Largest peak-to-trough decline</td><td>&lt; 20%</td></tr>
  <tr><td>Profit Factor</td><td>Gross profit / Gross loss</td><td>&gt; 1.5</td></tr>
  </tbody>
  </table>

  <h2>Related Resources</h2>
  <ul>
  <li><a href="/p/strategy-evaluation-metrics-prediction-markets">Strategy Evaluation Metrics</a></li>
  <li><a href="/p/walk-forward-optimization-prediction-markets">Walk-Forward Optimization</a></li>
  <li><a href="/p/data-cleaning-prediction-market-backtests">Data Cleaning for Backtests</a></li>
  </ul>`,
};

export default page;
