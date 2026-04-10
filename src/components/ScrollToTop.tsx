import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Mount once inside <BrowserRouter>. On every pathname change, scroll the
 * window back to the top — unless the URL has a hash, in which case we let
 * the section-anchor scroll handlers (Navbar/Footer) do their work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
