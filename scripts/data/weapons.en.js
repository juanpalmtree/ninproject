// Weapon data is kept declarative so new weapons can be added without changing combat code.
const defaultWeaponKey = "weapon1";
const weaponDefinitions = [
  { key: "weapon1", label: "Kunai", folder: "1苦無", frameCount: 12, cooldownMs: 500, area: "single", damage: 50 },
  { key: "weapon3", label: "Nodachi", folder: "3忍太刀", frameCount: 24, cooldownMs: 1000, area: "nodachi", damage: 50 },
  { key: "weapon4", label: "Iga Hidden Blade", folder: "4伊賀密刀", frameCount: 13, cooldownMs: 500, area: "line2", damage: 50 },
  { key: "weapon6", label: "Shiranui Iron Fan", folder: "6鐵扇不知火", frameCount: 9, cooldownMs: 300, area: "fan", damage: 25 },
  { key: "weapon19", label: "Muramasa", folder: "19Weapon19", frameCount: 13, cooldownMs: 500, area: "surround", damage: 50, soundKey: "muramasaSlash" },
  { key: "weapon20", label: "Weapon 20", folder: "20Weapon20", frameCount: 10, cooldownMs: 500, area: "wide331", damage: 50, soundKey: "weapon20Slash" },
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
  weapon19: {
    1: { folder: "weapon19/1", frameCount: 72, cost: 33, damage: 90, duration: 2750, maxSize: 430, soundKeys: ["weapon19Ougi1Chid4", "weapon19Ougi1Chid20", "weapon19Ougi1Chid25", "weapon19Ougi1Chid33", "weapon19Ougi1Chid40", "weapon19Ougi1Chid45", "weapon19Ougi1Chid56", "weapon19Ougi1Chid72", "weapon19Ougi1Chid74", "weapon19Ougi1Chid75", "weapon19Ougi1Chid85", "weapon19Ougi1Chid93", "weapon19Ougi1Chid94", "weapon19Ougi1Chid113", "weapon19Ougi1Chid119"], endSoundKey: "weapon19Ougi1Chid975" },
    2: { folder: "weapon19/2", frameCount: 120, cost: 66, damage: 150, duration: 4590, maxSize: 520, soundKey: "weapon19Ougi2" },
    3: { folder: "weapon19/3", frameCount: 126, cost: 100, damage: 240, duration: 4820, maxSize: 620, soundKey: "weapon19Ougi3" },
  },
  weapon20: {
    1: { folder: "weapon20/1", frameCount: 100, cost: 33, damage: 90, duration: 3830, maxSize: 430 },
    2: { folder: "weapon20/2", frameCount: 148, cost: 66, damage: 150, duration: 5660, maxSize: 560 },
    3: { folder: "weapon20/3", frameCount: 137, cost: 100, damage: 240, duration: 5240, maxSize: 660 },
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

