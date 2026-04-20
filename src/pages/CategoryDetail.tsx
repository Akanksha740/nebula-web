import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { pseoApi, type CategoryItem, type PseoPageSummary } from '../lib/api';
import { getCategories, getCategoryBySlug, getPagesByCategory } from '../lib/pseo-data';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CategorySidebar } from '../components/CategorySidebar';
import { Pagination } from '../components/Pagination';

const ITEMS_PER_PAGE = 25;

export function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Initialize with static fallback data immediately
  const staticCat = slug ? getCategoryBySlug(slug) : undefined;
  const staticPages = slug ? getPagesByCategory(slug) : [];

  const [category, setCategory] = useState<CategoryItem | null>(staticCat || null);
  const [pages, setPages] = useState<PseoPageSummary[]>(staticPages);
  const [total, setTotal] = useState(staticPages.length);
  const [offset, setOffset] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>(getCategories());

  // Try API, but keep fallback if it fails
  useEffect(() => {
    pseoApi.getCategories()
      .then((res) => { if (res.categories.length) setCategories(res.categories); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!slug) return;

    // Set static data immediately
    const sc = getCategoryBySlug(slug);
    const sp = getPagesByCategory(slug);
    if (sc) setCategory(sc);
    if (sp.length) { setPages(sp); setTotal(sp.length); }

    // Then try API overlay
    Promise.all([
      pseoApi.getCategory(slug),
      pseoApi.getCategoryPages(slug, { limit: ITEMS_PER_PAGE, offset }),
    ])
      .then(([cat, pagesRes]) => {
        setCategory(cat);
        setPages(pagesRes.pages);
        setTotal(pagesRes.total);
      })
      .catch(() => {});
  }, [slug, offset]);

  useEffect(() => { setOffset(0); }, [slug]);

  if (!category) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Category not found</h1>
        <Link to="/category" className="text-primary hover:underline">Back to categories</Link>
      </div>
    );
  }

  const currentPage = Math.floor(offset / ITEMS_PER_PAGE) + 1;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <title>{category.metaTitle || category.name} | PolyHistorical</title>
        {category.metaDescription && <meta name="description" content={category.metaDescription} />}
        <link rel="canonical" href={`https://polyhistorical.com/category/${slug}`} />
        <meta property="og:title" content={category.metaTitle || category.name} />
        {category.metaDescription && <meta property="og:description" content={category.metaDescription} />}
        <meta property="og:url" content={`https://polyhistorical.com/category/${slug}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Resources', href: '/category' },
          { label: category.name },
        ]} />

        {/* Category hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{category.name}</h1>
          {category.description && (
            <p className="text-text-muted text-lg max-w-3xl">{category.description}</p>
          )}
          <div className="flex gap-3 mt-6">
            <Link to="/signup" className="btn-primary">Get Started <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/pricing" className="btn-secondary">View Pricing</Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <CategorySidebar categories={categories} activeSlug={slug} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Browse heading + page count — Audixa style */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Browse {category.name}</h2>
              <span className="text-sm text-text-muted tabular-nums">
                {total} {total === 1 ? 'page' : 'pages'} {totalPages > 1 && `· Page ${currentPage} of ${totalPages}`}
              </span>
            </div>

            {/* Pages list */}
            {pages.length === 0 ? (
              <div className="card p-8 text-center text-text-muted">
                No pages in this category yet.
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pages.map((page) => (
                    <Link
                      key={page.id}
                      to={`/p/${page.slug}`}
                      className="card p-5 block group hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1">
                            {page.title}
                          </h3>
                          {page.excerpt && (
                            <p className="text-sm text-text-muted line-clamp-2">{page.excerpt}</p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-primary shrink-0 mt-1.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>

                <Pagination
                  total={total}
                  limit={ITEMS_PER_PAGE}
                  offset={offset}
                  onPageChange={setOffset}
                />
              </>
            )}

            {/* Pricing comparison — Audixa-style bottom section */}
            <section className="mt-14 pt-10 border-t border-border">
              <h2 className="text-xl font-bold mb-4">Why PolyHistorical?</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2.5 pr-4 text-text-muted font-medium">Feature</th>
                      <th className="text-left py-2.5 px-4 text-primary font-semibold">PolyHistorical</th>
                      <th className="text-left py-2.5 pl-4 text-text-muted font-medium">Others</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-text-muted">
                    <tr>
                      <td className="py-2.5 pr-4">Polymarket order book history</td>
                      <td className="py-2.5 px-4 text-accent-green font-medium">&#10003; Sub-second</td>
                      <td className="py-2.5 pl-4 text-accent-red">&#10007; Not available</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">Starting price</td>
                      <td className="py-2.5 px-4 text-primary font-medium">Free</td>
                      <td className="py-2.5 pl-4">$79 – $5,000+/mo</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">Pro plan</td>
                      <td className="py-2.5 px-4 text-primary font-medium">$11/mo</td>
                      <td className="py-2.5 pl-4">$79 – $5,000+/mo</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">API setup time</td>
                      <td className="py-2.5 px-4 text-primary font-medium">2 minutes</td>
                      <td className="py-2.5 pl-4">Sales call required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link to="/signup" className="btn-primary">
                Get Free API Key <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
