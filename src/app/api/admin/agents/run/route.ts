import { NextResponse } from "next/server";
import { requireAdmin, safeOrigin } from "@/lib/admin/auth";
import { kvSetJson, d8Key_agentLatest, d8Key_agentRun } from "@/lib/d8kv";

export const runtime = "nodejs";

function idStamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}_${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

export async function POST(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return NextResponse.json({ ok: false, error: gate.error }, { status: 200 });

  try {
    const body = await req.json().catch(() => ({}));
    const projectId = String(body?.projectId || "demo").trim();
    const agentId = String(body?.agentId || "").trim();
    const instruction = String(body?.instruction || "").trim();

    if (!agentId) return NextResponse.json({ ok: false, error: "agentId required" }, { status: 200 });
    if (!instruction) return NextResponse.json({ ok: false, error: "instruction required" }, { status: 200 });

    const runId = `agent_${idStamp()}_${Math.random().toString(36).slice(2, 10)}`;
    const origin = safeOrigin(req);

    // Proxy call to existing agent runner
    const r = await fetch(`${origin}/api/agents/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Pass through admin token so your runner can optionally guard too
        "x-admin-token": req.headers.get("x-admin-token") || "",
        "authorization": req.headers.get("authorization") || "",
      },
      body: JSON.stringify({
        projectId,
        agentId,
        instruction,
        runId,
        mode: "real-run",
      }),
      cache: "no-store",
    });

    const j = await r.json().catch(() => ({}));

    const record = {
      ok: true,
      kind: "agent-run",
      projectId,
      agentId,
      instruction,
      runId,
      startedAtIso: new Date().toISOString(),
      proxiedStatus: r.status,
      response: j,
    };

    await kvSetJson(d8Key_agentRun(projectId, runId), record);
    await kvSetJson(d8Key_agentLatest(projectId), record);

    return NextResponse.json({ ok: true, record });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 200 });
  }
}