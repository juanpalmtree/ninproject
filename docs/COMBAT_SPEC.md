# Nindou 3 - Combat Spec

## Match structure

- Match begins after Pre-Game Lobby setup
- AI opponent (Yashao) does not move or act for the first 5 seconds
- AI can be affected by jutsus like a player
- Match ends when a player dies, victory condition is met, or time runs out
- If an ougi is active when the match ends, the ending waits for the ougi
  animation to fully complete before showing victory/death screens

---

## Resources

### HP
- Player health. Reaching 0 triggers death.

### SP (Special Points)
- Used by restoring, assisting, and transformation jutsus
- Approximate cost: ~25% SP per use (may be tuned later)
- Regenerates over time or via healing jutsus

### Z bar (Special/Ougi bar)
- Divided into tiers
- Fills during battle
- Consumed by attack/summon jutsus (all available tiers up to jutsu max)
- Consumed entirely by ougi (never grants Z back)
- Ougi must NEVER grant Z under any circumstance

---

## Movement

- Players move on a 2D map
- Caster cannot move during an ougi animation
- Stun blocks all movement and actions for its duration
- Transformation jutsus may change movement behavior (e.g. fire toad has
  free movement with endless SP for the duration)

---

## Death and victory

- Death animation must play fully — do not freeze or skip it
- Victory animation must play fully — do not freeze or skip it
- If an ougi kills the enemy, match ending logic waits for ougi animation
  to complete before triggering death/victory animations
- If both players cast ougi simultaneously, both animations play and
  neither player takes damage from the other's ougi

---

## Immunity

- Caster is immune to jutsu damage/effects during an ougi and briefly after
- Immune player: ougi animation still plays visually, but the immune player
  does not take damage or receive status effects
- Immunity does not prevent visual effects from rendering

---

## Stun

- Stun duration: ~2 seconds
- Stun blocks all actions (movement, jutsu, ougi, items)
- Stun from jutsu: applied after jutsu animation/hit completes
- Stun from ougi: applied immediately to enemies in the path at cast time
- Enemies who walk into an active ougi path after cast are also stunned
- Stun from buffs: refreshes duration on re-application, does not stack power
- During jutsu cast animation there is a short window where enemies can still
  act — once the cast is confirmed it is guaranteed (except Butsumetsu)

---

## AI rules

- Yashao AI waits 5 seconds before engaging
- AI uses jutsus and weapons like a player
- AI can be hit by jutsus and ougis
- Boss AI behavior is a future feature — not in current spec
