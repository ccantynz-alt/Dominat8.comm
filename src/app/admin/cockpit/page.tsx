"use client";

import React, { useEffect, useMemo, useState } from "react";

type Status = {
  ok: boolean;
  stamp: string;
  nowUtc: string;
  queueMode: "fs" | "disabled";
  queuePath?: string;
  queueCounts?: { queued: number; running: number; done: number; failed: number };
  message?: string;
};

function getToken(): string {
  // We purposely do NOT store token in localStorage.
  // User provides token via cookie or header using dev tools / client extension.
  // For local use only, we allow entering token to send as header.
  return "";
}

export default function CockpitPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const headers = useMemo(() => {
    const h: Record<string, string> = {};
    if (token.trim()) h["x-admin-token"] = token.trim();
    return h;
  }, [token]);

  async function refresh() {
    setErr(null);
    try {
      const res = await fetch("/api/admin/cockpit/status", { headers, cache: "no-store" });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(res.status + " " + t);
      }
      const j = (await res.json()) as Status;
      setStatus(j);
    } catch (e: any) {
      setErr(e?.message || String(e));
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
      <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Cockpit</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Local-first admin cockpit. No public UI changes.</div>
          </div>
          <button onClick={refresh} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", background: "white", cursor: "pointer" }}>
            Refresh
          </button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Admin token (header: x-admin-token)</div>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste ADMIN_TOKEN here for local testing"
              style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }}
            />
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Tip: In production, prefer cookie-based auth handled outside the browser. This field is for local testing only.
            </div>
          </div>

          {err && (
            <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,0,0,0.06)", border: "1px solid rgba(255,0,0,0.18)" }}>
              <div style={{ fontWeight: 700 }}>Error</div>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>{err}</div>
            </div>
          )}

          <div style={{ padding: 12, borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.10)" }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Status</div>
            <pre style={{ margin: 0, fontSize: 12, overflow: "auto" }}>
{JSON.stringify(status, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Next</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>
          Script 8 will add admin endpoints for enqueueing tasks and reading recent logs (local FS mode).
        </div>
      </div>
    </div>
  );
}