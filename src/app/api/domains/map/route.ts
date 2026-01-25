import { NextResponse } from "next/server";
import { safeDomain } from "@/lib/domains/dns";
import { addDomainToProject, verifyProjectDomain, getDomainConfig } from "@/lib/domains/vercel";

/**
 * POST /api/domains/map
 * Marker: DOMAIN_MAPPING_V1
 *
 * Body:
 * {
 *   "domain": "example.com",
 *   "projectIdOrName"?: "my-saas-app",   // optional if env has it
 *   "teamId"?: "team_..."               // optional if env has it
 * }
 *
 * SAFETY:
 * - Requires MAP_DOMAIN_ENABLED=true
 * - Requires VERCEL_API_TOKEN
 * - Requires a project id or name (env or body)
 */

export const dynamic = "force-dynamic";

function envProjectIdOrName(): string | null {
  return (
    process.env.VERCEL_PROJECT_ID_OR_NAME ||
    process.env.VERCEL_PROJECT_ID ||
    process.env.VERCEL_PROJECT_NAME ||
    null
  );
}

export async function POST(req: Request) {
  const enabled = (process.env.MAP_DOMAIN_ENABLED || "").toLowerCase() === "true";
  if (!enabled) {
    return NextResponse.json(
      { ok: false, marker: "DOMAIN_MAPPING_V1", error: "Domain mapping is disabled (MAP_DOMAIN_ENABLED != true)." },
      { status: 503 }
    );
  }

  const token = process.env.VERCEL_API_TOKEN || "";
  if (!token) {
    return NextResponse.json(
      { ok: false, marker: "DOMAIN_MAPPING_V1", error: "Missing VERCEL_API_TOKEN env var." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const rawDomain = (body?.domain || "") as string;

  // prefer explicit body fields, fallback to env
  const teamId = (body?.teamId as string | undefined) || process.env.VERCEL_TEAM_ID || undefined;
  const projectIdOrName =
    (body?.projectIdOrName as string | undefined) || envProjectIdOrName() || "";

  if (!projectIdOrName) {
    return NextResponse.json(
      {
        ok: false,
        marker: "DOMAIN_MAPPING_V1",
        error:
          "Missing project identifier. Provide body.projectIdOrName OR set VERCEL_PROJECT_ID_OR_NAME (or VERCEL_PROJECT_ID / VERCEL_PROJECT_NAME).",
      },
      { status: 500 }
    );
  }

  try {
    const domain = safeDomain(rawDomain);

    // 1) Add domain to project (may return verified=false + verification challenges)
    const added = await addDomainToProject({ token, projectIdOrName, domain, teamId });

    // 2) Attempt verification (safe to try even if already verified; API decides)
    let verifiedAttempt: any = null;
    try {
      verifiedAttempt = await verifyProjectDomain({ token, projectIdOrName, domain, teamId });
    } catch (e: any) {
      // verification can fail while DNS not propagated; we return error details but do not fail whole request
      verifiedAttempt = { ok: false, error: e?.message || "verify failed", status: e?.status, raw: e?.raw };
    }

    // 3) Config check (helps tell user what DNS Vercel sees)
    let config: any = null;
    try {
      config = await getDomainConfig({ token, domain, teamId });
    } catch (e: any) {
      config = { ok: false, error: e?.message || "config check failed", status: e?.status, raw: e?.raw };
    }

    const res = NextResponse.json(
      {
        ok: true,
        marker: "DOMAIN_MAPPING_V1",
        projectIdOrName,
        teamId: teamId || null,
        domain,
        added,
        verifyAttempt: verifiedAttempt,
        config,
        next: [
          "If verification challenges are returned, add the required DNS record then retry mapping.",
          "Once config shows correctly configured, SSL will be issued automatically by Vercel.",
        ],
      },
      { status: 200 }
    );

    res.headers.set("cache-control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("x-dominat8-domain-mapping", "DOMAIN_MAPPING_V1");
    res.headers.set("x-dominat8-domain", domain);
    return res;
  } catch (e: any) {
    const msg = e?.message || "Mapping failed.";
    const status = typeof e?.status === "number" ? e.status : 400;

    const res = NextResponse.json(
      { ok: false, marker: "DOMAIN_MAPPING_V1", error: msg, details: e?.raw || null },
      { status }
    );
    res.headers.set("cache-control", "no-store");
    return res;
  }
}