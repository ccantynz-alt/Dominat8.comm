"use client";

/**
 * Dominat8 — Pricing FAQ v2
 * Marker: PRICING_V2
 */

import * as React from "react";

type QA = { q: string; a: string };

export function PricingFAQ() {
  const items: QA[] = [
    {
      q: "What do I get for free?",
      a: "3 AI generations per month, HTML download, and a 7-day share link. No credit card required.",
    },
    {
      q: "How fast is a generation?",
      a: "Most sites generate in under 30 seconds. Complex multi-page builds may take up to 60 seconds.",
    },
    {
      q: "Can I export the code?",
      a: "Yes — you get clean React + TypeScript (or HTML) that you can host anywhere. No lock-in.",
    },
    {
      q: "Can I use my own domain?",
      a: "Pro and Agency plans include custom domain + auto-SSL on the Dominat8 CDN.",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes — 14-day money-back on all paid plans, no questions asked.",
    },
  ];

  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section aria-label="Pricing FAQ" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-14">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
          FAQ
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
          Everything you need to know about Dominat8 pricing and plans.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={it.q} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen((cur) => (cur === idx ? null : idx))}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div className="text-sm font-semibold text-white/85">{it.q}</div>
                  <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-white/70">
                    {isOpen ? "−" : "+"}
                  </div>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-5 text-sm text-white/70">
                    {it.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
          Still have questions? Contact us at{" "}
          <a href="mailto:hello@dominat8.io" className="font-semibold text-white/80 hover:text-white no-underline">hello@dominat8.io</a>.
        </div>
      </div>
    </section>
  );
}
