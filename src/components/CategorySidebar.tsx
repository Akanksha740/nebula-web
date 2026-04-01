import { Link } from 'react-router-dom';
import { type CategoryItem } from '../lib/api';

interface Props {
  categories: CategoryItem[];
  activeSlug?: string;
}

export function CategorySidebar({ categories, activeSlug }: Props) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="card p-4 sticky top-24">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          Categories
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/category/${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSlug === cat.slug
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/[0.03]'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className={`text-xs tabular-nums ${
                  activeSlug === cat.slug ? 'text-primary' : 'text-text-dim'
                }`}>
                  {cat.pageCount}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
