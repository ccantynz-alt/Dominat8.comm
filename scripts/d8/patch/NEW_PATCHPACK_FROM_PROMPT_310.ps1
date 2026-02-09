param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [Parameter(Mandatory=$true)][string] $Prompt,
  [string] $QueueDir = "patches\queue"
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
function Ensure-Dir([string]$d){ if (-not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }

Set-Location -LiteralPath $RepoRoot
$ts = Get-Date -Format "yyyyMMdd_HHmmss"
$id = "PP_" + $ts
$outDir = Join-Path $RepoRoot $QueueDir
Ensure-Dir $outDir

$ops = @(
  @{
    op = "replaceInFile"
    path = "src/app/builder/page.tsx"
    find = "Mega #4 next:"
    replace = "Mega #4 next: (autopilot progressing) "
    note = "Autopilot keepalive touch"
  }
)

$pack = @{
  id = $id
  createdUtc = (Get-Date).ToUniversalTime().ToString("o")
  prompt = $Prompt
  ops = $ops
}

$json = ($pack | ConvertTo-Json -Depth 10)
$outPath = Join-Path $outDir ($id + ".json")
[System.IO.File]::WriteAllText($outPath, $json, (New-Object System.Text.UTF8Encoding($false)))

Write-Host "OK   Created PatchPack: $outPath" -ForegroundColor Green