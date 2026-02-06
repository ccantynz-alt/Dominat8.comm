"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const LIVE_MARKER = "LIVE_20260126_BUNDLE2_PRICING_LEADS_TRACKING";
const ROUTE_BANNER = "✅ ROUTE OK — HOME_BUNDLE2_NAV_PRICING_LEADS";

type Step = { label: string; detail: string };

function clsx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

async function track(event: string, meta?: Record<string, any>) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, meta: meta ?? {}, ts: Date.now() }),
      keepalive: true,
    });
  } catch {}
}

export default function HomeClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const steps: Step[] = useMemo(
    () => [
      { label: "Analyzing your business", detail: "Turning description into a structured spec…" },
      { label: "Designing the homepage", detail: "Layouts, hierarchy, authority signals…" },
      { label: "Writing conversion copy", detail: "Clarity, proof, calls-to-action…" },
      { label: "Generating SEO pack", detail: "Titles, meta, sitemap, structured data…" },
      { label: "Publishing", detail: "Optimized assets + deploy pipeline…" },
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(22);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as any);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 92 ? 2 : 0);
        return next > 96 ? 96 : next;
      });
    }, 140);

    const s = setInterval(() => setStepIndex((i) => (i + 1) % steps.length), 2400);

    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, [steps.length]);

  // Cursor spotlight (expensive look) using CSS vars for performance
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onMove = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((ev.clientX - r.left) / r.width) * 100;
      const y = ((ev.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x.toFixed(2)}%`);
      el.style.setProperty("--my", `${y.toFixed(2)}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove as any);
  }, []);

  const current = steps[stepIndex];

  async function submitLead(ev: React.FormEvent) {
    ev.preventDefault();
    if (!email.trim()) return;

    setLeadStatus("sending");
    await track("lead_submit_clicked", { placement: "home_hero", emailLen: email.trim().length });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "home_hero",
          page: typeof window !== "undefined" ? window.location.href : "",
          ts: Date.now(),
        }),
      });

      if (!res.ok) throw new Error("bad");
      setLeadStatus("ok");
      setEmail("");
      await track("lead_submit_success", { placement: "home_hero" });
    } catch {
      setLeadStatus("err");
      await track("lead_submit_error", { placement: "home_hero" });
    }
  }

  return (
    <div ref={rootRef} className="min-h-screen bg-black text-white">
      {/* Premium sticky navbar */}
      <div className={clsx(
        "sticky top-0 z-50 w-full border-b border-white/10 transition",
        scrolled ? "bg-black/60 backdrop-blur-xl" : "bg-black/20"
      )}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => track("nav_logo_click")}>
            <span className="h-8 w-8 rounded-xl border border-white/15 bg-white/5 grid place-items-center">
              <span className="text-sm font-semibold">D8</span>
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em]">Dominat8</span>
            <span className="hidden sm:inline text-xs text-white/50 ml-2">{LIVE_MARKER}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/pricing" className="hover:text-white transition" onClick={() => track("nav_pricing_click")}>Pricing</Link>
            <a href="#features" className="hover:text-white transition" onClick={() => track("nav_features_click")}>Features</a>
            <a href="#faq" className="hover:text-white transition" onClick={() => track("nav_faq_click")}>FAQ</a>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition"
              onClick={() => track("nav_view_pricing_cta")}
            >
              View pricing
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-white text-black hover:opacity-95 transition active:scale-[0.99] relative overflow-hidden"
              onClick={() => track("nav_start_cta")}
            >
              Start
              <span className="sheen" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Top debug banner (safe to keep for now) */}
      <div className="w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-2 text-xs text-white/80 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
              <span className="font-medium">{ROUTE_BANNER}</span>
            </span>
            <span className="hidden sm:inline text-white/50">•</span>
            <span className="text-white/60">Marker: <span className="text-white/90 font-medium">{LIVE_MARKER}</span></span>
          </div>
          <div className="text-white/50">
            If you see this banner, you’re on the deployed route.
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated “luxury” background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_var(--mx,50%)_var(--my,30%),rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 orb orb-a" />
          <div className="absolute -bottom-32 -right-24 h-[620px] w-[620px] rounded-full blur-3xl opacity-35 orb orb-b" />
          <div className="absolute inset-0 mesh" />
          <div className="absolute inset-0 noise" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18 lg:py-22">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] uppercase text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                AI WEBSITE AUTOMATION
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03] tracking-[-0.04em]">
                <span className="block text-white/80">This is how websites</span>
                <span className="block shimmer">are made now.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
                Describe your business. Your website assembles itself — structure, pages, SEO, and publish-ready output.
                You stay in control. We do the heavy lifting.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link
                  href="/pricing"
                  className="group inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.10)] hover:shadow-[0_14px_60px_rgba(255,255,255,0.18)] transition-all active:scale-[0.99] relative overflow-hidden"
                  onClick={() => track("hero_primary_cta_click", { to: "/pricing" })}
                >
                  <span className="relative z-10">Build my site</span>
                  <span className="sheen" aria-hidden="true" />
                </Link>

                <div className="flex items-center gap-3 text-sm text-white/65">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                    <span className="text-white/90 font-medium">No templates.</span>
                    <span className="text-white/50">No setup.</span>
                  </span>
                  <span className="hidden md:inline text-white/40">•</span>
                  <span className="hidden md:inline">Publish in minutes.</span>
                </div>
              </div>

              {/* Lead capture (real endpoint) */}
              <form onSubmit={submitLead} className="mt-7 max-w-xl">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/60">Get early access updates</div>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25"
                      type="email"
                      required
                    />
                    <button
                      type="submit"
                      className="rounded-xl px-5 py-3 text-sm font-semibold bg-white text-black hover:opacity-95 transition active:scale-[0.99] disabled:opacity-60"
                      disabled={leadStatus === "sending"}
                      onClick={() => track("lead_button_click")}
                    >
                      {leadStatus === "sending" ? "Sending…" : "Notify me"}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-white/45">
                    {leadStatus === "ok" && <span className="text-emerald-300">Saved. You’re on the list.</span>}
                    {leadStatus === "err" && <span className="text-rose-300">Couldn’t save — try again.</span>}
                    {leadStatus === "idle" && "No spam. Just build updates + launch access."}
                  </div>
                </div>
              </form>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl" id="features">
                <TrustChip title="Conversion-first" desc="Designed to sell, not just look nice." />
                <TrustChip title="SEO pack" desc="Metadata, sitemap, structured data." />
                <TrustChip title="Fast deploy" desc="Publish-ready output + clean URLs." />
              </div>

              <div className="mt-7 text-xs text-white/45">
                Live marker: <span className="text-white/70 font-medium">{LIVE_MARKER}</span>
              </div>
            </div>

            {/* Right column proof panel */}
            <div className="relative">
              <div className="rounded-2xl border border-white/12 bg-white/5 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)] overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="text-xs text-white/55">Dominat8.io</div>
                  <div className="text-xs text-white/35">secure</div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-xs tracking-[0.24em] uppercase text-white/65">
                      GENERATING WEBSITE
                    </div>
                    <div className="text-xs text-white/50">
                      <span className="text-white/70 font-medium">{progress}%</span> complete
                    </div>
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-white/80 progressGlow" style={{ width: `${progress}%` }} />
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="text-sm font-semibold text-white/90">{current.label}</div>
                    <div className="mt-1 text-sm text-white/60">{current.detail}</div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge text="✓ SEO Ready" />
                      <Badge text="✓ Sitemap Generated" />
                      <Badge text="✓ Published" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <MiniStat label="Pages" value="5–12" />
                    <MiniStat label="Time" value="2–6 min" />
                    <MiniStat label="Ready" value="Deploy" />
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs tracking-[0.24em] uppercase text-white/60">PROOF PANEL</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">
                      This isn’t a template editor. It’s a pipeline that builds like a production system.
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow halo */}
              <div className="pointer-events-none absolute -inset-8 rounded-[30px] glowRing" />
            </div>
          </div>

          {/* CTA strip */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Ready to publish a premium site?</div>
              <div className="mt-1 text-white/65">See plans → choose → ship. No fiddling.</div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-white text-black hover:opacity-95 transition active:scale-[0.99] relative overflow-hidden"
              onClick={() => track("mid_cta_pricing_click")}
            >
              View pricing
              <span className="sheen" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-black/40" id="faq">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">
                Questions (that buyers ask)
              </h3>
              <p className="mt-3 text-white/65 leading-relaxed">
                Short answers. High confidence. Less friction.
              </p>
            </div>

            <div className="lg:col-span-7">
              <FAQItem
                i={0}
                open={faqOpen === 0}
                setOpen={setFaqOpen}
                q="Is this just templates?"
                a="No. Dominat8 assembles a site from your business description—structure, persuasive copy scaffolding, and SEO patterns—then outputs publish-ready pages."
              />
              <FAQItem
                i={1}
                open={faqOpen === 1}
                setOpen={setFaqOpen}
                q="Can I edit the result?"
                a="Yes. You keep control. The system gives you a premium baseline, then you iterate."
              />
              <FAQItem
                i={2}
                open={faqOpen === 2}
                setOpen={setFaqOpen}
                q="What’s the fastest path to revenue?"
                a="Hero + proof → pricing page → checkout → ship weekly conversion improvements."
              />
              <FAQItem
                i={3}
                open={faqOpen === 3}
                setOpen={setFaqOpen}
                q="How do I publish to my domain?"
                a="That’s the pipeline. Next we wire the upgrade flow to domain + publish gating."
              />
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">See pricing → then build.</div>
              <div className="mt-1 text-white/65">This turns the site into a product.</div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-white text-black hover:opacity-95 transition active:scale-[0.99]"
              onClick={() => track("footer_pricing_click")}
            >
              Pricing
            </Link>
          </div>

          <div className="mt-8 text-xs text-white/40">
            Marker: <span className="text-white/60 font-medium">{LIVE_MARKER}</span>
          </div>
        </div>
      </section>

      {/* Global styles */}
      <style jsx global>{`
        .mesh {
          background:
            radial-gradient(800px 400px at 20% 20%, rgba(255,255,255,0.10), transparent 60%),
            radial-gradient(700px 380px at 70% 30%, rgba(255,255,255,0.08), transparent 60%),
            radial-gradient(900px 420px at 50% 80%, rgba(255,255,255,0.06), transparent 60%),
            linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00));
          animation: meshShift 14s ease-in-out infinite alternate;
        }

        .noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          opacity: 0.25;
        }

        .orb {
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20), rgba(255,255,255,0.04), transparent 60%);
        }
        .orb-a { animation: floatA 9s ease-in-out infinite; }
        .orb-b { animation: floatB 12s ease-in-out infinite; }

        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.65), rgba(255,255,255,1), rgba(255,255,255,0.65));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 220% 100%;
          animation: shimmer 4.5s ease-in-out infinite;
        }

        .sheen {
          position: absolute;
          inset: -80px -80px -80px -80px;
          background: radial-gradient(240px 120px at 0% 50%, rgba(255,255,255,0.30), transparent 55%);
          transform: translateX(-30%);
          opacity: 0;
          transition: opacity 240ms ease, transform 520ms ease;
        }
        a:hover .sheen, button:hover .sheen { opacity: 1; transform: translateX(42%); }

        .progressGlow {
          box-shadow: 0 0 24px rgba(255,255,255,0.22);
          transition: width 140ms linear;
        }

        .glowRing {
          background: radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.12), transparent 60%);
          filter: blur(20px);
          opacity: 0.9;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes meshShift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.95; }
          100% { transform: translate3d(0,-18px,0) scale(1.03); opacity: 1; }
        }

        @keyframes floatA {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(18px, 22px, 0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes floatB {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-22px, -16px, 0); }
          100% { transform: translate3d(0,0,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mesh, .orb-a, .orb-b, .shimmer { animation: none !important; }
          .sheen { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75">
      {text}
    </span>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs uppercase tracking-[0.20em] text-white/55">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}

function TrustChip({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition">
      <div className="text-sm font-semibold text-white/85">{title}</div>
      <div className="mt-1 text-sm text-white/60 leading-relaxed">{desc}</div>
    </div>
  );
}

function FAQItem({
  i,
  q,
  a,
  open,
  setOpen,
}: {
  i: number;
  q: string;
  a: string;
  open: boolean;
  setOpen: (v: number | null) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => setOpen(open ? null : i)}
      className="w-full text-left rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-white/90">{q}</div>
        <div className="text-white/45">{open ? "—" : "+"}</div>
      </div>
      {open && <div className="mt-3 text-sm text-white/65 leading-relaxed">{a}</div>}
    </button>
  );
}
