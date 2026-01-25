import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { scheduleContent } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const id = String(ctx.params.id || "");
  const body = await req.json().catch(() => ({} as any));
  const scheduledFor = String(body.scheduledFor || "").trim();
  if (!scheduledFor) return NextResponse.json({ ok: false, error: "scheduledFor is required (ISO string)" }, { status: 400 });

  try {
    const r = await scheduleContent(id, scheduledFor);
    return NextResponse.json({ ok: true, ...r });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ? String(e.message) : "Schedule error" }, { status: 400 });
  }
}