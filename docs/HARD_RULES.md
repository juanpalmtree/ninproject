# Nindou 3 - Hard Rules

These rules are absolute. They apply to every agent, every session, every file.
Do not break them for any reason. Do not ask for exceptions. If a change would
violate one of these rules, stop and flag it instead.

---

## Visual rules

- NEVER use the blue/grey battle ninja outfit outside of battle screens.
  Battle sprites are only valid inside an active match.
  Character select, create character, profile, common room, and map all use
  the bare/customizable Nindou body.

- NEVER use the old deleted user-provided PNG as a base avatar.
  Always use SWFs from: exports\nindou_exports\assets\nin\

- The world map bottom icon bar has been removed. Do not re-add it.

---

## Asset rules

- NEVER guess animation layers, sound files, or timing when SWF data exists.
  Extract from the SWF. If you cannot extract it, say so and stop.

- NEVER load all ougis at match start.
  Load only the selected weapon's ougis when the match begins.

---

## Combat rules

- NEVER let a victory screen or death animation interrupt an active ougi animation.
  The ougi must fully complete before match ending logic runs.

- NEVER grant Z/special bar from casting an ougi.
  Ougi consumes the entire Z bar. It never gives Z back.

- NEVER break working ougi/weapon code while fixing unrelated UI or other systems.
  If a change touches weapon or ougi code, test it against Seigaiha first.
  Seigaiha is the reference pattern for all weapons.

---

## Code rules

- NEVER blindly edit game.en.js as a catch-all.
  New work goes in the correct agent file or layer. game.en.js is refactored
  gradually, not grown larger.

- ALL code, comments, documentation, and specs must be written in English.

---

## Session rules

- Read AGENT_OWNERSHIP.md before starting any task.
  Confirm which agent owns the files you are about to touch.

- If a task would require editing files owned by a different agent,
  stop and flag the conflict instead of editing across boundaries.
