"use client";

export default function HomeClient() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b0d10",
      color: "#e5e7eb",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: 420,
        padding: 24
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 12
        }}>
          Dominat8
        </h1>

        <p style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "#9ca3af"
        }}>
          We’re making improvements.<br />
          Please check back soon.
        </p>

        <div style={{
          marginTop: 24,
          fontSize: 11,
          color: "#6b7280"
        }}>
          NUKED_20260126_084748
        </div>
      </div>
    </main>
  );
}