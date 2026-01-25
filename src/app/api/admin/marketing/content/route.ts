import { NextResponse } from "next/server";

/**
 * BUILD-SAFE STUB (TEMP)
 * Marker: MM_CONTENT_ROUTE_STUB_V1
 *
 * marketingMachine admin endpoints are disabled while homepage ships.
 */
export async function GET() {
  return NextResponse.json(
    { ok: false, disabled: true, reason: "marketing content endpoint temporarily disabled" },
    { status: 503 }
  );
}

export async function POST() {
  return NextResponse.json(
    { ok: false, disabled: true, reason: "marketing content endpoint temporarily disabled" },
    { status: 503 }
  );
}