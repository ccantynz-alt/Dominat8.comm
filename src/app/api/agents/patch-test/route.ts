import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

/**
 * POST /api/agents/patch-test
 * Body: { projectId?: string, runId?: string }
 *
 * Writes a known PowerShell script into KV, under several common key shapes,
 * so GET /api/agents/patch can fetch it reliably.
 */
export async function POST(req: Request) {
  let body: any = {};
  try { body = await req.json(); } catch {}

  const projectId = String(body?.projectId || "demo");
  const runId = String(body?.runId || `test_${Date.now().toString(36)}`);

  const script = [
    'Set-StrictMode -Version Latest',
    '$ErrorActionPreference = "Stop"',
    'Write-Host "PATCH_OK"',
  ].join("\r\n");

  const patchObj = { runId, projectId, createdAt: new Date().toISOString(), script };

  // Write to several key variants so we can prove read/write even if existing code expects a different pattern.
  const keys = [
    `agentPatch:project:${projectId}:latest`,
    `agentPatch:project:${projectId}:${runId}`,
    `agentPatch:${projectId}:latest`,
    `agentPatch:${projectId}:${runId}`,
    `agentPatch:project:${projectId}:run:${runId}`,
  ];

  await Promise.all(keys.map((k) => kv.set(k, patchObj)));

  return NextResponse.json({ ok: true, projectId, runId, wroteKeys: keys });
}
