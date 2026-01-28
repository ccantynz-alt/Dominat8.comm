import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { ADMIN_AGENTS, ADMIN_BUNDLES } from "@/lib/admin/registry";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return NextResponse.json({ ok: false, error: gate.error }, { status: 200 });

  return NextResponse.json({
    ok: true,
    agents: ADMIN_AGENTS,
    bundles: ADMIN_BUNDLES,
  });
}