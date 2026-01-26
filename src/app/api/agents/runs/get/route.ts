import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || "demo";
  const runId = searchParams.get("runId");

  if (!runId) {
    return NextResponse.json({ ok: false, error: "Missing runId" }, { status: 400 });
  }

  const keyById = `agentRun:project:${projectId}:${runId}`;
  const item = await kv.get(keyById);

  return NextResponse.json({ ok: true, keyById, item });
}
