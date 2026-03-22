export interface CompetitorProfile {
  id: string;
  name: string;
  url: string;
  category: "ai-builder" | "no-code" | "cms" | "design-tool";
  lastCrawled: string;
  features: string[];
  pricing?: string;
  strengths: string[];
  weaknesses: string[];
}

export interface MarketTrend {
  id: string;
  title: string;
  source: string;
  url: string;
  score: number; // 0-100 relevance/momentum score
  discoveredAt: string;
  category: "ai" | "no-code" | "design" | "developer-tools" | "market";
  summary: string;
}

export interface CrawlResult {
  competitor: CompetitorProfile;
  crawledAt: string;
  changes: string[];
  newFeatures: string[];
}

export interface IntelligenceReport {
  generatedAt: string;
  competitors: CompetitorProfile[];
  trends: MarketTrend[];
  insights: string[];
}

export interface PositioningScore {
  competitorId: string;
  competitorName: string;
  score: number; // 0-100, higher = Dominat8 is ahead
  advantages: string[];
  gaps: string[];
}
