import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Bitcoin,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { PricingCards } from '../components/PricingCards';
import { LiveMarketSection } from '../components/LiveMarketSection';
import { PersonaCards } from '../components/PersonaCards';
import { MarketLifecycle } from '../components/MarketLifecycle';
import { useState } from 'react';

const faqs = [
  {
    question: 'Is PolyHistorical affiliated with Polymarket?',
    answer: 'No, PolyHistorical is an independent data provider. We are not affiliated with, endorsed by, or connected to Polymarket or any exchange.',
  },
  {
    question: 'How granular is the snapshot data?',
    answer: 'We capture full order book state at 300ms intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.',
  },
  {
    question: 'Is the API built for automated access?',
    answer: 'Yes. <50ms responses, pagination, filtering, and rate limits designed for both manual research and automated workloads. Whether you are building a bot or doing research by hand, the API is built for it.',
  },
  {
    question: 'What markets are supported?',
    answer: 'BTC, ETH, and SOL Up/Down prediction markets across 5m, 15m, 1h, 4h, and 24h timeframes. Each market includes complete order book history from open to resolution.',
  },
  {
    question: 'How is this different from candle/OHLC data?',
    answer: 'Candles summarize price movement. We give you the full order book — every bid, every ask, every price level. You can simulate realistic fills with actual slippage, measure spread dynamics, and see depth shifts that candles hide.',
  },
  {
    question: 'Can I try before paying?',
    answer: 'Yes, the free tier gives you access to recent BTC markets with full order book depth and 300ms resolution. No credit card required.',
  },
];

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24">
      <SEO
        title="PolyHistorical - Polymarket Order Book Data API"
        description="300ms order book snapshots for every BTC, ETH, and SOL Polymarket market. Full bid/ask depth, 13,000+ resolved markets. Built for traders, bots, and researchers."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PolyHistorical",
            "url": "https://polyhistorical.com",
            "logo": "https://polyhistorical.com/logo.svg",
            "description": "The data infrastructure layer for Polymarket prediction markets"
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
            "description": "REST API providing 300ms order book snapshots for Polymarket prediction markets",
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">Recording live markets now</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                The order book behind every{' '}
                <span className="gradient-text">Polymarket</span>{' '}
                edge
              </h1>

              <p className="text-lg text-text-muted mb-10 max-w-lg leading-relaxed">
                300ms order book snapshots. Full bid/ask depth. Every BTC, ETH, and SOL
                timed market. One API call away.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary text-base py-3 px-6">
                  Get your API key
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://docs.polyhistorical.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base py-3 px-6">
                  Read the Docs
                </a>
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

      {/* ── Stats strip ── */}
      <section className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: '60M+', label: 'Snapshots and counting' },
              { value: '13,000+', label: 'Resolved markets' },
              { value: '300ms', label: 'Faster than any alternative' },
              { value: '<50ms', label: 'Built for speed' },
            ].map((s) => (
              <div key={s.label} className="py-8 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-text-muted text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who builds on PolyHistorical ── */}
      <PersonaCards />

      {/* ── Market lifecycle animation ── */}
      <MarketLifecycle />

      {/* ── The bot builder's edge — comparison ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The unfair advantage</h2>
            <p className="text-text-muted text-lg">
              Your strategy is only as good as the data behind it.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-surface-dark">
                <div className="p-4 text-sm font-semibold text-text-dim border-r border-border"></div>
                <div className="p-4 text-sm font-semibold text-text-muted text-center border-r border-border">Candle Data</div>
                <div className="p-4 text-sm font-semibold text-primary text-center">PolyHistorical</div>
              </div>
              {[
                { label: 'Resolution', candle: '1 min+', poly: '300ms' },
                { label: 'Depth', candle: 'OHLC only', poly: 'Full bid/ask ladder' },
                { label: 'Fill simulation', candle: 'Guesswork', poly: 'Real order book' },
                { label: 'Slippage modeling', candle: 'Not possible', poly: 'Every price level' },
                { label: 'Cost', candle: 'Free', poly: 'Free tier available' },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-surface-card/30' : ''}`}>
                  <div className="p-4 text-sm font-medium border-r border-border">{row.label}</div>
                  <div className="p-4 text-sm text-text-dim text-center border-r border-border">{row.candle}</div>
                  <div className="p-4 text-sm text-primary text-center font-medium">{row.poly}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Live data card ── */}
      <LiveMarketSection />

      {/* Crypto payments banner */}
      <section className="py-16 relative overflow-hidden" id="crypto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(16,185,129,0.06),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-surface-card via-surface-dark to-surface-card p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
                  <Bitcoin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Now accepting crypto</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pay with crypto.{' '}
                  <span className="gradient-text">No KYC. No friction.</span>
                </h2>

                <p className="text-text-muted text-lg leading-relaxed mb-6 max-w-lg">
                  You trade crypto. You analyze crypto markets. Now you can pay for your data tools in crypto too.
                  Pick a coin, scan the QR or send to the address, done in seconds.
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                  {[
                    'BTC, ETH, USDT & 200+ coins',
                    'No bank account needed',
                    'Instant activation',
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-2 text-sm text-text-muted">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {t}
                    </span>
                  ))}
                </div>

                <Link to="/signup" className="btn-primary text-sm py-3 px-6">
                  Get started with crypto
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="hidden lg:flex flex-col gap-4">
                {[
                  { icon: Bitcoin, title: 'Send from anywhere', desc: 'Pay from Coinbase, Binance, MetaMask, or any wallet. No special setup needed.' },
                  { icon: Globe, title: 'Available worldwide', desc: 'No geo-restrictions, no bank approvals. If you have crypto, you can pay.' },
                  { icon: ShieldCheck, title: 'Privacy-first', desc: 'No credit card on file, no billing address. Just a transaction on-chain.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-surface-dark/80 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">{item.title}</div>
                      <div className="text-text-muted text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing -compact */}
      <section className="py-16 bg-surface-dark" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Build. Ship. Scale.</h2>
            <p className="text-text-muted text-lg">Start free. Upgrade when you need more.</p>
          </div>

          <div className="flex justify-center gap-6 mb-10 text-sm text-text-dim">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> No credit card
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> API key in 2 minutes
            </span>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16" id="faq">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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

      {/* ── Bottom CTA ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your edge starts with better data.
          </h2>
          <p className="text-text-muted mb-8 text-lg max-w-xl mx-auto">
            Start free. No credit card. First API call in under two minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/signup" className="btn-primary text-base py-3 px-6">
              Get your API key
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
