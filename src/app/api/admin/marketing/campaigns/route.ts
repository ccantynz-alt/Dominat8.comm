import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { createCampaign, listCampaigns } from "@/lib/marketingMachine/store";
import { MarketingPlatform } from "@/lib/marketingMachine/types";

export const dynamic = "force-dynamic";

function parsePlatforms(v: any): MarketingPlatform[] {
  const arr = Array.isArray(v) ? v : [];
  const allowed: MarketingPlatform[] = ["tiktok", "instagram", "facebook"];
  return arr.filter((x: any) => allowed.includes(x));
}

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const campaigns = await listCampaigns();
  return NextResponse.json({ ok: true, campaigns });
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const body = await req.json().catch(() => ({} as any));

  const name = String(body.name || "").trim();
  const product = String(body.product || "").trim();
  const audience = String(body.audience || "").trim();
  const offer = String(body.offer || "").trim();
  const tone = String(body.tone || "premium").trim();
  const platforms = parsePlatforms(body.platforms);
  const keywords = Array.isArray(body.keywords) ? body.keywords.map((x: any) => String(x).trim()).filter(Boolean) : [];

  if (!name) return NextResponse.json({ ok: false, error: "name is required" }, { status: 400 });
  if (platforms.length === 0) return NextResponse.json({ ok: false, error: "platforms must include at least one of tiktok/instagram/facebook" }, { status: 400 });

  const c = await createCampaign({
    name,
    product,
    audience,
    offer,
    tone,
    platforms,
    keywords,
    status: "active",
  });

  return NextResponse.json({ ok: true, campaign: c });
}