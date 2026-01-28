import { NextResponse } from "next/server";

function nowIso() {
  try { return new Date().toISOString(); } catch { return ""; }
}

function envFirst(names: string[]): string {
  for (const n of names) {
    const v = process.env[n];
    if (v && String(v).trim()) return String(v).trim();
  }
  return "";
}

export async function GET() {
  const token = envFirst(["ADMIN_TOKEN"]);
  return NextResponse.json(
    {
      ok: true,
      at: nowIso(),
      adminTokenNameUsed: "ADMIN_TOKEN",
      hasAdminToken: !!token,
      tokenLength: token ? String(token).length : 0
    },
    { headers: { "cache-control": "no-store, max-age=0", "x-dxl": "DXL_AUTHCHECK_20260128" } }
  );
}