import { Link } from 'react-router-dom';
import {
  Zap,
  Database,
  Clock,
  BookOpen,
  BarChart3,
  ArrowRight,
  Check,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Server,
} from 'lucide-react';
import { useState } from 'react';

const stats = [
  { label: 'Markets Tracked', value: '5,000+' },
  { label: 'Order Book Snapshots', value: '60M+' },
  { label: 'History', value: '31 Days' },
  { label: 'Response Time', value: '<50ms' },
];

const features = [
  {
    icon: Database,
    title: 'Full Order Book Depth',
    description: 'Access complete bid/ask data for both UP and DOWN tokens at every snapshot.',
  },
  {
    icon: Clock,
    title: 'Sub-second Snapshots',
    description: 'Capture market conditions at sub-second intervals with BTC, ETH & SOL prices.',
  },
  {
    icon: Zap,
    title: 'Latency Optimized',
    description: '<50ms API response times for lightning-fast backtesting and analysis.',
  },
  {
    icon: Server,
    title: 'REST API',
    description: 'Simple and powerful RESTful endpoints for markets, snapshots, and historical data.',
  },
  {
    icon: BookOpen,
    title: 'Complete History',
    description: 'Access markets long after they\'ve closed. Full resolution data preserved.',
  },
  {
    icon: BarChart3,
    title: 'Market Analytics',
    description: 'Built-in tools for analyzing spreads, slippage, and liquidity depth.',
  },
];

const timeframes = ['5m', '15m', '1h', '4h', '24h'];

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'Forever',
    description: 'Get started with limited access',
    features: [
      'BTC 5m & 15m - Last 50 markets',
      'BTC 1h & 4h - Last 24 markets',
      'Unlimited Snapshots',
      'Sub-second resolution',
      'Full order book depth',
    ],
    notIncluded: [
      'ETH Markets',
      'SOL Markets',
      'Unlimited history',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'Unlimited access to everything',
    features: [
      'All BTC timeframes - Unlimited',
      'All ETH timeframes - Unlimited',
      'All SOL timeframes - Unlimited',
      'Binance Spot & Futures data',
      'Unlimited Market History',
      'Priority Support',
    ],
    notIncluded: [],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring scale',
    features: [
      'Custom API Endpoints',
      'Dedicated Infrastructure',
      'Tailored Rate Limits',
      'White-glove Onboarding',
      'SLA Guarantees',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Is Nebula free?',
    answer: 'Nebula offers a generous free tier for getting started, and a Pro plan for power users who need unlimited access and priority support.',
  },
  {
    question: 'How often are snapshots taken?',
    answer: 'We capture order book snapshots at sub-second intervals for active markets. This includes full bid/ask depth, prices, and BTC/ETH/SOL reference prices for each snapshot.',
  },
  {
    question: 'Is this affiliated with Polymarket?',
    answer: 'No, Nebula is an independent project. We are not affiliated with, endorsed by, or connected to Polymarket, Binance, or any other exchange. We simply provide historical data for research and backtesting purposes.',
  },
  {
    question: 'What markets do you cover?',
    answer: 'We currently focus on Up/Down prediction markets from Polymarket, capturing both UP and DOWN token order books with full depth. Covering BTC, ETH, and SOL across 5m, 15m, 1h, 4h & 24h timeframes.',
  },
  {
    question: 'Where do you get your price data from?',
    answer: 'We source our BTC, ETH & SOL price data from Binance and Chainlink. This ensures our data matches Polymarket\'s settlement logic perfectly across all timeframes.',
  },
];

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-400">Built for speed</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Backtest Polymarket{' '}
              <span className="gradient-text">Up/Down Markets</span> with Real Order Book Data
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              The first Polymarket dataset with full historical order book depth at sub-second resolution - 
              backtest fills, spreads, and slippage with price-level context.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/markets" className="btn-primary inline-flex items-center gap-2 justify-center">
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/docs" className="btn-secondary inline-flex items-center gap-2 justify-center">
                View Documentation
              </Link>
            </div>
          </div>

          {/* Live Demo Card */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="gradient-border p-6 glow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">btc-updown-15m-1770138000</span>
                  <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded">15m</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400">Nebula API Connected</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">BTC Price</div>
                  <div className="text-xl font-semibold">$84,235.42</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Price UP</div>
                  <div className="text-xl font-semibold text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    0.57
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Price DOWN</div>
                  <div className="text-xl font-semibold text-red-400 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    0.43
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Snapshots</div>
                  <div className="text-xl font-semibold">1,247</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Market Visibility</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to backtest and create winning trading strategies
            </p>
          </div>

          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 flex-wrap justify-center">
              <span className="text-slate-400">Timeframes:</span>
              {timeframes.map((tf) => (
                <span
                  key={tf}
                  className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium"
                >
                  {tf}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Developer-Friendly API
              </h2>
              <p className="text-slate-400 mb-6">
                Clean, structured endpoints for markets, snapshots, and historical data. 
                Plug in your API key and start pulling data instantly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>RESTful JSON API</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Pagination support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Filter by coin, timeframe, status</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Optional orderbook data</span>
                </li>
              </ul>
              <Link to="/docs" className="btn-primary inline-flex items-center gap-2 mt-8">
                Read the Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-400 ml-2">GET /v1/markets/btc-updown-15m-1770138000</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-slate-300">{`{
  "slug": "btc-updown-15m-1770138000",
  "coin": "BTC",
  "market_type": "15m",
  "start_time": "2026-02-04T01:00:00Z",
  "end_time": "2026-02-04T01:15:00Z",
  "btc_price_start": 76488.08,
  "winner": "Down",
  "resolved": true
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-slate-400">Start for free, upgrade for power.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 ${
                  plan.popular ? 'ring-2 ring-indigo-500 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-slate-400">{plan.period}</span>}
                </div>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="w-4 h-4 mt-0.5 shrink-0 text-center">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-2.5 rounded-lg font-semibold ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900/50" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Everything you need to know about Nebula</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-slate-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start backtesting?
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join traders and researchers using Nebula to build winning strategies 
            with real historical Polymarket data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/markets" className="btn-primary inline-flex items-center gap-2 justify-center">
              Explore Markets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="btn-secondary inline-flex items-center gap-2 justify-center">
              Read Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
