import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || "demo";
  const limit = Math.max(1, Math.min(50, Number(searchParams.get("limit") || "20")));

  const idsKey = `agentRun:project:${projectId}:ids`;
  const runIds = (await kv.lrange(idsKey, 0, limit - 1)) as string[] | null;

  const runs: any[] = [];
  if (Array.isArray(runIds)) {
    for (const runId of runIds) {
      const keyById = `agentRun:project:${projectId}:${runId}`;
      const item = await kv.get(keyById);
      if (item) runs.push(item);
    }
  }

  return NextResponse.json({ ok: true, projectId, idsKey, count: runs.length, runs });
}
