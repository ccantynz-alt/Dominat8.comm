import Link from "next/link";
import HeroGlow from "@/components/HeroGlow";

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────── */}
      <section className="hero">
        <div className="hero-orb hero-orb-a" aria-hidden="true" />
        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <HeroGlow className="relative z-10 flex flex-col items-center">
          <div className="hero-split flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="pill mb-6">
                <span className="pill-dot" />
                <span>Dominat8 — AI Website Builder</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                The{" "}
                <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                  wow
                </span>{" "}
                website builder.
                <br />
                Built by AI. Shipped fast.
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-white/70 max-w-lg">
                Describe your business. Dominat8 generates a premium homepage,
                pages, and structure — ready to publish on your domain.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link className="btn btn-primary" href="/templates">
                  Start building
                </Link>
                <Link className="btn btn-ghost" href="/templates">
                  Explore templates
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/50 font-medium">
                <span>Fast publish</span>
                <span>SEO-ready</span>
                <span>Custom domains</span>
                <span>Agent pipeline</span>
              </div>
            </div>

            {/* Preview card */}
            <aside className="preview-card" aria-label="Preview card">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <span className="text-xs text-white/40 font-semibold ml-2">
                  Live Preview
                </span>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-[10px] font-black tracking-[0.16em] uppercase text-white/40">
                  AI-generated site blueprint
                </p>
                {/* Mock wireframe */}
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-white/8" />
                  <div className="h-3 w-full rounded bg-white/5" />
                  <div className="h-3 w-5/6 rounded bg-white/5" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-accent-purple/30 to-accent-blue/30" />
                    <div className="h-8 w-20 rounded-lg bg-white/5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-16 rounded-xl bg-white/4" />
                  <div className="h-16 rounded-xl bg-white/4" />
                  <div className="h-16 rounded-xl bg-white/4" />
                  <div className="h-16 rounded-xl bg-white/4" />
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40">
                    Glow
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40">
                    Full-screen
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40">
                    Build-gated
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </HeroGlow>
      </section>

      {/* ── Trust strip ───────────────────────── */}
      <section className="section text-center">
        <p className="text-sm font-semibold text-white/40 tracking-wide uppercase">
          Trusted by builders who want a premium look
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {["Agencies", "Founders", "Local business", "Creators", "E-commerce"].map(
            (label) => (
              <span key={label} className="pill">
                {label}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── How it works ──────────────────────── */}
      <section className="section">
        <h2 className="text-3xl font-black tracking-tight text-center">
          How it works
        </h2>
        <p className="mt-3 text-center text-white/60">
          Three steps. Clean output. Fast publishing.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              num: "1",
              title: "Describe",
              desc: "Tell us what you do and the vibe you want.",
            },
            {
              num: "2",
              title: "Generate",
              desc: "Agents build pages, layout, and SEO structure.",
            },
            {
              num: "3",
              title: "Publish",
              desc: "Push live on your domain. Iterate instantly.",
            },
          ].map((step) => (
            <div key={step.num} className="card flex flex-col items-start">
              <div className="step-num">{step.num}</div>
              <h3 className="text-lg font-bold mt-2">{step.title}</h3>
              <p className="text-sm text-white/60 mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proof ─────────────────────────────── */}
      <section className="section">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              kicker: "Premium by default",
              title: "Design that looks expensive",
              desc: "Modern lighting, depth, and typography — without a designer.",
            },
            {
              kicker: "Built to rank",
              title: "SEO-ready structure",
              desc: "Clean metadata, headings, and page structure from day one.",
            },
            {
              kicker: "Fast execution",
              title: "Agents do the heavy lifting",
              desc: "From spec to publish — streamlined and repeatable.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <p className="text-[10px] font-black tracking-[0.14em] uppercase text-white/50">
                {item.kicker}
              </p>
              <h3 className="text-lg font-bold mt-2">{item.title}</h3>
              <p className="text-sm text-white/60 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────── */}
      <section className="section">
        <div className="card flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Ready to build your best site?
            </h2>
            <p className="text-white/60 mt-1">
              Generate a premium homepage and publish it fast.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link className="btn btn-primary" href="/templates">
              Start building
            </Link>
            <Link className="btn btn-ghost" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>

        <footer className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-white/10 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Dominat8</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link className="footer-link" href="/templates">Templates</Link>
            <Link className="footer-link" href="/use-cases">Use cases</Link>
            <Link className="footer-link" href="/pricing">Pricing</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
