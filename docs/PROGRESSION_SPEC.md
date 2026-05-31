# Nindou 3 - Progression Spec

## Overview

Progression tracks a player's growth outside of battle. It gates what can be
equipped, which jutsus are available, and what cosmetics are unlocked.

---

## EXP and levels

- Players earn EXP at the end of each match
- EXP accumulates toward level thresholds
- Leveling up may grant rank advancement, unlock points, or new items
- EXP and level data are stored in the player profile (Backend/Data layer)

---

## Ranks and classes

- Ranks and classes are displayed on:
  - Player profile screen
  - Match bottom-left area, near HP/SP bars
- Rank/class names sourced from provided screenshot (Mandarin)
- Translation and extraction of rank/class names is a pending task
- Ranks and classes unlock access to higher-tier jutsus, weapons, and cosmetics

---

## Unlock gates

- Jutsus unlock by rank, class, or specific progression milestones
- Weapons unlock by rank, class, or specific milestones
- Cosmetics (hair, dresses, hats, accessories) unlock by rank or gold
- Testing phase may temporarily bypass all gates to grant full access

---

## Inventory

- Player inventory stores: weapons, jutsu scrolls, cosmetic items, consumables
- Gold is the in-game currency
- Items are earned through match rewards or future shop systems

---

## Loadout system

- One loadout per character
- Configured in the Pre-Game Lobby before a match
- Loadout includes: equipped weapon, selected jutsus
- Loadout is saved to the player profile
- Gates enforce what can be equipped based on current rank/class/unlocks

---

## What the Progression Agent does NOT own

- Avatar visual rendering (Avatar Agent)
- Match logic or combat (Core Systems Agent)
- UI screen layouts (UI Flow Agent)
- Actual stat calculations during a match (Core Systems Agent)
