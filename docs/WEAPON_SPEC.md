# Nindou 3 - Weapon Spec

## Overview

Each player equips one weapon from their loadout before a match.
The equipped weapon determines:
- Normal attack behavior (range, path, damage)
- Which ougis are available (per tier)
- Hand and weapon animation anchoring

---

## Weapon data structure

Each weapon defines:
- Weapon ID and name
- Normal attack range and path
- Normal attack damage
- Hand animation anchor points
- Weapon sprite anchor points
- Per-tier ougi reference (see OUGI_SPEC.md)

---

## Normal attack rules

- Normal attacks use the weapon's defined range and path
- Damage is based on weapon stats
- Animation anchoring must keep the weapon visually aligned to the character's hand
- Do not detach weapon sprite from hand anchor during attack animation

---

## Reference weapon

Seigaiha is the reference implementation for weapon + ougi integration.
When adding a new weapon, replicate the Seigaiha pattern.

---

## Weapon unlock and equip rules

- Weapons are unlocked via progression (rank, class, or specific gates)
- One weapon is equipped per loadout
- Loadout is configured in the Pre-Game Lobby
- Weapon selection affects which ougis are loaded at match start

---

## What the Weapon Agent does NOT own

- Ougi animations, sounds, range, and timing (Ougi Agent)
- Jutsu behavior (Jutsu Agent)
- Weapon unlock logic (Progression Agent)
