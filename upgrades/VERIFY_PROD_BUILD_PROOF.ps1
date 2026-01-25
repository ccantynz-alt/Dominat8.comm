Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ts = [int][double]::Parse((Get-Date -UFormat %s))
$base = "https://www.dominat8.com"
$u1 = "$base/api/__build__?ts=$ts"
$u2 = "$base/api/__probe__?ts=$ts"

Write-Host ""
Write-Host "== Dominat8 BUILD PROOF VERIFY ==" -ForegroundColor Cyan
Write-Host "Marker expected: BUILD_PROOF_V1"
Write-Host "Time nonce: $ts"
Write-Host ""

Write-Host "GET $u1" -ForegroundColor Yellow
$r1 = Invoke-WebRequest -UseBasicParsing -Uri $u1
Write-Host "Status: $($r1.StatusCode)" -ForegroundColor Green
Write-Host "x-dominat8-build-marker: $($r1.Headers['x-dominat8-build-marker'])"
Write-Host "x-dominat8-build-stamp : $($r1.Headers['x-dominat8-build-stamp'])"
if ($r1.Headers['x-dominat8-git-sha']) { Write-Host "x-dominat8-git-sha     : $($r1.Headers['x-dominat8-git-sha'])" }

Write-Host ""
Write-Host "Body (summary):" -ForegroundColor Cyan
($r1.Content | ConvertFrom-Json) | Format-List | Out-String | Write-Host

Write-Host ""
Write-Host "GET $u2" -ForegroundColor Yellow
$r2 = Invoke-WebRequest -UseBasicParsing -Uri $u2
Write-Host "Status: $($r2.StatusCode)" -ForegroundColor Green
Write-Host "x-dominat8-build-marker: $($r2.Headers['x-dominat8-build-marker'])"
Write-Host "x-dominat8-build-stamp : $($r2.Headers['x-dominat8-build-stamp'])"
Write-Host ""
Write-Host "Body:" -ForegroundColor Cyan
$r2.Content | Write-Host
Write-Host ""
Write-Host "DONE ✅" -ForegroundColor Green
Write-Host ""