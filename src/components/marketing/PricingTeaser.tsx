"use client";

import * as React from "react";

type Card = {
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
  disabled?: boolean;
};

export function PricingTeaser() {
  const cards: Card[] = [
    {
      name: "Free",
      price: "$0",
      tagline: "Generate and preview beautiful sites.",
      bullets: [
        "AI-generated homepage & core sections",
        "Preview gallery-style layouts",
        "Deploy proof markers",
        "Upgrade anytime",
      ],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "Coming soon",
      tagline: "For publishing, domains, and advanced AI.",
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

  return (
    <section aria-label="Pricing teaser" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
              PRICING (TEASER)
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Simple plans. Serious results.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              This is UI-only for now — no billing changes in WOW v3. We’re keeping production stable while we sharpen the story.
            </p>
          </div>

          <div className="text-xs text-white/60">
            Marker: <span className="font-mono text-white/80">WOW_HOME_V3</span>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.name}
              className={[
                "relative overflow-hidden rounded-2xl border p-5 md:p-6",
                c.highlight
                  ? "border-white/20 bg-white/[0.06] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                  : "border-white/10 bg-white/[0.02]",
              ].join(" ")}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(700px_240px_at_50%_0%,rgba(255,255,255,0.10),transparent_62%)]" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{c.name}</div>
                    <div className="mt-1 text-2xl font-semibold text-white md:text-3xl">{c.price}</div>
                  </div>
                  {c.highlight ? (
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                      Best for shipping
                    </div>
                  ) : null}
                </div>

                <div className="mt-2 text-sm text-white/70">{c.tagline}</div>

                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!!c.disabled}
                    className={[
                      "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                      c.disabled
                        ? "cursor-not-allowed border border-white/10 bg-white/[0.04] text-white/40"
                        : c.highlight
                          ? "bg-white text-black hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] active:translate-y-0"
                          : "border border-white/15 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.10] active:translate-y-0",
                    ].join(" ")}
                  >
                    {c.cta}
                  </button>

                  <div className="text-xs text-white/55">
                    {c.name === "Pro"
                      ? "Billing later — story first."
                      : "No card required (for now)."}
                  </div>
                </div>

                <div className="mt-5 text-xs text-white/55">
                  {c.name === "Pro" ? "Pro is intentionally shown as 'coming soon' in WOW v3." : "Free remains accessible and frictionless."}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
          Note: WOW v3 does not touch Stripe, auth, or plans. This is conversion scaffolding only.
        </div>
      </div>
    </section>
  );
}