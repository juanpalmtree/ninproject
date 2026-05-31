# Nindou 3 - Vision

## What we are building

A Nindou-inspired single-player prototype that moves away from the Nindou 2
structure toward a Nindou 3-style experience. Nindou 2 is the technical
foundation. Nindou 3 provides the visual direction, player identity, maps,
progression, weapons, ougis, and UI flow.

This is not "Nindou 2 offline." It is a new game built on a familiar engine.

---

## Full intended game flow

Login
→ Character Select
→ Create Character (if new)
→ World Map
→ Common Area / Waiting Room
→ Pre-Game Battle Lobby
→ Match
→ Rewards / Progression

The current playable prototype has a working pre-game lobby and match system.
Everything surrounding the match is being expanded to complete the full flow.

---

## Core pillars

**Player identity**
Players have a customizable avatar outside of battle using the bare Nindou body.
Hair, dresses, hats, eyes, and accessories are unlockable and equippable.
The battle outfit (blue/grey ninja sprite) is only visible inside a match.

**Progression**
Players earn EXP, level up, gain ranks and classes, and unlock jutsus, weapons,
and cosmetics through play. Loadouts are configured outside the match.

**Combat**
Turn-based-style match system with weapons, jutsus, and ougis.
Each weapon has per-tier ougis. Jutsus belong to series with defined cost rules.
Combat visuals use team-colored ninja sprites.

**World**
Nekomata-style world map with clickable locations.
IGA is the first active location. Other locations are placeholders for now.
Common room is an intermediate social area between map and battle.

---

## Architecture separation (required)

1. Frontend — UI, screens, map, canvas rendering, animation, sound
2. Game Core — battle rules, combat, weapons, jutsus, ougis, match lifecycle
3. Backend / Data — profiles, saves, unlocks, loadouts, EXP, ranks

Code must be organized by these layers. game.en.js is being gradually
refactored out, not grown larger.

---

## What success looks like

A player can:
1. Log in with a name
2. Select or create a character with a customized appearance
3. Navigate the world map and enter IGA
4. Set up a match in the pre-game lobby
5. Play a full match with working weapons, jutsus, and ougis
6. Return to the map and see updated progression

All systems are owned by a defined agent. All specs live in docs/.
No agent edits outside its boundary without explicit instruction.
