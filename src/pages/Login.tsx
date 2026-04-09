import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { api } from '../lib/api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGoogleResponse = useRef(async (response: { credential: string }) => {
    const showError = (msg: string) => {
      const el = document.getElementById('login-error');
      if (el) { el.textContent = msg; el.style.display = 'block'; }
    };
    const hideError = () => {
      const el = document.getElementById('login-error');
      if (el) { el.style.display = 'none'; }
    };

    hideError();
    try {
      const res = await api.googleAuth(response.credential);

      if (res.success && res.data?.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.customer));

        const pendingProTrial = localStorage.getItem('pendingProTrial');
        if (pendingProTrial) {
          localStorage.removeItem('pendingProTrial');
          navigateRef.current('/pro-trial');
          return;
        }

        const pendingPlan = localStorage.getItem('pendingPlan');
        if (pendingPlan === 'PRO') {
          localStorage.removeItem('pendingPlan');
          try {
            const checkout = await api.createCheckout('PRO');
            const checkoutUrl = checkout?.data?.checkoutUrl;
            if (checkoutUrl) {
              window.location.href = checkoutUrl;
              return;
            }
          } catch { /* fall through */ }
        }

        navigateRef.current('/dashboard');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error?.message || 'Google sign-in failed. Please try again.';
      showError(msg);
    }
  });

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleBtnRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      (window as any).google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (resp: any) => handleGoogleResponse.current(resp),
      });
      if (googleBtnRef.current) {
        (window as any).google?.accounts.id.renderButton(googleBtnRef.current, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'continue_with',
          width: googleBtnRef.current.offsetWidth,
        });
      }
    };
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setLoading(true);
    try {
      const response = await api.login({ email, password });

      if (response.success && response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.customer));

        const pendingProTrial = localStorage.getItem('pendingProTrial');
        if (pendingProTrial) {
          localStorage.removeItem('pendingProTrial');
          navigate('/pro-trial');
          return;
        }

        // If pending pro upgrade, redirect to checkout
        const pendingPlan = localStorage.getItem('pendingPlan');
        if (pendingPlan === 'PRO') {
          localStorage.removeItem('pendingPlan');
          try {
            const checkout = await api.createCheckout('PRO');
            const checkoutUrl = checkout?.data?.checkoutUrl;
            if (checkoutUrl) {
              window.location.href = checkoutUrl;
              return;
            }
          } catch { /* fall through to dashboard */ }
        }

        navigate('/dashboard');
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <SEO
        title="Log In"
        description="Log in to your PolyHistorical account to manage API keys and access Polymarket historical data."
        path="/login"
      />
      <div className="w-full max-w-md">
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Logo />
            </Link>
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-text-muted text-sm">
              Log in to your PolyHistorical account
            </p>
          </div>

          {/* Error */}
          <div
            id="login-error"
            className="mb-6 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm"
            style={{ display: error ? 'block' : 'none' }}
          >
            {error}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-surface-base border border-border-hover rounded-lg text-text-primary placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-surface-base border border-border-hover rounded-lg text-text-primary placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-primary text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-text-muted hover:text-primary transition-colors">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Log In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border-hover" />
            <span className="text-text-dim text-xs">or</span>
            <div className="flex-1 h-px bg-border-hover" />
          </div>

          {/* Google Sign-In */}
          {GOOGLE_CLIENT_ID ? (
            <div ref={googleBtnRef} className="w-full" />
          ) : (
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-base border border-border-hover rounded-lg text-sm font-medium text-text-muted cursor-not-allowed"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          )}

          {/* Footer */}
          <p className="text-center text-text-muted text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-light font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
