param(
  [Parameter(Mandatory=$true)]
  [string]$TargetRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Assert-UnderAllowlist {
  param([Parameter(Mandatory=$true)][string]$FullPath)

  $root = (Resolve-Path -LiteralPath $TargetRoot).Path.TrimEnd('\')
  $full = [System.IO.Path]::GetFullPath($FullPath)

  $rootPrefix = $root + "\"
  if (-not $full.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Path is outside TargetRoot: $full"
  }

  $rel = $full.Substring($rootPrefix.Length)

  $ok =
    $rel.StartsWith("public\engine_proofs\", [System.StringComparison]::OrdinalIgnoreCase) -or
    $rel.StartsWith("src\lib\engine\", [System.StringComparison]::OrdinalIgnoreCase)

  if (-not $ok) {
    throw "BLOCKED by allowlist. Attempted write: $rel"
  }
}

function Backup-File {
  param([Parameter(Mandatory=$true)][string]$Path)
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $bak = "$Path.bak_$ts"
    Copy-Item -LiteralPath $Path -Destination $bak -Force
    return $bak
  }
  return $null
}

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Content
  )

  Assert-UnderAllowlist -FullPath $Path

  $dir = Split-Path -Parent $Path
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Append-IfMissing {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Marker,
    [Parameter(Mandatory=$true)][string]$AppendBlock
  )

  Assert-UnderAllowlist -FullPath $Path

  $text = Get-Content -LiteralPath $Path -Raw
  if ($text -match [Regex]::Escape($Marker)) {
    Write-Host "Already applied (marker found) -> $Path"
    return $false
  }

  Backup-File -Path $Path | Out-Null

  $newText = $text.TrimEnd() + "`r`n`r`n" + $AppendBlock.Trim() + "`r`n"
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $newText, $utf8NoBom)

  return $true
}

if (-not (Test-Path -LiteralPath $TargetRoot)) {
  throw "TargetRoot does not exist: $TargetRoot"
}
$TargetRoot = (Resolve-Path -LiteralPath $TargetRoot).Path
Write-Host "TARGET_ROOT = $TargetRoot"

# --- Ensure allowlisted folders exist ---
$engineDir = Join-Path $TargetRoot "src\lib\engine"
$proofDir  = Join-Path $TargetRoot "public\engine_proofs"

if (-not (Test-Path -LiteralPath $engineDir)) {
  New-Item -ItemType Directory -Path $engineDir -Force | Out-Null
  Write-Host "CREATED: $engineDir"
}
if (-not (Test-Path -LiteralPath $proofDir)) {
  New-Item -ItemType Directory -Path $proofDir -Force | Out-Null
  Write-Host "CREATED: $proofDir"
}

# --- Paths ---
$proofTxt = Join-Path $TargetRoot "public\engine_proofs\engine_proof_006.txt"
$installTs = Join-Path $TargetRoot "src\lib\engine\engineInstall006.ts"
$proof005  = Join-Path $TargetRoot "src\lib\engine\engineProof005.ts"

$stamp = "ENGINE_INSTALL_006_STAMP_" + (Get-Date -Format "yyyy-MM-dd") + "_NZ"

# --- Ensure engineProof005.ts exists (so we can prove semantic edits) ---
if (-not (Test-Path -LiteralPath $proof005)) {
  $seed = @"
//
// DOMINAT8 ENGINE — PROOF 005 (seeded by INSTALL 006 if missing)
// This file exists to host future append-only semantic edits.
//
export const ENGINE_PROOF_005_SEEDED = true;
"@
  Write-Utf8NoBom -Path $proof005 -Content $seed
  Write-Host "CREATED (seed): $proof005"
}

# --- 1) Create semantic code artifact ---
Backup-File -Path $installTs | Out-Null

$engineInstall006 = @"
//
// DOMINAT8 ENGINE — INSTALL 006
// Semantic (invisible) code intelligence change within allowlist.
//
// Stamp: $stamp
//

export const ENGINE_INSTALL_006 = "$stamp" as const;

export type EngineInstall006Info = {
  install: "006";
  stamp: typeof ENGINE_INSTALL_006;
  at: string;
};

export function getEngineInstall006Info(): EngineInstall006Info {
  return {
    install: "006",
    stamp: ENGINE_INSTALL_006,
    at: new Date().toISOString(),
  };
}
"@
Write-Utf8NoBom -Path $installTs -Content $engineInstall006
Write-Host "WROTE: $installTs"

# --- 2) Append semantic proof block to engineProof005.ts ---
$marker = "ENGINE_INSTALL_006_APPENDED_BLOCK"
$appendBlock = @"
//
// $marker
// Appended by ENGINE_INSTALL_006_PATCH.ps1
//
export const ENGINE_INSTALL_006_APPENDED = "$stamp" as const;

export function engineInstall006Proof() {
  return {
    ok: true,
    install: "006",
    stamp: ENGINE_INSTALL_006_APPENDED,
    at: new Date().toISOString(),
  };
}
"@

$didAppend = Append-IfMissing -Path $proof005 -Marker $marker -AppendBlock $appendBlock
if ($didAppend) {
  Write-Host "UPDATED (append): $proof005"
} else {
  Write-Host "SKIPPED (already present): $proof005"
}

# --- 3) Proof-of-execution file ---
Backup-File -Path $proofTxt | Out-Null

$proofBody = @"
DOMINAT8 ENGINE — PROOF 006
================================
STAMP: $stamp
WHEN:  $([DateTime]::UtcNow.ToString("o"))
WHERE: public\engine_proofs\engine_proof_006.txt

Expected companion code:
- src\lib\engine\engineInstall006.ts
- src\lib\engine\engineProof005.ts (marker: $marker)
"@
Write-Utf8NoBom -Path $proofTxt -Content $proofBody
Write-Host "WROTE: $proofTxt"

Write-Host ""
Write-Host "✅ ENGINE_INSTALL_006 COMPLETE."