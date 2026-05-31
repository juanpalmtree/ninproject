# Nindou 3 - Ougi Spec

## What is an ougi

An ougi is a weapon-based ultimate attack. Each weapon has its own set of
per-tier ougis. Ougis are triggered by consuming the entire Z/special bar.

---

## Ougi rules

- Ougi is weapon-based — each weapon has its own ougis
- Each weapon has per-tier ougi animations, sounds, and ranges
- Ougi consumes the ENTIRE Z bar — it never grants Z back under any circumstance
- The caster cannot move during the ougi animation
- The caster is immune to damage and status effects during the ougi and
  briefly after it completes
- Ougi path/range is applied immediately at cast time

---

## Stun and hit rules

- Enemies in the ougi path at cast time are stunned immediately
- Enemies who walk into the active ougi path after cast are also stunned
- Ougi stun blocks all actions for enemies caught in the path
- If the ougi kills an enemy, match ending logic waits for the ougi animation
  to fully complete before triggering death/victory screens

---

## Simultaneous ougi rule

- If both players cast an ougi at approximately the same time:
  both animations play in full
  neither player takes damage from the other's ougi

---

## Animation and sound rules

- Ougi animations and sounds must come from SWF files whenever possible
- Do NOT guess animation layers, timing, or sound files — extract from SWF
- Ougi sound sync must be tied to the correct SWF-derived sound file
- Ougi range/path must match the SWF-derived or screenshot-derived layout

---

## Loading rule

- Load ONLY the selected weapon's ougis when a match starts
- Do NOT load all ougis in the game at match start
- Ougi assets are loaded per-weapon on demand

---

## Reference weapon

Seigaiha has been polished and is the reference implementation.
All other weapons must replicate the Seigaiha pattern for:
- Animation layering
- Sound sync
- Range/path behavior
- Stun application timing
- Post-ougi immunity window

When adding or fixing a weapon's ougi, compare against Seigaiha first.

---

## Ougi data structure (per weapon)

Each weapon defines:
- Weapon ID
- Per-tier ougi entries, each containing:
  - Animation SWF source path
  - Sound SWF source path
  - Range/path definition
  - Damage value
  - Stun duration
  - Immunity window duration after cast
  - Any special behavior flags
