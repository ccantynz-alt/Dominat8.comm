export type MarketingPlatform = "tiktok" | "instagram" | "facebook";

export type ContentStatus =
  | "draft"
  | "approved"
  | "scheduled"
  | "posted"
  | "failed";

export type CampaignStatus = "active" | "paused" | "archived";

export type ScheduleStatus = "scheduled" | "completed" | "cancelled" | "failed";

export type PostStatus = "dry_run" | "posted" | "failed";

export type ISODateString = string;

export interface MarketingCampaign {
  id: string;
  name: string;
  product: string;
  audience: string;
  offer: string;
  platforms: MarketingPlatform[];
  tone: string;
  keywords: string[];
  status: CampaignStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface MarketingContentItem {
  id: string;
  campaignId: string;
  platform: MarketingPlatform;

  hooks: string[];
  script: string;
  caption: string;
  hashtags: string[];
  videoPrompt: string;

  disclosure: "AI-generated";
  status: ContentStatus;

  scheduledFor?: ISODateString;
  platformPostId?: string;

  createdAt: ISODateString;
  updatedAt: ISODateString;

  error?: string;
}

export interface MarketingScheduleEntry {
  id: string;
  contentId: string;
  scheduledFor: ISODateString;
  status: ScheduleStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  error?: string;
}

export interface MarketingPostLog {
  id: string;
  contentId: string;
  campaignId: string;
  platform: MarketingPlatform;
  status: PostStatus;
  dryRun: boolean;
  ranAt: ISODateString;
  scheduledFor?: ISODateString;
  platformPostId?: string;
  payload: any;
  error?: string;
}