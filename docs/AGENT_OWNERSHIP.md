# Nindou 3 - Agent Ownership

Each agent owns specific domains. Before writing any code, confirm which agent
owns the files you are touching. Do not edit across agent boundaries without
explicit instruction.

---

## UI Flow Agent

Owns:
- Login screen (name entry, continue button)
- Character select screen (character list, new character button)
- Create character screen (layout, starter appearance, future customization slots)
- World map screen (Nekomata layout, clickable locations, return button)
- Common room screen (placeholder structure, future social UI)
- Pre-game lobby UI (team slots, battle setup panel, visual structure)
- Match transition screens (enter/exit match flow)
- All routing logic between screens

Does not touch:
- Avatar body/hair/dress layering logic (Avatar Agent)
- In-match battle canvas or HUD (Core Systems Agent)
- Jutsu, ougi, or weapon panels inside the match
- EXP, rank, or unlock logic (Progression Agent)
- Profile or loadout data reads/writes (Backend/Data layer)

Hard rule:
- Create character and character select must NEVER show the battle ninja outfit.

---

## Avatar Agent

Owns:
- Base body sprite (bare/customizable Nindou body)
- Hair layer rendering and alignment
- Dress/clothing layer rendering and alignment
- Eyes, hats, accessories (future layers)
- Character creator visual logic
- Profile visuals
- Outside-battle sprite rules

SWF source: exports\nindou_exports\assets\nin\
Subfolders: body, hair, dresses, hats, accessories, omake, walkingFx, wallpaper

Current extracted assets:
- assets\ui\avatar\nin\body-front.png
- assets\ui\avatar\nin\hair-front-default.png
- assets\ui\avatar\nin\dress-front-default.png

Current front-facing CSS formula (do not change without explicit instruction):
- Body: centered, width 44px, top 15px
- Hair: centered, width 57px, top 0
- Dress: centered, width 20px, top 44px

Does not touch:
- Battle sprites (Core Systems Agent)
- Screen layout or navigation (UI Flow Agent)

---

## Jutsu Agent

Owns:
- Jutsu data definitions (name, series, cost, tier, hit chance, damage)
- Jutsu targeting logic
- Hit/miss roll per target
- Z and SP cost rules for each jutsu series
- Stun timing after jutsu hit
- Jutsu tier behavior rules
- Special case jutsus: Butsumetsu, Death, Seven

Jutsu series: Restoring, Attacking, Assisting, Special, Transformation, Summon

Key rules:
- Attack jutsus target every enemy independently (each gets its own hit roll)
- Restoring/assisting/transformation use SP (~25% cost)
- Attack/summon jutsus consume Z tiers
- Stun is ~2 seconds after hit
- Miss animation should be fast
- Correct name is Thunderbolt (not Thounderbolt)

Does not touch:
- Ougi logic (Ougi Agent)
- Weapon stats (Weapon Agent)
- UI rendering of jutsu panels (UI Flow Agent)

---

## Ougi Agent

Owns:
- Weapon ougi data (per weapon, per tier)
- SWF extraction for ougi animations and sounds
- Ougi animation timing and layers
- Ougi range and path logic
- Ougi stun/lock behavior
- Ougi sound sync

Key rules:
- Ougi consumes the entire Z bar, never grants Z
- Caster cannot move during ougi animation
- Caster is immune during ougi and briefly after
- Enemies in ougi path at cast time are stunned immediately
- Enemies who walk into active ougi path are also stunned
- If both players cast ougi simultaneously, both animations play, no damage
- Victory/death logic must wait for ougi animation to fully complete
- Load only selected weapon ougis at match start, not all ougis
- Seigaiha is the reference pattern — replicate it for other weapons

Does not touch:
- Jutsu logic (Jutsu Agent)
- Weapon normal attack stats (Weapon Agent)
- Screen transitions (UI Flow Agent)

---

## Weapon Agent

Owns:
- Normal weapon attack behavior
- Weapon stats (damage, range, path)
- Hand and weapon animation anchoring
- Weapon range/path definitions

Does not touch:
- Ougi animations/sounds (Ougi Agent)
- Jutsu logic (Jutsu Agent)

---

## Core Systems Agent

Owns:
- Match lifecycle (start, mid-match, end conditions)
- Death and victory logic
- Timing system
- Lock and stun shared state
- Asset loading coordination
- Shared match state
- In-match HUD

Does not touch:
- Specific jutsu or ougi data (those agents own their data)
- Screen layouts outside the match (UI Flow Agent)

---

## Progression Agent

Owns:
- EXP and leveling
- Ranks and classes (display and logic)
- Unlock gates (what rank/class unlocks what)
- Inventory
- Gold
- Loadout system (per player, outside match)

Display locations for rank/class:
- Player profile
- Match bottom-left near HP/SP bar

Does not touch:
- Avatar visuals (Avatar Agent)
- Match logic (Core Systems Agent)
