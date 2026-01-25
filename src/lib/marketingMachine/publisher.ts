import { getMarketingMachineConfig } from "./config";
import { MarketingContentItem, MarketingPostLog } from "./types";
import { nowIso, randomId } from "./utils";

export async function dryRunPublish(content: MarketingContentItem): Promise<MarketingPostLog> {
  const cfg = getMarketingMachineConfig();

  // V1 SAFETY: always dry run unless both enabled AND autoPublish.
  const dryRun = !(cfg.enabled && cfg.autoPublish);

  const payload = {
    platform: content.platform,
    caption: content.caption,
    hashtags: content.hashtags,
    script: content.script,
    videoPrompt: content.videoPrompt,
    disclosure: content.disclosure,
    assetBaseUrl: cfg.assetBaseUrl,
  };

  const log: MarketingPostLog = {
    id: randomId("post"),
    contentId: content.id,
    campaignId: content.campaignId,
    platform: content.platform,
    status: dryRun ? "dry_run" : "posted", // V1: still dry-run unless you later wire real APIs
    dryRun,
    ranAt: nowIso(),
    scheduledFor: content.scheduledFor,
    payload,
  };

  // In V1 we never actually talk to platform APIs.
  return log;
}