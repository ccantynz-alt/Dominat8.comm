import { kvGet, kvSet } from "./kv";
import { Keys } from "./keys";
import { generateContentForCampaign } from "./generate";
import { getMarketingMachineConfig } from "./config";
import {
  MarketingCampaign,
  MarketingContentItem,
  MarketingPlatform,
  MarketingScheduleEntry,
  MarketingPostLog,
} from "./types";
import { nowIso, randomId, safeJsonParse, safeJsonStringify, uniq } from "./utils";
import { dryRunPublish } from "./publisher";

async function getIndex(key: string): Promise<string[]> {
  const raw = await kvGet(key);
  return safeJsonParse<string[]>(raw, []);
}

async function setIndex(key: string, ids: string[]): Promise<void> {
  await kvSet(key, safeJsonStringify(uniq(ids)));
}

export async function createCampaign(input: Omit<MarketingCampaign, "id" | "createdAt" | "updatedAt">): Promise<MarketingCampaign> {
  const id = randomId("camp");
  const now = nowIso();

  const c: MarketingCampaign = {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
  };

  await kvSet(Keys.campaign(id), safeJsonStringify(c));

  const idxKey = Keys.campaignIndex();
  const idx = await getIndex(idxKey);
  idx.unshift(id);
  await setIndex(idxKey, idx);

  return c;
}

export async function listCampaigns(): Promise<MarketingCampaign[]> {
  const ids = await getIndex(Keys.campaignIndex());
  const out: MarketingCampaign[] = [];
  for (const id of ids.slice(0, 100)) {
    const raw = await kvGet(Keys.campaign(id));
    if (!raw) continue;
    const c = safeJsonParse<MarketingCampaign>(raw, null as any);
    if (c) out.push(c);
  }
  return out;
}

export async function getCampaign(id: string): Promise<MarketingCampaign | null> {
  const raw = await kvGet(Keys.campaign(id));
  if (!raw) return null;
  return safeJsonParse<MarketingCampaign>(raw, null as any);
}

export async function updateCampaign(id: string, patch: Partial<MarketingCampaign>): Promise<MarketingCampaign | null> {
  const c = await getCampaign(id);
  if (!c) return null;
  const updated: MarketingCampaign = { ...c, ...patch, id: c.id, updatedAt: nowIso() };
  await kvSet(Keys.campaign(id), safeJsonStringify(updated));
  return updated;
}

export async function createContent(campaignId: string, platform: MarketingPlatform): Promise<MarketingContentItem> {
  const c = await getCampaign(campaignId);
  if (!c) throw new Error("Campaign not found");

  const id = randomId("cnt");
  const now = nowIso();
  const generated = generateContentForCampaign(c, platform);

  const item: MarketingContentItem = {
    id,
    campaignId,
    createdAt: now,
    updatedAt: now,
    ...generated,
  };

  await kvSet(Keys.content(id), safeJsonStringify(item));

  const idxKey = Keys.contentIndexByCampaign(campaignId);
  const idx = await getIndex(idxKey);
  idx.unshift(id);
  await setIndex(idxKey, idx);

  return item;
}

export async function listContent(campaignId: string): Promise<MarketingContentItem[]> {
  const ids = await getIndex(Keys.contentIndexByCampaign(campaignId));
  const out: MarketingContentItem[] = [];
  for (const id of ids.slice(0, 300)) {
    const raw = await kvGet(Keys.content(id));
    if (!raw) continue;
    const x = safeJsonParse<MarketingContentItem>(raw, null as any);
    if (x) out.push(x);
  }
  return out;
}

export async function getContent(id: string): Promise<MarketingContentItem | null> {
  const raw = await kvGet(Keys.content(id));
  if (!raw) return null;
  return safeJsonParse<MarketingContentItem>(raw, null as any);
}

export async function updateContent(id: string, patch: Partial<MarketingContentItem>): Promise<MarketingContentItem | null> {
  const c = await getContent(id);
  if (!c) return null;
  const updated: MarketingContentItem = { ...c, ...patch, id: c.id, campaignId: c.campaignId, updatedAt: nowIso() };
  await kvSet(Keys.content(id), safeJsonStringify(updated));
  return updated;
}

export async function approveContent(id: string): Promise<MarketingContentItem | null> {
  return updateContent(id, { status: "approved", error: undefined });
}

export async function rejectContent(id: string, reason: string): Promise<MarketingContentItem | null> {
  return updateContent(id, { status: "draft", error: reason || "Rejected" });
}

export async function scheduleContent(id: string, scheduledFor: string): Promise<{ content: MarketingContentItem | null; schedule: MarketingScheduleEntry | null }> {
  const content = await getContent(id);
  if (!content) return { content: null, schedule: null };

  const cfg = getMarketingMachineConfig();
  if (cfg.approvalRequired && content.status !== "approved") {
    throw new Error("Approval required before scheduling.");
  }

  const now = nowIso();
  const updatedContent = await updateContent(id, { status: "scheduled", scheduledFor });

  const scheduleId = randomId("sch");
  const entry: MarketingScheduleEntry = {
    id: scheduleId,
    contentId: id,
    scheduledFor,
    status: "scheduled",
    createdAt: now,
    updatedAt: now,
  };

  await kvSet(Keys.schedule(scheduleId), safeJsonStringify(entry));

  const sIdxKey = Keys.scheduleIndex();
  const sIdx = await getIndex(sIdxKey);
  sIdx.unshift(scheduleId);
  await setIndex(sIdxKey, sIdx);

  return { content: updatedContent, schedule: entry };
}

export async function listSchedules(): Promise<MarketingScheduleEntry[]> {
  const ids = await getIndex(Keys.scheduleIndex());
  const out: MarketingScheduleEntry[] = [];
  for (const id of ids.slice(0, 300)) {
    const raw = await kvGet(Keys.schedule(id));
    if (!raw) continue;
    const x = safeJsonParse<MarketingScheduleEntry>(raw, null as any);
    if (x) out.push(x);
  }
  return out;
}

export async function listPostLogs(): Promise<MarketingPostLog[]> {
  const ids = await getIndex(Keys.postIndex());
  const out: MarketingPostLog[] = [];
  for (const id of ids.slice(0, 200)) {
    const raw = await kvGet(Keys.post(id));
    if (!raw) continue;
    const x = safeJsonParse<MarketingPostLog>(raw, null as any);
    if (x) out.push(x);
  }
  return out;
}

async function savePostLog(log: MarketingPostLog): Promise<void> {
  await kvSet(Keys.post(log.id), safeJsonStringify(log));
  const idxKey = Keys.postIndex();
  const idx = await getIndex(idxKey);
  idx.unshift(log.id);
  await setIndex(idxKey, idx);
}

export async function runScheduler(nowIsoString?: string): Promise<{ ranAt: string; attempted: number; posted: number; failed: number; logs: MarketingPostLog[] }> {
  const ranAt = nowIso();
  const now = new Date(nowIsoString || ranAt).getTime();

  const schedules = await listSchedules();
  const due = schedules
    .filter(s => s.status === "scheduled")
    .filter(s => {
      const t = Date.parse(s.scheduledFor);
      return !Number.isNaN(t) && t <= now;
    })
    .slice(0, 25);

  let attempted = 0;
  let posted = 0;
  let failed = 0;
  const logs: MarketingPostLog[] = [];

  for (const s of due) {
    attempted++;
    try {
      const content = await getContent(s.contentId);
      if (!content) throw new Error("Content missing");

      // Always dry-run publish in V1 (publisher enforces)
      const log = await dryRunPublish(content);
      await savePostLog(log);
      logs.push(log);

      // Mark schedule completed (even in dry-run) to avoid re-processing.
      const updatedSchedule: MarketingScheduleEntry = { ...s, status: "completed", updatedAt: nowIso() };
      await kvSet(Keys.schedule(s.id), safeJsonStringify(updatedSchedule));

      // Update content status
      await updateContent(content.id, { status: log.status === "failed" ? "failed" : "posted", platformPostId: log.platformPostId });

      if (log.status === "failed") failed++; else posted++;
    } catch (e: any) {
      failed++;
      const msg = e?.message ? String(e.message) : "Scheduler error";
      const updatedSchedule: MarketingScheduleEntry = { ...s, status: "failed", updatedAt: nowIso(), error: msg };
      await kvSet(Keys.schedule(s.id), safeJsonStringify(updatedSchedule));
    }
  }

  return { ranAt, attempted, posted, failed, logs };
}