import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { listContent } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const campaignId = String(searchParams.get("campaignId") || "");
  if (!campaignId) return NextResponse.json({ ok: false, error: "campaignId is required" }, { status: 400 });

  const content = await listContent(campaignId);
  return NextResponse.json({ ok: true, content });
}