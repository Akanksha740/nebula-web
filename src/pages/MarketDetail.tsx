import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { api } from '../lib/api';
import type { Market, Snapshot } from '../lib/api';

export function MarketDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const coin = searchParams.get('coin') || 'btc';

  const [market, setMarket] = useState<Market | null>(null);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [snapshotsLoading, setSnapshotsLoading] = useState(false);
  const [includeOrderbook, setIncludeOrderbook] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [copied, setCopied] = useState(false);
  const limit = 50;

  useEffect(() => {
    if (slug) {
      fetchMarket();
    }
  }, [slug, coin]);

  useEffect(() => {
    if (slug) {
      fetchSnapshots();
    }
  }, [slug, coin, page, includeOrderbook]);

  const fetchMarket = async () => {
    setLoading(true);
    try {
      const data = await api.getMarket(slug!, coin);
      setMarket(data);
    } catch (error) {
      console.error('Failed to fetch market:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSnapshots = async () => {
    setSnapshotsLoading(true);
    try {
      const data = await api.getMarketSnapshots(slug!, coin, {
        limit,
        offset: page * limit,
        include_orderbook: includeOrderbook,
      });
      setSnapshots(data.snapshots || []);
      setTotal(data.total || 0);
      if (!market && data.market) {
        setMarket(data.market);
      }
    } catch (error) {
      console.error('Failed to fetch snapshots:', error);
    } finally {
      setSnapshotsLoading(false);
    }
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '-';
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="pt-20 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-text-muted">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="pt-20 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-text-muted mb-4">Market not found</p>
          <Link to="/markets" className="text-primary hover:text-primary-light">
            ← Back to Markets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/markets"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        {/* Market Header */}
        <div className="bg-surface-card/50 rounded-xl border border-white/10 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{market.slug}</h1>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                  {market.market_type}
                </span>
                {market.resolved ? (
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green rounded text-sm">
                    Resolved
                  </span>
                ) : market.active ? (
                  <span className="px-2 py-1 bg-accent-yellow/20 text-accent-yellow rounded text-sm">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-text-dim/20 text-text-muted rounded text-sm">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-text-muted">
                {market.coin} Up/Down Market • {total.toLocaleString()} snapshots
              </p>
            </div>

            {market.winner && (
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  market.winner.toLowerCase() === 'up'
                    ? 'bg-accent-green/20 text-accent-green'
                    : 'bg-accent-red/20 text-accent-red'
                }`}
              >
                {market.winner.toLowerCase() === 'up' ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="font-semibold">Winner: {market.winner}</span>
              </div>
            )}
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-dark rounded-lg p-4">
              <div className="text-sm text-text-muted mb-1">Start Time</div>
              <div className="font-medium">
                {formatDate(market.start_time)}
              </div>
            </div>
            <div className="bg-surface-dark rounded-lg p-4">
              <div className="text-sm text-text-muted mb-1">End Time</div>
              <div className="font-medium">
                {formatDate(market.end_time)}
              </div>
            </div>
            <div className="bg-surface-dark rounded-lg p-4">
              <div className="text-sm text-text-muted mb-1">Coin Price Start</div>
              <div className="font-medium">{formatPrice(market.btc_price_start)}</div>
            </div>
            <div className="bg-surface-dark rounded-lg p-4">
              <div className="text-sm text-text-muted mb-1">Market ID</div>
              <div className="font-medium flex items-center gap-2">
                <span className="truncate">{market.market_id || '-'}</span>
                {market.market_id && (
                  <button
                    onClick={() => copyToClipboard(market.market_id)}
                    className="text-text-muted hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Snapshots Section */}
        <div className="bg-surface-card/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Snapshots</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOrderbook}
                  onChange={(e) => {
                    setIncludeOrderbook(e.target.checked);
                    setPage(0);
                  }}
                  className="w-4 h-4 rounded border-white/20 bg-surface-card text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-muted">Include Orderbook</span>
              </label>
              <button
                onClick={fetchSnapshots}
                disabled={snapshotsLoading}
                className="p-2 bg-surface-card rounded-lg hover:bg-surface-card-hover transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${snapshotsLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-dark">
                  <th className="text-left py-3 px-6 text-sm font-medium text-text-muted">Time</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Coin Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Price UP</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Price DOWN</th>
                  {includeOrderbook && (
                    <>
                      <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Orderbook UP</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Orderbook DOWN</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {snapshotsLoading ? (
                  <tr>
                    <td colSpan={includeOrderbook ? 6 : 4} className="py-12 text-center text-text-muted">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading snapshots...
                    </td>
                  </tr>
                ) : snapshots.length === 0 ? (
                  <tr>
                    <td colSpan={includeOrderbook ? 6 : 4} className="py-12 text-center text-text-muted">
                      No snapshots available
                    </td>
                  </tr>
                ) : (
                  snapshots.map((snapshot, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/5 hover:bg-surface-card/50 transition-colors"
                    >
                      <td className="py-3 px-6 text-sm">
                        {formatDate(snapshot.time)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-mono">
                        {snapshot.btc_price ? formatPrice(snapshot.btc_price) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-mono text-accent-green">
                        {snapshot.price_up?.toFixed(4) || '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-mono text-accent-red">
                        {snapshot.price_down?.toFixed(4) || '-'}
                      </td>
                      {includeOrderbook && (
                        <>
                          <td className="py-3 px-4 text-center">
                            {snapshot.orderbook_up ? (
                              <OrderbookPreview orderbook={snapshot.orderbook_up} side="up" />
                            ) : (
                              <span className="text-text-dim">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {snapshot.orderbook_down ? (
                              <OrderbookPreview orderbook={snapshot.orderbook_down} side="down" />
                            ) : (
                              <span className="text-text-dim">-</span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
              <div className="text-sm text-text-muted">
                Page {page + 1} of {totalPages} ({total.toLocaleString()} total)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="p-2 bg-surface-card rounded-lg hover:bg-surface-card-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-2 bg-surface-card rounded-lg hover:bg-surface-card-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderbookPreview({
  orderbook,
  side,
}: {
  orderbook: { bids: Array<{ price: string; size: string }>; asks: Array<{ price: string; size: string }> };
  side: 'up' | 'down';
}) {
  const topBids = orderbook.bids?.slice(0, 3) || [];
  const topAsks = orderbook.asks?.slice(0, 3) || [];

  return (
    <div className="inline-flex gap-4 text-xs">
      <div className="text-left">
        <div className="text-text-dim mb-1">Bids</div>
        {topBids.map((bid, i) => (
          <div key={i} className={side === 'up' ? 'text-accent-green' : 'text-accent-red'}>
            {Number(bid.price).toFixed(2)} × {Number(bid.size).toFixed(0)}
          </div>
        ))}
      </div>
      <div className="text-left">
        <div className="text-text-dim mb-1">Asks</div>
        {topAsks.map((ask, i) => (
          <div key={i} className="text-text-muted">
            {Number(ask.price).toFixed(2)} × {Number(ask.size).toFixed(0)}
          </div>
        ))}
      </div>
    </div>
  );
}
