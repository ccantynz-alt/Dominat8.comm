"use client";

import * as React from "react";

type TrustItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l1.4 5.2L18 9l-4.6 1.8L12 16l-1.4-5.2L6 9l4.6-1.8L12 2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M19 13l.9 3.3L23 17l-3.1 1.2L19 22l-.9-3.8L15 17l3.1-.7L19 13z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13 2L3 14h8l-1 8 11-14h-8l0-6z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M17 10V8a5 5 0 0 0-10 0v2H5v12h14V10h-2zm-8 0V8a3 3 0 0 1 6 0v2H9z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20.71 6.04a1 1 0 0 0 0-1.41L19.37 3.3a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75 1.13-1.14z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function TrustStrip() {
  const items: TrustItem[] = [
    {
      title: "Built to ship fast",
      desc: "From idea to publish-ready pages in minutes.",
      icon: <IconBolt />,
    },
    {
      title: "AI-generated, human-editable",
      desc: "Change copy, sections, and structure whenever you want.",
      icon: <IconEdit />,
    },
    {
      title: "Production-safe by design",
      desc: "Build-gated changes with visible deploy proof markers.",
      icon: <IconLock />,
    },
    {
      title: "Marketing polish included",
      desc: "Clean, modern UI that feels premium out of the box.",
      icon: <IconSpark />,
    },
  ];

  return (
    <section aria-label="Trust signals" className="mx-auto w-full max-w-6xl px-4">
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
          {items.map((it, idx) => (
            <div
              key={it.title}
              className={[
                "group relative p-5 md:p-6",
                idx !== 0 ? "md:border-l md:border-white/10" : "",
              ].join(" ")}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
              </div>

              <div className="relative flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/90">
                  {it.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">{it.title}</div>
                  <div className="mt-1 text-sm text-white/70">{it.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-5 py-3 text-xs text-white/60 md:px-6">
          Marker: <span className="font-mono text-white/80">WOW_HOME_V3</span>
        </div>
      </div>
    </section>
  );
}