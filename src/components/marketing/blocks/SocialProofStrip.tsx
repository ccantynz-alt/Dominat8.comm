type Props = {
  title?: string;
  logos?: string[];
  bullets?: string[];
};

export default function SocialProofStrip({
  title = "Trusted by builders who ship fast",
  logos = ["Local Services", "Agencies", "SaaS", "Ecommerce", "Consultants"],
  bullets = ["Fast publishing", "SEO-ready structure", "Conversion-first sections"],
}: Props) {
  return (
    <section className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {logos.map((l) => (
              <span
                key={l}
                className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs opacity-80"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <ul className="text-sm opacity-80">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}