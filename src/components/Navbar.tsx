import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', hash: '', label: 'Home' },
    { path: '/', hash: 'features', label: 'Features' },
    { path: '/', hash: 'pricing', label: 'Pricing' },
    { path: '/', hash: 'faq', label: 'FAQ' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 104; // announcement bar (32) + navbar (64) + small gap (8)
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  const handleNavClick = (path: string, hash: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === path && hash) {
      scrollToSection(hash);
    } else if (hash) {
      navigate(path);
      setTimeout(() => scrollToSection(hash), 100);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (hash: string) => {
    if (!hash) return location.pathname === '/' && !location.hash;
    return location.hash === `#${hash}`;
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 bg-surface-base/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
            <span className="text-xl font-bold">PolyHistorical</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.hash)}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.hash)
                    ? 'text-white'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://docs.polyhistorical.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors text-text-muted hover:text-white"
            >
              Docs
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-card border-b border-white/5">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.hash)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.hash)
                    ? 'bg-primary/10 text-white'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://docs.polyhistorical.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium transition-colors text-text-muted hover:text-white hover:bg-white/5"
            >
              Docs
            </a>
            <div className="flex gap-2 pt-4">
              <Link to="/login" className="btn-secondary text-sm py-2 px-4 flex-1 justify-center" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4 flex-1 justify-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
