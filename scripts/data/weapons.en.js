// Weapon data is kept declarative so new weapons can be added without changing combat code.
const defaultWeaponKey = "weapon1";
const weaponDefinitions = [
  { key: "weapon1", label: "Kunai", folder: "1Kunai", frameCount: 12, cooldownMs: 500, area: "single", damage: 50 },
  { key: "weapon2", label: "Cat Hand", folder: "2CatHand", frameCount: 6, cooldownMs: 300, area: "single", damage: 30, soundKey: "weapon2Slash" },
  { key: "weapon3", label: "Nodachi", folder: "3Nodachi", frameCount: 24, cooldownMs: 1000, area: "line3", damage: 50 },
  { key: "weapon4", label: "Iga Hidden Blade", folder: "4IgaHiddenBlade", frameCount: 13, cooldownMs: 500, area: "line2", damage: 50 },
  { key: "weapon5", label: "Shura Claw", folder: "5ShuraClaw", frameCount: 6, cooldownMs: 300, area: "single", damage: 50, soundKey: "weapon5Slash" },
  { key: "weapon6", label: "Shiranui Iron Fan", folder: "6ShiranuiIronFan", frameCount: 9, cooldownMs: 300, area: "fan", damage: 30, soundKey: "weapon6Slash" },
  { key: "weapon7", label: "Ice Oni Blade", folder: "7IceOniBlade", frameCount: 22, cooldownMs: 800, area: "line2", damage: 80, soundKey: "weapon7Slash" },
  { key: "weapon8", label: "Iga Yo-Yo", folder: "8IgaYoYo", frameCount: 13, cooldownMs: 500, area: "line8", damage: 50, soundKey: "weapon8Slash" },
  { key: "weapon9", label: "Back Scratcher", folder: "9BackScratcher", frameCount: 11, cooldownMs: 500, area: "line3", damage: 40, soundKey: "weapon9Slash" },
  { key: "weapon10", label: "Fuma Shuriken", folder: "10FumaShuriken", frameCount: 13, cooldownMs: 500, area: "line6", damage: 75, soundKey: "weapon10Slash" },
  { key: "weapon11", label: "Naniwa Shiranui", folder: "11Weapon11", frameCount: 13, cooldownMs: 500, area: "fan", damage: 50, soundKey: "weapon11Slash" },
  { key: "weapon12", label: "Oni Kanabo", folder: "12Weapon12", frameCount: 24, cooldownMs: 1000, area: "line3", damage: 80, soundKey: "weapon12Slash" },
  { key: "weapon13", label: "Koga Manriki-gusari", folder: "13Weapon13", frameCount: 16, cooldownMs: 650, area: "kogaChain", damage: 50, soundKey: "weapon13Slash" },
  { key: "weapon14", label: "Rasetsu Claws", folder: "14Weapon14", frameCount: 6, cooldownMs: 300, area: "single", damage: 60, soundKey: "weapon14Slash" },
  { key: "weapon15", label: "Fuma Kodachi", folder: "15Weapon15", frameCount: 8, cooldownMs: 350, area: "fan", damage: 50, soundKey: "weapon15Slash" },
  { key: "weapon16", label: "Ice Dragon God Blade", folder: "16Weapon16", frameCount: 16, cooldownMs: 650, area: "line3", damage: 80, soundKey: "weapon16Slash" },
  { key: "weapon17", label: "Love Hand", folder: "17Weapon17", frameCount: 11, cooldownMs: 500, area: "line3", damage: 40, soundKey: "weapon17Slash" },
  { key: "weapon18", label: "Golden Finger", folder: "18Weapon18", frameCount: 11, cooldownMs: 500, area: "line3", damage: 40, soundKey: "weapon18Slash" },
  { key: "weapon19", label: "Muramasa", folder: "19Weapon19", frameCount: 13, cooldownMs: 500, area: "surround", damage: 80, soundKey: "muramasaSlash" },
  { key: "weapon20", label: "Seigaiha", folder: "20Weapon20", frameCount: 9, cooldownMs: 300, area: "wide331", damage: 65, soundKey: "weapon20Slash" },
];
const weaponDefinitionByKey = Object.fromEntries(weaponDefinitions.map((weapon) => [weapon.key, weapon]));
function weaponDefinitionForKey(weaponKey) {
  return weaponDefinitionByKey[weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
}

function weaponSoundKey(weaponKey) {
  const weapon = weaponDefinitionForKey(weaponKey);
  return weapon?.soundKey || "slash";
}

function weaponFrameSource(weapon, direction, kind, index) {
  return `assets/weapon/${weapon.folder}/${direction}_${kind}/${index + 1}.png`;
}

function weaponAttackAnimationDurationMs(weaponKey) {
  const weapon = weaponDefinitionForKey(weaponKey);
  return weapon?.cooldownMs || weaponCooldownMs;
}

function weaponAttackFrameDurationMs(weaponKey) {
  const weapon = weaponDefinitionForKey(weaponKey);
  const frameCount = Math.max(1, weapon?.frameCount || 1);
  return weaponAttackAnimationDurationMs(weaponKey) / frameCount;
}

function buildWeaponAttackAnimationReport() {
  return weaponDefinitions.map((weapon) => ({
    key: weapon.key,
    label: weapon.label,
    frameCount: weapon.frameCount,
    cooldownMs: weapon.cooldownMs,
    animationDurationMs: weaponAttackAnimationDurationMs(weapon.key),
    frameDurationMs: Number(weaponAttackFrameDurationMs(weapon.key).toFixed(2)),
  }));
}

const weaponFrames = Object.fromEntries(weaponDefinitions.map((weapon) => [
  weapon.key,
  {
    hand: { right: [], left: [], up: [], down: [] },
    attack: { right: [], left: [], up: [], down: [] },
  },
]));
const ougiDefinitions = {
  weapon1: {
    1: { folder: "weapon1/1", frameCount: 45, cost: 33, damage: 90, duration: 1800, maxSize: 430, rangeShape: { type: "line", distance: 5 }, soundKey: "weapon1Ougi" },
    2: { folder: "weapon1/2", frameCount: 54, cost: 66, damage: 150, duration: 2160, maxSize: 520, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon1Ougi" },
    3: { folder: "weapon1/3", frameCount: 87, cost: 100, damage: 240, duration: 3480, maxSize: 620, rangeShape: { type: "square", radius: 2 }, soundKey: "weapon1Ougi" },
  },
  weapon5: {
    1: { folder: "weapon5/1", frameCount: 50, cost: 9, damage: 70, duration: 3600, maxSize: 430, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon5Ougi" },
    2: { folder: "weapon5/2", frameCount: 65, cost: 13, damage: 180, duration: 3500, maxSize: 520, rangeShape: { type: "cross", distance: 2 }, soundKey: "weapon5Ougi" },
    3: { folder: "weapon5/3", frameCount: 99, cost: 25, damage: 300, duration: 3700, maxSize: 620, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon5Ougi" },
  },
  weapon6: {
    1: { folder: "weapon6/1", frameCount: 45, cost: 13, damage: 80, duration: 3600, maxSize: 430, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon6Ougi" },
    2: { folder: "weapon6/2", frameCount: 52, cost: 25, damage: 170, duration: 3800, maxSize: 520, rangeShape: { type: "line", distance: 6 }, soundKey: "weapon6Ougi" },
    3: { folder: "weapon6/3", frameCount: 86, cost: 27, damage: 280, duration: 3500, maxSize: 620, rangeShape: { type: "forwardRect", distance: 8, halfWidth: 1 }, soundKey: "weapon6Ougi" },
  },
  weapon7: {
    1: { folder: "weapon7/1", frameCount: 56, cost: 9, damage: 100, duration: 3700, maxSize: 430, rangeShape: { type: "line", distance: 5 }, soundKey: "weapon7Ougi" },
    2: { folder: "weapon7/2", frameCount: 71, cost: 17, damage: 200, duration: 3500, maxSize: 520, rangeShape: { type: "forwardRect", distance: 4, halfWidth: 1 }, soundKey: "weapon7Ougi" },
    3: { folder: "weapon7/3", frameCount: 103, cost: 25, damage: 310, duration: 3500, maxSize: 620, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon7Ougi" },
  },
  weapon8: {
    1: { folder: "weapon8/1", frameCount: 57, cost: 9, damage: 80, duration: 3700, maxSize: 430, rangeShape: { type: "line", distance: 8 }, soundKey: "weapon8Ougi" },
    2: { folder: "weapon8/2", frameCount: 75, cost: 25, damage: 150, duration: 3400, maxSize: 520, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon8Ougi" },
    3: { folder: "weapon8/3", frameCount: 121, cost: 25, damage: 280, duration: 3400, maxSize: 620, rangeShape: { type: "cross", distance: 4 }, soundKey: "weapon8Ougi" },
  },
  weapon10: {
    1: { folder: "weapon10/1", frameCount: 68, cost: 25, damage: 80, duration: 3500, maxSize: 430, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon10Ougi" },
    2: { folder: "weapon10/2", frameCount: 82, cost: 29, damage: 180, duration: 3500, maxSize: 520, rangeShape: { type: "cross", distance: 4 }, soundKey: "weapon10Ougi" },
    3: { folder: "weapon10/3", frameCount: 93, cost: 27, damage: 300, duration: 3500, maxSize: 620, rangeShape: { type: "forwardRect", distance: 8, halfWidth: 1 }, soundKey: "weapon10Ougi" },
  },
  weapon11: {
    1: { folder: "weapon11/1", frameCount: 53, cost: 13, damage: 80, duration: 3900, maxSize: 430, rangeShape: { type: "line", distance: 10 }, soundKey: "weapon11Ougi" },
    2: { folder: "weapon11/2", frameCount: 86, cost: 25, damage: 180, duration: 3800, maxSize: 520, rangeShape: { type: "cross", distance: 5 }, soundKey: "weapon11Ougi" },
    3: { folder: "weapon11/3", frameCount: 104, cost: 25, damage: 300, duration: 3800, maxSize: 620, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon11Ougi" },
  },
  weapon12: {
    1: { folder: "weapon12/1", frameCount: 73, cost: 22, damage: 100, duration: 3800, maxSize: 430, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon12Ougi" },
    2: { folder: "weapon12/2", frameCount: 101, cost: 25, damage: 200, duration: 3600, maxSize: 520, rangeShape: { type: "cross", distance: 5 }, soundKey: "weapon12Ougi" },
    3: { folder: "weapon12/3", frameCount: 79, cost: 18, damage: 320, duration: 3500, maxSize: 620, rangeShape: { type: "line", distance: 12 }, soundKey: "weapon12Ougi" },
  },
  weapon13: {
    1: { folder: "weapon13/1", frameCount: 78, cost: 25, damage: 80, duration: 3700, maxSize: 430, rangeShape: { type: "cross", distance: 3 }, soundKey: "weapon13Ougi" },
    2: { folder: "weapon13/2", frameCount: 79, cost: 25, damage: 180, duration: 3700, maxSize: 520, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon13Ougi" },
    3: { folder: "weapon13/3", frameCount: 102, cost: 41, damage: 310, duration: 3700, maxSize: 620, rangeShape: { type: "cross", distance: 6 }, soundKey: "weapon13Ougi" },
  },
  weapon14: {
    1: { folder: "weapon14/1", frameCount: 65, cost: 9, damage: 90, duration: 3800, maxSize: 430, rangeShape: { type: "line", distance: 9 }, soundKey: "weapon14Ougi" },
    2: { folder: "weapon14/2", frameCount: 58, cost: 17, damage: 200, duration: 3600, maxSize: 500, rangeShape: { type: "cross", distance: 3 }, soundKey: "weapon14Ougi" },
    3: { folder: "weapon14/3", frameCount: 110, cost: 25, damage: 320, duration: 3500, maxSize: 620, rangeShape: { type: "diamond", radius: 2 }, soundKey: "weapon14Ougi" },
  },
  weapon15: {
    1: { folder: "weapon15/1", frameCount: 53, cost: 8, damage: 80, duration: 3700, maxSize: 430, rangeShape: { type: "line", distance: 7 }, soundKey: "weapon15Ougi" },
    2: { folder: "weapon15/2", frameCount: 76, cost: 33, damage: 170, duration: 3600, maxSize: 520, rangeShape: { type: "cross", distance: 5 }, soundKey: "weapon15Ougi" },
    3: { folder: "weapon15/3", frameCount: 116, cost: 49, damage: 275, duration: 3700, maxSize: 620, rangeShape: { type: "square", radius: 2 }, soundKey: "weapon15Ougi" },
  },
  weapon16: {
    1: { folder: "weapon16/1", frameCount: 89, cost: 25, damage: 110, duration: 3300, maxSize: 430, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon16Ougi" },
    2: { folder: "weapon16/2", frameCount: 84, cost: 29, damage: 210, duration: 3800, maxSize: 520, rangeShape: { type: "cross", distance: 6 }, soundKey: "weapon16Ougi" },
    3: { folder: "weapon16/3", frameCount: 127, cost: 25, damage: 340, duration: 3500, maxSize: 620, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon16Ougi" },
  },
  weapon19: {
    1: { folder: "weapon19/1", frameCount: 72, cost: 14, damage: 130, duration: 3800, maxSize: 430, rangeShape: { type: "line", distance: 9 }, soundKeys: ["weapon19Ougi1Chid4", "weapon19Ougi1Chid20", "weapon19Ougi1Chid25", "weapon19Ougi1Chid33", "weapon19Ougi1Chid40", "weapon19Ougi1Chid45", "weapon19Ougi1Chid56", "weapon19Ougi1Chid72", "weapon19Ougi1Chid74", "weapon19Ougi1Chid75", "weapon19Ougi1Chid85", "weapon19Ougi1Chid93", "weapon19Ougi1Chid94", "weapon19Ougi1Chid113", "weapon19Ougi1Chid119"], endSoundKey: "weapon19Ougi1Chid975" },
    2: { folder: "weapon19/2", frameCount: 120, cost: 33, damage: 250, duration: 3400, maxSize: 520, rangeShape: { type: "square", radius: 1 }, soundKey: "weapon19Ougi2" },
    3: { folder: "weapon19/3", frameCount: 120, cost: 50, damage: 340, duration: 3300, maxSize: 620, rangeShape: { type: "forwardRect", distance: 9, halfWidth: 1 }, soundKey: "weapon19Ougi3" },
  },
  weapon20: {
    1: { folder: "weapon20/1", frameCount: 100, cost: 25, damage: 110, duration: 3600, maxSize: 430, rangeShape: { type: "line", distance: 5 } },
    2: { folder: "weapon20/2", frameCount: 148, cost: 25, damage: 230, duration: 3700, maxSize: 560, rangeShape: { type: "square", radius: 1 } },
    3: { folder: "weapon20/3", frameCount: 137, cost: 49, damage: 330, duration: 3400, maxSize: 660, rangeShape: { type: "square", radius: 1 } },
  },
};

function ougiSoundKeys(prefix, ids) {
  return ids.map((id) => `${prefix}${id}`);
}

function ougiSoundEvents(prefix, entries) {
  return entries.map(([frame, id]) => ({ frame, key: `${prefix}${id}` }));
}

const ougiSoundOverrides = {
  weapon1: {
    1: { soundKeys: ougiSoundKeys("weapon1Ougi1Chid", [114, 129, 130, 137, 139]) },
    2: { soundKeys: ougiSoundKeys("weapon1Ougi2Chid", [133, 144, 145, 155, 164, 166]) },
    3: { soundKeys: ougiSoundKeys("weapon1Ougi3Chid", [170, 181, 186, 187, 188, 189, 190, 199]) },
  },
  weapon5: {
    1: { soundKeys: ougiSoundKeys("weapon5Ougi1Chid", [83, 94, 95, 110, 114]) },
    2: { soundKeys: ougiSoundKeys("weapon5Ougi2Chid", [93, 104, 109, 113, 114, 122, 126]) },
    3: { soundKeys: ougiSoundKeys("weapon5Ougi3Chid", [114, 125, 134, 139, 143, 144, 145, 146, 154, 158]) },
  },
  weapon6: {
    1: { soundKeys: ougiSoundKeys("weapon6Ougi1Chid", [316, 362, 373, 378, 387, 391]) },
    2: { soundKeys: ougiSoundKeys("weapon6Ougi2Chid", [316, 359, 383, 384, 385, 389]) },
    3: { soundKeys: ougiSoundKeys("weapon6Ougi3Chid", [316, 380, 391, 405, 406, 411, 415]) },
  },
  weapon7: {
    1: { soundKeys: ougiSoundKeys("weapon7Ougi1Chid", [180, 227, 244, 255, 259]) },
    2: { soundKeys: ougiSoundKeys("weapon7Ougi2Chid", [180, 235, 252, 261, 267, 271]) },
    3: { soundKeys: ougiSoundKeys("weapon7Ougi3Chid", [180, 264, 284, 291, 304, 305, 309, 313]) },
  },
  weapon8: {
    1: { soundKeys: ougiSoundKeys("weapon8Ougi1Chid", [229, 267, 283, 287]) },
    2: { soundKeys: ougiSoundKeys("weapon8Ougi2Chid", [229, 279, 299, 304, 308]) },
    3: { soundKeys: ougiSoundKeys("weapon8Ougi3Chid", [229, 294, 311, 316, 317, 327, 331]) },
  },
  weapon10: {
    1: { soundFrameCount: 78, soundEvents: ougiSoundEvents("weapon10Ougi1Chid", [[2, 599], [15, 610], [25, 611], [27, 635], [27, 636], [31, 637], [39, 637], [42, 660], [51, 661], [60, 665], [62, 665], [76, 610]]) },
    2: { soundFrameCount: 90, soundEvents: ougiSoundEvents("weapon10Ougi2Chid", [[2, 612], [13, 623], [20, 639], [20, 640], [23, 641], [26, 642], [29, 645], [32, 642], [32, 646], [34, 645], [37, 647], [38, 640], [40, 670], [43, 640], [62, 671], [65, 675], [67, 675], [88, 623]]) },
    3: { soundFrameCount: 101, soundEvents: ougiSoundEvents("weapon10Ougi3Chid", [[2, 661], [13, 672], [20, 688], [20, 689], [23, 690], [26, 691], [32, 697], [32, 698], [34, 697], [36, 697], [37, 699], [38, 697], [40, 697], [40, 700], [42, 697], [42, 701], [44, 697], [46, 697], [46, 701], [48, 697], [50, 697], [50, 701], [52, 697], [54, 697], [54, 701], [54, 705], [56, 697], [58, 697], [58, 701], [58, 705], [64, 706], [76, 710], [78, 710], [99, 672]]) },
  },
  weapon11: {
    1: { soundKeys: ougiSoundKeys("weapon11Ougi1Chid", [204, 205, 238, 249, 250, 255, 256, 260, 264]) },
    2: { soundKeys: ougiSoundKeys("weapon11Ougi2Chid", [204, 205, 245, 256, 265, 269, 275, 283, 284, 286, 299]) },
    3: { soundKeys: ougiSoundKeys("weapon11Ougi3Chid", [204, 205, 267, 278, 287, 288, 293, 294, 295, 299, 301, 312, 331, 338]) },
  },
  weapon12: {
    1: { soundKeys: ougiSoundKeys("weapon12Ougi1Chid", [305, 369, 380, 382, 394, 398, 405]) },
    2: { soundKeys: ougiSoundKeys("weapon12Ougi2Chid", [305, 388, 403, 419, 420, 421, 423, 438]) },
    3: { soundKeys: ougiSoundKeys("weapon12Ougi3Chid", [305, 354, 365, 370, 378, 382, 383, 384, 385]) },
  },
  weapon13: {
    1: { soundKeys: ougiSoundKeys("weapon13Ougi1Chid", [204, 214, 288, 299, 315, 320, 327, 331, 332, 333, 335, 336, 340, 351]) },
    2: { soundKeys: ougiSoundKeys("weapon13Ougi2Chid", [204, 214, 279, 305, 306, 311, 322, 323, 324, 325, 326, 330, 341]) },
    3: { soundKeys: ougiSoundKeys("weapon13Ougi3Chid", [204, 214, 299, 325, 326, 331, 342, 343, 344, 345, 346, 350, 361]) },
  },
  weapon14: {
    1: { soundKeys: ougiSoundKeys("weapon14Ougi1Chid", [222, 223, 291, 306, 307, 333, 339]) },
    2: { soundKeys: ougiSoundKeys("weapon14Ougi2Chid", [222, 223, 267, 288, 289, 295, 301, 302]) },
    3: { soundKeys: ougiSoundKeys("weapon14Ougi3Chid", [222, 223, 334, 349, 350, 351, 366, 372, 381, 382]) },
  },
  weapon15: {
    1: { soundKeys: ougiSoundKeys("weapon15Ougi1Chid", [188, 234, 245, 265, 274, 282, 283]) },
    2: { soundKeys: ougiSoundKeys("weapon15Ougi2Chid", [188, 234, 257, 296, 305, 313, 314]) },
    3: { soundKeys: ougiSoundKeys("weapon15Ougi3Chid", [188, 235, 254, 293, 298, 303, 304, 312, 320, 321]) },
  },
  weapon16: {
    1: { soundKeys: ougiSoundKeys("weapon16Ougi1Chid", [12, 238, 253, 258, 259, 279, 292, 293]) },
    2: { soundKeys: ougiSoundKeys("weapon16Ougi2Chid", [12, 234, 249, 254, 255, 287, 288]) },
    3: { soundKeys: ougiSoundKeys("weapon16Ougi3Chid", [12, 249, 264, 265, 285, 294, 295, 312, 313]) },
  },
  weapon19: {
    2: { soundKeys: ougiSoundKeys("weapon19Ougi2Chid", [4, 20, 25, 33, 40, 45, 56, 72, 74, 75, 85, 93, 94, 113, 119, 975, 1088]) },
    3: { soundKeys: ougiSoundKeys("weapon19Ougi3Chid", [4, 20, 25, 33, 40, 45, 56, 72, 74, 75, 85, 93, 94, 113, 119, 975]) },
  },
  weapon20: {
    1: { soundFrameCount: 155, soundEvents: ougiSoundEvents("weapon20Ougi1Chid", [[3, 434], [17, 447], [33, 448], [47, 494], [48, 495], [50, 496], [53, 314], [61, 497], [74, 498], [82, 447], [121, 513], [126, 513], [144, 514], [155, 498]]) },
    2: { soundFrameCount: 244, soundEvents: ougiSoundEvents("weapon20Ougi2Chid", [[3, 446], [14, 459], [31, 460], [44, 516], [45, 517], [49, 314], [51, 518], [57, 519], [64, 518], [73, 519], [79, 520], [81, 518], [97, 518], [98, 525], [103, 526], [109, 518], [112, 518], [113, 459], [140, 551], [143, 552], [148, 553], [181, 559], [209, 565], [212, 565], [233, 526], [244, 566]]) },
    3: { soundFrameCount: 380, soundEvents: ougiSoundEvents("weapon20Ougi3Chid", [[3, 451], [17, 467], [32, 514], [33, 515], [36, 514], [41, 516], [42, 517], [46, 314], [48, 518], [52, 519], [55, 518], [58, 520], [90, 514], [93, 514], [103, 523], [104, 309], [111, 514], [113, 467], [126, 531], [129, 531], [135, 531], [142, 531], [147, 531], [150, 531], [151, 531], [182, 531], [183, 531], [214, 531], [215, 531], [248, 531], [249, 537], [250, 531], [253, 531], [254, 537], [255, 531], [258, 531], [259, 537], [260, 531], [262, 514], [264, 531], [265, 537], [266, 531], [268, 514], [270, 531], [271, 537], [335, 538], [346, 545], [349, 545], [380, 520]]) },
  },
};

Object.entries(ougiSoundOverrides).forEach(([weaponKey, slots]) => {
  Object.entries(slots).forEach(([slot, config]) => {
    const definition = ougiDefinitions[weaponKey]?.[slot];
    if (!definition) return;
    delete definition.soundKey;
    delete definition.soundKeys;
    delete definition.soundEvents;
    delete definition.soundFrameCount;
    Object.assign(definition, config);
  });
});

const ougiFrames = Object.fromEntries(Object.entries(ougiDefinitions).map(([weaponKey, slots]) => [
  weaponKey,
  Object.fromEntries(Object.keys(slots).map((slot) => [slot, { right: [], left: [], up: [], down: [] }])),
]));
const ougiBodyFrames = Object.fromEntries(Object.entries(ougiDefinitions).map(([weaponKey, slots]) => [
  weaponKey,
  Object.fromEntries(Object.keys(slots).map((slot) => [slot, { right: [], left: [], up: [], down: [] }])),
]));
const ougiFxFrames = Object.fromEntries(Object.entries(ougiDefinitions).map(([weaponKey, slots]) => [
  weaponKey,
  Object.fromEntries(Object.keys(slots).map((slot) => [slot, { right: [], left: [], up: [], down: [] }])),
]));

