param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $QueueDir = "patches\queue",
  [string] $AppliedDir = "patches\applied"
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
function Ensure-Dir([string]$d){ if (-not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }
function Backup-File([string]$p){
  if (Test-Path -LiteralPath $p) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item -LiteralPath $p -Destination ($p + ".bak." + $ts) -Force
  }
}
function Write-Utf8NoBom([string]$Path, [string]$Content){
  $enc = New-Object System.Text.UTF8Encoding($false)
  $bytes = $enc.GetBytes($Content)
  Ensure-Dir (Split-Path -Parent $Path)
  [System.IO.File]::WriteAllBytes($Path, $bytes)
}

Set-Location -LiteralPath $RepoRoot
$q = Join-Path $RepoRoot $QueueDir
$a = Join-Path $RepoRoot $AppliedDir
Ensure-Dir $q
Ensure-Dir $a

$packs = Get-ChildItem -LiteralPath $q -Filter "*.json" | Sort-Object Name
if (-not $packs) { Write-Host "OK   No queued PatchPacks." -ForegroundColor Green; exit 0 }

foreach ($p in $packs) {
  $raw = Get-Content -LiteralPath $p.FullName -Raw
  $pack = $raw | ConvertFrom-Json
  $packId = [string]$pack.id
  foreach ($op in @($pack.ops)) {
    $kind = [string]$op.op
    $path = Join-Path $RepoRoot ([string]$op.path)
    if ($kind -eq "replaceInFile") {
      if (-not (Test-Path -LiteralPath $path)) { continue }
      $text = Get-Content -LiteralPath $path -Raw
      $find = [string]$op.find
      $repl = [string]$op.replace
      if ($text.Contains($find)) {
        Backup-File $path
        Write-Utf8NoBom -Path $path -Content ($text.Replace($find,$repl))
      }
    }
  }
  & git.exe add -A | Out-Null
  $porc = (& git.exe status --porcelain)
  if ($porc) {
    & git.exe commit -m ("apply(patchpack): " + $packId) | Out-Host
  }
  Move-Item -LiteralPath $p.FullName -Destination (Join-Path $a $p.Name) -Force
}
Write-Host "DONE PatchPacks applied." -ForegroundColor Green