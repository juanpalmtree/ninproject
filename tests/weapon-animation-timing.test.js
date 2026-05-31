const test = require("node:test");
const assert = require("node:assert/strict");

const { loadCombatRules } = require("./helpers/script-loader");

test("weapon attack animation duration follows each weapon cooldown", () => {
  const context = loadCombatRules();

  for (const row of context.buildWeaponAttackAnimationReport()) {
    assert.equal(row.animationDurationMs, row.cooldownMs, row.key);
  }
});

test("Rasetsu Claws and Seigaiha keep their tuned frame timing", () => {
  const context = loadCombatRules();

  assert.equal(context.weaponAttackAnimationDurationMs("weapon14"), 300);
  assert.equal(context.weaponAttackFrameDurationMs("weapon14"), 300 / 6);
  assert.equal(context.weaponAttackAnimationDurationMs("weapon20"), 300);
  assert.equal(context.weaponAttackFrameDurationMs("weapon20"), 300 / 9);
});

test("weapon frame paths come from the English weapon data layer", () => {
  const context = loadCombatRules();
  const weapon = context.weaponDefinitionForKey("weapon14");

  assert.equal(weapon.label, "Rasetsu Claws");
  assert.equal(
    context.weaponFrameSource(weapon, "right", "attack", 0),
    "assets/weapon/14Weapon14/right_attack/1.png",
  );
  assert.equal(context.weaponSoundKey("weapon14"), "weapon14Slash");
});
