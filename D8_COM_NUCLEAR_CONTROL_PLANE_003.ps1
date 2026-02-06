[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$RepoRoot,

  [switch]$AllowDirty
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Fail([string]$m){ Write-Host "FATAL $m" -ForegroundColor Red; exit 1 }
function Ok([string]$m){ Write-Host "OK   $m" -ForegroundColor Green }
function Info([string]$m){ Write-Host "INFO $m" -ForegroundColor Gray }
function Warn([string]$m){ Write-Host "WARN $m" -ForegroundColor Yellow }

function Ensure-Dir([string]$p){ if (-not (Test-Path -LiteralPath $p)) { New-Item -ItemType Directory -Path $p | Out-Null } }

function Write-Utf8NoBom([string]$Path, [string]$Content){
  $dir = Split-Path -Parent $Path
  if ($dir) { Ensure-Dir $dir }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Backup-File([string]$Path){
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item -LiteralPath $Path -Destination "$Path.bak_$ts" -Force
  }
}

function Git-Exists(){ try { git --version | Out-Null; return $true } catch { return $false } }

function Assert-GitClean([string]$root){
  if ($AllowDirty) { Warn "AllowDirty set: skipping clean check."; return }
  if (-not (Git-Exists)) { Warn "git not found; skipping clean check."; return }
  Push-Location -LiteralPath $root
  try {
    $porc = git status --porcelain
    if ($porc -and $porc.Trim().Length -gt 0) {
      $porc | Out-Host
      Fail "Working tree not clean. Commit/stash first (or re-run with -AllowDirty)."
    }
  } finally { Pop-Location }
}

function Find-AppRoot([string]$root){
  $a = Join-Path $root "src\app"
  if (Test-Path -LiteralPath $a) { return $a }
  $b = Join-Path $root "app"
  if (Test-Path -LiteralPath $b) { return $b }
  Ensure-Dir $a
  return $a
}

# ---------------- Preflight ----------------
if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot not found: $RepoRoot" }
$RepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
Set-Location -LiteralPath $RepoRoot
if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot "package.json"))) { Fail "package.json missing in: $RepoRoot" }

Assert-GitClean $RepoRoot
Ok "LOCKED PWD: $(Get-Location)"

$appRoot = Find-AppRoot $RepoRoot
Info "App router root: $appRoot"

$stamp = "D8_COM_CONTROL_PLANE_003_" + (Get-Date -Format "yyyyMMdd_HHmmss")

# ---------------- Paths ----------------
$apiHealthPath = Join-Path $appRoot "api\d8\health\route.ts"
$apiRepairPath = Join-Path $appRoot "api\d8\repair\route.ts"
$opsPagePath   = Join-Path $appRoot "admin\ops\page.tsx"
$opsLayoutPath = Join-Path $appRoot "admin\ops\layout.tsx"
$toolsDir      = Join-Path $RepoRoot "tools"
$doctorLoopPath = Join-Path $toolsDir "D8_COM_DOCTOR_LOOP_001.ps1"
$wfPath        = Join-Path $RepoRoot ".github\workflows\d8-com-watchdog.yml"

# ---------------- Content (NO expansion: single-quoted here-strings) ----------------
$apiHealthT = @'
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

function nowIso() { try { return new Date().toISOString(); } catch { return "unknown"; } }

export async function GET() {
  const adminKeyPresent = !!process.env.D8_ADMIN_KEY && process.env.D8_ADMIN_KEY.length >= 12;
  const deployHookPresent = !!process.env.D8_VERCEL_DEPLOY_HOOK_URL && process.env.D8_VERCEL_DEPLOY_HOOK_URL.startsWith("https://");

  const body = {
    ok: true,
    service: "dominat8.com",
    stamp: "__STAMP__",
    time: nowIso(),
    checks: {
      D8_ADMIN_KEY_present: adminKeyPresent,
      D8_VERCEL_DEPLOY_HOOK_URL_present: deployHookPresent
    }
  };

  return NextResponse.json(body, { status: 200 });
}
'@
$apiHealth = $apiHealthT.Replace("__STAMP__", $stamp)

$apiRepairT = @'
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

function unauthorized(msg: string) {
  return NextResponse.json({ ok: false, error: "unauthorized", message: msg }, { status: 401 });
}
function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: "bad_request", message: msg }, { status: 400 });
}
function nowIso() { try { return new Date().toISOString(); } catch { return "unknown"; } }

async function readJson(req: Request): Promise<any> {
  try { return await req.json(); } catch { return null; }
}

function requireAdmin(req: Request) {
  const expected = process.env.D8_ADMIN_KEY || "";
  if (!expected || expected.length < 12) return { ok: false, reason: "D8_ADMIN_KEY not configured" };

  const got = req.headers.get("x-admin-key") || "";
  if (!got) return { ok: false, reason: "Missing X-Admin-Key header" };
  if (got !== expected) return { ok: false, reason: "Invalid admin key" };

  return { ok: true };
}

async function triggerRedeploy() {
  const hook = process.env.D8_VERCEL_DEPLOY_HOOK_URL || "";
  if (!hook || !hook.startsWith("https://")) {
    return { ok: false, message: "D8_VERCEL_DEPLOY_HOOK_URL not set" };
  }
  const res = await fetch(hook, { method: "POST" });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, statusText: res.statusText, responseText: (text || "").slice(0, 2000) };
}

export async function POST(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return unauthorized(gate.reason);

  const payload = await readJson(req);
  if (!payload) return badRequest("Expected JSON body");

  const action = (payload.action || "").toString().toLowerCase().trim();
  if (!action) return badRequest("Missing 'action'");

  const out: any = { ok: true, stamp: "__STAMP__", time: nowIso(), action, result: null };

  if (action === "redeploy") {
    out.result = await triggerRedeploy();
    out.ok = !!out.result?.ok;
    return NextResponse.json(out, { status: out.ok ? 200 : 502 });
  }

  return badRequest("Unknown action. Supported: redeploy");
}
'@
$apiRepair = $apiRepairT.Replace("__STAMP__", $stamp)

$opsLayout = @'
export const metadata = { title: "Dominat8.com Ops", robots: { index: false, follow: false } };

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        {children}
      </body>
    </html>
  );
}
'@

$opsPage = @'
"use client";
import React from "react";

export default function OpsPage() {
  const [adminKey, setAdminKey] = React.useState("");
  const [health, setHealth] = React.useState<any>(null);
  const [log, setLog] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);

  function now() { try { return new Date().toLocaleString(); } catch { return "now"; } }
  function push(m: string) { setLog((x) => [`[${now()}] ${m}`, ...x].slice(0, 200)); }

  async function fetchHealth() {
    setBusy(true);
    try {
      const r = await fetch("/api/d8/health", { cache: "no-store" });
      const j = await r.json();
      setHealth(j);
      push(`health status=${r.status} ok=${j?.ok} stamp=${j?.stamp}`);
    } catch (e: any) {
      push(`health failed: ${e?.message || e}`);
    } finally { setBusy(false); }
  }

  async function redeploy() {
    if (!adminKey || adminKey.length < 12) { push("Admin key missing/too short"); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/d8/repair", {
        method: "POST",
        headers: { "content-type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ action: "redeploy" })
      });
      const j = await r.json();
      push(`redeploy status=${r.status} ok=${j?.ok}`);
      push(JSON.stringify(j).slice(0, 2000));
    } catch (e: any) {
      push(`redeploy failed: ${e?.message || e}`);
    } finally { setBusy(false); }
  }

  React.useEffect(() => { fetchHealth(); }, []);

  return (
    <div style={{ padding: 16, maxWidth: 980, margin: "0 auto" }}>
      <h1>Dominat8.com Ops</h1>
      <p style={{ color: "#555" }}>Internal ops page. Public UI untouched. Actions require D8_ADMIN_KEY.</p>

      <div style={{ display: "grid", gap: 12, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Admin Key</div>
          <input value={adminKey} onChange={(e) => setAdminKey(e.target.value)}
            placeholder="paste D8_ADMIN_KEY" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button disabled={busy} onClick={fetchHealth} style={btn()}>Refresh Health</button>
          <button disabled={busy} onClick={redeploy} style={btnDanger()}>Redeploy</button>
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Health</div>
          <pre style={pre()}>{health ? JSON.stringify(health, null, 2) : "Loading..."}</pre>
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Log</div>
          <pre style={pre()}>{log.join("\n")}</pre>
        </div>
      </div>
    </div>
  );
}

function btn(): React.CSSProperties { return { padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "white", cursor: "pointer", fontWeight: 700 }; }
function btnDanger(): React.CSSProperties { return { padding: "10px 14px", borderRadius: 10, border: "1px solid #f1c0c0", background: "#fff5f5", cursor: "pointer", fontWeight: 800 }; }
function pre(): React.CSSProperties { return { margin: 0, padding: 12, background: "#0b0f19", color: "white", borderRadius: 12, overflowX: "auto", fontSize: 12, lineHeight: 1.35 }; }
'@

$doctorLoop = @'
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$BaseUrl,

  [Parameter(Mandatory=$true)]
  [string]$AdminKey,

  [int]$LoopSeconds = 60
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok([string]$m){ Write-Host "OK   $m" -ForegroundColor Green }
function Warn([string]$m){ Write-Host "WARN $m" -ForegroundColor Yellow }
function Fail([string]$m){ Write-Host "FAIL $m" -ForegroundColor Red }

$BaseUrl = $BaseUrl.TrimEnd("/")

while ($true) {
  try {
    $ts = [int](Get-Date -UFormat %s)
    $h = Invoke-RestMethod -Method GET -Uri "$BaseUrl/api/d8/health?ts=$ts"
    if (-not $h.ok) { throw "health_not_ok" }
    Ok ("health ok stamp={0}" -f $h.stamp)
  } catch {
    Fail "health failed: $($_.Exception.Message)"
    try {
      Warn "trigger redeploy..."
      $headers = @{ "x-admin-key" = $AdminKey }
      $body = @{ action = "redeploy" } | ConvertTo-Json -Depth 10
      $r = Invoke-RestMethod -Method POST -Uri "$BaseUrl/api/d8/repair" -Headers $headers -ContentType "application/json" -Body $body
      if ($r.ok) { Ok "redeploy triggered" } else { Fail "redeploy failed" }
    } catch {
      Fail "repair call failed: $($_.Exception.Message)"
    }
  }
  Start-Sleep -Seconds $LoopSeconds
}
'@

$wf = @'
name: D8 COM Watchdog
on:
  schedule:
    - cron: "*/5 * * * *"
  workflow_dispatch: {}

jobs:
  watchdog:
    runs-on: ubuntu-latest
    steps:
      - name: Check health
        id: health
        run: |
          set -e
          URL="${{ secrets.D8_COM_BASE_URL }}/api/d8/health?ts=$(date +%s)"
          echo "Hitting: $URL"
          code=$(curl -s -o health.json -w "%{http_code}" "$URL" || true)
          echo "http_code=$code" >> $GITHUB_OUTPUT
          cat health.json || true

      - name: Attempt repair on failure
        if: steps.health.outputs.http_code != '200'
        run: |
          set -e
          URL="${{ secrets.D8_COM_BASE_URL }}/api/d8/repair"
          echo "Repair -> redeploy"
          curl -s -D - -X POST "$URL" \
            -H "content-type: application/json" \
            -H "x-admin-key: ${{ secrets.D8_ADMIN_KEY }}" \
            --data '{"action":"redeploy"}' | head -n 80

      - name: Summary
        run: |
          echo "Health HTTP: ${{ steps.health.outputs.http_code }}" >> $GITHUB_STEP_SUMMARY
          echo "Base URL: ${{ secrets.D8_COM_BASE_URL }}" >> $GITHUB_STEP_SUMMARY
'@

# ---------------- Write files ----------------
$writes = @(
  @{ Path = $apiHealthPath; Content = $apiHealth },
  @{ Path = $apiRepairPath; Content = $apiRepair },
  @{ Path = $opsLayoutPath; Content = $opsLayout },
  @{ Path = $opsPagePath;   Content = $opsPage },
  @{ Path = $doctorLoopPath; Content = $doctorLoop },
  @{ Path = $wfPath; Content = $wf }
)

Write-Host ""
Info "=== WRITING CONTROL PLANE FILES ==="
foreach ($w in $writes) {
  Backup-File $w.Path
  Write-Utf8NoBom $w.Path $w.Content
  Ok "Wrote: $($w.Path)"
}

Write-Host ""
Ok "DONE control plane 003 installed."
Ok "NEXT: set Vercel env vars (D8_ADMIN_KEY, D8_VERCEL_DEPLOY_HOOK_URL) + set GitHub secrets (D8_COM_BASE_URL, D8_ADMIN_KEY) + deploy."
