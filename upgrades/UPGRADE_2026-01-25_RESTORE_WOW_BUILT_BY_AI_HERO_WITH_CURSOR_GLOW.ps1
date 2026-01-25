Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Fail([string]$m) { throw "ERROR: $m" }

if (-not (Test-Path -LiteralPath ".\package.json")) {
  Fail "Run this from your repo root (the folder that contains package.json)."
}

function WriteUtf8NoBom([string]$path, [string]$content) {
  $dir = Split-Path -Parent $path
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

# ============================================================
# 1) FIX marketingMachine kv.ts (force correct startsWith)
# ============================================================
$kvPath = ".\src\lib\marketingMachine\kv.ts"
WriteUtf8NoBom $kvPath @'
/**
 * marketingMachine/kv.ts
 * In-memory KV fallback (build-safe).
 */

type KvValue = string;
const mem = new Map<string, KvValue>();

export async function kvGet(key: string): Promise<string | null> {
  if (!key) return null;
  return mem.has(key) ? (mem.get(key) as string) : null;
}

export async function kvSet(key: string, value: string): Promise<void> {
  if (!key) return;
  mem.set(key, value ?? "");
}

export async function kvDel(key: string): Promise<void> {
  if (!key) return;
  mem.delete(key);
}

export async function kvKeys(prefix: string): Promise<string[]> {
  const p = prefix ?? "";
  const out: string[] = [];
  for (const k of mem.keys()) {
    if (!p || k.startsWith(p)) out.push(k);
  }
  out.sort();
  return out;
}

export async function kvMGet(keys: string[]): Promise<(string | null)[]> {
  return Promise.all((keys ?? []).map((k) => kvGet(k)));
}

export async function kvMSet(pairs: Array<{ key: string; value: string }>): Promise<void> {
  for (const p of pairs ?? []) {
    await kvSet(p.key, p.value);
  }
}
'@
Write-Host "WROTE: $kvPath" -ForegroundColor Green

# ============================================================
# 2) RESTORE WOW hero (built by AI shipped fast) + cursor glow
# ============================================================
$pagePath = ".\src\app\page.tsx"
WriteUtf8NoBom $pagePath @'
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Pt = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function HomePage() {
  const [pos, setPos] = useState<Pt>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const target = useRef<Pt>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const last = useRef<Pt>({ x: 0, y: 0 });

  // Smooth cursor glow follow (rAF + lerp)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      target.current = { x, y };
      if (!hasMoved) setHasMoved(true);
    };

    const tick = () => {
      const tx = target.current.x;
      const ty = target.current.y;

      // If never moved, keep it centered-ish
      const w = typeof window !== "undefined" ? window.innerWidth : 0;
      const h = typeof window !== "undefined" ? window.innerHeight : 0;
      const fallback = { x: w * 0.55, y: h * 0.35 };

      const desiredX = hasMoved ? tx : fallback.x;
      const desiredY = hasMoved ? ty : fallback.y;

      const lx = last.current.x;
      const ly = last.current.y;

      // Lerp factor tuned for “lit up” feel without lag
      const nx = lx + (desiredX - lx) * 0.18;
      const ny = ly + (desiredY - ly) * 0.18;

      last.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });

      rafId.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove as any);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMoved]);

  const glowStyle = useMemo(() => {
    // Keep glow inside viewport bounds a little so it doesn't vanish at edges
    const x = clamp(pos.x, 0, typeof window !== "undefined" ? window.innerWidth : 99999);
    const y = clamp(pos.y, 0, typeof window !== "undefined" ? window.innerHeight : 99999);

    return {
      background: `radial-gradient(600px circle at ${x}px ${y}px,
        rgba(120, 255, 220, 0.14),
        rgba(120, 255, 220, 0.07) 25%,
        rgba(90, 140, 255, 0.06) 45%,
        rgba(0, 0, 0, 0) 70%)`,
    } as React.CSSProperties;
  }, [pos.x, pos.y]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor glow layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={glowStyle}
      />

      {/* Subtle ambient grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.07), rgba(0,0,0,0) 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05), rgba(0,0,0,0) 40%), radial-gradient(circle at 40% 90%, rgba(255,255,255,0.04), rgba(0,0,0,0) 45%)",
        }}
      />

      {/* HERO — WOW built by AI shipped fast */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90" />
            Deterministic. No creepy tracking. Real output.
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
            The <span className="text-white">WOW</span> website builder{" "}
            <span className="text-white/85">built by AI</span>{" "}
            <span className="text-white">— shipped fast.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Generate a real site. Refine it. SEO it. Publish it. No templates cosplay.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Build my site
            </a>
            <a
              href="/templates"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              See templates
            </a>
          </div>

          {/* Deploy verification marker */}
          <div className="mt-10 text-xs uppercase tracking-[0.28em] text-white/45">
            D8_WOW_BUILT_BY_AI_SHIPPED_FAST_2026-01-25
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          }}
        />
      </section>

      {/* KEEP SPACE FOR ACE / PROOF BELOW (safe placeholders) */}
      <section className="relative border-t border-white/10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Adaptive conversion, not static pages</h2>
          <p className="mt-4 text-white/70">
            Your ACE flow and proof gallery can live here exactly as before.
          </p>
        </div>
      </section>
    </main>
  );
}
'@
Write-Host "WROTE: $pagePath" -ForegroundColor Green

Write-Host ""
Write-Host "DONE: WOW hero restored + cursor glow added + kv.ts forced-correct." -ForegroundColor Green
