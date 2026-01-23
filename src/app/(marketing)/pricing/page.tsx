import type { Metadata } from "next";
import MarketingCTA from "@/src/components/marketing/MarketingCTA";

export const metadata: Metadata = {
  title: "Pricing — Dominat8",
  description:
    "Simple pricing to ship websites fast. Start free, upgrade when you want more automation.",
};

function PriceCard(props: {
  name: string;
  price: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-6",
        props.highlight ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      <div className="text-lg font-semibold">{props.name}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{props.price}</div>
      <div className="mt-2 text-sm opacity-80">{props.desc}</div>
      <ul className="mt-5 space-y-2 text-sm opacity-85">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="opacity-60">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href="/sign-up"
          className={[
            "inline-flex rounded-2xl px-4 py-2 text-sm font-semibold transition",
            props.highlight ? "bg-white text-black hover:opacity-90" : "border border-white/20 hover:bg-white/10",
          ].join(" ")}
        >
          Start
        </a>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-3 max-w-2xl text-sm opacity-80">
          Start free. Upgrade when you want more automation, more runs, and faster shipping.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <PriceCard
            name="Free"
            price="$0"
            desc="Launch your first site and prove the idea."
            bullets={[
              "Marketing homepage",
              "Basic project flow",
              "Manual publish",
              "Starter SEO",
            ]}
          />
          <PriceCard
            name="Pro"
            price="$29/mo"
            desc="Ship faster with automation and better SEO output."
            highlight
            bullets={[
              "Automation agents",
              "SEO plan + sitemap runs",
              "More projects + runs",
              "Priority publishing flow",
            ]}
          />
          <PriceCard
            name="Business"
            price="Custom"
            desc="For teams and multi-site operations."
            bullets={[
              "Higher limits",
              "Team access",
              "Custom domains at scale",
              "Support + onboarding",
            ]}
          />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="font-semibold">Can I start free?</div>
              <div className="mt-1 text-sm opacity-80">Yep. Build a real site and publish it.</div>
            </div>
            <div>
              <div className="font-semibold">Do I need a domain?</div>
              <div className="mt-1 text-sm opacity-80">No. Use a preview domain, connect yours later.</div>
            </div>
            <div>
              <div className="font-semibold">Is this SEO safe?</div>
              <div className="mt-1 text-sm opacity-80">We generate structured metadata + sitemap outputs.</div>
            </div>
            <div>
              <div className="font-semibold">Can I cancel anytime?</div>
              <div className="mt-1 text-sm opacity-80">Yes. No lock-in.</div>
            </div>
          </div>
        </div>
      </section>

      <MarketingCTA />
    </div>
  );
}
