import Link from "next/link";
import BuilderClient from "./_client/BuilderClient";

export const metadata = {
  title: "AI Website Builder — Dominat8",
  description: "Build a complete website in seconds. Describe your business and get a premium, conversion-optimized site instantly.",
};

export default function BuilderPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.22), rgba(0,0,0,0) 60%)," +
          " radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.14), rgba(0,0,0,0) 62%)," +
          " linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        padding: "0 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "18px 0" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#F3EEFF" }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(59,130,246,0.75))", border: "1px solid rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 800 }}>Dominat8</span>
          </Link>
          <Link href="/admin" style={{ fontSize: 13, color: "rgba(237,234,247,0.7)", textDecoration: "none", padding: "7px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
            Dashboard
          </Link>
        </nav>

        {/* HEADER */}
        <section style={{ textAlign: "center", padding: "50px 0 10px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "linear-gradient(90deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))", border: "1px solid rgba(255,255,255,0.10)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(237,234,247,0.85)" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
            AI Website Builder
          </div>
          <h1 style={{ marginTop: 20, fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 900, color: "#F6F2FF" }}>
            Describe it. Build it. Ship it.
          </h1>
          <p style={{ marginTop: 14, maxWidth: 560, marginLeft: "auto", marginRight: "auto", fontSize: 16, lineHeight: 1.6, color: "rgba(237,234,247,0.65)" }}>
            Type what you want. Choose instant (3 seconds) or premium (AI-powered). Get a complete website ready to publish.
          </p>
        </section>

        {/* BUILDER CLIENT */}
        <BuilderClient />

        {/* TEMPLATE GRID */}
        <section style={{ marginTop: 50 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(246,242,255,0.85)", marginBottom: 16 }}>Quick Start Templates</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {[
              { icon: "🚀", label: "SaaS" },
              { icon: "🍽️", label: "Restaurant" },
              { icon: "💼", label: "Agency" },
              { icon: "📸", label: "Photography" },
              { icon: "🏋️", label: "Fitness" },
              { icon: "🏠", label: "Real Estate" },
              { icon: "⚖️", label: "Law Firm" },
              { icon: "🦷", label: "Dental" },
              { icon: "🎓", label: "Coach" },
              { icon: "🛍️", label: "E-commerce" },
            ].map((t) => (
              <div
                key={t.label}
                style={{
                  padding: "14px 10px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 22 }}>{t.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(237,234,247,0.6)", marginTop: 4 }}>{t.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 50, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(237,234,247,0.4)", display: "flex", justifyContent: "space-between" }}>
          <div>&copy; 2026 Dominat8</div>
          <Link href="/pricing" style={{ color: "rgba(237,234,247,0.5)", textDecoration: "none" }}>View Pricing</Link>
        </footer>
      </div>
    </main>
  );
}
