# Polymarket Historical Data API for Backtesting: Developer Guide

> Developer-focused guide to the Polymarket historical data API for backtesting. Code examples in Python and JavaScript using free PolyHistorical endpoints.

*Category: Polymarket Historical Data*

This developer guide shows you how to integrate the **Polymarket historical data API** into your backtesting pipeline. Code examples in Python and JavaScript, all using the free PolyHistorical tier.

## Authentication

All requests require an API key passed in the `X-API-Key` header. Get yours for free at PolyHistorical — no credit card needed.

```
X-API-Key: YOUR_API_KEY
```

## Python: Fetch & Backtest

```
import requests
import pandas as pd

API = "https://api.polyhistorical.com/v1"
KEY = "your_free_api_key"
headers = {"X-API-Key": KEY}

# List recent resolved BTC 5-minute markets
resp = requests.get(f"{API}/markets", headers=headers, params={
    "coin": "BTC",
    "market_type": "5m",
    "resolved": True,
    "limit": 10
})
markets = resp.json()["markets"]

# Fetch snapshots for the first market
slug = markets[0]["slug"]
snap_resp = requests.get(
    f"{API}/markets/{slug}/snapshots",
    headers=headers,
    params={"include_orderbook": True, "limit": 1000}
)
snapshots = snap_resp.json()["snapshots"]
df = pd.DataFrame(snapshots)
print(f"Loaded {len(df)} snapshots for backtesting")

# Simple midpoint strategy
df["mid"] = (df["price_up"] + df["price_down"]) / 2
```

## JavaScript / Node.js

```
const axios = require('axios');

const API_KEY = 'your_free_api_key';
const headers = { 'X-API-Key': API_KEY };

// List markets
const marketsRes = await axios.get('https://api.polyhistorical.com/v1/markets', {
  headers,
  params: { coin: 'BTC', market_type: '5m', resolved: true, limit: 5 }
});

const slug = marketsRes.data.markets[0].slug;

// Get snapshots with order book
const snapRes = await axios.get(
  \`https://api.polyhistorical.com/v1/markets/\${slug}/snapshots\`,
  { headers, params: { include_orderbook: true, limit: 1000 } }
);
console.log(\`Loaded \${snapRes.data.snapshots.length} snapshots\`);
```

## Rate Limits (Free Tier)

- 1,000 requests/day, 60 requests/min
- Access to recent BTC markets (last 50 for 5m/15m)
- All snapshots within accessible markets included

For higher throughput, the Pro plan at $11/month gives you 50,000 requests/day and access to all historical BTC markets.

## Related Resources

- [API for Backtesting Trading Strategies](/p/polymarket-historical-data-api-backtesting)
- [PolyHistorical API Authentication Guide](/p/polyhistorical-api-authentication-guide)
- [Data Cleaning for Prediction Market Backtests](/p/data-cleaning-prediction-market-backtests)

---
Source: https://polyhistorical.com/p/polymarket-historical-data-api-backtesting-dev
