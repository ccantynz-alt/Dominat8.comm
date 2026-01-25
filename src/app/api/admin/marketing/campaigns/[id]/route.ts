import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { getCampaign, updateCampaign } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const id = String(ctx.params.id || "");
  const c = await getCampaign(id);
  if (!c) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, campaign: c });
}

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const id = String(ctx.params.id || "");
  const body = await req.json().catch(() => ({} as any));

  const patch: any = {};
  for (const k of ["name","product","audience","offer","tone","status"] as const) {
    if (body[k] !== undefined) patch[k] = body[k];
  }
  if (body.keywords !== undefined) patch.keywords = Array.isArray(body.keywords) ? body.keywords : [];

  const updated = await updateCampaign(id, patch);
  if (!updated) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, campaign: updated });
}