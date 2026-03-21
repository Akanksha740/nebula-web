import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PolyHistorical</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Professional grade historical market data for backtesting Polymarket strategies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-slate-400 hover:text-white text-sm">Features</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link to="/markets" className="text-slate-400 hover:text-white text-sm">Markets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-slate-400 hover:text-white text-sm">Documentation</Link></li>
              <li><Link to="/docs#api" className="text-slate-400 hover:text-white text-sm">API Reference</Link></li>
              <li><Link to="/#faq" className="text-slate-400 hover:text-white text-sm">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contact@nebula.io" className="text-slate-400 hover:text-white text-sm">Contact Us</a></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} PolyHistorical. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
