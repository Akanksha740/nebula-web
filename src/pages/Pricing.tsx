import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { tierConfigs } from '../lib/pricing';
import { PricingCards } from '../components/PricingCards';

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
      <SEO
        title="Pricing"
        description="Simple pricing for Polymarket historical data. Free tier included. Pro and Enterprise plans for full order book access."
        path="/pricing"
      />
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
          <PricingCards />
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
            <a href="mailto:support@polyhistorical.com" className="btn-secondary">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
