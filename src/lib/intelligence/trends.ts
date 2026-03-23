import type { MarketTrend } from "./types";

export const MARKET_TRENDS: MarketTrend[] = [
  {
    id: "trend-ai-code-gen",
    title: "AI-Powered Code Generation Becomes Table Stakes",
    source: "GitHub Octoverse 2025",
    url: "https://octoverse.github.com",
    score: 98,
    discoveredAt: "2026-03-01T00:00:00Z",
    category: "ai",
    summary:
      "Over 75% of developers now use AI code generation tools daily. Products without native AI are losing market share rapidly. The expectation has shifted from 'nice to have' to baseline requirement for any new dev tool.",
  },
  {
    id: "trend-site-factory",
    title: "Bulk / Factory Site Generation Emerging as Enterprise Need",
    source: "Product Hunt Trends",
    url: "https://producthunt.com/topics/website-builders",
    score: 91,
    discoveredAt: "2026-02-15T00:00:00Z",
    category: "no-code",
    summary:
      "Agencies and marketing teams increasingly need to launch dozens of landing pages simultaneously. Single-site tools are hitting their ceiling. Batch generation + AI personalization is the next frontier.",
  },
  {
    id: "trend-autonomous-agents",
    title: "Autonomous AI Agents Replacing Manual Workflows",
    source: "a16z Future",
    url: "https://a16z.com/ai-agents",
    score: 94,
    discoveredAt: "2026-03-10T00:00:00Z",
    category: "ai",
    summary:
      "Agentic AI systems that can plan, execute, and iterate without human intervention are disrupting SaaS. Products that embed autonomous agents gain massive retention advantages — users keep them running 24/7.",
  },
  {
    id: "trend-no-code-revolution",
    title: "No-Code / Low-Code Market Hits $45B",
    source: "Gartner 2026 Report",
    url: "https://gartner.com/no-code-lowcode",
    score: 82,
    discoveredAt: "2026-01-20T00:00:00Z",
    category: "no-code",
    summary:
      "The no-code/low-code market continues explosive growth. However, pure drag-and-drop tools are being disrupted by AI-native builders that generate clean, production-ready code instead of visual abstractions.",
  },
  {
    id: "trend-nextjs-dominance",
    title: "Next.js Consolidates as the Production Standard",
    source: "Stack Overflow Developer Survey 2025",
    url: "https://survey.stackoverflow.co/2025",
    score: 87,
    discoveredAt: "2026-02-01T00:00:00Z",
    category: "developer-tools",
    summary:
      "Next.js adoption grew 34% YoY and is now the default framework for new production web apps. AI builders that output Next.js have a significant advantage — devs can own and extend the output.",
  },
  {
    id: "trend-competitor-intel",
    title: "Competitive Intelligence Automation Rising in B2B SaaS",
    source: "SaaStr Annual 2025",
    url: "https://saastr.com",
    score: 76,
    discoveredAt: "2026-02-28T00:00:00Z",
    category: "market",
    summary:
      "B2B SaaS companies are investing heavily in automated competitor monitoring. Products like Crayon and Klue are growing 3x. Embedding intelligence directly into dev tools creates a significant moat.",
  },
  {
    id: "trend-edge-compute",
    title: "Edge Computing + AI Inference at the Edge",
    source: "Vercel Edge Report 2026",
    url: "https://vercel.com/blog/edge",
    score: 79,
    discoveredAt: "2026-03-05T00:00:00Z",
    category: "developer-tools",
    summary:
      "Running AI inference at the edge reduces latency to <50ms globally. Products that generate edge-optimized code with Vercel/Cloudflare deployment are winning performance benchmarks and SEO scores.",
  },
  {
    id: "trend-design-tokens",
    title: "Design Token Systems Becoming Standard for AI-Generated UI",
    source: "CSS-Tricks / SmashingMag",
    url: "https://smashingmagazine.com/design-tokens",
    score: 68,
    discoveredAt: "2026-01-10T00:00:00Z",
    category: "design",
    summary:
      "As AI generates more UI code, design token systems (colors, spacing, typography scales) are becoming the bridge between brand identity and AI output. Tools that respect design tokens produce on-brand results.",
  },
  {
    id: "trend-openai-operator",
    title: "OpenAI Operator-Style Browsing Creates New Automation Category",
    source: "OpenAI Blog",
    url: "https://openai.com/blog",
    score: 88,
    discoveredAt: "2026-03-15T00:00:00Z",
    category: "ai",
    summary:
      "Browser-based AI agents that can navigate, fill forms, and extract competitive data are unlocking a new category of market intelligence tools. Early movers integrating this capability are gaining 10x data advantages.",
  },
  {
    id: "trend-white-label-saas",
    title: "White-Label AI Builder Market Opening Up",
    source: "IndieHackers Trends",
    url: "https://indiehackers.com",
    score: 73,
    discoveredAt: "2026-02-20T00:00:00Z",
    category: "market",
    summary:
      "Agencies and enterprise teams are looking for AI site builders they can white-label and resell. Tools that offer white-label/API-first access are commanding 3-5x price premiums and significantly lower churn.",
  },
];

export function getTrendsByCategory(category: string): MarketTrend[] {
  return MARKET_TRENDS.filter((t) => t.category === category).sort(
    (a, b) => b.score - a.score
  );
}

export function getTopTrends(n: number): MarketTrend[] {
  return [...MARKET_TRENDS].sort((a, b) => b.score - a.score).slice(0, n);
}
