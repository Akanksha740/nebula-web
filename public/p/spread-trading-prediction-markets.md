# Spread Trading Strategies for Prediction Markets

> How to trade spreads between correlated Polymarket prediction markets using historical order book data.

*Category: Crypto Trading*

## What Is Spread Trading?

Spread trading involves simultaneously buying one contract and selling a related contract to profit from the **price difference (spread) between them**. In Polymarket prediction markets, multiple related markets create natural spread trading opportunities — particularly between different timeframes and correlated assets.

## Types of Prediction Market Spreads

| Spread Type | Example | Edge Source |
| --- | --- | --- |
| Complementary Spread | BTC Up + BTC Down should = ~$1 | Mispricings when sum deviates from $1 |
| Cross-Asset Spread | BTC Up vs ETH Up (same timeframe) | Correlation divergence between BTC and ETH |
| Calendar Spread | BTC 1h Up vs BTC 4h Up | Timeframe-specific probability differences |
| Relative Value | Market A at 0.55 vs Model at 0.60 | Mispricing relative to fair value model |

## Complementary Market Spreads

The most fundamental spread in prediction markets: BTC Up and BTC Down contracts for the same timeframe should sum to approximately $1.00. When they deviate — say BTC Up at $0.52 and BTC Down at $0.51 (sum = $1.03) — you can sell both to lock in the $0.03 spread, or buy both when the sum is below $1.00.

### How to Identify Complementary Mispricings

- Fetch both Up and Down order books simultaneously from PolyHistorical
- Calculate the sum of best bids and best asks for each pair
- Monitor for deviations from $1.00 beyond transaction costs
- Backtest the frequency and magnitude of these deviations using historical data

## Cross-Asset Spread Trading

BTC and ETH prices are highly correlated. When BTC Up is priced significantly differently from ETH Up for the same timeframe, it may indicate a temporary mispricing. PolyHistorical lets you analyze **historical correlation patterns** between BTC and ETH prediction markets to calibrate your spread strategy.

## Calendar Spread Analysis

Different timeframe markets (5m, 15m, 1h, 4h, 24h) should have logically consistent probabilities. If the 1h BTC Up is priced at 0.55 but the 4h BTC Up covering the same period is at 0.45, there may be a spread opportunity. Use PolyHistorical data to study how these relationships behave historically.

## Risk Management for Spread Trading

- **Execution risk:** You must fill both legs of the spread — partial fills create directional exposure
- **Liquidity risk:** Check order book depth on both sides before entering
- **Correlation breakdown:** Spreads based on historical correlations can fail during unusual events
- **Transaction costs:** Gas fees and Polymarket fees eat into spread profits

## Backtesting Spread Strategies

Spread strategies require **multi-market order book data** for accurate backtesting. PolyHistorical Pro at $11/month provides synchronized order book history for all markets, letting you reconstruct historical spread opportunities and test execution assumptions. Start prototyping with the free BTC data tier.

## Related Resources

- [Understanding Bid-Ask Spread in Prediction Markets](/p/understanding-bid-ask-spread-prediction-markets)
- [Liquidity Analysis for Polymarket Markets](/p/liquidity-analysis-polymarket)
- [Mean Reversion Strategies in Prediction Markets](/p/mean-reversion-prediction-markets)

---
Source: https://polyhistorical.com/p/spread-trading-prediction-markets
