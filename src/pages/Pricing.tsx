import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'Forever',
    description: 'Get started with limited access',
    features: [
      { text: 'BTC 5m & 15m - Last 50 markets', included: true },
      { text: 'BTC 1h & 4h - Last 24 markets', included: true },
      { text: 'BTC 24h - Last 5 markets', included: true },
      { text: 'Unlimited Snapshots', included: true },
      { text: 'Sub-second resolution', included: true },
      { text: 'Full order book depth', included: true },
      { text: 'Historical timestamp queries', included: true },
      { text: 'Binance Spot and Futures Data', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'Unlimited access to everything',
    features: [
      { text: 'BTC 5m & 15m - Unlimited', included: true },
      { text: 'BTC 1h & 4h - Unlimited', included: true },
      { text: 'BTC 24h - Unlimited', included: true },
      { text: 'Binance Spot & Futures data', included: true },
      { text: 'Unlimited Market History', included: true },
      { text: 'Sub-second resolution', included: true },
      { text: 'Full order book depth', included: true },
      { text: 'Priority Support', included: true },
    ],
    cta: 'Get Pro',
    ctaLink: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring scale',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Custom API Endpoints', included: true },
      { text: 'Dedicated Server Infrastructure', included: true },
      { text: 'Tailored Rate Limits', included: true },
      { text: 'White-glove Onboarding', included: true },
      { text: 'SLA Guarantees', included: true },
      { text: 'Custom Data Exports', included: true },
      { text: 'Direct Engineering Support', included: true },
    ],
    cta: 'Contact Us',
    ctaLink: 'mailto:enterprise@nebula.io',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'The Basic plan is free forever and gives you a great way to evaluate our data. If you need to test Pro features, contact us for a trial.',
  },
  {
    question: 'What happens if I exceed rate limits?',
    answer: 'If you exceed your rate limits, API requests will return a 429 status code. Consider upgrading to Pro or Enterprise for higher limits.',
  },
];

export function Pricing() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-text-muted">
              Start for free, upgrade for power. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-text-muted">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-start gap-2 text-sm ${
                        feature.included ? '' : 'text-text-dim'
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-accent-green mt-0.5 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 mt-0.5 shrink-0 text-center">—</span>
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaLink}
                  className={`w-full py-3 rounded-lg font-semibold text-center ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Limits Comparison */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Rate Limits</h2>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-dark">
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-muted">Plan</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Requests/minute</th>
                  <th className="text-center py-4 px-6 text-sm font-medium text-text-muted">Requests/day</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="py-4 px-6">Basic (Free)</td>
                  <td className="py-4 px-6 text-center">60</td>
                  <td className="py-4 px-6 text-center">1,000</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-4 px-6">Pro</td>
                  <td className="py-4 px-6 text-center">300</td>
                  <td className="py-4 px-6 text-center">50,000</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-4 px-6">Enterprise</td>
                  <td className="py-4 px-6 text-center">Custom</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-text-muted mb-8">
            Start with our free tier and upgrade as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary inline-flex items-center gap-2 justify-center">
              Start Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="mailto:sales@nebula.io" className="btn-secondary">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
