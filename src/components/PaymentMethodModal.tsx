import { useState } from 'react';
import { X, CreditCard, Bitcoin } from 'lucide-react';
import { api } from '../lib/api';

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentMethodModal({ open, onClose }: PaymentMethodModalProps) {
  const [loading, setLoading] = useState<'usd' | 'crypto' | null>(null);
  const [error, setError] = useState('');

  if (!open) return null;

  const handlePayment = async (method: 'usd' | 'crypto') => {
    setLoading(method);
    setError('');
    try {
      const res = method === 'usd'
        ? await api.createCheckout('PRO')
        : await api.createCryptoCheckout('PRO');
      const checkoutUrl = res?.data?.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-raised border border-border rounded-2xl p-8 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Choose Payment Method</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-text-muted text-sm mb-6">
          Select how you'd like to pay for the Pro plan ($11/mo).
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handlePayment('usd')}
            disabled={loading !== null}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-card/50 transition-all disabled:opacity-50 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {loading === 'usd' ? 'Redirecting...' : 'Card / PayPal'}
              </div>
              <div className="text-text-muted text-xs mt-0.5">
                Visa, MasterCard, Amex, PayPal
              </div>
            </div>
          </button>

          <button
            onClick={() => handlePayment('crypto')}
            disabled={loading !== null}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-card/50 transition-all disabled:opacity-50 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
              <Bitcoin className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {loading === 'crypto' ? 'Redirecting...' : 'Cryptocurrency'}
              </div>
              <div className="text-text-muted text-xs mt-0.5">
                BTC, ETH, USDT, and more
              </div>
            </div>
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
