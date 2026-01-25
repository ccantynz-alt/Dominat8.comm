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
      q: "Is Dominat8 live right now?",
      a: "Yes. The marketing site and gallery are live. Pro publishing & domains are planned as the next product phase.",
    },
    {
      q: "Why show Pro if billing isn't enabled yet?",
      a: "Because it sets expectations and communicates the roadmap clearly — without risking production by rushing billing wiring.",
    },
    {
      q: "Will Free always exist?",
      a: "Free is designed to remain a solid starting point. Pro unlocks publishing, domains, and automation when ready.",
    },
    {
      q: "Can I publish to my own domain?",
      a: "That’s part of Pro. The Domain Wizard is a core upcoming milestone (verification + mapping + status checks).",
    },
    {
      q: "Is this safe to use in production?",
      a: "The marketing experience is build-gated and stable. Product publishing features will ship behind clear gates and proof markers.",
    },
  ];

  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section aria-label="Pricing FAQ" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-14">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
          FAQ • <span className="ml-1 font-mono text-white/70">PRICING_V2</span>
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Questions, answered
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
          No surprises. The pricing story is clear now — the wiring comes in the next phase.
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
          Next milestone after PRICING_V2:{" "}
          <span className="font-semibold text-white/80">Publish Proof + Domain Wizard v1</span>.
        </div>
      </div>
    </section>
  );
}