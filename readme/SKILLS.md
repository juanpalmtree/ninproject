# Project Work Notes

This is not a Codex system skill file. It is a local guide for people or agents working on the Nindou 2 offline prototype.

## Scope

Use this guide when changing:

- Canvas game logic in `game.en.js`.
- Room UI in `game.en.html` and `style.css`.
- Character, map, weapon, jutsu, Ougi, item, and sound assets under `assets/`.

## Workflow

1. Search for the relevant functions first, such as `weaponAreaCells`, `useWeaponOugi`, `triggerSpecialNinju`, or `drawOugiAnimations`.
2. Check whether a value has already been hand-tuned.
3. Understand whether the change affects input, hit detection, animation, sound, state locks, or match lifecycle.
4. Run JavaScript syntax checks after editing.
5. For visual work, test in the browser whenever possible.

## Asset Rules

- Prefer assets already organized under `assets/`.
- Copy needed external assets into this repository instead of referencing absolute local paths.
- Directional sprite folders usually use names such as `right_attack`, `left_hand`, `body/right`, or `fx/down`.
- Keep playable assets under stable paths so the loader can find them.

## Naming

- Music belongs in `assets/audio/`.
- Sound effects belong in `assets/sfx/`.
- Weapons belong in `assets/weapon/`.
- Weapon Ougi effects belong in `assets/ougi/`.
- Jutsu assets belong in `assets/ninju/`.
- Room UI assets belong in `assets/room-ui-selected/` or `assets/room-ui/`.

## Weapon Changes

When changing a weapon, check:

- Damage in `scripts/data/weapons.en.js`.
- Cooldown in `scripts/data/weapons.en.js`.
- Frame folders under `assets/weapon/`.
- Ougi folders under `assets/ougi/`.
- Ougi damage, cost, duration, frame count, and range shape.
- Normal attack range in `weaponAreaCells()`.
- Hit application in `weaponHitInDirection()` and `attackCell()`.

Normal weapon attacks can hit multiple enemies and breakable objects when their range covers multiple cells.

## Jutsu Changes

When changing jutsu behavior, check:

- Button rendering and click areas.
- SP or special gauge cost.
- Cast duration and effect timing.
- Movement, attack, item, jutsu, and Ougi locks.
- Invincibility or immunity windows.
- Sound effects.
- Whether the effect stacks, refreshes, replaces, or waits for an existing effect to expire.

Steel, Koban, Seven, Death, Butsumetsu, and Fire Toad have custom behavior. Do not replace them with generic RPG assumptions.

## Room UI

The room screen is DOM and CSS, not canvas.

Important files:

- `game.en.html`
- `style.css`
- Room assets in `assets/room-ui-selected/`
- Room UI source assets in `assets/room-ui/`

The room should stay close to the original visual layout. Prefer real extracted assets over placeholder CSS when possible.

## Documentation And Comments

- Keep documentation and code comments in English.
- Document concrete tuned values, behavior decisions, and “do not move without testing” areas.
- Avoid abstract architecture notes that do not help the next person safely change the game.
