import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

function str(v: any, fallback: string) {
  const s = String(v ?? "").trim();
  return s.length ? s : fallback;
}

/**
 * GET /api/agents/patch?projectId=demo&runId=abc
 *
 * Returns:
 *  - { ok: true, patch: { ... }, foundKey: "..." }
 * or
 *  - 404 with { ok:false, error:"NOT_FOUND", triedKeys:[...], hint:"..." }
 */
export async function GET(req: Request) {
  const url = new URL(req.url);

  const projectId = str(url.searchParams.get("projectId"), "demo");
  const runIdParam = (url.searchParams.get("runId") || "").trim();

  const triedKeys: string[] = [];

  // If runId is provided, try exact keys first.
  if (runIdParam) {
    const runId = runIdParam;

    const candidates = [
      `agentPatch:project:${projectId}:${runId}`,
      `agentPatch:project:${projectId}:run:${runId}`,
      `agentPatch:${projectId}:${runId}`,
      `agentPatch:${runId}`,
    ];

    for (const k of candidates) {
      triedKeys.push(k);
      const v = await kv.get(k);
      if (v) return NextResponse.json({ ok: true, patch: v, foundKey: k });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "NOT_FOUND",
        projectId,
        runId,
        triedKeys,
        hint: "No patch stored for this runId. Use POST /api/agents/patch-test to prove KV write/read, then re-run your agent runner patch-save path."
      },
      { status: 404 }
    );
  }

  // If runId is NOT provided, try latest keys.
  const latestCandidates = [
    `agentPatch:project:${projectId}:latest`,
    `agentPatch:${projectId}:latest`,
  ];

  for (const k of latestCandidates) {
    triedKeys.push(k);
    const v = await kv.get(k);
    if (v) return NextResponse.json({ ok: true, patch: v, foundKey: k });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "NOT_FOUND",
      projectId,
      triedKeys,
      hint: "No latest patch found. Use POST /api/agents/patch-test first."
    },
    { status: 404 }
  );
}
