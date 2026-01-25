import { NextResponse } from "next/server";
import {
  safeDomain,
  hostFor,
  dohQuery,
  summarizeAnswers,
  stripQuotes,
  looksLikeIp,
} from "@/lib/domains/dns";

/**
 * GET /api/domains/status?domain=...
 * Marker: DOMAIN_WIZARD_V1
 *
 * Checks:
 * - CNAME for www (recommended)
 * - A/AAAA for apex (baseline)
 * - TXT for apex (informational)
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("domain") || "";

  try {
    const apex = safeDomain(raw);
    const host = hostFor(apex);

    const [wwwCname, apexA, apexAAAA, apexTXT] = await Promise.all([
      dohQuery(host, "CNAME").catch(() => []),
      dohQuery(apex, "A").catch(() => []),
      dohQuery(apex, "AAAA").catch(() => []),
      dohQuery(apex, "TXT").catch(() => []),
    ]);

    const wwwCnameVals = summarizeAnswers(wwwCname).map((x) => x.replace(/\.$/, ""));
    const apexAVals = summarizeAnswers(apexA);
    const apexAAAAVals = summarizeAnswers(apexAAAA);
    const apexTxtVals = summarizeAnswers(apexTXT).map(stripQuotes);

    const wantsWww = "cname.vercel-dns.com";
    const wantsApexA = "76.76.21.21";

    const wwwOk = wwwCnameVals.some((v) => v.toLowerCase() === wantsWww.toLowerCase());
    const apexOk = apexAVals.some((v) => v === wantsApexA) || apexAAAAVals.length > 0;

    const hints: string[] = [];
    if (!wwwOk) hints.push(`Set CNAME for ${host} to ${wantsWww}.`);
    if (!apexOk) hints.push(`Optionally set A record for ${apex} (@) to ${wantsApexA} or redirect apex -> www.`);
    if (wwwOk && apexOk) hints.push("DNS looks good. Next step: mapping (when enabled).");

    const res = NextResponse.json(
      {
        ok: true,
        marker: "DOMAIN_WIZARD_V1",
        input: raw,
        apex,
        host,
        checks: {
          www: {
            cname: wwwCnameVals,
            expected: wantsWww,
            ok: wwwOk,
          },
          apex: {
            a: apexAVals,
            aaaa: apexAAAAVals,
            expectedA: wantsApexA,
            ok: apexOk,
            note: "Apex may be handled by redirect to www instead of A record.",
          },
          txt: {
            values: apexTxtVals,
            note: "Informational (verification TXT can be added later for mapping).",
          },
        },
        hints,
      },
      { status: 200 }
    );

    res.headers.set("cache-control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("x-dominat8-domain-wizard", "DOMAIN_WIZARD_V1");
    res.headers.set("x-dominat8-domain-apex", apex);

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