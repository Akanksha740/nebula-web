import { Link } from 'react-router-dom';
import { Check, X, Bitcoin } from 'lucide-react';
import { pricingPlans } from '../lib/pricing';
import { ProCta } from './ProCta';

export function PricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
      {pricingPlans.map((plan) => (
        <div
          key={plan.name}
          className={`card p-6 flex flex-col ${plan.highlight ? 'ring-1 ring-primary relative' : ''}`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="font-bold text-xl">{plan.name}</h3>
              {plan.badge && (
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                  {plan.badge}
                </span>
              )}
            </div>
            <div className="text-4xl font-bold mb-1">{plan.price}</div>
            {plan.period && <div className="text-text-muted text-sm">{plan.period}</div>}
            {plan.desc && <p className="text-text-muted text-sm mt-2">{plan.desc}</p>}

            {plan.name === 'Pro' && (
              <div className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1f18] border border-primary/30 text-xs">
                <Bitcoin className="w-3.5 h-3.5 text-[#F7931A] shrink-0" />
                <span className="text-text-muted">Pay with crypto:</span>
                <span className="text-primary font-semibold">$20/2mo</span>
                <span className="text-accent-yellow font-bold">(9% off)</span>
              </div>
            )}
          </div>

          {/* Market History Access */}
          {plan.marketAccess && plan.marketAccess.length > 0 && (
            <div className="border border-border rounded-lg p-4 mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                Market History Access
              </div>
              <div className="space-y-2.5">
                {plan.marketAccess.map((m) => (
                  <div key={m.label} className="flex items-center justify-between text-sm">
                    <span>{m.label}</span>
                    <span className="px-2 py-0.5 bg-surface-base text-text-primary text-xs font-medium rounded border border-border">
                      {m.limit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <ul className="space-y-2.5 mb-8 flex-1">
            {plan.features.map((f) => (
              <li key={f.text} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{f.text}</span>
              </li>
            ))}
            {plan.excludedFeatures?.map((f) => (
              <li key={f.text} className="flex items-start gap-2 text-sm text-text-muted">
                <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          {plan.name === 'Pro' ? (
            <ProCta />
          ) : (
            <Link
              to={plan.ctaLink}
              className={`w-full py-3 rounded-lg font-semibold text-sm text-center ${
                plan.highlight ? 'btn-primary justify-center' : 'btn-secondary justify-center'
              }`}
            >
              {plan.cta}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
