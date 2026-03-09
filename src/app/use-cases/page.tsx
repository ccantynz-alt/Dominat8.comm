import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See how Dominat8 helps founders, agencies, and local businesses ship premium websites fast.",
};

const USE_CASES = [
  {
    slug: "saas-landing-page",
    tag: "SaaS",
    title: "Launch a SaaS landing page",
    desc: "Ship a polished homepage + pricing + FAQs that converts, then iterate nightly with proof checks.",
  },
  {
    slug: "local-services",
    tag: "Local",
    title: "Local services & bookings",
    desc: "Create a clear offer page with service areas, testimonials, and contact conversion paths.",
  },
  {
    slug: "agency-client-sites",
    tag: "Agency",
    title: "Agency client sites",
    desc: "Repeatable structure + fast generation pipeline. Hook in custom domains and billing as you scale.",
  },
  {
    slug: "portfolio",
    tag: "Creator",
    title: "Portfolio & personal brand",
    desc: "Build credibility with case studies, outcomes, and a sharp CTA for leads.",
  },
  {
    slug: "product-validation",
    tag: "Startup",
    title: "Product validation",
    desc: "Test positioning quickly: swap copy, reorder sections, and redeploy with confidence.",
  },
  {
    slug: "seo-foundation",
    tag: "Growth",
    title: "SEO foundation",
    desc: "Start with safe canonical/metadata baselines, then wire in sitemap/robots/SEO plans next.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="section">
      <h1 className="text-3xl font-black tracking-tight">Use cases</h1>
      <p className="mt-3 text-white/60 max-w-lg">
        Dominat8 is built for speed and iteration: generate, deploy, verify,
        improve.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {USE_CASES.map((uc) => (
          <Link
            key={uc.slug}
            href={`/use-cases/${uc.slug}`}
            className="card group hover:border-white/20 transition-colors"
          >
            <span className="pill text-[10px] mb-3">{uc.tag}</span>
            <h2 className="text-lg font-bold group-hover:text-white transition-colors">
              {uc.title}
            </h2>
            <p className="text-sm text-white/60 mt-1 leading-relaxed">
              {uc.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
