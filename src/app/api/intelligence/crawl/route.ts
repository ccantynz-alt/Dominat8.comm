import { NextRequest, NextResponse } from "next/server";
import { COMPETITORS, getCompetitorById } from "@/lib/intelligence/competitors";
import type { CrawlResult } from "@/lib/intelligence/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateMockCrawlResult(competitorId: string): CrawlResult | null {
  const competitor = getCompetitorById(competitorId);
  if (!competitor) return null;

  const now = new Date().toISOString();

  // Mock changes and new features based on competitor category
  const mockChanges: Record<string, string[]> = {
    lovable: [
      "Updated pricing page — new $49/mo plan detected",
      "New landing page copy emphasizing 'production-ready apps'",
      "Added testimonials section with 12 new case studies",
    ],
    bolt: [
      "New framework support: SvelteKit added to template list",
      "Homepage now highlights 'Deploy in seconds' messaging",
      "Added enterprise inquiry form",
    ],
    v0: [
      "New component categories: Charts, Maps, Forms",
      "Updated Vercel integration — faster deploy pipeline",
      "Launched v0 Teams plan at $40/mo",
    ],
    framer: [
      "AI content generation now in beta for all plans",
      "New CMS field types: Rich Text, References",
      "Performance improvements to visual editor",
    ],
    webflow: [
      "Launched Webflow AI — prompt-to-layout in beta",
      "New Memberships feature for paywalled content",
      "Redesigned pricing with new Starter plan at $14/mo",
    ],
    wix: [
      "Wix ADI 2.0 announced with improved AI personalization",
      "New Studio product launched targeting agencies",
      "Added AI SEO optimization tool",
    ],
    squarespace: [
      "Acquired Google Domains customer base integrations",
      "New AI-generated social media post tool",
      "Blueprint AI for site setup launched",
    ],
    wordpress: [
      "WordPress 6.5 released with new block features",
      "Automattic acquired new plugin company",
      "WordPress.com launched new AI assistant",
    ],
  };

  const mockNewFeatures: Record<string, string[]> = {
    lovable: [
      "Database schema visual editor",
      "Multi-project workspace",
    ],
    bolt: [
      "SvelteKit template support",
      "Team collaboration beta",
    ],
    v0: [
      "v0 Teams — collaborative component library",
      "Chart and data visualization components",
    ],
    framer: [
      "AI copywriting integrated into editor",
      "Webflow import tool",
    ],
    webflow: [
      "Webflow AI layout generator (beta)",
      "Membership and paywall features",
    ],
    wix: [
      "Wix Studio for agencies",
      "AI SEO optimizer",
    ],
    squarespace: [
      "Blueprint AI site setup",
      "AI social content generator",
    ],
    wordpress: [
      "WordPress AI assistant (Jetpack)",
      "Block theme patterns library",
    ],
  };

  return {
    competitor: {
      ...competitor,
      lastCrawled: now,
    },
    crawledAt: now,
    changes: mockChanges[competitorId] ?? [
      "Minor UI updates detected",
      "No major structural changes",
    ],
    newFeatures: mockNewFeatures[competitorId] ?? [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { competitorId?: string };
    const { competitorId } = body;

    const results: CrawlResult[] = [];

    if (competitorId) {
      const result = generateMockCrawlResult(competitorId);
      if (!result) {
        return NextResponse.json(
          { ok: false, error: `Competitor '${competitorId}' not found` },
          { status: 404 }
        );
      }
      results.push(result);
    } else {
      // Crawl all competitors
      for (const competitor of COMPETITORS) {
        const result = generateMockCrawlResult(competitor.id);
        if (result) {
          results.push(result);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      crawledAt: new Date().toISOString(),
      count: results.length,
      results,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
