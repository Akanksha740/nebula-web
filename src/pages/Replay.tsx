import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import {
  Play,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  AlertTriangle,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { api } from '../lib/api';
import type { Market, Snapshot } from '../lib/api';

// ── Types ──

interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface ReplayResult {
  market: any;
  strategy: any;
  performance: {
    total_pnl: number;
    total_pnl_percent: number;
    max_drawdown: number;
    max_drawdown_percent: number;
    total_trades: number;
    winning_trades: number;
    losing_trades: number;
    win_rate: number;
    avg_trade_pnl: number;
    best_trade: number;
    worst_trade: number;
    time_in_position_pct: number;
    final_market_outcome: string;
  };
  trades: Array<{
    type: string;
    reason: string;
    time: string;
    price: number;
    fill_price: number;
    shares: number;
    slippage: number;
    position_pnl: number;
    cumulative_pnl: number;
    coin_price: number;
  }>;
  pnl_curve: Array<{
    time: string;
    pnl: number;
    unrealized_pnl: number;
    price: number;
    coin_price: number;
    in_position: boolean;
  }>;
  total_snapshots: number;
}

const FIELDS = [
  { value: 'price_up', label: 'UP Price' },
  { value: 'price_down', label: 'DOWN Price' },
  { value: 'coin_price', label: 'Coin Price' },
  { value: 'spread', label: 'Spread' },
  { value: 'time_remaining_pct', label: 'Time Remaining %' },
];

const OPERATORS = [
  { value: '<', label: '<' },
  { value: '>', label: '>' },
  { value: '<=', label: '<=' },
  { value: '>=', label: '>=' },
  { value: '==', label: '=' },
  { value: 'crosses_above', label: 'Crosses Above' },
  { value: 'crosses_below', label: 'Crosses Below' },
];

const COINS = ['BTC', 'ETH', 'SOL'];
const RESOLUTIONS = ['All', '5m', '15m', '1hr', '4hr', '24hr'];

// ── Component ──

export function Replay() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load user
  useEffect(() => {
    api.getProfile().then((res) => {
      setUser(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const isPro = user && (user.tier === 'PRO' || user.tier === 'PRO_TRIAL' || user.tier === 'ENTERPRISE');

  if (loading) {
    return (
      <div className="pt-28 pb-16 flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-28 pb-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <Lock className="w-12 h-12 text-text-dim mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in required</h1>
          <p className="text-text-muted mb-6">Log in to access the Strategy Replay sandbox.</p>
          <Link to="/login" className="btn-primary py-3 px-6">Log In <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="pt-28 pb-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <Lock className="w-12 h-12 text-text-dim mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pro Feature</h1>
          <p className="text-text-muted mb-6">
            Strategy Replay is available on Pro and Enterprise plans.
            Replay your strategies against real historical order book data.
          </p>
          <Link to="/pricing" className="btn-primary py-3 px-6">Upgrade to Pro <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <SEO title="Strategy Replay" description="Replay trading strategies against historical Polymarket order book data" path="/replay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReplayContent />
      </div>
    </div>
  );
}

// ── Embeddable replay content (used by Dashboard and public Replay page) ──

export function ReplayContent() {
  // Market picker
  const [coin, setCoin] = useState('BTC');
  const [resolution, setResolution] = useState('All');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [marketsLoading, setMarketsLoading] = useState(false);
  const [marketsOffset, setMarketsOffset] = useState(0);
  const [marketsTotal, setMarketsTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_SIZE = 100;

  // Strategy form
  const [side, setSide] = useState<'UP' | 'DOWN'>('UP');
  const [positionSize, setPositionSize] = useState('100');
  const [maxLoss, setMaxLoss] = useState('30');
  const [entryConditions, setEntryConditions] = useState<Condition[]>([
    { field: 'price_up', operator: '<', value: '0.40' },
  ]);
  const [exitConditions, setExitConditions] = useState<Condition[]>([
    { field: 'price_up', operator: '>=', value: '0.60' },
  ]);

  // Replay
  const [replaying, setReplaying] = useState(false);
  const [result, setResult] = useState<ReplayResult | null>(null);
  const [liveResult, setLiveResult] = useState<ReplayResult | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamSpeed, setStreamSpeed] = useState(20); // ms per tick
  const streamRef = useRef<number | null>(null);
  const streamDataRef = useRef<{ result: ReplayResult; tick: number; advance: () => void } | null>(null);
  const [error, setError] = useState('');

  // Restart interval when speed changes during streaming
  useEffect(() => {
    if (!isStreaming || !streamDataRef.current) return;
    if (streamRef.current) clearInterval(streamRef.current);
    streamRef.current = window.setInterval(streamDataRef.current.advance, streamSpeed);
    return () => { if (streamRef.current) clearInterval(streamRef.current); };
  }, [streamSpeed, isStreaming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (streamRef.current) clearInterval(streamRef.current); };
  }, []);

  // Load markets when coin/resolution changes
  useEffect(() => {
    setMarketsLoading(true);
    setSelectedMarket('');
    setMarketsOffset(0);
    const params: any = { coin: coin.toLowerCase(), limit: PAGE_SIZE, offset: 0 };
    if (resolution !== 'All') params.market_type = resolution;
    api.getMarkets(params)
      .then((res) => {
        const list = (res.markets ?? [])
          .filter(m => m.is_resolved && m.winner)
          .sort((a, b) => (b.resolved_at || '').localeCompare(a.resolved_at || ''));
        setMarkets(list);
        setMarketsTotal(res.total ?? 0);
        setMarketsOffset(PAGE_SIZE);
      })
      .catch(() => { setMarkets([]); setMarketsTotal(0); })
      .finally(() => setMarketsLoading(false));
  }, [coin, resolution]);

  const loadMoreMarkets = () => {
    setLoadingMore(true);
    const params: any = { coin: coin.toLowerCase(), limit: PAGE_SIZE, offset: marketsOffset };
    if (resolution !== 'All') params.market_type = resolution;
    api.getMarkets(params)
      .then((res) => {
        const more = (res.markets ?? []).filter(m => m.is_resolved && m.winner);
        setMarkets(prev => {
          const combined = [...prev, ...more];
          combined.sort((a, b) => (b.resolved_at || '').localeCompare(a.resolved_at || ''));
          return combined;
        });
        setMarketsOffset(prev => prev + PAGE_SIZE);
      })
      .catch(() => {})
      .finally(() => setLoadingMore(false));
  };

  const addCondition = (type: 'entry' | 'exit') => {
    const newCond: Condition = { field: 'price_up', operator: '>', value: '0.50' };
    if (type === 'entry') setEntryConditions([...entryConditions, newCond]);
    else setExitConditions([...exitConditions, newCond]);
  };

  const removeCondition = (type: 'entry' | 'exit', index: number) => {
    if (type === 'entry') setEntryConditions(entryConditions.filter((_, i) => i !== index));
    else setExitConditions(exitConditions.filter((_, i) => i !== index));
  };

  const updateCondition = (type: 'entry' | 'exit', index: number, key: keyof Condition, value: string) => {
    const list = type === 'entry' ? [...entryConditions] : [...exitConditions];
    list[index] = { ...list[index], [key]: value };
    if (type === 'entry') setEntryConditions(list);
    else setExitConditions(list);
  };

  const handleReplay = async () => {
    if (!selectedMarket) { setError('Select a market'); return; }
    if (entryConditions.length === 0) { setError('Add at least one entry condition'); return; }
    if (exitConditions.length === 0) { setError('Add at least one exit condition'); return; }

    // Clear any running stream
    if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null; }
    setReplaying(true);
    setIsStreaming(false);
    setLiveResult(null);
    setError('');
    setResult(null);

    try {
      // Fetch all snapshots with orderbook
      const allSnapshots: Snapshot[] = [];
      let offset = 0;
      const limit = 100;
      while (true) {
        const res = await api.getMarketSnapshots(selectedMarket, coin.toLowerCase(), { limit, offset, include_orderbook: true });
        const snaps = res.snapshots ?? [];
        allSnapshots.push(...snaps);
        if (snaps.length < limit || allSnapshots.length >= (res.total ?? 0)) break;
        offset += limit;
      }

      if (allSnapshots.length === 0) { setError('No snapshot data for this market'); setReplaying(false); return; }

      // Sort snapshots chronologically
      allSnapshots.sort((a, b) => a.time.localeCompare(b.time));

      const market = markets.find(m => m.slug === selectedMarket);

      // Filter out settlement snapshots (both prices spike to ~0.99 during settlement)
      const filtered = allSnapshots.filter(s => !(s.price_up >= 0.90 && s.price_down >= 0.90));
      if (filtered.length > 0) {
        allSnapshots.length = 0;
        allSnapshots.push(...filtered);
      }
      const shares = parseFloat(positionSize);
      const maxLossPct = parseFloat(maxLoss) / 100;
      const parsedEntry = entryConditions.map(c => ({ field: c.field, operator: c.operator, value: parseFloat(c.value) }));
      const parsedExit = exitConditions.map(c => ({ field: c.field, operator: c.operator, value: parseFloat(c.value) }));

      // Replay engine
      let inPosition = false;
      let entryPrice = 0;
      let cumulativePnl = 0;
      let peakEquity = 0;
      let maxDrawdown = 0;
      let ticksInPosition = 0;
      const trades: ReplayResult['trades'] = [];
      const pnlCurve: ReplayResult['pnl_curve'] = [];
      let prevSnapshot: Snapshot | null = null;

      const getField = (snap: Snapshot, field: string): number => {
        if (field === 'price_up') return snap.price_up;
        if (field === 'price_down') return snap.price_down;
        if (field === 'coin_price') return snap.coin_price;
        if (field === 'spread') return Math.abs(snap.price_up - snap.price_down);
        if (field === 'time_remaining_pct' && market) {
          const start = new Date(market.start_time).getTime();
          const end = new Date(market.end_time).getTime();
          const now = new Date(snap.time).getTime();
          return Math.max(0, (end - now) / (end - start)) * 100;
        }
        return 0;
      };

      const evalCondition = (cond: { field: string; operator: string; value: number }, snap: Snapshot, prev: Snapshot | null): boolean => {
        const val = getField(snap, cond.field);
        switch (cond.operator) {
          case '<': return val < cond.value;
          case '>': return val > cond.value;
          case '<=': return val <= cond.value;
          case '>=': return val >= cond.value;
          case '==': return Math.abs(val - cond.value) < 0.0001;
          case 'crosses_above': return prev !== null && getField(prev, cond.field) < cond.value && val >= cond.value;
          case 'crosses_below': return prev !== null && getField(prev, cond.field) > cond.value && val <= cond.value;
          default: return false;
        }
      };

      const getPrice = (snap: Snapshot): number => side === 'UP' ? snap.price_up : snap.price_down;

      const getFillPrice = (snap: Snapshot, isBuy: boolean): number => {
        const book = side === 'UP' ? snap.orderbook_up : snap.orderbook_down;
        if (!book) return getPrice(snap);
        const levels = isBuy ? book.asks : book.bids;
        if (!levels || levels.length === 0) return getPrice(snap);
        // Walk the book to fill `shares`
        let remaining = shares;
        let totalCost = 0;
        for (const level of levels) {
          const fillQty = Math.min(remaining, level.size);
          totalCost += fillQty * level.price;
          remaining -= fillQty;
          if (remaining <= 0) break;
        }
        if (remaining > 0) totalCost += remaining * levels[levels.length - 1].price;
        return totalCost / shares;
      };

      for (let i = 0; i < allSnapshots.length; i++) {
        const snap = allSnapshots[i];
        const price = getPrice(snap);

        if (!inPosition) {
          // Check entry: ALL conditions must be true
          const shouldEnter = parsedEntry.every(c => evalCondition(c, snap, prevSnapshot));
          if (shouldEnter) {
            const fillPrice = getFillPrice(snap, true);
            entryPrice = fillPrice;
            inPosition = true;
            trades.push({
              type: 'ENTRY', reason: 'Conditions met', time: snap.time,
              price, fill_price: fillPrice, shares, slippage: Math.abs(fillPrice - price),
              position_pnl: 0, cumulative_pnl: cumulativePnl, coin_price: snap.coin_price,
            });
          }
        } else {
          ticksInPosition++;
          const tradePnl = (price - entryPrice) * shares;
          const drawdownPct = entryPrice > 0 ? Math.max(0, -tradePnl / (entryPrice * shares)) : 0;

          // Check exit: ANY condition true, or max loss hit
          const shouldExit = parsedExit.some(c => evalCondition(c, snap, prevSnapshot)) || drawdownPct >= maxLossPct;
          if (shouldExit || i === allSnapshots.length - 1) {
            const fillPrice = getFillPrice(snap, false);
            const pnl = (fillPrice - entryPrice) * shares;
            cumulativePnl += pnl;
            inPosition = false;
            trades.push({
              type: 'EXIT',
              reason: drawdownPct >= maxLossPct ? 'Max loss' : (i === allSnapshots.length - 1 ? 'Market end' : 'Conditions met'),
              time: snap.time, price, fill_price: fillPrice, shares,
              slippage: Math.abs(fillPrice - price), position_pnl: pnl,
              cumulative_pnl: cumulativePnl, coin_price: snap.coin_price,
            });
          }
        }

        const equity = cumulativePnl + (inPosition ? (price - entryPrice) * shares : 0);
        peakEquity = Math.max(peakEquity, equity);
        maxDrawdown = Math.max(maxDrawdown, peakEquity - equity);

        pnlCurve.push({
          time: snap.time, pnl: cumulativePnl,
          unrealized_pnl: inPosition ? (price - entryPrice) * shares : 0,
          price, coin_price: snap.coin_price, in_position: inPosition,
        });

        prevSnapshot = snap;
      }

      // Compute performance
      const exitTrades = trades.filter(t => t.type === 'EXIT');
      const winningTrades = exitTrades.filter(t => t.position_pnl > 0);
      const losingTrades = exitTrades.filter(t => t.position_pnl <= 0);
      const initialCost = trades.length > 0 ? trades[0].fill_price * shares : 1;

      const replayResult: ReplayResult = {
        market: market || { slug: selectedMarket },
        strategy: { side, entryConditions: parsedEntry, exitConditions: parsedExit, positionSize: shares, maxLossPercent: parseFloat(maxLoss) },
        performance: {
          total_pnl: cumulativePnl,
          total_pnl_percent: initialCost > 0 ? (cumulativePnl / initialCost) * 100 : 0,
          max_drawdown: maxDrawdown,
          max_drawdown_percent: initialCost > 0 ? (maxDrawdown / initialCost) * 100 : 0,
          total_trades: exitTrades.length,
          winning_trades: winningTrades.length,
          losing_trades: losingTrades.length,
          win_rate: exitTrades.length > 0 ? (winningTrades.length / exitTrades.length) * 100 : 0,
          avg_trade_pnl: exitTrades.length > 0 ? cumulativePnl / exitTrades.length : 0,
          best_trade: exitTrades.length > 0 ? Math.max(...exitTrades.map(t => t.position_pnl)) : 0,
          worst_trade: exitTrades.length > 0 ? Math.min(...exitTrades.map(t => t.position_pnl)) : 0,
          time_in_position_pct: allSnapshots.length > 0 ? (ticksInPosition / allSnapshots.length) * 100 : 0,
          final_market_outcome: market?.winner || 'Unknown',
        },
        trades,
        pnl_curve: pnlCurve,
        total_snapshots: allSnapshots.length,
      };

      // Stream results tick-by-tick
      setReplaying(false);
      setIsStreaming(true);

      const totalTicks = replayResult.pnl_curve.length;
      const stepSize = Math.max(1, Math.floor(totalTicks / 200));

      const streamState = { tick: 0 };

      const advance = () => {
        streamState.tick = Math.min(streamState.tick + stepSize, totalTicks);
        const t = streamState.tick;
        const visibleCurve = replayResult.pnl_curve.slice(0, t);
        const lastTime = visibleCurve[visibleCurve.length - 1]?.time || '';
        const visibleTrades = replayResult.trades.filter(tr => tr.time <= lastTime);

        const exits = visibleTrades.filter(tr => tr.type === 'EXIT');
        const wins = exits.filter(tr => tr.position_pnl > 0);
        const losses = exits.filter(tr => tr.position_pnl <= 0);
        const livePnl = exits.length > 0 ? exits[exits.length - 1].cumulative_pnl : 0;
        const initCost = visibleTrades.length > 0 ? visibleTrades[0].fill_price * replayResult.strategy.positionSize : 1;

        setLiveResult({
          ...replayResult,
          performance: {
            ...replayResult.performance,
            total_pnl: livePnl,
            total_pnl_percent: initCost > 0 ? (livePnl / initCost) * 100 : 0,
            total_trades: exits.length,
            winning_trades: wins.length,
            losing_trades: losses.length,
            win_rate: exits.length > 0 ? (wins.length / exits.length) * 100 : 0,
            avg_trade_pnl: exits.length > 0 ? livePnl / exits.length : 0,
            best_trade: exits.length > 0 ? Math.max(...exits.map(tr => tr.position_pnl)) : 0,
            worst_trade: exits.length > 0 ? Math.min(...exits.map(tr => tr.position_pnl)) : 0,
          },
          trades: visibleTrades,
          pnl_curve: visibleCurve,
        });

        if (t >= totalTicks) {
          if (streamRef.current) clearInterval(streamRef.current);
          streamRef.current = null;
          streamDataRef.current = null;
          setIsStreaming(false);
          setResult(replayResult);
          setLiveResult(null);
        }
      };

      streamDataRef.current = { result: replayResult, tick: 0, advance };

      if (streamRef.current) clearInterval(streamRef.current);
      streamRef.current = window.setInterval(advance, streamSpeed);
      advance();

    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.message || 'Replay failed. Please try again.');
      setReplaying(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Strategy Replay</h1>
        <p className="text-text-muted text-sm">Define a strategy, pick a resolved market, and watch it play out tick-by-tick against real order book data.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* ── Left: Strategy Builder (sticky on desktop) ── */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-28">
            {/* Market Picker */}
            <div className="card p-5">
              <h3 className="font-semibold mb-3">Select Market</h3>
              <div className="flex gap-2 mb-3">
                {COINS.map(c => (
                  <button key={c} onClick={() => setCoin(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${coin === c ? 'bg-primary text-surface-dark' : 'bg-surface-dark text-text-muted border border-border hover:border-primary/30'}`}
                  >{c}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {RESOLUTIONS.map(r => (
                  <button key={r} onClick={() => setResolution(r)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${resolution === r ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-surface-dark text-text-muted border border-border hover:border-primary/30'}`}
                  >{r}</button>
                ))}
              </div>
              <div className="relative">
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="w-full bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm appearance-none pr-8 focus:border-primary/50 focus:outline-none"
                >
                  <option value="">{marketsLoading ? 'Loading...' : 'Pick a resolved market'}</option>
                  {markets.map(m => (
                    <option key={m.slug} value={m.slug}>
                      {m.slug} ({m.market_type}) — {m.winner || 'resolved'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-text-dim absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {markets.length < marketsTotal && (
                <button
                  onClick={loadMoreMarkets}
                  disabled={loadingMore}
                  className="w-full mt-2 py-1.5 text-xs text-primary hover:text-primary-light font-medium transition-colors disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : `Load more (${markets.length} of ${marketsTotal})`}
                </button>
              )}
            </div>

            {/* Side & Position */}
            <div className="card p-5">
              <h3 className="font-semibold mb-3">Position</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button onClick={() => setSide('UP')}
                  className={`py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${side === 'UP' ? 'bg-accent-green/20 text-accent-green border border-accent-green/40' : 'bg-surface-dark border border-border text-text-muted'}`}
                >
                  <TrendingUp className="w-4 h-4" /> Buy UP
                </button>
                <button onClick={() => setSide('DOWN')}
                  className={`py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${side === 'DOWN' ? 'bg-accent-red/20 text-accent-red border border-accent-red/40' : 'bg-surface-dark border border-border text-text-muted'}`}
                >
                  <TrendingDown className="w-4 h-4" /> Buy DOWN
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-text-dim mb-1 block">Shares</label>
                  <input type="number" value={positionSize} onChange={e => setPositionSize(e.target.value)}
                    className="w-full bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-text-dim mb-1 block">Max Loss %</label>
                  <input type="number" value={maxLoss} onChange={e => setMaxLoss(e.target.value)}
                    className="w-full bg-surface-dark border border-border rounded-lg px-3 py-2 text-sm focus:border-primary/50 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Entry Conditions */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Entry Conditions <span className="text-text-dim font-normal">(all must be true)</span></h3>
                <button onClick={() => addCondition('entry')} className="text-primary hover:text-primary-light">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ConditionList conditions={entryConditions} type="entry" onChange={updateCondition} onRemove={removeCondition} />
            </div>

            {/* Exit Conditions */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Exit Conditions <span className="text-text-dim font-normal">(any triggers exit)</span></h3>
                <button onClick={() => addCondition('exit')} className="text-primary hover:text-primary-light">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <ConditionList conditions={exitConditions} type="exit" onChange={updateCondition} onRemove={removeCondition} />
            </div>

            {/* Speed & Run */}
            <div className="card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-dim">Playback Speed</span>
                <div className="flex items-center gap-1">
                  {[10, 20, 50].map(speed => (
                    <button key={speed} onClick={() => setStreamSpeed(speed)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${streamSpeed === speed ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-surface-dark text-text-muted border border-border hover:border-primary/30'}`}
                    >{speed === 10 ? '0.5x' : speed === 20 ? '1x' : '2.5x'}</button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleReplay}
                disabled={replaying || !selectedMarket}
                className="btn-primary w-full py-3 justify-center text-sm"
              >
                {replaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-surface-dark border-t-transparent rounded-full animate-spin" />
                    Replaying...
                  </>
                ) : (
                  <><Play className="w-4 h-4" /> Run Replay</>
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20">
                <AlertTriangle className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                <p className="text-sm text-accent-red">{error}</p>
              </div>
            )}
          </div>

          {/* ── Right: Results ── */}
          <div className="lg:col-span-2">
            {!result && !liveResult && !replaying && (
              <div className="card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <Play className="w-12 h-12 text-text-dim mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to replay</h3>
                <p className="text-text-muted text-sm max-w-sm">
                  Define your entry and exit conditions, select a resolved market, and hit Run Replay to see how your strategy would have performed.
                </p>
              </div>
            )}

            {replaying && (
              <div className="card p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-text-muted text-sm">Loading market data...</p>
              </div>
            )}

            {isStreaming && liveResult && <ReplayResults result={liveResult} />}

            {!isStreaming && result && <ReplayResults result={result} />}
          </div>
        </div>
    </>
  );
}

// ── Sub-components ──

function ConditionList({ conditions, type, onChange, onRemove }: {
  conditions: Condition[];
  type: 'entry' | 'exit';
  onChange: (type: 'entry' | 'exit', i: number, key: keyof Condition, val: string) => void;
  onRemove: (type: 'entry' | 'exit', i: number) => void;
}) {
  if (conditions.length === 0) {
    return <p className="text-text-dim text-xs">No conditions. Click + to add one.</p>;
  }

  return (
    <div className="space-y-2">
      {conditions.map((c, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <select value={c.field} onChange={e => onChange(type, i, 'field', e.target.value)}
            className="flex-1 min-w-0 h-8 bg-surface-dark border border-border rounded px-2 text-xs focus:border-primary/50 focus:outline-none">
            {FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <select value={c.operator} onChange={e => onChange(type, i, 'operator', e.target.value)}
            className="w-16 shrink-0 h-8 bg-surface-dark border border-border rounded px-2 text-xs focus:border-primary/50 focus:outline-none">
            {OPERATORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <input type="number" step="any" value={c.value} onChange={e => onChange(type, i, 'value', e.target.value)}
            className="w-16 shrink-0 h-8 bg-surface-dark border border-border rounded px-2 text-xs focus:border-primary/50 focus:outline-none" />
          <button onClick={() => onRemove(type, i)}
            aria-label="Remove condition"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded border border-border bg-surface-dark text-text-dim hover:text-accent-red hover:border-accent-red/40 hover:bg-accent-red/10 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function ReplayResults({ result }: { result: ReplayResult }) {
  const p = result.performance;
  const isProfit = p.total_pnl >= 0;

  return (
    <div className="space-y-4">
      {/* ── Hero: Total PnL + Market Info + KPIs ── */}
      <div className={`card p-6 border ${isProfit ? 'border-accent-green/30' : 'border-accent-red/30'}`}>
        <div className="flex items-start justify-between gap-6 flex-wrap mb-5">
          <div className="min-w-0">
            <div className="text-text-dim text-[10px] uppercase tracking-wider mb-1">Total PnL</div>
            <div className={`text-4xl font-bold font-mono leading-none ${isProfit ? 'text-accent-green' : 'text-accent-red'}`}>
              {isProfit ? '+' : ''}{p.total_pnl.toFixed(4)}
            </div>
            <div className={`text-sm font-mono mt-1.5 ${isProfit ? 'text-accent-green' : 'text-accent-red'}`}>
              {isProfit ? '+' : ''}{p.total_pnl_percent.toFixed(2)}% return
            </div>
          </div>
          <div className="text-right text-xs space-y-1 shrink-0">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-text-dim text-[10px] uppercase tracking-wider">Market</span>
              <span className="font-mono text-text-primary truncate max-w-[280px]">{result.market.slug}</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-text-dim text-[10px] uppercase tracking-wider">Resolved</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${p.final_market_outcome === 'UP' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}>
                {p.final_market_outcome}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end text-text-dim">
              <span>{result.total_snapshots.toLocaleString()} snapshots</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 border-t border-border">
          <KpiCell label="Win Rate" value={`${p.win_rate.toFixed(0)}%`}
            sub={`${p.winning_trades}W · ${p.losing_trades}L`} tone={p.win_rate >= 50 ? 'pos' : 'neg'} />
          <KpiCell label="Trades" value={String(p.total_trades)}
            sub={`${p.time_in_position_pct.toFixed(0)}% in market`} />
          <KpiCell label="Max Drawdown"
            value={`-${p.max_drawdown.toFixed(2)}`}
            sub={`${p.max_drawdown_percent.toFixed(1)}%`} tone="neg" />
          <KpiCell label="Avg Trade"
            value={`${p.avg_trade_pnl >= 0 ? '+' : ''}${p.avg_trade_pnl.toFixed(2)}`}
            tone={p.avg_trade_pnl >= 0 ? 'pos' : 'neg'} />
        </div>
      </div>

      {/* ── Market Replay Chart ── */}
      {result.pnl_curve.length > 1 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold">Market Replay</h3>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-text-dim">
                Best <span className="font-mono font-semibold text-accent-green ml-1">+{p.best_trade.toFixed(2)}</span>
              </span>
              <span className="text-text-dim">
                Worst <span className="font-mono font-semibold text-accent-red ml-1">{p.worst_trade.toFixed(2)}</span>
              </span>
            </div>
          </div>
          <MarketChart data={result.pnl_curve} trades={result.trades} side={result.strategy?.side || 'UP'} />
        </div>
      )}

      {/* ── Trade Log ── */}
      {result.trades.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Trades</h3>
            <span className="text-text-dim text-xs">{result.trades.length} {result.trades.length === 1 ? 'event' : 'events'}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-text-dim border-b border-border">
                  <th className="text-left py-2 pr-3 font-medium">Time</th>
                  <th className="text-left py-2 pr-3 font-medium">Type</th>
                  <th className="text-left py-2 pr-3 font-medium">Reason</th>
                  <th className="text-right py-2 pr-3 font-medium">Price</th>
                  <th className="text-right py-2 pr-3 font-medium">Fill</th>
                  <th className="text-right py-2 pr-3 font-medium">Slip</th>
                  <th className="text-right py-2 pr-3 font-medium">Trade PnL</th>
                  <th className="text-right py-2 font-medium">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {result.trades.map((t, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface-card/50 transition-colors">
                    <td className="py-2 pr-3 text-text-muted font-mono">{new Date(t.time).toLocaleTimeString()}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${t.type === 'ENTRY' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-text-muted">{t.reason}</td>
                    <td className="py-2 pr-3 text-right font-mono">{t.price.toFixed(4)}</td>
                    <td className="py-2 pr-3 text-right font-mono">{t.fill_price.toFixed(4)}</td>
                    <td className="py-2 pr-3 text-right font-mono text-text-dim">{t.slippage.toFixed(6)}</td>
                    <td className={`py-2 pr-3 text-right font-mono ${t.position_pnl > 0 ? 'text-accent-green' : t.position_pnl < 0 ? 'text-accent-red' : 'text-text-muted'}`}>
                      {t.type === 'EXIT' ? (t.position_pnl >= 0 ? '+' : '') + t.position_pnl.toFixed(4) : '—'}
                    </td>
                    <td className={`py-2 text-right font-mono ${t.cumulative_pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {(t.cumulative_pnl >= 0 ? '+' : '') + t.cumulative_pnl.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCell({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: 'pos' | 'neg' }) {
  return (
    <div>
      <div className="text-text-dim text-[10px] uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl font-bold font-mono leading-tight ${tone === 'pos' ? 'text-accent-green' : tone === 'neg' ? 'text-accent-red' : 'text-text-primary'}`}>
        {value}
      </div>
      {sub && <div className="text-text-dim text-[10px] mt-0.5">{sub}</div>}
    </div>
  );
}

function MarketChart({ data, trades, side }: { data: ReplayResult['pnl_curve']; trades: ReplayResult['trades']; side: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (data.length < 2) return null;

  const width = 800;
  const height = 400;
  const xPad = { left: 60, right: 18 };
  const chartW = width - xPad.left - xPad.right;

  // Three stacked panels sharing the same x (time) axis
  const panels = {
    prob: { top: 18, height: 160 },
    coin: { top: 196, height: 70 },
    pnl:  { top: 286, height: 70 },
  };
  const panelsBottom = panels.pnl.top + panels.pnl.height;

  const toX = (i: number) => xPad.left + (i / (data.length - 1)) * chartW;

  // Probability scale (auto-padded, clamped to [0,1])
  const posPrices = data.map(d => d.price);
  const pMinRaw = Math.min(...posPrices);
  const pMaxRaw = Math.max(...posPrices);
  const pPad = (pMaxRaw - pMinRaw) * 0.15 || 0.05;
  const posMin = Math.max(0, pMinRaw - pPad);
  const posMax = Math.min(1, pMaxRaw + pPad);
  const posRange = posMax - posMin || 1;
  const toProbY = (v: number) => panels.prob.top + panels.prob.height - ((v - posMin) / posRange) * panels.prob.height;

  // Coin price scale
  const coinPrices = data.map(d => d.coin_price);
  const coinMin = Math.min(...coinPrices);
  const coinMax = Math.max(...coinPrices);
  const coinRange = coinMax - coinMin || 1;
  const toCoinY = (v: number) => panels.coin.top + panels.coin.height - ((v - coinMin) / coinRange) * panels.coin.height;

  // Equity curve (realized + unrealized PnL); always include zero in range
  const equity = data.map(d => d.pnl + d.unrealized_pnl);
  const eMinRaw = Math.min(0, ...equity);
  const eMaxRaw = Math.max(0, ...equity);
  const ePad = (eMaxRaw - eMinRaw) * 0.15 || 0.01;
  const eqMin = eMinRaw - ePad;
  const eqMax = eMaxRaw + ePad;
  const eqRange = eqMax - eqMin || 1;
  const toPnlY = (v: number) => panels.pnl.top + panels.pnl.height - ((v - eqMin) / eqRange) * panels.pnl.height;
  const zeroY = toPnlY(0);

  const buildPath = (mapY: (v: number) => number, vals: number[]) => {
    let p = `M ${toX(0)} ${mapY(vals[0])}`;
    for (let i = 1; i < vals.length; i++) p += ` L ${toX(i)} ${mapY(vals[i])}`;
    return p;
  };
  const probPath = buildPath(toProbY, posPrices);
  const coinPath = buildPath(toCoinY, coinPrices);
  const pnlPath  = buildPath(toPnlY,  equity);
  const finalEq = equity[equity.length - 1];
  const pnlAreaPath = `${pnlPath} L ${toX(data.length - 1)} ${zeroY} L ${toX(0)} ${zeroY} Z`;

  // In-position regions (shown on probability panel only)
  const regions: Array<{ start: number; end: number }> = [];
  let regionStart: number | null = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].in_position && regionStart === null) regionStart = i;
    if (!data[i].in_position && regionStart !== null) { regions.push({ start: regionStart, end: i }); regionStart = null; }
  }
  if (regionStart !== null) regions.push({ start: regionStart, end: data.length - 1 });

  // Trade markers (anchored on probability panel at fill price)
  const tradeMarkers = trades.map(t => {
    const tradeTime = new Date(t.time).getTime();
    let bestIdx = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < data.length; i++) {
      const diff = Math.abs(new Date(data[i].time).getTime() - tradeTime);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
    }
    return { idx: bestIdx, x: toX(bestIdx), y: toProbY(t.fill_price), type: t.type, pnl: t.position_pnl, time: t.time, fill: t.fill_price, reason: t.reason };
  });

  const posLabel = side === 'UP' ? 'UP Probability' : 'DOWN Probability';
  const posColor = side === 'UP' ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
  const probGrid = [0.25, 0.5, 0.75].filter(g => g >= posMin && g <= posMax);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vbX = ((e.clientX - rect.left) / rect.width) * width;
    if (vbX < xPad.left || vbX > width - xPad.right) { setHoverIdx(null); return; }
    const ratio = (vbX - xPad.left) / chartW;
    const idx = Math.max(0, Math.min(data.length - 1, Math.round(ratio * (data.length - 1))));
    setHoverIdx(idx);
  };

  const fmtTime = (s: string) => new Date(s).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const fmtDate = (s: string) => new Date(s).toLocaleDateString([], { month: 'short', day: 'numeric' });

  const hp = hoverIdx !== null ? data[hoverIdx] : null;
  const hoveredTrade = hoverIdx !== null ? tradeMarkers.find(m => Math.abs(m.idx - hoverIdx) <= 1) : undefined;
  const midIdx = Math.floor(data.length / 2);
  const pnlColor = finalEq >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)';

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto cursor-crosshair select-none"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {/* ── Panel 1: Probability ── */}
        <text x={xPad.left} y={panels.prob.top - 4} className="fill-text-muted text-[10px] font-semibold uppercase tracking-wider">{posLabel}</text>
        {regions.map((r, i) => (
          <rect key={i} x={toX(r.start)} y={panels.prob.top}
            width={Math.max(1, toX(r.end) - toX(r.start))} height={panels.prob.height}
            fill={posColor} fillOpacity="0.05" />
        ))}
        {probGrid.map(g => (
          <g key={g}>
            <line x1={xPad.left} y1={toProbY(g)} x2={width - xPad.right} y2={toProbY(g)}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2,3" />
            <text x={xPad.left - 6} y={toProbY(g) + 3} textAnchor="end" className="fill-text-dim text-[9px] font-mono">{g.toFixed(2)}</text>
          </g>
        ))}
        <text x={xPad.left - 6} y={toProbY(posMax) + 3} textAnchor="end" className="text-[9px] font-mono font-semibold" fill={posColor}>{posMax.toFixed(2)}</text>
        <text x={xPad.left - 6} y={toProbY(posMin) + 3} textAnchor="end" className="text-[9px] font-mono font-semibold" fill={posColor}>{posMin.toFixed(2)}</text>
        <path d={probPath} fill="none" stroke={posColor} strokeWidth="1.75" />
        {tradeMarkers.map((m, i) => {
          const isEntry = m.type === 'ENTRY';
          const color = isEntry ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
          const gap = 4;
          const w = 6;
          const h = 10;
          const path = isEntry
            ? `M ${m.x} ${m.y + gap} L ${m.x - w} ${m.y + gap + h} L ${m.x + w} ${m.y + gap + h} Z`
            : `M ${m.x} ${m.y - gap} L ${m.x - w} ${m.y - gap - h} L ${m.x + w} ${m.y - gap - h} Z`;
          return (
            <g key={i}>
              {/* Anchor dot on the price line */}
              <circle cx={m.x} cy={m.y} r="3.5" fill={color} stroke="var(--color-surface-dark)" strokeWidth="1.5" />
              {/* Triangle pointer offset from the line */}
              <path d={path} fill={color} stroke="var(--color-surface-dark)" strokeWidth="1.25" />
            </g>
          );
        })}

        {/* ── Panel 2: Coin Price ── */}
        <text x={xPad.left} y={panels.coin.top - 4} className="fill-text-muted text-[10px] font-semibold uppercase tracking-wider">Coin Price</text>
        <text x={xPad.left - 6} y={toCoinY(coinMax) + 3} textAnchor="end" className="fill-text-dim text-[9px] font-mono">${coinMax.toFixed(0)}</text>
        <text x={xPad.left - 6} y={toCoinY(coinMin) + 3} textAnchor="end" className="fill-text-dim text-[9px] font-mono">${coinMin.toFixed(0)}</text>
        <path d={coinPath} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.25" />

        {/* ── Panel 3: Cumulative PnL ── */}
        <text x={xPad.left} y={panels.pnl.top - 4} className="fill-text-muted text-[10px] font-semibold uppercase tracking-wider">Cumulative PnL</text>
        <line x1={xPad.left} y1={zeroY} x2={width - xPad.right} y2={zeroY}
          stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2,3" />
        <text x={xPad.left - 6} y={zeroY + 3} textAnchor="end" className="fill-text-dim text-[9px] font-mono">0</text>
        {Math.abs(eqMax) > 0.0001 && (
          <text x={xPad.left - 6} y={toPnlY(eqMax) + 3} textAnchor="end" className="fill-accent-green text-[9px] font-mono font-semibold">+{eqMax.toFixed(2)}</text>
        )}
        {eqMin < -0.0001 && (
          <text x={xPad.left - 6} y={toPnlY(eqMin) + 3} textAnchor="end" className="fill-accent-red text-[9px] font-mono font-semibold">{eqMin.toFixed(2)}</text>
        )}
        <path d={pnlAreaPath} fill={pnlColor} fillOpacity="0.18" />
        <path d={pnlPath} fill="none" stroke={pnlColor} strokeWidth="1.75" />

        {/* ── Shared crosshair across all panels ── */}
        {hoverIdx !== null && (
          <g pointerEvents="none">
            <line x1={toX(hoverIdx)} y1={panels.prob.top} x2={toX(hoverIdx)} y2={panelsBottom}
              stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={toX(hoverIdx)} cy={toProbY(data[hoverIdx].price)} r="3.5" fill={posColor} stroke="white" strokeWidth="1.5" />
            <circle cx={toX(hoverIdx)} cy={toCoinY(data[hoverIdx].coin_price)} r="3" fill="white" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
            <circle cx={toX(hoverIdx)} cy={toPnlY(equity[hoverIdx])} r="3"
              fill={equity[hoverIdx] >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)'}
              stroke="white" strokeWidth="1.25" />
          </g>
        )}

        {/* ── Time axis ── */}
        <text x={xPad.left} y={panelsBottom + 16} className="fill-text-dim text-[9px]">{fmtDate(data[0].time)} {fmtTime(data[0].time)}</text>
        <text x={xPad.left + chartW / 2} y={panelsBottom + 16} textAnchor="middle" className="fill-text-dim text-[9px]">{fmtTime(data[midIdx].time)}</text>
        <text x={width - xPad.right} y={panelsBottom + 16} textAnchor="end" className="fill-text-dim text-[9px]">{fmtTime(data[data.length - 1].time)}</text>

        {/* ── Legend ── */}
        <g transform={`translate(${xPad.left}, ${height - 8})`}>
          <path d="M 0 -4 L -4 3 L 4 3 Z" fill="var(--color-accent-green)" transform="translate(4, 0)" />
          <text x="14" y="3" className="fill-accent-green text-[9px]">Entry</text>
          <path d="M 0 3 L -4 -4 L 4 -4 Z" fill="var(--color-accent-red)" transform="translate(56, 0)" />
          <text x="66" y="3" className="fill-accent-red text-[9px]">Exit</text>
          <rect x="106" y="-5" width="14" height="8" fill={posColor} fillOpacity="0.2" />
          <text x="124" y="3" className="fill-text-dim text-[9px]">In Position</text>
        </g>
      </svg>

      {/* Hover tooltip — pinned to top, follows crosshair x */}
      {hp && hoverIdx !== null && (
        <div
          className="absolute pointer-events-none bg-surface-dark/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs shadow-xl z-10 min-w-[180px]"
          style={{
            left: `${(toX(hoverIdx) / width) * 100}%`,
            top: '8px',
            transform: hoverIdx > data.length / 2 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
          }}
        >
          <div className="text-text-dim text-[10px] mb-1.5">{fmtDate(hp.time)} · {fmtTime(hp.time)}</div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted text-[10px]">{posLabel}</span>
            <span className="font-mono font-semibold" style={{ color: posColor }}>{hp.price.toFixed(4)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted text-[10px]">Coin Price</span>
            <span className="font-mono">${hp.coin_price.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-text-muted text-[10px]">PnL</span>
            <span className={`font-mono font-semibold ${equity[hoverIdx] >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
              {equity[hoverIdx] >= 0 ? '+' : ''}{equity[hoverIdx].toFixed(4)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 mt-0.5">
            <span className="text-text-muted text-[10px]">Status</span>
            <span className={`text-[10px] font-semibold ${hp.in_position ? 'text-accent-green' : 'text-text-dim'}`}>
              {hp.in_position ? 'IN POSITION' : 'flat'}
            </span>
          </div>
          {hoveredTrade && (
            <div className="pt-2 mt-2 border-t border-border">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${hoveredTrade.type === 'ENTRY' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}>
                  {hoveredTrade.type}
                </span>
                <span className="font-mono text-[10px]">@ {hoveredTrade.fill.toFixed(4)}</span>
              </div>
              <div className="text-text-dim text-[10px]">{hoveredTrade.reason}</div>
              {hoveredTrade.type === 'EXIT' && (
                <div className={`text-[10px] font-mono mt-0.5 font-semibold ${hoveredTrade.pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  Trade PnL: {hoveredTrade.pnl >= 0 ? '+' : ''}{hoveredTrade.pnl.toFixed(4)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// PnlChart removed — currently unused
