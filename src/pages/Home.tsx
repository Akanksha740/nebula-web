import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import {
  Zap,
  Database,
  Clock,
  ArrowRight,
  Check,
  ChevronDown,
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
    answer: 'We record full order book state at sub-second intervals for every active market, including bid/ask depth, UP/DOWN token prices, and BTC/ETH/SOL reference prices from Binance and Chainlink.',
  },
  {
    question: 'What markets are supported?',
    answer: 'We support BTC, ETH, and SOL Up/Down prediction markets across 5m, 15m, 1h, 4h, and 24h timeframes. Each market includes complete order book history from open to resolution.',
  },
  {
    question: 'Can I try before paying?',
    answer: 'Yes, the free tier gives you access to recent markets with full order book depth and sub-second resolution, no credit card required.',
  },
];

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCoin, setActiveCoin] = useState<'BTC' | 'ETH' | 'SOL'>('BTC');
  const [btcPrice, setBtcPrice] = useState<string>('--');
  const [ethPrice, setEthPrice] = useState<string>('--');
  const [solPrice, setSolPrice] = useState<string>('--');
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [btcRes, ethRes, solRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'),
        ]);
        const [btcData, ethData, solData] = await Promise.all([btcRes.json(), ethRes.json(), solRes.json()]);
        setBtcPrice(parseFloat(btcData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }));
        setEthPrice(parseFloat(ethData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }));
        setSolPrice(parseFloat(solData.price).toLocaleString('en-US', { maximumFractionDigits: 2 }));
      } catch {
        setBtcPrice('--');
        setEthPrice('--');
        setSolPrice('--');
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate a sparkline that drifts naturally
  useEffect(() => {
    const base = activeCoin === 'BTC' ? 0.57 : activeCoin === 'ETH' ? 0.62 : 0.54;
    const seed = Array.from({ length: 40 }, (_, i) => {
      const noise = Math.sin(i * 0.4) * 0.03 + Math.cos(i * 0.7) * 0.02 + (Math.random() - 0.5) * 0.015;
      return base + noise;
    });
    setPriceHistory(seed);
  }, [activeCoin]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setPriceHistory((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const next = last + (Math.random() - 0.48) * 0.008;
        return [...prev.slice(1), Math.max(0.35, Math.min(0.75, next))];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const coinData = {
    BTC: { name: 'Bitcoin', slug: 'btc-updown-5m', price: btcPrice, up: 0.57, down: 0.43, snapshots: '246,152', color: '#F7931A', timeframe: '5m' },
    ETH: { name: 'Ethereum', slug: 'eth-updown-5m', price: ethPrice, up: 0.62, down: 0.38, snapshots: '183,947', color: '#627EEA', timeframe: '5m' },
    SOL: { name: 'Solana', slug: 'sol-updown-5m', price: solPrice, up: 0.54, down: 0.46, snapshots: '48,312', color: '#9945FF', timeframe: '5m' },
  };
  const active = coinData[activeCoin];

  // Build sparkline SVG path
  const sparkW = 600, sparkH = 120;
  const sparkPath = (() => {
    if (priceHistory.length < 2) return '';
    const min = Math.min(...priceHistory) - 0.005;
    const max = Math.max(...priceHistory) + 0.005;
    const range = max - min || 1;
    const points = priceHistory.map((v, i) => {
      const x = (i / (priceHistory.length - 1)) * sparkW;
      const y = sparkH - ((v - min) / range) * sparkH;
      return `${x},${y}`;
    });
    return `M${points.join(' L')}`;
  })();
  const sparkAreaPath = sparkPath ? `${sparkPath} L${sparkW},${sparkH} L0,${sparkH} Z` : '';

  // Simulated order book rows
  const orderBookBids = [
    { price: (active.up - 0.01).toFixed(2), size: '1,247', total: '1,247', pct: 95 },
    { price: (active.up - 0.02).toFixed(2), size: '892', total: '2,139', pct: 72 },
    { price: (active.up - 0.03).toFixed(2), size: '634', total: '2,773', pct: 51 },
    { price: (active.up - 0.04).toFixed(2), size: '421', total: '3,194', pct: 34 },
  ];
  const orderBookAsks = [
    { price: (active.up + 0.01).toFixed(2), size: '1,089', total: '1,089', pct: 88 },
    { price: (active.up + 0.02).toFixed(2), size: '756', total: '1,845', pct: 61 },
    { price: (active.up + 0.03).toFixed(2), size: '523', total: '2,368', pct: 42 },
    { price: (active.up + 0.04).toFixed(2), size: '318', total: '2,686', pct: 26 },
  ];

  return (
    <div className="pt-16">
      <SEO
        title="PolyHistorical - Polymarket Historical Data API"
        description="Backtest Polymarket BTC, ETH, and SOL Up/Down markets with real order book data. Full historical order book depth at sub-second resolution."
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
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
                Replay any BTC, ETH, or SOL Up/Down market tick by tick. Full bid/ask depth,
                sub-second resolution, every timeframe, ready for your backtests.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary text-base py-3 px-6">
                  Get API Access
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
      <section className="py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What you get</h2>
            <p className="text-text-muted text-lg">
              Every data point a quant needs to model Polymarket dynamics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Database, title: 'Full order book depth', desc: 'Bid/ask at every price level for both UP and DOWN tokens. Compute slippage, spreads, and fill probability.' },
              { icon: Clock, title: 'Sub-second timestamps', desc: 'Snapshots recorded faster than once per second. Includes synced BTC/ETH/SOL prices from Binance and Chainlink.' },
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
      <section className="py-16 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
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
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(16,185,129,0.04),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live from the API</h2>
            <p className="text-text-muted text-lg">Real-time market data. Click a coin to explore.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-border bg-surface-card/80 backdrop-blur-sm overflow-hidden">

              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-surface-dark border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-green" />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-green absolute inset-0 animate-ping opacity-40" />
                  </div>
                  <span className="text-xs font-semibold text-accent-green uppercase tracking-wider">Live</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-text-dim uppercase tracking-widest">Binance Feed</span>
                  <span className="text-xs text-text-dim font-mono bg-surface-card px-2.5 py-1 rounded">300ms snapshots</span>
                </div>
              </div>

              {/* Coin selector tabs */}
              <div className="flex border-b border-border">
                {(['BTC', 'ETH', 'SOL'] as const).map((coin) => {
                  const d = coinData[coin];
                  const isActive = activeCoin === coin;
                  return (
                    <button
                      key={coin}
                      onClick={() => setActiveCoin(coin)}
                      className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2.5 text-sm font-medium transition-all relative ${
                        isActive ? 'text-white bg-surface-card-hover/40' : 'text-text-dim hover:text-text-muted hover:bg-surface-card-hover/20'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${d.color}${isActive ? '30' : '15'}`, color: d.color }}>
                        {coin.charAt(0)}
                      </div>
                      <span>{coin}</span>
                      <span className="text-xs text-text-dim">${coin === 'BTC' ? btcPrice : coin === 'ETH' ? ethPrice : solPrice}</span>
                      {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: d.color }} />}
                    </button>
                  );
                })}
              </div>

              {/* Main content area */}
              <div className="p-5 md:p-6">

                {/* Stats row */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">Price UP</div>
                    <div className="text-lg font-bold font-mono text-accent-green">{active.up.toFixed(2)}</div>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">High</div>
                    <div className="text-lg font-bold font-mono text-accent-green">{(active.up + 0.05).toFixed(2)}</div>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">Low</div>
                    <div className="text-lg font-bold font-mono text-accent-red">{(active.up - 0.06).toFixed(2)}</div>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">{activeCoin}</div>
                    <div className="text-lg font-bold font-mono">${active.price}</div>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">Timeframe</div>
                    <div className="text-lg font-bold font-mono">{active.timeframe}</div>
                  </div>
                  <div className="bg-surface-dark rounded-lg p-3 text-center">
                    <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">Snapshots</div>
                    <div className="text-lg font-bold font-mono">{active.snapshots}</div>
                  </div>
                </div>

                {/* Chart + Order Book side by side */}
                <div className="grid md:grid-cols-5 gap-4">

                  {/* Sparkline chart area — 3 cols */}
                  <div className="md:col-span-3 bg-surface-dark rounded-xl p-4 border border-border-subtle">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-text-muted font-medium">Price UP - {active.timeframe} market</span>
                      <span className="text-[10px] text-text-dim font-mono">last 40 ticks</span>
                    </div>
                    <svg viewBox={`0 0 ${sparkW} ${sparkH}`} className="w-full h-32 md:h-40" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0.25, 0.5, 0.75].map((pct) => (
                        <line key={pct} x1="0" y1={sparkH * pct} x2={sparkW} y2={sparkH * pct} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      ))}
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={active.color} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={active.color} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {sparkAreaPath && <path d={sparkAreaPath} fill="url(#sparkGrad)" />}
                      {/* Line */}
                      {sparkPath && (
                        <path d={sparkPath} fill="none" stroke={active.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {/* Current price dot */}
                      {priceHistory.length > 0 && (() => {
                        const min = Math.min(...priceHistory) - 0.005;
                        const max = Math.max(...priceHistory) + 0.005;
                        const range = max - min || 1;
                        const lastY = sparkH - ((priceHistory[priceHistory.length - 1] - min) / range) * sparkH;
                        return (
                          <>
                            <circle cx={sparkW} cy={lastY} r="4" fill={active.color} />
                            <circle cx={sparkW} cy={lastY} r="8" fill={active.color} opacity="0.2">
                              <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                            </circle>
                          </>
                        );
                      })()}
                    </svg>
                    {/* Y-axis labels */}
                    {priceHistory.length > 0 && (
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-text-dim font-mono">{Math.min(...priceHistory).toFixed(3)}</span>
                        <span className="text-[10px] font-mono" style={{ color: active.color }}>{priceHistory[priceHistory.length - 1].toFixed(3)}</span>
                        <span className="text-[10px] text-text-dim font-mono">{Math.max(...priceHistory).toFixed(3)}</span>
                      </div>
                    )}
                  </div>

                  {/* Order book depth — 2 cols */}
                  <div className="md:col-span-2 bg-surface-dark rounded-xl p-4 border border-border-subtle">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-text-muted font-medium">Order Book Depth</span>
                      <span className="text-[10px] text-text-dim">UP token</span>
                    </div>

                    {/* Asks (red, top) */}
                    <div className="space-y-0.5 mb-2">
                      {orderBookAsks.slice().reverse().map((row, i) => (
                        <div key={`a${i}`} className="flex items-center text-[11px] font-mono h-6 relative">
                          <div className="absolute right-0 top-0 bottom-0 bg-accent-red/10 rounded-r" style={{ width: `${row.pct}%` }} />
                          <span className="w-12 text-accent-red relative z-10">{row.price}</span>
                          <span className="flex-1 text-right text-text-dim relative z-10">{row.size}</span>
                          <span className="w-16 text-right text-text-dim relative z-10">{row.total}</span>
                        </div>
                      ))}
                    </div>

                    {/* Spread */}
                    <div className="flex items-center justify-center py-1.5 my-1 border-y border-border-subtle">
                      <span className="text-[10px] text-text-dim">Spread</span>
                      <span className="text-[11px] font-mono text-accent-yellow ml-2">0.02</span>
                    </div>

                    {/* Bids (green, bottom) */}
                    <div className="space-y-0.5 mt-2">
                      {orderBookBids.map((row, i) => (
                        <div key={`b${i}`} className="flex items-center text-[11px] font-mono h-6 relative">
                          <div className="absolute left-0 top-0 bottom-0 bg-accent-green/10 rounded-l" style={{ width: `${row.pct}%` }} />
                          <span className="w-12 text-accent-green relative z-10">{row.price}</span>
                          <span className="flex-1 text-right text-text-dim relative z-10">{row.size}</span>
                          <span className="w-16 text-right text-text-dim relative z-10">{row.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-surface-dark/50 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-text-dim">Auto-refresh 5s</span>
                  <span className="text-[10px] text-text-dim font-mono">tick #{tick}</span>
                </div>
                <Link to="/signup" className="text-xs text-primary font-medium hover:text-primary-light transition-colors flex items-center gap-1">
                  Get API access <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing -compact */}
      <section className="py-16 bg-surface-dark" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, honest pricing</h2>
            <p className="text-text-muted text-lg">Start free. Pay only when you need more.</p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-16" id="faq">
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
      <section className="py-16 border-t border-border">
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
