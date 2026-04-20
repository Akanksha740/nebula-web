import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { pseoApi, type PseoPageFull, type CategoryItem } from '../lib/api';
import { getCategories, getPageBySlug as getStaticPage } from '../lib/pseo-data';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CategorySidebar } from '../components/CategorySidebar';
import { ArrowRight } from 'lucide-react';

export function PseoPageView() {
  const { slug } = useParams<{ slug: string }>();

  // Initialize with static fallback
  const staticPage = slug ? getStaticPage(slug) : undefined;
  const [page, setPage] = useState<PseoPageFull | null>(staticPage || null);
  const [categories, setCategories] = useState<CategoryItem[]>(getCategories());

  useEffect(() => {
    pseoApi.getCategories()
      .then((res) => { if (res.categories.length) setCategories(res.categories); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!slug) return;

    // Set static data immediately
    const sp = getStaticPage(slug);
    if (sp) setPage(sp);

    // Then try API overlay
    pseoApi.getPage(slug)
      .then(setPage)
      .catch(() => {});
  }, [slug]);

  if (!page) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <Link to="/category" className="text-primary hover:underline">Browse resources</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <title>{page.metaTitle || page.title} | PolyHistorical</title>
        {page.metaDescription && <meta name="description" content={page.metaDescription} />}
        <link rel="canonical" href={`https://polyhistorical.com/p/${slug}`} />
        {page.ogImage && <meta property="og:image" content={page.ogImage} />}
        <meta property="og:title" content={page.metaTitle || page.title} />
        {page.metaDescription && <meta property="og:description" content={page.metaDescription} />}
        <meta property="og:url" content={`https://polyhistorical.com/p/${slug}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Resources', href: '/category' },
          { label: page.categoryName, href: `/category/${page.categorySlug}` },
          { label: page.title },
        ]} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <CategorySidebar categories={categories} activeSlug={page.categorySlug} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Article header */}
            <header className="mb-8 pb-6 border-b border-border">
              <Link
                to={`/category/${page.categorySlug}`}
                className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4 hover:bg-primary/20 transition-colors"
              >
                {page.categoryName}
              </Link>
              <div className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{page.title}</div>
              {page.excerpt && (
                <p className="text-lg text-text-muted">{page.excerpt}</p>
              )}
            </header>

            {/* Article body */}
            <article
              className="prose prose-invert max-w-none
                prose-headings:text-text-primary prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-text-primary
                prose-ul:text-text-muted prose-ol:text-text-muted
                prose-li:mb-1
                prose-code:text-primary prose-code:bg-surface-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-surface-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg
                prose-blockquote:border-primary prose-blockquote:text-text-muted
                prose-table:text-text-muted
                prose-th:text-text-primary prose-th:border-border prose-th:py-2 prose-th:px-3
                prose-td:border-border prose-td:py-2 prose-td:px-3"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* CTA section — Audixa style */}
            <div className="mt-12 p-6 card bg-gradient-to-r from-primary/5 to-accent-blue/5 border-primary/20">
              <h3 className="text-lg font-bold mb-2">Ready to get started?</h3>
              <p className="text-text-muted text-sm mb-4">
                Access historical order book data for Polymarket prediction markets. Free tier available — no credit card required.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary">
                  Get Free API Key <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="btn-secondary">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Pricing quick compare */}
            <div className="mt-8 card p-5">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">How we compare</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">$0</div>
                  <div className="text-xs text-text-muted mt-1">PolyHistorical Free</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">$11</div>
                  <div className="text-xs text-text-muted mt-1">PolyHistorical Pro</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-dim">$5K+</div>
                  <div className="text-xs text-text-muted mt-1">Institutional providers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
