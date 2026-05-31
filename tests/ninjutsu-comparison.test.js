const test = require("node:test");
const assert = require("node:assert/strict");

const { createGameContext, loadScripts } = require("./helpers/script-loader");

function deterministicMath(value) {
  const math = Object.create(Math);
  math.random = () => value;
  return math;
}

function loadNinjutsuContext(ruleModeKey = "n3") {
  const units = [
    { id: 1, name: "Caster", team: "blue", alive: true, x: 5, y: 5, hp: 300, maxHp: 300 },
    { id: 2, name: "Near", team: "grey", alive: true, x: 6, y: 5, hp: 300, maxHp: 300 },
    { id: 3, name: "Mid", team: "grey", alive: true, x: 8, y: 5, hp: 300, maxHp: 300 },
    { id: 4, name: "Far", team: "grey", alive: true, x: 11, y: 5, hp: 300, maxHp: 300 },
  ];
  const context = createGameContext({
    Math: deterministicMath(0),
    state: { ruleModeKey, useOriginalMode: ruleModeKey === "original", units, objects: [], projectiles: [], attacks: [] },
    attackNinjuConfigs: {
      lightning: { label: "Lightning", damage: 45, hitSound: null },
    },
    specialNinjuConfigs: {
      seven: { label: "Seven", damage: 130, duration: 1720, effectSize: 150 },
      butsumetsu: { label: "Butsu", damage: 9999, duration: 1840, effectSize: 220, radius: 2, killsCaster: true },
    },
    specialNinjuHitFrames: {},
    cancelDragIfPressed: () => {},
    damageUnit: (target, damage) => {
      target.hp -= damage;
      if (target.hp <= 0) target.alive = false;
      return damage;
    },
  });
  return loadScripts(context, [
    "scripts/data/config.js",
    "scripts/data/rule-modes.js",
    "scripts/systems/grid.js",
    "scripts/systems/ninjutsu.js",
  ]);
}

test("Nindou 3 attack jutsu mode rolls against every enemy", () => {
  const context = loadNinjutsuContext("n3");
  const caster = context.state.units[0];

  context.triggerAttackNinju(caster, "lightning", 1, 1000);

  assert.equal(context.state.units[1].hp, 255);
  assert.equal(context.state.units[2].hp, 255);
  assert.equal(context.state.units[3].hp, 255);
});

test("Nindou 2 comparison attack jutsu mode targets nearest enemies by tier", () => {
  const context = loadNinjutsuContext("modified");
  const caster = context.state.units[0];

  context.triggerAttackNinju(caster, "lightning", 1, 1000);

  assert.equal(context.state.units[1].hp, 250);
  assert.equal(context.state.units[2].hp, 300);
  assert.equal(context.state.units[3].hp, 300);
});

test("Nindou 2 comparison special jutsu mode uses the generic nearest-target behavior", () => {
  const context = loadNinjutsuContext("modified");
  const caster = context.state.units[0];

  context.triggerSpecialNinju(caster, "seven", 1000);

  assert.equal(context.state.units[1].hp, 170);
  assert.equal(context.state.units[2].hp, 300);
  assert.equal(context.state.units[3].hp, 300);
});
