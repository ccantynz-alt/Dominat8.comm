import { notFound } from "next/navigation";
import Link from "next/link";
import { TEMPLATES, getTemplateBySlug } from "@/lib/marketing/catalog";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTemplateBySlug(params.slug);
  if (!t) return {};
  return { title: t.name, description: t.description };
}

export default function TemplateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const t = getTemplateBySlug(params.slug);
  if (!t) notFound();

  return (
    <div className="section max-w-3xl mx-auto">
      <Link
        href="/templates"
        className="text-sm text-white/50 hover:text-white/80"
      >
        &larr; Back to templates
      </Link>

      <div className="flex items-center gap-2 mt-6">
        <span className="pill text-[10px]">{t.category}</span>
        <span className="pill text-[10px]">{t.vibe}</span>
      </div>

      <h1 className="text-3xl font-black tracking-tight mt-4">{t.name}</h1>
      <p className="mt-3 text-white/70 leading-relaxed">{t.description}</p>

      <h2 className="text-xl font-bold mt-10">What you get</h2>
      <ul className="mt-3 space-y-2 text-white/70">
        {t.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="text-accent-purple mt-0.5">&#10003;</span>
            {b}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-10">Good for</h2>
      <ul className="mt-3 space-y-2 text-white/70">
        <li>Launching a new idea quickly</li>
        <li>Testing messaging and offers</li>
        <li>Getting a &quot;wow&quot; baseline you can iterate on</li>
      </ul>

      <div className="mt-10">
        <Link className="btn btn-primary" href="/templates">
          Use this template
        </Link>
      </div>
    </div>
  );
}
