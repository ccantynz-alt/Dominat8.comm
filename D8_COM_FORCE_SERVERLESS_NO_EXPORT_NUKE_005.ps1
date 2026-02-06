param(
  [Parameter(Mandatory=$true)]
  [string]$RepoRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok($m){ Write-Host "OK   $m" -ForegroundColor Green }
function Warn($m){ Write-Host "WARN $m" -ForegroundColor Yellow }
function Fail($m){ Write-Host "FATAL $m" -ForegroundColor Red; exit 1 }
function EnsureDir($p){ if (-not (Test-Path -LiteralPath $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null } }
function WriteUtf8NoBom($path,$content){
  EnsureDir (Split-Path -Parent $path)
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}
function BackupFile($path,$tag){
  if (Test-Path -LiteralPath $path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $bak = "$path.bak_$tag`_$ts"
    Copy-Item -LiteralPath $path -Destination $bak -Force
    Ok "Backup: $bak"
  }
}

if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot not found: $RepoRoot" }
Set-Location -LiteralPath $RepoRoot
Ok "LOCKED PWD: $RepoRoot"

if (-not (Test-Path -LiteralPath ".git")) { Fail "Not a git repo: $RepoRoot" }

$porc = git status --porcelain
if ($porc) {
  Warn "Working tree not clean. Commit or stash first."
  $porc | Out-Host
  Fail "Refusing to run on dirty tree."
}

Ok "Deploying prod..."
cmd /c "vercel --prod --force" | Out-Host

$ts = [int](Get-Date -UFormat %s)
Write-Host "=== TEST /api/d8/health ===" -ForegroundColor Yellow
curl.exe -s -D - "https://www.dominat8.com/api/d8/health?ts=$ts" | Select-Object -First 30 | Out-Host