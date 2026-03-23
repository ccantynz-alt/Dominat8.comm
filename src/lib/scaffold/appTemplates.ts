export type FrameworkType = "html" | "react" | "nextjs";

export type AppTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  framework: FrameworkType;
  files: AppFile[];
};

export type AppFile = {
  path: string;
  content: string;
  language: "tsx" | "ts" | "css" | "json" | "html";
};

export const APP_TEMPLATES: AppTemplate[] = [
  {
    id: "saas-dashboard",
    name: "SaaS Dashboard",
    category: "SaaS",
    description: "Full admin dashboard with sidebar nav, charts placeholder, and data tables.",
    framework: "react",
    files: [
      {
        path: "App.tsx",
        language: "tsx",
        content: `import React, { useState } from "react";

const NAV = ["Dashboard", "Users", "Analytics", "Settings"];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a12", color: "#eee", fontFamily: "system-ui" }}>
      <aside style={{ width: 220, background: "#111118", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 0" }}>
        <div style={{ padding: "0 20px 20px", fontWeight: 800, fontSize: 14, letterSpacing: "0.1em" }}>DASHBOARD</div>
        {NAV.map(n => (
          <button key={n} onClick={() => setActive(n)} style={{ display: "block", width: "100%", padding: "10px 20px", background: active === n ? "rgba(168,85,247,0.15)" : "transparent", border: "none", color: active === n ? "#a855f7" : "#888", textAlign: "left", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>{n}</button>
        ))}
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{active}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20 }}>
          {["Total Users", "Revenue", "Active Now"].map((m, i) => (
            <div key={m} style={{ padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>{m}</div>
              <div style={{ fontSize: 28, fontWeight: 900, marginTop: 6 }}>{[1247, "$12.4k", 89][i]}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "crm-app",
    name: "CRM System",
    category: "Business",
    description: "Contact management system with pipeline view, contact cards, and deal tracking.",
    framework: "react",
    files: [
      {
        path: "App.tsx",
        language: "tsx",
        content: `import React, { useState } from "react";

type Contact = { id: number; name: string; email: string; stage: string; value: string };
const STAGES = ["Lead", "Qualified", "Proposal", "Closed"];
const CONTACTS: Contact[] = [
  { id: 1, name: "Acme Corp", email: "ceo@acme.com", stage: "Lead", value: "$5,000" },
  { id: 2, name: "TechStart", email: "hello@techstart.io", stage: "Qualified", value: "$12,000" },
  { id: 3, name: "GrowthCo", email: "sales@growthco.com", stage: "Proposal", value: "$8,500" },
  { id: 4, name: "DataFlow", email: "info@dataflow.dev", stage: "Closed", value: "$15,000" },
];

export default function App() {
  const [contacts] = useState(CONTACTS);
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#eee", fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>CRM Pipeline</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 20 }}>
        {STAGES.map(s => (
          <div key={s}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", marginBottom: 10 }}>{s} ({contacts.filter(c => c.stage === s).length})</div>
            {contacts.filter(c => c.stage === s).map(c => (
              <div key={c.id} style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{c.email}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#a855f7", marginTop: 6 }}>{c.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "project-manager",
    name: "Project Manager",
    category: "Productivity",
    description: "Kanban-style project board with drag-ready cards and task management.",
    framework: "react",
    files: [
      {
        path: "App.tsx",
        language: "tsx",
        content: `import React, { useState } from "react";

type Task = { id: number; title: string; column: string; priority: "low" | "medium" | "high" };
const COLS = ["To Do", "In Progress", "Review", "Done"];
const INIT: Task[] = [
  { id: 1, title: "Design homepage hero", column: "To Do", priority: "high" },
  { id: 2, title: "Set up CI/CD pipeline", column: "In Progress", priority: "medium" },
  { id: 3, title: "Write API documentation", column: "Review", priority: "low" },
  { id: 4, title: "Deploy v1.0 to production", column: "Done", priority: "high" },
  { id: 5, title: "User authentication flow", column: "To Do", priority: "high" },
  { id: 6, title: "Database schema migration", column: "In Progress", priority: "medium" },
];
const PRI_COLORS = { low: "#22c55e", medium: "#f59e0b", high: "#ef4444" };

export default function App() {
  const [tasks] = useState(INIT);
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#eee", fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Project Board</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 20 }}>
        {COLS.map(col => (
          <div key={col}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", marginBottom: 10 }}>{col} ({tasks.filter(t => t.column === col).length})</div>
            {tasks.filter(t => t.column === col).map(t => (
              <div key={t.id} style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{t.title}</span>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: PRI_COLORS[t.priority] }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    category: "Data",
    description: "Real-time analytics view with metric cards, charts, and data visualization.",
    framework: "react",
    files: [
      {
        path: "App.tsx",
        language: "tsx",
        content: `import React from "react";

const METRICS = [
  { label: "Page Views", value: "24,521", change: "+12.3%", up: true },
  { label: "Unique Visitors", value: "8,432", change: "+8.7%", up: true },
  { label: "Bounce Rate", value: "34.2%", change: "-2.1%", up: false },
  { label: "Avg Session", value: "4m 32s", change: "+15.4%", up: true },
];
const PAGES = [
  { path: "/", views: 8421, rate: "2.1%" },
  { path: "/pricing", views: 3254, rate: "5.3%" },
  { path: "/templates", views: 2876, rate: "3.8%" },
  { path: "/about", views: 1543, rate: "1.2%" },
];

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#eee", fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 20 }}>
        {METRICS.map(m => (
          <div key={m.label} style={{ padding: 18, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>{m.label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{m.value}</div>
            <div style={{ fontSize: 12, color: m.up ? "#22c55e" : "#ef4444", marginTop: 4, fontWeight: 700 }}>{m.change}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 700, fontSize: 14 }}>Top Pages</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>
            <th style={{ padding: "10px 18px", textAlign: "left" }}>Page</th>
            <th style={{ padding: "10px 18px", textAlign: "right" }}>Views</th>
            <th style={{ padding: "10px 18px", textAlign: "right" }}>Conv Rate</th>
          </tr></thead>
          <tbody>{PAGES.map(p => (
            <tr key={p.path} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <td style={{ padding: "10px 18px", fontFamily: "monospace", fontSize: 13 }}>{p.path}</td>
              <td style={{ padding: "10px 18px", textAlign: "right", fontWeight: 700 }}>{p.views.toLocaleString()}</td>
              <td style={{ padding: "10px 18px", textAlign: "right", color: "#a855f7" }}>{p.rate}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}`,
      },
    ],
  },
];

export function getAppTemplate(id: string): AppTemplate | null {
  return APP_TEMPLATES.find((t) => t.id === id) ?? null;
}

export function getAppTemplatesByFramework(fw: FrameworkType): AppTemplate[] {
  return APP_TEMPLATES.filter((t) => t.framework === fw);
}
