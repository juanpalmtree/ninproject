# Nindou 3 - Jutsu Spec

## Jutsu series

| Series         | Resource | Targets        | Notes                                      |
|----------------|----------|----------------|--------------------------------------------|
| Attacking      | Z        | All enemies    | Each enemy gets independent hit roll       |
| Summon         | Z        | Varies         | Consume Z tiers, behave like attack series |
| Restoring      | SP       | Allies/self    | Healing, multiple jutsus allowed           |
| Assisting      | SP       | Allies         | Buffs — refresh duration on re-use         |
| Transformation | SP       | Self           | Replaces moveset temporarily               |
| Special        | Mixed    | Varies         | Tuned individually per jutsu               |

---

## Cost rules

### Attack and Summon jutsus
- Require at least 1 Z tier to cast
- Consume all available Z tiers up to the jutsu's max tier
- No specific tier requirement beyond having at least one

### Restoring, Assisting, Transformation jutsus
- Use SP, not Z
- Approximate cost: ~25% SP (may be reduced later)

### Special jutsus
- Mixed: some use SP, some use Z, some use neither
- Each special jutsu has its own defined behavior

---

## Attack jutsu rules

- Target every enemy on the map
- Each enemy gets its own independent hit roll
- Tier improves hit chance
- Early attack jutsus do NOT increase damage by tier
- Higher-level unlocked jutsus deal more base damage (not via tier)
- If hit: target is locked during jutsu animation → takes damage → stunned
- If miss: target is unaffected and can keep playing
- Miss animation should be fast (previous version was too slow)
- Stun duration after hit: ~2 seconds

### Hit chance by tier (reference values — tunable)

Early tuning:
- Tier 1: ~30% chance to hit each enemy
- Tier 2: ~50% chance to hit each enemy
- Tier 3: ~65% chance to hit each enemy
- Tier 4: ~80% chance to hit each enemy

Later tuning (discussed):
- Tier 1-2: ~20% chance to hit every enemy
- Tier 3-4: ~90% chance to hit every enemy
- Each target roll is still independent

---

## Attack jutsu list (Attacking Series)

| Name        | Notes                        |
|-------------|------------------------------|
| Lightning   |                              |
| FireBall    |                              |
| AirBlast    |                              |
| Explode     |                              |
| Freeze      |                              |
| Thunderbolt | Correct spelling (not Thounderbolt) |
| Storm       |                              |
| IceArrow    |                              |

---

## Special case jutsus

### Butsumetsu / Suicide
- Kills the caster
- Kills enemies in a square radius (~two circles worth) around the caster
- Enemies in range die as soon as the jutsu is cast
- Caster dies shortly after enemies are killed
- Exception to the "cast is guaranteed" rule — caster dies

### Death
- Percent chance to instant-kill a target enemy player
- For Seven's Death roll: affects only 4 random players on the map
  (random team/enemy included, not just enemies)

### Seven
Rolls one of seven jutsus randomly:
1. Heat — buffs your team
2. Steel — buffs your team
3. Ice Arrow — hits enemy team
4. Thunder — hits enemy team
5. Death — affects 4 random players on the map (any team)
6. Gama — transforms everyone on the map into fire toad (both teams)
7. Holy Light — restores full HP and SP to your team

Seven must cast the rolled jutsu as a real jutsu — including the rolled
jutsu's animation and effects. It does not silently apply effects.

---

## Transformation jutsu rules

- Replaces the player's normal moveset for the duration
- Fire toad: player can move freely with endless SP for the duration
- Other transformations do not insta-kill on contact
- All transformations share a common lifecycle system
- Duration is defined per transformation jutsu

---

## Healing and buff rules

### Restoring
- Multiple healing jutsus are allowed in a loadout
- Uses SP
- Stronger healing unlocks with progression, not Z tier

### Assisting (buffs)
- Re-using a buff refreshes its duration only
- Buffs do not stack power unless explicitly designed to do so
- Stun refresh: applying stun to an already-stunned target refreshes duration

---

## Jutsu unlock rules

- Jutsus unlock by rank, class, and progression
- Testing phase may temporarily grant full access to all jutsus
- Unlock gates are defined and enforced by the Progression Agent
