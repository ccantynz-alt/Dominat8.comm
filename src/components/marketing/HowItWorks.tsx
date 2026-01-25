"use client";

import * as React from "react";

type Step = {
  n: string;
  title: string;
  desc: string;
};

export function HowItWorks() {
  const steps: Step[] = [
    { n: "01", title: "Describe your idea", desc: "Answer a few smart prompts to set direction." },
    { n: "02", title: "AI builds the site", desc: "Pages, layout, structure, and SEO-ready scaffolding." },
    { n: "03", title: "Review & tweak", desc: "Edit sections, copy, and pages with full control." },
    { n: "04", title: "Publish instantly", desc: "Ship live and verify with deploy proof markers." },
  ];

  const [active, setActive] = React.useState(0);
  const refs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Choose the most-visible step as active.
        let bestIdx = active;
        let bestRatio = 0;

        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).getAttribute("data-step-idx") || "0");
          if (e.isIntersecting && e.intersectionRatio >= bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }
        if (bestRatio > 0 && bestIdx !== active) setActive(bestIdx);
      },
      { root: null, threshold: [0.15, 0.25, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section aria-label="How it works" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
              HOW IT WORKS
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              From idea → publish, in four clean steps
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              Fast to start, safe to ship. Every step is designed to keep momentum without breaking production.
            </p>
          </div>

          <div className="mt-2 text-xs text-white/60 md:mt-0">
            Tip: watch the progress line as you scroll
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Left: steps */}
          <div className="md:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md md:p-6">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(900px_260px_at_50%_0%,rgba(255,255,255,0.10),transparent_62%)] opacity-60" />

              <div className="relative space-y-3">
                {steps.map((s, idx) => {
                  const isActive = idx === active;
                  return (
                    <div
                      key={s.n}
                      ref={(el) => { refs.current[idx] = el; }}
                      data-step-idx={idx}
                      className={[
                        "group rounded-2xl border p-4 transition-all md:p-5",
                        isActive
                          ? "border-white/20 bg-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] font-mono text-xs text-white/80">
                          {s.n}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white md:text-base">{s.title}</div>
                          <div className="mt-1 text-sm text-white/70">{s.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: progress + micro-proof */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md md:p-6">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(800px_240px_at_50%_0%,rgba(255,255,255,0.10),transparent_62%)] opacity-60" />
              <div className="relative">
                <div className="text-sm font-semibold text-white">Progress</div>
                <div className="mt-1 text-sm text-white/70">
                  You’re currently viewing step{" "}
                  <span className="font-mono text-white/85">{steps[active]?.n}</span>.
                </div>

                <div className="mt-5">
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-white/70 transition-all duration-500"
                      style={{ width: `${((active + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-white/55">
                    <span>Start</span>
                    <span>Publish</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs font-semibold tracking-wide text-white/75">
                    Deploy proof (always visible)
                  </div>
                  <div className="mt-2 text-xs text-white/65">
                    Marker: <span className="font-mono text-white/80">WOW_HOME_V3</span>
                  </div>
                  <div className="mt-1 text-xs text-white/65">
                    Build stamp:{" "}
                    <span className="font-mono text-white/80">
                      {process.env.NEXT_PUBLIC_BUILD_STAMP || "LOCAL_DEV"}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-white/55">
                    If you can read this box on production, you’re on the deployed route.
                  </div>
                </div>

                <div className="mt-5 text-xs text-white/55">
                  No new libraries. No backend dependencies. Pure marketing clarity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}