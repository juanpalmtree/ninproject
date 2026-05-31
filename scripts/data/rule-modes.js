// Rule-mode profiles for Nindou 3, modified Nindou 2, and original Nindou 2 values.
// Future weapon / ninjutsu differences should be configured here.
const modeRuleProfiles = {
  modified: {
    weapons: {
      weapon4: { damage: 40 }, // Iga Hidden Blade
      weapon6: { damage: 13 }, // Shiranui Iron Fan
    },
    ninjutsu: {
      steel: {
        cost: 6,
        castDurationMs: 1500,
        durationMs: 12000,
        defenseMultiplier: 1.7,
      },
      hotBlood: {
        cost: 6,
        castDurationMs: 1500,
        durationMs: 12000,
        weaponDamageMultiplier: 2,
      },
      moneyDart: {
        damage: 70,
      },
      genki: {
        cost: 2,
        castDurationMs: 1500,
        healAmount: 0,
        effect: "steelNoDefense",
      },
      kakki: {
        available: false,
        cost: 6,
        castDurationMs: 1500,
        healAmount: 100,
        effect: "selfHeal",
      },
      shinki: {
        available: false,
        cost: 10,
        castDurationMs: 1500,
        healAmount: 100,
        effect: "teamHeal",
      },
      flash: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: 0.3,
        damage: flashDamage,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: flashHitDisableMs,
      },
      wildfire: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: flashHitChance,
        damage: flashDamage,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: flashHitDisableMs,
      },
      freeze: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: 0.35,
        damage: 50,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: freezeHitDisableMs,
      },
      fireToad: {
        cost: 7,
        castDurationMs: 1500,
        transformMs: 1000,
        durationMs: 7000,
      },
    },
  },
  original: {
    weapons: {
      weapon4: { damage: 50 }, // Iga Hidden Blade
      weapon6: { damage: 25 }, // Shiranui Iron Fan
    },
    ninjutsu: {
      steel: {
        cost: 7,
        castDurationMs: 1500,
        durationMs: 12000,
        defenseMultiplier: 2,
      },
      hotBlood: {
        cost: 7,
        castDurationMs: 1500,
        durationMs: 12000,
        weaponDamageMultiplier: 2,
      },
      moneyDart: {
        damage: 100,
      },
      genki: {
        available: false,
        cost: 3,
        castDurationMs: 1500,
        healAmount: 50,
        effect: "selfHeal",
      },
      kakki: {
        available: false,
        cost: 6,
        castDurationMs: 1500,
        healAmount: 100,
        effect: "selfHeal",
      },
      shinki: {
        available: false,
        cost: 10,
        castDurationMs: 1500,
        healAmount: 100,
        effect: "teamHeal",
      },
      flash: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: flashHitChance,
        damage: flashDamage,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: flashHitDisableMs,
      },
      wildfire: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: flashHitChance,
        damage: flashDamage,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: flashHitDisableMs,
      },
      freeze: {
        cost: 7,
        castDurationMs: 1500,
        hitChance: 0.35,
        damage: 50,
        missDisableMs: flashMissDisableMs,
        hitDisableMs: freezeHitDisableMs,
      },
      fireToad: {
        cost: 7,
        castDurationMs: 1500,
        transformMs: 1000,
        durationMs: 7000,
      },
    },
  },
};

// Nindou 3 is the project's active direction. It currently inherits the tuned
// modified profile until a balance value needs to diverge explicitly.
modeRuleProfiles.n3 = modeRuleProfiles.modified;

function currentRuleModeKey() {
  if (typeof state !== "undefined" && state?.ruleModeKey && modeRuleProfiles[state.ruleModeKey]) return state.ruleModeKey;
  if (typeof state !== "undefined" && state?.useOriginalMode) return "original";
  return "n3";
}

function currentRuleProfile() {
  return modeRuleProfiles[currentRuleModeKey()] || modeRuleProfiles.n3;
}

function weaponDamageForMode(weaponKey, fallbackDamage) {
  const weaponRule = currentRuleProfile().weapons?.[weaponKey];
  return weaponRule?.damage ?? fallbackDamage;
}

function steelRule() {
  const fallback = {
    cost: steelNinjuCost,
    castDurationMs: steelCastDuration,
    durationMs: steelNinjuDuration,
    defenseMultiplier: steelDefenseMultiplier,
  };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.steel || {}) };
}

function hotBloodRule() {
  const fallback = {
    cost: steelNinjuCost,
    castDurationMs: steelCastDuration,
    durationMs: steelNinjuDuration,
    weaponDamageMultiplier: 2,
  };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.hotBlood || {}) };
}

function moneyDartRule() {
  const fallback = { damage: moneyDartDamage };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.moneyDart || {}) };
}

function healNinjuRule(type) {
  const fallbackAmounts = {
    genki: genkiHealAmount,
    kakki: kakkiHealAmount,
    shinki: shinkiHealAmount,
  };
  const fallback = {
    cost: 3,
    castDurationMs: steelCastDuration,
    healAmount: type === "genki" ? 50 : (fallbackAmounts[type] ?? genkiHealAmount),
    effect: "selfHeal",
  };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.[type] || {}) };
}

function flashRule() {
  return attackNinjuRule("flash");
}

function wildfireRule() {
  return attackNinjuRule("wildfire");
}

function freezeRule() {
  return attackNinjuRule("freeze");
}

function attackNinjuRule(type) {
  const fallback = {
    cost: flashNinjuCost,
    castDurationMs: flashCastDuration,
    hitChance: flashHitChance,
    damage: flashDamage,
    missDisableMs: flashMissDisableMs,
    hitDisableMs: flashHitDisableMs,
  };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.[type] || {}) };
}

function fireToadRule() {
  const fallback = { cost: fireToadCost, castDurationMs: steelCastDuration, transformMs: fireToadTransformMs, durationMs: fireToadDurationMs };
  return { ...fallback, ...(currentRuleProfile().ninjutsu?.fireToad || {}) };
}
