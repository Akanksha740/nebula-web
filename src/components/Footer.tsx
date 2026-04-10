import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to a section on the home page. If already on "/", scroll smoothly;
  // otherwise navigate to "/" first, then scroll once the page has mounted.
  // Mirrors the Navbar's handleNavClick so both entry points feel identical.
  const scrollToSection = (hash: string) => {
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Logo />
              <span className="text-lg font-bold">PolyHistorical</span>
            </Link>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              Historical order book data for Polymarket BTC, ETH, and SOL Up/Down markets. Built for quants, researchers, and bot developers.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://x.com/polyhistorical" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:support@polyhistorical.com" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('features')} className="text-text-muted hover:text-white text-sm transition-colors text-left">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="text-text-muted hover:text-white text-sm transition-colors text-left">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wider">Developers</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.polyhistorical.com/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white text-sm transition-colors">API Docs</a></li>
              <li><a href="https://docs.polyhistorical.com/quickstart" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white text-sm transition-colors">Quickstart</a></li>
              <li><a href="https://docs.polyhistorical.com/guides/rate-limits" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white text-sm transition-colors">Rate Limits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-text-muted uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-text-muted hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link to="/terms" className="text-text-muted hover:text-white text-sm transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-text-muted hover:text-white text-sm transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-text-dim text-xs">
          &copy; {new Date().getFullYear()} PolyHistorical. Not affiliated with Polymarket.
        </div>
      </div>
    </footer>
  );
}
