export interface MarketingMachineConfig {
  enabled: boolean;
  autoPublish: boolean;
  approvalRequired: boolean;
  assetBaseUrl: string;
  adminToken?: string;

  // KV REST (Vercel KV / Upstash REST) - optional
  kvRestApiUrl?: string;
  kvRestApiToken?: string;

  buildMarker: string;
}

function envBool(name: string, defaultValue: boolean): boolean {
  const v = process.env[name];
  if (v === undefined || v === null || v === "") return defaultValue;
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

function envStr(name: string, defaultValue: string): string {
  const v = process.env[name];
  if (v === undefined || v === null || v === "") return defaultValue;
  return v;
}

export function getMarketingMachineConfig(): MarketingMachineConfig {
  const kvRestApiUrl =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    "";

  const kvRestApiToken =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "";

  return {
    enabled: envBool("MARKETING_MACHINE_ENABLED", false),
    autoPublish: envBool("MARKETING_AUTO_PUBLISH", false),
    approvalRequired: envBool("MARKETING_APPROVAL_REQUIRED", true),
    assetBaseUrl: envStr("MARKETING_ASSET_BASE_URL", "https://www.dominat8.com"),
    adminToken: process.env.ADMIN_TOKEN || undefined,

    kvRestApiUrl: kvRestApiUrl ? kvRestApiUrl : undefined,
    kvRestApiToken: kvRestApiToken ? kvRestApiToken : undefined,

    buildMarker: envStr("D8_BUILD_MARKER_OVERRIDE", "D8_MARKETING_MACHINE_V1_2026-01-25"),
  };
}