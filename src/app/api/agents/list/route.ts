import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

async function safeReadFirstLine(filePath: string) {
  try {
    const txt = await fs.readFile(filePath, "utf8");
    const first = txt.split(/\r?\n/).find(l => l.trim().length > 0) || "";
    return first.trim().slice(0, 120);
  } catch {
    return "";
  }
}

export async function GET() {
  const agentsDir = path.join(process.cwd(), "agents");
  let files: string[] = [];
  try {
    files = await fs.readdir(agentsDir);
  } catch {
    return NextResponse.json({ ok: false, error: "agents/ directory not found on server" }, { status: 500 });
  }

  const md = files.filter(f => f.endsWith(".md"));

  const agents = await Promise.all(
    md.map(async (f) => {
      const id = f.replace(/\.md$/, "");
      const p = path.join(agentsDir, f);
      const hint = await safeReadFirstLine(p);
      return { id, file: f, hint };
    })
  );

  agents.sort((a, b) => a.id.localeCompare(b.id));

  return NextResponse.json({ ok: true, agents });
}
