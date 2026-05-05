# Academic Research with Polymarket Historical Order Book Data

> How researchers and academics can use Polymarket historical data for market microstructure and prediction market studies.

*Category: Use Cases*

## Why Polymarket Data Matters for Research

Prediction markets are a rich source of data for studying **information aggregation, market microstructure, and behavioral finance**. PolyHistorical provides the granular order book data that most academic studies require but rarely have access to.

## Research Areas

| Field | Research Questions | Data Needed |
| --- | --- | --- |
| Market Microstructure | How do spreads form? What drives depth? | Order book snapshots |
| Information Efficiency | How fast do markets incorporate news? | Time-series prices + events |
| Behavioral Finance | Do biases exist in probability pricing? | Historical prices near resolution |
| Forecasting Accuracy | Do market probabilities match outcomes? | Prices + resolution data |
| Liquidity Studies | What determines market maker participation? | Order book depth over time |

## Data Access for Academics

PolyHistorical's **free Starter tier** provides enough data for initial research and paper prototyping. For comprehensive studies requiring full historical depth:

- **Pro plan ($11/mo):** Unlimited history for BTC, ETH, and SOL markets
- **Bulk export:** Download datasets in CSV/JSON for offline analysis in R, Stata, or Python
- **API access:** Programmatic queries for reproducible research pipelines

## Example: Calibration Study

```
# Fetch resolved markets and compare final price to outcome
import requests

resp = requests.get(
    "https://api.polyhistorical.com/v1/markets",
    headers={"X-API-Key": "your_key"},
    params={"resolved": "true", "coin": "BTC", "limit": "100"}
)
for market in resp.json()["data"]:
    final_up = float(market["price_up"])
    winner = market["winner"]  # "Up" or "Down"
    actual = 1.0 if winner == "Up" else 0.0
    print(f"Predicted: {final_up:.2f}, Actual: {actual}")
```

## Citation

When using PolyHistorical data in publications, please cite the data source and API version used. Consistent data provenance strengthens reproducibility.

## Related Resources

- [Polymarket Historical Data Availability](/p/polymarket-historical-data-availability)
- [Time-Series Analysis for Prediction Markets](/p/time-series-analysis-prediction-markets)
- [Polymarket Historical Data Download](/p/polymarket-historical-data-download)

---
Source: https://polyhistorical.com/p/academic-research-polymarket-data
