"use client";

import React from "react";

type ApiResult = {
  ok: boolean;
  status: number;
  ms: number;
  json: any;
};

async function getJson(url: string): Promise<ApiResult> {
  const t0 = Date.now();
  const r = await fetch(url, { cache: "no-store" });
  const ms = Date.now() - t0;

  let j: any = null;
  try {
    j = await r.json();
  } catch {
    j = null;
  }

  return { ok: r.ok, status: r.status, ms, json: j };
}

/**
 * TV overlay is DISABLED by default.
 * Enable with: ?tv=1
 * OR env: NEXT_PUBLIC_D8_TV=1
 */
function isTvEnabled(): boolean {
  try {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("tv") === "1") return true;
    }
  } catch {}

  try {
    const v = (process as any)?.env?.NEXT_PUBLIC_D8_TV;
    if (v === "1" || v === "true") return true;
  } catch {}

  return false;
}

function Tile(props: { name: string; data: ApiResult | null }) {
  const d = props.data;
  const ok = !!(d && d.ok);
  const ms = d && typeof d.ms === "number" ? d.ms : null;

  return (
    <div
      style={{
        padding: 8,
        borderRadius: 10,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>{props.name}</div>
        <div style={{ opacity: 0.85 }}>
          {ok ? "OK" : "—"}
          {ms !== null ? ` ${ms}ms` : ""}
        </div>
      </div>
      <div style={{ marginTop: 6, opacity: 0.85 }}>
        {d ? `HTTP ${d.status}` : "no data"}
      </div>
    </div>
  );
}

export default function D8TV() {
  const [enabled, setEnabled] = React.useState(false);
  const [stamp, setStamp] = React.useState<ApiResult | null>(null);
  const [where, setWhere] = React.useState<ApiResult | null>(null);
  const [proof, setProof] = React.useState<ApiResult | null>(null);
  const [kv, setKv] = React.useState<ApiResult | null>(null);

  React.useEffect(() => {
    setEnabled(isTvEnabled());
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    let alive = true;

    async function pull() {
      const ts = Math.floor(Date.now() / 1000);
      const s = await getJson(`/api/__d8__/stamp?ts=${ts}`);
      const w = await getJson(`/api/__d8__/where?ts=${ts}`);
      const p = await getJson(`/api/__d8__/proof?ts=${ts}`);
      const k = await getJson(`/api/__d8__/kv?ts=${ts}`);

      if (!alive) return;
      setStamp(s);
      setWhere(w);
      setProof(p);
      setKv(k);
    }

    void pull();
    const id = setInterval(() => {
      void pull();
    }, 2500);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [enabled]);

  if (!enabled) return null;

  const okCount = [stamp, where, proof, kv].filter((x) => x && x.ok).length;

  return (
    <div
      style={{
        position: "fixed",
        left: 14,
        bottom: 14,
        zIndex: 9999,
        width: 360,
        padding: 12,
        borderRadius: 12,
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        fontFamily: "ui-monospace, Menlo, Consolas, monospace",
        fontSize: 12,
        lineHeight: 1.35,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>D8 TV</div>
        <div style={{ opacity: 0.85 }}>OK {okCount}/4</div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <Tile name="stamp" data={stamp} />
        <Tile name="where" data={where} />
        <Tile name="proof" data={proof} />
        <Tile name="kv" data={kv} />
      </div>
    </div>
  );
}
