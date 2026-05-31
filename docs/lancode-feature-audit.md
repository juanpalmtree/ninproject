# LanCode Feature Audit

This audit compares our repository with the latest LanCode Nindou 2 web reference cloned on May 19, 2026.

Reference commit:

```text
f2ae23c Add ninjutsu, consumables, and UI updates
```

## Collaboration Rule

Our repo remains the base. We import only missing systems or safety work that supports the Nindou 3 direction.

Default decision order:

1. Keep our behavior when both repos implement the same system.
2. Import LanCode code only when it fills a gap that supports the Nindou 3 prototype.
3. Prefer adapted slices over full-file replacement.
4. Keep LanCode reference clones local-only in `.compare/`.
5. Translate any imported code, docs, comments, and test names to English.

## Current Comparison

| Area | Our Repo | Latest LanCode | Decision |
| --- | --- | --- | --- |
| Core movement and collision | Similar base with our Ougi, jutsu, Yashao, and transformation locks | Similar base with Nindou 2 behavior | Keep ours |
| Jutsu catalog | Larger Nindou 3-style catalog with series, loadout gating, and profile storage | Smaller catalog split into `ninjutsu-definitions.js` | Keep ours; consider a later file split |
| Attack jutsu targeting | Tier-based map-wide rolls per enemy | Soul count picks nearest targets | Keep ours |
| Special jutsu behavior | Custom Seven, Death, Butsumetsu, and Fire Toad behavior | Simpler special routing | Keep ours |
| Weapons | Weapons 1-20 with English names and Ougi data | Smaller set plus weapon44 and weapon106 | Keep ours; study weapon44/106 later |
| Ougis | Expanded Nindou 3-oriented Ougi assets, ranges, stun, and immunity rules | Less Ougi coverage | Keep ours |
| Rule modes | English Nindou 3, modified Nindou 2, and original Nindou 2 rule profile support | Similar profiles plus an `n3` placeholder | Keep ours |
| UI localization | English-first UI and docs | Bilingual UI layer with source-language strings | Do not import directly |
| Tests | No committed tests before this audit | Node test coverage for grid, combat, rule modes, jutsu, and weapon timing | Import/adapt test infrastructure |

## Import Now

- `package.json` safety scripts for `check`, `test`, and `verify`.
- English Node tests adapted to our current weapon, grid, and rule-mode behavior.
- `.gitignore` entries for local comparison and scratch folders.
- Explicit `n3` rule mode that preserves our current tuned behavior as the default.

## Study Later

- LanCode's `ninjutsu-definitions.js` split, if our `game.en.js` jutsu catalog becomes too large.
- LanCode's `locales.js` structure, only if we decide to support multiple languages again.
- Weapon44 and weapon106, if they map to weapons we want in the Nindou 3 roadmap.
- Their test helper patterns for future browser or Playwright smoke tests.

## Do Not Import Directly

- Full `game.js`, `index.html`, or `style.css` replacement.
- Source-language labels/comments without translation.
- Their nearest-target attack jutsu behavior, because our tier-based map-wide attack behavior is intentional.
- Their generic special jutsu handler for Death, Seven, or Butsumetsu, because those now have custom behavior in our repo.
