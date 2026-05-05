# Features

> Full order book depth, sub-second snapshots, and a fast REST API for Polymarket BTC, ETH, and SOL Up/Down historical data.

## Strategy Replay (Pro)

Pick a resolved market, define entry and exit rules in dropdowns, and watch the market replay tick-by-tick with your strategy applied.

- No-code condition builder
- Tick-by-tick playback
- Real fills + slippage
- PnL, drawdown, win rate

## Order Book Depth

Every bid and ask at every price level for UP and DOWN tokens. Compute slippage, model fills, and measure real liquidity.

- Full bid/ask ladder
- Both UP & DOWN books
- Size at each level
- Synced with BTC/ETH/SOL price

## Sub-second Resolution

Snapshots faster than once per second. Each one timestamped and paired with BTC/ETH reference prices from Binance and Chainlink.

- <1s capture interval (300ms)
- ISO 8601 timestamps
- Binance + Chainlink feeds
- BTC, ETH & SOL markets

## Fast API

Responses under 50ms. Built for backtesting loops that iterate over thousands of snapshots without waiting.

- <50ms latency
- Efficient pagination
- Optional depth param
- Compressed responses

## REST + JSON

Standard REST endpoints. Filter by coin, timeframe, resolved status. Include or exclude orderbook depth per request.

- GET-only interface
- Query string filters
- Consistent envelope
- Detailed error codes

## Complete Archive

Markets stay available forever after resolution. Winners, final volumes, and settlement metadata preserved.

- 31+ days retained
- Winner + settlement
- Final volume data
- Full snapshot history

## Market Metadata

Every market includes slug, IDs, start/end times, condition/CLOB tokens, and resolution status out of the box.

- Polymarket IDs
- CLOB token pairs
- Start / end times
- Resolution metadata

## Use cases

- **Strategy Backtesting** — Simulate order placement against real historical depth. Know exactly what would have filled, at what price, and when.
- **Liquidity Research** — Measure how spreads, depth, and book imbalance evolve from market open through resolution across timeframes.
- **Bot Development** — Train and validate market-making or signal-based bots on deterministic historical data before deploying capital.
