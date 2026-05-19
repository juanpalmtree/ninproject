# AI Handoff Notes

Read this before changing the game. This project has many hand-tuned positions, animation offsets, and gameplay rules.

## Project Goal

Build an offline Nindou 2 style prototype that prioritizes the original battle feel requested by the user. The goal is not a generic game framework. Visuals should stay close to the original whenever matching assets exist.

## User Preferences

- The user often tunes coordinates and offsets by hand.
- If a constant has already been tuned, avoid changing it unless the current task specifically asks for it.
- Visual placement matters a lot, especially characters, weapons, room UI, HUD, jutsu effects, and Ougi effects.
- Every weapon or animation change should be checked for offset or timing side effects.
- Keep user-facing text, README files, docs, and comments in English.
- Use `apply_patch` for manual edits.

## High-Risk Areas

### Weapon Animation Offsets

Weapon drawing and slash anchors are tuned visually. Before editing weapon animation scale, offsets, or anchor points, inspect:

- `drawWeaponFrame()`
- `drawWeaponAttackFrame()`
- `playSlash()`
- `weaponSlashAnchorCell()`

### Weapon Ranges

`weaponAreaCells(attacker, dir)` defines normal weapon hit shapes.

`weaponHitInDirection()` is AOE: every enemy and breakable object inside the hit cells is affected.

### Coordinates

The user usually thinks in player-facing coordinates:

- Player `[1,1]` is the first walkable cell in the bottom-left corner.
- `displayCellCoord()` and `internalCellCoord()` convert between player-facing and internal grid coordinates.
- Be careful when editing `buildMapObjects()`.

### Audio

The project currently has:

- Room music: `assets/audio/lobby.mp3`
- Battle music: `assets/audio/bgm.mp3`
- Yashao music: `assets/audio/jugodechina.mp4`

Do not restore absolute local audio paths. `startBgm()`, `syncBgm()`, and `activeBgm()` control which track plays.

## Core Flow

1. `game.en.html` loads the room DOM and canvas.
2. `loadImages()` loads image assets.
3. `resetGame()` creates units, map objects, and state.
4. The room start button calls `startBattleFromRoom()`.
5. The main `draw()` loop updates AI, jutsu, projectiles, animations, map, units, attacks, and HUD.
6. `checkVictory()` detects team elimination.
7. `finishMatch()` records results and stops battle music after pending animations finish.

## Common Checks

```powershell
node --check .\game.en.js
node --check .\scripts\systems\combat.js
node --check .\scripts\systems\movement.js
node --check .\scripts\systems\ninjutsu.js
```

For visual changes, open `game.en.html` in a browser and test the exact interaction.

## Working Style

- Read the relevant functions first.
- Keep changes small and focused.
- Preserve hand-tuned values unless the task asks to retune them.
- Do not delete original playable assets without confirmation.
- Only commit generated export folders when the game directly references them.
