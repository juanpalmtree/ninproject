const test = require("node:test");
const assert = require("node:assert/strict");

const { loadCombatRules, plain } = require("./helpers/script-loader");

test("display and internal grid coordinates round-trip", () => {
  const context = loadCombatRules();
  const internal = context.internalCellCoord({ x: 1, y: 1 });

  assert.deepEqual(plain(internal), { x: 2, y: 10 });
  assert.deepEqual(plain(context.displayCellCoord(internal)), { x: 1, y: 1 });
});

test("outer border and non-walkable side columns are permanent obstacles", () => {
  const context = loadCombatRules();

  assert.equal(context.isPermanentObstacle(0, 5), true);
  assert.equal(context.isPermanentObstacle(1, 5), true);
  assert.equal(context.isPermanentObstacle(2, 5), false);
  assert.equal(context.isPermanentObstacle(20, 5), true);
  assert.equal(context.isPermanentObstacle(21, 5), true);
  assert.equal(context.isPermanentObstacle(2, 0), true);
  assert.equal(context.isPermanentObstacle(2, 11), true);
});

test("alive map objects block cells", () => {
  const context = loadCombatRules({
    state: {
      useOriginalMode: false,
      units: [],
      objects: [{ x: 4, y: 5, alive: true }],
      projectiles: [],
      attacks: [],
    },
  });

  assert.equal(context.isBlockedCell(4, 5), true);
  assert.equal(context.isBlockedCell(4, 6), false);
});
