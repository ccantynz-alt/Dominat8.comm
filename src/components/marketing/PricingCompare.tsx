"use client";

/**
 * Dominat8 — Pricing Compare v2
 * Marker: PRICING_V2
 * UI-only (no billing wiring)
 */

import * as React from "react";

type Row = { label: string; free: string; pro: string };
type PlanCard = {
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
  disabled?: boolean;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export function PricingCompare() {
  const plans: PlanCard[] = [
    {
      name: "Free",
      price: "$0",
      tagline: "Start building immediately.",
      bullets: [
        "Generate flagship layouts",
        "Preview templates (Gallery v2)",
        "Deploy proof markers",
        "Iterate safely",
      ],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "Coming soon",
      tagline: "For publishing + domains + automation.",
      bullets: [
        "Publish to production",
        "Custom domains & verification",
        "Advanced SEO & sitemaps",
        "Automation + agents",
      ],
      cta: "Join waitlist",
      highlight: true,
      disabled: true,
    },
  ];

  const rows: Row[] = [
    { label: "Template Gallery", free: "✓", pro: "✓" },
    { label: "WOW homepage polish", free: "✓", pro: "✓" },
    { label: "Export / portability", free: "Planned", pro: "Planned" },
    { label: "Publish to production", free: "—", pro: "✓" },
    { label: "Custom domains", free: "—", pro: "✓" },
    { label: "SEO automation", free: "—", pro: "✓" },
    { label: "Workflow agents", free: "—", pro: "✓" },
    { label: "Priority support", free: "—", pro: "✓" },
  ];

  return (
    <section aria-label="Pricing comparison" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className={classNames(
              "relative overflow-hidden rounded-2xl border p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md",
              p.highlight ? "border-white/20 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(800px_260px_at_50%_0%,rgba(255,255,255,0.10),transparent_62%)]" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">{p.name}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight text-white">{p.price}</div>
                </div>
                {p.highlight ? (
                  <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Best for shipping
                  </div>
                ) : null}
              </div>

              <div className="mt-2 text-sm text-white/70">{p.tagline}</div>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  disabled={!!p.disabled}
                  className={classNames(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                    p.disabled
                      ? "cursor-not-allowed border border-white/10 bg-white/[0.04] text-white/40"
                      : p.highlight
                        ? "bg-white text-black hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] active:translate-y-0"
                        : "border border-white/15 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.10] active:translate-y-0"
                  )}
                >
                  {p.cta}
                </button>

                <div className="text-xs text-white/55">
                  {p.name === "Pro" ? "Billing later — story first." : "No card required (for now)."}
                </div>
              </div>

              <div className="mt-5 text-xs text-white/55">
                Marker: <span className="font-mono text-white/80">PRICING_V2</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compare table */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold text-white">Compare features</div>
          <div className="mt-1 text-sm text-white/70">Clear expectations now — wiring comes later.</div>
        </div>

        <div className="grid grid-cols-12 gap-0 px-5 py-4 text-xs font-semibold text-white/70">
          <div className="col-span-6">Feature</div>
          <div className="col-span-3 text-center">Free</div>
          <div className="col-span-3 text-center">Pro</div>
        </div>

        <div className="divide-y divide-white/10">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-12 gap-0 px-5 py-4 text-sm">
              <div className="col-span-6 text-white/80">{r.label}</div>
              <div className="col-span-3 text-center text-white/70">{r.free}</div>
              <div className="col-span-3 text-center text-white/70">{r.pro}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-white/55">
          Note: Pro is intentionally marked as <span className="font-semibold text-white/70">coming soon</span> in PRICING_V2.
        </div>
      </div>
    </section>
  );
}