# Jutsu Combat Design

This document captures the current jutsu combat decisions. It is a design target for future implementation; not every rule below exists in code yet.

## Core Direction

- Jutsus use a per-profile loadout system.
- Loadouts are edited outside the match, primarily from the room/profile flow.
- Jutsu unlocks are gated by level, rank, class, and branch progression.
- Progression gates affect what can be equipped, not generic power scaling for every jutsu.
- Locked jutsus should remain visible in the editor but disabled.
- Unimplemented jutsus should also be visible but unequippable.
- Runtime code can keep the existing `ninju` terminology for now; new design data should use explicit category metadata.

## Series

The jutsu catalog is organized by the button reference image at `assets/ninju/buttons/jutsus_english.png`.

### Restoring Series

- Uses SP, not the Z/special bar.
- Multiple restoring jutsus may be equipped at the same time.
- Healing can be flat or percentage based per jutsu.
- Stronger healing comes from unlocking stronger jutsus through progression.

Current reference examples:

- HealBall
- HealLight
- HolyLight

### Attacking Series

- Uses the Z/special bar.
- Requires at least 1 Z tier to cast.
- Consumes all current Z/special charge on cast.
- Tier controls hit chance and coverage, not damage.
- Damage is fixed per jutsu and mostly increases by unlock progression.
- Attack jutsus lock onto eligible enemies; they do not use weapon-like paths or obstacle checks.
- Attack jutsus are player-only for the first implementation.

Confirmed attack-series jutsus:

- Lightning
- FireBall
- AirBlast
- Explode
- Freeze
- Thunderbolt
- Storm
- IceArrow

Note: `Thounderbolt` in `scripts/data/progression.en.js` is a typo and should become `Thunderbolt`.

### Assisting Series

- Uses SP.
- Buffs are limited-stack by category.
- Defensive, offensive, movement, and utility buffs may coexist.
- Two buffs in the same category replace or refresh each other.
- Recasting an active buff refreshes duration only.

### Special Series

- Each special jutsu should be modeled as a custom rule.
- A special jutsu may use SP, Z/special, neither, or a custom resource depending on behavior.
- Specials should declare their own targeting, resource, cast behavior, and effect hook.
- Koban/dart-like behavior belongs here.

### Transformation Series

- Uses SP.
- Transformations share a lifecycle:
  `pay SP -> cast -> transform -> unlimited SP during transform -> expire -> return to normal form with exit SP`.
- Transformations replace the normal moveset.
- While transformed, the player cannot use normal jutsus, items, or Ougi.
- Fire Toad is one transformation example; other transformations should not necessarily insta-kill.

### Summon Series

- Uses the Z/special bar.
- Requires at least 1 Z tier to cast.
- Consumes current Z/special charge.
- Summons can reuse tier tables, but each summon defines its own resolution.
- Summons are not all damage jutsus.
- Probability-based effects such as Death should be tuned per summon.

## Attack-Series Resolution

Attack-series jutsus use a global-lock roll followed by per-target fallback rolls.

Flow:

1. Caster presses the loadout button.
2. Current Z tier is snapshotted.
3. Z/special bar is emptied.
4. Cast animation plays using the current simple jutsu flow.
5. At resolution, roll global lock.
6. If global lock succeeds, all eligible enemies are hit.
7. If global lock fails, roll each eligible enemy independently.
8. Successful targets receive target VFX, damage, and stun.

Tier rules should be configurable, but attack jutsus share default values.

Starting default shape:

```js
const attackTierRules = {
  1: { globalHitChance: 0.30, perTargetHitChance: 0.30 },
  2: { globalHitChance: 0.50, perTargetHitChance: 0.50 },
  3: { globalHitChance: 0.80, perTargetHitChance: 0.70 },
  4: { globalHitChance: 0.90, perTargetHitChance: 0.85 },
};
```

The exact numbers are tuning placeholders.

## Attack-Series Damage

Damage should be fixed per jutsu, not increased by Z tier.

Initial simple ladder:

```text
Lightning: 45
FireBall: 55
AirBlast: 65
Explode: 75
Freeze: 85
Thunderbolt: 95
Storm: 110
IceArrow: 125
```

Rules:

- Every successfully hit enemy takes equal damage.
- Attack jutsus can kill.
- Attack-jutsu kills should count normally for kill/reward systems.
- Attack-jutsu damage should not grant Ougi/Z gain, because the cast spent Z.

## Attack-Series Stun

- Successful attack jutsu hits stun the target for 2 seconds by default.
- Stun prevents all new control actions.
- Repeated hits refresh the stun to the full default duration.
- Stun does not stack additively.
- Ougi immunity blocks gameplay effects such as damage and stun.
- Transformed enemies are still valid attack-jutsu targets unless a future explicit immunity says otherwise.

Default:

```js
const attackJutsuStunMs = 2000;
```

## Action Timing

Current implementation remains simple for now:

```text
cast animation -> resolve immediately -> apply target VFX + damage + stun
```

Future timing model to revisit:

```text
cast startup: enemies can still act
hit animation: selected targets are locked, no damage yet
resolution: damage applies, then stun begins
```

Do not refactor into the future timing model yet.

## Counterplay Window

Once a cast is started, it is guaranteed.

During the caster's jutsu cast animation, enemies may still start their own actions if they are free to act:

- jutsu
- item
- Ougi
- other valid actions

If an enemy starts an action during that window, it resolves by its own rules. Overlapping guaranteed actions can both resolve and damage the same unit. Stun affects future actions after resolution; it does not retroactively cancel already-started guaranteed actions.

Butsumetsu/Suicide may become an explicit exception later.

## First Implementation Slice

The first concrete implementation should focus on attack-series jutsus:

- Add or normalize design metadata for all attack-series jutsus.
- Fix `Thounderbolt` to `Thunderbolt`.
- Implement Z-tier consumption for attack-series.
- Apply global-lock then per-target fallback hit logic.
- Apply fixed damage by jutsu.
- Apply 2-second stun on successful hits.
- Do not grant Z/Ougi from attack-jutsu damage.
- Keep AI from using attack-series jutsus for now.
