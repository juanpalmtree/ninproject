# Animation Rendering Guardrails

When a weapon, Ougi, or charge animation reaches a known-good state, treat it as protected.

## Rules

- Do not tune a known-good weapon by changing broad shared rendering behavior.
- Add or update a per-weapon render profile instead of adding scattered `weaponKey` checks.
- Keep normal weapon attacks, Ougi body/effect/fx layers, and SP charge visibility as separate concerns.
- Before polishing another weapon, verify protected cases still render correctly:
  - Seigaiha Ougi 2 keeps all body/fx elements.
  - Fuma Shuriken normal attack starts in front of the player.
  - SP charging effect appears while holding a controllable player.
- When the user confirms a visual state is perfect, checkpoint it before touching nearby animation code.

## Current Protected Cases

- Seigaiha (`weapon20`) Ougi rendering uses exact frames and centered drawing from its render profile.
- Fuma Shuriken (`weapon10`) normal attack uses visible-frame anchoring because its exported PNGs contain transparent padding.
- Fuma Shuriken (`weapon10`) Ougi 3 has a direction transform profile because its exported directional body frames are duplicated.
