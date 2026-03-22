import { Link } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { pricingPlans, tierConfigs } from '../lib/pricing';
import { ProCta } from '../components/ProCta';

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect immediately. Downgrades apply at the end of the current billing cycle.',
  },
  {
    q: 'What payment methods work?',
    a: 'Visa, MasterCard, American Express, and PayPal. Enterprise customers can pay by invoice.',
  },
  {
    q: 'Is there a Pro trial?',
    a: 'The free tier lets you evaluate the data with full depth and resolution. Need to test Pro limits? Reach out and we can arrange access.',
  },
  {
    q: 'What happens if I exceed rate limits?',
    a: 'The API returns 429 with a Retry-After header. Upgrade to Pro or Enterprise for higher limits.',
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-text-muted text-lg max-w-lg mx-auto">
            Start free. Upgrade when you need unlimited history or higher throughput.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
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
                </div>

                {/* Market History Access Table */}
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
        </div>
      </section>

      {/* Rate limits table */}
      <section className="py-16 bg-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-center mb-8">Rate limits by plan</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-base">
                  <th className="text-left py-3 px-5 text-text-muted font-medium">Plan</th>
                  <th className="text-center py-3 px-5 text-text-muted font-medium">Req/min</th>
                  <th className="text-center py-3 px-5 text-text-muted font-medium">Req/day</th>
                </tr>
              </thead>
              <tbody>
                {tierConfigs.map((t) => (
                  <tr key={t.tier} className="border-t border-border">
                    <td className="py-3 px-5">{t.name}</td>
                    <td className="py-3 px-5 text-center font-mono">{t.rateLimit.reqPerMin}</td>
                    <td className="py-3 px-5 text-center font-mono">{t.rateLimit.reqPerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-center mb-10">Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surface-card/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-text-muted text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-text-muted mb-8">No credit card required for the free tier.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/signup" className="btn-primary">
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="mailto:sales@polyhistorical.com" className="btn-secondary">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
