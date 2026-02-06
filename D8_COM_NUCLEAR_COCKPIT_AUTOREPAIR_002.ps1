powershell.exe -NoProfile -ExecutionPolicy Bypass `
  -File ".\D8_COM_NUCLEAR_COCKPIT_AUTOREPAIR_002.ps1" `
  -RepoRoot (Get-Location).Path `
  -AllowDirty
