/**
 * Vercel REST API helpers for Domain Wizard
 * Marker: DOMAIN_MAPPING_V1
 *
 * Endpoints used:
 * - Add domain to project: POST /v10/projects/:idOrName/domains  (docs)
 * - Verify project domain: POST /v9/projects/:idOrName/domains/:domain/verify (docs)
 * - Get domain config: GET /v6/domains/:domain/config (docs)
 */

export type VercelApiError = {
  status: number;
  message: string;
  raw?: any;
};

export type AddDomainResult = any;
export type VerifyDomainResult = any;
export type DomainConfigResult = any;

function joinQuery(base: string, qs: Record<string, string | undefined | null>) {
  const u = new URL(base);
  for (const [k, v] of Object.entries(qs)) {
    if (v) u.searchParams.set(k, v);
  }
  return u.toString();
}

async function vercelFetchJson(args: {
  token: string;
  url: string;
  method: "GET" | "POST";
  body?: any;
}): Promise<any> {
  const res = await fetch(args.url, {
    method: args.method,
    headers: {
      authorization: `Bearer ${args.token}`,
      "content-type": "application/json",
    },
    body: args.body ? JSON.stringify(args.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text().catch(() => "");
  const json = text ? (() => { try { return JSON.parse(text); } catch { return { raw: text }; } })() : null;

  if (!res.ok) {
    const msg =
      (json && (json.error?.message || json.message)) ||
      `Vercel API error (${res.status})`;
    const err: VercelApiError = { status: res.status, message: msg, raw: json };
    throw err;
  }

  return json;
}

export async function addDomainToProject(args: {
  token: string;
  projectIdOrName: string;
  domain: string;
  teamId?: string;
}): Promise<AddDomainResult> {
  const url = joinQuery(
    `https://api.vercel.com/v10/projects/${encodeURIComponent(args.projectIdOrName)}/domains`,
    { teamId: args.teamId || undefined }
  );

  // Docs accept body with domain name (commonly { name: domain })
  return vercelFetchJson({
    token: args.token,
    url,
    method: "POST",
    body: { name: args.domain },
  });
}

export async function verifyProjectDomain(args: {
  token: string;
  projectIdOrName: string;
  domain: string;
  teamId?: string;
}): Promise<VerifyDomainResult> {
  const url = joinQuery(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(args.projectIdOrName)}/domains/${encodeURIComponent(args.domain)}/verify`,
    { teamId: args.teamId || undefined }
  );

  return vercelFetchJson({
    token: args.token,
    url,
    method: "POST",
  });
}

export async function getDomainConfig(args: {
  token: string;
  domain: string;
  teamId?: string;
}): Promise<DomainConfigResult> {
  const url = joinQuery(
    `https://api.vercel.com/v6/domains/${encodeURIComponent(args.domain)}/config`,
    { teamId: args.teamId || undefined }
  );

  return vercelFetchJson({
    token: args.token,
    url,
    method: "GET",
  });
}