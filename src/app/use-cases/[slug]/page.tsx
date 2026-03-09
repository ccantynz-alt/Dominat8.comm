import { notFound } from "next/navigation";
import Link from "next/link";

const USE_CASES: Record<string, { title: string; desc: string }> = {
  "saas-landing-page": {
    title: "Launch a SaaS landing page",
    desc: "Ship a polished homepage + pricing + FAQs that converts, then iterate nightly with proof checks.",
  },
  "local-services": {
    title: "Local services & bookings",
    desc: "Create a clear offer page with service areas, testimonials, and contact conversion paths.",
  },
  "agency-client-sites": {
    title: "Agency client sites",
    desc: "Repeatable structure + fast generation pipeline. Hook in custom domains and billing as you scale.",
  },
  portfolio: {
    title: "Portfolio & personal brand",
    desc: "Build credibility with case studies, outcomes, and a sharp CTA for leads.",
  },
  "product-validation": {
    title: "Product validation",
    desc: "Test positioning quickly: swap copy, reorder sections, and redeploy with confidence.",
  },
  "seo-foundation": {
    title: "SEO foundation",
    desc: "Start with safe canonical/metadata baselines, then wire in sitemap/robots/SEO plans next.",
  },
};

export function generateStaticParams() {
  return Object.keys(USE_CASES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const uc = USE_CASES[params.slug];
  if (!uc) return {};
  return { title: uc.title, description: uc.desc };
}

export default function UseCaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const uc = USE_CASES[params.slug];
  if (!uc) notFound();

  return (
    <div className="section max-w-3xl mx-auto">
      <Link
        href="/use-cases"
        className="text-sm text-white/50 hover:text-white/80"
      >
        &larr; Back to use cases
      </Link>

      <h1 className="text-3xl font-black tracking-tight mt-6">{uc.title}</h1>
      <p className="mt-3 text-white/70 leading-relaxed">{uc.desc}</p>

      <div className="mt-10">
        <Link className="btn btn-primary" href="/templates">
          Start building
        </Link>
      </div>
    </div>
  );
}
