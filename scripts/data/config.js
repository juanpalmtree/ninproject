// Shared gameplay constants. Keep this file data-only so it can move to Phaser later.
const grid = { cols: 22, rows: 12, cell: 40, left: 40, top: 42 };
const maxSkill = 18; //18
const maxOugi = 100;
const ougiMoveGainPerCell = 1.25;
const ougiDealGainPerDamage = 0.05;
const ougiTakeGainPerDamage = 0.04;
const ougiHitControlLockMs = 1500;
const ougiPostInvincibleMs = 3000;
const holdSeconds = 0;
const chargePerSecond = 18 / 6.5;
const maxHp = 300;
const weaponDamage = 50;
const collisionDamage = 40;
const weaponCooldownMs = 1000;
const objectHp = 100;
const respawnMs = 3000;
const respawnPointerDuration = 1000;
const playerUnitId = 1;
const unitsPerTeam = 3;
const aiSkillRegenPerSecond = 0.42;

const steelNinjuCost = 7; 
const steelCastDuration = 1500;
const steelNinjuDuration = 12000;
const ninjuChainGap = 500;
const ninjuChainMaxGap = 500;
const ninjuFollowupMoveAllowance = 2;
const steelDefenseMultiplier = 1.7;

// Jutsu button positions and sizes: x/y control position; w/h control dimensions.
const moneyDartButtonRect = { x: 508, y: 600, w: 65, h: 30 }; // Koban button
const steelButtonRect = { x: 582, y: 600, w: 65, h: 30 }; // Steel button
const hotBloodButtonRect = { x: 656, y: 600, w: 65, h: 30 }; // Heat button
const fireToadButtonRect = { x: 730, y: 600, w: 65, h: 30 };
const moneyDartReadyMs = 250;
const moneyDartPostThrowNinjuLockMs = 250;
const moneyDartDamage = 70;
const moneyDartSpeed = 1500;
const countdownTotalMs = 2500;
const mapItemDropChance = 0.4;
const mapItemDropTypes = ["chest", "vase", "barrel", "hay", "mapitem12", "mapitem13", "mapitem14", "mapitem1n2", "mapitem20"];
const mapGoldDropTypes = ["hay"];
const fireToadCost = 7;
const fireToadTransformMs = 1000;
const fireToadDurationMs = 7000;
const soulStepsPerLevel = 27;
const soulMaxLevel = 4;
const soulCombatGainSteps = soulStepsPerLevel / 5;
const soulDeathGainSteps = soulStepsPerLevel;
const attackJutsuStunMs = 2000;
const jutsuMissEffectMs = 240;
const butsumetsuCasterDeathDelayMs = 500;
const attackJutsuTierRules = {
  1: { globalHitChance: 0.30, perTargetHitChance: 0.30 },
  2: { globalHitChance: 0.50, perTargetHitChance: 0.50 },
  3: { globalHitChance: 0.80, perTargetHitChance: 0.70 },
  4: { globalHitChance: 0.90, perTargetHitChance: 0.85 },
};
const flashHitChance = 0.6;
const flashDamage = 50;
const flashMissDisableMs = 1500;
const flashHitDisableMs = 3500;
const freezeHitDisableMs = 6000;
const genkiHealAmount = 100;
const kakkiHealAmount = 200;
const shinkiHealAmount = 9999;
const genkiButtonRect = { x: 804, y: 600, w: 48, h: 30 };
const kakkiButtonRect = { x: 858, y: 600, w: 48, h: 30 };
const shinkiButtonRect = { x: 912, y: 600, w: 48, h: 30 };
const flashNinjuCost = 7;
const flashCastDuration = 1500;

const ui = {
  top: 0,
  bottomTop: 542,
  bottomHeight: 138,
  leftPanelW: 446,
  midX: 446,
};

const startingAreas = {
  // Internal grid coordinates. Display coordinates are converted elsewhere.
  blue: { xMin: 2, xMax: 3, yMin: 3, yMax: 7 },
  grey: { xMin: 16, xMax: 17, yMin: 3, yMax: 7 },
};

