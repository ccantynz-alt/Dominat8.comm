# === BUNDLE RUNNER (AUTHORITATIVE ENTRY POINT) ===
Set-StrictMode -Off
$ErrorActionPreference = "Stop"

function Find-RepoRoot {
  param([string]$StartDir)
  $d = (Resolve-Path -LiteralPath $StartDir).Path
  for ($i=0; $i -lt 40; $i++) {
    if (Test-Path -LiteralPath (Join-Path $d "package.json")) { return $d }
    if (Test-Path -LiteralPath (Join-Path $d ".git"))        { return $d }
    $parent = Split-Path -Parent $d
    if ($parent -eq $d) { break }
    $d = $parent
  }
  throw "Repo root not found"
}

param(
  [Parameter(Mandatory=$true)]
  [string]$UpgradeScripts,
  [string]$CommitMessage = "bundle upgrade"
)

function Ok($m){ Write-Host ("OK  " + $m) -ForegroundColor Green }
function Die($m){ Write-Host ("BAD " + $m) -ForegroundColor Red; $global:LASTEXITCODE=1; return }

$RepoRoot = Find-RepoRoot -StartDir (Get-Location).Path
Set-Location -LiteralPath $RepoRoot
Ok "RepoRoot: $RepoRoot"

$scripts = $UpgradeScripts.Split(";") | ForEach-Object { $_.Trim() } | Where-Object { $_ }
foreach ($s in $scripts) {
  $p = if ([IO.Path]::IsPathRooted($s)) { $s } else { Join-Path $RepoRoot $s }
  if (!(Test-Path -LiteralPath $p)) { Die "Missing upgrade script: $p"; return }
  Ok "Running: $p"
  powershell -ExecutionPolicy Bypass -NoProfile -File $p
  if ($LASTEXITCODE -ne 0) { Die "Upgrade failed: $p"; return }
}

git add -A
git commit -m $CommitMessage
git push

npx --yes vercel@latest --prod --force

$global:LASTEXITCODE = 0
