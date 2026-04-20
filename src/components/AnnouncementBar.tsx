import { Link } from 'react-router-dom';
import { Bitcoin, ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0a1f18] border-b border-primary/30 overflow-hidden h-8">
      <Link
        to="/signup"
        className="h-full flex items-center hover:bg-primary/15 transition-colors"
      >
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-medium text-primary">
              <Bitcoin className="w-3.5 h-3.5 text-[#F7931A]" />
              Now accepting crypto. Pay with BTC, ETH, USDT & 200+ coins. 2 months Pro for $22
              <ArrowRight className="w-3 h-3" />
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
