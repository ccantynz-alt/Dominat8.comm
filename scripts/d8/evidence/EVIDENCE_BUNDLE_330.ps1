param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $OutRoot = "C:\Temp\D8_EVIDENCE"
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
function Ensure-Dir([string]$d){ if (-not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null } }
Ensure-Dir $OutRoot
Set-Location -LiteralPath $RepoRoot
$ts = Get-Date -Format "yyyyMMdd_HHmmss"
$dir = Join-Path $OutRoot ("D8_EVIDENCE_" + $ts)
Ensure-Dir $dir
(& git.exe rev-parse --abbrev-ref HEAD) | Out-File -FilePath (Join-Path $dir "git_branch.txt") -Encoding utf8
(& git.exe log -1 --oneline) | Out-File -FilePath (Join-Path $dir "git_head.txt") -Encoding utf8
(& git.exe status --porcelain) | Out-File -FilePath (Join-Path $dir "git_status_porcelain.txt") -Encoding utf8
$zip = $dir + ".zip"
if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
Compress-Archive -LiteralPath $dir -DestinationPath $zip -Force
Write-Host "OK Evidence: $zip" -ForegroundColor Green