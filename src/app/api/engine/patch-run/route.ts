//
// ENGINE_INSTALL_009_PATCHRUN_TS_OK_20260129_064145
//
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ENGINE_INSTALL = "009";
const ENGINE_STAMP = "ENGINE_INSTALL_009_STAMP_2026-01-28_NZ";
const KEY_LAST = "engine:lastPatchRun";

// In-memory fallback (dev)
let memLast: any = null;

function withEngineHeaders(res: NextResponse) {
  res.headers.set("x-dominat8-engine-install", ENGINE_INSTALL);
  res.headers.set("x-dominat8-engine-stamp", ENGINE_STAMP);
  res.headers.set("x-dominat8-engine-proof", "ENGINE_INSTALL_009_PATCHRUN_TS_OK_20260129_064145");
  return res;
}

function kvCfg() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REST_URL || "";
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REST_TOKEN || "";
  return { ok: !!url && !!token, url, token };
}

async function kvGet(key: string) {
  const kv = kvCfg();
  if (!kv.ok) return { ok: false, reason: "KV not configured", value: null };
  const res = await fetch(`${kv.url}/get/${encodeURIComponent(key)}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${kv.token}` },
    cache: "no-store",
  });
  const j = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, value: j?.result ?? null };
}

async function kvSet(key: string, value: any) {
  const kv = kvCfg();
  if (!kv.ok) return { ok: false, reason: "KV not configured" };

  // Store as JSON string
  const payload = JSON.stringify(value);

  const res = await fetch(`${kv.url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kv.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const j = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, result: j?.result ?? null };
}

function requireAdmin(req: Request) {
  const want = process.env.ENGINE_ADMIN_TOKEN || "";
  if (!want) return { ok: true, mode: "open" as const };
  const got = req.headers.get("x-engine-admin-token") || "";
  if (got && got === want) return { ok: true, mode: "token" as const };
  return { ok: false, mode: "token" as const };
}

export async function GET() {
  const kv = kvCfg();
  const fromKv = await kvGet(KEY_LAST);
  const last = fromKv.ok ? fromKv.value : memLast;

  return withEngineHeaders(
    NextResponse.json(
      {
        ok: true,
        engine: { install: ENGINE_INSTALL, stamp: ENGINE_STAMP, proof: "ENGINE_INSTALL_009_PATCHRUN_TS_OK_20260129_064145" },
        kvConfigured: kv.ok,
        key: KEY_LAST,
        lastPatchRun: last ?? null,
        source: fromKv.ok ? "kv" : (memLast ? "memory" : "none"),
      },
      { status: 200 }
    )
  );
}

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.ok) {
    return withEngineHeaders(
      NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
    );
  }

  let payload: any = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  const run = {
    ok: true,
    at: new Date().toISOString(),
    runId: payload?.runId ?? ("run_" + Math.random().toString(16).slice(2)),
    who: payload?.who ?? "unknown",
    summary: payload?.summary ?? "patch-run",
    filesChanged: Array.isArray(payload?.filesChanged) ? payload.filesChanged : [],
    meta: payload?.meta ?? {},
  };

  memLast = run;

  const kvWrite = await kvSet(KEY_LAST, run);

  return withEngineHeaders(
    NextResponse.json(
      {
        ok: true,
        stored: { memory: true, kv: kvWrite.ok ? true : false },
        kvWrite: kvWrite.ok
          ? { ok: true, status: kvWrite.status }
          : { ok: false, reason: (kvWrite as any).reason ?? "kv_write_failed" },
        run,
        authMode: auth.mode,
      },
      { status: 200 }
    )
  );
}