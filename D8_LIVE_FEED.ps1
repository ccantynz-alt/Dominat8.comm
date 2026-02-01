Set-StrictMode -Version Latest
$ErrorActionPreference="Continue"

$repoSlug = "ccantynz-alt/Dominat8.io"

function Try-Run([scriptblock]$sb) { try { & $sb } catch { $null } }

Write-Host "=== D8 LIVE FEED ===" -ForegroundColor Cyan
Write-Host ("Repo: {0}" -f $repoSlug) -ForegroundColor DarkGray
Write-Host "Tip: Ctrl+C to stop." -ForegroundColor DarkGray

$lastRunId = ""
while ($true) {
  $now = Get-Date -Format "HH:mm:ss"
  $branch = Try-Run { (git rev-parse --abbrev-ref HEAD 2>$null).Trim() }
  $sha    = Try-Run { (git rev-parse --short HEAD 2>$null).Trim() }
  $dirty  = Try-Run { (git status --porcelain 2>$null | Measure-Object).Count }

  $run = Try-Run { (gh run list -R $repoSlug --limit 1 --json databaseId,status,conclusion,updatedAt,workflowName,displayTitle | ConvertFrom-Json) }

  if ($run) {
    $runId = [string]$run.databaseId
    $st    = [string]$run.status
    $con   = [string]$run.conclusion
    $wf    = [string]$run.workflowName
    $ttl   = [string]$run.displayTitle

    if ($runId -ne $lastRunId) {
      Write-Host ""
      Write-Host ("--- NEWEST RUN: {0} ({1}) ---" -f $runId, $wf) -ForegroundColor Cyan
      $lastRunId = $runId
    }

    $line = ("[{0}] branch={1} sha={2} dirty={3} | CI={4} run={5} status={6} conclusion={7} | ""{8}""" -f $now,$branch,$sha,$dirty,$wf,$runId,$st,$con,$ttl)
    Write-Host ("`r{0}" -f $line).PadRight(240) -NoNewline
  } else {
    $line = ("[{0}] branch={1} sha={2} dirty={3} | CI=unknown (gh auth?)" -f $now,$branch,$sha,$dirty)
    Write-Host ("`r{0}" -f $line).PadRight(240) -NoNewline
  }

  Start-Sleep -Seconds 1
}
