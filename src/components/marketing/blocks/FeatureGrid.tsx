type Feature = { title: string; desc: string };

type Props = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  { title: "AI multi-page build", desc: "Generate a complete site structure in minutes." },
  { title: "SEO foundation", desc: "Metadata + sitemap + internal linking defaults." },
  { title: "Conversion pass", desc: "Pricing clarity, FAQs, and CTAs that sell outcomes." },
  { title: "Fast iteration", desc: "Re-run agents to refine copy, structure, and sections." },
  { title: "Publish + domains", desc: "Deploy to Vercel and connect a custom domain." },
  { title: "Template-driven", desc: "Start from proven layouts for your niche." },
];

export default function FeatureGrid({
  title = "Everything you need to ship",
  subtitle = "A focused workflow that turns an idea into a published site with growth baked in.",
  features = defaultFeatures,
}: Props) {
  return (
    <section className="mt-14">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm opacity-80">{subtitle}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold">{f.title}</div>
            <div className="mt-2 text-sm opacity-70">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}