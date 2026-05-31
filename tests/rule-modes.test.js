const test = require("node:test");
const assert = require("node:assert/strict");

const { contextValue, loadCoreRules, plain } = require("./helpers/script-loader");

test("Nindou 3 mode is the default tuned rule profile", () => {
  const context = loadCoreRules();

  assert.equal(context.currentRuleModeKey(), "n3");
  assert.equal(context.weaponDamageForMode("weapon4", 999), 40);
  assert.equal(context.moneyDartRule().damage, 70);
  assert.deepEqual(plain(context.steelRule()), {
    cost: 6,
    castDurationMs: 1500,
    durationMs: 12000,
    defenseMultiplier: 1.7,
  });
  assert.equal(context.healNinjuRule("genki").effect, "steelNoDefense");
  assert.equal(context.fireToadRule().durationMs, 7000);
});

test("modified mode remains available for Nindou 2 collaboration checks", () => {
  const context = loadCoreRules({ state: { ruleModeKey: "modified" } });

  assert.equal(context.currentRuleModeKey(), "modified");
  assert.equal(context.weaponDamageForMode("weapon4", 999), 40);
  assert.equal(context.weaponDamageForMode("weapon6", 999), 13);
  assert.equal(context.moneyDartRule().damage, 70);
});

test("original mode keeps original combat values", () => {
  const context = loadCoreRules({ state: { ruleModeKey: "original", useOriginalMode: true } });

  assert.equal(context.currentRuleModeKey(), "original");
  assert.equal(context.weaponDamageForMode("weapon4", 999), 50);
  assert.equal(context.weaponDamageForMode("weapon6", 999), 25);
  assert.equal(context.steelRule().cost, 7);
  assert.equal(context.steelRule().defenseMultiplier, 2);
  assert.equal(context.moneyDartRule().damage, 100);
});

test("attack jutsu tier rules protect the current Nindou 3 hit model", () => {
  const context = loadCoreRules();

  assert.deepEqual(plain(contextValue(context, "attackJutsuTierRules")), {
    1: { globalHitChance: 0.30, perTargetHitChance: 0.30 },
    2: { globalHitChance: 0.50, perTargetHitChance: 0.50 },
    3: { globalHitChance: 0.80, perTargetHitChance: 0.70 },
    4: { globalHitChance: 0.90, perTargetHitChance: 0.85 },
  });
  assert.equal(contextValue(context, "attackJutsuStunMs"), 2000);
  assert.equal(contextValue(context, "jutsuMissEffectMs"), 240);
});
