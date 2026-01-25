Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"

function Fail([string]$m){ throw "ERROR: $m" }
function Ensure-Dir([string]$p){ if(-not (Test-Path -LiteralPath $p)){ New-Item -ItemType Directory -Force -Path $p | Out-Null } }
function Write-Utf8NoBom([string]$path,[string]$content){
  $dir = Split-Path -Parent $path
  if($dir -and -not (Test-Path -LiteralPath $dir)){ New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($path,$content,$utf8NoBom)
}
if(-not (Test-Path -LiteralPath ".\package.json")){ Fail "Run from repo root (package.json missing)." }

Ensure-Dir ".\src\app\_client"
Ensure-Dir ".\src\app"

# --- Fix src/app/page.tsx
$page = @"
import dynamic from "next/dynamic";

/**
 * Dominat8 Homepage
 * Marker: WOW_HOME_V3
 */

export const dynamic = "force-dynamic";

const HomeClient = dynamic(() => import("./_client/HomeClient"), { ssr: false });

export default function Page() {
  return <HomeClient />;
}
"@
Write-Utf8NoBom ".\src\app\page.tsx" $page
Write-Host "WROTE: src/app/page.tsx" -ForegroundColor Green

# --- Fix src/app/_client/HomeClient.tsx (rewrite from scratch, clean)
$home = @"
"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Dominat8 Homepage — WOW v3
 * Marker: WOW_HOME_V3
 */

export default function HomeClient() {
  const buildStamp =
    process.env.NEXT_PUBLIC_BUILD_STAMP ||
    process.env.BUILD_STAMP ||
    "NO_STAMP";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-95">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_80%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.06]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Dominat8</div>
              <div className="text-xs text-white/60">WOW v3</div>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/gallery" className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/[0.08]">
              Gallery
            </Link>
            <Link href="/pricing" className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/[0.08]">
              Pricing
            </Link>
            <Link href="/app" className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] active:translate-y-0">
              Launch builder
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
          WOW_HOME_V3
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          The WOW website builder.
          <span className="block text-white/70">Built by AI. Shipped fast.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
          Flagship homepage is now live (client-only safe). Next: polish sections + domain wizard.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/app" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.55)] active:translate-y-0">
            Start building →
          </Link>
          <Link href="/gallery" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.10] active:translate-y-0">
            Explore templates
          </Link>
          <div className="text-xs text-white/55">
            BUILD_STAMP: <span className="font-mono text-white/75">{String(buildStamp)}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
"@

Write-Utf8NoBom ".\src\app\_client\HomeClient.tsx" $home
Write-Host "WROTE: src/app/_client/HomeClient.tsx (clean rewrite)" -ForegroundColor Green

npm run build
if($LASTEXITCODE -ne 0){ Fail "Build still failing. Print first 60 lines of HomeClient.tsx and the filtered build errors." }

Write-Host "BUILD OK ✅" -ForegroundColor Green