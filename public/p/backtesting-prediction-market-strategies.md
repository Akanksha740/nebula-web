# Backtesting Prediction Market Strategies with Historical Order Books

> Learn how to backtest trading strategies on Polymarket using historical order book data from PolyHistorical.

*Category: Use Cases*

## Why Backtest with Order Book Data?

Most backtesting uses trade or price data alone, but prediction market strategies depend on **order book state** — depth, spread, and liquidity. PolyHistorical provides sub-second order book snapshots that let you simulate realistic execution conditions.

## Backtesting Workflow

| Step | Action | Tool |
| --- | --- | --- |
| 1. Data Collection | Fetch historical snapshots via API | PolyHistorical API |
| 2. Strategy Definition | Define entry/exit rules based on order book signals | Python / your language |
| 3. Simulation | Replay snapshots and simulate trades with realistic slippage | Custom backtester |
| 4. Evaluation | Calculate Sharpe ratio, drawdown, win rate | pandas / numpy |
| 5. Optimization | Walk-forward optimization to avoid overfitting | PolyHistorical + scipy |

## Example: Spread-Based Entry

```
import requests

API_KEY = "your_api_key"
slug = "btc-5m-up-down-2026-04-27-1200"
resp = requests.get(
    f"https://api.polyhistorical.com/v1/markets/{slug}/snapshots",
    headers={"X-API-Key": API_KEY},
    params={"include_orderbook": "true"}
)
snapshots = resp.json()["data"]
for snap in snapshots:
    spread = float(snap["price_up"]) + float(snap["price_down"]) - 1
    if spread > 0.05:
        print(f"Wide spread at {snap['time']}: {spread:.4f}")
```

## Key Considerations

- **Slippage modeling:** Use order book depth to estimate fill prices, not just midpoint
- **Transaction costs:** Include gas fees and Polymarket trading fees
- **Look-ahead bias:** Only use data available at the time of each simulated decision
- **Market impact:** For larger positions, model how your order would consume depth

## Related Resources

- [Backtesting Framework for Polymarket with Python](/p/backtesting-framework-polymarket-python)
- [Strategy Evaluation Metrics for Prediction Market Backtests](/p/strategy-evaluation-metrics-prediction-markets)
- [Polymarket Historical Data for Backtesting: Step-by-Step Guide](/p/polymarket-historical-data-for-backtesting)

---
Source: https://polyhistorical.com/p/backtesting-prediction-market-strategies
