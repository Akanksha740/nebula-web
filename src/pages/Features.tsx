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

const features = [
  {
    icon: Database,
    title: 'Full Order Book Depth',
    description:
      'Access complete bid/ask data for both UP and DOWN tokens at every snapshot. Calculate slippage, analyze spreads, and measure liquidity with precision.',
    details: [
      'Real-time order book snapshots',
      'Both UP and DOWN token books',
      'Full price level depth',
      'Size at each price level',
    ],
  },
  {
    icon: Clock,
    title: 'Sub-second Snapshots',
    description:
      'Capture market conditions at sub-second intervals. Every snapshot includes BTC reference prices for accurate backtesting.',
    details: [
      'Sub-second time resolution',
      'Precise timestamps',
      'BTC prices included',
      'Chainlink & Binance data',
    ],
  },
  {
    icon: Zap,
    title: 'Latency Optimized',
    description:
      'Our infrastructure is built for speed. Get API responses in under 50ms for lightning-fast backtesting and real-time analysis.',
    details: [
      '<50ms API response time',
      'Global CDN distribution',
      'Optimized query patterns',
      'Efficient data compression',
    ],
  },
  {
    icon: Server,
    title: 'REST API',
    description:
      'Simple and powerful RESTful endpoints. Clean JSON responses, pagination support, and flexible filtering options.',
    details: [
      'RESTful JSON API',
      'Pagination support',
      'Filter by coin, timeframe',
      'Optional orderbook data',
    ],
  },
  {
    icon: BookOpen,
    title: 'Complete History',
    description:
      'Access markets long after they\'ve closed. We preserve full resolution data so your backtests never suffer from missing history.',
    details: [
      '31+ days of history',
      'Resolved market data',
      'Winner information',
      'Final volumes & liquidity',
    ],
  },
  {
    icon: BarChart3,
    title: 'Market Analytics',
    description:
      'Built-in data for analyzing market dynamics. Track volumes, spreads, and price movements across all timeframes.',
    details: [
      'Volume tracking',
      'Spread analysis',
      'Price movement data',
      'Liquidity metrics',
    ],
  },
];

const useCases = [
  {
    title: 'Backtesting Trading Strategies',
    description:
      'Test your Polymarket trading strategies against historical order book data and price movements. Simulate fills with real liquidity data.',
    icon: BarChart3,
  },
  {
    title: 'Analytics Dashboards & Bots',
    description:
      'Build trading bots and analytics dashboards powered by comprehensive market snapshots and order book data.',
    icon: Server,
  },
  {
    title: 'Prediction Market Research',
    description:
      'Conduct in-depth research on prediction market dynamics, price discovery, and market efficiency.',
    icon: BookOpen,
  },
];

const timeframes = [
  { label: '5m', description: '5 minute markets' },
  { label: '15m', description: '15 minute markets' },
  { label: '1h', description: '1 hour markets' },
  { label: '4h', description: '4 hour markets' },
  { label: '24h', description: '24 hour markets' },
];

const coins = [
  { symbol: 'BTC', name: 'Bitcoin', color: 'text-accent-orange' },
];

export function Features() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Market <span className="gradient-text">Visibility</span>
            </h1>
            <p className="text-lg text-text-muted mb-8">
              Everything you need to backtest and create winning trading strategies
              with real historical Polymarket data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                Explore Markets
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Track */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Track</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Coins */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Supported Coins</h3>
              <div className="space-y-3">
                {coins.map((coin) => (
                  <div key={coin.symbol} className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${coin.color}`}>{coin.symbol}</span>
                    <span className="text-text-muted">{coin.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeframes */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Timeframes</h3>
              <div className="flex flex-wrap gap-2">
                {timeframes.map((tf) => (
                  <span
                    key={tf.label}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {tf.label}
                  </span>
                ))}
              </div>
              <p className="text-text-muted text-sm mt-4">
                All major Polymarket Up/Down market durations
              </p>
            </div>

            {/* Data Points */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Data Points</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-green" />
                  <span>Order book depth (bids & asks)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-green" />
                  <span>Price UP / Price DOWN</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-green" />
                  <span>BTC reference prices</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-green" />
                  <span>Market metadata & status</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-muted mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent-green" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">What You Can Build</h2>
          <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
            Powerful applications built on historical Polymarket data
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-text-muted">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-text-muted mb-8">
            Start exploring markets and building your strategies today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary inline-flex items-center gap-2 justify-center">
              Explore Markets
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
