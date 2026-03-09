import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing, premium output. Start free, upgrade when you want full automation.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    note: "Perfect to test the pipeline.",
    features: [
      "Generate a site spec",
      "Preview marketing pages",
      "Basic publish flow",
    ],
    cta: "Start free",
    href: "/templates",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    note: "Ship faster with full automation.",
    features: ["Auto-run pipeline", "SEO plan + sitemap", "Publish artifacts"],
    cta: "Go Pro",
    href: "/templates",
    highlight: true,
  },
  {
    name: "Business",
    price: "$99",
    note: "For teams & higher volume.",
    features: ["Multiple sites", "Priority pipeline", "Advanced controls"],
    cta: "Talk to us",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="section">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Simple pricing, premium output
        </h1>
        <p className="mt-3 text-white/60 max-w-lg mx-auto">
          Start free. Upgrade when you want full automation and faster
          publishing.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`card flex flex-col ${
              tier.highlight
                ? "ring-1 ring-accent-purple/40 shadow-[0_18px_55px_rgba(168,85,247,0.15)]"
                : ""
            }`}
          >
            {tier.highlight && (
              <span className="text-[10px] font-black tracking-[0.14em] uppercase text-accent-purple mb-3">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-bold">{tier.name}</h2>
            <p className="text-3xl font-black mt-2">
              {tier.price}
              <span className="text-sm font-normal text-white/40">/mo</span>
            </p>
            <p className="text-sm text-white/50 mt-1">{tier.note}</p>

            <ul className="mt-6 space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-accent-purple mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              className={`btn mt-6 w-full ${
                tier.highlight ? "btn-primary" : "btn-ghost"
              }`}
              href={tier.href}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
