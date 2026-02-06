import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "dominat8.com",
    stamp: "D8_COM_HEALTH_20260206_203554",
    time: new Date().toISOString()
  }, { status: 200 });
}