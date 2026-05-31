const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { contextValue, createGameContext, loadCombatRules, loadScripts } = require("./helpers/script-loader");

const directions = ["right", "left", "up", "down"];

test("blue team Ougi body frames exist for every blue-body Ougi", () => {
  const context = loadCombatRules();
  const ougiDefinitions = contextValue(context, "ougiDefinitions");
  const missing = [];

  for (const [weaponKey, slots] of Object.entries(ougiDefinitions)) {
    for (const [slot, definition] of Object.entries(slots)) {
      const requiredLayers = definition.blueBody ? ["body", "body_blue"] : ["body"];
      for (const layer of requiredLayers) {
        for (const direction of directions) {
          const directory = path.join(__dirname, "..", "assets", "ougi", weaponKey, slot, layer, direction);
          const frameCount = fs.existsSync(directory)
            ? fs.readdirSync(directory).filter((name) => name.endsWith(".png")).length
            : 0;
          if (frameCount !== definition.frameCount) {
            missing.push(`${weaponKey}/${slot}/${layer}/${direction}: expected ${definition.frameCount}, got ${frameCount}`);
          }
        }
      }
      for (const direction of directions) {
        const directory = path.join(__dirname, "..", "assets", "ougi", weaponKey, slot, "fx", direction);
        const frameCount = fs.existsSync(directory)
          ? fs.readdirSync(directory).filter((name) => name.endsWith(".png")).length
          : 0;
        if (frameCount > 0 && frameCount !== definition.frameCount) {
          missing.push(`${weaponKey}/${slot}/fx/${direction}: expected ${definition.frameCount}, got ${frameCount}`);
        }
      }
      if (weaponKey === "weapon20" && [2, 3].includes(Number(slot))) {
        for (const direction of directions) {
          const directory = path.join(__dirname, "..", "assets", "ougi", weaponKey, slot, direction);
          const frameCount = fs.existsSync(directory)
            ? fs.readdirSync(directory).filter((name) => name.endsWith(".png")).length
            : 0;
          if (frameCount !== definition.frameCount) {
            missing.push(`${weaponKey}/${slot}/${direction}: expected composite ${definition.frameCount}, got ${frameCount}`);
          }
        }
      }
    }
  }

  assert.deepEqual(missing, []);
});

test("Ougi sound keys resolve to existing files", () => {
  const context = createGameContext({
    Audio: class {
      constructor(src) {
        this.src = src;
      }
    },
  });
  loadScripts(context, ["scripts/data/assets.js", "scripts/data/weapons.en.js"]);
  const soundSources = contextValue(context, "soundSources");
  const ougiDefinitions = contextValue(context, "ougiDefinitions");
  const missing = [];

  for (const [weaponKey, slots] of Object.entries(ougiDefinitions)) {
    for (const [slot, definition] of Object.entries(slots)) {
      const keys = [
        definition.soundKey,
        definition.endSoundKey,
        ...(definition.soundKeys || []),
        ...(definition.soundEvents || []).map((event) => event.key),
      ].filter(Boolean);
      for (const key of keys) {
        const source = soundSources[key];
        const absolute = source ? path.join(__dirname, "..", source) : "";
        if (!source || !fs.existsSync(absolute)) missing.push(`${weaponKey}/${slot}: ${key}`);
      }
    }
  }

  assert.deepEqual(missing, []);
});

test("player death and match-end SWF frame sources exist", () => {
  const context = createGameContext({
    Audio: class {
      constructor(src) {
        this.src = src;
      }
    },
  });
  loadScripts(context, ["scripts/data/assets.js"]);
  const deathFallFrameSources = contextValue(context, "deathFallFrameSources");
  const matchEndFrameSources = contextValue(context, "matchEndFrameSources");
  const missing = [];

  for (const [team, directionsByTeam] of Object.entries(deathFallFrameSources)) {
    for (const [direction, sources] of Object.entries(directionsByTeam)) {
      sources.forEach((source, index) => {
        if (!fs.existsSync(path.join(__dirname, "..", source))) {
          missing.push(`death ${team}/${direction}/${index + 1}: ${source}`);
        }
      });
    }
  }

  for (const [team, outcomes] of Object.entries(matchEndFrameSources)) {
    for (const [outcome, sources] of Object.entries(outcomes)) {
      sources.forEach((source, index) => {
        if (!fs.existsSync(path.join(__dirname, "..", source))) {
          missing.push(`match-end ${team}/${outcome}/${index + 1}: ${source}`);
        }
      });
    }
  }

  assert.deepEqual(missing, []);
});
