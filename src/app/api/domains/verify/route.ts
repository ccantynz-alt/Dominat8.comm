import { NextRequest, NextResponse } from "next/server";
import { kvGetJson, kvSetJson } from "@/lib/d8kv";

const DOMAINS_KEY = "d8:domains";

export type DomainRecord = {
  id: string;
  domain: string;
  txtRecord: string;
  status: "pending_dns" | "dns_verified" | "ssl_provisioning" | "ready" | "error";
  createdAt: string;
  updatedAt: string;
  errorMsg?: string;
};

async function getDomains(): Promise<DomainRecord[]> {
  return (await kvGetJson<DomainRecord[]>(DOMAINS_KEY)) ?? [];
}

export async function GET(req: NextRequest) {
  const domainParam = req.nextUrl.searchParams.get("domain");
  const domains = await getDomains();

  if (domainParam) {
    const record = domains.find((d) => d.domain === domainParam);
    if (!record) return NextResponse.json({ ok: false, error: "Domain not found" }, { status: 404 });
    return NextResponse.json({ ok: true, domain: record });
  }

  return NextResponse.json({ ok: true, domains });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const domain = body?.domain?.trim()?.toLowerCase();

  if (!domain) {
    return NextResponse.json({ ok: false, error: "domain is required" }, { status: 400 });
  }

  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/;
  if (!domainRegex.test(domain)) {
    return NextResponse.json({ ok: false, error: "Invalid domain format" }, { status: 400 });
  }

  const domains = await getDomains();
  const existing = domains.find((d) => d.domain === domain);
  if (existing) {
    return NextResponse.json({ ok: true, domain: existing, existing: true });
  }

  const now = new Date().toISOString();
  const txtValue = `d8-verify=${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

  const record: DomainRecord = {
    id: `dom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    domain,
    txtRecord: txtValue,
    status: "pending_dns",
    createdAt: now,
    updatedAt: now,
  };

  domains.push(record);
  await kvSetJson(DOMAINS_KEY, domains);

  return NextResponse.json({
    ok: true,
    domain: record,
    instructions: {
      type: "TXT",
      name: `_dominat8.${domain}`,
      value: txtValue,
      cname: { name: domain, value: "cname.vercel-dns.com" },
    },
  }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const domain = body?.domain?.trim()?.toLowerCase();
  const action = body?.action; // "check_dns" | "provision_ssl" | "mark_ready"

  if (!domain || !action) {
    return NextResponse.json({ ok: false, error: "domain and action required" }, { status: 400 });
  }

  const domains = await getDomains();
  const idx = domains.findIndex((d) => d.domain === domain);
  if (idx === -1) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const record = domains[idx];
  const now = new Date().toISOString();

  if (action === "check_dns") {
    // In production, this would do a real DNS lookup for the TXT record
    // For now, simulate DNS verification after domain is added
    record.status = "dns_verified";
    record.updatedAt = now;
  } else if (action === "provision_ssl") {
    if (record.status !== "dns_verified") {
      return NextResponse.json({ ok: false, error: "DNS must be verified first" }, { status: 400 });
    }
    record.status = "ssl_provisioning";
    record.updatedAt = now;
    // Simulate SSL provisioning completing quickly
    record.status = "ready";
  } else if (action === "mark_ready") {
    record.status = "ready";
    record.updatedAt = now;
  }

  domains[idx] = record;
  await kvSetJson(DOMAINS_KEY, domains);

  return NextResponse.json({ ok: true, domain: record });
}
