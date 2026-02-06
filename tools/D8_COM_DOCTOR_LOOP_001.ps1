[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$BaseUrl,

  [Parameter(Mandatory=$true)]
  [string]$AdminKey,

  [int]$LoopSeconds = 60,

  [int]$TimeoutSeconds = 20
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok([string]$m){ Write-Host "OK   $m" -ForegroundColor Green }
function Warn([string]$m){ Write-Host "WARN $m" -ForegroundColor Yellow }
function Fail([string]$m){ Write-Host "FAIL $m" -ForegroundColor Red }

$BaseUrl = $BaseUrl.TrimEnd("/")

function Get-Health() {
  $ts = [int](Get-Date -UFormat %s)
  $u = "$BaseUrl/api/d8/health?ts=$ts"
  return Invoke-RestMethod -Method GET -Uri $u -TimeoutSec $TimeoutSeconds
}

function Trigger-Redeploy() {
  $u = "$BaseUrl/api/d8/repair"
  $headers = @{ "x-admin-key" = $AdminKey }
  $body = @{ action = "redeploy" } | ConvertTo-Json -Depth 10
  return Invoke-RestMethod -Method POST -Uri $u -Headers $headers -ContentType "application/json" -Body $body -TimeoutSec $TimeoutSeconds
}

Ok "Doctor loop starting..."
Ok "BaseUrl: $BaseUrl"
Ok "LoopSeconds: $LoopSeconds"

while ($true) {
  try {
    $h = Get-Health
    if (-not $h.ok) { throw "health_not_ok" }
    Ok ("Health OK stamp={0}" -f ($h.stamp))
  } catch {
    Fail ("Health failed: {0}" -f $_.Exception.Message)
    try {
      Warn "Attempting repair -> redeploy"
      $r = Trigger-Redeploy
      if ($r.ok) { Ok "Redeploy triggered OK" } else { Fail "Redeploy returned ok=false" }
    } catch {
      Fail ("Repair call failed: {0}" -f $_.Exception.Message)
    }
  }
  Start-Sleep -Seconds $LoopSeconds
}