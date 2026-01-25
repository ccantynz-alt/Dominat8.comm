import { NextResponse } from "next/server";
import { getBuildInfo } from "@/lib/buildInfo";

/**
 * GET /api/__build__
 * Marker: BUILD_PROOF_V1
 *
 * Purpose:
 * - Always returns a dynamic response with build proof
 * - Sets headers so you can confirm the deployed route quickly
 *
 * Note: This route intentionally disables caching.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  const info = getBuildInfo();

  const res = NextResponse.json(info, { status: 200 });

  // Explicit no-cache: eliminate any doubt.
  res.headers.set("cache-control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("pragma", "no-cache");
  res.headers.set("expires", "0");

  // Helpful proof headers
  res.headers.set("x-dominat8-build-marker", info.marker);
  res.headers.set("x-dominat8-build-stamp", info.stamp);
  if (info.gitSha) res.headers.set("x-dominat8-git-sha", info.gitSha);

  return res;
}