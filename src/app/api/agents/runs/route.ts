import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") || "demo";
  const limit = Math.max(1, Math.min(25, Number(searchParams.get("limit") || "10")));

  const keyIds = `agentRun:project:${projectId}:ids`;
  const ids = (await kv.lrange(keyIds, 0, limit - 1)) as string[] | null;

  const runs: any[] = [];
  if (ids && ids.length) {
    const keys = ids.map((id) => `agentRun:project:${projectId}:${id}`);
    const values = await kv.mget(keys);
    for (let i = 0; i < values.length; i++) {
      if (values[i]) runs.push(values[i]);
    }
  }

  const latestKey = `agentRun:project:${projectId}:latest`;
  const latest = await kv.get(latestKey);

  return NextResponse.json({
    ok: true,
    projectId,
    latestKey,
    latest,
    runs,
    ids: ids || []
  });
}
