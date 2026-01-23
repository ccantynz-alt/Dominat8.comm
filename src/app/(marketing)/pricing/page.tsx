import Link from "next/link";
import MarketingCTA from "@/src/components/marketing/MarketingCTA";
import ComparisonTable from "@/src/components/marketing/blocks/ComparisonTable";

export const metadata = {
  title: "Pricing — Dominat8",
  description: "Simple pricing for Dominat8. Start free, upgrade when you need automation + custom domains.",
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          ← Back home
        </Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <p className="mt-3 text-base opacity-80">
        Start free. Upgrade when you want full automation and custom domain publishing.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Free</div>
          <div className="mt-2 text-3xl font-semibold">$0</div>
          <div className="mt-1 text-sm opacity-70">For trying it out</div>

          <ul className="mt-5 space-y-2 text-sm opacity-80">
            <li>• Generate a website draft</li>
            <li>• Explore templates + use-cases</li>
            <li>• Limited SEO outputs</li>
          </ul>

          <div className="mt-6">
            <Link
              href="/sign-up"
              className="inline-flex w-full items-center justify-center rounded-md border border-black/20 px-5 py-3 text-sm hover:bg-black/[0.02]"
            >
              Start free
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-black text-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Pro</div>
          <div className="mt-2 text-3xl font-semibold">$29</div>
          <div className="mt-1 text-sm opacity-80">Per month (starter)</div>

          <ul className="mt-5 space-y-2 text-sm opacity-90">
            <li>• Full SEO outputs (metadata + sitemap)</li>
            <li>• Conversion pass (pricing + FAQs + CTAs)</li>
            <li>• Custom domain publishing</li>
            <li>• Automation / pipeline runs</li>
          </ul>

          <div className="mt-6">
            <MarketingCTA />
          </div>

          <div className="mt-3 text-xs opacity-70">
            Replace price/features to match your Stripe plans.
          </div>
        </div>
      </section>

      <ComparisonTable />
    </main>
  );
}