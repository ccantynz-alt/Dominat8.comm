import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { getMarketingMachineConfig } from "@/lib/marketingMachine/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const cfg = getMarketingMachineConfig();
  return NextResponse.json({
    ok: true,
    enabled: cfg.enabled,
    autoPublish: cfg.autoPublish,
    approvalRequired: cfg.approvalRequired,
    assetBaseUrl: cfg.assetBaseUrl,
    hasAdminToken: Boolean(cfg.adminToken),
    hasKvRest: Boolean(cfg.kvRestApiUrl && cfg.kvRestApiToken),
    buildMarker: cfg.buildMarker,
  });
}