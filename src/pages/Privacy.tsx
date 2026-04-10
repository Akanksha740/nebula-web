import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <div className="pt-20 pb-24">
      <SEO
        title="Privacy Policy"
        description="What PolyHistorical collects, what we don't, and how we handle it. We don't sell your data, we don't train models on your queries, we don't share with advertisers."
        path="/privacy"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Privacy Policy</h1>
            <p className="text-text-muted text-sm font-mono">Last updated: April 10, 2026</p>
          </div>

          {/* Plain-English summary up top */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 mb-12">
            <div className="text-[10px] text-primary uppercase tracking-widest mb-3 font-semibold">The short version</div>
            <ul className="space-y-2 text-text-muted text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary shrink-0 select-none">·</span>
                <span>We collect what we need to run the API and bill you. Nothing more.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0 select-none">·</span>
                <span>We <strong className="text-text-primary">do not sell your data</strong>. Not now, not ever.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0 select-none">·</span>
                <span>We <strong className="text-text-primary">do not train models</strong> on your API queries, your account information, or anything you do with the data.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0 select-none">·</span>
                <span>We <strong className="text-text-primary">do not see what your bot trades</strong>. Your strategies stay yours.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0 select-none">·</span>
                <span>Servers and storage are in the EU. Payments go through Stripe. Analytics are self-hosted.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-10 text-text-muted leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">1. Introduction</h2>
              <p>
                This Privacy Policy describes how PolyHistorical collects, uses, stores, and shares information when you visit <span className="font-mono text-text-primary">polyhistorical.com</span> or call the <span className="font-mono text-text-primary">api.polyhistorical.com</span> endpoints. It applies to anyone who creates an account, generates an API key, makes a payment, or browses the public marketing site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">2. Information We Collect</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">2.1 Account Information</h3>
              <p>When you sign up, we collect your email address and a hashed password (we never see or store the plaintext). If you sign up via OAuth, we receive the basic profile fields the provider exposes — typically your name, email, and avatar URL.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">2.2 Billing Information</h3>
              <p>Paid subscriptions are processed by Stripe. PolyHistorical does not store, log, or have direct access to your payment card number, CVC, or full card data. We retain only the metadata Stripe sends us — the last four digits of the card, the country, and the subscription state — so we can show your plan in the dashboard.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">2.3 API Usage Logs</h3>
              <p>When your bot calls the API, we log the request method, endpoint, status code, response size, latency, and the API key making the call. We use these logs to enforce rate limits, debug outages, and detect abuse. We do <strong className="text-text-primary">not</strong> log query parameters that contain personal information, and we do <strong className="text-text-primary">not</strong> log request bodies for read endpoints.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">2.4 Web Analytics</h3>
              <p>The marketing site uses a self-hosted instance of Umami for traffic analytics. Umami is privacy-preserving by design — it does not use cookies, does not track users across sites, and does not collect IP addresses or personally identifying browser data. We see aggregate page views and referral sources, nothing more.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">2.5 What We Do Not Collect</h3>
              <p>
                We do not collect, infer, or store information about what your bot does with the data after you download it. We do not see your trades on Polymarket. We do not see your wallet addresses. We do not see the strategies you build, the backtests you run, or the models you train. The data leaves our API and what happens after that is none of our business.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information described in Section 2 to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Operate the API, authenticate requests, and enforce plan limits.</li>
                <li>Process payments and manage subscription state.</li>
                <li>Send transactional email — receipts, password resets, plan changes, security notices, and outage notifications.</li>
                <li>Detect and respond to abuse, fraud, and security incidents.</li>
                <li>Reply to your support emails when you write to the desk.</li>
                <li>Aggregate anonymous usage statistics to inform what to build next.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">4. What We Do Not Do With Your Data</h2>
              <p className="mb-3">
                Some data products in this category use customer data to train AI models, retarget ads, or sell to third-party brokers. PolyHistorical does not do any of that. Specifically:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We do not sell, rent, or trade your personal information.</li>
                <li>We do not train machine learning models on your API queries, your account information, or anything else you do on the platform.</li>
                <li>We do not share data with advertisers or ad networks.</li>
                <li>We do not run third-party tracking scripts on the marketing site.</li>
                <li>We do not run a marketing automation pipeline that scores or profiles you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">5. Storage and Security</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.1 Where Your Data Lives</h3>
              <p>
                Account data, billing metadata, and API logs are stored in encrypted PostgreSQL on infrastructure hosted in the European Union. Backups are encrypted at rest. Connections to the API and the website are encrypted in transit using TLS 1.2 or higher.
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">5.2 Incident Response</h3>
              <p>
                No system is unbreakable. If we discover a security incident affecting your account, we will notify you by email without undue delay and describe what happened, what data was involved, and what steps we are taking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">6. Data Retention</h2>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.1 Account Data</h3>
              <p>
                Account information is retained for as long as your account is active. If you delete your account, we delete account information within 30 days, except where we are legally required to retain it (for example, billing records for tax purposes).
              </p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">6.2 API Request Logs</h3>
              <p>
                API request logs are retained for 90 days for abuse-prevention and operational purposes, then anonymized or deleted. Aggregate metrics — request counts, latency percentiles, status code distributions — may be retained indefinitely in a non-personally-identifying form.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">7. Your Rights</h2>
              <p className="mb-3">
                Depending on your jurisdiction, you may have the right to access, correct, export, restrict, or delete the personal information we hold about you, and to object to certain processing. To exercise any of these rights, email <a href="mailto:support@polyhistorical.com" className="text-primary hover:text-primary-light font-mono">support@polyhistorical.com</a>. We will respond within 30 days.
              </p>
              <p>You can also delete your account at any time from the dashboard, which deletes most of your personal data automatically.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">8. Cookies</h2>
              <p>
                The website uses a single first-party session cookie to keep you logged in after you sign in. We do not use third-party advertising cookies, retargeting pixels, or cross-site tracking. The Umami analytics layer is cookieless.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">9. Third-Party Services</h2>
              <p className="mb-4">PolyHistorical relies on a small number of vetted third parties to operate the service:</p>

              <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">9.1 Stripe — Payment Processing</h3>
              <p>Stripe processes paid subscriptions and receives the data necessary to charge your card. We do not store card numbers ourselves. See Stripe's privacy policy for what they collect.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">9.2 Hetzner — Infrastructure</h3>
              <p>Servers, databases, and storage live on Hetzner Cloud in the European Union. Hetzner is the operator of the physical and virtual infrastructure that the service runs on.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">9.3 Umami (self-hosted) — Web Analytics</h3>
              <p>The marketing site uses a self-hosted instance of Umami for traffic analytics. Umami runs on our own infrastructure, not on a vendor's. It is cookieless and does not collect IP addresses or personally identifying browser data.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">9.4 Email Provider</h3>
              <p>Transactional email — receipts, password resets, plan changes, security notices — is delivered via a third-party email service. The provider receives the recipient address and the message content.</p>

              <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">9.5 Limits on Sharing</h3>
              <p>We do not share PolyHistorical user data with any third party except as required to deliver the service above or to comply with a lawful legal request. We have never received a national security letter and do not currently have any government data-sharing agreements.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">10. International Transfers</h2>
              <p>
                Our primary infrastructure is located in the European Union. If you access the service from outside the EU, your information will be transferred to and processed on servers located in the EU. We rely on standard contractual clauses and equivalent legal mechanisms where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">11. Children</h2>
              <p>
                PolyHistorical is not intended for use by anyone under 18. We do not knowingly collect personal information from children. If you believe a child has created an account, contact us and we will delete the account and the associated data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy as the service evolves. Material changes will be announced on the website and, where you are an account holder, by email. The "Last updated" date at the top of this page reflects the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">13. Contact</h2>
              <p>
                Privacy questions, data requests, or anything else? Email <a href="mailto:support@polyhistorical.com" className="text-primary hover:text-primary-light font-mono">support@polyhistorical.com</a> and a real person will read it.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
