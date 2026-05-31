const test = require("node:test");
const assert = require("node:assert/strict");

const { contextValue, createGameContext, loadScripts } = require("./helpers/script-loader");

function createRewardMatchContext(overrides = {}) {
  const refreshCalls = [];
  const character = { storage: { exp: 0, classBranch: "" } };
  const context = createGameContext({
    performance: { now: () => 1000 },
    state: {
      units: [],
      objects: [],
      projectiles: [],
      attacks: [],
      ougiCasts: [],
      deathAnimations: [],
      pendingResult: null,
      result: null,
      gameOver: false,
    },
    matchEndPromptMs: 2400,
    clearDragState: () => {},
    setMessage: () => {},
    syncBgm: () => {},
    selectedCharacterProfile: () => character,
    saveAppProfile: () => refreshCalls.push("save"),
    syncSelectedCharacterToRoom: () => refreshCalls.push("room"),
    renderFlowCharacterSummary: () => refreshCalls.push("flow"),
    renderRoomInventoryPanel: () => refreshCalls.push("inventory"),
    ...overrides,
  });
  loadScripts(context, [
    "scripts/data/progression.en.js",
    "scripts/data/config.js",
    "scripts/systems/match.js",
  ]);
  return { character, context, refreshCalls };
}

test("match finish waits in pending state until death and Ougi animations finish", () => {
  let now = 1000;
  const messages = [];
  const { character, context, refreshCalls } = createRewardMatchContext({
    performance: { now: () => now },
    state: {
      units: [],
      objects: [],
      projectiles: [],
      attacks: [],
      ougiCasts: [{ startedAt: now, duration: 2200 }],
      deathAnimations: [],
      pendingResult: null,
      result: null,
      gameOver: false,
    },
    deathSkullAnimationMs: 1050,
    matchEndPromptMs: 2400,
    clearDragState: () => {},
    setMessage: (message) => messages.push(message),
    syncBgm: () => {},
  });
  loadScripts(context, [
  ]);

  contextValue(context, 'queueMatchFinish("blue")');

  assert.equal(context.state.gameOver, false);
  assert.equal(context.state.pendingResult.winner, "blue");
  assert.equal(context.state.pendingResult.finishAt, 3200);
  assert.equal(messages.at(-1), "Victory incoming.");

  now = 3199;
  contextValue(context, "updatePendingMatchResult(performance.now())");
  assert.equal(context.state.result, null);
  assert.equal(character.storage.exp, 0);

  now = 3200;
  contextValue(context, "updatePendingMatchResult(performance.now())");
  assert.equal(context.state.gameOver, true);
  assert.equal(context.state.result.winner, "blue");
  assert.equal(context.state.pendingResult, null);
  assert.equal(character.storage.exp, 500);
  assert.deepEqual(refreshCalls, ["save", "room", "flow", "inventory"]);
});

test("victory finalization awards and persists 500 EXP", () => {
  const { character, context, refreshCalls } = createRewardMatchContext();

  contextValue(context, 'finishMatch("blue")');

  assert.equal(character.storage.exp, 500);
  assert.equal(context.state.result.expReward.expAwarded, 500);
  assert.deepEqual(refreshCalls, ["save", "room", "flow", "inventory"]);
});

test("loss finalization awards and persists 200 EXP", () => {
  const { character, context, refreshCalls } = createRewardMatchContext();

  contextValue(context, 'finishMatch("grey")');

  assert.equal(character.storage.exp, 200);
  assert.equal(context.state.result.expReward.expAwarded, 200);
  assert.deepEqual(refreshCalls, ["save", "room", "flow", "inventory"]);
});

test("duplicate finalization does not award EXP twice", () => {
  const { character, context, refreshCalls } = createRewardMatchContext();

  contextValue(context, 'finishMatch("blue")');
  contextValue(context, 'finishMatch("blue")');

  assert.equal(character.storage.exp, 500);
  assert.equal(refreshCalls.filter((call) => call === "save").length, 1);
});

test("direct finalization queues instead of awarding during an active Ougi", () => {
  const { character, context } = createRewardMatchContext({
    state: {
      units: [],
      objects: [],
      projectiles: [],
      attacks: [],
      ougiCasts: [{ startedAt: 1000, duration: 600 }],
      deathAnimations: [],
      pendingResult: null,
      result: null,
      gameOver: false,
    },
  });

  contextValue(context, 'finishMatch("blue")');

  assert.equal(context.state.result, null);
  assert.equal(context.state.pendingResult.finishAt, 1600);
  assert.equal(character.storage.exp, 0);
});

test("match reward waits for an active death animation", () => {
  let now = 1000;
  const { character, context } = createRewardMatchContext({
    performance: { now: () => now },
    state: {
      units: [],
      objects: [],
      projectiles: [],
      attacks: [],
      ougiCasts: [],
      deathAnimations: [{ startedAt: now, duration: 1800 }],
      pendingResult: null,
      result: null,
      gameOver: false,
    },
    deathSkullAnimationMs: 1050,
  });

  contextValue(context, 'queueMatchFinish("blue")');
  assert.equal(context.state.pendingResult.finishAt, 2800);

  now = 2799;
  contextValue(context, "updatePendingMatchResult(performance.now())");
  assert.equal(character.storage.exp, 0);

  now = 2800;
  contextValue(context, "updatePendingMatchResult(performance.now())");
  assert.equal(character.storage.exp, 500);
});

test("defeating a player records the directional player death animation", () => {
  let now = 500;
  const blue = {
    id: "blue1",
    team: "blue",
    name: "Blue1",
    alive: true,
    defeated: false,
    respawning: false,
    x: 3,
    y: 4,
    fromX: 3,
    fromY: 4,
    moveT: 1,
    hp: 10,
    kills: 0,
    facing: "left",
    eyeStyle: "5",
  };
  const context = createGameContext({
    performance: { now: () => now },
    state: {
      units: [blue],
      objects: [],
      projectiles: [],
      attacks: [],
      ougiCasts: [],
      deathAnimations: [],
      pendingResult: null,
      result: null,
      gameOver: false,
    },
    grid: { x: 0, y: 0, cell: 40 },
    soulDeathGainSteps: 0,
    deathSkullAnimationMs: 1050,
    matchEndPromptMs: 2400,
    unitPosition: (unit) => ({ x: unit.x * 40 + 20, y: unit.y * 40 + 20 }),
    cancelDragIfPressed: () => {},
    isFireToadActive: () => false,
    isFireToadTransforming: () => false,
    endFireToad: () => {},
    gainSoul: () => {},
    playSound: () => {},
    setMessage: () => {},
    clearDragState: () => {},
  });
  loadScripts(context, [
    "scripts/data/config.js",
    "scripts/systems/match.js",
  ]);

  contextValue(context, "defeatUnit(state.units[0])");

  assert.equal(blue.alive, false);
  assert.equal(context.state.deathAnimations.length, 1);
  assert.equal(context.state.deathAnimations[0].team, "blue");
  assert.equal(context.state.deathAnimations[0].facing, "left");
  assert.equal(context.state.deathAnimations[0].eyeStyle, "5");
});
