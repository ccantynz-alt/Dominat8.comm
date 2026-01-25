import { NextResponse } from "next/server";
import { safeDomain, hostFor } from "@/lib/domains/dns";

/**
 * GET /api/domains/resolve?domain=...
 * Marker: DOMAIN_WIZARD_V1
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("domain") || "";

  try {
    const apex = safeDomain(raw);
    const host = hostFor(apex);

    const res = NextResponse.json(
      { ok: true, marker: "DOMAIN_WIZARD_V1", input: raw, apex, host },
      { status: 200 }
    );
    res.headers.set("cache-control", "no-store");
    return res;
  } catch (e: any) {
    const res = NextResponse.json(
      { ok: false, marker: "DOMAIN_WIZARD_V1", input: raw, error: e?.message || "Invalid domain." },
      { status: 400 }
    );
    res.headers.set("cache-control", "no-store");
    return res;
  }
}