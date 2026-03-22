import Link from "next/link";

export const metadata = {
  title: "Templates",
  description: "Browse premium AI-generated website templates. SaaS, agency, portfolio, e-commerce, and more.",
};

const TEMPLATES = [
  { slug: "saas-landing", name: "SaaS Landing", category: "SaaS", desc: "High-converting landing page with hero, features, pricing, and FAQ sections." },
  { slug: "agency-pro", name: "Agency Pro", category: "Agency", desc: "Professional agency site with case studies, team, and client testimonials." },
  { slug: "portfolio-minimal", name: "Portfolio Minimal", category: "Portfolio", desc: "Clean, elegant portfolio with project showcase and contact form." },
  { slug: "ecommerce-starter", name: "E-commerce Starter", category: "E-commerce", desc: "Product-focused layout with gallery, pricing tiers, and checkout flow." },
  { slug: "local-business", name: "Local Business", category: "Local", desc: "Service area pages, booking CTAs, Google Maps, and trust signals." },
  { slug: "startup-pitch", name: "Startup Pitch", category: "Startup", desc: "Investor-ready page with problem/solution, traction metrics, and team." },
  { slug: "blog-publication", name: "Blog / Publication", category: "Content", desc: "Content-first layout with featured posts, categories, and newsletter signup." },
  { slug: "consulting-firm", name: "Consulting Firm", category: "Professional", desc: "Authority-building design with methodology, results, and booking flow." },
  { slug: "restaurant-menu", name: "Restaurant & Menu", category: "Food & Bev", desc: "Menu showcase, reservation system, location maps, and reviews." },
];

export default function TemplatesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.20), rgba(0,0,0,0) 60%), radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.12), rgba(0,0,0,0) 62%), linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        padding: "28px 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0 18px" }}>
          <Link href="/" style={{ color: "rgba(243,238,255,0.95)", textDecoration: "none", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 13 }}>Dominat8</Link>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/pricing" style={{ color: "rgba(237,234,247,0.78)", textDecoration: "none", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>Pricing</Link>
            <Link href="/gallery" style={{ color: "rgba(237,234,247,0.78)", textDecoration: "none", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>Gallery</Link>
          </div>
        </div>

        <section style={{ textAlign: "center", padding: "40px 0 50px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(168,85,247,0.8)" }}>TEMPLATES</div>
          <h1 style={{ marginTop: 12, fontSize: 44, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>
            Start with a proven layout
          </h1>
          <p style={{ marginTop: 14, fontSize: 16, color: "rgba(237,234,247,0.68)", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Every template is conversion-optimized and fully customizable. Pick one, describe your business, and launch.
          </p>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {TEMPLATES.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              style={{
                display: "block",
                padding: 22,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Preview placeholder */}
              <div style={{ height: 120, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(237,234,247,0.35)" }}>Preview</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(168,85,247,0.7)" }}>{t.category}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(246,242,255,0.95)", marginTop: 6 }}>{t.name}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(237,234,247,0.60)", marginTop: 6 }}>{t.desc}</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 50, textAlign: "center" }}>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, textDecoration: "none", fontWeight: 800, fontSize: 15, color: "#07070B", background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", boxShadow: "0 18px 55px rgba(168,85,247,0.26)" }}>
            Start Building Free <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div style={{ marginTop: 50, opacity: 0.85, fontSize: 12, color: "rgba(237,234,247,0.50)", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>© {new Date().getFullYear()} Dominat8</div>
          <div style={{ display: "flex", gap: 14 }}>
            <Link href="/privacy" style={{ color: "rgba(237,234,247,0.55)", textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ color: "rgba(237,234,247,0.55)", textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
