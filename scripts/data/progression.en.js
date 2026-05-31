const defaultPlayerLevel = 1;

const levelExpRequirements = [
  0,
  0, 800, 1600, 2400, 3200, 4700, 6200, 7700, 9200, 10000,
  21000, 32000, 43000, 54000, 65000, 76000, 87000, 98000, 109000, 120000,
  135000, 150000, 165000, 180000, 195000, 210000, 225000, 240000, 255000, 270000,
  287000, 304000, 321000, 338000, 355000, 372000, 389000, 406000, 423000, 440000,
  460000, 480000, 500000, 520000, 540000, 560000, 580000, 600000, 620000, 640000,
  661000, 682000, 703000, 724000, 745000, 766000, 787000, 808000, 829000, 850000,
  875000, 900000, 925000, 950000, 975000, 1000000, 1025000, 1050000, 1075000, 1100000,
  1127000, 1154000, 1181000, 1208000, 1235000, 1262000, 1289000, 1316000, 1343000, 1370000,
  1400000, 1430000, 1460000, 1490000, 1520000, 1550000, 1580000, 1610000, 1640000, 1670000,
  1710000, 1750000, 1790000, 1830000, 1870000, 1910000, 1950000, 1990000, 2030000, 2070000,
  2170000, 2270000, 2370000, 2470000, 2570000, 2670000, 2770000, 2870000, 2970000, 3070000,
  3270000, 3470000, 3670000, 3870000, 4070000, 4270000, 4470000, 4670000, 4870000, 5070000,
  5370000, 5670000, 5970000, 6270000, 6570000, 6870000, 7170000, 7470000, 7770000, 8070000,
  8420000, 8770000, 9120000, 9470000, 9820000, 10170000, 10520000, 10870000, 11220000, 11570000,
  11970000, 12370000, 12770000, 13170000, 13570000, 13970000, 14370000, 14770000, 15170000, 15570000,
];

const maxProgressionLevel = levelExpRequirements.length - 1;
const defaultPlayerExp = levelExpRequirements[defaultPlayerLevel];
const classUnlockLevel = 101;

const progressionClasses = [
  { id: "onmyoji", title: "Onmyoji", rankMarkFrame: 15 },
  { id: "nightBlade", title: "Night Blade", rankMarkFrame: 14 },
];

const specialRankMarks = [
  { id: "disciplinarian", title: "Disciplinarian", rankMarkFrame: 16 },
  { id: "godfather", title: "Godfather", rankMarkFrame: 17 },
];

const rankTitleUnlocks = [
  { level: 1, title: "Shoshinsha", rankMarkFrame: 1 },
  { level: 8, title: "Genin", rankMarkFrame: 2 },
  { level: 16, title: "Chunin", rankMarkFrame: 3 },
  { level: 25, title: "Jonin", rankMarkFrame: 4 },
  { level: 30, title: "Huurai Nin", rankMarkFrame: 5 },
  { level: 35, title: "Yuushi", rankMarkFrame: 6 },
  { level: 40, title: "Iga Ninja", rankMarkFrame: 7 },
  { level: 50, title: "Rappa", rankMarkFrame: 8 },
  { level: 60, title: "Anbu", rankMarkFrame: 9 },
  { level: 70, title: "Kage-musha", rankMarkFrame: 10 },
  { level: 80, title: "Huuma", rankMarkFrame: 11 },
  { level: 90, title: "Kage-boushi", rankMarkFrame: 12 },
  { level: 95, title: "Ninja Master", rankMarkFrame: 13 },
  { level: 101, title: "Onmyoji or Night Blade", rankMarkFrame: 13 },
];

const rankMarkAssetRoot = "assets/ui/rank-marks";

const ninjutsuUnlocks = [
  { level: 7, name: "HealBall" },
  { level: 10, name: "Koban" },
  { level: 13, name: "Kusa" },
  { level: 18, name: "Steel" },
  { level: 20, name: "Lightning" },
  { level: 23, name: "Jinton" },
  { level: 26, name: "HealLight" },
  { level: 29, name: "Dokuton" },
  { level: 31, name: "Heat" },
  { level: 35, name: "FireBall" },
  { level: 38, name: "Hu-ton" },
  { level: 42, name: "Bunshi" },
  { level: 45, name: "Ishi" },
  { level: 48, name: "Steal" },
  { level: 52, name: "KingKong" },
  { level: 55, name: "AirBlast" },
  { level: 58, name: "HolyLight" },
  { level: 61, name: "Kami" },
  { level: 64, name: "Wild" },
  { level: 67, name: "Explode" },
  { level: 70, name: "Mokuton" },
  { level: 73, name: "Akaoni" },
  { level: 76, name: "Katon" },
  { level: 79, name: "Freeze" },
  { level: 81, name: "Yasha" },
  { level: 84, name: "Kinton" },
  { level: 87, name: "Thunderbolt" },
  { level: 91, name: "Storm" },
  { level: 94, name: "Seven" },
  { level: 98, name: "IceArrow" },
  { level: 100, name: "Gama" },
  { level: 101, name: "Angel", branch: "Onmyoji" },
  { level: 102, name: "BluePests", branch: "Onmyoji" },
  { level: 104, name: "Death", branch: "Night Blade" },
  { level: 105, name: "RedPests", branch: "Onmyoji" },
  { level: 106, name: "Kubi", branch: "Onmyoji" },
  { level: 107, name: "Butsumetsu", branch: "Night Blade" },
  { level: 108, name: "Mouryo", branch: "Onmyoji" },
];

function expForLevel(level) {
  const normalizedLevel = Math.max(1, Math.min(maxProgressionLevel, Math.floor(Number(level) || 1)));
  return levelExpRequirements[normalizedLevel] || 0;
}

function levelForExp(exp) {
  const normalizedExp = Math.max(0, Math.floor(Number(exp) || 0));
  let level = 1;
  for (let i = 1; i <= maxProgressionLevel; i++) {
    if (normalizedExp < levelExpRequirements[i]) break;
    level = i;
  }
  return level;
}

function normalizedClassBranch(branch) {
  const normalizedBranch = String(branch || "").toLowerCase().replace(/[^a-z]/g, "");
  return progressionClasses.find((progressionClass) => (
    progressionClass.id.toLowerCase() === normalizedBranch
    || progressionClass.title.toLowerCase().replace(/[^a-z]/g, "") === normalizedBranch
  ))?.title || "";
}

function classForLevel(level, branch = "") {
  const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
  return normalizedLevel >= classUnlockLevel ? normalizedClassBranch(branch) : "";
}

function rankForLevel(level, branch = "") {
  const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
  const classTitle = classForLevel(normalizedLevel, branch);
  if (classTitle) return classTitle;
  let rank = rankTitleUnlocks[0].title;
  for (const unlock of rankTitleUnlocks) {
    if (normalizedLevel >= unlock.level) rank = unlock.title;
  }
  return rank;
}

function rankMarkFrameForLevel(level, branch = "") {
  const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
  const classTitle = classForLevel(normalizedLevel, branch);
  if (classTitle) {
    return progressionClasses.find((progressionClass) => progressionClass.title === classTitle)?.rankMarkFrame || 1;
  }
  let rankMarkFrame = rankTitleUnlocks[0].rankMarkFrame;
  for (const unlock of rankTitleUnlocks) {
    if (normalizedLevel >= unlock.level) rankMarkFrame = unlock.rankMarkFrame;
  }
  return rankMarkFrame;
}

function rankMarkPathForLevel(level, branch = "") {
  return `${rankMarkAssetRoot}/${rankMarkFrameForLevel(level, branch)}.svg`;
}

function progressionSummaryForExp(exp, branch = "") {
  const level = levelForExp(exp);
  const currentExp = Math.max(0, Math.floor(Number(exp) || 0));
  const classTitle = classForLevel(level, branch);
  const currentLevelExp = expForLevel(level);
  const nextLevelExp = level < maxProgressionLevel ? expForLevel(level + 1) : null;
  return {
    exp: currentExp,
    level,
    rankTitle: rankForLevel(level, classTitle),
    rankMarkFrame: rankMarkFrameForLevel(level, classTitle),
    rankMarkPath: rankMarkPathForLevel(level, classTitle),
    classBranch: classTitle,
    classTitle,
    classChoiceAvailable: level >= classUnlockLevel && !classTitle,
    currentLevelExp,
    nextLevelExp,
    expIntoLevel: Math.max(0, currentExp - currentLevelExp),
    expToNextLevel: nextLevelExp === null ? 0 : Math.max(0, nextLevelExp - currentExp),
  };
}

function normalizedProgressionProfile(profile = {}) {
  const progression = progressionSummaryForExp(profile.exp, profile.classBranch);
  return {
    ...profile,
    exp: progression.exp,
    level: progression.level,
    rankTitle: progression.rankTitle,
    rankMarkFrame: progression.rankMarkFrame,
    rankMarkPath: progression.rankMarkPath,
    classBranch: progression.classBranch,
    classTitle: progression.classTitle,
  };
}

function syncProgressionProfile(profile = {}) {
  return Object.assign(profile, normalizedProgressionProfile(profile));
}

function awardExpToProfile(profile = {}, amount = 0) {
  const previous = progressionSummaryForExp(profile.exp, profile.classBranch);
  const expAwarded = Math.max(0, Math.floor(Number(amount) || 0));
  profile.exp = previous.exp + expAwarded;
  const current = syncProgressionProfile(profile);
  return {
    ...progressionSummaryForExp(current.exp, current.classBranch),
    expAwarded,
    previousLevel: previous.level,
    levelsGained: current.level - previous.level,
    profile: current,
  };
}

function selectClassForProfile(profile = {}, branch = "") {
  const progression = progressionSummaryForExp(profile.exp, profile.classBranch);
  const classBranch = normalizedClassBranch(branch);
  if (progression.level < classUnlockLevel || !classBranch) return false;
  profile.classBranch = classBranch;
  syncProgressionProfile(profile);
  return true;
}

function ninjutsuUnlocksForLevel(level, branch = "") {
  const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
  const classBranch = normalizedClassBranch(branch);
  return ninjutsuUnlocks.filter((unlock) => (
    normalizedLevel >= unlock.level
    && (!unlock.branch || !classBranch || unlock.branch === classBranch)
  ));
}
