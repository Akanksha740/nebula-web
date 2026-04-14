import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  Plus,
  Trash2,
  Copy,
  Check,
  X,
  AlertCircle,
  Lock,
  Settings,
  CheckCircle,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { PricingCards } from '../components/PricingCards';
import { PaymentMethodModal } from '../components/PaymentMethodModal';
import { api } from '../lib/api';
import { getTierConfig } from '../lib/pricing';

interface CustomerData {
  id: string;
  email: string;
  companyName: string | null;
  tier: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
}

interface ApiKeyData {
  id: string;
  keyPrefix: string;
  name: string;
  permissions: string[] | null;
  isActive: boolean;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'api-keys', label: 'API Keys', icon: KeyRound },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'docs', label: 'Documentation', icon: FileText, external: true },
  { id: 'contact', label: 'Contact Us', icon: Mail },
];


const platformStats = [
  { label: 'Markets Tracked', value: '5,000+', icon: FileText },
  { label: 'Active Snapshots', value: '60M+', icon: Monitor },
  { label: 'Avg Response', value: '<50ms', icon: TrendingUp },
  { label: 'Uptime', value: '99.9%', icon: Clock },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeNav, setActiveNav] = useState(searchParams.get('tab') || 'home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<CustomerData | null>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([]);
  const [apiKeysLoading, setApiKeysLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('90');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Usage stats state
  const [usageStats, setUsageStats] = useState<{
    requestsThisMonth: number;
    successfulRequests: number;
    rateLimitedRequests: number;
    endpointsUsed: number;
    averageLatencyMs: number;
    usagePercentage: number;
    dailyLimit: number;
    monthlyLimit: number;
  } | null>(null);

  // Profile / Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);

  const currentTierConfig = getTierConfig(user?.tier);
  const maxApiKeys = currentTierConfig.maxApiKeys;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup');
      return;
    }
    // Load cached user immediately, then refresh from API
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }

    // Fetch fresh profile from /auth/me
    api.getProfile().then((res) => {
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    }).catch(() => { /* handled by auth interceptor */ });
  }, [navigate]);

  const fetchApiKeys = useCallback(async () => {
    setApiKeysLoading(true);
    try {
      const res = await api.getApiKeys();
      if (res.success) {
        setApiKeys(res.data || []);
      }
    } catch {
      // ignore
    } finally {
      setApiKeysLoading(false);
    }
  }, []);

  const fetchUsageStats = useCallback(async () => {
    try {
      const res = await api.getUsageStats();
      if (res.success) {
        setUsageStats(res.data);
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch API keys on initial load for the home tab count
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  useEffect(() => {
    if (activeNav === 'home') {
      fetchUsageStats();
    }
    if (activeNav === 'api-keys') {
      fetchApiKeys();
    }
  }, [activeNav, fetchApiKeys, fetchUsageStats]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavClick = (id: string) => {
    if (id === 'docs') {
      window.open('https://docs.polyhistorical.com/', '_blank');
      return;
    }
    if (id === 'contact') {
      window.location.href = 'mailto:support@polyhistorical.com';
      return;
    }
    setActiveNav(id);
    setSearchParams({ tab: id });
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      setCreateError('Key name is required');
      return;
    }
    setCreateLoading(true);
    setCreateError('');
    try {
      const params: { name: string; expiresAt?: string } = { name: newKeyName.trim() };
      if (newKeyExpiry) {
        const days = parseInt(newKeyExpiry);
        if (days > 0 && days <= 365) {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + days);
          params.expiresAt = expiry.toISOString();
        }
      }
      const res = await api.createApiKey(params);
      if (res.success) {
        setCreatedKey(res.data.apiKey);
        setNewKeyName('');
        setNewKeyExpiry('90');
        fetchApiKeys();
      }
    } catch (err: any) {
      setCreateError(
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Failed to create API key'
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      await api.revokeApiKey(keyId);
      fetchApiKeys();
      setDeleteConfirm(null);
    } catch {
      // ignore
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleUpgrade = () => {
    setShowPaymentMethodModal(true);
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (!currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordLoading(true);
    try {
      await api.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Failed to change password'
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreatedKey(null);
    setCreateError('');
    setNewKeyName('');
    setNewKeyExpiry('90');
  };

  const displayName = user?.companyName || user?.email?.split('@')[0] || 'User';
  const activeKeyCount = apiKeys.filter(k => k.isActive).length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  // ── Render: API Keys Tab ──
  const renderApiKeys = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">API Keys</h1>
          <p className="text-text-muted text-sm">
            Manage your API keys for accessing PolyHistorical data
          </p>
          <p className="text-text-dim text-xs mt-1">{activeKeyCount} / {maxApiKeys} keys used</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={activeKeyCount >= maxApiKeys}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Create New Key
        </button>
      </div>

      {/* Keys List */}
      {apiKeysLoading ? (
        <div className="card p-12 text-center text-text-muted text-sm">Loading...</div>
      ) : apiKeys.length === 0 ? (
        <div className="card p-12 text-center">
          <KeyRound className="w-12 h-12 text-text-dim mx-auto mb-4" />
          <p className="text-text-muted text-sm mb-4">No API keys yet. Create one to get started.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Your First Key
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="card p-5 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-sm">{key.name}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      key.isActive
                        ? 'bg-accent-green/10 text-accent-green'
                        : 'bg-accent-red/10 text-accent-red'
                    }`}
                  >
                    {key.isActive ? 'Active' : 'Revoked'}
                  </span>
                </div>
                <p className="text-text-muted text-sm font-mono">{key.keyPrefix}••••••••</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-text-dim">
                  <span>Created: {formatDate(key.createdAt)}</span>
                  {key.expiresAt && <span>Expires: {formatDate(key.expiresAt)}</span>}
                  {key.lastUsedAt && <span>Last used: {formatDate(key.lastUsedAt)}</span>}
                </div>
              </div>

              {key.isActive && (
                <div className="ml-4">
                  {deleteConfirm === key.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">Revoke?</span>
                      <button
                        onClick={() => handleRevokeKey(key.id)}
                        className="text-xs text-accent-red hover:text-accent-red/80 font-medium"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs text-text-muted hover:text-text-primary"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(key.id)}
                      className="p-2 text-text-dim hover:text-accent-red transition-colors rounded-lg hover:bg-white/5"
                      title="Revoke key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* How to Use */}
      <div className="card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-3">How to Use</h3>
        <div className="bg-surface-base rounded-lg p-4 font-mono text-xs text-text-muted">
          <p className="text-text-dim mb-1"># Include your API key in the X-API-Key header</p>
          <p>curl -H "X-API-Key: YOUR_KEY" \</p>
          <p className="pl-4">https://api.polyhistorical.com/v1/markets?coin=btc</p>
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-card border border-border rounded-xl w-full max-w-md shadow-2xl">
            {createdKey ? (
              // Success: Show created key
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">API Key Created</h2>
                  <button onClick={closeCreateModal} className="p-1 hover:bg-white/5 rounded-lg">
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-accent-yellow shrink-0" />
                  <p className="text-sm text-accent-yellow">
                    Copy this key now. It won't be shown again.
                  </p>
                </div>

                <div className="bg-surface-base rounded-lg p-4 flex items-center gap-3">
                  <code className="text-sm font-mono flex-1 break-all">{createdKey}</code>
                  <button
                    onClick={() => handleCopyKey(createdKey)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedKey ? (
                      <Check className="w-4 h-4 text-accent-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-text-muted" />
                    )}
                  </button>
                </div>

                <button
                  onClick={closeCreateModal}
                  className="btn-primary w-full justify-center py-3 text-sm mt-6"
                >
                  Done
                </button>
              </div>
            ) : (
              // Form: Create new key
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Create New API Key</h2>
                  <button onClick={closeCreateModal} className="p-1 hover:bg-white/5 rounded-lg">
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>

                {createError && (
                  <div className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm rounded-lg px-4 py-3 mb-4">
                    {createError}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Name</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production Key"
                      className="w-full bg-surface-base border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-dim"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Expires In (days)</label>
                    <input
                      type="number"
                      value={newKeyExpiry}
                      onChange={(e) => setNewKeyExpiry(e.target.value)}
                      placeholder="90"
                      min="1"
                      max="365"
                      className="w-full bg-surface-base border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-dim"
                    />
                    <p className="text-xs text-text-dim mt-1.5">1-365 days. Leave empty for no expiration.</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeCreateModal}
                    className="flex-1 py-3 rounded-lg border border-border text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateKey}
                    disabled={createLoading}
                    className="flex-1 btn-primary justify-center py-3 text-sm disabled:opacity-50"
                  >
                    {createLoading ? 'Creating...' : 'Create Key'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // ── Render: Profile Tab ──
  const renderProfile = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Profile</h1>
        <p className="text-text-muted text-sm">View and manage your account details</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="card">
          <div className="bg-surface-card-hover px-6 py-4 rounded-t-xl border-b border-border">
            <h2 className="font-semibold">Account Information</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-surface-base flex items-center justify-center">
                <User className="w-10 h-10 text-text-dim" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-text-muted">Email</span>
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-text-muted">Name</span>
                <span className="text-sm font-medium">{user?.companyName || '-'}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-text-muted">Plan</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {user?.tier?.toLowerCase() || 'Free'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-text-muted">Subscription</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {user?.tier?.toLowerCase() || 'free'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-text-muted">Account Status</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  user?.emailVerified
                    ? 'bg-accent-green/10 text-accent-green'
                    : 'bg-accent-yellow/10 text-accent-yellow'
                }`}>
                  {user?.emailVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                to="/pricing"
                className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Upgrade To Pro
              </Link>
              <button
                onClick={() => handleNavClick('billing')}
                className="text-sm py-2.5 px-5 rounded-lg border border-border hover:bg-white/5 transition-colors font-medium"
              >
                Open Billing
              </button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="card">
          <div className="bg-surface-card-hover px-6 py-4 rounded-t-xl border-b border-border">
            <h2 className="font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Change Password
            </h2>
          </div>
          <div className="p-6">
            {passwordError && (
              <div className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm rounded-lg px-4 py-3 mb-4">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm rounded-lg px-4 py-3 mb-4">
                {passwordSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-surface-base border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-dim"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-surface-base border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-dim"
                />
                <p className="text-xs text-text-dim mt-1.5">Min 8 chars, 1 uppercase, 1 lowercase, 1 digit</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-surface-base border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-text-dim"
                />
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="btn-primary text-sm py-3 px-6 mt-6 disabled:opacity-50"
            >
              {passwordLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Render: Home Tab ──
  const renderHome = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {displayName}</h1>
        <p className="text-text-muted text-sm">Your dashboard overview</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        {/* Current Plan */}
        <div className="lg:col-span-3 card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Current Plan</span>
            <span className="text-sm text-text-muted">{currentTierConfig.name}</span>
          </div>

          <h2 className="text-xl font-bold mb-1">
            {currentTierConfig.name} Plan
          </h2>
          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-3xl font-bold text-primary">
              {currentTierConfig.price}
            </span>
            {currentTierConfig.period && <span className="text-text-muted text-sm">/{currentTierConfig.period === 'No card required' ? 'mo' : currentTierConfig.period.replace('per ', '')}</span>}
          </div>

          <div className="bg-surface-base rounded-lg p-4 mb-5 space-y-3">
            <div className="flex items-center gap-3">
              <KeyRound className="w-4 h-4 text-text-muted" />
              <span className="text-sm">
                <span className="font-semibold">{activeKeyCount}</span>
                <span className="text-text-muted"> / {maxApiKeys} API Keys</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CircleDot className="w-4 h-4 text-accent-green" />
              <span className="text-sm">Active</span>
            </div>
          </div>

          <div className="mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Plan Includes:</span>
            <ul className="mt-3 space-y-2.5">
              {currentTierConfig.dashboardFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <CircleDot className="w-4 h-4 text-text-dim shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {user?.tier === 'PRO' || user?.tier === 'ENTERPRISE' ? (
            <div className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent-green/10 text-accent-green text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              {user?.tier === 'PRO' ? 'Pro Plan Active' : 'Enterprise Active'}
            </div>
          ) : (
            <button
              onClick={handleUpgrade}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </button>
          )}
        </div>

        {/* API Usage */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">API Usage</span>
            <span className="text-xs text-text-muted">Last 30 days</span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-2xl font-bold">{usageStats?.requestsThisMonth ?? 0}</p>
              <p className="text-sm text-text-muted mt-1">Total Requests</p>
              <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, usageStats?.usagePercentage ?? 0)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-accent-green">{usageStats?.successfulRequests ?? 0}</p>
              <p className="text-sm text-text-muted mt-1">Successful Requests</p>
              <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                <div className="h-full bg-accent-green rounded-full" style={{ width: `${Math.min(100, ((usageStats?.successfulRequests ?? 0) / Math.max(1, usageStats?.requestsThisMonth ?? 1)) * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-accent-red">{usageStats?.rateLimitedRequests ?? 0}</p>
              <p className="text-sm text-text-muted mt-1">Rate Limited</p>
              <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                <div className="h-full bg-accent-red rounded-full" style={{ width: `${Math.min(100, ((usageStats?.rateLimitedRequests ?? 0) / Math.max(1, usageStats?.requestsThisMonth ?? 1)) * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold">{usageStats?.endpointsUsed ?? 0}</p>
              <p className="text-sm text-text-muted mt-1">Endpoints Used</p>
              <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, ((usageStats?.endpointsUsed ?? 0) / 10) * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold">{usageStats?.averageLatencyMs ?? 0}</p>
              <p className="text-sm text-text-muted mt-1">Avg. Latency (ms)</p>
              <div className="mt-2 h-1.5 bg-surface-base rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, ((usageStats?.averageLatencyMs ?? 0) / 200) * 100)}%` }} />
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
  );

  return (
    <div className="min-h-screen flex bg-surface-base">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border shrink-0 flex flex-col h-screen sticky top-0">
        <Link to="/" className="p-5 flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg">PolyHistorical</span>
        </Link>

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

        {user?.tier !== 'PRO' && user?.tier !== 'ENTERPRISE' && (
          <div className="px-3 pb-3">
            <button
              onClick={handleUpgrade}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </button>
          </div>
        )}

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
                onClick={() => { handleNavClick('profile'); setUserMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Profile
              </button>
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
          {activeNav === 'home' && renderHome()}
          {activeNav === 'api-keys' && renderApiKeys()}
          {activeNav === 'profile' && renderProfile()}
          {activeNav === 'billing' && (
            <div>
              <h1 className="text-2xl font-bold mb-1">Billing</h1>
              <p className="text-text-muted text-sm mb-8">Manage your subscription and invoice history</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Current Plan */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider text-text-muted uppercase">Current Plan</span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-surface-alt text-text-muted border border-border">
                      {currentTierConfig.badge || currentTierConfig.name}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{currentTierConfig.name}</h2>
                  <p className="text-text-muted text-sm mb-6">{currentTierConfig.price} /mo</p>
                  <button
                    onClick={() => setShowPlansModal(true)}
                    className="block w-full text-center py-2.5 rounded-lg text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    View Plans
                  </button>
                </div>

                {/* Plan Limits */}
                <div className="card p-6">
                  <span className="text-xs font-semibold tracking-wider text-text-muted uppercase">Plan Limits</span>
                  <div className="mt-4 space-y-0 divide-y divide-border">
                    {currentTierConfig.marketAccess.map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-3">
                        <span className="text-sm text-text-secondary">Market History ({m.label.replace('BTC ', '').replace('ETH ', '')})</span>
                        <span className="text-xs font-medium px-2.5 py-1 rounded bg-surface-alt text-text-muted border border-border">
                          {m.limit === 'All' ? 'Unlimited' : `Last ${m.limit}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unlock Pro Benefits */}
                <div className="card p-6 border-primary/30">
                  <span className="text-xs font-semibold tracking-wider text-text-muted uppercase">Unlock Pro Benefits</span>
                  <div className="mt-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-text-secondary">Unlimited Market History</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-text-secondary">Priority Support</span>
                    </div>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    disabled={user?.tier === 'PRO' || user?.tier === 'ENTERPRISE'}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold btn-primary justify-center disabled:opacity-50"
                  >
                    {user?.tier === 'PRO' || user?.tier === 'ENTERPRISE' ? 'Current Plan' : 'Upgrade to Pro'}
                  </button>
                </div>
              </div>

              {/* Invoice History */}
              <div className="card p-6">
                <span className="text-xs font-semibold tracking-wider text-text-muted uppercase">Invoice History</span>
                <p className="text-text-muted text-sm mt-4">No invoices yet.</p>
              </div>

              {/* Choose Your Plan Modal */}
              {showPlansModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPlansModal(false)}>
                  <div className="bg-surface-raised border border-border rounded-2xl p-8 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Choose Your Plan</h2>
                      <button onClick={() => setShowPlansModal(false)} className="text-text-muted hover:text-text-primary transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <PricingCards />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <PaymentMethodModal open={showPaymentMethodModal} onClose={() => setShowPaymentMethodModal(false)} />
    </div>
  );
}
