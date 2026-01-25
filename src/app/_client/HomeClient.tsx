"use client";

export default function HomeClient() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 20%, #1f2937, #020617 60%)",
      color: "white",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      overflow: "hidden",
      position: "relative"
    }}>
      
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(120deg, rgba(56,189,248,0.15), rgba(168,85,247,0.15), rgba(34,197,94,0.15))",
        filter: "blur(120px)",
        animation: "float 20s ease-in-out infinite"
      }} />

      <style>{
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
          100% { transform: translateY(0px); }
        }
      }</style>

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "120px 32px",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: 64,
        alignItems: "center"
      }}>

        <div>
          <h1 style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: -2
          }}>
            This is how<br />websites are made now.
          </h1>

          <p style={{
            marginTop: 24,
            fontSize: 20,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 520
          }}>
            You describe your business.  
            The site builds itself.
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 16 }}>
            <a href="/builder" style={{
              padding: "16px 28px",
              borderRadius: 16,
              background: "white",
              color: "black",
              fontWeight: 900,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
            }}>
              Build your site
            </a>

            <span style={{
              alignSelf: "center",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)"
            }}>
              No setup. No templates.
            </span>
          </div>

          <div style={{ marginTop: 40, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            WOW_085009
          </div>
        </div>

        <div style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)",
          padding: 24,
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)"
        }}>
          <div style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)"
          }}>
            Live Preview
          </div>

          <div style={{
            marginTop: 16,
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.15)",
            overflow: "hidden"
          }}>
            <div style={{
              width: "78%",
              height: "100%",
              background: "linear-gradient(90deg,#22d3ee,#a855f7)",
              animation: "load 3s ease infinite"
            }} />
          </div>

          <style>{
            @keyframes load {
              0% { width: 10%; }
              50% { width: 78%; }
              100% { width: 10%; }
            }
          }</style>

          <div style={{
            marginTop: 24,
            fontSize: 18,
            fontWeight: 700
          }}>
            Generating your website…
          </div>

          <div style={{
            marginTop: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 10
          }}>
            {["SEO Ready","Fast","Mobile-Perfect","Published"].map(x => (
              <span key={x} style={{
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 13,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                ✓ {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}