import { NextResponse } from "next/server";
import { safeDomain, hostFor } from "@/lib/domains/dns";

/**
 * GET /api/domains/instructions?domain=...
 * Marker: DOMAIN_WIZARD_V1
 *
 * Outputs the DNS records we recommend.
 * (No mapping is performed here.)
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("domain") || "";

  try {
    const apex = safeDomain(raw);
    const host = hostFor(apex);

    // Vercel recommended pattern: CNAME www -> cname.vercel-dns.com
    // Apex often uses A records; we provide both options.
    const res = NextResponse.json(
      {
        ok: true,
        marker: "DOMAIN_WIZARD_V1",
        domain: apex,
        recommended: {
          primaryHost: host,
          records: [
            { type: "CNAME", name: "www", value: "cname.vercel-dns.com", note: "Recommended primary host" },
            { type: "A", name: "@", value: "76.76.21.21", note: "Apex pointing to Vercel (common baseline)" },
          ],
          notes: [
            "Set CNAME for www, then optionally redirect apex (@) -> www at your DNS provider.",
            "DNS propagation can take minutes to hours.",
          ],
        },
      },
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