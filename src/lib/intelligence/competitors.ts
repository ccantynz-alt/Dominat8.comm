import type { CompetitorProfile } from "./types";

export const COMPETITORS: CompetitorProfile[] = [
  {
    id: "lovable",
    name: "Lovable",
    url: "https://lovable.dev",
    category: "ai-builder",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "AI chat-to-code generation",
      "React component generation",
      "Supabase integration",
      "GitHub sync",
      "Real-time preview",
      "Design-to-code",
      "One-click deploy",
    ],
    pricing: "$20–$50/mo",
    strengths: [
      "Strong React/TypeScript output quality",
      "Active community and Discord",
      "Supabase backend integration",
      "Fast iteration speed",
    ],
    weaknesses: [
      "No multi-page site factory",
      "No domain management",
      "Limited to React ecosystem",
      "No competitive intelligence features",
      "No batch/autopilot generation",
    ],
  },
  {
    id: "bolt",
    name: "Bolt",
    url: "https://bolt.new",
    category: "ai-builder",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Browser-based IDE",
      "AI code generation",
      "Multi-framework support",
      "npm package support",
      "StackBlitz runtime",
      "File system access",
      "Terminal in browser",
    ],
    pricing: "$20/mo",
    strengths: [
      "Full browser-based dev environment",
      "Multi-framework flexibility",
      "Runs real Node.js in browser",
      "Backed by StackBlitz",
    ],
    weaknesses: [
      "No domain management",
      "No site factory / batch generation",
      "Complex for non-developers",
      "No marketing-focused templates",
      "No autopilot or scheduled runs",
    ],
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "ai-builder",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "UI component generation",
      "shadcn/ui integration",
      "Tailwind CSS output",
      "Next.js optimization",
      "One-click Vercel deploy",
      "Prompt-to-component",
      "Design system awareness",
    ],
    pricing: "Free tier + $20/mo Pro",
    strengths: [
      "Exceptional UI component quality",
      "Deep Vercel/Next.js integration",
      "Best-in-class shadcn output",
      "Strong brand trust",
    ],
    weaknesses: [
      "Component-level only, not full sites",
      "No autonomous site builder",
      "No CMS or content management",
      "No competitor tracking",
      "Requires developer knowledge",
    ],
  },
  {
    id: "framer",
    name: "Framer",
    url: "https://framer.com",
    category: "design-tool",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Visual drag-and-drop builder",
      "React component export",
      "AI copy generation",
      "CMS with collections",
      "Custom domain hosting",
      "Animation & interactions",
      "Team collaboration",
    ],
    pricing: "$15–$35/mo per site",
    strengths: [
      "Beautiful visual editor",
      "Best-in-class animations",
      "Designer-friendly workflow",
      "CMS with structured content",
    ],
    weaknesses: [
      "Expensive at scale",
      "No AI site factory",
      "Limited code customization",
      "No batch generation",
      "No autopilot features",
    ],
  },
  {
    id: "webflow",
    name: "Webflow",
    url: "https://webflow.com",
    category: "no-code",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Visual CSS editor",
      "CMS and e-commerce",
      "Custom domain hosting",
      "Interactions & animations",
      "Team workspaces",
      "Finsweet integrations",
      "White-label options",
    ],
    pricing: "$23–$212/mo",
    strengths: [
      "Most powerful visual CSS control",
      "Mature CMS and e-commerce",
      "Large agency ecosystem",
      "White-label capabilities",
    ],
    weaknesses: [
      "Steep learning curve",
      "Expensive for teams",
      "No AI code generation",
      "No competitive intelligence",
      "Complex pricing structure",
    ],
  },
  {
    id: "wix",
    name: "Wix",
    url: "https://wix.com",
    category: "no-code",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Drag-and-drop editor",
      "AI site generation (ADI)",
      "App marketplace",
      "E-commerce",
      "Booking & scheduling",
      "SEO tools",
      "Custom domain hosting",
    ],
    pricing: "$17–$159/mo",
    strengths: [
      "Massive user base (250M+)",
      "AI-assisted design (ADI)",
      "Extensive app ecosystem",
      "Built-in business tools",
    ],
    weaknesses: [
      "Low code quality output",
      "SEO limitations",
      "Template lock-in",
      "No developer-grade features",
      "No AI code generation",
    ],
  },
  {
    id: "squarespace",
    name: "Squarespace",
    url: "https://squarespace.com",
    category: "no-code",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Template-based builder",
      "E-commerce",
      "Blogging",
      "Custom domain",
      "Email marketing",
      "Scheduling (Acuity)",
      "Analytics",
    ],
    pricing: "$25–$65/mo",
    strengths: [
      "Premium visual templates",
      "Strong e-commerce UX",
      "Integrated email marketing",
      "Reliable hosting",
    ],
    weaknesses: [
      "Very limited customization",
      "No AI generation",
      "No developer features",
      "Walled garden",
      "Expensive for what you get",
    ],
  },
  {
    id: "wordpress",
    name: "WordPress",
    url: "https://wordpress.com",
    category: "cms",
    lastCrawled: "2026-03-20T10:00:00Z",
    features: [
      "Open-source CMS",
      "50,000+ plugins",
      "Block editor (Gutenberg)",
      "WooCommerce e-commerce",
      "Multisite capability",
      "REST API",
      "Managed hosting options",
    ],
    pricing: "Free (self-hosted) to $45/mo (managed)",
    strengths: [
      "Powers 43% of the web",
      "Unlimited extensibility",
      "Huge developer community",
      "Full data ownership",
    ],
    weaknesses: [
      "Requires maintenance & updates",
      "Plugin compatibility issues",
      "No AI-native experience",
      "Security vulnerabilities",
      "No site factory features",
    ],
  },
];

export function getCompetitorById(id: string): CompetitorProfile | null {
  return COMPETITORS.find((c) => c.id === id) ?? null;
}

export function compareFeatures(
  us: string[],
  them: string[]
): { unique: string[]; shared: string[]; missing: string[] } {
  const usSet = new Set(us.map((f) => f.toLowerCase()));
  const themSet = new Set(them.map((f) => f.toLowerCase()));

  const unique = us.filter((f) => !themSet.has(f.toLowerCase()));
  const shared = us.filter((f) => themSet.has(f.toLowerCase()));
  const missing = them.filter((f) => !usSet.has(f.toLowerCase()));

  return { unique, shared, missing };
}

export const DOMINAT8_FEATURES: string[] = [
  "AI-powered site factory",
  "Batch site generation",
  "Autopilot autonomous builds",
  "Competitor intelligence engine",
  "Market trend tracking",
  "Custom domain management",
  "One-click Vercel deploy",
  "TypeScript / Next.js output",
  "Tailwind CSS generation",
  "Agent-based architecture",
  "Real-time build logs",
  "Admin dashboard",
  "KV-backed project storage",
  "Scheduled crawl runs",
  "Feature gap analysis",
];
