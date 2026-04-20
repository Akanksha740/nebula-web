import { SEO } from '../components/SEO';

export function Terms() {
  return (
    <div className="pt-28 pb-24">
      <SEO
        title="Terms of Service"
        description="The terms governing your use of the PolyHistorical API and website. Read-only historical Polymarket data, no AI agent, no model training on your queries."
        path="/terms"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Terms of Service</h1>
            <p className="text-text-muted text-sm font-mono">Last updated: April 10, 2026</p>
          </div>

          <div className="space-y-12 text-text-muted leading-relaxed">

            {/* ── 1 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
              <p>
                By creating a PolyHistorical account, generating an API key, or otherwise using the service at <span className="font-mono text-text-primary">polyhistorical.com</span> and <span className="font-mono text-text-primary">api.polyhistorical.com</span>, you agree to these Terms. If you are using the service on behalf of an organization, you confirm you have authority to bind that organization. If you do not agree, do not use the service.
              </p>
            </section>

            {/* ── 2 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Description of Service</h2>
              <p className="mb-3">
                PolyHistorical is a read-only historical and live data API for Polymarket BTC, ETH, and SOL Up/Down prediction markets. We capture order book snapshots from the Polymarket public CLOB at 300-millisecond intervals, archive them, and serve them via REST and Parquet endpoints for use in backtesting, research, and bot development.
              </p>
              <p>
                We do not place trades, execute strategies, run an AI agent, or interact with Polymarket on your behalf. We are a data provider, nothing more.
              </p>
            </section>

            {/* ── 3 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. Account Registration</h2>
              <p className="mb-3">
                You must be at least 18 years old and legally able to enter a binding contract in your jurisdiction. You agree to provide accurate registration information and to keep it current.
              </p>
              <p>
                You are responsible for safeguarding your API key and account credentials. Any activity performed with your key is treated as authorized activity by you. Notify us immediately if you suspect unauthorized use.
              </p>
            </section>

            {/* ── 4 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. API Usage</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">4.1 Rate Limits and Quotas</h3>
              <p>
                Your plan determines your rate limits. The Free plan is capped at 1,000 requests per day. Paid plans have generous backfill allowances built for bulk historical pulls. Limits and quotas are documented at <span className="font-mono text-text-primary">docs.polyhistorical.com</span> and may be revised with reasonable notice.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">4.2 Automated Use</h3>
              <p>
                Automated and programmatic use is explicitly permitted and encouraged. Bots, scripts, notebooks, and CI pipelines are first-class clients of this service. You do not need a separate license to call the API from a trading bot.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">4.3 API Credentials</h3>
              <p>
                Your API key is yours alone. Do not share it, embed it in client-side code, or commit it to a public repository. You are responsible for any usage tied to your key, including charges incurred if a leaked key drives traffic above your plan limits.
              </p>
            </section>

            {/* ── 5 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Acceptable Use</h2>
              <p className="mb-4">You agree not to:</p>

              <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">5.1 Resell Without Authorization</h3>
              <p>
                Resell, redistribute, sublicense, or commercially repackage the raw historical archive without a written enterprise agreement. Building a derivative product or research artifact on top of the data is fine; reselling the data itself is not.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.2 Circumvent Controls</h3>
              <p>
                Bypass or attempt to bypass rate limits, authentication, billing controls, or any other technical safeguard. Stress-testing the service beyond your contracted plan is treated as abuse.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.3 Disrupt the Service</h3>
              <p>
                Use the service in any way that disrupts, attacks, probes, or degrades PolyHistorical infrastructure or another customer's experience.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.4 Misrepresent the Source</h3>
              <p>
                Misrepresent the origin of the data or imply an endorsement, sponsorship, or affiliation with PolyHistorical or Polymarket where none exists.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.5 Harm Other Participants</h3>
              <p>
                Use the data to harass, defame, or attempt to manipulate other Polymarket participants.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.6 Violate Applicable Law</h3>
              <p>
                Violate any law in your jurisdiction or in the jurisdictions you trade from, including export controls, sanctions, securities regulation, and consumer protection law.
              </p>
            </section>

            {/* ── 6 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Subscription Plans and Billing</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.1 Plans</h3>
              <p>
                PolyHistorical offers a free tier and paid subscription plans. Plan details, including rate limits and feature scope, are published on the pricing page and may evolve over time.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.2 Billing Cycle</h3>
              <p>
                Paid subscriptions are billed in advance on a recurring basis through our payment processor. The first charge takes effect when you upgrade and recurs at the same interval until you cancel.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.3 Cancellation and Refunds</h3>
              <p>
                You can cancel from your dashboard at any time. Cancellation takes effect at the end of the current billing period and is not pro-rated. We do not offer refunds for partial months.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.4 Price and Plan Changes</h3>
              <p>
                If we materially change pricing or plan limits, we will give existing subscribers at least 14 days notice before the change takes effect on their account. You may cancel before the change applies.
              </p>
            </section>

            {/* ── 7 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">7. Data Accuracy and Backtest Disclaimer</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">7.1 Best-Effort Capture</h3>
              <p>
                We capture data from the Polymarket public CLOB on a best-effort basis. Despite our care, snapshots may be missing, delayed, duplicated, or contain artifacts of network or upstream issues. We make no warranty as to the completeness, timeliness, or accuracy of any specific snapshot, market, or timeframe.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">7.2 Past Performance Is Not Future Performance</h3>
              <p>
                <strong className="text-text-primary">Backtested performance is not a guarantee of live trading results.</strong> Strategies that look profitable in historical data routinely fail in live execution due to slippage, latency, market structure changes, fees, behavioral effects, and luck. You assume all risk associated with any decisions made using PolyHistorical data, including financial loss.
              </p>
            </section>

            {/* ── 8 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">8. Intellectual Property</h2>
              <p className="mb-3">
                PolyHistorical retains all rights to the service, the website, the API, the codebase, and the curated archive. Nothing in these Terms transfers ownership of any of those to you.
              </p>
              <p>
                You retain ownership of any code, models, dashboards, papers, or other derivative work that you build using the data. You may use the data in private and commercial projects, including bots that trade real capital, provided you comply with Section 5.
              </p>
            </section>

            {/* ── 9 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">9. Independent Service</h2>
              <p>
                PolyHistorical is an independent project. We are not affiliated with, endorsed by, sponsored by, or connected to Polymarket, the Polymarket team, or any prediction market exchange. All trademarks belong to their respective owners. References to Polymarket on this site are descriptive, not promotional.
              </p>
            </section>

            {/* ── 10 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">10. Disclaimer of Warranties</h2>
              <p>
                The service is provided <strong className="text-text-primary">as is</strong> and <strong className="text-text-primary">as available</strong>, without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, title, or non-infringement. We do not warrant that the service will be uninterrupted, error-free, or secure against every conceivable threat.
              </p>
            </section>

            {/* ── 11 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">11. Limitation of Liability</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">11.1 Excluded Damages</h3>
              <p>
                To the maximum extent permitted by law, PolyHistorical and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or trading capital, arising from your use of or inability to use the service.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">11.2 Liability Cap</h3>
              <p>
                Our total liability for any direct damages is limited to the greater of (a) the fees you paid PolyHistorical in the twelve months preceding the claim, or (b) one hundred US dollars.
              </p>
            </section>

            {/* ── 12 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PolyHistorical and its operators from any claim, demand, loss, or expense (including reasonable legal fees) arising out of your breach of these Terms, your violation of applicable law, or your use of the service in a way that infringes on a third party's rights.
              </p>
            </section>

            {/* ── 13 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">13. Termination</h2>
              <p>
                You may terminate your account at any time from your dashboard. We may suspend or terminate accounts that violate Section 5, fail to pay, or pose a security or operational risk to the service. We will, where reasonable, give notice and an opportunity to cure before terminating a paid account.
              </p>
            </section>

            {/* ── 14 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">14. Changes to These Terms</h2>
              <p>
                We may update these Terms over time. Material changes will be announced on the website and, where you are an account holder, by email. Continued use of the service after a change takes effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* ── 15 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">15. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which PolyHistorical's operating entity is registered, without regard to conflict-of-law principles. Disputes will be resolved in the courts of that jurisdiction unless an applicable consumer protection law gives you a stronger right.
              </p>
            </section>

            {/* ── 16 ── */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">16. Contact</h2>
              <p>
                Questions about these Terms? Email <a href="mailto:support@polyhistorical.com" className="text-primary hover:text-primary-light font-mono">support@polyhistorical.com</a>.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
