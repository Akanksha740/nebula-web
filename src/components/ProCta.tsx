import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentMethodModal } from './PaymentMethodModal';

export function ProCta() {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const token = localStorage.getItem('token');
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || ''); } catch { return null; } })();
  const isLoggedIn = !!token;
  const isAlreadyPro = user?.tier === 'PRO' || user?.tier === 'ENTERPRISE';

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/signup?plan=pro');
      return;
    }
    if (isAlreadyPro) {
      navigate('/dashboard');
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full py-3 rounded-lg font-semibold text-sm text-center btn-primary justify-center disabled:opacity-50"
      >
        {isAlreadyPro ? 'Current Plan' : 'Go Pro'}
      </button>
      <PaymentMethodModal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </>
  );
}
