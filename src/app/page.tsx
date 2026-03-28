import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dominat8 — Dominate or Be Dominated",
  description:
    "AI-powered website builder for agencies and developers who refuse to lose. Build in 90 seconds. Deploy in 5.",
};

/* ============================================================
   DOMINAT8.COM — THE KILLER MARKETING MACHINE
   7 sections. Dark. Aggressive. Converts hard.
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
          <a href="#weapons" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
            Weapons
          </a>
          <a href="#proof" className="text-sm font-semibold text-d8-muted hover:text-d8-green transition-colors no-underline">
            Proof
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center">
        <div className="mb-8 inline-flex items-center gap-3 border border-d8-green/20 bg-d8-green/[0.05] px-4 py-2">
          <span className="inline-block h-2 w-2 rounded-full bg-d8-green animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-d8-green">
            AI BUILDER — LIVE
          </span>
        </div>

        <h1
          className="glitch-text font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-d8-text"
          data-text="YOUR COMPETITORS ARE ALREADY WINNING."
        >
          YOUR COMPETITORS ARE
          <br />
          <span className="text-d8-green">ALREADY WINNING.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-d8-muted md:text-xl">
          While you&apos;re still deciding, they shipped. Dominat8 builds
          conversion-first sites in <span className="font-bold text-d8-text">90 seconds</span>.
          Deploys in <span className="font-bold text-d8-text">5</span>.
          No excuses. No mercy.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://dominat8.io/builder"
            className="neon-cta px-10 py-4 text-base font-black tracking-widest no-underline"
            style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
          >
            DOMINATE NOW
          </a>
          <a
            href="#weapons"
            className="border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold uppercase tracking-widest text-d8-muted hover:border-d8-green/30 hover:text-d8-green transition-all no-underline"
          >
            SEE THE ARSENAL &darr;
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {[
            { stat: "10,000+", label: "Sites Deployed" },
            { stat: "90s", label: "Build Time" },
            { stat: "0", label: "Apologies" },
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

/* ---- SECTION 2: COMPETITIVE FRAMING ---- */
function CompetitiveFraming() {
  return (
    <section className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
          Every day you wait is a day
          <br />
          <span className="text-d8-green">your competitor gets ahead.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-d8-muted">
          The market moved. AI builds production-ready sites faster than your team quotes them.
          Your competitors figured this out last month. The question isn&apos;t &ldquo;should you?&rdquo;
          — it&apos;s &ldquo;why haven&apos;t you?&rdquo;
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              before: "Manual builds",
              after: "AI in 90 seconds",
              detail: "Your team takes weeks. Our engine takes seconds.",
            },
            {
              before: "Template sites",
              after: "Unique every time",
              detail: "Cookie-cutter is dead. Every build is one-of-one.",
            },
            {
              before: "Launch & pray",
              after: "Conversion-engineered",
              detail: "Built to convert from pixel one. Not retrofitted.",
            },
          ].map((item) => (
            <div
              key={item.after}
              className="neon-border bg-d8-surface p-8 text-left"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-red-500 line-through">
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

/* ---- SECTION 3: SPEED PROOF ---- */
function SpeedProof() {
  return (
    <section className="relative border-t border-white/[0.04] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
              Speed kills — in your favour
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-black leading-tight text-d8-text">
              90 seconds to live.
              <br />
              5 seconds to deploy.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-d8-muted">
              From blank canvas to production-deployed site. No staging environments.
              No deployment pipelines. No DevOps tickets. Type what you want. Get what you need.
              Ship before your coffee gets cold.
            </p>
            <a
              href="https://dominat8.io/builder"
              className="neon-cta mt-8 inline-block px-8 py-3.5 text-sm font-black tracking-widest no-underline"
              style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
            >
              BUILD YOUR FIRST SITE
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

/* ---- SECTION 4: FEATURE WEAPONS ---- */
function FeatureWeapons() {
  const weapons = [
    {
      icon: "//",
      title: "7-Agent AI Pipeline",
      desc: "Seven specialized AI agents work in parallel. Strategy, copy, design, code, SEO, QA, deploy. All in one pass.",
    },
    {
      icon: ">>",
      title: "Instant Deploy",
      desc: "No FTP. No CI/CD. No waiting. One click from build to live. Global CDN. SSL included.",
    },
    {
      icon: "{}",
      title: "Conversion-First Architecture",
      desc: "Every component is engineered to convert. Not decorated after the fact. Built into the DNA.",
    },
    {
      icon: "<>",
      title: "White-Label Ready",
      desc: "Strip our name. Add yours. Your clients never know. Full agency white-label from day one.",
    },
    {
      icon: "##",
      title: "SEO Weaponised",
      desc: "Schema markup, meta optimization, sitemap generation, Core Web Vitals — all automated. Every build.",
    },
    {
      icon: "&&",
      title: "Auto-Reply AI",
      desc: "AI-powered customer support that sounds like your best account manager. Direct. Confident. Never sleeps.",
    },
  ];

  return (
    <section id="weapons" className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            The arsenal
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Every feature is a
            <span className="text-d8-green"> competitive weapon.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weapons.map((w) => (
            <div
              key={w.title}
              className="neon-border group bg-d8-surface p-8 transition-all hover:bg-d8-surface-hover"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center border border-d8-green/20 bg-d8-green/[0.05] font-mono text-lg font-black text-d8-green transition-colors group-hover:bg-d8-green/10">
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
      quote: "We replaced our entire dev pipeline with Dominat8. 23% more conversions in 30 days. Not going back.",
      name: "Marcus Chen",
      role: "Founder, Velocity Digital",
      metric: "+23% conversions",
    },
    {
      quote: "Shipped 14 client sites in one week. My competitors still quote 6-week timelines. They have no idea what hit them.",
      name: "Sarah Blackwood",
      role: "CEO, Blackwood Agency",
      metric: "14 sites / 1 week",
    },
    {
      quote: "The white-label option alone pays for itself. Clients think we built it. We just pressed a button.",
      name: "James Okafor",
      role: "Director, Digital Forge",
      metric: "10x output",
    },
  ];

  return (
    <section id="proof" className="relative border-t border-white/[0.04] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            Battle-tested
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Results. Not testimonials.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="neon-border flex flex-col bg-d8-surface p-8"
            >
              <div className="mb-6 inline-block self-start border border-d8-green/20 bg-d8-green/[0.05] px-3 py-1 font-mono text-xs font-bold text-d8-green">
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
      name: "STARTER",
      price: "$49",
      tag: "Stop losing",
      desc: "Stop losing to competitors who already have AI.",
      features: [
        "AI site builder",
        "5 sites / month",
        "Custom domain",
        "SSL + CDN included",
        "Basic SEO automation",
      ],
    },
    {
      name: "PRO",
      price: "$129",
      tag: "Most lethal",
      desc: "The weapon your agency's been missing.",
      features: [
        "Everything in Starter",
        "Unlimited sites",
        "Priority AI pipeline",
        "Advanced SEO suite",
        "AI auto-reply support",
        "Custom branding",
      ],
      featured: true,
    },
    {
      name: "AGENCY",
      price: "$299",
      tag: "Total domination",
      desc: "Dominate your entire client roster.",
      features: [
        "Everything in Pro",
        "White-label builder",
        "Team seats (up to 10)",
        "Client billing portal",
        "Dedicated pipeline",
        "Priority support",
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
            Pick your weapon.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-d8-muted">
            Every plan includes the full AI engine. No feature gates. No bait-and-switch.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
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
                <div className="absolute -top-px left-0 right-0 h-[2px] bg-d8-green" />
              )}
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
                {p.tag}
              </div>
              <div className="mt-3 font-display text-sm font-black tracking-[0.2em] text-d8-text">
                {p.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-d8-text">
                  {p.price}
                </span>
                <span className="text-sm text-d8-muted">/mo</span>
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
                {p.featured ? "START DOMINATING" : "GET STARTED"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 7: FINAL CTA ---- */
function FinalCTA() {
  return (
    <section className="relative border-t border-white/[0.04] py-32 overflow-hidden scanlines">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-black leading-tight text-d8-text">
          The market doesn&apos;t wait.
          <br />
          <span className="text-d8-green">Neither should you.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-d8-muted">
          Every day without Dominat8 is a day your competitors outpace you.
          Every site they ship is a client you lost. Stop watching. Start winning.
        </p>
        <a
          href="https://dominat8.io/builder"
          className="neon-cta mt-10 inline-block px-12 py-5 text-base font-black tracking-widest no-underline"
          style={{ clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)" }}
        >
          DOMINATE NOW
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
          &copy; {new Date().getFullYear()} Dominat8. Ship or die.
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
      <CompetitiveFraming />
      <SpeedProof />
      <FeatureWeapons />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
