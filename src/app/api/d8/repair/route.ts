import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

function unauthorized(msg: string) {
  return NextResponse.json({ ok: false, error: "unauthorized", message: msg }, { status: 401 });
}
function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: "bad_request", message: msg }, { status: 400 });
}

async function readJson(req: Request): Promise<any> {
  try { return await req.json(); } catch { return null; }
}

function requireAdmin(req: Request) {
  const expected = process.env.D8_ADMIN_KEY || "";
  const got = req.headers.get("x-admin-key") || "";
  if (!expected || expected.length < 12) return { ok: false, reason: "D8_ADMIN_KEY not configured" };
  if (!got) return { ok: false, reason: "Missing X-Admin-Key header" };
  if (got !== expected) return { ok: false, reason: "Invalid admin key" };
  return { ok: true };
}

export async function POST(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return unauthorized(gate.reason);

  const payload = await readJson(req);
  if (!payload) return badRequest("Expected JSON body");
  const action = (payload.action || "").toString().toLowerCase().trim();
  if (action !== "ping") return badRequest("Unknown action. Supported: ping");

  return NextResponse.json({
    ok: true,
    stamp: "D8_COM_HEALTH_20260206_203554",
    time: new Date().toISOString(),
    action: "ping"
  }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Use POST" }, { status: 405 });
}