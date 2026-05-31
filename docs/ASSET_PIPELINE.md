# Nindou 3 - Asset Pipeline

## Source assets

All original Nindou assets come from:
`exports\nindou_exports\assets\`

Character customization SWFs:
`exports\nindou_exports\assets\nin\`

Subfolders:
- `body` — base body
- `hair` — hair styles
- `dresses` — clothing
- `hats` — hats
- `accessories` — accessories
- `omake` — bonus items
- `walkingFx` — walking effects
- `wallpaper` — backgrounds

Key SWFs:
- Base body: `exports\nindou_exports\assets\nin\body\nin_body.swf`
- Starter hair: `exports\nindou_exports\assets\nin\hair\2031000301.swf`
- Starter dress: `exports\nindou_exports\assets\nin\dresses\2051000204.swf`

---

## Extraction rules

- NEVER guess animation layers, sound files, or timing when a SWF exists
- Extract directly from the SWF
- If extraction is not possible, stop and flag it — do not guess

---

## Extracted app assets (current)

Avatar assets extracted from the canonical SWFs and placed in app:
- `assets\nin\body\in_body-front.png`
- `assets\nin\hair\2031000301-front.png`
- `assets\nin\dresses\2051000204-front.png`

These are the active app assets. Do NOT replace them with old deleted PNGs.

---

## Ougi and weapon assets

- Ougi animations and sounds come from SWF files
- Each weapon has its own ougi SWF assets per tier
- Only the selected weapon's ougi assets are loaded at match start
- Do NOT pre-load all ougi assets at match initialization

---

## Adding new assets

When adding a new hair, dress, hat, accessory, or weapon ougi:
1. Locate the SWF in the appropriate subfolder under `exports\nindou_exports\assets\nin\`
2. Extract the needed frames/sounds from the SWF
3. Place extracted files in the correct `assets\` subfolder
4. Register the asset in the relevant agent's data file
5. Do NOT hard-code paths outside of the asset registration files

---

## Asset naming convention

Extracted files should follow the source SWF filename where possible.
Example: `2031000301.swf` → `hair-2031000301-front.png`
