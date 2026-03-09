export type TemplateCategory =
  | "SaaS"
  | "Agency"
  | "Local"
  | "Creator"
  | "Ecommerce"
  | "Startup"
  | "Portfolio";

export type TemplateCard = {
  slug: string;
  name: string;
  category: TemplateCategory;
  tags: string[];
  description: string;
  bullets: string[];
  vibe: "Glass" | "Minimal" | "Bold" | "Calm" | "Premium";
  featured?: boolean;
};

export const TEMPLATES: TemplateCard[] = [
  {
    slug: "glass-saas-blueprint",
    name: "Glass SaaS Blueprint",
    category: "SaaS",
    tags: ["conversion", "glass", "hero", "pricing", "faq"],
    description:
      "Premium glass hero with a blueprint proof card and conversion sections.",
    bullets: [
      "WOW hero + proof card",
      "Pricing teaser",
      "FAQ + CTA",
      "Ship-ready structure",
    ],
    vibe: "Glass",
    featured: true,
  },
  {
    slug: "agency-clean-conversion",
    name: "Agency Clean Conversion",
    category: "Agency",
    tags: ["agency", "case-studies", "credibility", "cta"],
    description:
      "Credibility-first layout: services, proof, testimonials, and a strong CTA flow.",
    bullets: ["Services grid", "Proof strip", "Testimonials", "Contact CTA"],
    vibe: "Premium",
    featured: true,
  },
  {
    slug: "local-rural-professional",
    name: "Local Rural Professional",
    category: "Local",
    tags: ["local", "trust", "contact", "map", "services"],
    description:
      "Clean local business layout that feels premium and trustworthy.",
    bullets: ["Trust blocks", "Services", "Contact section", "FAQ"],
    vibe: "Calm",
  },
  {
    slug: "creator-minimal-launch",
    name: "Creator Minimal Launch",
    category: "Creator",
    tags: ["creator", "minimal", "newsletter", "about"],
    description:
      "A minimal, modern layout for creators who want a clean launch page.",
    bullets: ["Hero + bio", "Work highlights", "Newsletter CTA", "Links section"],
    vibe: "Minimal",
  },
  {
    slug: "startup-bold-announce",
    name: "Startup Bold Announce",
    category: "Startup",
    tags: ["startup", "bold", "announce", "waitlist"],
    description:
      "High-energy hero with product highlights and a waitlist-driven CTA.",
    bullets: ["Bold hero", "Feature tiles", "How it works", "Waitlist CTA"],
    vibe: "Bold",
  },
  {
    slug: "ecommerce-premium-drop",
    name: "Ecommerce Premium Drop",
    category: "Ecommerce",
    tags: ["ecommerce", "drops", "product", "social-proof"],
    description:
      "Product-first layout designed for a premium drop or limited release.",
    bullets: ["Product hero", "Benefits", "Social proof", "FAQ + CTA"],
    vibe: "Premium",
  },
  {
    slug: "portfolio-modern-grid",
    name: "Portfolio Modern Grid",
    category: "Portfolio",
    tags: ["portfolio", "grid", "projects", "about"],
    description: "Modern project grid with clean project detail flow.",
    bullets: ["Project grid", "Featured work", "About section", "Contact CTA"],
    vibe: "Minimal",
  },
];

export function getTemplateBySlug(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}
