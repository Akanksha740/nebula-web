import { Mail } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Contact() {
  return (
    <div className="pt-20 pb-8">
      <SEO
        title="Contact"
        description="Reach the team behind PolyHistorical. Email or DM for support, billing, and enterprise data inquiries."
        path="/contact"
      />

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* terminal eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary">contact</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.05] tracking-tight">
            Get in <span className="gradient-text">touch</span>
          </h1>

          <p className="text-text-muted text-lg leading-relaxed max-w-lg mx-auto mb-14">
            Have a question about the data, API, or an enterprise plan? Reach out.
          </p>

          {/* two airy cards */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            <a
              href="mailto:support@polyhistorical.com"
              className="group flex flex-col items-center gap-4 px-6 py-8 rounded-2xl border border-border hover:border-primary/40 bg-surface-dark/30 hover:bg-surface-dark/60 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-text-dim uppercase tracking-widest mb-1.5">Email</div>
                <div className="text-primary text-sm font-mono group-hover:text-primary-light transition-colors">
                  support@polyhistorical.com
                </div>
              </div>
            </a>

            <a
              href="https://x.com/polyhistorical"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 px-6 py-8 rounded-2xl border border-border hover:border-primary/40 bg-surface-dark/30 hover:bg-surface-dark/60 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-text-dim uppercase tracking-widest mb-1.5">DM on X</div>
                <div className="text-primary text-sm font-mono group-hover:text-primary-light transition-colors">
                  @polyhistorical
                </div>
              </div>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
