param(
  [string]$SourceRoot = "exports\nindou_exports\assets\nin",
  [string]$AssetRoot = "assets\nin",
  [string]$FfdecPath = "tools\ffdec\ffdec.bat",
  [string]$TempRoot = "tmp_avatar_svg_extract",
  [ValidateSet("body", "eyes", "hair", "dresses", "hats")]
  [string[]]$Categories = @("body", "eyes", "hair", "dresses", "hats"),
  [switch]$Force
)

$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
  param([string]$Path)
  if ([System.IO.Path]::IsPathRooted($Path)) {
    return [System.IO.Path]::GetFullPath($Path)
  }
  return [System.IO.Path]::GetFullPath((Join-Path (Join-Path $PSScriptRoot "..") $Path))
}

function Get-FirstSpriteSvg {
  param(
    [string]$ExportDir,
    [string]$NamePattern
  )
  return Get-ChildItem -LiteralPath $ExportDir -Recurse -Filter "*.svg" -File |
    Where-Object { $_.Directory.Name -match $NamePattern } |
    Sort-Object FullName |
    Select-Object -First 1
}

function Export-FrontSprite {
  param(
    [string]$SwfPath,
    [string]$OutputPath,
    [string]$NamePattern,
    [string]$Ffdec,
    [string]$WorkRoot,
    [switch]$Force
  )

  if ((Test-Path -LiteralPath $OutputPath) -and -not $Force) {
    return $false
  }

  $jobRoot = Join-Path $WorkRoot ([System.IO.Path]::GetFileNameWithoutExtension($SwfPath))
  if (Test-Path -LiteralPath $jobRoot) {
    Remove-Item -LiteralPath $jobRoot -Recurse -Force
  }
  New-Item -ItemType Directory -Force -Path $jobRoot | Out-Null

  & $Ffdec -onerror ignore -format "sprite:svg" -export sprite $jobRoot $SwfPath | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "FFDEC failed for $SwfPath"
    return $false
  }

  $frontSvg = Get-FirstSpriteSvg -ExportDir $jobRoot -NamePattern $NamePattern
  if (-not $frontSvg) {
    Write-Warning "No front SVG matched $NamePattern in $SwfPath"
    return $false
  }

  New-Item -ItemType Directory -Force -Path ([System.IO.Path]::GetDirectoryName($OutputPath)) | Out-Null
  Copy-Item -LiteralPath $frontSvg.FullName -Destination $OutputPath -Force
  return $true
}

function Export-EyeSprites {
  param(
    [string]$SwfPath,
    [string]$OutputDir,
    [string]$Ffdec,
    [string]$WorkRoot,
    [switch]$Force
  )

  $jobRoot = Join-Path $WorkRoot "nin_body"
  $eyeRoot = Join-Path $jobRoot "DefineSprite_113_nin_body_fla.eye_front_1_5"
  if (-not (Test-Path -LiteralPath $eyeRoot)) {
    if (Test-Path -LiteralPath $jobRoot) {
      Remove-Item -LiteralPath $jobRoot -Recurse -Force
    }
    New-Item -ItemType Directory -Force -Path $jobRoot | Out-Null
    & $Ffdec -onerror ignore -format "sprite:svg" -export sprite $jobRoot $SwfPath | Out-Null
    if ($LASTEXITCODE -ne 0) {
      Write-Warning "FFDEC failed for $SwfPath"
      return 0
    }
  }

  if (-not (Test-Path -LiteralPath $eyeRoot)) {
    Write-Warning "No front eye SVG export folder found in $SwfPath"
    return 0
  }

  New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
  $written = 0
  Get-ChildItem -LiteralPath $eyeRoot -Filter "*.svg" -File | Sort-Object { [int]$_.BaseName } | ForEach-Object {
    $outputPath = Join-Path $OutputDir $_.Name
    if ((Test-Path -LiteralPath $outputPath) -and -not $Force) {
      return
    }
    Copy-Item -LiteralPath $_.FullName -Destination $outputPath -Force
    $script:writtenEyePath = $outputPath
    $written += 1
    Write-Host "Wrote $outputPath"
  }
  return $written
}

$repoSourceRoot = Resolve-RepoPath $SourceRoot
$repoAssetRoot = Resolve-RepoPath $AssetRoot
$ffdec = Resolve-RepoPath $FfdecPath
$workRoot = Resolve-RepoPath $TempRoot
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$resolvedWorkRoot = (Resolve-Path (New-Item -ItemType Directory -Force -Path $workRoot)).Path
if (-not $resolvedWorkRoot.StartsWith($repoRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "TempRoot must resolve inside the repository: $resolvedWorkRoot"
}

$jobs = @()

if ($Categories -contains "body") {
  $jobs += @{
    Source = Join-Path $repoSourceRoot "body\nin_body.swf"
    Output = Join-Path $repoAssetRoot "body\in_body-front.svg"
    Pattern = "^DefineSprite_111$"
  }
}

$eyesWritten = 0
if ($Categories -contains "eyes") {
  $eyesWritten = Export-EyeSprites `
    -SwfPath (Join-Path $repoSourceRoot "body\nin_body.swf") `
    -OutputDir (Join-Path $repoAssetRoot "eyes") `
    -Ffdec $ffdec `
    -WorkRoot $workRoot `
    -Force:$Force
}

$assetSets = @(
  @{ SourceDir = "hair"; OutputDir = "hair"; Pattern = "Hair_N_F" },
  @{ SourceDir = "dresses"; OutputDir = "dresses"; Pattern = "Dress_N_F" },
  @{ SourceDir = "hats"; OutputDir = "hats"; Pattern = "Hat_N_F|Hair_N_F" }
)

foreach ($set in $assetSets) {
  if (-not ($Categories -contains $set.SourceDir)) {
    continue
  }
  $sourceDir = Join-Path $repoSourceRoot $set.SourceDir
  Get-ChildItem -LiteralPath $sourceDir -Filter "*.swf" -File | Sort-Object Name | ForEach-Object {
    $id = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
    $jobs += @{
      Source = $_.FullName
      Output = Join-Path (Join-Path $repoAssetRoot $set.OutputDir) "$id-front.svg"
      Pattern = $set.Pattern
    }
  }
}

$written = 0
$skipped = 0
foreach ($job in $jobs) {
  $didWrite = Export-FrontSprite -SwfPath $job.Source -OutputPath $job.Output -NamePattern $job.Pattern -Ffdec $ffdec -WorkRoot $workRoot -Force:$Force
  if ($didWrite) {
    $written += 1
    Write-Host "Wrote $($job.Output)"
  } else {
    $skipped += 1
  }
}

$written += $eyesWritten
Write-Host "Avatar SVG export complete. Wrote $written file(s), skipped or failed $skipped file(s)."
