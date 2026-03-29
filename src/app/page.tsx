import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dominat8 — AI-Powered Website Builder",
  description:
    "Build production-ready websites in under 90 seconds. AI-powered, conversion-optimised, and ready to deploy.",
};

/* ============================================================
   DOMINAT8.COM — AI WEBSITE BUILDER
   7 sections. Clean. Professional. Converts.
   ============================================================ */

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-d8-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3 no-underline">
          <div className="flex h-9 w-9 items-center justify-center bg-d8-green font-display text-lg font-black text-d8-black"
               style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}>
            D8
          </div>
          <span className="font-display text-lg font-black tracking-[0.15em] uppercase text-d8-text">
            Dominat8
          </span>
        </a>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
            Features
          </a>
          <a href="#results" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
            Results
          </a>
          <a href="#pricing" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
            Pricing
          </a>
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
  );
}

/* ---- SECTION 1: HERO ---- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center">
        <div className="mb-8 inline-flex items-center gap-3 border border-d8-green/20 bg-d8-green/[0.05] px-4 py-2 rounded-full">
          <span className="inline-block h-2 w-2 rounded-full bg-d8-green animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-d8-green">
            AI BUILDER — LIVE
          </span>
        </div>

        <h1
          className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-d8-text"
        >
          Build production websites
          <br />
          <span className="text-d8-green">in 90 seconds.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-d8-muted md:text-xl">
          Describe your business. Get a conversion-optimised, mobile-ready website
          built by AI in under <span className="font-bold text-d8-text">90 seconds</span>.
          Deploy in <span className="font-bold text-d8-text">5</span>.
          No code. No templates. No compromise.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://dominat8.io/builder"
            className="neon-cta px-10 py-4 text-base font-black tracking-widest no-underline rounded-lg"
            style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
          >
            START BUILDING FREE
          </a>
          <a
            href="#features"
            className="border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold uppercase tracking-widest text-d8-muted hover:border-d8-green/30 hover:text-d8-green transition-all no-underline rounded-lg"
          >
            SEE HOW IT WORKS &darr;
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {[
            { stat: "10,000+", label: "Sites Built" },
            { stat: "<90s", label: "Build Time" },
            { stat: "99.9%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="stat-glow font-display text-4xl font-black md:text-5xl">
                {s.stat}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-d8-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 2: VALUE PROPOSITION ---- */
function ValueProposition() {
  return (
    <section className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
          The way websites are built
          <br />
          <span className="text-d8-green">has fundamentally changed.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-d8-muted">
          AI builds production-ready sites faster than traditional teams can scope them.
          Agencies, freelancers, and founders are already shipping with Dominat8.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              before: "Manual builds",
              after: "AI in 90 seconds",
              detail: "What used to take weeks now takes seconds. Same quality, fraction of the time.",
            },
            {
              before: "Template sites",
              after: "Unique every time",
              detail: "Every site is custom-generated from your brief. No two builds are the same.",
            },
            {
              before: "Launch & hope",
              after: "Conversion-engineered",
              detail: "Built to convert from the ground up. SEO, performance, and accessibility baked in.",
            },
          ].map((item) => (
            <div
              key={item.after}
              className="neon-border bg-d8-surface p-8 text-left rounded-xl"
            >
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-d8-muted/50 line-through">
                {item.before}
              </div>
              <div className="mt-2 font-display text-xl font-black text-d8-green">
                {item.after}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-d8-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 3: HOW IT WORKS ---- */
function HowItWorks() {
  return (
    <section className="relative border-t border-white/[0.04] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
              How it works
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-black leading-tight text-d8-text">
              Describe it. Build it.
              <br />
              Ship it. Done.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-d8-muted">
              From a plain-English description to a production-deployed website.
              No staging environments. No deployment pipelines. No DevOps tickets.
              Just describe what you need and let the AI handle the rest.
            </p>
            <a
              href="https://dominat8.io/builder"
              className="neon-cta mt-8 inline-block px-8 py-3.5 text-sm font-black tracking-widest no-underline rounded-lg"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              TRY IT FREE
            </a>
          </div>

          {/* Terminal mockup */}
          <div className="neon-border overflow-hidden bg-d8-surface">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-d8-black px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-d8-muted">dominat8 — build</span>
            </div>
            <div className="p-5 font-mono text-sm leading-7">
              <div className="text-d8-muted">
                <span className="text-d8-green">$</span> dominat8 build --type agency
              </div>
              <div className="text-d8-muted">
                <span className="text-d8-green">[00:03]</span> Analyzing brief...
              </div>
              <div className="text-d8-muted">
                <span className="text-d8-green">[00:18]</span> 7 agents deployed...
              </div>
              <div className="text-d8-muted">
                <span className="text-d8-green">[00:45]</span> Layout engine complete
              </div>
              <div className="text-d8-muted">
                <span className="text-d8-green">[01:12]</span> Copy generated
              </div>
              <div className="text-d8-muted">
                <span className="text-d8-green">[01:28]</span> SEO optimized
              </div>
              <div className="font-bold text-d8-green">
                [01:30] DEPLOYED &rarr; client-site.dominat8.io
              </div>
              <div className="mt-2 text-d8-muted">
                <span className="text-d8-green">$</span>{" "}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 4: FEATURES ---- */
function Features() {
  const features = [
    {
      icon: "//",
      title: "Multi-Agent AI Pipeline",
      desc: "Six specialised AI agents work together — strategy, copy, design, code, SEO, and QA. All in one generation pass.",
    },
    {
      icon: ">>",
      title: "One-Click Deploy",
      desc: "From build to live in seconds. Global CDN, auto-SSL, and custom domains included. No DevOps required.",
    },
    {
      icon: "{}",
      title: "Conversion-First Design",
      desc: "Every component is engineered for conversions. Not added as an afterthought — built into the architecture.",
    },
    {
      icon: "<>",
      title: "White-Label Ready",
      desc: "Remove Dominat8 branding entirely. Present to clients as your own work. Full agency white-label on Agency plans.",
    },
    {
      icon: "##",
      title: "Built-In SEO",
      desc: "Schema markup, meta tags, sitemap generation, and Core Web Vitals optimisation — automated on every build.",
    },
    {
      icon: "&&",
      title: "Self-Healing Builds",
      desc: "The build loop automatically detects and fixes bugs, layout breaks, and accessibility issues before you see them.",
    },
  ];

  return (
    <section id="features" className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            Features
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Everything you need to
            <span className="text-d8-green"> ship faster.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((w) => (
            <div
              key={w.title}
              className="neon-border group bg-d8-surface p-8 transition-all hover:bg-d8-surface-hover rounded-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-d8-green/20 bg-d8-green/[0.05] font-mono text-lg font-black text-d8-green transition-colors group-hover:bg-d8-green/10 rounded-lg">
                {w.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-black text-d8-text">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-d8-muted">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 5: SOCIAL PROOF ---- */
function SocialProof() {
  const testimonials = [
    {
      quote: "I described my SaaS and had a production-ready site in 22 seconds. Replaced a $12k agency quote.",
      name: "Sarah M.",
      role: "Startup Founder, Austin",
      metric: "+23% conversions",
    },
    {
      quote: "The self-healing loop caught a responsive break I would have missed. Client was thrilled.",
      name: "James L.",
      role: "Freelance Designer, London",
      metric: "14 sites / 1 week",
    },
    {
      quote: "38 product pages generated from a single prompt. The SEO agent even wrote my meta tags.",
      name: "Priya K.",
      role: "E-commerce Owner, Mumbai",
      metric: "38 pages / 1 prompt",
    },
  ];

  return (
    <section id="results" className="relative border-t border-white/[0.04] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            Trusted by builders
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Real results from real users.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="neon-border flex flex-col bg-d8-surface p-8 rounded-xl"
            >
              <div className="mb-6 inline-block self-start border border-d8-green/20 bg-d8-green/[0.05] px-3 py-1 font-mono text-xs font-bold text-d8-green rounded-full">
                {t.metric}
              </div>
              <blockquote className="flex-1 text-base leading-relaxed text-d8-text/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <div className="font-display text-sm font-bold text-d8-text">
                  {t.name}
                </div>
                <div className="font-mono text-xs text-d8-muted">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 6: PRICING ---- */
function Pricing() {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      period: "forever",
      desc: "Try it out — no credit card required.",
      features: [
        "3 AI generations / month",
        "Vibe & style presets",
        "HTML download",
        "Mobile-responsive output",
        "Share link (7-day)",
      ],
    },
    {
      name: "STARTER",
      price: "$9",
      period: "/mo",
      desc: "For individuals & side projects.",
      features: [
        "20 AI generations / month",
        "Refine & iterate (unlimited)",
        "Fix agent + SEO scan",
        "Embed / iframe export",
        "Share links (90-day)",
      ],
    },
    {
      name: "PRO",
      price: "$29",
      period: "/mo",
      desc: "For freelancers & growing businesses.",
      features: [
        "100 AI generations / month",
        "Everything in Starter",
        "A/B & seasonal variants",
        "Deploy to CDN + auto-SSL",
        "Custom domain",
        "Priority queue + email support",
      ],
      featured: true,
    },
    {
      name: "AGENCY",
      price: "$99",
      period: "/mo",
      desc: "For teams & high-volume builders.",
      features: [
        "500 AI generations / month",
        "Everything in Pro",
        "White-label output",
        "API access + bulk generation",
        "5 team seats",
        "SLA + dedicated support",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            Pricing
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Simple, honest pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-d8-muted">
            Start free. Scale as you grow. No surprises, no gotchas.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-d8-muted/60">
            Need more? $0.49 / generation overage on all paid plans.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`neon-border relative flex flex-col bg-d8-surface p-8 ${
                p.featured
                  ? "border-d8-green/30 shadow-[0_0_40px_rgba(0,255,65,0.08)]"
                  : ""
              }`}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}
            >
              {p.featured && (
                <>
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-d8-green" />
                  <div className="absolute top-3 right-3 bg-d8-green/20 border border-d8-green/40 px-2 py-0.5 font-mono text-[10px] font-bold text-d8-green uppercase tracking-wider">
                    Most Popular
                  </div>
                </>
              )}
              <div className="mt-3 font-display text-sm font-black tracking-[0.2em] text-d8-text">
                {p.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-d8-text">
                  {p.price}
                </span>
                <span className="text-sm text-d8-muted">{p.period}</span>
              </div>
              <p className="mt-3 text-sm text-d8-muted">{p.desc}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-d8-text/80">
                    <span className="mt-0.5 font-mono text-xs text-d8-green">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://dominat8.io/builder"
                className={`mt-8 block py-3.5 text-center text-sm font-black uppercase tracking-widest no-underline transition-all ${
                  p.featured
                    ? "neon-cta"
                    : "border border-white/10 bg-white/[0.03] text-d8-text hover:border-d8-green/30 hover:text-d8-green"
                }`}
                style={p.featured ? { clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" } : undefined}
              >
                {p.featured ? "START PRO — $29/MO" : p.name === "FREE" ? "GET STARTED FREE" : `START ${p.name}`}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center text-sm text-d8-muted/50">
          All paid plans include a 14-day money-back guarantee.
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 7: FINAL CTA ---- */
function FinalCTA() {
  return (
    <section className="relative border-t border-white/[0.04] py-32 overflow-hidden">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-black leading-tight text-d8-text">
          Ready to build
          <br />
          <span className="text-d8-green">something great?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-d8-muted">
          Join thousands of founders, freelancers, and agencies who are already
          shipping production websites with Dominat8. Start free — no credit card required.
        </p>
        <a
          href="https://dominat8.io/builder"
          className="neon-cta mt-10 inline-block px-12 py-5 text-base font-black tracking-widest no-underline rounded-lg"
          style={{ clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)" }}
        >
          START BUILDING FREE
        </a>
        <div className="mt-6 font-mono text-xs text-d8-muted">
          No credit card required. Build your first site in 90 seconds.
        </div>
      </div>
    </section>
  );
}

/* ---- FOOTER ---- */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-d8-black py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center bg-d8-green font-display text-xs font-black text-d8-black"
            style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
          >
            D8
          </div>
          <span className="font-display text-sm font-bold tracking-[0.1em] uppercase text-d8-muted">
            Dominat8
          </span>
        </div>
        <div className="flex gap-8">
          {[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-d8-muted hover:text-d8-green transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="font-mono text-xs text-d8-muted">
          &copy; {new Date().getFullYear()} Dominat8. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---- PAGE ---- */
export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <Features />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
