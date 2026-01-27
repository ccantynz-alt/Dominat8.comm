Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== DOMINAT8 AGENT BUNDLE PATCH ==="
Write-Host "bundleRunId: bundle_mkvqymvf_9d984g"
Write-Host "projectId: demo"
Write-Host "goal: Quick verify: every agent must save a patch. Write PATCH_BUNDLE_VERIFY.txt from at least one agent."
Write-Host "createdAt: 2026-01-26T22:39:08.097Z"


Write-Host "----------------------------------------"
Write-Host "AGENT: 01_product_planner"
Write-Host "RUN: resp_0a9016d89bca6598006977ec73564081a1aceca8c96a07b79e"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# ```powershell
# # 01_product_planner: Create/overwrite PATCH_BUNDLE_VERIFY.txt to confirm at least one agent saved a patch
# 
# $agentName = "01_product_planner"
# $agentDir = Join-Path -Path (Get-Location) -ChildPath ("agents\" + $agentName)
# $verifyFile = Join-Path -Path $agentDir -ChildPath "PATCH_BUNDLE_VERIFY.txt"
# 
# # Ensure agent directory exists
# New-Item -ItemType Directory -Path $agentDir -Force | Out-Null
# 
# # Compose verification content (full overwrite)
# $utcNow = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
# $content = @"
# Agent: $agentName
# Action: PATCH_BUNDLE verification file saved
# When: $utcNow
# RepoRoot: $(Get-Location)
# 
# This file confirms that at least one

Write-Host "----------------------------------------"
Write-Host "AGENT: 02_architect"
Write-Host "RUN: resp_043ee6dcaa1a1f9d006977ec84b450819087ac8584684f9095"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# ```powershell
# # 02_architect: Write/overwrite verification file at repo root
# $agent = "02_architect"
# $timestamp = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
# $content = @"
# PATCH_BUNDLE_VERIFY
# Agent: $agent
# Status: OK
# Timestamp: $timestamp
# "@
# 
# Set-Content -

Write-Host "----------------------------------------"
Write-Host "AGENT: 03_creative_director"
Write-Host "RUN: resp_0e6449554b33a410006977ec9473f08190a296a2e628867606"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# ```powershell
# # 03_creative_director: ensure at least one patch exists and write verification file
# 
# $ErrorActionPreference = "Stop"
# 
# # Prepare patch directory
# $patchDir = Join-Path (Get-Location) "patches"
# if (-not (Test-Path $patchDir)) {
#     New-Item -ItemType Directory -Path $patchDir | Out-Null
# }
# 
# # Agent-specific patch path
# $agentName = "03_creative_director"
# $patchPath = Join-Path $patchDir "$agentName.patch"
# 
# # Create or overwrite a minimal patch contribution
# $now = Get-Date -Format "yyyy-MM-dd HH:mm:ssK"
# $patchContent = @"
# # Patch by $agentName
# # Created: $now
# # Purpose: Contribute a safe, incremental patch to ensure verification can succeed.
# 
# CHANGELOG:
# - Seeded a patch file to represent this agent's contribution.
# "@
# 
# Set-Content -Path $patchPath -Value $patchContent -Encoding UTF8
# 
# # Discover all agent patches
# $allPatches = Get-ChildItem -Path $patchDir -Filter "*.patch" -File -ErrorAction SilentlyContinue | Sort-Object Name
# 
# # Prepare verification report
# $verifyPath = Join-Path (Get-Location) "PATCH_BUNDLE_VERIFY.txt"
# 
# if ($allPatches.Count -gt 0) {
#     $lines = @()
#     $lines += "PATCH BUNDLE VERIFY"
#     $lines += "Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ssK")"
#     $lines += "Repo Root: $(Get-Location)"
#     $lines += ""
#     $lines += "Status: PASS â Found $($allP

Write-Host "----------------------------------------"
Write-Host "AGENT: 04_backend_engineer"
Write-Host "RUN: resp_06e536ecde08a07b006977eca9e75c81a1ad2a87660c2e2b20"
Write-Host "----------------------------------------"

# 04_backend_engineer: Write/overwrite PATCH_BUNDLE_VERIFY.txt to signal patch presence

$agent = "04_backend_engineer"
$timestamp = [DateTimeOffset]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$filePath = Join-Path -Path (Get-Location) -ChildPath "PATCH_BUNDLE_VERIFY.txt"

$content = @"
PATCH_BUNDLE_VERIFY
agent: $agent
timestamp_utc: $timestamp
status: verified-marker-written
"@

Set-Content -Path $filePath -Value $content -Encoding UTF8
Write-Host "Wrote verification marker to $filePath"

Write-Host "----------------------------------------"
Write-Host "AGENT: 05_frontend_engineer"
Write-Host "RUN: resp_0d5b339f420c415f006977ecb9a1e88191823b3d709a136df5"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# ```powershell
# # 05_frontend_engineer quick verify for patch bundle
# $ErrorActionPreference = "Stop"
# 
# $repoRoot = (Get-Location).Path
# $verifyFile = Join-Path $repoRoot "PATCH_BUNDLE_VERIFY.txt"
# 
# # Patterns that likely represent saved patches by agents
# $patterns = @("*.

Write-Host "----------------------------------------"
Write-Host "AGENT: 06_seo_agent"
Write-Host "RUN: resp_03c0105c90b30fd1006977eccbc208819497334c10a2e32972"
Write-Host "----------------------------------------"

# 06_seo_agent: Write verification file to confirm at least one agent saved a patch
$agent = "06_seo_agent"
$timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")

$content = @(
  "PATCH_BUNDLE_VERIFY"
  "agent=$agent"
  "timestamp=$timestamp"
  "status=verified"
  "note=This file confirms at least one agent saved a patch bundle verification."
)

Set-Content -Path "PATCH_BUNDLE_VERIFY.txt" -Value $content -Encoding UTF8

Write-Host "----------------------------------------"
Write-Host "AGENT: 07_security_agent"
Write-Host "RUN: resp_07eecfd025f32047006977ecd75d44819fafa1cf96903f2451"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# {
#   "id": "resp_07eecfd025f32047006977ecd75d44819fafa1cf96903f2451",
#   "object": "response",
#   "created_at": 1769467095,
#   "status": "incomplete",
#   "background": false,
#   "billing": {
#     "payer": "developer"
#   },
#   "completed_at": null,
#   "error": null,
#   "frequency_penalty": 0,
#   "incomplete_details": {
#     "reason": "max_output_tokens"
#   },
#   "instructions": null,
#   "max_output_tokens": 700,
#   "max_tool_calls": null,
#   "model": "gpt-5-2025-08-07",
#   "output": [
#     {
#       "id": "rs_07eecfd025f32047006977ecd79b34819f9e4a404a987d34a1",
#       "type": "reasoning",
#       "summary": []
#     }
#   ],
#   "parallel_tool_calls": true,
#   "presence_penalty": 0,
#   "previous_response_id": null,
#   "prompt_cache_key": null,
#   "prompt_cache_retention": null,
#   "reasoning": {
#     "effort": "low",
#     "summary": null
#   },
#   "safety_identifier": null,
#   "service_tier": "default",
#   "store": true,
#   "temperature": 1,
#   "text": {
#     "format": {
#       "type": "text"
#     },
#     "verbosity": "medium"
#   },
#   "tool_choice": "auto",
#   "tools": [],
#   "top_logprobs": 0,
#   "top_p": 1,
#   "truncation": "disabled",
#   "usage": {
#     "input_tokens": 108,
#     "input_tokens_details": {
#       "cached_tokens": 0
#     },
#     "output_tokens": 640,
#     "output_tokens_details": {
#       "reasoning_tokens": 640
#     },
#     "total_tokens": 748
#   },
#   "user": null,
#   "metadata": {},
#   "output_text": ""
# }

Write-Host "----------------------------------------"
Write-Host "AGENT: 08_qa_agent"
Write-Host "RUN: resp_07ac0598dead21f5006977ece7847c8190aa9e206d49ca32f7"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# {
#   "id": "resp_07ac0598dead21f5006977ece7847c8190aa9e206d49ca32f7",
#   "object": "response",
#   "created_at": 1769467111,
#   "status": "incomplete",
#   "background": false,
#   "billing": {
#     "payer": "developer"
#   },
#   "completed_at": null,
#   "error": null,
#   "frequency_penalty": 0,
#   "incomplete_details": {
#     "reason": "max_output_tokens"
#   },
#   "instructions": null,
#   "max_output_tokens": 700,
#   "max_tool_calls": null,
#   "model": "gpt-5-2025-08-07",
#   "output": [
#     {
#       "id": "rs_07ac0598dead21f5006977ece803248190856c71de91da318f",
#       "type": "reasoning",
#       "summary": []
#     }
#   ],
#   "parallel_tool_calls": true,
#   "presence_penalty": 0,
#   "previous_response_id": null,
#   "prompt_cache_key": null,
#   "prompt_cache_retention": null,
#   "reasoning": {
#     "effort": "low",
#     "summary": null
#   },
#   "safety_identifier": null,
#   "service_tier": "default",
#   "store": true,
#   "temperature": 1,
#   "text": {
#     "format": {
#       "type": "text"
#     },
#     "verbosity": "medium"
#   },
#   "tool_choice": "auto",
#   "tools": [],
#   "top_logprobs": 0,
#   "top_p": 1,
#   "truncation": "disabled",
#   "usage": {
#     "input_tokens": 109,
#     "input_tokens_details": {
#       "cached_tokens": 0
#     },
#     "output_tokens": 640,
#     "output_tokens_details": {
#       "reasoning_tokens": 640
#     },
#     "total_tokens": 749
#   },
#   "user": null,
#   "metadata": {},
#   "output_text": ""
# }

Write-Host "----------------------------------------"
Write-Host "AGENT: 09_release_manager"
Write-Host "RUN: resp_0b334a1cd88bdd2f006977ecfbdd888191b284f2f1447a09f7"
Write-Host "----------------------------------------"

Write-Host "NOTE: Fallback patch saved (no fenced code block found). Review before running."

# ```powershell
# # Ensure patches directory exists
# $patchDir = Join-Path -Path (Get-Location) -ChildPath "patches"
# if (-not (Test-Path $patchDir)) {
#     New-Item -ItemType Directory -Path $patchDir -Force | Out-Null
# }
# 
# # Create a simple patch file for this agent
# $agentName = "09_release_manager"
# $patchFile = Join-Path $patchDir "$agentName.patch"
# $timestamp = Get-Date -Format o
# 
# $patchContent = @"
# # Patch saved by $agentName
# # Timestamp: $timestamp
# 
# --- a/README.md
# +++ b/README.md
# @@ -1,1 +1,1 @@
# -Repo initialized.
# +Repo initialized. Patch marker by $agentName on $timestamp
# "@
# 
# Set-Content -Path $patchFile -Value $patchContent -Encoding UTF8
# 
# # Write PATCH_BUNDLE_VERIFY.txt (full overwrite) confirming at least one agent saved a patch
# $verifyFile = Join-Path (Get-Location) "PATCH_BUNDLE_VERIFY.txt"
# $verifyContent = @"
# PATCH_BUNDLE_VERIFY
# Agent

