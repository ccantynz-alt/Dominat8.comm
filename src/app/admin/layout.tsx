import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Dominat8</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Admin</div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.65 }}>
            Protected by <code>ADMIN_TOKEN</code>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          {children}
        </div>
      </div>
    </div>
  );
}