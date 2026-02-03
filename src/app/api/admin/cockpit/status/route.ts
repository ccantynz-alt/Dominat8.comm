import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function countStatuses(queue: any[]): { queued: number; running: number; done: number; failed: number } {
  const c = { queued: 0, running: 0, done: 0, failed: 0 };
  for (const t of queue || []) {
    if (!t || !t.status) continue;
    const s = String(t.status);
    if (s === "queued") c.queued++;
    else if (s === "running") c.running++;
    else if (s === "done") c.done++;
    else if (s === "failed") c.failed++;
  }
  return c;
}

export async function GET() {
  const repoRoot = process.cwd();
  const queuePath = path.join(repoRoot, ".d8", "agent-queue.json");

  const stamp = "D8_ADMIN_COCKPIT_STAMP_2026-02-03_01";
  const nowUtc = new Date().toISOString();

  // Default: local filesystem mode if queue exists; otherwise disabled.
  const exists = fs.existsSync(queuePath);

  if (!exists) {
    return NextResponse.json({
      ok: true,
      stamp,
      nowUtc,
      queueMode: "disabled",
      message: "Queue file not found. Run agent baseline scripts to create .d8/agent-queue.json",
    });
  }

  try {
    const raw = fs.readFileSync(queuePath, "utf8");
    const j = JSON.parse(raw);
    const queue = Array.isArray(j?.queue) ? j.queue : [];
    const queueCounts = countStatuses(queue);

    return NextResponse.json({
      ok: true,
      stamp,
      nowUtc,
      queueMode: "fs",
      queuePath,
      queueCounts,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        stamp,
        nowUtc,
        queueMode: "fs",
        queuePath,
        message: e?.message || String(e),
      },
      { status: 500 }
    );
  }
}