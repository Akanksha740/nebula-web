import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { api } from '../lib/api';
import type { Market } from '../lib/api';

const coins = ['BTC', 'ETH', 'SOL'];
const timeframes = ['All', '5m', '15m', '1h', '4h', '24h'];

export function Markets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('All');
  const [resolved, setResolved] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchMarkets();
  }, [coin, timeframe, resolved, page]);

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const params: any = {
        coin: coin.toLowerCase(),
        limit,
        offset: page * limit,
      };
      if (timeframe !== 'All') {
        params.market_type = timeframe;
      }
      if (resolved !== undefined) {
        params.resolved = resolved;
      }
      const response = await api.getMarkets(params);
      setMarkets(response.markets || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Failed to fetch markets:', error);
      setMarkets([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const filteredMarkets = markets.filter((m) =>
    m.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Markets Explorer</h1>
          <p className="text-slate-400">
            Browse and explore historical Polymarket Up/Down markets
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Coin Selector */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Coin:</span>
              <div className="flex rounded-lg bg-slate-800 p-1">
                {coins.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCoin(c); setPage(0); }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      coin === c
                        ? 'bg-indigo-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Timeframe:</span>
              <div className="flex rounded-lg bg-slate-800 p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => { setTimeframe(tf); setPage(0); }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      timeframe === tf
                        ? 'bg-indigo-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Status:</span>
              <div className="flex rounded-lg bg-slate-800 p-1">
                <button
                  onClick={() => { setResolved(undefined); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === undefined
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => { setResolved(false); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === false
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => { setResolved(true); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === true
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Resolved
                </button>
              </div>
            </div>
          </div>

          {/* Search and Refresh */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search markets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={fetchMarkets}
              disabled={loading}
              className="p-2.5 bg-slate-800 border border-white/10 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-slate-400">
          Showing {filteredMarkets.length} of {total} markets
        </div>

        {/* Markets Table */}
        <div className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Market</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Start Time</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">End Time</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Winner</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading markets...
                    </td>
                  </tr>
                ) : filteredMarkets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No markets found
                    </td>
                  </tr>
                ) : (
                  filteredMarkets.map((market) => (
                    <tr
                      key={market.slug}
                      className="border-t border-white/5 hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <Link
                          to={`/markets/${market.slug}?coin=${coin.toLowerCase()}`}
                          className="font-medium hover:text-indigo-400 transition-colors"
                        >
                          {market.slug}
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-sm">
                          {market.market_type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">
                        {formatDate(market.start_time)}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">
                        {formatDate(market.end_time)}
                      </td>
                      <td className="py-4 px-4">
                        {market.resolved ? (
                          <span className="flex items-center gap-1.5 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Resolved
                          </span>
                        ) : market.active ? (
                          <span className="flex items-center gap-1.5 text-yellow-400 text-sm">
                            <Circle className="w-4 h-4 fill-current" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                            <Circle className="w-4 h-4" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {market.winner ? (
                          <span
                            className={`flex items-center gap-1 text-sm ${
                              market.winner.toLowerCase() === 'up'
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {market.winner.toLowerCase() === 'up' ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {market.winner}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-sm">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/markets/${market.slug}?coin=${coin.toLowerCase()}`}
                          className="text-sm text-indigo-400 hover:text-indigo-300"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
              <div className="text-sm text-slate-400">
                Page {page + 1} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
