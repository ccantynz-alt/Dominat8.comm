# =========================================================
# PHASE 6 — INTERACTIVE HOMEPAGE DEMO (AUTHORITATIVE)
# File: upgrades/UPGRADE_2026-01-25_PHASE6_INTERACTIVE_DEMO.ps1
# =========================================================

Set-StrictMode -Off
$ErrorActionPreference = "Stop"

function Ok($m){ Write-Host ("OK  " + $m) -ForegroundColor Green }
function Die($m){ Write-Host ("BAD " + $m) -ForegroundColor Red; exit 1 }

# --- Locate homepage (App Router) ---
$HomePath = ".\src\app\page.tsx"
if (!(Test-Path -LiteralPath $HomePath)) {
  Die "Homepage not found at $HomePath"
}
Ok "Found homepage: $HomePath"

# --- Generate unique marker ---
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Marker = "PHASE6_DEMO_$Stamp"

# --- Read existing content ---
$Existing = Get-Content -LiteralPath $HomePath -Raw

if ($Existing -match "PHASE6_DEMO_") {
  Ok "Phase 6 marker already present — replacing with fresh marker"
  $Existing = $Existing -replace "PHASE6_DEMO_[0-9_]+", $Marker
}

# --- Build interactive demo block ---
$DemoBlock = @"
{/* ===========================
     PHASE 6 — INTERACTIVE DEMO
     Marker: $Marker
     =========================== */}
<section style={{
  marginTop: '6rem',
  padding: '4rem 2rem',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  textAlign: 'center'
}}>
  <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
    Watch Dominat8 Think
  </h2>

  <p style={{ opacity: 0.75, maxWidth: 720, margin: '0 auto 2rem' }}>
    This is a live, client-side interaction demo.  
    Future phases will stream real agent logs here.
  </p>

  <button
    onClick={() => {
      const el = document.getElementById('phase6-output');
      if (el) {
        el.innerText = 'Agent running…\\n✔ Generating layout\\n✔ Writing SEO\\n✔ Preparing publish';
      }
    }}
    style={{
      background: 'linear-gradient(135deg, #7c5cff, #4dd2ff)',
      color: '#000',
      padding: '14px 26px',
      borderRadius: 10,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Run Demo Agent
  </button>

  <pre
    id="phase6-output"
    style={{
      marginTop: '2rem',
      textAlign: 'left',
      background: 'rgba(0,0,0,0.6)',
      padding: '1.5rem',
      borderRadius: 12,
      maxWidth: 720,
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#7CFFB2'
    }}
  >
$Marker
  </pre>
</section>
"@

# --- Inject before closing fragment or end of file ---
if ($Existing -match "</main>") {
  $Updated = $Existing -replace "</main>", "$DemoBlock`n</main>"
} else {
  $Updated = $Existing + "`n" + $DemoBlock
}

# --- Write back ---
Set-Content -LiteralPath $HomePath -Value $Updated -Encoding UTF8
Ok "Injected Phase 6 interactive demo + marker $Marker"

exit 0
