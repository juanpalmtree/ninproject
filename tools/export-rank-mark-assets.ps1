param(
  [string]$SourceDir = "exports\ui_vectors\lobbies\shapes\sprites\sprites\DefineSprite_181_nindou_main_TW_66_fla.NJ_rankMark_754",
  [string]$AssetDir = "assets\ui\rank-marks"
)

$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
  param([string]$Path)
  if ([System.IO.Path]::IsPathRooted($Path)) {
    return [System.IO.Path]::GetFullPath($Path)
  }
  return [System.IO.Path]::GetFullPath((Join-Path (Join-Path $PSScriptRoot "..") $Path))
}

$source = Resolve-RepoPath $SourceDir
$destination = Resolve-RepoPath $AssetDir
$rankMarks = Get-ChildItem -LiteralPath $source -Filter "*.svg" -File |
  Sort-Object { [int]$_.BaseName }

if ($rankMarks.Count -ne 17) {
  throw "Expected 17 rank-mark SVGs in $source, found $($rankMarks.Count)."
}

New-Item -ItemType Directory -Force -Path $destination | Out-Null
foreach ($rankMark in $rankMarks) {
  Copy-Item -LiteralPath $rankMark.FullName -Destination (Join-Path $destination $rankMark.Name) -Force
  Write-Host "Wrote $(Join-Path $destination $rankMark.Name)"
}

Write-Host "Rank-mark export complete. Wrote $($rankMarks.Count) file(s)."
