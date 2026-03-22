export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATS = [
  { value: "10x", label: "Faster than hand-coding" },
  { value: "99.9%", label: "Uptime on Vercel" },
  { value: "<3s", label: "Time to first paint" },
  { value: "0", label: "Developers needed" },
];

const FEATURES = [
  { icon: "⚡", title: "AI-Powered Generation", body: "Describe your business. Get a complete, conversion-optimized website in seconds — not weeks." },
  { icon: "🎯", title: "Conversion-First Design", body: "Every page is built to convert. Strategic CTAs, trust signals, and psychological triggers baked in." },
  { icon: "🔒", title: "Crash-Safe Rendering", body: "Inline fallback styles guarantee your site looks premium even if CSS frameworks fail to load." },
  { icon: "🚀", title: "One-Click Publishing", body: "Deploy to your custom domain instantly. SSL, CDN, and edge caching included — zero config." },
  { icon: "🤖", title: "Agent-Driven Optimization", body: "AI agents continuously analyze and improve your site: SEO, speed, accessibility, conversions." },
  { icon: "📊", title: "Built-In Analytics", body: "Know what's working. Track visitors, conversions, and engagement without third-party scripts." },
];

const STEPS = [
  { num: "01", title: "Describe your vision", body: "Tell us about your business, audience, and goals. Our AI understands context." },
  { num: "02", title: "AI builds your site", body: "In seconds, get a complete site with hero, features, pricing, FAQ, and more." },
  { num: "03", title: "Customize & refine", body: "Tweak copy, swap sections, adjust colors. Full control, zero code required." },
  { num: "04", title: "Publish & dominate", body: "One click to go live. Custom domain, SSL, blazing-fast CDN. You're in business." },
];

const TESTIMONIALS = [
  { name: "Sarah K.", role: "Founder, NovaTech", quote: "I went from idea to a live, converting website in under 10 minutes. This is the future." },
  { name: "Marcus R.", role: "Agency Owner", quote: "We replaced our entire Webflow workflow. Dominat8 generates better sites, faster, every time." },
  { name: "Priya M.", role: "E-commerce Founder", quote: "The conversion rates speak for themselves. 3x improvement over our old hand-coded site." },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.22), rgba(0,0,0,0) 60%)," +
          " radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.14), rgba(0,0,0,0) 62%)," +
          " linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        padding: "0 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto" }}>
        {/* NAV */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "18px 0",
          }}
        >
          <a href="/" aria-label="Dominat8 Home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#F3EEFF" }}>
            <div style={{ width: 34, height: 34, borderRadius: 12, background: "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(59,130,246,0.75))", boxShadow: "0 10px 30px rgba(168,85,247,0.25)", border: "1px solid rgba(255,255,255,0.18)" }} />
            <span style={{ fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800 }}>Dominat8</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { href: "/templates", label: "Templates" },
              { href: "/pricing", label: "Pricing" },
              { href: "/gallery", label: "Gallery" },
              { href: "/about", label: "About" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 13, color: "rgba(237,234,247,0.78)", textDecoration: "none", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                {l.label}
              </a>
            ))}
            <a href="/admin" style={{ fontSize: 13, fontWeight: 700, color: "#07070B", textDecoration: "none", padding: "7px 16px", borderRadius: 10, background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", boxShadow: "0 8px 30px rgba(168,85,247,0.25)" }}>
              Dashboard
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ textAlign: "center", padding: "60px 0 50px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "linear-gradient(90deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))", border: "1px solid rgba(255,255,255,0.10)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(237,234,247,0.85)" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
            Now in public beta
          </div>

          <h1 style={{ marginTop: 24, fontSize: 62, lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 900, color: "#F6F2FF", textShadow: "0 20px 80px rgba(168,85,247,0.18)", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            Build websites that{" "}
            <span style={{ background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              dominate
            </span>
            {" "}your market
          </h1>

          <p style={{ marginTop: 18, maxWidth: 620, marginLeft: "auto", marginRight: "auto", fontSize: 18, lineHeight: 1.6, color: "rgba(237,234,247,0.72)" }}>
            AI generates your entire website — copy, design, SEO — in seconds. Publish to your domain with one click. No code. No designers. Just results.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <a href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 15, color: "#07070B", background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", boxShadow: "0 18px 55px rgba(168,85,247,0.26), 0 10px 24px rgba(59,130,246,0.16)", border: "1px solid rgba(255,255,255,0.10)" }}>
              Start Building Free <span aria-hidden="true">→</span>
            </a>
            <a href="/gallery" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 15, color: "rgba(237,234,247,0.88)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
              See Examples
            </a>
          </div>
        </section>

        {/* STATS BAR */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 10 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(237,234,247,0.55)", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: 70 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(168,85,247,0.8)" }}>HOW IT WORKS</div>
            <h2 style={{ marginTop: 10, fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>From idea to live site in 4 steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 32, fontWeight: 900, background: "linear-gradient(90deg, rgba(168,85,247,0.4), rgba(59,130,246,0.3))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.num}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(246,242,255,0.95)", marginTop: 10 }}>{s.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(237,234,247,0.65)", marginTop: 6 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ marginTop: 70 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(59,130,246,0.8)" }}>FEATURES</div>
            <h2 style={{ marginTop: 10, fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>Everything you need to win</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ padding: 22, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}>
                <div style={{ fontSize: 28 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(246,242,255,0.95)", marginTop: 12 }}>{f.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.65)", marginTop: 8 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ marginTop: 70 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(168,85,247,0.8)" }}>TESTIMONIALS</div>
            <h2 style={{ marginTop: 10, fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>Loved by builders worldwide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ padding: 24, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(237,234,247,0.78)", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</div>
                <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: "rgba(246,242,255,0.90)" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "rgba(237,234,247,0.50)" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ marginTop: 70, textAlign: "center", padding: "50px 20px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.10)", background: "linear-gradient(180deg, rgba(168,85,247,0.08), rgba(59,130,246,0.04))" }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>Ready to dominate?</h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "rgba(237,234,247,0.68)", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
            Join thousands of businesses building faster, converting higher, and shipping sooner with Dominat8.
          </p>
          <a href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "14px 32px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 15, color: "#07070B", background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", boxShadow: "0 18px 55px rgba(168,85,247,0.26), 0 10px 24px rgba(59,130,246,0.16)" }}>
            Start Building Free <span aria-hidden="true">→</span>
          </a>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 50, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center", fontSize: 12, color: "rgba(237,234,247,0.50)" }}>
          <div>© {new Date().getFullYear()} Dominat8. All rights reserved.</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { href: "/about", label: "About" },
              { href: "/pricing", label: "Pricing" },
              { href: "/templates", label: "Templates" },
              { href: "/faq", label: "FAQ" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ color: "rgba(237,234,247,0.55)", textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
