# Understanding Bid-Ask Spread in Prediction Markets

> What the bid-ask spread tells you about Polymarket liquidity, efficiency, and trading opportunities.

*Category: Market Data Guides*

## What Is the Bid-Ask Spread?

The bid-ask spread is the difference between the highest price a buyer will pay (best bid) and the lowest price a seller will accept (best ask). In Polymarket prediction markets, this spread directly represents the **cost of immediate trading** and reflects market liquidity and efficiency.

## Spread Components in Prediction Markets

| Component | Description | Impact on Spread |
| --- | --- | --- |
| Inventory Risk | Market makers' risk of holding positions | Higher risk = wider spread |
| Information Asymmetry | Risk of trading against informed traders | More asymmetry = wider spread |
| Competition | Number of active market makers | More competition = tighter spread |
| Volatility | Expected price movement | Higher volatility = wider spread |
| Time to Resolution | How soon the market settles | Approaching resolution can widen or tighten |

## Typical Spreads on Polymarket

Polymarket prediction market spreads vary significantly by market type and conditions. **Liquid BTC 24h and 1h markets** often have spreads of $0.01-0.03, while shorter timeframe markets (5m, 15m) may have wider spreads of $0.03-0.08 due to higher uncertainty and faster resolution.

### Spread by Market Type

- **24h Up/Down markets:** Typically $0.01-0.03 — most liquid, most market maker activity
- **4h markets:** Usually $0.02-0.04 — good liquidity, moderate uncertainty
- **1h markets:** Often $0.02-0.05 — higher turnover, moderate spreads
- **5m/15m markets:** Can reach $0.05-0.10 — high uncertainty, fast resolution

## What Spread Changes Tell You

Monitoring spread changes over time reveals important market dynamics. Use PolyHistorical's **historical order book snapshots** to track how spreads behave:

- **Narrowing spread:** Increasing consensus on outcome probability, growing liquidity
- **Widening spread:** Rising uncertainty, market makers pulling back, or approaching a volatile event
- **Sudden spike:** May indicate a news event or large informed trade
- **Gradual tightening before resolution:** Outcome becoming clear to market participants

## Trading Implications

Understanding spreads helps you optimize execution. **Limit orders** inside the spread let you avoid paying the full spread cost. PolyHistorical data shows you historical spread patterns so you can time orders for periods of tighter spreads, reducing trading costs.

## Analyzing Historical Spreads with PolyHistorical

PolyHistorical captures the full order book at sub-second intervals, giving you precise spread measurements at every point in time. Calculate rolling average spreads, identify time-of-day patterns, and study how spreads react to external events — all from the API's historical data.

## Related Resources

- [How to Read Prediction Market Order Books](/p/how-to-read-prediction-market-order-books)
- [Spread Trading Strategies for Prediction Markets](/p/spread-trading-prediction-markets)
- [Liquidity Analysis for Polymarket Markets](/p/liquidity-analysis-polymarket)

---
Source: https://polyhistorical.com/p/understanding-bid-ask-spread-prediction-markets
