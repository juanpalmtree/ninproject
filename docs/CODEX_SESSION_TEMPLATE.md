# Codex Session Template

Copy the block below and paste it at the start of every Codex session.
Fill in the three fields marked with [brackets], then delete this header.

---

## Session context - paste this at the start of every session

Project: Nindou 3 prototype (single-player)
Docs: docs/HARD_RULES.md, docs/AGENT_OWNERSHIP.md

Active agent this session: [AGENT NAME - e.g. UI Flow Agent]
Task this session: [ONE SENTENCE - e.g. Fix character select to show bare body instead of battle sprite]
Files I expect to touch: [LIST FILES - e.g. src/screens/characterSelect.js, assets/ui/avatar/]

Before writing any code:
- Read HARD_RULES.md. All rules apply. No exceptions.
- Read AGENT_OWNERSHIP.md. Only touch files owned by the active agent above.
- If a fix requires touching another agent's files, stop and tell me instead of doing it.

Architecture reminder:
- Frontend: UI screens, map, lobby, canvas rendering, character creator, animation, sound
- Game Core: battle rules, movement, combat, weapons, jutsus, ougis, targeting, match lifecycle
- Backend/Data: profiles, saves, unlocks, loadouts, EXP, ranks

Key hard rules (full list in HARD_RULES.md):
- NEVER show battle ninja outfit outside of a match
- NEVER guess SWF animation/sound data - extract from the SWF
- NEVER load all ougis at match start - only load selected weapon ougis
- NEVER interrupt ougi animation with victory/death logic
- NEVER grant Z from casting an ougi
- NEVER blindly edit game.en.js - work in the correct agent file
- Seigaiha is the reference pattern for all weapon/ougi work
- All code and docs must be in English

---

## Agent quick-reference

| Agent            | Core responsibility                              |
|------------------|--------------------------------------------------|
| UI Flow          | Screens, navigation, routing                     |
| Avatar           | Body/hair/dress layers, character creator        |
| Jutsu            | Jutsu data, targeting, cost, hit/miss, stun      |
| Ougi             | Ougi data, SWF animation, range, sound sync      |
| Weapon           | Normal attacks, weapon stats, animation anchors  |
| Core Systems     | Match lifecycle, death/victory, timing, HUD      |
| Progression      | EXP, ranks, unlocks, inventory, loadout          |

---

## How to use this template efficiently

- One agent per session. Do not mix agents in the same session.
- One task per session. A focused task produces less token waste than a vague one.
- If Codex starts touching files outside the active agent's ownership, stop it
  and start a new session with the correct agent set.
- If you finish the task early, end the session and start a fresh one for the
  next task rather than adding scope mid-session.
