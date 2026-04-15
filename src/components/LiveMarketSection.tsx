import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';

// ── Types ──
type Coin = 'BTC' | 'ETH' | 'SOL';
type Timeframe = '5m' | '15m' | '1h';

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

interface Trade {
  id: number;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  time: string;
}

// ── Config ──
const COIN_CONFIG = {
  BTC: { name: 'Bitcoin', color: '#F7931A', symbol: 'BTCUSDT', baseUp: 0.57 },
  ETH: { name: 'Ethereum', color: '#627EEA', symbol: 'ETHUSDT', baseUp: 0.62 },
  SOL: { name: 'Solana', color: '#9945FF', symbol: 'SOLUSDT', baseUp: 0.54 },
} as const;

// ── Helpers ──
function generateOrderBook(midPrice: number): { bids: OrderLevel[]; asks: OrderLevel[] } {
  const bids: OrderLevel[] = [];
  const asks: OrderLevel[] = [];
  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < 8; i++) {
    const bidSize = Math.floor(300 + Math.random() * 1800 + (7 - i) * 200);
    bidTotal += bidSize;
    bids.push({
      price: Math.max(0.01, midPrice - (i + 1) * 0.01),
      size: bidSize,
      total: bidTotal,
    });

    const askSize = Math.floor(300 + Math.random() * 1800 + (7 - i) * 200);
    askTotal += askSize;
    asks.push({
      price: Math.min(0.99, midPrice + (i + 1) * 0.01),
      size: askSize,
      total: askTotal,
    });
  }

  return { bids, asks };
}

function lerpLevel(prev: OrderLevel, next: OrderLevel, t: number): OrderLevel {
  return {
    price: next.price,
    size: Math.round(prev.size + (next.size - prev.size) * t),
    total: Math.round(prev.total + (next.total - prev.total) * t),
  };
}

function generateTrade(midPrice: number, id: number): Trade {
  const side = Math.random() > 0.5 ? 'buy' : 'sell';
  const offset = (Math.random() - 0.5) * 0.02;
  return {
    id,
    price: parseFloat((midPrice + offset).toFixed(2)),
    size: Math.floor(50 + Math.random() * 500),
    side,
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

// ── Component ──
export function LiveMarketSection() {
  const [activeCoin, setActiveCoin] = useState<Coin>('BTC');
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('5m');
  const [prices, setPrices] = useState({ BTC: '--', ETH: '--', SOL: '--' });
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [, setTick] = useState(0);
  const [orderBook, setOrderBook] = useState(() => generateOrderBook(0.57));
  const [displayBook, setDisplayBook] = useState(() => generateOrderBook(0.57));
  const [trades, setTrades] = useState<Trade[]>([]);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [chartHover, setChartHover] = useState<{ x: number; y: number; value: number } | null>(null);
  const [volumeBars, setVolumeBars] = useState<{ time: string; bidVol: number; askVol: number; winner: 'up' | 'down' }[]>([]);
  const tradeIdRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const prevBookRef = useRef(orderBook);
  const nextBookRef = useRef(orderBook);
  const animStartRef = useRef(Date.now());
  const chartRef = useRef<SVGSVGElement>(null);

  const config = COIN_CONFIG[activeCoin];

  // Fetch real Binance prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [btcRes, ethRes, solRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'),
        ]);
        const [btcData, ethData, solData] = await Promise.all([btcRes.json(), ethRes.json(), solRes.json()]);
        setPrices({
          BTC: parseFloat(btcData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          ETH: parseFloat(ethData.price).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          SOL: parseFloat(solData.price).toLocaleString('en-US', { maximumFractionDigits: 2 }),
        });
      } catch {
        /* keep previous prices */
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize sparkline
  useEffect(() => {
    const base = config.baseUp;
    const seed = Array.from({ length: 60 }, (_, i) => {
      const noise = Math.sin(i * 0.3) * 0.025 + Math.cos(i * 0.6) * 0.015 + (Math.random() - 0.5) * 0.01;
      return base + noise;
    });
    setPriceHistory(seed);
    // Reset order book for new coin
    const newBook = generateOrderBook(base);
    setOrderBook(newBook);
    setDisplayBook(newBook);
    prevBookRef.current = newBook;
    nextBookRef.current = newBook;
    // Generate initial trades
    const initialTrades: Trade[] = [];
    for (let i = 0; i < 12; i++) {
      tradeIdRef.current++;
      initialTrades.push(generateTrade(base, tradeIdRef.current));
    }
    setTrades(initialTrades);
    // Generate initial volume bars (last 12 periods)
    const now = new Date();
    const bars = Array.from({ length: 12 }, (_, i) => {
      const t = new Date(now.getTime() - (11 - i) * 5 * 60 * 1000);
      const bidVol = 800 + Math.random() * 3200;
      const askVol = 800 + Math.random() * 3200;
      return {
        time: t.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        bidVol: Math.round(bidVol),
        askVol: Math.round(askVol),
        winner: (bidVol > askVol ? 'up' : 'down') as 'up' | 'down',
      };
    });
    setVolumeBars(bars);
  }, [activeCoin]);

  // Animate sparkline + generate new order book targets
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);

      // Update sparkline
      setPriceHistory((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const drift = (config.baseUp - last) * 0.02; // mean revert
        const next = last + drift + (Math.random() - 0.48) * 0.006;
        return [...prev.slice(1), Math.max(0.25, Math.min(0.85, next))];
      });

      // Set new order book target every tick
      setPriceHistory((prev) => {
        const currentMid = prev[prev.length - 1] || config.baseUp;
        prevBookRef.current = { ...nextBookRef.current };
        const newTarget = generateOrderBook(currentMid);
        nextBookRef.current = newTarget;
        animStartRef.current = Date.now();
        return prev;
      });

      // Add new trade
      setPriceHistory((prev) => {
        const currentMid = prev[prev.length - 1] || config.baseUp;
        tradeIdRef.current++;
        const newTrade = generateTrade(currentMid, tradeIdRef.current);
        setTrades((old) => [newTrade, ...old.slice(0, 11)]);
        return prev;
      });

      // Update last volume bar
      setVolumeBars((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        const last = { ...updated[updated.length - 1] };
        last.bidVol += Math.floor(Math.random() * 120);
        last.askVol += Math.floor(Math.random() * 120);
        last.winner = last.bidVol > last.askVol ? 'up' : 'down';
        updated[updated.length - 1] = last;
        return updated;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [activeCoin]);

  // Smooth lerp animation for order book
  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - animStartRef.current;
      const duration = 1200;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic

      const prev = prevBookRef.current;
      const next = nextBookRef.current;

      const interpolated = {
        bids: next.bids.map((_, i) =>
          prev.bids[i] ? lerpLevel(prev.bids[i], next.bids[i], eased) : next.bids[i]
        ),
        asks: next.asks.map((_, i) =>
          prev.asks[i] ? lerpLevel(prev.asks[i], next.asks[i], eased) : next.asks[i]
        ),
      };
      setDisplayBook(interpolated);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Build sparkline
  const sparkW = 700, sparkH = 140;
  const buildPath = useCallback(() => {
    if (priceHistory.length < 2) return { line: '', area: '', min: 0, max: 1 };
    const min = Math.min(...priceHistory) - 0.003;
    const max = Math.max(...priceHistory) + 0.003;
    const range = max - min || 1;
    const points = priceHistory.map((v, i) => {
      const x = (i / (priceHistory.length - 1)) * sparkW;
      const y = sparkH - ((v - min) / range) * sparkH;
      return { x, y };
    });

    // Smooth curve using cubic bezier
    let line = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      line += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
    }

    const last = points[points.length - 1];
    const area = `${line} L${last.x},${sparkH} L${points[0].x},${sparkH} Z`;

    return { line, area, min, max };
  }, [priceHistory]);

  const { line: sparkLine, area: sparkArea, min: sparkMin, max: sparkMax } = buildPath();

  // Chart hover handler
  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current || priceHistory.length < 2) return;
    const rect = chartRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const index = Math.round(xRatio * (priceHistory.length - 1));
    const clamped = Math.max(0, Math.min(priceHistory.length - 1, index));
    const value = priceHistory[clamped];
    const range = (sparkMax - sparkMin) || 1;
    const y = sparkH - ((value - sparkMin) / range) * sparkH;
    setChartHover({ x: (clamped / (priceHistory.length - 1)) * sparkW, y, value });
  };

  const maxBidSize = Math.max(...displayBook.bids.map((l) => l.size), 1);
  const maxAskSize = Math.max(...displayBook.asks.map((l) => l.size), 1);
  const spread = displayBook.asks[0] && displayBook.bids[0]
    ? (displayBook.asks[0].price - displayBook.bids[0].price).toFixed(2)
    : '0.02';
  const currentPrice = priceHistory[priceHistory.length - 1] || config.baseUp;

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(16,185,129,0.04),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live from the API</h2>
          <p className="text-text-muted text-lg">Real-time market data. Click a coin to explore.</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface-card/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">

            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-5 py-3 bg-surface-dark border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-green" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-green absolute inset-0 animate-ping opacity-40" />
                </div>
                <span className="text-xs font-semibold text-accent-green uppercase tracking-wider">Live</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-dim font-mono bg-surface-card px-2.5 py-1 rounded">300ms snapshots</span>
              </div>
            </div>

            {/* ── Coin tabs ── */}
            <div className="flex border-b border-border">
              {(['BTC', 'ETH', 'SOL'] as const).map((coin) => {
                const c = COIN_CONFIG[coin];
                const isActive = activeCoin === coin;
                return (
                  <button
                    key={coin}
                    onClick={() => setActiveCoin(coin)}
                    className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2.5 text-sm font-medium transition-all relative ${
                      isActive ? 'text-white bg-surface-card-hover/40' : 'text-text-dim hover:text-text-muted hover:bg-surface-card-hover/20'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: `${c.color}${isActive ? '30' : '15'}`, color: c.color }}
                    >
                      {coin.charAt(0)}
                    </div>
                    <span>{coin}</span>
                    <span className="text-xs text-text-dim">${prices[coin]}</span>
                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: c.color }} />}
                  </button>
                );
              })}
            </div>

            {/* ── Timeframe tabs ── */}
            <div className="flex items-center gap-1 px-5 py-2.5 border-b border-border bg-surface-dark/30">
              {(['5m', '15m', '1h'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    activeTimeframe === tf
                      ? 'bg-primary/15 text-primary'
                      : 'text-text-dim hover:text-text-muted hover:bg-surface-card-hover/30'
                  }`}
                >
                  {tf}
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-text-dim" />
                <span className="text-[10px] text-text-dim font-mono">
                  {currentPrice.toFixed(4)} UP
                </span>
              </div>
            </div>

            {/* ── Stats row ── */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-border/50 border-b border-border">
              {[
                { label: 'Price UP', value: currentPrice.toFixed(2), color: 'text-accent-green' },
                { label: 'Price DOWN', value: (1 - currentPrice).toFixed(2), color: 'text-accent-red' },
                { label: 'Spread', value: `${spread}¢`, color: 'text-accent-yellow' },
                { label: activeCoin, value: `$${prices[activeCoin]}`, color: 'text-text-primary' },
                { label: 'Timeframe', value: activeTimeframe, color: 'text-text-primary' },
                { label: 'Snapshots', value: '33.8M+', color: 'text-text-primary' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-dark p-3 text-center">
                  <div className="text-[9px] text-text-dim uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-base font-bold font-mono ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* ── Main content ── */}
            <div className="p-3 md:p-4">
              <div className="grid md:grid-cols-2 gap-3">

                {/* ── Charts (left) ── */}
                <div className="flex flex-col gap-3 [&>:last-child]:flex-1">


                  {/* Sparkline */}
                  <div className="bg-surface-dark rounded-xl p-3 border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-muted font-medium">
                        Price UP — {activeCoin} {activeTimeframe}
                      </span>
                      <span className="text-[10px] text-text-dim font-mono">last 60 ticks</span>
                    </div>
                    <svg
                      ref={chartRef}
                      viewBox={`0 0 ${sparkW} ${sparkH}`}
                      className="w-full h-32 cursor-crosshair"
                      preserveAspectRatio="none"
                      onMouseMove={handleChartMouseMove}
                      onMouseLeave={() => setChartHover(null)}
                    >
                      {/* Grid */}
                      {[0.2, 0.4, 0.6, 0.8].map((pct) => (
                        <line key={pct} x1="0" y1={sparkH * pct} x2={sparkW} y2={sparkH * pct} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      ))}

                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="liveSparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={config.color} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={config.color} stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {sparkArea && <path d={sparkArea} fill="url(#liveSparkGrad)" />}
                      {sparkLine && (
                        <path d={sparkLine} fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      )}

                      {/* Hover crosshair */}
                      {chartHover && (
                        <>
                          <line x1={chartHover.x} y1="0" x2={chartHover.x} y2={sparkH} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1={chartHover.y} x2={sparkW} y2={chartHover.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
                          <circle cx={chartHover.x} cy={chartHover.y} r="4" fill={config.color} stroke="#000" strokeWidth="1.5" />
                          <rect x={chartHover.x - 28} y={chartHover.y - 22} width="56" height="16" rx="4" fill="rgba(0,0,0,0.8)" />
                          <text x={chartHover.x} y={chartHover.y - 11} textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace">
                            {chartHover.value.toFixed(4)}
                          </text>
                        </>
                      )}

                      {/* Current dot */}
                      {priceHistory.length > 0 && (() => {
                        const range = (sparkMax - sparkMin) || 1;
                        const lastY = sparkH - ((priceHistory[priceHistory.length - 1] - sparkMin) / range) * sparkH;
                        return (
                          <>
                            <circle cx={sparkW} cy={lastY} r="3.5" fill={config.color} />
                            <circle cx={sparkW} cy={lastY} r="8" fill={config.color} opacity="0.15">
                              <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
                            </circle>
                          </>
                        );
                      })()}
                    </svg>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-text-dim font-mono">{sparkMin.toFixed(4)}</span>
                      <span className="text-[10px] font-mono font-semibold" style={{ color: config.color }}>
                        {currentPrice.toFixed(4)}
                      </span>
                      <span className="text-[10px] text-text-dim font-mono">{sparkMax.toFixed(4)}</span>
                    </div>
                  </div>

                  {/* Bid vs Ask Volume — line chart */}
                  <div className="bg-surface-dark rounded-xl p-3 border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-muted font-medium">Bid vs Ask Volume</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-accent-green">
                          <span className="w-2 h-2 rounded-full bg-accent-green/50" /> Bids
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-accent-red">
                          <span className="w-2 h-2 rounded-full bg-accent-red/50" /> Asks
                        </span>
                      </div>
                    </div>
                    {volumeBars.length > 0 && (() => {
                      const vW = 700, vH = 140;
                      const maxVol = Math.max(...volumeBars.map((b) => Math.max(b.bidVol, b.askVol)), 1);

                      const bidPoints = volumeBars.map((b, i) => ({
                        x: (i / (volumeBars.length - 1)) * vW,
                        y: vH - (b.bidVol / maxVol) * vH * 0.9,
                      }));
                      const askPoints = volumeBars.map((b, i) => ({
                        x: (i / (volumeBars.length - 1)) * vW,
                        y: vH - (b.askVol / maxVol) * vH * 0.9,
                      }));

                      const toSmooth = (pts: { x: number; y: number }[]) => {
                        let d = `M${pts[0].x},${pts[0].y}`;
                        for (let i = 1; i < pts.length; i++) {
                          const cpx = (pts[i - 1].x + pts[i].x) / 2;
                          d += ` C${cpx},${pts[i - 1].y} ${cpx},${pts[i].y} ${pts[i].x},${pts[i].y}`;
                        }
                        return d;
                      };

                      const bidLine = toSmooth(bidPoints);
                      const askLine = toSmooth(askPoints);
                      const bidArea = `${bidLine} L${vW},${vH} L0,${vH} Z`;
                      const askArea = `${askLine} L${vW},${vH} L0,${vH} Z`;

                      return (
                        <>
                          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-32" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="bidVolGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                              </linearGradient>
                              <linearGradient id="askVolGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Grid */}
                            {[0.25, 0.5, 0.75].map((pct) => (
                              <line key={pct} x1="0" y1={vH * pct} x2={vW} y2={vH * pct} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                            ))}
                            {/* Areas */}
                            <path d={bidArea} fill="url(#bidVolGrad)" />
                            <path d={askArea} fill="url(#askVolGrad)" />
                            {/* Lines */}
                            <path d={bidLine} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d={askLine} fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                            {/* Current dots */}
                            <circle cx={bidPoints[bidPoints.length - 1].x} cy={bidPoints[bidPoints.length - 1].y} r="3" fill="#22C55E" />
                            <circle cx={askPoints[askPoints.length - 1].x} cy={askPoints[askPoints.length - 1].y} r="3" fill="#EF4444" />
                          </svg>
                          <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-text-dim font-mono">{volumeBars[0].time}</span>
                            <span className="text-[10px] text-text-dim font-mono">{volumeBars[Math.floor(volumeBars.length / 2)].time}</span>
                            <span className="text-[10px] text-text-dim font-mono">{volumeBars[volumeBars.length - 1].time}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Market Resolution Stats */}
                  <div className="bg-surface-dark rounded-xl p-3 border border-border-subtle flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-text-muted font-medium">Resolved Markets — Last 24h</span>
                      <span className="text-[10px] text-text-dim">5m markets</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { coin: 'BTC', up: 40, down: 60, color: '#F7931A' },
                        { coin: 'ETH', up: 44, down: 56, color: '#627EEA' },
                        { coin: 'SOL', up: 52, down: 48, color: '#9945FF' },
                      ].map((row) => (
                        <div key={row.coin} className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: `${row.color}20`, color: row.color }}>
                            {row.coin.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-text-primary">{row.coin}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-mono">
                                <span className="text-accent-green">{row.up}% UP</span>
                                <span className="text-text-dim">/</span>
                                <span className="text-accent-red">{row.down}% DOWN</span>
                              </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-surface-card overflow-hidden flex gap-px">
                              <div className="rounded-l-full transition-all duration-700" style={{ width: `${row.up}%`, background: `${row.color}25` }} />
                              <div className="rounded-r-full transition-all duration-700" style={{ width: `${row.down}%`, background: 'rgba(239,68,68,0.2)' }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Order Book + Trades (right) ── */}
                <div className="flex flex-col gap-3 [&>:last-child]:flex-1">

                  {/* Order Book */}
                  <div className="bg-surface-dark rounded-xl p-3 border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-muted font-medium">Order Book</span>
                      <span className="text-[10px] text-text-dim">UP token</span>
                    </div>

                    {/* Column headers */}
                    <div className="flex items-center text-[9px] text-text-dim uppercase tracking-wider mb-1.5 px-0.5">
                      <span className="w-12">Price</span>
                      <span className="flex-1 text-right">Size</span>
                      <span className="w-16 text-right">Total</span>
                    </div>

                    {/* Asks (reversed — highest at top) */}
                    <div className="space-y-px mb-1.5">
                      {displayBook.asks.slice(0, 5).reverse().map((level, i) => {
                        const pct = (level.size / maxAskSize) * 100;
                        const isHovered = hoveredLevel === level.price;
                        return (
                          <div
                            key={`a${i}`}
                            className={`flex items-center text-[11px] font-mono h-[22px] relative rounded-sm cursor-default transition-colors ${isHovered ? 'bg-accent-red/5' : ''}`}
                            onMouseEnter={() => setHoveredLevel(level.price)}
                            onMouseLeave={() => setHoveredLevel(null)}
                          >
                            <div
                              className="absolute right-0 top-0 bottom-0 bg-accent-red/8 rounded-r-sm transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                            <span className="w-12 text-accent-red relative z-10 pl-0.5">{level.price.toFixed(2)}</span>
                            <span className="flex-1 text-right text-text-dim relative z-10 tabular-nums">{level.size.toLocaleString()}</span>
                            <span className="w-16 text-right text-text-dim relative z-10 pr-0.5 tabular-nums">{level.total.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Spread */}
                    <div className="flex items-center justify-center py-1 my-1 border-y border-border-subtle">
                      <span className="text-[10px] text-text-dim">Spread</span>
                      <span className="text-[11px] font-mono text-accent-yellow ml-2 font-semibold">{spread}</span>
                    </div>

                    {/* Bids */}
                    <div className="space-y-px mt-1.5">
                      {displayBook.bids.slice(0, 5).map((level, i) => {
                        const pct = (level.size / maxBidSize) * 100;
                        const isHovered = hoveredLevel === level.price;
                        return (
                          <div
                            key={`b${i}`}
                            className={`flex items-center text-[11px] font-mono h-[22px] relative rounded-sm cursor-default transition-colors ${isHovered ? 'bg-accent-green/5' : ''}`}
                            onMouseEnter={() => setHoveredLevel(level.price)}
                            onMouseLeave={() => setHoveredLevel(null)}
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-accent-green/8 rounded-l-sm transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                            <span className="w-12 text-accent-green relative z-10 pl-0.5">{level.price.toFixed(2)}</span>
                            <span className="flex-1 text-right text-text-dim relative z-10 tabular-nums">{level.size.toLocaleString()}</span>
                            <span className="w-16 text-right text-text-dim relative z-10 pr-0.5 tabular-nums">{level.total.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Trades */}
                  <div className="bg-surface-dark rounded-xl p-3 border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-muted font-medium">Recent Trades</span>
                      <span className="text-[10px] text-text-dim">UP token</span>
                    </div>

                    {/* Column headers */}
                    <div className="flex items-center text-[9px] text-text-dim uppercase tracking-wider mb-1.5 px-0.5">
                      <span className="w-12">Price</span>
                      <span className="flex-1 text-right">Size</span>
                      <span className="w-16 text-right">Time</span>
                    </div>

                    <div className="space-y-px">
                      {trades.slice(0, 8).map((trade, i) => (
                        <div
                          key={trade.id}
                          className="flex items-center text-[11px] font-mono h-[22px] rounded-sm"
                          style={{
                            animation: i === 0 ? 'tradeFlash 0.6s ease-out' : undefined,
                          }}
                        >
                          <span className={`w-12 pl-0.5 ${trade.side === 'buy' ? 'text-accent-green' : 'text-accent-red'}`}>
                            {trade.price.toFixed(2)}
                          </span>
                          <span className="flex-1 text-right text-text-dim tabular-nums">{trade.size.toLocaleString()}</span>
                          <span className="w-16 text-right text-text-dim pr-0.5">{trade.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-5 py-3 bg-surface-dark/50 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-text-dim">Auto-refresh 1.5s</span>
                <span className="text-[10px] text-text-dim">13,000+ resolved markets</span>
              </div>
              <Link to="/signup" className="text-xs text-primary font-medium hover:text-primary-light transition-colors flex items-center gap-1">
                Get API access <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
