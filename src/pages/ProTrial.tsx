import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { ArrowRight, Check, Gift, Zap, BarChart3, Lock, Brain } from 'lucide-react';

const perks = [
  { icon: Zap, title: 'Full History', desc: 'Every market, every tick, from day one' },
  { icon: BarChart3, title: '300ms Resolution', desc: 'Sub-second data, every price movement' },
  { icon: Lock, title: 'Unlimited Calls', desc: 'Pull as much as you need, no caps' },
  { icon: Brain, title: 'Order Book Data', desc: 'Book depth at any point in time' },
];

// Pre-generate particle configs so they're stable across renders
// Multiple concentric rings of particles — evenly spaced, covering the full page
function makeParticles(originY: string) {
  const colors = ['#10B981', '#34D399', '#3B82F6', '#A855F7', '#F97316'];
  const rings = [
    { count: 16, dist: 250, size: 3.5, delayBase: 0 },
    { count: 24, dist: 500, size: 3, delayBase: 0.15 },
    { count: 32, dist: 800, size: 2.5, delayBase: 0.3 },
    { count: 40, dist: 1100, size: 2.5, delayBase: 0.45 },
  ];
  const particles: Array<{
    tx: number; ty: number; size: number; color: string;
    dur: number; delay: number; originY: string;
  }> = [];

  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2;
      particles.push({
        tx: Math.cos(angle) * ring.dist,
        ty: Math.sin(angle) * ring.dist,
        size: ring.size,
        color: colors[(particles.length) % colors.length],
        dur: 2.0 + ring.delayBase * 2,
        delay: ring.delayBase + (i / ring.count) * 0.3,
        originY,
      });
    }
  }
  return particles;
}

const entryParticles = makeParticles('40%');
const successParticles = makeParticles('50%');

export function ProTrial() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activated, setActivated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showEntryBurst, setShowEntryBurst] = useState(true);
  const burstRef = useRef(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!burstRef.current) {
      burstRef.current = true;
      requestAnimationFrame(() => setMounted(true));
      // Hide entry burst after animation completes
      const t = setTimeout(() => setShowEntryBurst(false), 4500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleActivate = async () => {
    if (!token) {
      localStorage.setItem('pendingProTrial', 'true');
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.activateProTrial();
      if (res.success) {
        const user = localStorage.getItem('user');
        if (user) {
          const parsed = JSON.parse(user);
          parsed.tier = res.data.tier;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
        setActivated(true);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderParticles = (particles: typeof entryParticles) => (
    <div className="particle-field">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            top: p.originY, left: '50%',
            width: p.size, height: p.size,
            background: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--glow': p.color,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <SEO
        title={activated ? 'Pro Trial Activated' : 'Free Pro Trial'}
        description="Try PolyHistorical Pro free for 7 days. Full access, no credit card."
        path="/pro-trial"
      />

      <style>{`
        @keyframes particle {
          0%   { transform: translate(0,0) scale(0); opacity: 0; }
          10%  { transform: translate(0,0) scale(1); opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .particle-field { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
        .particle {
          position: absolute; border-radius: 50%;
          animation: particle var(--dur) ease-out var(--delay) forwards;
        }


        @keyframes flash {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .flash-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: radial-gradient(circle at 50% 40%, rgba(16,185,129,0.12) 0%, transparent 60%);
          pointer-events: none;
          animation: flash 1.6s ease-out forwards;
        }

        @keyframes fadeUp   { from { transform: translateY(28px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes scaleIn  { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.15) rotate(4deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes shimmer  { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes glow     { 0%,100% { box-shadow: 0 0 40px -8px rgba(16,185,129,0.12); } 50% { box-shadow: 0 0 80px -8px rgba(16,185,129,0.28); } }
        @keyframes float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        .a-up     { opacity: 0; }
        .a-up.v   { animation: fadeUp .9s ease-out forwards; }
        .d1.v { animation-delay: .2s;  }
        .d2.v { animation-delay: .4s;  }
        .d3.v { animation-delay: .65s; }
        .d4.v { animation-delay: .9s;  }

        .a-scale { opacity: 0; animation: scaleIn .6s cubic-bezier(.17,.67,.35,1.3) forwards; }
        .shimmer-btn {
          background: linear-gradient(110deg, var(--color-primary) 0%, var(--color-primary) 40%, #34D399 50%, var(--color-primary) 60%, var(--color-primary) 100%);
          background-size: 200% 100%; animation: shimmer 2.5s linear infinite;
        }
        .glow-card { animation: glow 3s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-16">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Entry burst — fires on page load */}
        {showEntryBurst && mounted && (
          <>
            <div className="flash-overlay" />
            {renderParticles(entryParticles)}
          </>
        )}

        {/* Success burst — fires on activation */}
        {activated && renderParticles(successParticles)}

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center w-full">

          {activated ? (
            <>
              <div className="w-24 h-24 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center mx-auto mb-8 a-scale">
                <Check className="w-12 h-12 text-primary" strokeWidth={3} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 a-up v d2">You're all set.</h1>
              <p className="text-lg text-text-muted a-up v d3">
                Pro is live for the next 7 days. Full access, no limits.
              </p>
              <div className="a-up v d4 mt-10">
                <button onClick={() => navigate('/dashboard')} className="btn-primary text-lg py-3.5 px-10">
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={`a-up ${mounted ? 'v' : ''} inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-10`}>
                <Gift className="w-4 h-4" /> On the house
              </div>

              <h1 className={`a-up d1 ${mounted ? 'v' : ''} text-5xl md:text-7xl font-bold mb-5 leading-[1.1] tracking-tight`}>
                7 Days of <span className="gradient-text">Pro.</span><br />Zero cost.
              </h1>

              <p className={`a-up d2 ${mounted ? 'v' : ''} text-lg text-text-muted mb-12 max-w-lg mx-auto`}>
                <span className="text-text-primary font-medium">Full access</span> &middot; no card required &middot; cancel never (it just ends)
              </p>

              <div className={`a-up d3 ${mounted ? 'v' : ''} grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12`}>
                {perks.map((p, i) => (
                  <div key={p.title} className="p-4 rounded-xl bg-surface-card border border-border text-center" style={{ animation: mounted ? `float 3s ease-in-out ${i * 0.4}s infinite` : 'none' }}>
                    <p.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium mb-0.5">{p.title}</p>
                    <p className="text-text-dim text-xs leading-snug">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className={`a-up d4 ${mounted ? 'v' : ''} max-w-sm mx-auto`}>
                <div className="rounded-2xl border border-primary/20 bg-surface-card p-8 glow-card">
                  <span className="text-5xl font-bold">$0</span>
                  <p className="text-text-dim text-sm mt-1 mb-6">7 days — normally $11/mo</p>

                  <button
                    onClick={handleActivate}
                    disabled={loading}
                    className="shimmer-btn w-full text-lg py-4 rounded-lg font-semibold text-surface-dark cursor-pointer border-none inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-surface-dark/30 border-t-surface-dark rounded-full animate-spin" />
                        Activating...
                      </span>
                    ) : (
                      <>Click Here to Redeem <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>

                  {error && (
                    <div className="mt-4 p-3 rounded-lg bg-accent-red/10 border border-accent-red/20 text-accent-red text-sm">{error}</div>
                  )}

                  <p className="text-text-dim text-xs mt-5">
                    no credit card &middot; auto-expires in 7 days &middot; nothing to cancel
                  </p>
                </div>
              </div>

              <p className={`a-up d4 ${mounted ? 'v' : ''} text-text-dim text-sm mt-10`}>
                No catch. Back to Starter automatically after 7 days.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
