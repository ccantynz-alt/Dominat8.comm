import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Dominat8. Start free, upgrade when you're ready.",
};

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for trying Dominat8 and building your first site.",
    cta: "Start Free",
    href: "/admin",
    featured: false,
    features: [
      "1 AI-generated website",
      "Dominat8 subdomain",
      "Basic templates",
      "SSL included",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "For serious builders who want custom domains and full control.",
    cta: "Start Pro Trial",
    href: "/admin",
    featured: true,
    features: [
      "Unlimited websites",
      "Custom domains",
      "All premium templates",
      "AI optimization agents",
      "Priority support",
      "Advanced analytics",
      "SEO autopilot",
    ],
  },
  {
    name: "Agency",
    price: "$99",
    period: "/mo",
    desc: "For agencies managing multiple client sites at scale.",
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
    features: [
      "Everything in Pro",
      "White-label branding",
      "Client management dashboard",
      "API access",
      "Dedicated account manager",
      "Custom agent workflows",
      "SLA guarantee",
    ],
  },
];

export default function PricingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.20), rgba(0,0,0,0) 60%), radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.12), rgba(0,0,0,0) 62%), linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        padding: "28px 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto" }}>
        {/* NAV */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0 18px" }}>
          <Link href="/" style={{ color: "rgba(243,238,255,0.95)", textDecoration: "none", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 13 }}>
            Dominat8
          </Link>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/templates" style={{ color: "rgba(237,234,247,0.78)", textDecoration: "none", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>Templates</Link>
            <Link href="/gallery" style={{ color: "rgba(237,234,247,0.78)", textDecoration: "none", padding: "7px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>Gallery</Link>
          </div>
        </div>

        {/* HEADER */}
        <section style={{ textAlign: "center", padding: "40px 0 50px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(168,85,247,0.8)" }}>PRICING</div>
          <h1 style={{ marginTop: 12, fontSize: 44, fontWeight: 900, letterSpacing: "-0.02em", color: "#F6F2FF" }}>
            Simple, transparent pricing
          </h1>
          <p style={{ marginTop: 14, fontSize: 16, color: "rgba(237,234,247,0.68)", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Start free. Upgrade when you need more power. No hidden fees, no surprises.
          </p>
        </section>

        {/* PRICING CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              style={{
                padding: 28,
                borderRadius: 22,
                border: p.featured ? "2px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.08)",
                background: p.featured
                  ? "linear-gradient(180deg, rgba(168,85,247,0.08), rgba(59,130,246,0.04))"
                  : "rgba(255,255,255,0.02)",
                boxShadow: p.featured ? "0 20px 60px rgba(168,85,247,0.15)" : "none",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {p.featured && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 999, background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))", fontSize: 11, fontWeight: 800, color: "#07070B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Most Popular
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(237,234,247,0.70)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{p.name}</div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: "#F6F2FF" }}>{p.price}</span>
                {p.period && <span style={{ fontSize: 14, color: "rgba(237,234,247,0.50)" }}>{p.period}</span>}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: "rgba(237,234,247,0.55)", lineHeight: 1.5 }}>{p.desc}</div>

              <Link
                href={p.href}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 20,
                  padding: "12px 20px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: p.featured ? "#07070B" : "rgba(237,234,247,0.90)",
                  background: p.featured
                    ? "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))"
                    : "rgba(255,255,255,0.05)",
                  border: p.featured ? "none" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: p.featured ? "0 12px 40px rgba(168,85,247,0.25)" : "none",
                }}
              >
                {p.cta}
              </Link>

              <div style={{ marginTop: 22, flex: 1 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", fontSize: 13, color: "rgba(237,234,247,0.70)" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section style={{ marginTop: 60, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#F6F2FF", textAlign: "center", marginBottom: 24 }}>Frequently asked questions</h2>
          {[
            { q: "Can I try Dominat8 for free?", a: "Yes! The Starter plan is completely free. Build your first website with zero commitment." },
            { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no lock-in. Cancel your subscription anytime from the dashboard." },
            { q: "Do I need to know how to code?", a: "Not at all. Dominat8 handles everything — design, code, deployment. You just describe what you want." },
            { q: "Can I use my own domain?", a: "Yes, on Pro and Agency plans. Connect your custom domain with one-click DNS setup." },
          ].map((faq) => (
            <div key={faq.q} style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(246,242,255,0.90)" }}>{faq.q}</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: "rgba(237,234,247,0.60)" }}>{faq.a}</div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <div style={{ marginTop: 50, opacity: 0.85, fontSize: 12, color: "rgba(237,234,247,0.50)", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>© {new Date().getFullYear()} Dominat8</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "rgba(237,234,247,0.55)", textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ color: "rgba(237,234,247,0.55)", textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
