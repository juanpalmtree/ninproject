const test = require("node:test");
const assert = require("node:assert/strict");

const { contextValue, loadCombatRules, plain } = require("./helpers/script-loader");

const dirs = {
  right: { name: "right", dx: 1, dy: 0 },
  up: { name: "up", dx: 0, dy: -1 },
};

test("modified mode applies weapon damage overrides", () => {
  const context = loadCombatRules();

  assert.equal(context.unitWeaponDamage({ weaponKey: "weapon4" }), 40);
  assert.equal(context.unitWeaponDamage({ weaponKey: "weapon6" }), 13);
  assert.equal(context.unitWeaponDamage({ weaponKey: "weapon14" }), 60);
});

test("original mode keeps original weapon damage overrides", () => {
  const context = loadCombatRules({ state: { useOriginalMode: true, units: [], objects: [], projectiles: [], attacks: [] } });

  assert.equal(context.unitWeaponDamage({ weaponKey: "weapon4" }), 50);
  assert.equal(context.unitWeaponDamage({ weaponKey: "weapon6" }), 25);
});

test("Muramasa hits all adjacent cells", () => {
  const context = loadCombatRules();

  assert.deepEqual(
    plain(context.weaponAreaCells({ x: 5, y: 5, weaponKey: "weapon19" }, dirs.up)),
    [
      { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 5 }, { x: 6, y: 5 },
      { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 },
    ],
  );
});

test("Seigaiha wide331 hits a 3-3-1 forward shape", () => {
  const context = loadCombatRules();

  assert.deepEqual(
    plain(context.weaponAreaCells({ x: 5, y: 5, weaponKey: "weapon20" }, dirs.right)),
    [
      { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 },
      { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 },
      { x: 8, y: 5 },
    ],
  );
});

test("Koga chains use the custom chain range", () => {
  const context = loadCombatRules();

  assert.deepEqual(
    plain(context.weaponAreaCells({ x: 5, y: 5, weaponKey: "weapon13" }, dirs.right)),
    [
      { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 5 },
      { x: 6, y: 4 }, { x: 6, y: 6 }, { x: 7, y: 4 }, { x: 7, y: 6 },
      { x: 10, y: 4 }, { x: 10, y: 6 }, { x: 11, y: 4 }, { x: 11, y: 6 },
    ],
  );
});

test("Koga Ougi 1 uses the screenshot forward line range", () => {
  const context = loadCombatRules();
  const definition = contextValue(context, "ougiDefinitions.weapon13[1]");

  assert.deepEqual(plain(definition.rangeShape), { type: "line", distance: 6 });
});

test("Seigaiha Ougis use the screenshot ranges", () => {
  const context = loadCombatRules();

  assert.deepEqual(plain(contextValue(context, "ougiDefinitions.weapon20[1].rangeShape")), { type: "cross", distance: 5 });
  assert.deepEqual(plain(contextValue(context, "ougiDefinitions.weapon20[2].rangeShape")), { type: "square", radius: 2 });
  assert.deepEqual(plain(contextValue(context, "ougiDefinitions.weapon20[3].rangeShape")), { type: "square", radius: 3 });
});

test("implemented weapon Ougi ranges match the screenshot pass", () => {
  const context = loadCombatRules();
  const expectedRanges = {
    weapon1: [{ type: "line", distance: 5 }, { type: "square", radius: 1 }, { type: "square", radius: 2 }],
    weapon5: [{ type: "square", radius: 1 }, { type: "cross", distance: 2 }, { type: "square", radius: 1 }],
    weapon6: [{ type: "square", radius: 1 }, { type: "line", distance: 6 }, { type: "forwardRect", distance: 8, halfWidth: 1 }],
    weapon7: [{ type: "line", distance: 5 }, { type: "forwardRect", distance: 4, halfWidth: 1 }, { type: "square", radius: 1 }],
    weapon8: [{ type: "line", distance: 8 }, { type: "square", radius: 1 }, { type: "cross", distance: 4 }],
    weapon10: [{ type: "square", radius: 1 }, { type: "cross", distance: 4 }, { type: "forwardRect", distance: 8, halfWidth: 1 }],
    weapon11: [{ type: "line", distance: 10 }, { type: "cross", distance: 5 }, { type: "square", radius: 1 }],
    weapon12: [{ type: "square", radius: 1 }, { type: "cross", distance: 5 }, { type: "line", distance: 12 }],
    weapon13: [{ type: "line", distance: 6 }, { type: "square", radius: 1 }, { type: "cross", distance: 6 }],
    weapon14: [{ type: "line", distance: 9 }, { type: "cross", distance: 3 }, { type: "diamond", radius: 2 }],
    weapon15: [{ type: "line", distance: 7 }, { type: "cross", distance: 5 }, { type: "square", radius: 2 }],
    weapon16: [{ type: "square", radius: 1 }, { type: "cross", distance: 6 }, { type: "square", radius: 1 }],
    weapon19: [{ type: "line", distance: 9 }, { type: "square", radius: 1 }, { type: "forwardRect", distance: 9, halfWidth: 1 }],
    weapon20: [{ type: "cross", distance: 5 }, { type: "square", radius: 2 }, { type: "square", radius: 3 }],
  };

  for (const [weaponKey, ranges] of Object.entries(expectedRanges)) {
    for (const [index, rangeShape] of ranges.entries()) {
      assert.deepEqual(plain(contextValue(context, `ougiDefinitions.${weaponKey}[${index + 1}].rangeShape`)), rangeShape);
    }
  }
});
