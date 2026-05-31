const test = require("node:test");
const assert = require("node:assert/strict");
const {
  contextValue,
  createGameContext,
  loadScripts,
  plain,
} = require("./helpers/script-loader");

function loadProgressionRules() {
  const context = createGameContext();
  loadScripts(context, ["scripts/data/progression.en.js"]);
  return context;
}

test("EXP thresholds derive the expected levels", () => {
  const context = loadProgressionRules();
  assert.equal(contextValue(context, "defaultPlayerLevel"), 1);
  assert.equal(contextValue(context, "defaultPlayerExp"), 0);
  assert.equal(contextValue(context, "expForLevel(1)"), 0);
  assert.equal(contextValue(context, "expForLevel(2)"), 800);
  assert.equal(contextValue(context, "levelForExp(799)"), 1);
  assert.equal(contextValue(context, "levelForExp(800)"), 2);
  assert.equal(contextValue(context, "levelForExp(-10)"), 1);
  assert.equal(contextValue(context, "maxProgressionLevel"), 150);
  assert.equal(contextValue(context, "expForLevel(101)"), 2170000);
  assert.equal(contextValue(context, "expForLevel(150)"), 15570000);
  assert.equal(contextValue(context, "levelForExp(15570000)"), 150);
});

test("a new profile starts at Shoshinsha and advances through match reward EXP", () => {
  const context = loadProgressionRules();
  const result = plain(contextValue(context, `
    (() => {
      const profile = { exp: defaultPlayerExp, classBranch: "" };
      const fresh = { ...syncProgressionProfile(profile) };
      awardExpToProfile(profile, 500);
      const afterVictory = { ...profile };
      awardExpToProfile(profile, 200);
      const afterLoss = { ...profile };
      awardExpToProfile(profile, 200);
      return { fresh, afterVictory, afterLoss, afterNextReward: profile };
    })()
  `));
  assert.equal(result.fresh.level, 1);
  assert.equal(result.fresh.rankTitle, "Shoshinsha");
  assert.equal(result.afterVictory.exp, 500);
  assert.equal(result.afterVictory.level, 1);
  assert.equal(result.afterLoss.exp, 700);
  assert.equal(result.afterLoss.level, 1);
  assert.equal(result.afterNextReward.exp, 900);
  assert.equal(result.afterNextReward.level, 2);
});

test("rank and class titles are derived from level and canonicalized branch values", () => {
  const context = loadProgressionRules();
  assert.equal(contextValue(context, "rankForLevel(100)"), "Ninja Master");
  assert.equal(contextValue(context, "rankForLevel(101)"), "Onmyoji or Night Blade");
  assert.equal(contextValue(context, 'rankForLevel(101, "night blade")'), "Night Blade");
  assert.equal(contextValue(context, 'normalizedClassBranch("ONMYOJI")'), "Onmyoji");
  assert.equal(contextValue(context, "rankForLevel(40)"), "Iga Ninja");
});

test("rank marks map normal ranks, class branches, and special profile roles to exported SVG frames", () => {
  const context = loadProgressionRules();
  assert.equal(contextValue(context, "rankMarkPathForLevel(1)"), "assets/ui/rank-marks/1.svg");
  assert.equal(contextValue(context, "rankMarkPathForLevel(95)"), "assets/ui/rank-marks/13.svg");
  assert.equal(contextValue(context, 'rankMarkPathForLevel(101, "night blade")'), "assets/ui/rank-marks/14.svg");
  assert.equal(contextValue(context, 'rankMarkPathForLevel(101, "onmyoji")'), "assets/ui/rank-marks/15.svg");
  assert.deepEqual(plain(contextValue(context, "specialRankMarks")), [
    { id: "disciplinarian", title: "Disciplinarian", rankMarkFrame: 16 },
    { id: "godfather", title: "Godfather", rankMarkFrame: 17 },
  ]);
});

test("profile normalization stores derived progression data on a profile copy", () => {
  const context = loadProgressionRules();
  const profile = plain(contextValue(context, 'normalizedProgressionProfile({ exp: "3270000", classBranch: "nightblade", name: "Blue1" })'));
  assert.deepEqual(profile, {
    exp: 3270000,
    level: 111,
    rankTitle: "Night Blade",
    rankMarkFrame: 14,
    rankMarkPath: "assets/ui/rank-marks/14.svg",
    classBranch: "Night Blade",
    classTitle: "Night Blade",
    name: "Blue1",
  });
});

test("awarding EXP mutates the profile and reports levels gained", () => {
  const context = loadProgressionRules();
  const result = plain(contextValue(context, `
    (() => {
      const profile = { exp: 799, classBranch: "" };
      return awardExpToProfile(profile, 2);
    })()
  `));
  assert.equal(result.exp, 801);
  assert.equal(result.expAwarded, 2);
  assert.equal(result.previousLevel, 1);
  assert.equal(result.level, 2);
  assert.equal(result.levelsGained, 1);
  assert.equal(result.profile.exp, 801);
  assert.equal(result.profile.level, 2);
  assert.equal(result.profile.rankTitle, "Shoshinsha");
});

test("profiles can only select a known class after the class unlock level", () => {
  const context = loadProgressionRules();
  const result = plain(contextValue(context, `
    (() => {
      const belowGate = { exp: expForLevel(100) };
      const atGate = { exp: expForLevel(101) };
      return {
        belowGateAccepted: selectClassForProfile(belowGate, "Onmyoji"),
        atGateAccepted: selectClassForProfile(atGate, "night blade"),
        unknownAccepted: selectClassForProfile(atGate, "Unknown"),
        belowGate,
        atGate,
      };
    })()
  `));
  assert.equal(result.belowGateAccepted, false);
  assert.equal(result.atGateAccepted, true);
  assert.equal(result.unknownAccepted, false);
  assert.equal(result.belowGate.classBranch, undefined);
  assert.equal(result.atGate.classBranch, "Night Blade");
  assert.equal(result.atGate.rankTitle, "Night Blade");
});

test("class-specific ninjutsu unlocks use canonical class values", () => {
  const context = loadProgressionRules();
  const onmyojiNames = plain(contextValue(context, 'ninjutsuUnlocksForLevel(108, "onmyoji").map((unlock) => unlock.name)'));
  const nightBladeNames = plain(contextValue(context, 'ninjutsuUnlocksForLevel(108, "nightblade").map((unlock) => unlock.name)'));
  assert.equal(onmyojiNames.includes("Angel"), true);
  assert.equal(onmyojiNames.includes("Death"), false);
  assert.equal(nightBladeNames.includes("Death"), true);
  assert.equal(nightBladeNames.includes("Angel"), false);
});
