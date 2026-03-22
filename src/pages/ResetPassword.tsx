import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { api } from '../lib/api';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form');
  const [error, setError] = useState('');

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="card p-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Logo />
            </Link>
            <div className="w-16 h-16 rounded-full bg-accent-red/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-accent-red" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Invalid reset link</h1>
            <p className="text-text-muted text-sm mb-8">This password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="btn-primary w-full justify-center py-3 text-sm">
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await api.resetPassword(token, password);
      setStatus('success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Failed to reset password. The link may have expired.';
      setError(msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Logo />
            </Link>

            {status === 'success' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-accent-green" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Password reset!</h1>
                <p className="text-text-muted text-sm mb-8">Your password has been updated. Redirecting to login...</p>
                <Link to="/login" className="btn-primary w-full justify-center py-3 text-sm">
                  Log in now
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">Set new password</h1>
                <p className="text-text-muted text-sm">Enter your new password below</p>
              </>
            )}
          </div>

          {status !== 'success' && (
            <>
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">New password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
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

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 bg-surface-base border border-border-hover rounded-lg text-text-primary placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-50"
                >
                  {loading ? 'Resetting...' : 'Reset password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
