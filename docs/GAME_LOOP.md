# Nindou 3 - Game Loop

## Screen flow

Login → Character Select → [Create Character] → World Map → Common Room → Pre-Game Lobby → Match → Rewards / Progression

---

## Screen definitions

### Login
- Player enters account name or display name
- Continue button navigates to Character Select
- No password required in current prototype

### Character Select
- Displays existing characters for the account
- Selecting a character navigates to World Map
- "New character" button navigates to Create Character

### Create Character
- Shows bare Nindou body with starter hair and starter dress
- Eventually allows selecting hair, eyes, clothing, hats, accessories
- Does NOT show blue/grey battle ninja outfit at any point
- Confirming creation adds character and navigates to World Map

### World Map
- Uses Nekomata-style map layout
- All locations are visible and clickable
- IGA is the only active location currently
  - Clicking IGA opens the Village Hall room browser
- All other locations are visual placeholders (no action yet)
- Bottom icon bar has been removed from the map image — do not restore it
- Return button navigates back to Character Select

### Common Room
- Intermediate social/waiting area between World Map and Battle Lobby
- Currently exists as a visual placeholder
- Future: social interactions, waiting for matches, seeing other players

### Pre-Game Lobby
- Team slot configuration and battle setup
- Eventually styled to match Nindou 3 lobby visuals
- Loadout is configured here (weapon, jutsus)
- Start match button triggers match initialization

### Match
- Full playable battle
- Uses blue/grey team-colored ninja sprites for all players
- Ends on death, victory, or time condition
- On match end: triggers Rewards / Progression flow

### Rewards / Progression
- Displays EXP gained, level/rank changes, unlocks
- Returns player to World Map after confirmation

---

## Navigation rules

| From              | Action                  | To                  |
|-------------------|-------------------------|---------------------|
| Login             | Continue                | Character Select    |
| Character Select  | Select character        | World Map           |
| Character Select  | New character           | Create Character    |
| Create Character  | Confirm                 | World Map           |
| World Map         | Click IGA               | Village Hall        |
| World Map         | Return                  | Character Select    |
| Common Room       | Enter battle            | Pre-Game Lobby      |
| Pre-Game Lobby    | Start match             | Match               |
| Match             | Match ends              | Rewards             |
| Rewards           | Continue                | World Map           |

---

## State that persists between screens

- Active character (selected on Character Select)
- Loadout (configured in Pre-Game Lobby, saved to profile)
- EXP and rank (updated after match, displayed on profile)

---

## State that resets each match

- HP and SP bars
- Z/special bar
- Active buffs and debuffs
- Transformation state
- Stun state
