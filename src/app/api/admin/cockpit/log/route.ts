import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

function sanitizeName(name: string): string {
  // allow only simple filenames, no paths
  const n = name.replace(/[^a-zA-Z0-9._-]/g, "");
  return n;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const nameRaw = url.searchParams.get("name") || "";
  const name = sanitizeName(nameRaw);

  if (!name || !name.toLowerCase().endsWith(".log")) {
    return NextResponse.json({ ok: false, message: "Invalid log name" }, { status: 400 });
  }

  const repoRoot = process.cwd();
  const logDir = path.join(repoRoot, ".d8", "logs");
  const full = path.join(logDir, name);

  if (!full.startsWith(logDir)) {
    return NextResponse.json({ ok: false, message: "Invalid path" }, { status: 400 });
  }
  if (!fs.existsSync(full)) {
    return NextResponse.json({ ok: false, message: "Log not found" }, { status: 404 });
  }

  try {
    const content = fs.readFileSync(full, "utf8");
    // Limit payload size to avoid huge responses (1MB)
    const max = 1024 * 1024;
    const trimmed = content.length > max ? content.slice(content.length - max) : content;
    return NextResponse.json({ ok: true, name, content: trimmed });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || String(e) }, { status: 500 });
  }
}