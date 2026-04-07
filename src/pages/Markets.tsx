import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import { SEO } from '../components/SEO';

const validCoins = ['btc', 'eth', 'sol'];
const validTimeframes = ['5m', '15m', '1h', '4h', '24h'];

function buildSeoTitle(coin?: string, timeframe?: string) {
  const c = coin?.toUpperCase() || 'BTC, ETH & SOL';
  if (timeframe) {
    return `${c} ${timeframe} Polymarket Up/Down Markets`;
  }
  return `${c} Polymarket Up/Down Markets — Historical Data`;
}

function buildSeoDescription(coin?: string, timeframe?: string) {
  const c = coin?.toUpperCase() || 'BTC, ETH and SOL';
  if (timeframe) {
    return `Browse historical ${c} ${timeframe} Up/Down prediction markets on Polymarket. Full order book depth, sub-second snapshots, and resolution data.`;
  }
  return `Explore all ${c} Up/Down prediction markets on Polymarket with full historical order book data. Filter by timeframe, status, and search by slug.`;
}

export function Markets() {
  const { coin: coinParam, slugOrTimeframe } = useParams<{ coin?: string; slugOrTimeframe?: string }>();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const urlCoin = validCoins.includes(coinParam?.toLowerCase() || '') ? coinParam!.toUpperCase() : undefined;
  const urlTimeframe = validTimeframes.includes(slugOrTimeframe || '') ? slugOrTimeframe : undefined;

  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(isLoggedIn);
  const [coin, setCoin] = useState(urlCoin || 'BTC');
  const [timeframe, setTimeframe] = useState(urlTimeframe || 'All');
  const [resolved, setResolved] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Sync URL params to state
  useEffect(() => {
    if (urlCoin && urlCoin !== coin) setCoin(urlCoin);
    if (urlTimeframe && urlTimeframe !== timeframe) setTimeframe(urlTimeframe);
    if (!urlTimeframe && slugOrTimeframe === undefined && timeframe !== 'All' && !urlCoin) setTimeframe('All');
  }, [coinParam, slugOrTimeframe]);

  // Update URL when filters change
  const handleCoinChange = (c: string) => {
    setCoin(c);
    setPage(0);
    const tf = timeframe !== 'All' ? `/${timeframe}` : '';
    navigate(`/markets/${c.toLowerCase()}${tf}`);
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    setPage(0);
    if (tf === 'All') {
      navigate(`/markets/${coin.toLowerCase()}`);
    } else {
      navigate(`/markets/${coin.toLowerCase()}/${tf}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchMarkets();
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

  const seoPath = urlTimeframe
    ? `/markets/${coin.toLowerCase()}/${urlTimeframe}`
    : urlCoin
      ? `/markets/${coin.toLowerCase()}`
      : '/markets';

  return (
    <div className="pt-20 pb-16">
      <SEO
        title={buildSeoTitle(urlCoin, urlTimeframe)}
        description={buildSeoDescription(urlCoin, urlTimeframe)}
        path={seoPath}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {urlTimeframe
              ? `${coin} ${urlTimeframe} Markets`
              : urlCoin
                ? `${coin} Up/Down Markets`
                : 'Markets Explorer'}
          </h1>
          <p className="text-text-muted">
            {urlTimeframe
              ? `Historical ${coin} ${urlTimeframe} Up/Down prediction markets on Polymarket with full order book data.`
              : urlCoin
                ? `Browse all ${coin} Up/Down prediction markets on Polymarket. Sub-second snapshots and full order book depth.`
                : 'Browse and explore historical Polymarket Up/Down markets'}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Coin Selector */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Coin:</span>
              <div className="flex rounded-lg bg-surface-card p-1">
                {['BTC', 'ETH', 'SOL'].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCoinChange(c)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      coin === c
                        ? 'bg-primary text-white'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Timeframe:</span>
              <div className="flex rounded-lg bg-surface-card p-1">
                {['All', '5m', '15m', '1h', '4h', '24h'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => handleTimeframeChange(tf)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      timeframe === tf
                        ? 'bg-primary text-white'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Status:</span>
              <div className="flex rounded-lg bg-surface-card p-1">
                <button
                  onClick={() => { setResolved(undefined); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === undefined
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => { setResolved(false); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === false
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => { setResolved(true); setPage(0); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    resolved === true
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  Resolved
                </button>
              </div>
            </div>
          </div>

          {/* Search and Refresh — only for logged-in users */}
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-card border border-white/10 rounded-lg text-white placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={fetchMarkets}
                disabled={loading}
                className="p-2.5 bg-surface-card border border-white/10 rounded-lg hover:bg-surface-card-hover transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Internal links for SEO */}
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          {['btc', 'eth', 'sol'].map((c) =>
            validTimeframes.map((tf) => (
              <Link
                key={`${c}-${tf}`}
                to={`/markets/${c}/${tf}`}
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  coin.toLowerCase() === c && timeframe === tf
                    ? 'border-primary text-primary bg-primary/10'
                    : 'border-border text-text-muted hover:text-white hover:border-white/30'
                }`}
              >
                {c.toUpperCase()} {tf}
              </Link>
            ))
          )}
        </div>

        {!isLoggedIn ? (
          <div className="mt-12 text-center">
            <p className="text-lg text-text-muted mb-4">
              Please{' '}
              <Link to="/login" className="text-primary hover:text-primary-light font-medium">
                log in
              </Link>{' '}
              to view market data.
            </p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-4 text-sm text-text-muted">
              Showing {filteredMarkets.length} of {total} markets
            </div>

            {/* Markets Table */}
            <div className="bg-surface-card/50 rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-dark">
                      <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Market</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">Type</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">Start Time</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">End Time</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-text-muted">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-text-muted">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Loading markets...
                        </td>
                      </tr>
                    ) : filteredMarkets.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-text-muted">
                          No markets found
                        </td>
                      </tr>
                    ) : (
                      filteredMarkets.map((market) => (
                        <tr
                          key={market.slug}
                          className="border-t border-white/5 hover:bg-surface-card/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <Link
                              to={`/markets/${coin.toLowerCase()}/market/${market.slug}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {market.slug}
                            </Link>
                          </td>
                          <td className="py-4 px-4">
                            <Link
                              to={`/markets/${coin.toLowerCase()}/${market.market_type}`}
                              className="px-2 py-1 bg-primary/20 text-primary rounded text-sm hover:bg-primary/30 transition-colors"
                            >
                              {market.market_type}
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-sm text-text-muted">
                            {formatDate(market.start_time)}
                          </td>
                          <td className="py-4 px-4 text-sm text-text-muted">
                            {formatDate(market.end_time)}
                          </td>
                          <td className="py-4 px-4">
                            {market.resolved ? (
                              <span className="flex items-center gap-1.5 text-accent-green text-sm">
                                <CheckCircle className="w-4 h-4" />
                                Resolved
                              </span>
                            ) : market.active ? (
                              <span className="flex items-center gap-1.5 text-accent-yellow text-sm">
                                <Circle className="w-4 h-4 fill-current" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-text-dim text-sm">
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
                                    ? 'text-accent-green'
                                    : 'text-accent-red'
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
                              <span className="text-text-dim text-sm">-</span>
                            )}
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
                  <div className="text-sm text-text-muted">
                    Page {page + 1} of {totalPages}
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
          </>
        )}
      </div>
    </div>
  );
}
