import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Dominat8",
  description: "Start free. Scale as you grow. Simple, honest pricing with no surprises.",
};

const PLANS = [
  {
    name: "Free", price: "$0", period: "forever", desc: "Try it out — no credit card required.",
    features: ["3 AI generations / month", "Vibe & style presets", "HTML download", "Mobile-responsive output", "Share link (7-day)"],
    cta: "Get started free", ctaHref: "https://dominat8.io/builder",
  },
  {
    name: "Starter", price: "$9", period: "per month", desc: "For individuals & side projects.",
    features: ["20 AI generations / month", "Refine & iterate (unlimited)", "Fix agent", "SEO scan + score", "Embed / iframe export", "Share links (90-day)", "Site history"],
    cta: "Start Starter — $9/mo", ctaHref: "https://dominat8.io/builder",
  },
  {
    name: "Pro", price: "$29", period: "per month", desc: "For freelancers & growing businesses.",
    highlight: true, badge: "MOST POPULAR",
    features: ["100 AI generations / month", "Everything in Starter", "A/B variants (2 versions)", "Seasonal variants", "Scheduled auto-rebuild (monthly)", "Password-protected shares", "Deploy to Dominat8 CDN", "Custom domain + auto-SSL", "Priority queue", "Email support"],
    cta: "Start Pro — $29/mo", ctaHref: "https://dominat8.io/builder",
  },
  {
    name: "Agency", price: "$99", period: "per month", desc: "For teams & high-volume builders.",
    features: ["500 AI generations / month", "Everything in Pro", "Scheduled rebuild (weekly)", "White-label output", "API access", "Bulk generation", "5 team seats", "Multi-site dashboard", "SLA + dedicated support"],
    cta: "Start Agency — $99/mo", ctaHref: "https://dominat8.io/builder",
  },
];

const COMPARISON = [
  { feature: "AI generations / month", free: "3", starter: "20", pro: "100", agency: "500" },
  { feature: "Overage per generation", free: "—", starter: "$0.49", pro: "$0.49", agency: "$0.49" },
  { feature: "Vibe / style presets", free: "✓", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "HTML download", free: "✓", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "Refine & iterate", free: "✓", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "Fix agent", free: "—", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "SEO scan", free: "—", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "Embed / iframe export", free: "—", starter: "✓", pro: "✓", agency: "✓" },
  { feature: "Share links", free: "7-day", starter: "90-day", pro: "✓", agency: "✓" },
  { feature: "Password-protected shares", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "A/B variants", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Seasonal variants", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Scheduled rebuild", free: "—", starter: "—", pro: "Monthly", agency: "Weekly" },
  { feature: "Deploy to CDN", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "Custom domain + SSL", free: "—", starter: "—", pro: "✓", agency: "✓" },
  { feature: "White-label output", free: "—", starter: "—", pro: "—", agency: "✓" },
  { feature: "API access", free: "—", starter: "—", pro: "—", agency: "✓" },
  { feature: "Team seats", free: "1", starter: "1", pro: "1", agency: "5" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-d8-black text-d8-text">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-d8-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-9 w-9 items-center justify-center bg-d8-green font-display text-lg font-black text-d8-black"
                 style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}>
              D8
            </div>
            <span className="font-display text-lg font-black tracking-[0.15em] uppercase text-d8-text">
              Dominat8
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
              Home
            </Link>
            <Link href="/templates" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
              Templates
            </Link>
            <a
              href="https://dominat8.io/builder"
              className="neon-cta px-5 py-2.5 text-sm font-black tracking-wide no-underline"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              START BUILDING
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-6 inline-block border border-d8-green/20 bg-d8-green/[0.05] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-d8-green">
            Pricing
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-black leading-tight text-d8-text">
            Simple, honest pricing.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-d8-muted">
            Start free. Scale as you grow. Every generation counts against your quota — no surprises, no gotchas.
          </p>
          <p className="mt-2 text-sm text-d8-muted/60">
            Need more? $0.49 / generation overage on all paid plans.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`neon-border relative flex flex-col bg-d8-surface p-7 ${
                p.highlight ? "border-d8-green/30 shadow-[0_0_40px_rgba(0,255,65,0.08)]" : ""
              }`}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}
            >
              {p.highlight && (
                <>
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-d8-green" />
                  <div className="absolute top-3 right-3 bg-d8-green/20 border border-d8-green/40 px-2 py-0.5 font-mono text-[10px] font-bold text-d8-green uppercase tracking-wider">
                    {p.badge}
                  </div>
                </>
              )}
              <div className="font-display text-sm font-black tracking-[0.2em] text-d8-text uppercase">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-d8-text">{p.price}</span>
                <span className="text-sm text-d8-muted">/ {p.period}</span>
              </div>
              <p className="mt-3 text-sm text-d8-muted">{p.desc}</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-d8-text/80">
                    <span className="mt-0.5 font-mono text-xs text-d8-green">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.ctaHref}
                className={`mt-8 block py-3 text-center text-sm font-black uppercase tracking-widest no-underline transition-all ${
                  p.highlight
                    ? "neon-cta"
                    : "border border-white/10 bg-white/[0.03] text-d8-text hover:border-d8-green/30 hover:text-d8-green"
                }`}
                style={p.highlight ? { clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" } : undefined}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto mt-20 max-w-5xl px-6">
        <h2 className="mb-8 text-center font-display text-3xl font-black text-d8-text">
          Full comparison
        </h2>
        <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-d8-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-d8-muted">Feature</th>
                <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-d8-muted">Free</th>
                <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-d8-muted">Starter</th>
                <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-d8-green">Pro</th>
                <th className="px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-d8-muted">Agency</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-d8-text/80">{row.feature}</td>
                  {[row.free, row.starter, row.pro, row.agency].map((val, j) => (
                    <td key={j} className={`px-4 py-3 text-center ${
                      val === "✓" ? "text-d8-green font-bold" : val === "—" ? "text-d8-muted/30" : "text-d8-text/70"
                    }`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Overage callout */}
      <section className="mx-auto mt-12 max-w-2xl px-6">
        <div className="rounded-lg border border-d8-green/20 bg-d8-green/[0.03] p-6 text-center">
          <p className="text-sm text-d8-text">
            Need to go beyond your quota? All paid plans can generate extra at{" "}
            <span className="font-bold text-d8-green">$0.49 per generation</span> — billed at end of month. No surprises.
          </p>
        </div>
      </section>

      {/* Money-back */}
      <section className="py-12 text-center">
        <p className="text-sm text-d8-muted">
          All plans include a <span className="font-semibold text-d8-text">14-day money-back guarantee</span>.
          Questions? <a href="mailto:hello@dominat8.io" className="text-d8-green no-underline hover:underline">hello@dominat8.io</a>
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] bg-d8-black py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <span className="font-display text-sm font-bold tracking-[0.1em] uppercase text-d8-muted">
            Dominat8
          </span>
          <div className="flex gap-8">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-mono text-xs uppercase tracking-widest text-d8-muted hover:text-d8-green transition-colors no-underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
