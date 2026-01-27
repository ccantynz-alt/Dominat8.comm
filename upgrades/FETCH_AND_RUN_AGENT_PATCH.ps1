param(
  [Parameter(Mandatory=$true)][string]$RunId,
  [string]$Base = "https://www.dominat8.com",
  [string]$ProjectId = "demo"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "USING runId=$RunId"
$uri = "$Base/api/agents/patch?projectId=$ProjectId&runId=$RunId"
Write-Host "GET $uri"

try {
  $p = Invoke-RestMethod -Uri $uri
  Write-Host "PATCH FOUND"
} catch {
  Write-Host "PATCH NOT FOUND (404)"
  Write-Host $_.Exception.Message
  if ($_.ErrorDetails -and $_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
  exit 2
}

if (-not $p.patch -or -not $p.patch.script -or $p.patch.script.Trim().Length -eq 0) {
  throw "Patch payload returned but patch.script is empty."
}

$out = Join-Path -Path ".\upgrades" -ChildPath ("AGENT_PATCH_{0}.ps1" -f $RunId)
$p.patch.script | Out-File -LiteralPath $out -Encoding utf8

Write-Host "WROTE: $out"
Write-Host -NoNewline "EXISTS: "
Write-Host (Test-Path -LiteralPath $out)

Write-Host "=== PREVIEW (first 20 lines) ==="
Get-Content -LiteralPath $out -TotalCount 20

Write-Host "=== RUNNING PATCH ==="
powershell -ExecutionPolicy Bypass -File $out
