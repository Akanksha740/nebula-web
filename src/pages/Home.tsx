import { Link } from 'react-router-dom';
import { pricingPlans } from '../lib/pricing';
import { ProCta } from '../components/ProCta';
import {
  Zap,
  Database,
  Clock,
  ArrowRight,
  Check,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Layers,
  Shield,
  Terminal,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const faqs = [
  {
    question: 'Is PolyHistorical affiliated with Polymarket?',
    answer: 'No, PolyHistorical is an independent data provider. We are not affiliated with, endorsed by, or connected to Polymarket or any exchange.',
  },
  {
    question: 'How granular is the snapshot data?',
    answer: 'We record full order book state at sub-second intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC reference prices from Binance and Chainlink.',
  },
  {
    question: 'What markets are supported?',
    answer: 'We focus on BTC Up/Down prediction markets across 5m, 15m, 1h, 4h, and 24h timeframes. Each market includes complete order book history from open to resolution.',
  },
  {
    question: 'Can I try before paying?',
    answer: 'Yes, the free tier gives you access to recent markets with full order book depth and sub-second resolution, no credit card required.',
  },
];

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [btcPrice, setBtcPrice] = useState<string>('--');

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await res.json();
        const price = parseFloat(data.price);
        setBtcPrice(price.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      } catch {
        setBtcPrice('--');
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero -left-aligned, asymmetric */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">Recording live markets now</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                Historical order books for{' '}
                <span className="gradient-text">Polymarket</span>
              </h1>

              <p className="text-lg text-text-muted mb-10 max-w-lg leading-relaxed">
                Replay any BTC Up/Down market tick by tick. Full bid/ask depth,
                sub-second resolution, every timeframe, ready for your backtests.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary text-base py-3 px-6">
                  Get API Access
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/docs" className="btn-secondary text-base py-3 px-6">
                  Read the Docs
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10 text-sm text-text-muted">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> Free tier available
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> No credit card
                </span>
              </div>
            </div>

            {/* Terminal preview */}
            <div className="hidden lg:block">
              <div className="bg-surface-card rounded-xl border border-border overflow-hidden shadow-2xl shadow-primary/5">
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-dark border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-accent-red/70" />
                  <div className="w-3 h-3 rounded-full bg-accent-yellow/70" />
                  <div className="w-3 h-3 rounded-full bg-accent-green/70" />
                  <span className="text-xs text-text-dim ml-2 font-mono">curl - polyhistorical.com</span>
                </div>
                <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto font-mono">
<code className="text-text-muted"><span className="text-text-dim">$ </span><span className="text-primary">curl</span> api.polyhistorical.com/v1/markets/bitcoin-up-or-down-on-march-28-2026/snapshots?coin=btc&limit=1
</code>
<code className="text-text-muted">{`
{
  "market": {
    "slug": "bitcoin-up-or-down-on-march-28-2026",
    "coin": "BTC",
    "marketType": "24h"
  },
  "snapshots": [{
    "time": "2026-03-21T14:30:01.203Z",
    "btc_price": `}<span className="text-accent-yellow">69914</span>{`,
    "price_up": `}<span className="text-accent-green">0.57</span>{`,
    "price_down": `}<span className="text-accent-red">0.43</span>{`,
    "orderbook_up": { "bids": [...], "asks": [...] }
  }],
  "total": `}<span className="text-text-primary">67568</span>{`
}`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: '250K+', label: 'Snapshots per market' },
              { value: '<50ms', label: 'API latency' },
              { value: '5', label: 'Timeframes' },
              { value: '31+', label: 'Days of history' },
            ].map((s) => (
              <div key={s.label} className="py-8 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-text-muted text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside -horizontal cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What you get</h2>
            <p className="text-text-muted text-lg">
              Every data point a quant needs to model Polymarket dynamics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Database, title: 'Full order book depth', desc: 'Bid/ask at every price level for both UP and DOWN tokens. Compute slippage, spreads, and fill probability.' },
              { icon: Clock, title: 'Sub-second timestamps', desc: 'Snapshots recorded faster than once per second. Includes synced BTC prices from Binance and Chainlink.' },
              { icon: Layers, title: 'Every timeframe', desc: '5m, 15m, 1h, 4h, and 24h markets, all captured from the moment they open to final resolution.' },
              { icon: Shield, title: 'Resolved market archive', desc: 'Closed markets preserved at full resolution. Winners, final volumes, and settlement data included.' },
              { icon: Terminal, title: 'Clean REST API', desc: 'JSON endpoints with pagination, filtering by timeframe/status, and optional orderbook depth in a single call.' },
              { icon: Zap, title: 'Under 50ms responses', desc: 'Optimized infrastructure built for backtesting workloads. Pull thousands of snapshots without throttling.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-5 rounded-xl border border-border hover:border-primary/30 transition-colors bg-surface-dark/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works -numbered steps */}
      <section className="py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Three steps to your first backtest</h2>
            <p className="text-text-muted text-lg">From sign-up to pulling data in under two minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create an account', desc: 'Sign up free. No credit card required. You get an API key immediately.' },
              { step: '02', title: 'Pick a market', desc: 'Browse by timeframe or slug. Filter active vs. resolved markets through the API or the explorer.' },
              { step: '03', title: 'Pull snapshots', desc: 'Fetch order book history at sub-second resolution. Paginate, filter, and include depth, all in one call.' },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="text-6xl font-bold text-primary/30 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live data card */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live from the API</h2>
            <p className="text-text-muted text-lg">Real data from a recent BTC market snapshot.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-text-muted uppercase tracking-wider">Market</h3>
                  <p className="font-mono text-sm">bitcoin-up-or-down-on-march-28-2026</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">Connected</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-surface-base rounded-lg p-4">
                  <div className="text-xs text-text-dim mb-1 uppercase tracking-wider">BTC Price</div>
                  <div className="text-xl font-bold font-mono">${btcPrice}</div>
                </div>
                <div className="bg-surface-base rounded-lg p-4">
                  <div className="text-xs text-text-dim mb-1 uppercase tracking-wider">UP</div>
                  <div className="text-xl font-bold font-mono text-accent-green flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> 0.57
                  </div>
                </div>
                <div className="bg-surface-base rounded-lg p-4">
                  <div className="text-xs text-text-dim mb-1 uppercase tracking-wider">DOWN</div>
                  <div className="text-xl font-bold font-mono text-accent-red flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" /> 0.43
                  </div>
                </div>
                <div className="bg-surface-base rounded-lg p-4">
                  <div className="text-xs text-text-dim mb-1 uppercase tracking-wider">Snapshots</div>
                  <div className="text-xl font-bold font-mono">2,46,152</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing -compact */}
      <section className="py-24 bg-surface-dark" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, honest pricing</h2>
            <p className="text-text-muted text-lg">Start free. Pay only when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 flex flex-col ${plan.highlight ? 'ring-1 ring-primary relative' : ''}`}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-bold text-xl">{plan.name}</h3>
                    {plan.badge && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-bold mb-1">{plan.price}</div>
                  {plan.period && <div className="text-text-muted text-sm">{plan.period}</div>}
                  {plan.desc && <p className="text-text-muted text-sm mt-2">{plan.desc}</p>}
                </div>

                {/* Market Access */}
                {plan.marketAccess && plan.marketAccess.length > 0 && (
                  <div className="border border-border rounded-lg p-4 mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                      Market History Access
                    </div>
                    <div className="space-y-2.5">
                      {plan.marketAccess.map((m) => (
                        <div key={m.label} className="flex items-center justify-between text-sm">
                          <span>{m.label}</span>
                          <span className="px-2 py-0.5 bg-surface-base text-text-primary text-xs font-medium rounded border border-border">
                            {m.limit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Pro' ? (
                  <ProCta />
                ) : (
                  <Link
                    to={plan.ctaLink}
                    className={`w-full py-2.5 rounded-lg font-semibold text-sm text-center ${
                      plan.highlight ? 'btn-primary justify-center' : 'btn-secondary justify-center'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-24" id="faq">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surface-card/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-text-muted text-sm leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start replaying markets today
          </h2>
          <p className="text-text-muted mb-8 text-lg max-w-xl mx-auto">
            Create a free account, grab your API key, and pull your first snapshot in under a minute.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/signup" className="btn-primary text-base py-3 px-6">
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://docs.polyhistorical.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base py-3 px-6">
              Explore the API
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
