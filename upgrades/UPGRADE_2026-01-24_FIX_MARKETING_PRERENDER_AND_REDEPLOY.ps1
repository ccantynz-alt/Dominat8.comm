#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok($m) { Write-Host "OK: $m" -ForegroundColor Green }
function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Warn($m) { Write-Host "WARN: $m" -ForegroundColor Yellow }
function Fail($m) { throw $m }

# --- Sanity: repo root checks ---
if (!(Test-Path -LiteralPath ".\package.json")) { Fail "Run this from your repo root (where package.json is)." }

Info "== 1) Cleanup: remove any accidental BROKEN deploy proof TS files =="
$broken = Get-ChildItem -LiteralPath ".\pages\api" -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "__deploy_proof__.*.ts" -and $_.Name -ne "__deploy_proof__.ts" }

if ($broken) {
  foreach ($f in $broken) {
    Remove-Item -LiteralPath $f.FullName -Force
    Ok "Deleted: pages/api/$($f.Name)"
  }
} else {
  Ok "No stray pages/api/__deploy_proof__.*.ts files found."
}

Info "== 2) Patch: force dynamic rendering for marketing templates + use-cases pages =="
$targets = @(
  ".\src\app\(marketing)\templates\page.tsx",
  ".\src\app\(marketing)\use-cases\page.tsx"
)

foreach ($p in $targets) {
  if (!(Test-Path -LiteralPath $p)) { Fail "Missing file: $p" }

  $raw = Get-Content -LiteralPath $p -Raw

  # Prepend dynamic flags if missing
  if ($raw -notmatch 'export\s+const\s+dynamic\s*=\s*["'']force-dynamic["'']') {
    $raw = "export const dynamic = `"force-dynamic`";`r`nexport const revalidate = 0;`r`n`r`n" + $raw
    Ok "Added dynamic+revalidate exports to $p"
  } else {
    Ok "Already has export const dynamic in $p"
  }

  # Safety: make common map patterns null-safe (best-effort, non-destructive)
  # catalog.templates.map(...)  -> (catalog?.templates ?? []).map(...)
  $raw2 = $raw
  $raw2 = $raw2 -replace '\b([A-Za-z0-9_]+)\.templates\.map\(', '($1?.templates ?? []).map('
  $raw2 = $raw2 -replace '\b([A-Za-z0-9_]+)\.useCases\.map\(', '($1?.useCases ?? []).map('
  $raw2 = $raw2 -replace '\b([A-Za-z0-9_]+)\.use\-cases\.map\(', '($1?.("use-cases") ?? []).map('

  if ($raw2 -ne $raw) {
    $raw = $raw2
    Ok "Applied null-safe map guards in $p (best-effort)."
  } else {
    Ok "No common .templates/.useCases map patterns detected in $p (that is fine)."
  }

  Set-Content -LiteralPath $p -Encoding UTF8 -Value $raw
}

Info "== 3) Git commit (only if there are changes) =="
git status --porcelain | Out-String | ForEach-Object {
  if ([string]::IsNullOrWhiteSpace($_)) {
    Ok "No git changes to commit."
  } else {
    git add -A
    git commit -m "fix(marketing): stop prerender crashes + cleanup stray deploy proof ts"
    Ok "Committed."
  }
}

Info "== 4) Push to GitHub =="
git push origin HEAD:main
Ok "Pushed."

Info "== 5) Deploy to Vercel and capture logs =="
cmd.exe /c "vercel --prod --force --debug > build-output-full.txt 2>&1"
Ok "Deploy command finished. Showing tail:"
Get-Content -LiteralPath ".\build-output-full.txt" -Tail 120

Ok "DONE"
