import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Logo } from '../components/Logo';
import { api } from '../lib/api';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    api.verifyEmail(token)
      .then(() => {
        setStatus('success');
        setMessage('Your email has been verified successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((err: any) => {
        setStatus('error');
        setMessage(err?.response?.data?.error?.message || err?.response?.data?.message || 'Verification failed. The link may have expired.');
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <div className="card p-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Logo />
          </Link>

          {status === 'loading' && (
            <>
              <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
              <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
              <p className="text-text-muted text-sm">Please wait a moment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-accent-green" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Email verified!</h1>
              <p className="text-text-muted text-sm mb-8">{message}</p>
              <Link to="/login" className="btn-primary w-full justify-center py-3 text-sm">
                Log in to your account
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-accent-red/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-accent-red" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verification failed</h1>
              <p className="text-text-muted text-sm mb-8">{message}</p>
              <Link to="/signup" className="btn-primary w-full justify-center py-3 text-sm">
                Try signing up again
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
