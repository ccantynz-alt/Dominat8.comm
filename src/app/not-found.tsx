import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #07070B 0%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 80, fontWeight: 900, background: "linear-gradient(90deg, rgba(168,85,247,0.4), rgba(59,130,246,0.3))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ marginTop: 16, fontSize: 24, fontWeight: 800, color: "#F6F2FF" }}>
          Page not found
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: "rgba(237,234,247,0.60)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              color: "#07070B",
              background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
              boxShadow: "0 12px 40px rgba(168,85,247,0.2)",
            }}
          >
            Go Home
          </Link>
          <Link
            href="/pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              color: "rgba(237,234,247,0.85)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            View Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
