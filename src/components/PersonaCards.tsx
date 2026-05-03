import { useState, useEffect, useRef } from 'react';

// ── API Pipeline Terminal — shows data flowing from API into a bot's pipeline ──
function ApiPipelineViz() {
  type LogEntry = { text: string; color: string; id: number };
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const cycles = [
      [
        { text: '$ curl api.polyhistorical.com/v1/markets/btc-5m-0418/snapshots', color: 'text-primary', delay: 0 },
        { text: '  200 OK — 847 snapshots (12ms)', color: 'text-accent-green', delay: 600 },
        { text: '  parsing bid/ask depth...', color: 'text-text-dim', delay: 1000 },
        { text: '  8 price levels | 300ms intervals', color: 'text-text-muted', delay: 1400 },
        { text: '  → piped to model_input.json', color: 'text-accent-yellow', delay: 1900 },
        { text: '  snapshot stream ready', color: 'text-primary', delay: 2400 },
      ],
      [
        { text: '$ curl api.polyhistorical.com/v1/markets?coin=eth&tf=15m&status=resolved', color: 'text-primary', delay: 0 },
        { text: '  200 OK — 2,847 markets (8ms)', color: 'text-accent-green', delay: 600 },
        { text: '  filtering by volume > $5k...', color: 'text-text-dim', delay: 1000 },
        { text: '  1,203 markets matched', color: 'text-text-muted', delay: 1400 },
        { text: '  → batch export to /data/eth-15m/', color: 'text-accent-yellow', delay: 1900 },
        { text: '  dataset built — 4.2M snapshots', color: 'text-primary', delay: 2400 },
      ],
      [
        { text: '$ curl api.polyhistorical.com/v1/markets/sol-1h-0412/snapshots?depth=true', color: 'text-primary', delay: 0 },
        { text: '  200 OK — 3,601 snapshots (15ms)', color: 'text-accent-green', delay: 600 },
        { text: '  full depth included (bids + asks)', color: 'text-text-dim', delay: 1000 },
        { text: '  computing spread evolution...', color: 'text-text-muted', delay: 1400 },
        { text: '  → exported to training pipeline', color: 'text-accent-yellow', delay: 1900 },
        { text: '  feed connected', color: 'text-primary', delay: 2400 },
      ],
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runCycle = (cycleIdx: number) => {
      const cycle = cycles[cycleIdx % cycles.length];
      cycle.forEach((entry) => {
        const t = setTimeout(() => {
          idRef.current++;
          setLogs((prev) => [...prev.slice(-5), { text: entry.text, color: entry.color, id: idRef.current }]);
        }, entry.delay);
        timeouts.push(t);
      });

      const nextT = setTimeout(() => {
        runCycle(cycleIdx + 1);
      }, 3600);
      timeouts.push(nextT);
    };

    runCycle(0);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg bg-[#0a0a0f] border border-border-subtle h-[220px] flex flex-col overflow-hidden">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-surface-dark/80 border-b border-border-subtle shrink-0">
        <div className="w-2 h-2 rounded-full bg-accent-red/60" />
        <div className="w-2 h-2 rounded-full bg-accent-yellow/60" />
        <div className="w-2 h-2 rounded-full bg-accent-green/60" />
        <span className="text-[9px] text-text-dim font-mono ml-1">data-pipeline — polyhistorical</span>
        <div className="flex-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
      </div>

      {/* Log output */}
      <div className="flex-1 p-3 overflow-hidden flex flex-col justify-end">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div
              key={log.id}
              className={`text-[10px] font-mono leading-tight ${log.color} transition-opacity duration-300`}
              style={{
                opacity: 1 - (logs.length - 1 - i) * 0.1,
                animation: i === logs.length - 1 ? 'tradeFlash 0.3s ease-out' : undefined,
              }}
            >
              {log.text}
            </div>
          ))}
          <span className="inline-block w-1.5 h-3 bg-primary/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ── Depth Heatmap — liquidity shifting across price levels ──
function DepthHeatmapViz() {
  const ROWS = 8;
  const COLS = 12;
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, (_, r) => {
      const distFromMid = Math.abs(r - 3.5);
      return Array.from({ length: COLS }, () =>
        Math.max(0.05, 0.9 - distFromMid * 0.15 + (Math.random() - 0.5) * 0.3)
      );
    })
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prev) => {
        return prev.map((row, r) => {
          const distFromMid = Math.abs(r - 3.5);
          const newCol = Math.max(
            0.05,
            Math.min(1, 0.9 - distFromMid * 0.12 + (Math.random() - 0.5) * 0.4)
          );
          return [...row.slice(1), newCol];
        });
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const priceLabels = ['0.62', '0.61', '0.60', '0.59', '0.57', '0.56', '0.55', '0.54'];

  return (
    <div className="rounded-lg bg-surface-base/80 border border-border-subtle p-3 font-mono h-[220px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-dim uppercase tracking-wider text-[8px]">Depth Heatmap</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[8px]">
            <span className="w-2 h-2 rounded-sm" style={{ background: 'rgba(16,185,129,0.1)' }} /> low
          </span>
          <span className="flex items-center gap-1 text-[8px]">
            <span className="w-2 h-2 rounded-sm" style={{ background: 'rgba(16,185,129,0.8)' }} /> high
          </span>
        </div>
      </div>

      <div className="flex-1 flex gap-1.5">
        {/* Price axis */}
        <div className="flex flex-col justify-between text-[8px] text-text-dim py-0.5 w-6 shrink-0">
          {priceLabels.map((p, i) => (
            <span key={i} className={i < 4 ? 'text-accent-red/60' : 'text-accent-green/60'}>
              {p}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1 grid gap-px" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isAsk = r < 4;
              const baseColor = isAsk ? '239,68,68' : '16,185,129';
              const isLatest = c === COLS - 1;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`rounded-[2px] transition-all duration-500 ${isLatest ? 'ring-1 ring-white/10' : ''}`}
                  style={{
                    background: `rgba(${baseColor},${val * 0.6})`,
                    boxShadow: val > 0.7 ? `0 0 4px rgba(${baseColor},${val * 0.3})` : 'none',
                  }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Time axis */}
      <div className="flex justify-between mt-2 pl-8">
        <span className="text-[8px] text-text-dim">-3m</span>
        <span className="text-[8px] text-text-dim">-1.5m</span>
        <span className="text-[8px] text-primary flex items-center gap-1">
          now <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        </span>
      </div>
    </div>
  );
}

// ── Market Archive Explorer — browsing resolved markets ──
function ArchiveExplorerViz() {
  const [activeFilter, setActiveFilter] = useState<'BTC' | 'ETH' | 'SOL'>('SOL');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      if (Math.random() > 0.8) {
        setActiveFilter((f) => f === 'BTC' ? 'ETH' : f === 'ETH' ? 'SOL' : 'BTC');
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tfSeconds: Record<string, number> = { '5m': 300, '15m': 900, '1h': 3600 };
  const tfSnaps: Record<string, number> = { '5m': 1000, '15m': 3000, '1h': 12000 };

  const generateMarkets = (coin: string, seed: number) => {
    // Base epoch: ~April 18, 2026 00:00 UTC
    const baseEpoch = 1776489600;
    const tfs = ['5m', '15m', '1h'];
    return tfs.map((tf, i) => {
      const offset = (seed + i) * tfSeconds[tf];
      const epoch = baseEpoch - offset;
      const slug = `${coin.toLowerCase()}-updown-${tf}-${epoch}`;
      // Deterministic pseudo-random from seed + index
      const hash = ((seed * 7 + i * 13 + coin.charCodeAt(0)) % 100);
      const winner = hash > 45 ? 'UP' : 'DOWN';
      const volBase = { '5m': 5, '15m': 15, '1h': 25 }[tf]!;
      const vol = (volBase + (hash % 20)).toFixed(1);
      const snaps = tfSnaps[tf] + (hash * 11);
      return { slug, tf, winner, vol: `$${vol}k`, snaps: snaps.toLocaleString() };
    });
  };

  const counts: Record<string, string> = { BTC: '5,847', ETH: '4,231', SOL: '3,122' };

  const data = {
    count: counts[activeFilter],
    markets: generateMarkets(activeFilter, tick % 8),
  };
  const coinColors: Record<string, string> = { BTC: '#F7931A', ETH: '#627EEA', SOL: '#9945FF' };

  return (
    <div className="rounded-lg bg-surface-base/80 border border-border-subtle p-3 font-mono h-[220px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-dim uppercase tracking-wider text-[8px]">Market Archive</span>
        <span className="text-[9px] text-text-muted">{data.count} resolved</span>
      </div>

      {/* Coin filter tabs */}
      <div className="flex gap-1 mb-2.5">
        {(['BTC', 'ETH', 'SOL'] as const).map((coin) => (
          <button
            key={coin}
            onClick={() => setActiveFilter(coin)}
            className={`flex-1 py-1 rounded text-[9px] font-semibold transition-all ${
              activeFilter === coin
                ? 'text-white'
                : 'text-text-dim hover:text-text-muted'
            }`}
            style={{
              background: activeFilter === coin ? `${coinColors[coin]}20` : 'transparent',
              borderBottom: activeFilter === coin ? `2px solid ${coinColors[coin]}` : '2px solid transparent',
            }}
          >
            {coin}
          </button>
        ))}
      </div>

      {/* Market list header */}
      <div className="flex items-center text-[7px] text-text-dim uppercase tracking-wider mb-1 px-1">
        <span className="w-8">TF</span>
        <span className="flex-1">Slug</span>
        <span className="w-10 text-right">Result</span>
        <span className="w-12 text-right">Vol</span>
        <span className="w-10 text-right">Snaps</span>
      </div>

      {/* Market rows */}
      <div className="flex-1 space-y-0.5 overflow-hidden">
        {data.markets.map((m) => (
          <div
            key={m.slug}
            className="flex items-center text-[9px] h-[24px] px-1 rounded hover:bg-surface-card/30 transition-colors cursor-default"
            style={{ animation: tick > 0 && activeFilter ? 'tradeFlash 0.3s ease-out' : undefined }}
          >
            <span className="w-8 text-text-dim">{m.tf}</span>
            <span className="flex-1 text-text-muted truncate">{m.slug}</span>
            <span className={`w-10 text-right font-semibold ${m.winner === 'UP' ? 'text-accent-green' : 'text-accent-red'}`}>
              {m.winner}
            </span>
            <span className="w-12 text-right text-text-dim">{m.vol}</span>
            <span className="w-10 text-right text-text-dim">{m.snaps}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-border-subtle/50">
        <span className="text-[8px] text-text-dim">13,000+ total markets</span>
        <span className="text-[8px] text-primary">full depth available</span>
      </div>
    </div>
  );
}

// ── Main Component ──
export function PersonaCards() {
  return (
    <section className="py-16" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who builds on PolyHistorical</h2>
          <p className="text-text-muted text-lg">
            We give you the raw material. You build the edge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Bot Developers */}
          <div className="relative rounded-xl border border-border hover:border-primary/30 transition-colors bg-surface-dark/50 overflow-hidden flex flex-col">
            <span className="absolute -top-3 left-5 px-2.5 py-0.5 bg-primary/20 text-primary text-[10px] font-semibold rounded-full uppercase tracking-wider z-10">
              Most popular
            </span>
            <div className="p-4 pt-5 bg-gradient-to-b from-primary/[0.03] to-transparent">
              <ApiPipelineViz />
            </div>
            <div className="p-6 pt-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Bot Developers</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Simulate fills against real depth, calculate slippage across price levels,
                and deploy with confidence. Train on what actually happened, not what a candle summarized.
              </p>
            </div>
          </div>

          {/* Quant Researchers */}
          <div className="relative rounded-xl border border-border hover:border-primary/30 transition-colors bg-surface-dark/50 overflow-hidden flex flex-col">
            <div className="p-4 bg-gradient-to-b from-accent-green/[0.02] to-transparent">
              <DepthHeatmapViz />
            </div>
            <div className="p-6 pt-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Quant Researchers</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Study spread dynamics, liquidity shifts, and settlement patterns at 300ms resolution.
                See the microstructure that drives outcomes, not just the outcomes themselves.
              </p>
            </div>
          </div>

          {/* Strategy Builders */}
          <div className="relative rounded-xl border border-border hover:border-primary/30 transition-colors bg-surface-dark/50 overflow-hidden flex flex-col">
            <div className="p-4 bg-gradient-to-b from-accent-purple/[0.02] to-transparent">
              <ArchiveExplorerViz />
            </div>
            <div className="p-6 pt-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Strategy Builders</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Test your thesis against 13,000+ resolved markets with full order book history.
                Did the book predict the winner? How early? At what depth? Now you know.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
