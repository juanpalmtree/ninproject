# Nindou 2 Offline Prototype

This folder contains project notes for the English offline Nindou 2 prototype.

The playable entry point is:

```text
game.en.html
```

## How To Run

Open `game.en.html` in a browser, or serve the repository with any static file server and open the local URL.

Example:

```powershell
npx serve .
```

## Main Files

- `game.en.html` - English room screen, canvas, HUD, and controls.
- `game.en.js` - main game loop, drawing, input, room flow, HUD, and asset loading.
- `style.css` - room UI and page styling.
- `scripts/data/assets.js` - image and sound asset paths.
- `scripts/data/config.js` - shared gameplay constants.
- `scripts/data/weapons.en.js` - English weapon definitions and Ougi data.
- `scripts/data/progression.en.js` - English rank, class, level, and unlock data.
- `scripts/systems/combat.js` - weapon attacks, damage, object damage, and Ougi combat behavior.
- `scripts/systems/movement.js` - movement, collision, respawns, and Fire Toad movement rules.
- `scripts/systems/ninjutsu.js` - ninjutsu casting, buffs, attack jutsus, summons, and transformations.
- `scripts/systems/ai.js` - AI behavior.
- `scripts/systems/match.js` - match lifecycle, death handling, and result handling.

## Current Gameplay Notes

- The room supports Blue and Grey teams.
- Players can equip weapons, items, eyes, and ninjutsu from the room editor.
- The shared special/Ougi gauge drives weapon Ougi tiers and attack/summon jutsu strength.
- Ougi selection is tier based: tier 1 casts Ougi 1, tier 2 casts Ougi 2, and tier 3 or 4 casts Ougi 3.
- Butsumetsu kills enemies in range immediately, then kills the caster shortly after.
- Some assets are imported from original Nindou-style SWF exports and are stored under `assets/`.

## Development Notes

- Keep user-facing text in English.
- Prefer `game.en.html`, `game.en.js`, and `scripts/data/weapons.en.js` for the English prototype.
- Keep new playable assets inside `assets/`.
- Avoid committing local scratch exports unless the game references them directly.
- After editing JavaScript, run syntax checks when possible:

```powershell
node --check game.en.js
node --check scripts/systems/combat.js
node --check scripts/systems/movement.js
node --check scripts/systems/ninjutsu.js
```
