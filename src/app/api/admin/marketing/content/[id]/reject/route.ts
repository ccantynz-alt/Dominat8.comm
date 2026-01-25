import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { rejectContent } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const id = String(ctx.params.id || "");
  const body = await req.json().catch(() => ({} as any));
  const reason = String(body.reason || "Rejected").trim();

  const updated = await rejectContent(id, reason);
  if (!updated) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, content: updated });
}