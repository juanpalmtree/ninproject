# Nindou 3 - Avatar Spec

## Two visual systems — never mix them

### Outside battle (everywhere except inside a match)
- Uses bare/customizable Nindou body
- Active in: character select, create character, profile, common room, world map
- Layers: base body + dress + hair + (future: eyes, hats, accessories)

### Inside battle (match only)
- Uses blue/grey team-colored ninja sprites
- Active in: match canvas only
- Never shown in character select, create character, or any outside-battle screen

---

## SWF source

All avatar assets come from:
`exports\nindou_exports\assets\nin\`

Subfolders:
- `body` — base body SWF
- `hair` — hair style SWFs
- `dresses` — clothing/dress SWFs
- `hats` — hat SWFs
- `accessories` — accessory SWFs
- `omake` — extra/bonus items
- `walkingFx` — walking effect SWFs
- `wallpaper` — background SWFs

Base body SWF: `exports\nindou_exports\assets\nin\body\nin_body.swf`
Starter hair SWF: `exports\nindou_exports\assets\nin\hair\2031000301.swf`
Starter dress SWF: `exports\nindou_exports\assets\nin\dresses\2051000204.swf`

---

## Extracted app assets (current)

`assets\ui\avatar\nin\body-front.png`
`assets\ui\avatar\nin\hair-front-default.png`
`assets\ui\avatar\nin\dress-front-default.png`

These were exported from the SWFs and copied into app assets.
Do NOT use any old deleted user-provided PNGs.

Current app-facing extracted assets:

`assets\nin\body\in_body-front.png`
`assets\nin\hair\2031000301-front.png`
`assets\nin\dresses\2051000204-front.png`

These are extracted from:

`exports\nindou_exports\assets\nin\body\nin_body.swf`
`exports\nindou_exports\assets\nin\hair\2031000301.swf`
`exports\nindou_exports\assets\nin\dresses\2051000204.swf`

---

## Layer rendering order (front-facing)

Render layers bottom to top:
1. Base body
2. Dress/clothing
3. Hair
4. (Future) Eyes
5. (Future) Hats
6. (Future) Accessories

---

## CSS alignment formula (front-facing)

Avatar rendering has two supported paths:

1. Preferred: shared-canvas exports, documented in `docs\ASSET_EXPORT_GUIDE.md`
2. Temporary: cropped legacy PNGs positioned by `avatarOffsets` in `game.en.js`

The parent avatar frame is `64px x 76px`, scaled by `--avatar-scale`.
Do not stretch tightly cropped layers to fill this frame. Until every avatar
asset is re-exported on the shared canvas, each cropped layer must use explicit
data-driven `top`, `left`, `width`, and `height` values from `avatarOffsets`.

---

## Character creator rules

- Player starts from bare body with starter hair and starter dress
- Starter hair: 2031000301.swf
- Starter dress: 2051000204.swf
- Eventually: player can select from unlocked hair, eyes, dresses, hats, accessories
- Do NOT show blue/grey battle ninja outfit in the character creator at any point
- Unlockable items are gated by progression (Progression Agent defines gates)

---

## Avatar display locations

| Screen           | Avatar type          |
|------------------|----------------------|
| Character select | Bare/customizable    |
| Create character | Bare/customizable    |
| Profile          | Bare/customizable    |
| Common room      | Bare/customizable    |
| World map        | Bare/customizable    |
| Match (battle)   | Battle ninja sprite  |
