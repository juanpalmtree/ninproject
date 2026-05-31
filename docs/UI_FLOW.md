# Nindou 3 - UI Flow

## Screen list and status

| Screen           | Status                  | Owner         |
|------------------|-------------------------|---------------|
| Login            | Exists                  | UI Flow Agent |
| Character Select | Exists                  | UI Flow Agent |
| Create Character | Exists (needs cleanup)  | UI Flow Agent |
| World Map        | Exists                  | UI Flow Agent |
| Common Room      | Placeholder             | UI Flow Agent |
| Pre-Game Lobby   | Exists                  | UI Flow Agent |
| Match            | Exists (working)        | Core Systems  |
| Rewards          | Planned                 | UI Flow Agent |

---

## Screen specs

### Login
- Text input for account name or display name
- Continue button — navigates to Character Select
- No password required in current prototype

### Character Select
- Displays list of existing characters
- Each character shown with outside-battle avatar (bare body, not battle sprite)
- Selecting a character navigates to World Map
- "New character" button navigates to Create Character

### Create Character
- Shows bare Nindou body with starter hair (2031000301) and starter dress (2051000204)
- Does NOT show battle ninja outfit at any point
- Slots for: hair, eyes, dress, hat, accessories (most locked until progression)
- Confirm button creates character and navigates to World Map

### World Map
- Uses Nekomata-style map layout
- All locations rendered and clickable
- IGA is the only active location
  - Clicking IGA navigates to Village Hall
- All other locations are visual placeholders (display name, no navigation)
- Bottom icon bar is REMOVED — do not restore it
- Return button navigates back to Character Select

### Common Room
- Intermediate screen between World Map and Battle Lobby
- Currently a visual placeholder
- Future: social area, player list, waiting for battles

### Pre-Game Lobby
- Team slot UI — configure player slots
- Loadout configuration (weapon, jutsu selection)
- Start match button triggers match initialization
- Visual design should move toward Nindou 3 style over time

### Match
- Owned by Core Systems Agent for logic
- UI Flow Agent owns: enter/exit transitions only
- In-match HUD owned by Core Systems Agent

### Rewards / Progression screen
- Displays EXP earned, level/rank changes, items unlocked
- Continue button returns to World Map

---

## Navigation map

| From              | Action           | To                  |
|-------------------|------------------|---------------------|
| Login             | Continue         | Character Select    |
| Character Select  | Select char      | World Map           |
| Character Select  | New character    | Create Character    |
| Create Character  | Confirm          | World Map           |
| World Map         | Click IGA        | Village Hall        |
| World Map         | Return           | Character Select    |
| Common Room       | Enter battle     | Pre-Game Lobby      |
| Pre-Game Lobby    | Start match      | Match               |
| Match             | Match ends       | Rewards             |
| Rewards           | Continue         | World Map           |

---

## UI hard rules

- Battle ninja outfit is NEVER rendered outside of the match screen
- World map bottom icon bar is REMOVED — do not restore it
- IGA is the only active location — all others are placeholder only
- Create character must never default to battle sprite body
