# Nindou 3 - Asset Export Guide

## Goal

Avatar customization layers must share one coordinate system. Body, hair, eyes,
clothing, hats, accessories, and future layers should stack without CSS
guesswork.

## Standard Avatar Canvas

Runtime export size:

- `64px x 76px`
- Transparent PNG
- Same canvas size for every front-facing avatar layer
- Origin is the top-left of the full avatar canvas

Recommended master template sizes:

- `128px x 152px` for 2x authoring
- `256px x 304px` for 4x authoring

Do not use a square master canvas unless the runtime avatar canvas also becomes
square. The current avatar frame is taller than it is wide, so master files
should preserve the `64:76` aspect ratio.

## Layer Export Contract

Every layer must be exported on the full shared canvas:

- Body: draw the bare Nindou body in its final position on the full canvas
- Hair: draw hair relative to the body on the same full canvas
- Eyes: draw eyes relative to the body on the same full canvas
- Clothing: draw clothing relative to the body on the same full canvas
- Hats/accessories: draw relative to the body on the same full canvas

Never tightly crop individual layers for app use. A tightly cropped hair or
clothing PNG loses the original placement data and forces fragile runtime
offsets.

## Export Rules

- Export from SWF data under `exports\nindou_exports\assets\nin\`
- Keep transparent pixels around the artwork
- Keep every layer the exact same pixel dimensions
- Do not trim transparent bounds
- Do not rescale individual layers independently
- Do not use battle sprites for outside-battle avatar exports

## Runtime Rule

When assets follow this guide, CSS should be simple:

```css
.base-avatar-layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 64px;
  height: 76px;
}
```

The current prototype still has some tightly cropped legacy extracted PNGs. For
those only, use the temporary `avatarOffsets` configuration in `game.en.js` to
restore placement until the assets are re-exported on the shared canvas.
