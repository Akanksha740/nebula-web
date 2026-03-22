import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, RefreshCw } from 'lucide-react';
import { Logo } from '../components/Logo';
import { api } from '../lib/api';

export function CheckEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setError('');
    try {
      await api.resendVerification(email);
      setResent(true);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.response?.data?.message || 'Failed to resend. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <div className="card p-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Logo />
          </Link>

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-text-muted text-sm mb-2">
            We've sent a verification link to
          </p>
          {email && (
            <p className="text-text-primary font-medium text-sm mb-6">{email}</p>
          )}
          <p className="text-text-muted text-sm mb-8">
            Click the link in the email to verify your account, then log in.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm">
              {error}
            </div>
          )}

          {resent ? (
            <p className="text-accent-green text-sm mb-6">Verification email resent!</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending || !email}
              className="btn-secondary w-full justify-center py-3 text-sm mb-4 disabled:opacity-50"
            >
              {resending ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Resend verification email'}
            </button>
          )}

          <Link
            to="/login"
            className="btn-primary w-full justify-center py-3 text-sm"
          >
            Go to Login
          </Link>

          <p className="text-text-dim text-xs mt-6">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
