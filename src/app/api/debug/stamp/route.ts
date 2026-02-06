import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    stamp: "NUKEOS_COM_STAMP_20260205_131138",
    ok: true,
    now: new Date().toISOString()
  });
}
