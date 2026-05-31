param(
  [string[]]$Weapon = @("1-20"),
  [string[]]$Tier = @("1", "2", "3"),
  [string]$SourceAssets = "exports\nindou_exports\assets",
  [string]$ScratchRoot = "exports\swf-extract",
  [switch]$RequireTierSwf,
  [switch]$CleanOutput,
  [switch]$ListOnly
)

$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
  param([string]$Path)
  if ([System.IO.Path]::IsPathRooted($Path)) {
    return [System.IO.Path]::GetFullPath($Path)
  }
  return [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\$Path"))
}

function Expand-NumberSpec {
  param(
    [string[]]$Spec,
    [string]$Name
  )
  $values = New-Object System.Collections.Generic.List[int]
  foreach ($item in $Spec) {
    foreach ($part in ($item -split ",")) {
      $trimmed = $part.Trim()
      if (-not $trimmed) { continue }
      if ($trimmed -match "^(\d+)\s*(?:\.\.|-)\s*(\d+)$") {
        $start = [int]$matches[1]
        $end = [int]$matches[2]
        $step = if ($start -le $end) { 1 } else { -1 }
        for ($value = $start; $value -ne ($end + $step); $value += $step) {
          $values.Add($value)
        }
      } elseif ($trimmed -match "^\d+$") {
        $values.Add([int]$trimmed)
      } else {
        throw "Invalid $Name value '$trimmed'. Use examples like 20, 19,20, or 1-20."
      }
    }
  }
  return $values.ToArray() | Sort-Object -Unique
}

function Find-Ffdec {
  $bat = Resolve-RepoPath "tools\ffdec\ffdec.bat"
  if (Test-Path -LiteralPath $bat) { return $bat }
  throw "FFDec was not found at $bat"
}

function Add-ImportArgs {
  param([string]$SourceDir)
  $args = @("-importAssets", "yes,local")
  $imports = @(
    @("assets/commonLib.swf", "commonLib.swf"),
    @("assets/sharedLib.swf", "sharedLib.swf"),
    @("assets/sfxLib.swf", "sfxLib.swf")
  )
  foreach ($import in $imports) {
    $target = Join-Path $SourceDir $import[1]
    if (Test-Path -LiteralPath $target) {
      $args += @("-changeImport", $import[0], $target)
    }
  }
  return $args
}

function Select-WeaponSwf {
  param(
    [string]$SourceDir,
    [int]$WeaponId,
    [int]$TierId,
    [bool]$RequireTier
  )
  $tierSwf = Join-Path $SourceDir "nindou_weapon_${WeaponId}_${TierId}_TW.swf"
  if (Test-Path -LiteralPath $tierSwf) { return $tierSwf }
  if ($RequireTier) { return $null }
  $baseSwf = Join-Path $SourceDir "nindou_weapon_${WeaponId}_TW.swf"
  if (Test-Path -LiteralPath $baseSwf) { return $baseSwf }
  return $null
}

$sourceDir = Resolve-RepoPath $SourceAssets
$scratchDir = Resolve-RepoPath $ScratchRoot
$ffdec = Find-Ffdec
$weaponIds = Expand-NumberSpec $Weapon "Weapon"
$tierIds = Expand-NumberSpec $Tier "Tier"

if (-not (Test-Path -LiteralPath $sourceDir)) {
  throw "Nindou source asset folder not found: $sourceDir"
}

New-Item -ItemType Directory -Force -Path $scratchDir | Out-Null
$importArgs = Add-ImportArgs $sourceDir
$jobs = @()

foreach ($weaponId in $weaponIds) {
  foreach ($tierId in $tierIds) {
    $swf = Select-WeaponSwf $sourceDir $weaponId $tierId $RequireTierSwf.IsPresent
    if (-not $swf) {
      Write-Warning "Missing SWF for weapon $weaponId tier $tierId"
      continue
    }

    $outRoot = Join-Path $scratchDir ("weapon{0}_{1}" -f $weaponId, $tierId)
    $spriteOut = Join-Path $outRoot "sprites"
    $soundOut = Join-Path $outRoot "sounds"
    $jobs += [pscustomobject]@{
      Weapon = $weaponId
      Tier = $tierId
      Swf = $swf
      Output = $outRoot
      Sprites = $spriteOut
      Sounds = $soundOut
    }
  }
}

if ($ListOnly) {
  $jobs | Format-Table Weapon,Tier,Swf,Output -AutoSize
  return
}

foreach ($job in $jobs) {
  if ($CleanOutput -and (Test-Path -LiteralPath $job.Output)) {
    $resolvedScratch = (Resolve-Path -LiteralPath $scratchDir).Path
    $resolvedOutput = (Resolve-Path -LiteralPath $job.Output).Path
    if (-not $resolvedOutput.StartsWith($resolvedScratch, [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "Refusing to clean output outside scratch root: $resolvedOutput"
    }
    Remove-Item -LiteralPath $job.Output -Recurse -Force
  }

  New-Item -ItemType Directory -Force -Path $job.Sprites | Out-Null
  New-Item -ItemType Directory -Force -Path $job.Sounds | Out-Null

  Write-Host ("Exporting weapon {0} tier {1} from {2}" -f $job.Weapon, $job.Tier, (Split-Path $job.Swf -Leaf))
  & $ffdec @importArgs -format "sprite:png" -export sprite $job.Sprites $job.Swf
  & $ffdec @importArgs -export sound $job.Sounds $job.Swf
}

Write-Host "Done. Review extracted SWF assets under $scratchDir"
