import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const repoRoot = process.cwd();
  const queuePath = path.join(repoRoot, ".d8", "agent-queue.json");

  if (!fs.existsSync(queuePath)) {
    return NextResponse.json({ ok: false, queue: [], message: "Queue file missing (.d8/agent-queue.json)" }, { status: 500 });
  }

  try {
    const raw = fs.readFileSync(queuePath, "utf8");
    const j = JSON.parse(raw);
    const q = Array.isArray(j?.queue) ? j.queue : [];
    return NextResponse.json({ ok: true, queue: q });
  } catch (e: any) {
    return NextResponse.json({ ok: false, queue: [], message: e?.message || String(e) }, { status: 500 });
  }
}