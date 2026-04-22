import { useState, useEffect, useRef } from 'react';

// Live-typing terminal that cycles through real API calls with animated output
export function HeroTerminal() {
  type Line = { text: string; color: string; id: number };
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState('');
  const [stats, setStats] = useState({ latency: 12, snapshots: 847, price: 69914 });
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commands = [
      {
        cmd: '$ curl api.polyhistorical.com/v1/markets/btc-updown-5m-1776525900/snapshots',
        output: [
          { text: '200 OK', color: 'text-accent-green' },
          { text: '', color: '' },
          { text: '{', color: 'text-text-muted' },
          { text: '  "market": { "coin": "BTC", "type": "5m" },', color: 'text-text-muted' },
          { text: '  "snapshots": [{', color: 'text-text-muted' },
          { text: '    "time": "2026-04-22T14:30:01.203Z",', color: 'text-text-dim' },
          { text: '    "btc_price": §69914§,', color: 'text-text-muted' },
          { text: '    "price_up": §0.57§, "price_down": §0.43§,', color: 'text-text-muted' },
          { text: '    "orderbook_up": { "bids": [...], "asks": [...] }', color: 'text-text-muted' },
          { text: '  }],', color: 'text-text-muted' },
          { text: '  "total": §847§', color: 'text-text-muted' },
          { text: '}', color: 'text-text-muted' },
        ],
        stats: { latency: 12, snapshots: 847, price: 69914 },
      },
      {
        cmd: '$ curl api.polyhistorical.com/v1/markets?coin=eth&tf=15m&status=resolved',
        output: [
          { text: '200 OK', color: 'text-accent-green' },
          { text: '', color: '' },
          { text: '{', color: 'text-text-muted' },
          { text: '  "markets": [', color: 'text-text-muted' },
          { text: '    { "slug": "eth-updown-15m-1776489600", "result": "UP" },', color: 'text-text-muted' },
          { text: '    { "slug": "eth-updown-15m-1776488700", "result": "DOWN" },', color: 'text-text-muted' },
          { text: '    { "slug": "eth-updown-15m-1776487800", "result": "UP" },', color: 'text-text-muted' },
          { text: '    ...', color: 'text-text-dim' },
          { text: '  ],', color: 'text-text-muted' },
          { text: '  "total": §2847§', color: 'text-text-muted' },
          { text: '}', color: 'text-text-muted' },
        ],
        stats: { latency: 8, snapshots: 2847, price: 3241 },
      },
      {
        cmd: '$ curl api.polyhistorical.com/v1/markets/sol-updown-1h-1776412800/snapshots?depth=true',
        output: [
          { text: '200 OK', color: 'text-accent-green' },
          { text: '', color: '' },
          { text: '{', color: 'text-text-muted' },
          { text: '  "market": { "coin": "SOL", "type": "1h" },', color: 'text-text-muted' },
          { text: '  "snapshots": [{', color: 'text-text-muted' },
          { text: '    "sol_price": §148.62§,', color: 'text-text-muted' },
          { text: '    "price_up": §0.61§, "price_down": §0.39§,', color: 'text-text-muted' },
          { text: '    "depth_up": { "bids": [14 levels], "asks": [12 levels] }', color: 'text-text-muted' },
          { text: '  }],', color: 'text-text-muted' },
          { text: '  "total": §3601§', color: 'text-text-muted' },
          { text: '}', color: 'text-text-muted' },
        ],
        stats: { latency: 15, snapshots: 3601, price: 148 },
      },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const typeCommand = (cmd: string, onDone: () => void) => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        // Type 2-3 chars at a time for speed
        const chunk = Math.min(cmd.length - i, 2 + Math.floor(Math.random() * 2));
        i += chunk;
        setTyping(cmd.slice(0, i));
        if (i < cmd.length) {
          timeouts.push(setTimeout(tick, 18 + Math.random() * 12));
        } else {
          timeouts.push(setTimeout(onDone, 300));
        }
      };
      tick();
    };

    const showOutput = (output: typeof commands[0]['output'], onDone: () => void) => {
      output.forEach((line, i) => {
        timeouts.push(setTimeout(() => {
          if (cancelled) return;
          idRef.current++;
          setLines((prev) => [...prev, { text: line.text, color: line.color, id: idRef.current }]);
        }, i * 80));
      });
      timeouts.push(setTimeout(onDone, output.length * 80 + 2500));
    };

    const runCycle = (idx: number) => {
      if (cancelled) return;
      const command = commands[idx % commands.length];

      setLines([]);
      setTyping('');

      typeCommand(command.cmd, () => {
        if (cancelled) return;
        // Add the command as a line and clear typing
        idRef.current++;
        setLines([{ text: command.cmd, color: 'text-primary', id: idRef.current }]);
        setTyping('');
        setStats(command.stats);

        showOutput(command.output, () => {
          if (!cancelled) runCycle(idx + 1);
        });
      });
    };

    runCycle(0);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Render text with §highlighted§ segments
  const renderLine = (text: string, _baseColor: string) => {
    const parts = text.split(/§([^§]+)§/);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="text-accent-green font-semibold">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="bg-[#0a0a12] rounded-xl border border-border/80 overflow-hidden shadow-2xl shadow-primary/5">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111118] border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red/70" />
          <div className="w-3 h-3 rounded-full bg-accent-yellow/70" />
          <div className="w-3 h-3 rounded-full bg-accent-green/70" />
          <span className="text-[11px] text-text-dim ml-2 font-mono">polyhistorical.com</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="text-text-dim">{stats.latency}ms</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        </div>
      </div>

      {/* Terminal body */}
      <div ref={containerRef} className="p-5 min-h-[340px] max-h-[380px] overflow-hidden font-mono text-[13px] leading-[1.75]">
        {/* Rendered output lines */}
        {lines.map((line) => (
          <div key={line.id} className={line.color}>
            {line.text ? renderLine(line.text, line.color) : '\u00A0'}
          </div>
        ))}

        {/* Currently typing line */}
        {typing && (
          <div className="text-primary">
            {typing}
            <span className="inline-block w-2 h-[14px] bg-primary/80 animate-pulse ml-0.5 align-middle" />
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111118] border-t border-border/60 text-[10px] font-mono text-text-dim">
        <span>BTC, ETH, SOL</span>
        <span>300ms resolution</span>
        <span>13,000+ markets</span>
      </div>
    </div>
  );
}
