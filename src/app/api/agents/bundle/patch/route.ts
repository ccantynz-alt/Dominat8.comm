import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

/**
 * GET /api/agents/bundle/patch?projectId=demo&bundleRunId=...
 * Also supports:
 *   GET /api/agents/bundle/patch?projectId=demo  (fetch latest)
 *
 * This endpoint is tolerant to key-shape changes. It tries multiple key patterns.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);

  const projectId = String(url.searchParams.get("projectId") || "demo");
  const bundleRunId = String(url.searchParams.get("bundleRunId") || "").trim();

  const triedKeys: string[] = [];

  // Prefer explicit bundleRunId if provided
  const candidates: string[] = [];

  if (bundleRunId) {
    candidates.push(
      `agentBundlePatch:project:${projectId}:${bundleRunId}`,
      `agentBundlePatch:${projectId}:${bundleRunId}`,
      `agentBundlePatch:project:${projectId}:run:${bundleRunId}`,
      `agentBundlePatch:${projectId}:run:${bundleRunId}`
    );
  } else {
    // latest fallback
    candidates.push(
      `agentBundlePatch:project:${projectId}:latest`,
      `agentBundlePatch:${projectId}:latest`
    );
  }

  // Always also try project latest as a safety net (in case caller passed a stale bundleRunId)
  if (bundleRunId) {
    candidates.push(
      `agentBundlePatch:project:${projectId}:latest`,
      `agentBundlePatch:${projectId}:latest`
    );
  }

  // De-dupe while preserving order
  const seen = new Set<string>();
  const uniq = candidates.filter((k) => {
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  for (const key of uniq) {
    triedKeys.push(key);
    const patch = await kv.get<any>(key);
    if (patch) {
      return NextResponse.json({ ok: true, patch, foundKey: key, triedKeys });
    }
  }

  return NextResponse.json(
    { ok: false, error: "NOT_FOUND", triedKeys },
    { status: 404 }
  );
}
