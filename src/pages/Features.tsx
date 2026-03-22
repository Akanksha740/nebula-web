import { Link } from 'react-router-dom';
import {
  Database,
  Clock,
  Zap,
  Server,
  BookOpen,
  BarChart3,
  ArrowRight,
  Check,
} from 'lucide-react';

const capabilities = [
  {
    icon: Database,
    title: 'Order Book Depth',
    desc: 'Every bid and ask at every price level for UP and DOWN tokens. Compute slippage, model fills, and measure real liquidity.',
    bullets: ['Full bid/ask ladder', 'Both UP & DOWN books', 'Size at each level', 'Synced with BTC/ETH price'],
  },
  {
    icon: Clock,
    title: 'Sub-second Resolution',
    desc: 'Snapshots faster than once per second. Each one timestamped and paired with BTC/ETH reference prices from Binance and Chainlink.',
    bullets: ['<1s capture interval', 'ISO 8601 timestamps', 'Binance price feed', 'Chainlink settlement data'],
  },
  {
    icon: Zap,
    title: 'Fast API',
    desc: 'Responses under 50ms. Built for backtesting loops that iterate over thousands of snapshots without waiting.',
    bullets: ['<50ms latency', 'Efficient pagination', 'Optional depth param', 'Compressed responses'],
  },
  {
    icon: Server,
    title: 'REST + JSON',
    desc: 'Standard REST endpoints. Filter by coin, timeframe, resolved status. Include or exclude orderbook depth per request.',
    bullets: ['GET-only interface', 'Query string filters', 'Consistent envelope', 'Detailed error codes'],
  },
  {
    icon: BookOpen,
    title: 'Complete Archive',
    desc: 'Markets stay available forever after resolution. Winners, final volumes, and settlement metadata preserved.',
    bullets: ['31+ days retained', 'Winner + settlement', 'Final volume data', 'Full snapshot history'],
  },
  {
    icon: BarChart3,
    title: 'Market Metadata',
    desc: 'Every market includes slug, IDs, start/end times, condition/CLOB tokens, and resolution status out of the box.',
    bullets: ['Polymarket IDs', 'CLOB token pairs', 'Start / end times', 'Resolution metadata'],
  },
];

const timeframes = ['5m', '15m', '1h', '4h', '24h'];

const useCases = [
  {
    title: 'Strategy Backtesting',
    desc: 'Simulate order placement against real historical depth. Know exactly what would have filled, at what price, and when.',
  },
  {
    title: 'Liquidity Research',
    desc: 'Measure how spreads, depth, and book imbalance evolve from market open through resolution across timeframes.',
  },
  {
    title: 'Bot Development',
    desc: 'Train and validate market-making or signal-based bots on deterministic historical data before deploying capital.',
  },
];

export function Features() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero — minimal */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Every data point.{' '}
              <span className="gradient-text">Every tick.</span>
            </h1>
            <p className="text-lg text-text-muted mb-8 max-w-2xl leading-relaxed">
              PolyHistorical captures the full state of Polymarket BTC and ETH Up/Down
              markets at sub-second granularity, order books, prices, and
              metadata from open to settlement.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-sm">Supported:</span>
                <span className="px-2.5 py-1 bg-accent-orange/10 text-accent-orange rounded text-sm font-mono font-bold">BTC</span>
                <span className="px-2.5 py-1 bg-accent-blue/10 text-accent-blue rounded text-sm font-mono font-bold">ETH</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-text-muted text-sm">Timeframes:</span>
                {timeframes.map((tf) => (
                  <span key={tf} className="px-2.5 py-1 bg-primary/10 text-primary rounded text-sm font-medium">{tf}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — alternating layout */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 rounded-xl bg-surface-dark border border-border hover:border-primary/20 transition-colors">
                <cap.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">{cap.desc}</p>
                <ul className="space-y-1.5">
                  {cap.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-text-muted">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases — horizontal */}
      <section className="py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for builders</h2>
            <p className="text-text-muted text-lg">Common ways teams use PolyHistorical data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="border border-border rounded-xl p-6 hover:border-primary/20 transition-colors">
                <h3 className="font-semibold mb-2">{uc.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-text-muted mb-8">
            Create a free account and start pulling market data in minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/signup" className="btn-primary">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
