// src/lib/marketing/copy.ts
export const BRAND = {
  name: "Dominat8",
  domain: "dominat8.com",
  url: "https://www.dominat8.com",
  tagline: "AI website automation builder",
};

export const CTA = {
  primary: { label: "Generate my site", href: "/preview/marketing" },
  secondary: { label: "View templates", href: "/templates" },
  tertiary: { label: "Pricing", href: "/pricing" },
};

export const PROOF = [
  { k: "Trust", v: "clear, professional output" },
  { k: "Speed", v: "minutes from brief to draft" },
  { k: "Pages", v: "homepage + pricing + FAQ + contact" },
  { k: "SEO", v: "metadata + sitemap-ready structure" },
] as const;

export const STEPS = [
  {
    title: "Bring a real-world brief",
    body: "Tell us what you do, where you operate, and what ‘professional’ looks like in your industry.",
  },
  {
    title: "Agents assemble the site",
    body: "Structure, copy, pages, and SEO basics — built like a premium brochure, not a template dump.",
  },
  {
    title: "Publish with confidence",
    body: "Review, adjust, then ship. Clean routing, consistent output, and no mystery behavior.",
  },
] as const;

export const FAQ = [
  {
    q: "Will this work for trade & local service businesses?",
    a: "Yes. The whole point is clean trust: clear services, proof, pricing clarity, and easy contact.",
  },
  {
    q: "Does it feel professional or ‘AI-ish’?",
    a: "Professional first. Calm layouts, clean typography, and a premium tone — then AI under the hood.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes — Dominat8 is designed to map and verify custom domains cleanly.",
  },
] as const;
