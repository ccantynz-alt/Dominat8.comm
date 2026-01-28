export function requireAdmin(req: Request) {
  const required = process.env.ADMIN_TOKEN;
  if (!required) return { ok: true, reason: "ADMIN_TOKEN not set (open)" as const };

  const h = req.headers;
  const viaHeader = h.get("x-admin-token") || "";
  const viaAuth = (h.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const viaQuery = (() => {
    try { return new URL(req.url).searchParams.get("token") || ""; } catch { return ""; }
  })();

  const got = (viaHeader || viaAuth || viaQuery || "").trim();
  if (!got) return { ok: false, error: "Missing admin token. Send x-admin-token header or ?token=..." as const };
  if (got !== required) return { ok: false, error: "Invalid admin token." as const };

  return { ok: true, reason: "token ok" as const };
}

export function safeOrigin(req: Request) {
  try { return new URL(req.url).origin; } catch { return ""; }
}