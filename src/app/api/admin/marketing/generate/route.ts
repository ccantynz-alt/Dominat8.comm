import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { createContent, getCampaign } from "@/lib/marketingMachine/store";
import { MarketingPlatform } from "@/lib/marketingMachine/types";

export const dynamic = "force-dynamic";

function parsePlatforms(v: any): MarketingPlatform[] {
  const arr = Array.isArray(v) ? v : [];
  const allowed: MarketingPlatform[] = ["tiktok", "instagram", "facebook"];
  return arr.filter((x: any) => allowed.includes(x));
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const body = await req.json().catch(() => ({} as any));
  const campaignId = String(body.campaignId || "").trim();
  if (!campaignId) return NextResponse.json({ ok: false, error: "campaignId is required" }, { status: 400 });

  const campaign = await getCampaign(campaignId);
  if (!campaign) return NextResponse.json({ ok: false, error: "Campaign not found" }, { status: 404 });

  const platforms = parsePlatforms(body.platforms);
  const countPerPlatform = Math.max(1, Math.min(5, Number(body.countPerPlatform || 1)));

  const chosen = platforms.length ? platforms : campaign.platforms;
  const created = [];

  for (const p of chosen) {
    for (let i = 0; i < countPerPlatform; i++) {
      const item = await createContent(campaignId, p);
      created.push(item);
    }
  }

  return NextResponse.json({ ok: true, createdCount: created.length, created });
}