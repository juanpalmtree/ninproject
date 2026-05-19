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

