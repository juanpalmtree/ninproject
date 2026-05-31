const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const repoRoot = path.resolve(__dirname, "..", "..");

function createGameContext(overrides = {}) {
  const context = {
    console,
    Math,
    performance: { now: () => 0 },
    state: { useOriginalMode: false, units: [], objects: [], projectiles: [], attacks: [] },
    setMessage: () => {},
    playSound: () => null,
    canControlUnit: () => false,
    selectedUnit: () => null,
    clearDragState: () => {},
    cancelDragIfPressed: () => {},
    checkVictory: () => {},
    formatDamage: (value) => String(value),
    gainSoul: (unit, steps) => {
      unit.soulSteps = (unit.soulSteps || 0) + steps;
    },
    isHotBloodActive: () => false,
    isUnitDisabled: () => false,
    isFireToadActive: () => false,
    isFireToadTransforming: () => false,
    isAnyUnitCastingNinju: () => false,
    isUnitCastingNinju: () => false,
    isUnitInNinjuGap: () => false,
    isUnitControlLocked: () => false,
    isUnitInvincible: () => false,
    isYashaoHiddenFromMatch: () => false,
    updateFacing: () => {},
    directionFromTarget: (from, to) => {
      const dx = Math.sign(to.x - from.x);
      const dy = Math.sign(to.y - from.y);
      if (Math.abs(to.x - from.x) >= Math.abs(to.y - from.y)) {
        return dx > 0 ? { name: "right", dx: 1, dy: 0 } : dx < 0 ? { name: "left", dx: -1, dy: 0 } : null;
      }
      return dy > 0 ? { name: "down", dx: 0, dy: 1 } : dy < 0 ? { name: "up", dx: 0, dy: -1 } : null;
    },
    ...overrides,
  };
  return vm.createContext(context);
}

function loadScript(context, relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const code = fs.readFileSync(absolutePath, "utf8");
  vm.runInContext(code, context, { filename: relativePath });
  return context;
}

function loadScripts(context, relativePaths) {
  for (const relativePath of relativePaths) loadScript(context, relativePath);
  return context;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function contextValue(context, expression) {
  return vm.runInContext(expression, context);
}

function loadCoreRules(overrides = {}) {
  const context = createGameContext(overrides);
  return loadScripts(context, [
    "scripts/data/config.js",
    "scripts/data/rule-modes.js",
  ]);
}

function loadCombatRules(overrides = {}) {
  const context = createGameContext(overrides);
  return loadScripts(context, [
    "scripts/data/config.js",
    "scripts/data/weapons.en.js",
    "scripts/data/rule-modes.js",
    "scripts/systems/grid.js",
    "scripts/systems/combat.js",
  ]);
}

module.exports = {
  createGameContext,
  contextValue,
  loadCombatRules,
  loadCoreRules,
  loadScripts,
  plain,
};
