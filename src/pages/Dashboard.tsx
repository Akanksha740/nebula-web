import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  KeyRound,
  CreditCard,
  FileText,
  Mail,
  Zap,
  User,
  ChevronDown,
  ExternalLink,
  Activity,
  Monitor,
  TrendingUp,
  Clock,
  LogOut,
  CircleDot,
} from 'lucide-react';
import { Logo } from '../components/Logo';

interface CustomerData {
  id: string;
  email: string;
  companyName: string | null;
  tier: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'api-keys', label: 'API Keys', icon: KeyRound },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'docs', label: 'Documentation', icon: FileText, external: true },
  { id: 'contact', label: 'Contact Us', icon: Mail },
];

const freePlanFeatures = [
  '50 BTC markets (5m/15m)',
  '24 BTC markets (1h/4h)',
  '5 BTC markets (24h)',
  'Latest data only (no history)',
  'No Binance data',
];

const platformStats = [
  { label: 'Markets Tracked', value: '5,000+', icon: FileText },
  { label: 'Active Snapshots', value: '60M+', icon: Monitor },
  { label: 'Avg Response', value: '<50ms', icon: TrendingUp },
  { label: 'Uptime', value: '99.9%', icon: Clock },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<CustomerData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavClick = (id: string) => {
    if (id === 'docs') {
      window.open('/docs', '_blank');
      return;
    }
    if (id === 'contact') {
      window.location.href = 'mailto:contact@polyhistorical.com';
      return;
    }
    setActiveNav(id);
  };

  const displayName = user?.companyName || user?.email?.split('@')[0] || 'User';
  const apiKeyCount = 0;
  const maxApiKeys = 3;

  return (
    <div className="min-h-screen flex bg-surface-base">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border shrink-0 flex flex-col">
        {/* Logo */}
        <Link to="/" className="p-5 flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg">PolyHistorical</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeNav === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  {item.label}
                  {item.external && <ExternalLink className="w-3.5 h-3.5 ml-auto text-text-dim" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Button */}
        <div className="px-3 pb-3">
          <Link
            to="/pricing"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <Zap className="w-4 h-4" />
            Upgrade to Pro
          </Link>
        </div>

        {/* User */}
        <div className="px-3 pb-4 relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-surface-card-hover flex items-center justify-center">
              <User className="w-4 h-4 text-text-muted" />
            </div>
            <span className="text-sm font-medium truncate flex-1 text-left">{displayName}</span>
            <ChevronDown className="w-4 h-4 text-text-dim" />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-surface-card border border-border-hover rounded-lg shadow-lg overflow-hidden z-10">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent-red hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Welcome back, {displayName}</h1>
            <p className="text-text-muted text-sm">Your dashboard overview</p>
          </div>

          {/* Top Row: Plan + Usage */}
          <div className="grid lg:grid-cols-5 gap-6 mb-6">
            {/* Current Plan */}
            <div className="lg:col-span-3 card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Current Plan</span>
                <span className="text-sm text-text-muted capitalize">{user?.tier?.toLowerCase() || 'Free'}</span>
              </div>

              <h2 className="text-xl font-bold mb-1">Free Plan</h2>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-bold text-primary">$0</span>
                <span className="text-text-muted text-sm">/mo</span>
              </div>

              {/* API Keys & Status */}
              <div className="bg-surface-base rounded-lg p-4 mb-5 space-y-3">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">
                    <span className="font-semibold">{apiKeyCount}</span>
                    <span className="text-text-muted"> / {maxApiKeys} API Keys</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleDot className="w-4 h-4 text-accent-green" />
                  <span className="text-sm">Active</span>
                </div>
              </div>

              {/* Plan Includes */}
              <div className="mb-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Plan Includes:</span>
                <ul className="mt-3 space-y-2.5">
                  {freePlanFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CircleDot className="w-4 h-4 text-text-dim shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade Button */}
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                <Zap className="w-4 h-4" />
                Upgrade Plan
              </Link>
            </div>

            {/* API Usage */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">API Usage</span>
                <span className="text-xs text-text-muted">Last 30 days</span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-text-muted mt-1">API Calls</p>
                  <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-text-muted mt-1">Endpoints Used</p>
                  <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-text-muted mt-1">Avg. Latency (ms)</p>
                  <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-text-dim text-xs">
                <Activity className="w-3.5 h-3.5" />
                <span>Usage data updates in real-time</span>
              </div>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Platform Statistics</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-xs font-semibold text-accent-green">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platformStats.map((stat) => (
                <div key={stat.label} className="bg-surface-base rounded-lg p-4 text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
