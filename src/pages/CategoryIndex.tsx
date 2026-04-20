import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Layers } from 'lucide-react';
import { pseoApi, type CategoryItem } from '../lib/api';
import { getCategories } from '../lib/pseo-data';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function CategoryIndex() {
  const [categories, setCategories] = useState<CategoryItem[]>(getCategories());

  useEffect(() => {
    pseoApi.getCategories()
      .then((res) => { if (res.categories.length) setCategories(res.categories); })
      .catch(() => {});
  }, []);

  const totalPages = categories.reduce((sum, c) => sum + c.pageCount, 0);

  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <title>Resources & Guides | PolyHistorical</title>
        <meta name="description" content="Browse comparisons, guides, and resources for crypto prediction market data, backtesting strategies, and Polymarket historical analysis." />
        <link rel="canonical" href="https://polyhistorical.com/category" />
        <meta property="og:title" content="Resources & Guides | PolyHistorical" />
        <meta property="og:description" content="Browse comparisons, guides, and resources for crypto prediction market data, backtesting strategies, and Polymarket historical analysis." />
        <meta property="og:url" content="https://polyhistorical.com/category" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Resources' }]} />

        {/* Hero section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              {totalPages} pages across {categories.length} categories
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Browse <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Side-by-side comparisons, developer guides, and deep dives on crypto prediction market data, backtesting, and trading strategies.
          </p>
          <div className="flex gap-3 mt-6">
            <Link to="/signup" className="btn-primary">Get Started <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/pricing" className="btn-secondary">View Pricing</Link>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="card p-6 group hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                <span className="text-xs font-medium text-text-dim bg-surface-card-hover px-2.5 py-1 rounded-full tabular-nums">
                  {cat.pageCount}
                </span>
              </div>
              {cat.description && (
                <p className="text-sm text-text-muted line-clamp-2 mb-4">{cat.description}</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Browse <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Pricing comparison section — like Audixa */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Pricing Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-text-muted font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Starting Price</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Prediction Markets</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Order Book History</th>
                  <th className="text-left py-3 pl-4 text-text-muted font-medium">Granularity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-primary/5">
                  <td className="py-3 pr-4 font-semibold text-primary">PolyHistorical</td>
                  <td className="py-3 px-4 font-semibold">Free / $11 mo</td>
                  <td className="py-3 px-4 text-accent-green">&#10003;</td>
                  <td className="py-3 px-4 text-accent-green">&#10003; Full depth</td>
                  <td className="py-3 pl-4">500ms</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Kaiko</td>
                  <td className="py-3 px-4">$5,000+/mo</td>
                  <td className="py-3 px-4 text-accent-red">&#10007;</td>
                  <td className="py-3 px-4">CEX only</td>
                  <td className="py-3 pl-4">10s</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">CryptoCompare</td>
                  <td className="py-3 px-4">$79+/mo</td>
                  <td className="py-3 px-4 text-accent-red">&#10007;</td>
                  <td className="py-3 px-4 text-accent-red">&#10007;</td>
                  <td className="py-3 pl-4">1min</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Amberdata</td>
                  <td className="py-3 px-4">$1,000+/mo</td>
                  <td className="py-3 px-4 text-accent-red">&#10007;</td>
                  <td className="py-3 px-4">CEX only</td>
                  <td className="py-3 pl-4">1min</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Dune Analytics</td>
                  <td className="py-3 px-4">Free / $349 mo</td>
                  <td className="py-3 px-4 text-text-dim">On-chain only</td>
                  <td className="py-3 px-4 text-accent-red">&#10007;</td>
                  <td className="py-3 pl-4">~12s (blocks)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Developer code examples — like Audixa */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-accent-blue mb-3">Python</h3>
              <pre className="text-sm text-text-muted overflow-x-auto"><code>{`import requests

resp = requests.get(
  "https://api.polyhistorical.com/v1/markets",
  params={"coin": "btc", "market_type": "5m",
          "resolved": "true", "limit": 10},
  headers={"X-API-Key": "your-key"}
)
print(resp.json()["markets"])`}</code></pre>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-accent-yellow mb-3">cURL</h3>
              <pre className="text-sm text-text-muted overflow-x-auto"><code>{`curl -H "X-API-Key: your-key" \\
  "https://api.polyhistorical.com/v1/\\
markets?coin=btc&market_type=5m&\\
resolved=true&limit=10"`}</code></pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
