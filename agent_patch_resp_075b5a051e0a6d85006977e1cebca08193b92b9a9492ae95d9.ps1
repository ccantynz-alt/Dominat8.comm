Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
try {
    $path = Join-Path -Path (Get-Location) -ChildPath "PATCH_UI_E2E.txt"
    Set-Content -Path $path -Value "UI_E2E_OK" -NoNewline -Force
    exit 0
} catch {
    Write-Error $_
    exit 1
}
