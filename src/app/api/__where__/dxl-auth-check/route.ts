import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      stamp: "DXL_WHERE_LOCATOR_ALLROOTS_20260129",
      at: new Date().toISOString(),
      path: "/api/__where__/dxl-auth-check",
      note: "Locator endpoint. If you see this JSON, the API route exists on this deploy.",
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "x-dxl-where": "DXL_WHERE_LOCATOR_ALLROOTS_20260129",
        "x-dxl-route": "app-router",
      },
    }
  );
}
