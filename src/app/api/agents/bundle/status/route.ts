import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

/**
 * GET /api/agents/bundle/status?projectId=demo&bundleRunId=bundle_xxx
 * If bundleRunId omitted => returns latest run status.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = String(url.searchParams.get("projectId") || "demo");
  const bundleRunId = String(url.searchParams.get("bundleRunId") || "").trim();

  const triedKeys: string[] = [];

  if (bundleRunId) {
    const k = `agentBundleRun:project:${projectId}:${bundleRunId}`;
    triedKeys.push(k);
    const v = await kv.get(k);
    if (v) return NextResponse.json({ ok: true, run: v, foundKey: k });
    return NextResponse.json({ ok: false, error: "NOT_FOUND", projectId, bundleRunId, triedKeys }, { status: 404 });
  }

  const latestKey = `agentBundleRun:project:${projectId}:latest`;
  triedKeys.push(latestKey);
  const latest = await kv.get(latestKey);
  if (latest) return NextResponse.json({ ok: true, run: latest, foundKey: latestKey });

  return NextResponse.json({ ok: false, error: "NOT_FOUND", projectId, triedKeys }, { status: 404 });
}
