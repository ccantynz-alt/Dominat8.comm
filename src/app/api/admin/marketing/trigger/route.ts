import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { runScheduler } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const body = await req.json().catch(() => ({} as any));
  const now = body.now ? String(body.now) : undefined;

  const result = await runScheduler(now);
  return NextResponse.json({ ok: true, result });
}