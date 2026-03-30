import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
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
import { PricingCards } from '../components/PricingCards';
import { useState, useEffect } from 'react';

const faqs = [
  {
    question: 'Is PolyHistorical affiliated with Polymarket?',
    answer: 'No, PolyHistorical is an independent data provider. We are not affiliated with, endorsed by, or connected to Polymarket or any exchange.',
  },
  {
    question: 'How granular is the snapshot data?',
    answer: 'We record full order book state at sub-second intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH reference prices from Binance and Chainlink.',
  },
  {
    question: 'What markets are supported?',
    answer: 'We support BTC and ETH Up/Down prediction markets across 5m, 15m, 1h, 4h, and 24h timeframes. Each market includes complete order book history from open to resolution.',
  },
  {
    question: 'Can I try before paying?',
    answer: 'Yes, the free tier gives you access to recent markets with full order book depth and sub-second resolution, no credit card required.',
  },
];

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [btcPrice, setBtcPrice] = useState<string>('--');
  const [ethPrice, setEthPrice] = useState<string>('--');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [btcRes, ethRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
        ]);
        const [btcData, ethData] = await Promise.all([btcRes.json(), ethRes.json()]);
        setBtcPrice(parseFloat(btcData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }));
        setEthPrice(parseFloat(ethData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }));
      } catch {
        setBtcPrice('--');
        setEthPrice('--');
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      <SEO
        title="PolyHistorical - Polymarket Historical Data API"
        description="Backtest Polymarket BTC and ETH Up/Down markets with real order book data. Full historical order book depth at sub-second resolution."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PolyHistorical",
            "url": "https://polyhistorical.com",
            "logo": "https://polyhistorical.com/logo.svg",
            "description": "Polymarket historical order book data provider"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "PolyHistorical",
            "url": "https://polyhistorical.com"
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PolyHistorical API",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "url": "https://polyhistorical.com",
            "description": "REST API for Polymarket historical order book data at sub-second resolution",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "0",
              "highPrice": "11",
              "offerCount": "3"
            }
          }
        ]}
      />
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
                Replay any BTC or ETH Up/Down market tick by tick. Full bid/ask depth,
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
              { icon: Clock, title: 'Sub-second timestamps', desc: 'Snapshots recorded faster than once per second. Includes synced BTC/ETH prices from Binance and Chainlink.' },
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
            <p className="text-text-muted text-lg">Real data from a recent market snapshot.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-6 md:p-8">
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">Live</span>
                </div>
                <span className="text-xs text-text-dim font-mono">march-28-2026</span>
              </div>

              {/* BTC Row */}
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-sm font-bold tracking-wide">BTC</span>
                  <span className="font-mono text-xs text-text-muted">bitcoin-up-or-down</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Price</div>
                    <div className="text-xl font-bold font-mono">${btcPrice}</div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Up</div>
                    <div className="text-xl font-bold font-mono text-accent-green flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> 0.57
                    </div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Down</div>
                    <div className="text-xl font-bold font-mono text-accent-red flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4" /> 0.43
                    </div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Snapshots</div>
                    <div className="text-xl font-bold font-mono">2,46,152</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-6" />

              {/* ETH Row */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-sm font-bold tracking-wide">ETH</span>
                  <span className="font-mono text-xs text-text-muted">ethereum-up-or-down</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Price</div>
                    <div className="text-xl font-bold font-mono">${ethPrice}</div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Up</div>
                    <div className="text-xl font-bold font-mono text-accent-green flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> 0.62
                    </div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Down</div>
                    <div className="text-xl font-bold font-mono text-accent-red flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4" /> 0.38
                    </div>
                  </div>
                  <div className="bg-surface-base rounded-lg p-4">
                    <div className="text-[10px] text-text-dim mb-1.5 uppercase tracking-widest">Snapshots</div>
                    <div className="text-xl font-bold font-mono">1,83,947</div>
                  </div>
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

          <PricingCards />
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
