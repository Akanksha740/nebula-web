# Backtesting Framework for Polymarket with Python

> Build a complete backtesting framework for Polymarket prediction markets using Python and PolyHistorical data.

*Category: Backtesting*

## Framework Architecture

A solid backtesting framework for prediction markets needs four components: **data fetching, strategy logic, execution simulation, and performance evaluation**. Here's how to build each with Python and PolyHistorical.

## Step 1: Data Fetcher

```
import requests
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
        return pd.DataFrame(resp.json()["data"])
```

## Step 2: Strategy Interface

```
class Strategy:
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
        return None
```

## Step 3: Execution Simulator

```
def backtest(client, slug, strategy):
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
    return trades
```

## Step 4: Evaluation

| Metric | Formula | Target |
| --- | --- | --- |
| Win Rate | Winning trades / Total trades | > 55% |
| Sharpe Ratio | Mean return / Std deviation | > 1.0 |
| Max Drawdown | Largest peak-to-trough decline | < 20% |
| Profit Factor | Gross profit / Gross loss | > 1.5 |

## Related Resources

- [Strategy Evaluation Metrics](/p/strategy-evaluation-metrics-prediction-markets)
- [Walk-Forward Optimization](/p/walk-forward-optimization-prediction-markets)
- [Data Cleaning for Backtests](/p/data-cleaning-prediction-market-backtests)

---
Source: https://polyhistorical.com/p/backtesting-framework-polymarket-python
