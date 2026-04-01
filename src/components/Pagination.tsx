import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  total: number;
  limit: number;
  offset: number;
  onPageChange: (offset: number) => void;
}

export function Pagination({ total, limit, offset, onPageChange }: Props) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
      <span className="text-sm text-text-muted">
        Page {currentPage} of {totalPages} ({total} items)
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(0, offset - limit))}
          disabled={offset === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-border
            hover:border-border-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => onPageChange(offset + limit)}
          disabled={offset + limit >= total}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-border
            hover:border-border-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
