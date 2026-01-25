/**
 * Dominat8 Build Info
 * Marker: BUILD_PROOF_V1
 *
 * Single source of truth for build/deploy proof.
 * Safe for server usage. Client should read via /api/__build__.
 */

export type BuildInfo = {
  marker: "BUILD_PROOF_V1";
  stamp: string;           // NEXT_PUBLIC_BUILD_STAMP or fallback
  markerPublic: string;    // NEXT_PUBLIC_BUILD_MARKER or fallback
  vercelEnv?: string;      // VERCEL_ENV
  vercelUrl?: string;      // VERCEL_URL
  gitSha?: string;         // VERCEL_GIT_COMMIT_SHA
  gitRef?: string;         // VERCEL_GIT_COMMIT_REF
  nowIso: string;          // response time (server)
};

export function getBuildInfo(): BuildInfo {
  const stamp = process.env.NEXT_PUBLIC_BUILD_STAMP || process.env.BUILD_STAMP || "LOCAL_DEV";
  const markerPublic = process.env.NEXT_PUBLIC_BUILD_MARKER || "BUILD_PROOF_V1";

  return {
    marker: "BUILD_PROOF_V1",
    stamp,
    markerPublic,
    vercelEnv: process.env.VERCEL_ENV,
    vercelUrl: process.env.VERCEL_URL,
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA,
    gitRef: process.env.VERCEL_GIT_COMMIT_REF,
    nowIso: new Date().toISOString(),
  };
}