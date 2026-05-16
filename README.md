# Nindou 2 Offline Prototype

This repository is an English offline remake/prototype inspired by Nindou 3. It is built with plain HTML, CSS, and JavaScript using an HTML Canvas battle screen.

The current playable entry point is:

```text
game.en.html
```

## Project Status

This is an active prototype. The goal is to preserve the feel of the original Nindou-style room, movement, combat, items, ninjutsu, Ougi, death, and result animations while making the game playable offline.

Current focus areas:

- English room and battle flow.
- Blue vs Grey team combat.
- Player-controlled Blue unit with AI-controlled opponents/allies.
- Grid movement, weapon attacks, run-over collision, destructible map objects, and respawns.
- Ninjutsu skill system with the shared special/Ougi gauge.
- Consumable item inventory and gold storage.
- Ougi animations and sounds for custom weapons.
- Death and win/loss result animations.
- Imported reference assets for jutsu effects, sounds, movement, and UI.

## Main Files

- `game.en.html` - current English game entry point.
- `game.en.js` - main game loop, drawing, input, room flow, HUD, and asset loading.
- `style.css` - room UI and page styling.
- `scripts/data/assets.js` - image and sound asset paths.
- `scripts/data/config.js` - shared gameplay constants.
- `scripts/data/weapons.en.js` - English weapon definitions and Ougi data.
- `scripts/data/rule-modes.js` - rule mode tuning.
- `scripts/systems/combat.js` - weapon attacks, damage, object damage, and Ougi-related combat hooks.
- `scripts/systems/movement.js` - movement, collision, respawns, and Fire Toad movement rules.
- `scripts/systems/ninjutsu.js` - ninjutsu casting, buffs, attack jutsus, and Fire Toad.
- `scripts/systems/ai.js` - AI behavior.
- `scripts/systems/match.js` - match lifecycle and result handling.

## How To Run

Open `game.en.html` in a browser.

For local development, you can also serve the folder with any static file server. For example:

```powershell
npx serve .
```

Then open the local URL it prints.

## Basic Controls

- Click and drag a controllable unit to move in a straight line.
- Click an enemy or target cell to attack with the equipped weapon.
- Click item slots to use consumables.
- Click ninjutsu buttons to cast skills.
- Use the Ougi input when the shared special gauge is ready.

Some controls and tuning are still prototype-level and may change as the project gets closer to the original game feel.

## Current Gameplay Notes

- HP max is `300`.
- Skill/SP max is `18`.
- Normal run-over collision damage is `40`.
- SP charge speed follows the reference value `18 / 6.5`.
- Weapon recovery blocks normal movement, matching the reference behavior.
- Fire Toad keeps custom transformation rules and is intentionally different from normal weapon combat.
- Ougi damage only applies to enemy players in the path, not map objects.

## Custom Content

- Weapon 19 is Muramasa.
- Weapon 20 has been added.
- Weapon 19 currently uses Iga Hidden Blade-style range and timing with higher damage.
- Weapon 20 currently uses Fan-style range and timing with higher damage.
- Backup is a consumable item that restores SP to full.
- Gold can be collected from hay objects and is stored on the player.

## Working With Branches

Use `main` as the shared branch for the group.

Recommended workflow:

```powershell
git checkout main
git pull origin main
git checkout -b your-feature-name
```

Make changes on your feature branch, then merge or open a pull request back into `main`.

## Notes For Contributors

- Preserve existing animation offsets unless a task specifically asks to retune them.
- Keep new assets inside `assets/` and avoid absolute local paths.
- Use `game.en.html` and `game.en.js` for the English prototype.
- Be careful with large imported reference folders. The playable project should only include the assets it actually uses.
- After editing JavaScript, run syntax checks when possible:

```powershell
node --check game.en.js
node --check scripts/systems/combat.js
node --check scripts/systems/movement.js
node --check scripts/systems/ninjutsu.js
```

## Local Reference Files

Some local scratch/reference files may exist during development, such as:

- `lancode_reference/`
- `lancode-diff.txt`
- `lancode-code-diff.txt`

These are not required to run the game and should not be treated as the shared project source.
