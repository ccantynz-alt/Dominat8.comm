import { NextResponse } from "next/server";
import { MARKET_TRENDS, getTopTrends } from "@/lib/intelligence/trends";
import { COMPETITORS, DOMINAT8_FEATURES } from "@/lib/intelligence/competitors";
import type { PositioningScore } from "@/lib/intelligence/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OUR_FEATURE_COUNT = DOMINAT8_FEATURES.length;

function computePositioningScore(competitorId: string): PositioningScore {
  const competitor = COMPETITORS.find((c) => c.id === competitorId);
  if (!competitor) {
    return {
      competitorId,
      competitorName: competitorId,
      score: 50,
      advantages: [],
      gaps: [],
    };
  }

  const theirFeatureCount = competitor.features.length;

  // Score based on feature count ratio + category penalties/bonuses
  let baseScore = Math.round(
    (OUR_FEATURE_COUNT / (OUR_FEATURE_COUNT + theirFeatureCount)) * 100
  );

  // Dominat8 unique advantages
  const advantages: string[] = [];
  const gaps: string[] = [];

  const dominat8UniqueFeatures = [
    "AI-powered site factory",
    "Batch site generation",
    "Autopilot autonomous builds",
    "Competitor intelligence engine",
    "Market trend tracking",
    "Agent-based architecture",
    "Real-time build logs",
    "Scheduled crawl runs",
    "Feature gap analysis",
  ];

  for (const feature of dominat8UniqueFeatures) {
    const theyHaveIt = competitor.features.some((f) =>
      f.toLowerCase().includes(feature.toLowerCase().split(" ")[0]!)
    );
    if (!theyHaveIt) {
      advantages.push(feature);
    }
  }

  // Identify gaps
  for (const weakness of competitor.strengths) {
    gaps.push(`Competitor strength: ${weakness}`);
  }

  // Category-specific scoring adjustments
  if (competitor.category === "ai-builder") {
    baseScore = Math.max(baseScore - 5, 30); // AI builders are our closest competition
  } else if (competitor.category === "cms" || competitor.category === "no-code") {
    baseScore = Math.min(baseScore + 15, 95); // We're ahead of legacy tools
  }

  return {
    competitorId: competitor.id,
    competitorName: competitor.name,
    score: Math.min(Math.max(baseScore, 20), 95),
    advantages: advantages.slice(0, 5),
    gaps: gaps.slice(0, 3),
  };
}

export async function GET() {
  try {
    const trends = getTopTrends(10);
    const competitors = COMPETITORS;

    const positioning: PositioningScore[] = competitors.map((c) =>
      computePositioningScore(c.id)
    );

    const overallScore = Math.round(
      positioning.reduce((sum, p) => sum + p.score, 0) / positioning.length
    );

    return NextResponse.json({
      ok: true,
      generatedAt: new Date().toISOString(),
      trends,
      competitors,
      positioning,
      summary: {
        totalTrends: MARKET_TRENDS.length,
        totalCompetitors: competitors.length,
        overallPositioningScore: overallScore,
        dominat8Features: DOMINAT8_FEATURES,
        dominat8FeatureCount: OUR_FEATURE_COUNT,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
