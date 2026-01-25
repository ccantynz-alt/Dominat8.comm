import { NextRequest } from "next/server";
import { getMarketingMachineConfig } from "./config";

export function requireAdmin(req: NextRequest): { ok: boolean; reason?: string } {
  const cfg = getMarketingMachineConfig();

  // If ADMIN_TOKEN is set, enforce it.
  if (cfg.adminToken) {
    const header =
      req.headers.get("x-d8-admin-token") ||
      req.headers.get("authorization") ||
      "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : header;
    if (!token || token !== cfg.adminToken) {
      return { ok: false, reason: "Missing/invalid admin token (x-d8-admin-token or Authorization: Bearer ...)" };
    }
  }

  return { ok: true };
}