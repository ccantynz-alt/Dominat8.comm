import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || "demo";
  const runId = searchParams.get("runId");

  const key = runId
    ? `agentPatch:project:${projectId}:${runId}`
    : `agentPatch:project:${projectId}:latest`;

  const patch = await kv.get(key);

  if (!patch) {
    return NextResponse.json({ ok: false, error: "Patch not found", key }, { status: 404 });
  }

  return NextResponse.json({ ok: true, key, patch });
}
