import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export function ProCta() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || ''); } catch { return null; } })();
  const isLoggedIn = !!token;
  const isAlreadyPro = user?.tier === 'PRO' || user?.tier === 'ENTERPRISE';

  const handleClick = async () => {
    if (!isLoggedIn) {
      navigate('/signup?plan=pro');
      return;
    }
    if (isAlreadyPro) {
      navigate('/dashboard');
      return;
    }
    setLoading(true);
    try {
      const res = await api.createCheckout('PRO');
      const checkoutUrl = res?.data?.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err: any) {
      alert(err?.response?.data?.error?.message || 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full py-3 rounded-lg font-semibold text-sm text-center btn-primary justify-center disabled:opacity-50"
    >
      {loading ? 'Redirecting...' : isAlreadyPro ? 'Current Plan' : 'Go Pro'}
    </button>
  );
}
