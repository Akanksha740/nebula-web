# PolyHistorical vs Dune Analytics for Prediction Market Research

> Comparing PolyHistorical API data with Dune Analytics for Polymarket research and analysis.

*Category: Comparisons*

## Overview

Dune Analytics is a community-driven on-chain analytics platform where users write SQL queries against blockchain data. PolyHistorical is a purpose-built API for **Polymarket order book history** with sub-second snapshots. They serve different needs in the prediction market research stack.

## Data Comparison

| Feature | PolyHistorical | Dune Analytics |
| --- | --- | --- |
| Order Book Snapshots | ✓ Full depth, sub-second | ✗ Not available |
| On-Chain Trades | ✗ | ✓ Full transaction history |
| Bid/Ask Depth Over Time | ✓ 300ms granularity | ✗ |
| Market Resolution Data | ✓ Via API | ✓ Via SQL queries |
| Query Method | REST API | SQL (community dashboards) |
| Real-Time Data | ✓ Near real-time snapshots | Minutes to hours delay |

## When to Use PolyHistorical

- You need **order book depth history** — bid/ask levels, spread, and liquidity over time
- You're backtesting strategies that depend on order book state, not just trades
- You need sub-second granularity for high-frequency analysis
- You want a clean REST API without writing SQL

## When to Use Dune Analytics

- You need **on-chain transaction data** — who traded, when, and at what price
- You're analyzing wallet-level behavior or market participation patterns
- You want community-built dashboards and visualizations
- You need cross-protocol analysis (Polymarket + other DeFi protocols)

## Using Both Together

The most powerful research combines both: use Dune for on-chain trade flow and wallet analysis, and PolyHistorical for the order book context around those trades. For example, correlate large on-chain trades (from Dune) with order book depth changes (from PolyHistorical) to understand market impact.

## Related Resources

- [PolyHistorical vs The Graph for Polymarket Data](/p/polyhistorical-vs-the-graph)
- [Polymarket Historical Data: Complete Guide](/p/polymarket-historical-data-guide)
- [Best Prediction Market Data Providers in 2025](/p/best-prediction-market-data-providers-2025)

---
Source: https://polyhistorical.com/p/polyhistorical-vs-dune-analytics
