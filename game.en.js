// ===== DOM / Canvas =====
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const statusEl = document.querySelector("#status");
const unitInfoEl = document.querySelector("#unitInfo");
const skillFillEl = document.querySelector("#skillFill");
const resetBtn = document.querySelector("#resetBtn");
const battleStartBtn = document.querySelector("#battleStartBtn");
const musicVolumeInput = document.querySelector("#musicVolume");
const sfxVolumeInput = document.querySelector("#sfxVolume");
const ruleModeToggle = document.querySelector("#ruleModeToggle");
const ruleModeCheckbox = document.querySelector("#ruleModeCheckbox");
const ruleModeLabel = document.querySelector("#ruleModeLabel");
const modePreviewBtn = document.querySelector("#modePreviewBtn");
const modeTitleEl = document.querySelector("#modeTitle");
const teamEditBtn = document.querySelector("#teamEditBtn");
const roomInventoryBtn = document.querySelector("#roomInventoryBtn");
const roomInventoryPanel = document.querySelector("#roomInventoryPanel");
const roomInventoryList = document.querySelector("#roomInventoryList");
const ninjuEditorEl = document.querySelector("#ninjuEditor");
const ninjuEditorSlotsEl = document.querySelector("#ninjuEditorSlots");
const ninjuEditorListEl = document.querySelector("#ninjuEditorList");
const ninjuEditorResetBtn = document.querySelector("#ninjuEditorReset");
const ninjuEditorCancelBtn = document.querySelector("#ninjuEditorCancel");
const ninjuEditorSaveBtn = document.querySelector("#ninjuEditorSave");
const ninjuEditorLevelEl = document.querySelector("#ninjuEditorLevel");
const ninjuEditorRoleEl = document.querySelector("#ninjuEditorRole");
const ninjuEditorRankMarkEl = document.querySelector("#ninjuEditorRankMark");
const ninjuEditorAvatarEyeEl = document.querySelector("#ninjuEditorAvatarEye");
const ninjuEditorTabEls = Array.from(document.querySelectorAll(".ninju-editor-tabs button"));
const roomCardEls = Array.from(document.querySelectorAll(".room-player-card"));
const weaponSelectEls = Array.from(document.querySelectorAll(".room-weapon-select"));
const controlSelectEls = Array.from(document.querySelectorAll(".room-control-select"));
const hpInputEls = Array.from(document.querySelectorAll(".room-hp-input"));
const roomLeaveBtn = document.querySelector(".room-leave-btn");
const roomFrameEl = document.querySelector(".room-frame");
const flowScreenEls = Array.from(document.querySelectorAll(".app-flow-screen"));
const loginNameInput = document.querySelector("#loginNameInput");
const loginContinueBtn = document.querySelector("#loginContinueBtn");
const characterListEl = document.querySelector("#characterList");
const newCharacterBtn = document.querySelector("#newCharacterBtn");
const cancelCreateCharacterBtn = document.querySelector("#cancelCreateCharacterBtn");
const saveCharacterBtn = document.querySelector("#saveCharacterBtn");
const characterNameInput = document.querySelector("#characterNameInput");
const characterTeamSelect = document.querySelector("#characterTeamSelect");
const characterEyeSelect = document.querySelector("#eyesSelect, #characterEyeSelect");
let characterHairSelect = document.querySelector("#hairSelect, #characterHairSelect");
let characterDressSelect = document.querySelector("#dressSelect, #characterDressSelect");
let characterHatSelect = document.querySelector("#hatSelect, #characterHatSelect");
const createAvatarPreview = document.querySelector("#createAvatarPreview");
const selectedCharacterTitle = document.querySelector("#selectedCharacterTitle");
const mapLocationNameEl = document.querySelector("#mapLocationName");
const nekomataLocationZonesEl = document.querySelector("#nekomataLocationZones");
const nekomataReturnBtn = document.querySelector("#nekomataReturnBtn");
const changeCharacterBtn = document.querySelector("#changeCharacterBtn");
const commonRoomBtn = document.querySelector("#commonRoomBtn");
const profileMapBtn = document.querySelector("#profileMapBtn");
const battleMapBtn = document.querySelector("#battleMapBtn");
const commonRoomMapBtn = document.querySelector("#commonRoomMapBtn");
const commonRoomBattleBtn = document.querySelector("#commonRoomBattleBtn");
const commonCharacterName = document.querySelector("#commonCharacterName");
const commonCharacterRank = document.querySelector("#commonCharacterRank");
const commonCharacterRankMark = document.querySelector("#commonCharacterRankMark");
const commonAvatarSlot = document.querySelector("#commonAvatarSlot");
const commonAvatarEyes = document.querySelector("#commonAvatarEyes");
const villageRoomListPanel = document.querySelector("#villageRoomListPanel");

// ===== Runtime State =====
const state = {
  appScreen: "login",
  inRoom: true,
  units: [],
  selectedId: 1,
  pointer: { x: 0, y: 0, cell: null },
  pressedUnit: null,
  pressTime: 0,
  dragMoved: false,
  charging: false,
  message: "Ready",
  gameOver: false,
  countdownStart: 0,
  matchStart: 0,
  matchEnd: 0,
  result: null,
  resultClickableAt: 0,
  startSoundPlayed: false,
  endSoundPlayed: false,
  endSoundInstance: null,
  pulse: 0,
  lastFrame: performance.now(),
  projectiles: [],
  moneyDartCasts: [],
  ninjuDamageEffects: [],
  ougiCasts: [],
  deathAnimations: [],
  pendingResult: null,
  resultOverlayAt: 0,
  gameMode: "random",
  yashaoEffects: [],
  ougiKeyDown: false,
  ruleModeKey: "n3",
  useOriginalMode: false,
  playerStorage: {},
};

// Eye overlays are positioned relative to the unit center.
// Positive x moves right; positive y moves down.
const eyeOffsets = {
  down: { x: -14, y: -25, w: 30, h: 13 },
  up: null,
  right: { x: 3, y: -26, w: 20, h: 15 },
  left: { x: -19, y: -26, w: 20, h: 15 },
};
// Measured from the Nindou 3 body PNGs. Eye positions are derived from these
// face bounds so the overlay stays centered when scale changes.
const nindou3FaceBounds = {
  down: { x: 5, y: 11, w: 29, h: 17, eyeW: 26, eyeH: 12, biasX: 0, biasY: 0 },
  up: null,
  right: { x: 20, y: 10, w: 21, h: 17, eyeW: 16, eyeH: 13, biasX: 0, biasY: 0 },
  left: { x: 2, y: 10, w: 20, h: 17, eyeW: 16, eyeH: 13, biasX: 0, biasY: 0 },
};
const nindou3EyeOffsets = {
  down: { x: -14, y: -13, w: 24, h: 11 },
  up: null,
  right: { x: 6, y: -17, w: 13, h: 11 },
  left: { x: -13, y: -17, w: 13, h: 11 },
};
const nindou3SpriteScale = 0.98;
const steelOutlineCache = new WeakMap();
const hotBloodOutlineCache = new WeakMap();
const fireToadFrameBoundsCache = new WeakMap();
const weaponFrameBoundsCache = new WeakMap();
const ougiFrameBoundsCache = new WeakMap();
const ougiBodyTeamFrameCache = new WeakMap();
const ougiBodyFaceBoundsCache = new WeakMap();
const directedOugiFrameCache = new WeakMap();
const eyeFrameBoundsCache = new WeakMap();
// Rendering guardrail: tune weapon-specific visuals here instead of changing
// shared animation rules that can regress already-polished weapons.
const weaponRenderProfiles = {
  default: {
    attack: { scale: 1, anchorDistance: { x: 34, y: 31 }, useVisibleAnchor: false },
    hand: { scale: 1, anchorDistance: { x: 34, y: 31 }, useVisibleAnchor: false },
    ougi: { center: false, anchorBody: false, exactFrames: false, directionTransform: false },
  },
  weapon4: {
    attack: { scale: 0.5 },
  },
  weapon6: {
    attack: { scale: 0.8 },
    hand: { scale: 0.72 },
  },
  weapon10: {
    attack: { scale: 0.78, anchorDistance: { x: 24, y: 20 }, useVisibleAnchor: true, visibleAnchorOffset: { x: 0, y: -20 } },
    hand: { scale: 0.78, anchorDistance: { x: 20, y: 18 }, useVisibleAnchor: true, visibleAnchorOffset: { x: 0, y: -18 } },
    ougi: {
      center: true,
      anchorBody: false,
      exactFrames: false,
      directionTransformSlots: { 3: true },
      slotProfiles: {
        3: { faceAnchorBody: false },
      },
    },
  },
  weapon20: {
    attack: { scale: 1, anchorDistance: { x: 34, y: 31 }, useVisibleAnchor: false },
    hand: { scale: 1, anchorDistance: { x: 34, y: 31 }, useVisibleAnchor: false },
    ougi: {
      center: true,
      anchorBody: false,
      exactFrameLayers: { body: true },
      slotProfiles: {
        2: {
          overlays: [
            { imageKey: "seigaihaOugi2Phantom", startFrame: 88, endFrame: 109, frameCount: 148, offset: { x: 0, y: -24 } },
          ],
        },
      },
    },
  },
};
// Match-end win/loss animations advance at the same frame speed.
const matchEndFrameMs = 75;
const yashaoHiddenIntroMs = 3000;
const yashaoAiStartDelayMs = 5000;
const yashaoFrozenIntroMs = Math.max(0, yashaoAiStartDelayMs - yashaoHiddenIntroMs);
const itemSlotStartX = 510;
const itemSlotY = 558;
const itemSlotW = 38;
const itemSlotH = 34;
const itemSlotGap = 6;
const progressionUiVisible = true;
const ninjuTestingFullAccess = true;
const ninjuCatalog = [
  { type: "genki", label: "HealBall", unlockName: "HealBall", series: "restore", group: "heal", editorRow: "heal", editorOrder: 1, implemented: true },
  { type: "kakki", label: "HealLight", unlockName: "HealLight", series: "restore", group: "heal", editorRow: "heal", editorOrder: 2, implemented: true },
  { type: "shinki", label: "HolyLight", unlockName: "HolyLight", series: "restore", group: "heal", editorRow: "heal", editorOrder: 3, implemented: true },
  { type: "lightning", label: "Lightning", unlockName: "Lightning", series: "attack", group: "attack", editorRow: "attack", editorOrder: 1, implemented: true },
  { type: "fireBall", label: "FireBall", unlockName: "FireBall", series: "attack", group: "attack", editorRow: "attack", editorOrder: 2, implemented: true },
  { type: "airBlast", label: "AirBlast", unlockName: "AirBlast", series: "attack", group: "attack", editorRow: "attack", editorOrder: 3, implemented: true },
  { type: "explode", label: "Explode", unlockName: "Explode", series: "attack", group: "attack", editorRow: "attack", editorOrder: 4, implemented: true },
  { type: "freeze", label: "Freeze", unlockName: "Freeze", series: "attack", group: "attack", editorRow: "attack", editorOrder: 5, implemented: true },
  { type: "thunderbolt", label: "Thunderbolt", unlockName: "Thunderbolt", series: "attack", group: "attack", editorRow: "attack", editorOrder: 6, implemented: true },
  { type: "storm", label: "Storm", unlockName: "Storm", series: "attack", group: "attack", editorRow: "attack", editorOrder: 7, implemented: true },
  { type: "iceArrow", label: "IceArrow", unlockName: "IceArrow", series: "attack", group: "attack", editorRow: "attack", editorOrder: 8, implemented: true },
  { type: "steel", label: "Steel", unlockName: "Steel", series: "assist", group: "buff", editorRow: "support", editorOrder: 1, implemented: true },
  { type: "hotBlood", label: "Heat", unlockName: "Heat", series: "assist", group: "buff", editorRow: "support", editorOrder: 2, implemented: true },
  { type: "kingKong", label: "KingKong", unlockName: "KingKong", series: "assist", group: "buff", editorRow: "support", editorOrder: 3, implemented: false },
  { type: "wild", label: "Wild", unlockName: "Wild", series: "assist", group: "buff", editorRow: "support", editorOrder: 4, implemented: false },
  { type: "bluePests", label: "BluePests", unlockName: "BluePests", series: "assist", group: "buff", editorRow: "support", editorOrder: 5, implemented: false },
  { type: "redPests", label: "RedPests", unlockName: "RedPests", series: "assist", group: "buff", editorRow: "support", editorOrder: 6, implemented: false },
  { type: "purify", label: "Purify", unlockName: "Purify", series: "assist", group: "buff", editorRow: "support", editorOrder: 7, implemented: false },
  { type: "kusa", label: "Kusa", unlockName: "Kusa", series: "special", group: "special", editorRow: "special", editorOrder: 1, implemented: false },
  { type: "ishi", label: "Ishi", unlockName: "Ishi", series: "special", group: "special", editorRow: "special", editorOrder: 2, implemented: false },
  { type: "kami", label: "Kami", unlockName: "Kami", series: "special", group: "special", editorRow: "special", editorOrder: 3, implemented: false },
  { type: "jinton", label: "Jinton", unlockName: "Jinton", series: "special", group: "special", editorRow: "special", editorOrder: 4, implemented: false },
  { type: "huTon", label: "Hu-ton", unlockName: "Hu-ton", series: "special", group: "special", editorRow: "special", editorOrder: 5, implemented: false },
  { type: "dokuton", label: "Dokuton", unlockName: "Dokuton", series: "special", group: "special", editorRow: "special", editorOrder: 6, implemented: false },
  { type: "mokuton", label: "Mokuton", unlockName: "Mokuton", series: "special", group: "special", editorRow: "special", editorOrder: 7, implemented: false },
  { type: "katon", label: "Katon", unlockName: "Katon", series: "special", group: "special", editorRow: "special", editorOrder: 8, implemented: false },
  { type: "kinton", label: "Kinton", unlockName: "Kinton", series: "special", group: "special", editorRow: "special", editorOrder: 9, implemented: false },
  { type: "moneyDart", label: "Koban", unlockName: "Koban", series: "special", group: "projectile", editorRow: "special", editorOrder: 10, implemented: true },
  { type: "bunshin", label: "Bunshin", unlockName: "Bunshi", series: "special", group: "special", editorRow: "special", editorOrder: 11, implemented: false },
  { type: "steal", label: "Steal", unlockName: "Steal", series: "special", group: "special", editorRow: "special", editorOrder: 12, implemented: false },
  { type: "seven", label: "Seven", unlockName: "Seven", series: "special", group: "special", editorRow: "special", editorOrder: 13, implemented: true },
  { type: "butsumetsu", label: "Butsu", unlockName: "Butsumetsu", series: "special", group: "special", editorRow: "special", editorOrder: 14, implemented: true },
  { type: "chaos", label: "Chaos", unlockName: "Chaos", series: "special", group: "special", editorRow: "special", editorOrder: 15, implemented: false },
  { type: "naraku", label: "Naraku", unlockName: "Naraku", series: "special", group: "special", editorRow: "special", editorOrder: 16, implemented: false },
  { type: "yasha", label: "Yasha", unlockName: "Yasha", series: "transform", group: "transform", editorRow: "transform", editorOrder: 1, implemented: false },
  { type: "akaoni", label: "Akaoni", unlockName: "Akaoni", series: "transform", group: "transform", editorRow: "transform", editorOrder: 2, implemented: false },
  { type: "fireToad", label: "Gama", unlockName: "Gama", series: "transform", group: "transform", editorRow: "transform", editorOrder: 3, implemented: true },
  { type: "kubi", label: "Kubi", unlockName: "Kubi", series: "summon", group: "summon", editorRow: "summon", editorOrder: 1, implemented: false },
  { type: "mouryo", label: "Mouryo", unlockName: "Mouryo", series: "summon", group: "summon", editorRow: "summon", editorOrder: 2, implemented: true },
  { type: "death", label: "Death", unlockName: "Death", series: "summon", group: "summon", editorRow: "summon", editorOrder: 3, implemented: true },
  { type: "angel", label: "Angel", unlockName: "Angel", series: "summon", group: "summon", editorRow: "summon", editorOrder: 4, implemented: true },
  { type: "jumoku", label: "Jumoku", unlockName: "Jumoku", series: "summon", group: "summon", editorRow: "summon", editorOrder: 5, implemented: false },
];
const ninjuByType = Object.fromEntries(ninjuCatalog.map((ninju) => [ninju.type, ninju]));
const ninjutsuUnlockByName = Object.fromEntries(ninjutsuUnlocks.map((unlock) => [unlock.name, unlock]));
const ninjuEditorRowOrder = { heal: 1, attack: 2, support: 3, special: 4, transform: 6, summon: 7 };
const ninjuEditorCatalog = [...ninjuCatalog].sort((a, b) => (
  (ninjuEditorRowOrder[a.editorRow] || 99) - (ninjuEditorRowOrder[b.editorRow] || 99)
  || a.editorOrder - b.editorOrder
));
const defaultNinjuLoadout = ["moneyDart", "steel", "hotBlood", "genki", "lightning", "fireBall"];
const ninjuLoadoutStorageKey = "nindou2.en.ninjuLoadout";
const legacyDefaultEyeStyle = "11";
const defaultEyeStyle = "5";
const eyeStyleSchemaVersion = 2;
const eyeStyleIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "99", "100", "998", "999"];
const renderableEyeStyleIds = Array.from({ length: 42 }, (_, index) => String(index + 1));
const defaultHairStyle = "2031000301";
const defaultDressStyle = "2051000204";
const defaultHatStyle = "none";
const hairStyleIds = ["2031000101", "2031000102", "2031000104", "2031000106", "2031000107", "2031000109", "2031000111", "2031000112", "2031000115", "2031000117", "2031000202", "2031000204", "2031000206", "2031000209", "2031000214", "2031000216", "2031000301", "2031000303", "2031000304", "2031000306", "2031000309", "2031000311", "2031000315", "2031000401", "2031000403", "2031000404", "2031000405", "2031000406", "2031000410", "2031000501", "2031000504", "2031000506", "2031000509", "2031000511", "2031000515", "2032000102", "2032000104", "2032000107", "2032000110", "2032000113", "2032000201", "2032000204", "2032000206", "2032000208", "2032000209", "2032000213", "2032000301", "2032000303", "2032000304", "2032000306", "2032000309", "2032000311", "2032000312", "2032000314", "2032000401", "2032000404", "2032000406", "2032000409", "2032000413", "2032000502", "2032000506", "2032000509", "2032000511", "2032000602", "2032000604", "2032000606", "2032000608", "2032000613", "2032000701", "2032000703", "2032000709", "2032000901", "2032000906", "2032000909", "2032000912", "2032001001", "2032001006", "2032001009", "2032001012", "2032001101", "2032001104", "2032001106", "2032001107", "2032001109", "2032001201", "2032001204", "2032001206", "2032001207", "2032001209", "2032001301", "2032001302", "2032001304", "2032001306", "2032001308", "2032001309", "2032001311", "2032001312", "2032001315", "2032001401", "2032001408", "2032001413", "2032001415", "2032001506", "2032001509", "2032001511", "2032001515", "2032001601", "2032001602", "2032001606", "2032001614", "2032001703", "2032001704", "2032001706", "2032001707", "2032001709", "2032001711", "2032001712", "2032001715", "2032001716", "2032001801", "2032001802", "2032001803", "2032001804", "2032001806", "2032001810", "2032001812", "2032001814", "2032001901", "2032001902", "2032001904", "2032001906", "2032001909", "2032001910", "2032001911", "2032001914", "2032002001", "2032002003", "2032002004", "2032002008", "2032002010", "2032002013", "2032002101", "2032002103", "2032002104", "2032002109", "2032002110", "2032002112", "2032002201", "2032002202", "2032002203", "2032002204", "2032002210", "2032002213", "2032002301", "2032002303", "2032002308", "2032002309", "2032002310", "2032002311", "2032002312", "2032002401", "2032002403", "2032002404", "2032002408", "2032002410", "2032002414", "2032002501", "2032002506", "2032002509", "2032002514", "2032002601", "2032002603", "2032002604", "2032002608", "2032002609", "2032002610", "2032002612", "2032002614", "2032002701", "2032002702", "2032002703", "2032002704", "2032002708", "2032002710", "2032002801", "2032002802", "2032002901", "2032002902", "2032002906", "2032002911", "2032003001", "2032003002", "2032003104", "2032003106", "2032003109", "2032003113", "2032003202", "2032003206", "2032003211", "2032003212", "2032003301", "2032003306", "2032003308", "2032003309", "2032003312", "2032003401", "2032003403", "2032003406", "2032003409", "2032003412", "2032003415", "2032003501", "2032003506", "2032003512", "2032003602", "2032003609", "2032003701", "2032003803", "2032003809", "2032003811", "2032003812", "2032003901", "2032003906", "2032003909", "2032003911", "2032003912", "2032003915", "2032003916", "2032004001", "2032004006", "2032004009", "2032004010", "2032004011", "2032004012", "2032004015", "2032004016", "2032004017", "2032004103", "2032004106", "2032004107", "2032004110", "2032004111", "2032004113", "2032004201", "2032004204", "2032004206", "2032004209", "2032004210", "2032004211", "2032004213", "2032004215", "2032004301", "2032004306", "2032004309", "2032004311", "2032004312", "2032004315", "2032004401", "2032004404", "2032004414", "2032004501", "2032004502", "2032004505", "2032004506", "2032004511", "2032004604", "2032004605", "2032004608", "2032004610", "2032004613", "2032004706", "2032004708", "2032004710", "2032004715", "2032004801", "2032004804", "2032004806", "2032004809", "2032004815", "2032004817", "2032004901", "2032004915", "2032005004", "2032005007", "2032005008", "2032005010", "2032005013", "2032005101", "2032005103", "2032005106", "2032005109", "2032005111", "2032005112", "2032005115", "2032005202", "2032005206", "2032005207", "2032005209", "2032005212", "2032005302", "2032005305", "2032005312", "2032005316", "2032005404", "2032005405", "2032005406", "2032005408", "2032005412", "2032005501", "2032005506", "2032005509", "2032005511", "2032005601", "2032005606", "2032005609", "2032005611", "2032005613", "2032005701", "2032005702", "2032005706", "2032005709", "2032005711", "2032005714", "2032005801", "2032005806", "2032005808", "2032005809", "2032005813", "2032005901", "2032005906", "2032005909", "2032005913", "2032006001", "2032006007", "2032006012", "2032006101", "2032006108", "2032006113", "2032006201", "2032006206", "2032006209", "2032006211", "2032006213", "2032006301", "2032006306", "2032006312", "2032006406", "2032006409", "2032006413", "2032006504", "2032006505", "2032006506", "2032006508", "2032006512", "2032006601", "2032006603", "2032006604", "2032006606", "2032006608", "2032006609", "2032006611", "2032006613", "2032006614", "2032006616", "2032006703", "2032006714", "2032006816", "2032006915", "2032007005", "2032007103", "2032007108", "2032007110", "2032007111", "2032007116", "2032007203", "2032007205", "2032007208", "2032007211", "2032007216", "2032007303", "2032007308", "2032007316", "2032007317", "2032007401", "2032007402", "2032007404", "2032007406", "2032007408", "2032007409", "2032007411", "2032007413", "2032007414", "2032007416", "2032007502", "2032007504", "2032007506", "2032007509", "2032007609", "2032007611", "2032007701", "2032007702", "2032007704", "2032007706", "2032007708", "2032007709", "2032007711", "2032007713", "2032007714", "2032007716", "2032007801", "2032007802", "2032007804", "2032007806", "2032007808", "2032007809", "2032007811", "2032007813", "2032007814", "2032007816", "2032007901", "2032007903", "2032007904", "2032007911", "2032007912", "2032008004", "2032008005", "2032008007", "2032008010", "2032008102", "2032008104", "2032008105", "2032008109", "2032008111", "2032008115", "2032008202", "2032008204", "2032008205", "2032008209", "2032008211", "2032008215", "2032008302", "2032008304", "2032008305", "2032008309", "2032008311", "2032008315", "2032008404", "2032008405", "2032008407", "2032008410", "2032008411", "2032008504", "2032008505", "2032008507", "2032008510", "2032008511", "2032008601", "2032008603", "2032008604", "2032008608", "2032008615", "2032008706", "2032008817", "2032008905", "2032008909", "2032008911", "2032008915", "2032009001", "2032009002", "2032009004", "2032009006", "2032009008", "2032009009", "2032009011", "2032009013", "2032009014", "2032009016", "2032009114", "2032009201", "2032009202", "2032009206", "2032009209", "2032009301", "2032009315", "2032009404", "2032009405", "2032009410", "2032009505", "2032009506", "2032009510", "2032009513", "2032009515", "2032009605", "2032009606", "2032009610", "2032009611", "2032009614", "2032009706", "2032009709", "2032009803", "2032009805", "2032009806", "2032009808", "2032009810", "2032009903", "2032009906", "2032009909", "2032009910", "2032009912", "2032010001", "2032010006", "2032010010", "2032010011", "2032010015", "2032010114", "2032010201", "2032010203", "2032010205", "2032010210", "2032010212", "2032010304", "2032010306", "2032010311", "2032010312", "2032010315", "2032010402", "2032010404", "2032010414", "2032010515", "2032010611", "2032010709", "2032010715", "2032010803", "2032010903", "2032010905", "2032010906", "2032010909", "2032010911", "2032010912", "2032010915", "2032011003", "2032011014", "2032011115", "2032011201", "2032011203", "2032011206", "2032011209", "2032011211", "2032011212", "2032011215", "2032011311", "2032011401", "2032011408", "2032011415", "2032011501", "2032011504", "2032011506", "2032011509", "2032011512", "2032011515", "2032011602", "2032011606", "2032011607", "2032011609", "2032011612", "2032011702", "2032011704", "2032011706", "2032011709", "2032011712", "2032011804", "2032011808", "2032011813", "2032011906", "2032011909", "2032011915", "2032012004", "2032012008", "2032012013", "2032012104", "2032012108", "2032012113", "2032012204", "2032012206", "2032012208", "2032012209", "2032012215", "2032012305", "2032012315", "2032012401", "2032012406", "2032012414", "2032012415", "2032012504", "2032012506", "2032012509", "2032012515", "2032012605", "2032012611", "2032012615", "2032012701", "2032012706", "2032012709", "2032012715", "2032012801", "2032012806", "2032012809", "2032012815", "2032012904", "2032012911", "2032013007", "2032013010", "2032013015", "2032013101", "2032013106", "2032013109", "2032013115", "2032013116", "2032013201", "2032013211", "2032013215", "2032013304", "2032013307", "2032013315", "2032013406", "2032013412", "2032013501", "2032013506", "2032013512", "2032013515", "2032013601", "2032013612", "2032013615", "2032013708", "2032013710", "2032013713", "2032013802", "2032013804", "2032013915", "2032014015", "2032014106", "2032014109", "2032014111", "2032014115", "2032014201", "2032014205", "2032014208", "2032014215", "2032014304", "2032014315", "2032014401", "2032014406", "2032014409", "2032014415", "2032014501", "2032014508", "2032014601", "2032014604", "2032014606", "2032014609", "2032014612", "2032014615", "2032014702", "2032014704", "2032014706", "2032014708", "2032014710", "2032014715", "2032014802", "2032014804", "2032014806", "2032014808", "2032014810", "2032014815", "2032014904", "2032014908", "2032014913", "2032015004", "2032015008", "2032015013", "2032015103", "2032015108", "2032015201", "2032015207", "2032015209", "2032015211", "2032015215", "2032015307", "2032015310", "2032015402", "2032015411", "2032015501", "2032015506", "2032015512", "2032015515", "2032015604", "2032015615", "2032015701", "2032015715", "2032015806", "2032015811", "2032015912", "2032015915", "2032016001", "2032016006", "2032016010", "2032016101", "2032016106", "2032016115", "2032016209", "2032016211", "2032016302", "2032016316", "2032016405", "2032016415", "2032016506", "2032016509", "2032016604", "2032016608", "2032016703", "2032016708", "2032016805", "2032016809", "2032016906", "2032017001", "2032017106", "2032017112", "2032017203", "2032017315", "2032017406", "2032017412", "2032017512", "2032017611", "2032017715", "2032017813", "2032017901", "2032018010", "2032018011", "2032018102", "2032018108", "2032018207", "2032018210", "2032018215", "2032018303", "2032018306", "2032018312", "2032018401", "2032018402", "2032018406", "2032018409", "2032018501", "2032018512", "2032018515", "2032018604", "2032018612", "2032018615", "2033000105", "2033000115", "2033000201", "2033000203", "2033000207", "2033000210", "2033000211", "2033000213", "2033000216", "2033000317", "2033000404", "2033000406", "2033000409", "2033000414", "2033000515", "2033001203", "2033001208", "2033001303", "2033001314", "2033001402", "2033001501", "2033001615", "2033001715", "2033001806", "2033001903", "2033002006", "2033002112", "2033002201", "2033002209", "2033002214", "2033002215", "2033002315", "2033002403", "2033002503", "2033002603", "2033002703", "2033002806", "2033002912", "2033003006", "2033003111", "2033003211", "2033003311", "2033003415", "2033003501", "2033003503", "2033003504", "2033003505", "2033003508", "2033003510", "2033003511", "2033003515", "2033003604", "2033003715", "2033003809", "2033003906", "2033004001", "2033004115", "2033004204", "2033004315", "2033004402", "2033004509", "2033004601", "2033004705", "2033004808", "2033004905", "2033005005", "2033005109", "2033005201", "2033005315", "2033005401", "2033005508", "2033005602", "2033005715", "2033005804", "2033005915", "2033006001", "2033006106", "2033006203", "2033006302", "2033006303", "2033006304", "2033006307", "2033006311", "2033006401", "2033006402", "2033006415", "2033006504", "2033006601", "2033006604", "2033006710", "2033006804", "2033006904", "2033007015", "2033007103", "2033007201", "2033007205", "2033007301", "2033007411", "2033007506", "2033007509", "2033007601", "2033007609", "2033007706", "2033007815", "2033007904", "2033007915", "2033008015", "2033008102", "2033008215", "2033008309", "2033008404", "2033008407", "2033008504", "2033008511", "2033008601", "2033008604", "2033008615", "2033008711", "2033008803", "2033008804", "2033008808", "2033008811", "2033008904", "2033009001", "2033009005", "2033009117", "2033009217", "2033009317", "2033009417", "2033009517", "2033009601", "2033009603", "2033009605", "2033009701", "2033009712", "2033009715", "2033009809", "2033009906", "2033010015", "2033010105", "2033010115", "2033022101", "2033022105", "2033022115", "2034000101", "2034000108", "2034000202", "2034000204", "2034000315", "2034000402", "2034000409", "2034000506", "2034000510", "2034000607", "2034000611", "2034000708", "2034000713", "2034000804", "2034000808", "2034000904", "2034001006", "2034001101", "2034001206", "2034001209", "2034001306", "2034001309", "2034001411", "2034001501", "2034001506", "2034001515", "2034001602", "2034001705", "2034001812", "2034001906", "2034002003", "2034002103", "2034002106", "2034002108", "2034002204", "2034002208", "2034002305", "2034002310", "2034002404", "2034002406", "2034002504", "2034002507", "2034002515", "2034002601", "2034002610", "2034002615", "2034002704", "2034002715", "2034002806", "2034002812", "2034002815", "2034002901", "2034002906", "2034002915", "2034003010", "2034003015", "2034003102", "2034003115", "2034003201", "2034003203", "2034003215", "2034003304", "2034003308", "2034003309", "2034003315", "2034003403", "2034003404", "2034003406", "2034003408", "2034003409", "2034003415", "2034003501", "2034003515", "2034003608", "2034003613", "2034003708", "2034003710", "2034003804", "2034003815", "2034003907", "2034004006", "2034004008", "2035000105", "2035000215", "2039000117", "2039000118", "2039000218", "2039000317", "2039000318"];
const dressStyleIds = ["2051000101", "2051000102", "2051000104", "2051000106", "2051000107", "2051000109", "2051000111", "2051000112", "2051000115", "2051000117", "2051000204", "2051000206", "2051000208", "2051000209", "2051000211", "2051000214", "2052000306", "2052000310", "2052000311", "2052000312", "2052000315", "2052000406", "2052000408", "2052000413", "2052000415", "2052000501", "2052000504", "2052000506", "2052000509", "2052000515", "2052000601", "2052000609", "2052000612", "2052000701", "2052000704", "2052000706", "2052000707", "2052000709", "2052000711", "2052000712", "2052000715", "2052000804", "2052000806", "2052000807", "2052000809", "2052000811", "2052000813", "2052000815", "2052000901", "2052000904", "2052000909", "2052000911", "2052001005", "2052001007", "2052001013", "2052001014", "2052001104", "2052001106", "2052001109", "2052001111", "2052001112", "2052001201", "2052001203", "2052001204", "2052001205", "2052001206", "2052001208", "2052001209", "2052001211", "2052001212", "2052001216", "2052001301", "2052001306", "2052001309", "2052001311", "2052001409", "2052001412", "2052001414", "2052001507", "2052001509", "2052001511", "2052001512", "2052001605", "2052001606", "2052001608", "2052001610", "2052001611", "2052001701", "2052001703", "2052001706", "2052001709", "2052001710", "2052001713", "2052001714", "2052001801", "2052001805", "2052001806", "2052001807", "2052001809", "2052001811", "2052001812", "2052001815", "2052001901", "2052001915", "2052002001", "2052002006", "2052002101", "2052002102", "2052002104", "2052002106", "2052002108", "2052002109", "2052002111", "2052002112", "2052002115", "2052002201", "2052002208", "2052002213", "2052002215", "2052002306", "2052002309", "2052002311", "2052002315", "2052002401", "2052002402", "2052002406", "2052002414", "2052002504", "2052002515", "2052002604", "2052002615", "2052002715", "2052002801", "2052002901", "2052002906", "2052003001", "2052003006", "2052003009", "2052003015", "2052003101", "2052003109", "2052003112", "2052003114", "2052003207", "2052003209", "2052003210", "2052003211", "2052003310", "2052003401", "2052003403", "2052003404", "2052003406", "2052003408", "2052003409", "2052003411", "2052003412", "2052003504", "2052003510", "2052003513", "2052003515", "2052003601", "2052003606", "2052003609", "2052003701", "2052003707", "2052003710", "2052003713", "2052003715", "2052003806", "2052003809", "2052003901", "2052003909", "2052003913", "2052004001", "2052004006", "2052004009", "2052004011", "2052004104", "2052004109", "2052004110", "2052004112", "2052004204", "2052004208", "2052004210", "2052004306", "2052004404", "2052004410", "2052004413", "2052004501", "2052004615", "2052004703", "2052004806", "2052004815", "2052004911", "2052005004", "2052005104", "2052005106", "2052005109", "2052005112", "2052005201", "2052005215", "2052005301", "2052005315", "2052005401", "2052005501", "2052005506", "2052005507", "2052005510", "2052005511", "2052005513", "2052005517", "2052005601", "2052005603", "2052005606", "2052005611", "2052005701", "2052005706", "2052005712", "2052005801", "2052005815", "2052005902", "2052005909", "2052006001", "2052006006", "2052006101", "2052006106", "2052006206", "2052006212", "2052006304", "2052006307", "2052006311", "2052006402", "2052006406", "2052006501", "2052006506", "2052006508", "2052006509", "2052006511", "2052006512", "2052006601", "2052006612", "2052006701", "2052006706", "2052006715", "2052006801", "2052006806", "2052006809", "2052006811", "2052006812", "2052006815", "2052006901", "2052006906", "2052006909", "2052006911", "2052006912", "2052006915", "2052007001", "2052007006", "2052007009", "2052007011", "2052007101", "2052007106", "2052007109", "2052007111", "2052007201", "2052007205", "2052007206", "2052007209", "2052007215", "2052007301", "2052007306", "2052007309", "2052007312", "2052007401", "2052007406", "2052007409", "2052007411", "2052007412", "2052007415", "2052007509", "2052007515", "2052007615", "2052007708", "2052007715", "2052007801", "2052007812", "2052007815", "2052007908", "2052007910", "2052007915", "2052008006", "2052008008", "2052008009", "2052008011", "2052008012", "2052008106", "2052008108", "2052008109", "2052008111", "2052008115", "2052008206", "2052008210", "2052008214", "2052008306", "2052008315", "2052008401", "2052008408", "2052008413", "2052008501", "2052008506", "2052008509", "2052008511", "2052008601", "2052008602", "2052008609", "2052008612", "2052008701", "2052008706", "2052008806", "2052008909", "2052008913", "2052009017", "2052009106", "2052009112", "2052009206", "2052009212", "2052009309", "2052009311", "2052009404", "2052009406", "2052009416", "2052009502", "2052009510", "2052009609", "2052009612", "2052009704", "2052009815", "2052009916", "2052010001", "2052010115", "2052010206", "2052010215", "2052010301", "2052010401", "2052010408", "2052010412", "2052010506", "2052010515", "2052010601", "2052010606", "2052010701", "2052010703", "2052010709", "2052010806", "2052010810", "2052010811", "2052010812", "2052010901", "2052010903", "2052010906", "2052010915", "2052011001", "2052011006", "2052011101", "2052011108", "2052011109", "2052011203", "2052011206", "2052011210", "2052011307", "2052011311", "2052011410", "2052011517", "2052011615", "2052011704", "2052011706", "2052011713", "2052011715", "2052011806", "2052011809", "2052011906", "2052011909", "2052012002", "2052012006", "2052012012", "2052012102", "2052012112", "2052012208", "2052012210", "2052012215", "2052012308", "2052012310", "2052012407", "2052012411", "2052012501", "2052012606", "2052012704", "2052012806", "2052012909", "2052013006", "2052013009", "2052013015", "2052013115", "2052013201", "2052013206", "2052013209", "2052013211", "2052013212", "2052013306", "2052013311", "2052013313", "2052013406", "2052013409", "2052013411", "2052013413", "2052013415", "2052013506", "2052013509", "2052013611", "2052013706", "2052013709", "2052013712", "2052013806", "2052013815", "2052013903", "2052014006", "2052014015", "2052014102", "2052014215", "2052014305", "2052014306", "2052014308", "2052014310", "2052014315", "2052014406", "2052014409", "2052014411", "2052014415", "2052014601", "2052014606", "2052014612", "2052014615", "2052014701", "2052014707", "2052014711", "2052014712", "2052014715", "2052014801", "2052014806", "2052014809", "2052014811", "2052014812", "2052014906", "2052014909", "2052015006", "2052015009", "2052015101", "2052015107", "2052015115", "2052015206", "2052015209", "2052015212", "2052015307", "2052015309", "2052015313", "2052015401", "2052015408", "2052015410", "2052015506", "2052015509", "2052015601", "2052015606", "2052015706", "2052015712", "2052015806", "2052015809", "2052015901", "2052015905", "2052015906", "2052015909", "2052016001", "2052016106", "2052016109", "2052016201", "2052016306", "2052016309", "2052016415", "2052016510", "2052016607", "2052016610", "2052016708", "2052016713", "2052016801", "2052016806", "2052016812", "2052016908", "2052016916", "2052017008", "2052017009", "2052017101", "2052017107", "2052017206", "2052017209", "2052017212", "2052017301", "2052017312", "2052017416", "2052017501", "2052017502", "2052017611", "2052017615", "2052017701", "2052017715", "2052017806", "2052017809", "2052017811", "2052017906", "2052017909", "2052017911", "2052017915", "2052018001", "2052018006", "2052018007", "2052018009", "2052018104", "2052018106", "2052018208", "2052018209", "2052018306", "2052018309", "2052018401", "2052018506", "2052018509", "2052018602", "2052018706", "2052018801", "2052018906", "2052018909", "2052019001", "2052019002", "2052019003", "2052019006", "2052019010", "2052019015", "2052019103", "2052019109", "2052019206", "2052019210", "2052019301", "2052019306", "2052019406", "2052019408", "2052019510", "2052019511", "2052019606", "2052019615", "2052019706", "2052019806", "2052019901", "2052020003", "2052020115", "2052020201", "2052020306", "2052020401", "2052020506", "2052020606", "2052020702", "2052020708", "2052020815", "2053000106", "2053000115", "2053000205", "2053000208", "2053000210", "2053000211", "2053000301", "2053000405", "2053000415", "2053000501", "2053000503", "2053000507", "2053000510", "2053000511", "2053000513", "2053000516", "2053000601", "2053000603", "2053000605", "2053000606", "2053000609", "2053000611", "2053000612", "2053000703", "2053000705", "2053000708", "2053000709", "2053000711", "2053000713", "2053000714", "2053000817", "2053000903", "2053000910", "2053000915", "2053001006", "2053001010", "2053001101", "2053001102", "2053001104", "2053001105", "2053001106", "2053001108", "2053001109", "2053001110", "2053001111", "2053001113", "2053001116", "2053001204", "2053001206", "2053001209", "2053001214", "2053001306", "2053001401", "2053001506", "2053001601", "2053001705", "2053001805", "2053001910", "2053002005", "2053002104", "2053002106", "2053002204", "2053002208", "2053002210", "2053002315", "2053002406", "2053002515", "2053002602", "2053002701", "2053002706", "2053002709", "2053002712", "2053002801", "2053002806", "2053002809", "2053002812", "2053002815", "2053002816", "2053002906", "2053003603", "2053003701", "2053003706", "2053003709", "2053003815", "2053003901", "2053003906", "2053004012", "2053004105", "2053004110", "2053004111", "2053004201", "2053004206", "2053004209", "2053004315", "2053004417", "2053004515", "2053004601", "2053004706", "2053004806", "2053004901", "2053004904", "2053004906", "2053004908", "2053005001", "2053005002", "2053005004", "2053005007", "2053005101", "2053005205", "2053005206", "2053005209", "2053005212", "2053005312", "2053005406", "2053005409", "2053005411", "2053005412", "2053005501", "2053005601", "2053005604", "2053005701", "2053005706", "2053005815", "2053005907", "2053006001", "2053006015", "2053006101", "2053006106", "2053006201", "2053006206", "2053006301", "2053006306", "2053006415", "2053006501", "2053006512", "2053006601", "2053006615", "2053006701", "2053006709", "2053006801", "2053006806", "2053006815", "2053006901", "2053006903", "2053006904", "2053006905", "2053006908", "2053006910", "2053006911", "2053006915", "2053007001", "2053007006", "2053007007", "2053007010", "2053007104", "2053007107", "2053007109", "2053007207", "2053007315", "2053007401", "2053007501", "2053007601", "2053007606", "2053007609", "2053007611", "2053007706", "2053007805", "2053007910", "2053008006", "2053008104", "2053008203", "2053008315", "2053008401", "2053008515", "2053008615", "2053008715", "2053008803", "2053008805", "2053008901", "2053008915", "2053009009", "2053009011", "2053009107", "2053009110", "2053009111", "2053009212", "2053009315", "2053009404", "2053009515", "2053009615", "2053009701", "2053009815", "2053009905", "2053010008", "2053010101", "2053010106", "2053010109", "2053010206", "2053010209", "2053010215", "2053010309", "2053010515", "2053010605", "2053010715", "2053010801", "2053010803", "2053010808", "2053010814", "2053010901", "2053011001", "2053011006", "2053011009", "2053011101", "2053011106", "2053011109", "2053011201", "2053011301", "2053011306", "2053011314", "2053011401", "2053011410", "2053011414", "2053011510", "2053011610", "2053011710", "2053011815", "2053011901", "2053012008", "2053012102", "2053012208", "2053012210", "2053012215", "2053012301", "2053012407", "2053012410", "2053012411", "2053012510", "2053012606", "2053012710", "2053012715", "2053012804", "2053012915", "2053013001", "2053013106", "2053013109", "2053013202", "2053013206", "2053013209", "2053013213", "2053013301", "2053013403", "2053013506", "2053013511", "2053013608", "2053013609", "2053013706", "2053013806", "2053013807", "2053013809", "2053013813", "2053013910", "2053014006", "2053014103", "2053014111", "2053014201", "2053014205", "2053014215", "2053014301", "2053014302", "2053014307", "2053014315", "2053014401", "2053014403", "2053014406", "2053014513", "2053014515", "2053014604", "2053014701", "2053014803", "2053014910", "2053015015", "2053015106", "2053015209", "2053015303", "2053015401", "2053015405", "2053015506", "2053015611", "2053015706", "2053015809", "2053015917", "2053016006", "2053016109", "2053016201", "2053016306", "2053016309", "2053016409", "2053016509", "2053016606", "2053016609", "2053016701", "2053016709", "2053016806", "2053016906", "2053016909", "2053017006", "2053017009", "2053017104", "2053017115", "2053017206", "2053017211", "2053017302", "2053017415", "2053017501", "2053017515", "2053017601", "2053017615", "2053017706", "2053017804", "2053017904", "2053018011", "2053018104", "2053018211", "2053018306", "2053018404", "2053018508", "2053018608", "2053018711", "2053018806", "2053018809", "2053018915", "2053019002", "2053019109", "2053019112", "2053019211", "2053019310", "2053019411", "2053019510", "2053019607", "2053019609", "2053019710", "2053019801", "2053019917", "2053020017", "2053020117", "2053020217", "2053020317", "2053020401", "2053020501", "2053020609", "2053020715", "2053020810", "2053020906", "2053021006", "2054000101", "2054000208", "2054000211", "2054000305", "2054000310", "2054000406", "2054000409", "2054000515", "2054000601", "2054000606", "2054000701", "2054000811", "2054000911", "2054001003", "2054001008", "2054001011", "2054001108", "2054001111", "2054001115", "2054001204", "2054001310", "2054001406", "2054001509", "2054001608", "2054001709", "2054001811", "2054001904", "2054002013", "2054002111", "2054002208", "2054002311", "2054002401", "2054002406", "2054002409", "2054002505", "2054002605", "2054002606", "2054002711", "2054002806", "2054002906", "2054003006", "2054003101", "2054003109", "2054003201", "2054003209", "2054003301", "2054003306", "2054003315", "2054003409", "2054003509", "2054003609", "2054003709", "2054003811", "2054003906", "2054003909", "2054004008", "2054004110", "2054004213", "2054004312", "2054004409", "2054004501", "2054004515", "2054004601", "2054004606", "2054004710", "2054004810", "2054004907", "2054005009", "2054005106", "2054005107", "2054005209", "2054005301", "2054005315", "2054005407", "2054005501", "2054005602", "2054005609", "2054005709", "2054005806", "2054005815", "2054005910", "2054006009", "2054006104", "2054006109", "2054006203", "2054006301", "2054006309", "2054006401", "2054006406", "2054006409", "2054006501", "2054006609", "2054006709", "2054006801", "2054006806", "2054006809", "2055000106", "2055000110", "2055000201", "2055000204", "2055000215", "2055000306", "2055000409", "2055000415", "2055000417", "2055000505", "2055000506", "2055000517", "2055000609", "2055000709", "2055000809", "2055000909", "2055001006", "2055001106", "2055001215", "2055001306", "2055001406", "2055001511", "2055001612", "2059000101", "2059000117", "2059000206", "2059000209"];
const hatStyleIds = ["none", "2022000101", "2022000104", "2022000105", "2022000106", "2022000108", "2022000109", "2022000111", "2022000112", "2022000204", "2022000206", "2022000208", "2022000210", "2022000301", "2022000302", "2022000306", "2022000404", "2022000408", "2022000410", "2022000413", "2022000414", "2022000504", "2022000506", "2022000508", "2022000510", "2022000513", "2022000604", "2022000606", "2022000607", "2022000610", "2022000614", "2022000705", "2022000706", "2022000801", "2022000804", "2022000806", "2022000807", "2022000809", "2022000903", "2022001003", "2022001104", "2022001114", "2022001204", "2022001207", "2022001214", "2022001301", "2022001309", "2022001401", "2022001406", "2022001409", "2022001506", "2022001510", "2022001511", "2022001512", "2022001614", "2022001701", "2022001804", "2022001901", "2022001906", "2022001912", "2022002006", "2022002104", "2022002106", "2022002204", "2022002304", "2022002310", "2022002404", "2022002411", "2022002414", "2022002504", "2022002506", "2022002512", "2022002606", "2022002609", "2022002701", "2022002704", "2022002706", "2022002708", "2022002709", "2022002715", "2022002810", "2022002814", "2022002903", "2022002905", "2022003005", "2022003009", "2022003012", "2022003104", "2022003114", "2022003201", "2022003204", "2022003205", "2022003206", "2022003208", "2022003211", "2022003213", "2022003214", "2022003304", "2022003306", "2022003307", "2022003310", "2022003311", "2022003401", "2022003403", "2022003406", "2022003410", "2022003501", "2022003504", "2022003506", "2022003507", "2022003509", "2022003515", "2022003603", "2022003606", "2022003615", "2022003701", "2022003704", "2022003706", "2022003715", "2022003814", "2022003901", "2022003915", "2022003917", "2022004015", "2022004101", "2022004211", "2022004315", "2022004410", "2022004415", "2022004501", "2022004506", "2022004601", "2022004606", "2022004704", "2022004715", "2022004806", "2022004808", "2022004809", "2022004811", "2022004812", "2022004902", "2022004905", "2022004907", "2022005002", "2022005004", "2022005006", "2022005101", "2022005105", "2022005106", "2022005111", "2022005201", "2022005206", "2022005301", "2022005304", "2022005306", "2022005307", "2022005309", "2022005315", "2022005401", "2022005410", "2022005508", "2022005516", "2022005601", "2022005715", "2022005801", "2022005805", "2022005806", "2022005809", "2022005812", "2022005908", "2022006005", "2022006006", "2022006012", "2022006101", "2022006106", "2022006109", "2022006112", "2022006202", "2022006207", "2022006209", "2022006304", "2022006306", "2022006307", "2022006309", "2022006310", "2022006311", "2022006401", "2022006404", "2022006406", "2022006409", "2022006412", "2022006415", "2022006515", "2022006603", "2022006701", "2022006706", "2022006709", "2022006711", "2022006712", "2022006804", "2022006906", "2022007015", "2022007106", "2022007113", "2022007208", "2022007210", "2022007305", "2022007308", "2022007409", "2022007413", "2022007504", "2022007508", "2022007513", "2022007516", "2022007604", "2022007608", "2022007613", "2022007616", "2022007712", "2022007716", "2022007801", "2022007901", "2022007908", "2022007912", "2022008006", "2022008009", "2022008101", "2022008106", "2022008109", "2022008207", "2022008210", "2022008213", "2022008215", "2022008216", "2022008302", "2022008309", "2022008401", "2022008501", "2022008606", "2022008704", "2022008705", "2022008708", "2022008710", "2022008715", "2022008805", "2022008806", "2022008808", "2022008816", "2022008901", "2022008906", "2022008909", "2022008912", "2022009004", "2022009006", "2022009007", "2022009010", "2022009013", "2022009015", "2022009107", "2022009201", "2022009206", "2022009209", "2022009215", "2022009301", "2022009306", "2022009315", "2022009402", "2022009405", "2022009406", "2022009407", "2022009412", "2022009415", "2022009514", "2022009601", "2022009609", "2022009715", "2022009801", "2022009810", "2022009911", "2022010002", "2022010102", "2022010112", "2022010201", "2022010306", "2022010402", "2022010501", "2022010506", "2022010601", "2022010606", "2022010609", "2022010701", "2022010706", "2022010801", "2022010806", "2022010915", "2022011001", "2022011009", "2022011011", "2022011103", "2022011106", "2022011201", "2022011206", "2022011209", "2022011306", "2022011315", "2022011406", "2022011411", "2022011504", "2022011605", "2022011704", "2022011708", "2022011713", "2022011805", "2022011814", "2022011908", "2022011915", "2022012017", "2022012115", "2022012208", "2022012210", "2022012301", "2022012408", "2022012410", "2022012515", "2022012601", "2022012612", "2022012715", "2022012802", "2022012915", "2022013001", "2022013006", "2022013009", "2022013104", "2022013215", "2022013306", "2022013309", "2022013406", "2022013503", "2022013508", "2022013601", "2022013612", "2022013701", "2022013708", "2022013713", "2022013806", "2022013810", "2022013901", "2022013906", "2022013910", "2022014004", "2022014011", "2022014101", "2022014108", "2022014109", "2022014201", "2022014206", "2022014209", "2022014315", "2022014415", "2022014515", "2022014601", "2022014612", "2022014705", "2022014815", "2022014904", "2022014910", "2022014911", "2022015001", "2022015106", "2022015109", "2022015209", "2022015211", "2022015304", "2022015308", "2022015316", "2022015404", "2022015504", "2022015611", "2022015615", "2022015711", "2022015806", "2022015906", "2022016006", "2022016011", "2022016101", "2022016106", "2022016201", "2022016206", "2022016301", "2022016306", "2022016401", "2022016406", "2022016501", "2022016506", "2022016611", "2022016615", "2022016704", "2022016714", "2022016806", "2022016810", "2022016901", "2022017011", "2022017101", "2022017106", "2022017109", "2022017114", "2022017206", "2022017211", "2022017216", "2022017301", "2022017304", "2022017306", "2022017308", "2022017309", "2022017315", "2022017401", "2022017403", "2022017506", "2022017509", "2022017615", "2022017701", "2022017815", "2022017901", "2022018001", "2022018015", "2022018101", "2022018115", "2022018215", "2022018301", "2022018302", "2022018306", "2022018309", "2022018401", "2022018409", "2022018506", "2022018607", "2022018706", "2022018801", "2022018806", "2022018901", "2022018910", "2022019001", "2022019008", "2022019010", "2022019101", "2022019201", "2022019306", "2022019405", "2022019412", "2022019508", "2022019510", "2022019601", "2022019606", "2022019706", "2022019712", "2022019806", "2022019904", "2022020004", "2022020106", "2022020109", "2022020206", "2022020209", "2022020315", "2023000103", "2023000204", "2023000208", "2023000211", "2023000304", "2023000311", "2023000313", "2023000404", "2023000411", "2023000413", "2023000504", "2023000505", "2023000506", "2023000508", "2023000510", "2023000515", "2023000601", "2023000604", "2023000606", "2023000607", "2023000610", "2023000611", "2023000613", "2023000706", "2023000709", "2023000802", "2023000806", "2023000809", "2023000812", "2023000815", "2023000903", "2023000905", "2023000908", "2023000909", "2023000911", "2023000913", "2023000914", "2023001015", "2023001102", "2023001206", "2023001301", "2023001406", "2023001501", "2023001601", "2023001606", "2023001709", "2023001715", "2023001806", "2023001815", "2023001910", "2023002004", "2023002102", "2023002211", "2023002304", "2023002405", "2023002505", "2023002602", "2023002701", "2023002706", "2023002709", "2023002712", "2023002801", "2023002804", "2023002805", "2023002808", "2023002815", "2023002917", "2023003005", "2023003103", "2023003114", "2023003203", "2023003215", "2023003312", "2023003404", "2023003503", "2023003506", "2023003601", "2023003707", "2023003710", "2023003811", "2023003909", "2023004004", "2023004106", "2023004211", "2023004309", "2023004406", "2023004506", "2023004606", "2023004704", "2023004806", "2023004901", "2023004915", "2023004917", "2023004918", "2023005004", "2023005104", "2023005117", "2023005204", "2023005301", "2023005306", "2023005315", "2023005401", "2023005406", "2023005408", "2023005415", "2023005504", "2023005604", "2023005715", "2023005804", "2023005901", "2023005906", "2023005911", "2023005915", "2023006004", "2023006104", "2023006204", "2023006306", "2023006406", "2023006408", "2023006409", "2023006411", "2023006415", "2023006504", "2023006606", "2023006704", "2023006809", "2023006810", "2023006903", "2023007004", "2023007115", "2023007210", "2023007304", "2023007415", "2023007510", "2023007604", "2023007715", "2023007810", "2023007904", "2023008015", "2023008110", "2023008204", "2023008206", "2023008209", "2023008211", "2023008304", "2023008411", "2023008511", "2023008604", "2023008706", "2023008804", "2023008904", "2023009004", "2023009009", "2023009011", "2023009015", "2023009104", "2023009201", "2023009204", "2023009304", "2023009414", "2023009504", "2023009506", "2023009507", "2023009510", "2023009513", "2023009604", "2023009709", "2023009804", "2023009906", "2023010004", "2023010106", "2023010204", "2023010311", "2023010413", "2023010501", "2023010601", "2023010715", "2023010804", "2023010904", "2023011001", "2023011107", "2023011211", "2023011310", "2023011417", "2023011501", "2023011506", "2023011508", "2023011515", "2023011604", "2023011711", "2023011815", "2023011904", "2023012010", "2023012104", "2023012204", "2023012301", "2023012415", "2023012515", "2023012603", "2023012710", "2023012808", "2023012904", "2023013006", "2023013008", "2023013013", "2023013015", "2023013104", "2023013204", "2023013315", "2023013411", "2023013510", "2023013604", "2023013717", "2023013804", "2023013904", "2023014011", "2023014108", "2023014204", "2023014304", "2023014401", "2023014402", "2023014408", "2023014415", "2023014504", "2023014615", "2023014704", "2023014804", "2023014904", "2023015006", "2023015105", "2023015106", "2023015109", "2023015210", "2023015304", "2023015404", "2023015504", "2023015604", "2023015704", "2023015804", "2023015904", "2023015908", "2023015910", "2023016004", "2023016104", "2023016205", "2023016304", "2023016404", "2023016504", "2023016610", "2023016704", "2023016801", "2023016803", "2023016808", "2023016814", "2023016904", "2023017004", "2023017104", "2023017204", "2023017304", "2023017404", "2023017504", "2023017604", "2023017704", "2023017804", "2023017904", "2023018001", "2023018004", "2023018115", "2023018204", "2023018305", "2023018404", "2023018504", "2023018604", "2023018701", "2023018804", "2023019104", "2023019204", "2023019306", "2023019404", "2023019515", "2023019604", "2023019704", "2023019804", "2023019810", "2023019813", "2023019904", "2023020004", "2023020104", "2023020204", "2023020311", "2023020404", "2023020504", "2023020611", "2023020615", "2023020704", "2023020806", "2023020809", "2023020904", "2023021001", "2023021103", "2023021206", "2023021301", "2023021302", "2023021304", "2023021305", "2023021306", "2023021308", "2023021309", "2023021310", "2023021311", "2023021313", "2023021315", "2023021404", "2023021504", "2023021604", "2023021704", "2023021803", "2023021904", "2023022004", "2023022101", "2023022103", "2023022105", "2023022115", "2023022204", "2023022205", "2023022304", "2023022401", "2023022403", "2023022406", "2023022504", "2023022605", "2023022704", "2023022804", "2023022903", "2023023001", "2023023104", "2023023201", "2023023306", "2023023409", "2023023506", "2023023611", "2023023701", "2023023801", "2023023917", "2023024006", "2023024109", "2023024206", "2023024209", "2023024306", "2023024406", "2023024506", "2023024606", "2023024706", "2023024804", "2023024806", "2023024809", "2023024904", "2023025004", "2023025104", "2023025201", "2023025204", "2023025304", "2023025406", "2023025504", "2023025604", "2023025704", "2023025806", "2023025904", "2023026001", "2023026106", "2023026204", "2023026313", "2023026411", "2023026506", "2023026606", "2023026704", "2023026806", "2023026915", "2023027004", "2023027111", "2023027204", "2023027315", "2023027403", "2023027506", "2023027604", "2023027703", "2023027806", "2023027911", "2023028004", "2023028106", "2023028209", "2023028309", "2023028404", "2023028503", "2023028604", "2023028706", "2023028809", "2023028911", "2023029004", "2023029104", "2023029206", "2023029306", "2023029404", "2023029511", "2023029604", "2023029703", "2023029810", "2023029906", "2023030004", "2023030104", "2023030215", "2023030301", "2023030404", "2023030504", "2023030606", "2023030704", "2023030706", "2023030815", "2023030904", "2023031001", "2023031104", "2023031215", "2023031303", "2023031404", "2023031405", "2023031406", "2023031411", "2023031511", "2023031604", "2023031706", "2023031806", "2023031907", "2023032004", "2023032106", "2023032217", "2023032305", "2023032404", "2023032515", "2023032615", "2023032715", "2023032804", "2023032911", "2023033005", "2023033104", "2023033204", "2023033301", "2023033304", "2023033401", "2023033504", "2023033601", "2023033704", "2023033804", "2023033805", "2023033806", "2023033808", "2023033810", "2023033811", "2023033813", "2023033815", "2023033904", "2023034004", "2023034104", "2023034211", "2023034215", "2023034315", "2023034401", "2023034409", "2023034504", "2023034609", "2023034701", "2023034702", "2023034703", "2023034704", "2023034705", "2023034706", "2023034708", "2023034709", "2023034711", "2023034713", "2023034714", "2023034715", "2023034716", "2023034804", "2023034906", "2023035004", "2023035008", "2023035011", "2023035012", "2023035104", "2023035206", "2023035209", "2024000101", "2024000103", "2024000108", "2024000115", "2024000201", "2024000203", "2024000208", "2024000215", "2024000301", "2024000401", "2024000501", "2024000515", "2024000603", "2024000701", "2024000708", "2024000710", "2024000715", "2024000801", "2024000808", "2024000810", "2024000815", "2024000901", "2024000902", "2024000906", "2024000915", "2024001010", "2024001115", "2024001205", "2024001308", "2024001415", "2024001511", "2024001608", "2024001715", "2024001811", "2024001902", "2024002011", "2024002115", "2024002208", "2024002302", "2024002408", "2024002511", "2024002603", "2024002715", "2024002805", "2024002910", "2024003017", "2024003101", "2024003106", "2024003109", "2024003206", "2024003306", "2024003404", "2024003406", "2024003511", "2024003611", "2024003706", "2024003806", "2024003901", "2024004001", "2024004103", "2024004203", "2024004311", "2024004411", "2024004511", "2024004604", "2024004703", "2024004801", "2024004806", "2024004815", "2024004902", "2024005002", "2024005105", "2024005202", "2024005312", "2024005406", "2024005503", "2024005606", "2024005703", "2024005803", "2024005903", "2024006001", "2024006106", "2024006209", "2024006306", "2024006401", "2024006406", "2024006408", "2024006416", "2024006504", "2024006611", "2024006704", "2024006810", "2024006905", "2024007004", "2024007005", "2024007008", "2024007010", "2024007012", "2024007104", "2024007105", "2024007108", "2024007110", "2024007112", "2024007204", "2024007310", "2024007314", "2024007411", "2024007511", "2024007615", "2024007701", "2024007702", "2024007706", "2024007709", "2024007712", "2024007812", "2024007903", "2024007908", "2024007915", "2024008001", "2024008002", "2024008003", "2024008004", "2024008005", "2024008006", "2024008007", "2024008008", "2024008009", "2024008010", "2024008011", "2025000101", "2025000206", "2025000311", "2025000406", "2025000502", "2025000606", "2025000704", "2025000707", "2025000710", "2025000713", "2025000809", "2025000905", "2025001001", "2025001005", "2025001006", "2025001012", "2025001106", "2025001211", "2025001311", "2025001415", "2025001515", "2025001610", "2029000101", "2029000201", "2029000301", "2029000401", "2029000406", "2033003604"];
const renderableHairStyleIds = hairStyleIds;
const renderableDressStyleIds = dressStyleIds;
const renderableHatStyleIds = hatStyleIds;
const appProfileStorageKey = "nindou3PrototypeProfile.v1";
const eyeFrames = Object.fromEntries(eyeStyleIds.map((id) => [id, { front: null, side: null }]));
let selectedNinjuLoadout = loadSavedNinjuLoadout();
let editNinjuDraft = [...selectedNinjuLoadout];
let editNinjuSlotIndex = 0;
let editEyeStyleDraft = defaultEyeStyle;
let ninjuEditorMode = "ninju";
let profileEditorReadOnly = false;
const loadedOugiWeaponKeys = new Set();
const loadingOugiWeaponPromises = new Map();

// ===== Asset Loading =====
function loadImages() {
  const staticImages = Object.entries(imageSources).map(([key, src]) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      images[key] = img;
      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  }));
  const eyeImages = eyeStyleIds.flatMap((id) => ([
    loadEyeFrame(`assets/ninja-composite-parts/eyes-middle/${id}.png`, id, "front"),
    loadEyeFrame(`assets/ninja-composite-parts/eyes-look-right/${id}.png`, id, "side"),
  ]));
  const ninjuImages = defUpFrameSources.map((src, index) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      defUpFrames[index] = img;
      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  }));
  const atkUpImages = atkUpFrameSources.map((src, index) => loadFrame(src, atkUpFrames, index));
  const regenHpSmallImages = regenHpSmallFrameSources.map((src, index) => loadFrame(src, regenHpSmallFrames, index));
  const regenHpLargeImages = regenHpLargeFrameSources.map((src, index) => loadFrame(src, regenHpLargeFrames, index));
  const smallThunderSummonImages = smallThunderSummonFrameSources.map((src, index) => loadFrame(src, smallThunderSummonFrames, index));
  const smallThunderDamagedImages = smallThunderDamagedFrameSources.map((src, index) => loadFrame(src, smallThunderDamagedFrames, index));
  const smallFireSummonImages = smallFireSummonFrameSources.map((src, index) => loadFrame(src, smallFireSummonFrames, index));
  const smallFireDamagedImages = smallFireDamagedFrameSources.map((src, index) => loadFrame(src, smallFireDamagedFrames, index));
  const smallIceSummonImages = smallIceSummonFrameSources.map((src, index) => loadFrame(src, smallIceSummonFrames, index));
  const smallIceDamagedImages = smallIceDamagedFrameSources.map((src, index) => loadFrame(src, smallIceDamagedFrames, index));
  const smallIceBreakImages = smallIceBreakFrameSources.map((src, index) => loadFrame(src, smallIceBreakFrames, index));
  const specialNinjuImages = Object.entries(specialNinjuFrameSources).flatMap(([type, sources]) => (
    sources.map((src, index) => loadFrame(src, specialNinjuFrames[type], index))
  ));
  const specialNinjuHitImages = Object.entries(specialNinjuHitFrameSources).flatMap(([type, sources]) => (
    sources.map((src, index) => loadFrame(src, specialNinjuHitFrames[type], index))
  ));
  const damageFailImages = damageFailFrameSources.map((src, index) => loadFrame(src, damageFailFrames, index));
  const faintedImages = faintedFrameSources.map((src, index) => loadFrame(src, faintedFrames, index));
  const damageSuccessSmallImages = damageSuccessSmallFrameSources.map((src, index) => loadFrame(src, damageSuccessSmallFrames, index));
  const damageSuccessMiddleImages = damageSuccessMiddleFrameSources.map((src, index) => loadFrame(src, damageSuccessMiddleFrames, index));
  const readyImages = moneyDartReadyFrameSources.map((src, index) => loadFrame(src, moneyDartReadyFrames, index));
  const respawnPointerImages = respawnPointerFrameSources.map((src, index) => loadFrame(src, respawnPointerFrames, index));
  const dragArrowImages = Object.entries(dragArrowFrameSources).flatMap(([direction, sources]) => (
    sources.map((src, index) => loadFrame(src, dragArrowFrames[direction], index))
  ));
  const useNinjuImages = Object.entries(useNinjuFrameSources).flatMap(([team, sources]) => (
    sources.map((src, index) => loadFrame(src, useNinjuFrames[team], index))
  ));
  const shootImages = Object.entries(moneyDartShootFrameSources).flatMap(([direction, sources]) => (
    sources.map((src, index) => loadFrame(src, moneyDartShootFrames[direction], index))
  ));
  const weaponImages = weaponDefinitions.flatMap((weapon) => (
    ["right", "left", "up", "down"].flatMap((direction) => (
      ["hand", "attack"].flatMap((kind) => (
        Array.from({ length: weapon.frameCount }, (_, index) => {
          const src = `assets/weapon/${weapon.folder}/${direction}_${kind}/${index + 1}.png`;
          return loadFrame(src, weaponFrames[weapon.key][kind][direction], index);
        })
      ))
    ))
  ));
  const ougiLockImages = ougiLockFrameSources.map((src, index) => loadFrame(src, ougiLockFrames, index));
  const deathImages = deathSkullFrameSources.map((src, index) => loadFrame(src, deathSkullFrames, index));
  const matchEndImages = Object.entries(matchEndFrameSources).flatMap(([team, outcomes]) => (
    Object.entries(outcomes).flatMap(([outcome, sources]) => (
      sources.map((src, index) => loadFrame(src, matchEndFrames[team][outcome], index))
    ))
  ));
  const fireToadImages = Object.entries(fireToadFrameSources).flatMap(([team, directions]) => (
    Object.entries(directions).flatMap(([direction, kinds]) => (
      Object.entries(kinds).flatMap(([kind, sources]) => (
        sources.map((src, index) => loadFrame(src, fireToadFrames[team][direction][kind], index))
      ))
    ))
  ));
  const yashaoImages = [
    ...Object.entries(yashaoFrameSources.idle).flatMap(([direction, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.idle[direction], index))),
    ...Object.entries(yashaoFrameSources.arrive).flatMap(([direction, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.arrive[direction], index))),
    ...Object.entries(yashaoFrameSources.weapon).flatMap(([direction, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.weapon[direction], index))),
    ...Object.entries(yashaoFrameSources.weaponFx).flatMap(([direction, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.weaponFx[direction], index))),
    ...Object.entries(yashaoFrameSources.ougi).flatMap(([slot, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.ougi[slot], index))),
    ...Object.entries(yashaoFrameSources.ougiFx).flatMap(([slot, sources]) => sources.map((src, index) => loadFrame(src, yashaoFrames.ougiFx[slot], index))),
    ...yashaoFrameSources.enter.map((src, index) => loadFrame(src, yashaoFrames.enter, index)),
    ...yashaoFrameSources.showFingers.map((src, index) => loadFrame(src, yashaoFrames.showFingers, index)),
    ...yashaoFrameSources.faint.map((src, index) => loadFrame(src, yashaoFrames.faint, index)),
  ];
  const chargeRedImages = chargeRedFrameSources.map((src, index) => loadFrame(src, chargeRedFrames, index));
  const chargeYellowImages = chargeYellowFrameSources.map((src, index) => loadFrame(src, chargeYellowFrames, index));
  return Promise.all([...staticImages, ...eyeImages, ...ninjuImages, ...atkUpImages, ...regenHpSmallImages, ...regenHpLargeImages, ...smallThunderSummonImages, ...smallThunderDamagedImages, ...smallFireSummonImages, ...smallFireDamagedImages, ...smallIceSummonImages, ...smallIceDamagedImages, ...smallIceBreakImages, ...specialNinjuImages, ...specialNinjuHitImages, ...damageFailImages, ...faintedImages, ...damageSuccessSmallImages, ...damageSuccessMiddleImages, ...chargeRedImages, ...chargeYellowImages, ...readyImages, ...respawnPointerImages, ...dragArrowImages, ...useNinjuImages, ...weaponImages, ...shootImages, ...ougiLockImages, ...deathImages, ...matchEndImages, ...fireToadImages, ...yashaoImages]);
}

function loadOugiAssetsForWeapon(weaponKey) {
  if (!ougiDefinitions[weaponKey]) return Promise.resolve();
  if (loadedOugiWeaponKeys.has(weaponKey)) return Promise.resolve();
  if (loadingOugiWeaponPromises.has(weaponKey)) return loadingOugiWeaponPromises.get(weaponKey);
  const slots = ougiDefinitions[weaponKey];
  const loads = Object.entries(slots).flatMap(([slot, definition]) => (
    ["right", "left", "up", "down"].flatMap((direction) => (
      Array.from({ length: definition.frameCount }, (_, index) => ([
        loadFrame(`assets/ougi/${definition.folder}/${direction}/${index + 1}.png`, ougiFrames[weaponKey][slot][direction], index),
        loadFrame(`assets/ougi/${definition.folder}/body/${direction}/${index + 1}.png`, ougiBodyFrames[weaponKey][slot][direction], index),
        loadFrame(`assets/ougi/${definition.folder}/fx/${direction}/${index + 1}.png`, ougiFxFrames[weaponKey][slot][direction], index),
      ])).flat()
    ))
  ));
  const promise = Promise.all(loads).then(() => {
    loadedOugiWeaponKeys.add(weaponKey);
    loadingOugiWeaponPromises.delete(weaponKey);
  });
  loadingOugiWeaponPromises.set(weaponKey, promise);
  return promise;
}

function selectedBattleWeaponKeys() {
  const keys = new Set();
  roomCardEls.forEach((card) => {
    if (!card.classList.contains("active-slot")) return;
    keys.add(selectedWeaponKey(card.dataset.team, Number(card.dataset.slot)));
  });
  if (state.gameMode === "yashao") keys.add("weapon19");
  return [...keys].filter((key) => ougiDefinitions[key]);
}

function loadOugiAssetsForSelectedWeapons() {
  const keys = selectedBattleWeaponKeys();
  if (keys.length === 0) return Promise.resolve();
  setMessage(`Loading Ougi assets for ${keys.length} weapon${keys.length === 1 ? "" : "s"}...`);
  return Promise.all(keys.map(loadOugiAssetsForWeapon));
}

function loadFrame(src, target, index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      target[index] = img;
      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  });
}

function loadEyeFrame(src, id, kind) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      eyeFrames[id][kind] = img;
      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  });
}

// ===== Game Setup =====
function resetGame() {
  const now = performance.now();
  const keepRoomState = state.inRoom;
  state.objects = buildMapObjects();
  state.units = buildStartingUnits();
  state.attacks = [];
  state.projectiles = [];
  state.moneyDartCasts = [];
  state.ninjuDamageEffects = [];
  state.ougiCasts = [];
  state.deathAnimations = [];
  state.pendingResult = null;
  state.resultOverlayAt = 0;
  state.yashaoEffects = [];
  state.ougiKeyDown = false;
  state.selectedId = 1;
  state.pressedUnit = null;
  state.dragMoved = false;
  state.charging = false;
  state.gameOver = false;
  state.countdownStart = 0;
  state.matchStart = now;
  state.matchEnd = 0;
  state.result = null;
  state.resultClickableAt = 0;
  state.startSoundPlayed = true;
  state.endSoundPlayed = false;
  state.endSoundInstance = null;
  state.inRoom = keepRoomState;
  setMessage("Start.");
  updatePanel();
}

function makeUnit(id, name, team, x, y, weaponKey = defaultWeaponKey, controlMode = "ai_beginner", hpMax = maxHp, roomSlotKey = "") {
  const aiNextThink = controlMode === "player" ? 0 : performance.now() + 520 + Math.random() * 500;
  const storage = roomSlotKey ? storageForRoomSlotKey(roomSlotKey) : createDefaultPlayerStorage();
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  return { id, name, team, x, y, hp: hpMax, maxHp: hpMax, skill: maxSkill, ougi: 0, soulSteps: 0, exp: progression.exp, level: progression.level, rankTitle: progression.rankTitle, classBranch: storage.classBranch || "", gold: storage.gold || 0, items: { ...(storage.items || {}) }, itemSlots: [...(storage.itemSlots || [])], eyeStyle: normalizedEyeStyle(storage.eyeStyle), roomSlotKey, facing: team === "blue" ? "right" : "left", alive: true, moveT: 1, fromX: x, fromY: y, hitFlash: 0, respawning: false, respawnTipUntil: 0, aiNextThink, aiActionAt: 0, aiPlanKey: "", ninju: null, steelUntil: 0, hotBloodUntil: 0, buffAuraType: "", disabledUntil: 0, invincibleUntil: 0, moneyDart: null, fireToadFacing: "", fireToadTransformUntil: 0, fireToadTransformStartedAt: 0, fireToadUntil: 0, fireToadStartedAt: 0, fireToadDurationMs: 0, ninjuLockedUntil: 0, ougiCastUntil: 0, ougiCcUntil: 0, ougiInvincibleAt: 0, ougiInvincibleUntil: 0, weaponKey, controlMode, weaponReadyAt: 0, kills: 0, damageDone: 0, damageTaken: 0 };
}

function roomStorageKey(team, slot) {
  return `${team}${slot}`;
}

function createDefaultPlayerStorage() {
  return { exp: defaultPlayerExp, classBranch: "", gold: 0, items: {}, itemSlots: [], ninjuLoadout: [...selectedNinjuLoadout], eyeStyle: defaultEyeStyle, hairStyle: defaultHairStyle, dressStyle: defaultDressStyle, hatStyle: defaultHatStyle, eyeStyleVersion: eyeStyleSchemaVersion };
}

function normalizedEyeStyle(style) {
  const value = String(style || defaultEyeStyle);
  return eyeStyleIds.includes(value) ? value : defaultEyeStyle;
}

function normalizedAvatarStyle(style, allowedIds, fallback) {
  const value = String(style || fallback);
  return allowedIds.includes(value) ? value : fallback;
}

function normalizedHairStyle(style) {
  return normalizedAvatarStyle(style, hairStyleIds, defaultHairStyle);
}

function normalizedRenderableHairStyle(style) {
  return normalizedAvatarStyle(style, renderableHairStyleIds, defaultHairStyle);
}

function normalizedDressStyle(style) {
  return normalizedAvatarStyle(style, dressStyleIds, defaultDressStyle);
}

function normalizedRenderableDressStyle(style) {
  return normalizedAvatarStyle(style, renderableDressStyleIds, defaultDressStyle);
}

function normalizedHatStyle(style) {
  return normalizedAvatarStyle(style, hatStyleIds, defaultHatStyle);
}

function normalizedRenderableHatStyle(style) {
  return normalizedAvatarStyle(style, renderableHatStyleIds, defaultHatStyle);
}

function eyeImagePath(style, facing = "front") {
  const id = normalizedEyeStyle(style);
  const folder = facing === "side" ? "eyes-look-right" : "eyes-middle";
  return `assets/ninja-composite-parts/${folder}/${id}.png`;
}

function storageForRoomSlotKey(key) {
  if (!state.playerStorage[key]) state.playerStorage[key] = createDefaultPlayerStorage();
  const storage = state.playerStorage[key];
  if (!storage.items) storage.items = {};
  if (!storage.itemSlots) storage.itemSlots = [];
  if (!Array.isArray(storage.ninjuLoadout)) storage.ninjuLoadout = [...selectedNinjuLoadout];
  if (!Number.isFinite(Number(storage.exp))) storage.exp = defaultPlayerExp;
  storage.exp = Math.max(0, Math.floor(Number(storage.exp) || 0));
  storage.classBranch = storage.classBranch || "";
  storage.gold = Math.max(0, Math.floor(Number(storage.gold) || 0));
  storage.eyeStyle = normalizedEyeStyle(storage.eyeStyle);
  storage.hairStyle = normalizedHairStyle(storage.hairStyle);
  storage.dressStyle = normalizedDressStyle(storage.dressStyle);
  storage.hatStyle = normalizedHatStyle(storage.hatStyle);
  if ((storage.eyeStyleVersion || 0) < eyeStyleSchemaVersion) {
    if (storage.eyeStyle === legacyDefaultEyeStyle) storage.eyeStyle = defaultEyeStyle;
    storage.eyeStyleVersion = eyeStyleSchemaVersion;
  }
  storage.ninjuLoadout = normalizedNinjuLoadout(storage.ninjuLoadout, { enforceAvailability: true, storage });
  return storage;
}

function syncUnitStorage(unit) {
  if (!unit?.roomSlotKey) return;
  const storage = storageForRoomSlotKey(unit.roomSlotKey);
  storage.exp = Math.max(0, Math.floor(Number(unit.exp) || 0));
  storage.classBranch = unit.classBranch || "";
  storage.gold = Math.max(0, Math.floor(Number(unit.gold) || 0));
  storage.items = { ...(unit.items || {}) };
  storage.itemSlots = [...(unit.itemSlots || [])];
  storage.eyeStyle = normalizedEyeStyle(unit.eyeStyle);
  storage.eyeStyleVersion = eyeStyleSchemaVersion;
  refreshUnitProgression(unit);
  renderRoomInventoryPanel();
  updateRoomProgressionLabels();
  if (unit.roomSlotKey === roomStorageKey("blue", 1)) syncSelectedCharacterFromBlueSlot();
}

function refreshUnitProgression(unit) {
  if (!unit) return null;
  const progression = progressionSummaryForExp(unit.exp, unit.classBranch);
  unit.exp = progression.exp;
  unit.level = progression.level;
  unit.rankTitle = progression.rankTitle;
  return progression;
}

function formatProgressionLine(storage) {
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  return `Lv. ${progression.level} Role: ${progression.rankTitle}`;
}

function createDefaultAppProfile() {
  return {
    accountName: "Player",
    characters: [],
    selectedCharacterId: "",
  };
}

function loadAppProfile() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(appProfileStorageKey) || "null");
    if (saved && Array.isArray(saved.characters)) {
      return {
        accountName: String(saved.accountName || "Player").slice(0, 18) || "Player",
        characters: saved.characters.map(normalizedCharacterProfile).filter(Boolean),
        selectedCharacterId: String(saved.selectedCharacterId || ""),
      };
    }
  } catch (_) {
    // Broken profile data should not block the local prototype from starting.
  }
  return createDefaultAppProfile();
}

function saveAppProfile() {
  window.localStorage.setItem(appProfileStorageKey, JSON.stringify(state.appProfile || createDefaultAppProfile()));
}

function normalizedCharacterProfile(character) {
  if (!character) return null;
  const name = String(character.name || "Blue1").trim().slice(0, 16) || "Blue1";
  const storage = { ...createDefaultPlayerStorage(), ...(character.storage || {}) };
  storage.eyeStyle = normalizedEyeStyle(character.eyeStyle || storage.eyeStyle);
  storage.hairStyle = normalizedHairStyle(character.hairStyle || storage.hairStyle);
  storage.dressStyle = normalizedDressStyle(character.dressStyle || storage.dressStyle);
  storage.hatStyle = normalizedHatStyle(character.hatStyle || storage.hatStyle);
  storage.ninjuLoadout = normalizedNinjuLoadout(storage.ninjuLoadout || selectedNinjuLoadout, { enforceAvailability: true, storage });
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  storage.exp = progression.exp;
  return {
    id: String(character.id || `char_${Date.now()}`),
    name,
    teamColor: character.teamColor === "grey" ? "grey" : "blue",
    eyeStyle: normalizedEyeStyle(character.eyeStyle || storage.eyeStyle),
    hairStyle: normalizedHairStyle(character.hairStyle || storage.hairStyle),
    dressStyle: normalizedDressStyle(character.dressStyle || storage.dressStyle),
    hatStyle: normalizedHatStyle(character.hatStyle || storage.hatStyle),
    storage,
  };
}

function selectedCharacterProfile() {
  const profile = state.appProfile || createDefaultAppProfile();
  return profile.characters.find((character) => character.id === profile.selectedCharacterId) || profile.characters[0] || null;
}

function characterAvatarPath(character) {
  return `assets/ninja-${character?.teamColor === "grey" ? "grey" : "blue"}/idleDown.png`;
}

const nekomataLocations = [
  { key: "haguro", label: "Haguro", x: 13.2, y: 18.2, w: 15.6, h: 10.2 },
  { key: "biwa", label: "Biwa", x: 4.5, y: 40.6, w: 15.4, h: 9.8 },
  { key: "naniwa", label: "Naniwa", x: 25.4, y: 60.8, w: 16.4, h: 10.4 },
  { key: "iga", label: "IGA", x: 47.5, y: 72.2, w: 16.2, h: 10.4, action: "villageHall" },
  { key: "kouga", label: "Kouga", x: 65.4, y: 36.8, w: 15.8, h: 10.4 },
  { key: "zizou-park", label: "Zizou Park", x: 35.5, y: 13.2, w: 15.2, h: 7.5 },
  { key: "meow-market", label: "Meow Market", x: 44.6, y: 23.5, w: 16.6, h: 7.5 },
  { key: "issun-mall", label: "Issun Mall", x: 80.8, y: 30.4, w: 17.4, h: 8.0 },
  { key: "monkey-spring", label: "Monkey Spring", x: 55.8, y: 44.1, w: 17.6, h: 7.5 },
  { key: "milk-beach", label: "Milk Beach", x: 3.5, y: 72.7, w: 12.6, h: 8.2 },
  { key: "breeze-ridge", label: "Breeze Ridge", x: 84.5, y: 70.8, w: 14.2, h: 8.2 },
];

const villageRooms = [
  { id: "rm-101", number: "001", title: "IGA Training Pit", mode: "Brawl", currentPlayers: 3, maxPlayers: 6 },
  { id: "rm-102", number: "002", title: "1v1 Deathmatch", mode: "Sudden Death", currentPlayers: 1, maxPlayers: 2 },
  { id: "rm-103", number: "003", title: "Casual Slashing", mode: "Brawl", currentPlayers: 5, maxPlayers: 6 },
  { id: "rm-104", number: "004", title: "Boss Raid Test", mode: "Mission", currentPlayers: 2, maxPlayers: 4 },
];

function initializeAppFlow() {
  state.appProfile = loadAppProfile();
  if (loginNameInput) loginNameInput.value = state.appProfile.accountName || "Player";
  setupCreateCharacterEyeSelect();
  const selected = selectedCharacterProfile();
  if (selected) {
    state.appProfile.selectedCharacterId = selected.id;
    syncSelectedCharacterToRoom();
  }
  const pendingRoomId = consumePendingRoomJoin();
  if (pendingRoomId) {
    enterNativePlayerLobby(pendingRoomId);
    return;
  }
  setAppScreen("login");
}

function setAppScreen(screen) {
  state.appScreen = screen;
  const flowScreen = !["preGameLobby", "match"].includes(screen);
  document.body.classList.toggle("app-flow-mode", flowScreen);
  document.body.classList.toggle("room-mode", screen !== "match");
  flowScreenEls.forEach((element) => {
    element.classList.toggle("active", element.dataset.screen === screen);
  });
  if (screen === "characterSelect") renderCharacterSelect();
  if (screen === "characterCreate") renderCreateCharacter();
  if (screen === "worldMap") renderWorldMap();
  if (screen === "commonRoom") renderVillageHall();
  if (screen === "worldMap" || screen === "commonRoom") renderFlowCharacterSummary();
  if (screen === "preGameLobby") {
    state.inRoom = true;
    syncSelectedCharacterToRoom();
    renderRoomInventoryPanel();
    syncBgm();
  }
}

function consumePendingRoomJoin() {
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get("room") || window.sessionStorage.getItem("nindou.pendingRoomJoin") || "";
  window.sessionStorage.removeItem("nindou.pendingRoomJoin");
  return roomId;
}

function enterNativePlayerLobby(roomId = "") {
  state.currentRoomId = String(roomId || "");
  window.sessionStorage.setItem("nindou.currentRoomId", state.currentRoomId);
  setAppScreen("preGameLobby");
}

window.NindouGame = {
  ...(window.NindouGame || {}),
  enterNativePlayerLobby,
};

function continueFromLogin() {
  if (!state.appProfile) state.appProfile = createDefaultAppProfile();
  state.appProfile.accountName = String(loginNameInput?.value || "Player").trim().slice(0, 18) || "Player";
  saveAppProfile();
  setAppScreen("characterSelect");
}

const avatarOffsets = {
  "body-front": { top: 10, left: 10.5, width: 45.5, height: 52.5 },
  "eyes-front-default": { top: 25.5, left: 17, width: 35, height: 16 },
  "dress-front-default": { top: 45, left: 21.5, width: 25, height: 18.5 },
  "hair-front-default": { top: 3.5, left: 5, width: 55, height: 41 },
  "hat-front-default": { top: -2, left: 0, width: 65, height: 33 },
};
const assetSpecificOverrides = {
  // Nudge the red bear-head hair asset slightly left to cover the head skin
  "2032001606": { leftNudge: -4, topNudge: 0 },
  // Nudge this specific dress down and left to align perfectly with the legs
  "2052001111": { leftNudge: -2, topNudge: 1.5 },
};
const avatarAssetSources = {
  "body-front": "assets/nin/body/in_body-front.svg",
};

function avatarLayerStyle(assetName, styleId) {
  const box = avatarOffsets[assetName];
  if (!box) return "";

  let top = box.top || 0;
  let left = box.left || 0;

  // Apply item-specific adjustments dynamically if they exist
  if (styleId && assetSpecificOverrides[styleId]) {
    if (assetSpecificOverrides[styleId].topNudge) top += assetSpecificOverrides[styleId].topNudge;
    if (assetSpecificOverrides[styleId].leftNudge) left += assetSpecificOverrides[styleId].leftNudge;
  }

  let zIndex = 10;
  if (assetName.includes("dress")) zIndex = 20;
  if (assetName.includes("hair")) zIndex = 30;
  if (assetName.includes("eyes")) zIndex = 40;
  if (assetName.includes("hat")) zIndex = 50;

  return `position: absolute; z-index: ${zIndex}; top: ${top}px; left: ${left}px; width: ${box.width}px; height: ${box.height}px;`;
}

function baseAvatarEyeImagePath(style) {
  const id = normalizedAvatarStyle(style, renderableEyeStyleIds, defaultEyeStyle);
  return `assets/nin/eyes/${id}.svg`;
}

function baseAvatarHairImagePath(styleId) {
  const id = normalizedRenderableHairStyle(styleId);
  return `assets/nin/hair/${id}-front.svg`;
}

function baseAvatarDressImagePath(styleId) {
  const id = normalizedRenderableDressStyle(styleId);
  return `assets/nin/dresses/${id}-front.svg`;
}

function baseAvatarHatImagePath(styleId) {
  const id = normalizedRenderableHatStyle(styleId);
  return id === defaultHatStyle ? "" : `assets/nin/hats/${id}-front.svg`;
}

function baseAvatarMarkup(eyeStyle, hairStyle = defaultHairStyle, dressStyle = defaultDressStyle, hatStyle = defaultHatStyle, className = "") {
  const normalizedEye = normalizedAvatarStyle(eyeStyle, renderableEyeStyleIds, defaultEyeStyle);
  const normalizedHair = normalizedRenderableHairStyle(hairStyle);
  const normalizedDress = normalizedRenderableDressStyle(dressStyle);
  const normalizedHat = normalizedRenderableHatStyle(hatStyle);
  const hatSrc = baseAvatarHatImagePath(normalizedHat);
  return `
    <div class="base-avatar ${className}">
      <img class="base-avatar-body-img" src="${avatarAssetSources["body-front"]}" alt="" style="${avatarLayerStyle("body-front")}">
      <img class="base-avatar-eyes-img" src="${baseAvatarEyeImagePath(normalizedEye)}" alt="" style="${avatarLayerStyle("eyes-front-default", normalizedEye)}">
      <img class="base-avatar-dress-img" src="${baseAvatarDressImagePath(normalizedDress)}" alt="" style="${avatarLayerStyle("dress-front-default", normalizedDress)}">
      <img class="base-avatar-hair-img" src="${baseAvatarHairImagePath(normalizedHair)}" alt="" style="${avatarLayerStyle("hair-front-default", normalizedHair)}">
      ${hatSrc ? `<img class="base-avatar-hat-img" src="${hatSrc}" alt="" style="${avatarLayerStyle("hat-front-default", normalizedHat)}">` : ""}
    </div>
  `;
}

function renderWorldMap() {
  if (mapLocationNameEl) mapLocationNameEl.textContent = "Nekomata";
  if (!nekomataLocationZonesEl || nekomataLocationZonesEl.dataset.rendered === "true") return;
  nekomataLocationZonesEl.innerHTML = "";
  nekomataLocations.forEach((location) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nekomata-location-zone";
    button.dataset.locationKey = location.key;
    button.style.setProperty("--x", `${location.x}%`);
    button.style.setProperty("--y", `${location.y}%`);
    button.style.setProperty("--w", `${location.w}%`);
    button.style.setProperty("--h", `${location.h}%`);
    button.setAttribute("aria-label", location.label);
    button.addEventListener("mouseenter", () => {
      if (mapLocationNameEl) mapLocationNameEl.textContent = location.label;
    });
    button.addEventListener("focus", () => {
      if (mapLocationNameEl) mapLocationNameEl.textContent = location.label;
    });
    button.addEventListener("mouseleave", () => {
      if (mapLocationNameEl) mapLocationNameEl.textContent = "Nekomata";
    });
    button.addEventListener("blur", () => {
      if (mapLocationNameEl) mapLocationNameEl.textContent = "Nekomata";
    });
    button.addEventListener("click", () => {
      if (mapLocationNameEl) mapLocationNameEl.textContent = location.label;
      if (location.action === "villageHall") {
        setAppScreen("commonRoom");
        return;
      }
      console.log("Zone locked in current prototype", location.key);
      setMessage("Zone locked in current prototype");
      button.classList.remove("coming-soon-pulse");
      void button.offsetWidth;
      button.classList.add("coming-soon-pulse");
    });
    nekomataLocationZonesEl.appendChild(button);
  });
  nekomataLocationZonesEl.dataset.rendered = "true";
}

function joinVillageRoom(roomId) {
  enterNativePlayerLobby(roomId);
}

function renderVillageHall(rooms = villageRooms) {
  if (!villageRoomListPanel) return;
  villageRoomListPanel.innerHTML = "";
  rooms.forEach((room) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "room-card";
    card.dataset.roomId = room.id;
    card.innerHTML = `
      <div>
        <strong>No.${room.number} ${room.title}</strong>
        <span>Mode: ${room.mode}</span>
      </div>
      <em>${room.currentPlayers}/${room.maxPlayers}</em>
    `;
    card.addEventListener("click", () => joinVillageRoom(room.id));
    villageRoomListPanel.appendChild(card);
  });
}

function setupCreateCharacterEyeSelect() {
  if (!characterEyeSelect) return;
  characterHairSelect = ensureCreateCharacterAvatarSelect("hairSelect", "Hair", characterEyeSelect.closest(".flow-field"));
  characterDressSelect = ensureCreateCharacterAvatarSelect("dressSelect", "Dress", characterHairSelect?.closest(".flow-field") || characterEyeSelect.closest(".flow-field"));
  characterHatSelect = ensureCreateCharacterAvatarSelect("hatSelect", "Hat", characterDressSelect?.closest(".flow-field") || characterEyeSelect.closest(".flow-field"));
  fillAvatarSelect(characterEyeSelect, renderableEyeStyleIds, "Eyes", defaultEyeStyle);
  fillAvatarSelect(characterHairSelect, hairStyleIds, "Hair", defaultHairStyle);
  fillAvatarSelect(characterDressSelect, dressStyleIds, "Dress", defaultDressStyle);
  fillAvatarSelect(characterHatSelect, hatStyleIds, "Hat", defaultHatStyle, { noneLabel: "No Hat" });
  bindCreateAvatarSelectEvents();
}

function ensureCreateCharacterAvatarSelect(id, labelText, afterField) {
  const existing = document.getElementById(id) || document.getElementById(`character${labelText}Select`);
  if (existing) return existing;
  if (!afterField) return null;
  const field = document.createElement("label");
  field.className = "flow-field avatar-customization-field";
  field.innerHTML = `<span>${labelText}</span><select id="${id}"></select>`;
  afterField.insertAdjacentElement("afterend", field);
  return field.querySelector("select");
}

function fillAvatarSelect(select, ids, labelPrefix, selectedId, options = {}) {
  if (!select) return;
  select.innerHTML = ids.map((id) => {
    const label = id === defaultHatStyle ? (options.noneLabel || "None") : `${labelPrefix} ${id}`;
    return `<option value="${id}"${id === selectedId ? " selected" : ""}>${label}</option>`;
  }).join("");
  select.value = selectedId;
}

function createAvatarSelectValue(id, fallback) {
  return document.getElementById(id)?.value || fallback;
}

function bindCreateAvatarSelectEvents() {
  ["hairSelect", "dressSelect", "hatSelect", "eyesSelect"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.removeEventListener("change", updateCreateCharacterPreview);
      element.addEventListener("change", updateCreateCharacterPreview);
    }
  });
}

function renderCharacterSelect() {
  if (!characterListEl) return;
  const profile = state.appProfile || createDefaultAppProfile();
  characterListEl.innerHTML = "";
  const maxCharacterSlots = 3;
  if (newCharacterBtn) {
    newCharacterBtn.disabled = profile.characters.length >= maxCharacterSlots;
    newCharacterBtn.textContent = profile.characters.length >= maxCharacterSlots ? "Full" : "Create";
  }
  for (let index = 0; index < maxCharacterSlots; index++) {
    const character = profile.characters[index];
    if (!character) {
      const emptyCard = document.createElement("article");
      emptyCard.className = "character-card empty";
      emptyCard.innerHTML = `
        <div class="empty-slot-mark">+</div>
        <strong>Empty Slot</strong>
        <span>Create a ninja</span>
        <small>Slot ${index + 1}</small>
        <button type="button">Create</button>
      `;
      emptyCard.querySelector("button").addEventListener("click", () => setAppScreen("characterCreate"));
      characterListEl.appendChild(emptyCard);
      continue;
    }
    const storage = character.storage || createDefaultPlayerStorage();
    const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
    const card = document.createElement("article");
    card.className = "character-card";
    card.innerHTML = `
      <div class="character-avatar-wrap">
        ${baseAvatarMarkup(character.eyeStyle || storage.eyeStyle, character.hairStyle || storage.hairStyle, character.dressStyle || storage.dressStyle, character.hatStyle || storage.hatStyle)}
      </div>
      <strong>${character.name}</strong>
      <div class="character-card-rank">
        <img class="character-card-rank-mark" src="${progression.rankMarkPath}" alt="${progression.rankTitle} rank mark">
        <span>Lv. ${progression.level} ${progression.rankTitle}</span>
      </div>
      <small>${storage.classBranch === "onmyoji" ? "Onmyoji" : "Night Blade"}</small>
      <button type="button">Select</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      profile.selectedCharacterId = character.id;
      saveAppProfile();
      syncSelectedCharacterToRoom();
      setAppScreen("worldMap");
    });
    characterListEl.appendChild(card);
  }
}

function renderCreateCharacter() {
  if (characterNameInput) characterNameInput.value = nextCharacterName();
  if (characterTeamSelect) characterTeamSelect.value = "blue";
  if (characterEyeSelect) characterEyeSelect.value = defaultEyeStyle;
  updateCreateCharacterPreview();
}

function nextCharacterName() {
  const count = (state.appProfile?.characters?.length || 0) + 1;
  return count === 1 ? "Blue1" : `Ninja${count}`;
}

function updateCreateCharacterPreview() {
  if (createAvatarPreview) {
    createAvatarPreview.innerHTML = "";
    createAvatarPreview.innerHTML = baseAvatarMarkup(
      createAvatarSelectValue("eyesSelect", defaultEyeStyle),
      createAvatarSelectValue("hairSelect", defaultHairStyle),
      createAvatarSelectValue("dressSelect", defaultDressStyle),
      createAvatarSelectValue("hatSelect", defaultHatStyle),
      "create-base-avatar"
    );
  }
}

function saveCreatedCharacter() {
  if (!state.appProfile) state.appProfile = createDefaultAppProfile();
  if (state.appProfile.characters.length >= 3) {
    setAppScreen("characterSelect");
    return;
  }
  const storage = createDefaultPlayerStorage();
  storage.eyeStyle = normalizedEyeStyle(characterEyeSelect?.value);
  storage.hairStyle = normalizedHairStyle(characterHairSelect?.value);
  storage.dressStyle = normalizedDressStyle(characterDressSelect?.value);
  storage.hatStyle = normalizedHatStyle(characterHatSelect?.value);
  const character = normalizedCharacterProfile({
    id: `char_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    name: characterNameInput?.value || nextCharacterName(),
    teamColor: characterTeamSelect?.value || "blue",
    eyeStyle: storage.eyeStyle,
    hairStyle: storage.hairStyle,
    dressStyle: storage.dressStyle,
    hatStyle: storage.hatStyle,
    storage,
  });
  state.appProfile.characters.push(character);
  state.appProfile.selectedCharacterId = character.id;
  saveAppProfile();
  syncSelectedCharacterToRoom();
  setAppScreen("characterSelect");
}

function syncSelectedCharacterToRoom() {
  const character = selectedCharacterProfile();
  if (!character) return;
  const storage = storageForRoomSlotKey(roomStorageKey("blue", 1));
  Object.assign(storage, { ...character.storage });
  storage.eyeStyle = normalizedEyeStyle(character.eyeStyle || storage.eyeStyle);
  storage.hairStyle = normalizedHairStyle(character.hairStyle || storage.hairStyle);
  storage.dressStyle = normalizedDressStyle(character.dressStyle || storage.dressStyle);
  storage.hatStyle = normalizedHatStyle(character.hatStyle || storage.hatStyle);
  storage.ninjuLoadout = normalizedNinjuLoadout(storage.ninjuLoadout, { enforceAvailability: true, storage });
  selectedNinjuLoadout = [...storage.ninjuLoadout];
  const blueCard = roomCardEls.find((card) => card.dataset.team === "blue" && Number(card.dataset.slot) === 1);
  if (blueCard) {
    const nameEl = blueCard.querySelector(".room-name");
    const avatarEl = blueCard.querySelector(".room-avatar");
    if (nameEl) nameEl.textContent = character.name;
    if (avatarEl) avatarEl.src = characterAvatarPath(character);
  }
  updateRoomEyeImages();
  renderRoomCardAvatars();
  updateRoomProgressionLabels();
}

function syncSelectedCharacterFromBlueSlot() {
  const character = selectedCharacterProfile();
  if (!character) return;
  const storage = storageForRoomSlotKey(roomStorageKey("blue", 1));
  character.storage = { ...storage, ninjuLoadout: [...storage.ninjuLoadout] };
  character.eyeStyle = normalizedEyeStyle(storage.eyeStyle);
  character.hairStyle = normalizedHairStyle(storage.hairStyle);
  character.dressStyle = normalizedDressStyle(storage.dressStyle);
  character.hatStyle = normalizedHatStyle(storage.hatStyle);
  saveAppProfile();
}

function renderFlowCharacterSummary() {
  const character = selectedCharacterProfile();
  if (!character) return;
  const storage = character.storage || createDefaultPlayerStorage();
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  if (selectedCharacterTitle) selectedCharacterTitle.textContent = `${character.name} - Lv. ${progression.level} ${progression.rankTitle}`;
  if (commonCharacterName) commonCharacterName.textContent = character.name;
  if (commonCharacterRank) commonCharacterRank.textContent = `Lv. ${progression.level} ${progression.rankTitle}`;
  if (commonCharacterRankMark) {
    commonCharacterRankMark.src = progression.rankMarkPath;
    commonCharacterRankMark.alt = `${progression.rankTitle} rank mark`;
  }
  if (commonAvatarSlot) commonAvatarSlot.innerHTML = baseAvatarMarkup(character.eyeStyle || storage.eyeStyle, character.hairStyle || storage.hairStyle, character.dressStyle || storage.dressStyle, character.hatStyle || storage.hatStyle, "common-base-avatar");
  if (commonAvatarEyes) commonAvatarEyes.src = eyeImagePath(character.eyeStyle || storage.eyeStyle);
}

function updateRoomProgressionLabels() {
  if (!progressionUiVisible) return;
  roomCardEls.forEach((card) => {
    if (!card.classList.contains("active-slot")) return;
    const levelEl = card.querySelector(".room-level");
    const storage = storageForRoomSlotKey(roomStorageKey(card.dataset.team, Number(card.dataset.slot)));
    const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
    if (levelEl) levelEl.textContent = formatProgressionLine(storage);
    const rankMarkEl = card.querySelector(".room-rank-emoji");
    if (rankMarkEl) {
      rankMarkEl.src = progression.rankMarkPath;
      rankMarkEl.alt = `${progression.rankTitle} rank mark`;
    }
    const rankTextEl = card.querySelector(".room-rank-text");
    if (rankTextEl) rankTextEl.textContent = progression.rankTitle;
  });
}

function buildStartingUnits() {
  const units = [];
  let id = 1;
  const addTeam = (team, label) => {
    const activeSlots = roomCardEls
      .filter((card) => card.classList.contains("active-slot") && card.dataset.team === team)
      .map((card) => Number(card.dataset.slot))
      .sort((a, b) => a - b);
    const cells = shuffledCellsInArea(startingAreas[team]).filter((cell) => !isBlockedCell(cell.x, cell.y) && !units.some((unit) => unit.x === cell.x && unit.y === cell.y));
    const count = Math.min(activeSlots.length, cells.length);
    for (let i = 0; i < count; i++) {
      const slot = activeSlots[i];
      const card = roomCardEls.find((element) => element.dataset.team === team && Number(element.dataset.slot) === slot);
      const roomName = card?.querySelector(".room-name")?.textContent?.trim() || `${label}${slot}`;
      const controlMode = selectedControlMode(team, slot);
      const weaponKey = selectedWeaponKey(team, slot);
      units.push(makeUnit(
        id,
        roomName,
        team,
        cells[i].x,
        cells[i].y,
        weaponKey,
        controlMode,
        selectedHpValue(team, slot),
        roomStorageKey(team, slot),
      ));
      id += 1;
    }
  };

  addTeam("blue", "Blue");
  if (state.gameMode === "yashao") {
    const boss = makeUnit(id, "Yashao", "grey", 17, 6, "weapon19", "ai_yashao", 1200, "");
    const introStartedAt = performance.now();
    const visibleAt = introStartedAt + yashaoHiddenIntroMs;
    const activeAt = visibleAt + yashaoFrozenIntroMs;
    boss.isYashao = true;
    boss.skill = maxSkill;
    boss.yashaoHiddenUntil = visibleAt;
    boss.yashaoFrozenUntil = activeAt;
    boss.aiNextThink = activeAt;
    boss.invincibleUntil = visibleAt;
    boss.yashaoAction = { type: "enter", startedAt: visibleAt, duration: 720 };
    units.push(boss);
  } else {
    addTeam("grey", "Grey");
  }
  return units;
}

function setupWeaponSelects() {
  if (weaponSelectEls.length === 0) return;
  const optionsHtml = weaponDefinitions.map((weapon) => (
    `<option value="${weapon.key}"${weapon.key === defaultWeaponKey ? " selected" : ""}>${weapon.label}</option>`
  )).join("");
  weaponSelectEls.forEach((select) => {
    const current = weaponDefinitionByKey[select.value] ? select.value : defaultWeaponKey;
    select.innerHTML = optionsHtml;
    select.value = current;
    select.addEventListener("change", updateRoomWeaponPreviews);
  });
  updateRoomWeaponPreviews();
}

function ensureAuthenticRoomCardLayers() {
  roomCardEls.forEach((card) => {
    const playerIndex = roomCardEls.indexOf(card) + 1;
    card.dataset.playerIndex = String(playerIndex);

    if (!card.querySelector(".room-weapon-preview")) {
      const weaponPreview = document.createElement("img");
      weaponPreview.className = "room-weapon-preview";
      weaponPreview.src = "assets/weapon/blade.png";
      weaponPreview.alt = "";
      card.appendChild(weaponPreview);
    }

    if (!card.querySelector(".room-custom-avatar")) {
      const customAvatar = document.createElement("div");
      customAvatar.className = "room-custom-avatar";
      customAvatar.setAttribute("aria-hidden", "true");
      card.appendChild(customAvatar);
    }

    if (!card.querySelector(".room-rank-emoji")) {
      const rankEmoji = document.createElement("img");
      rankEmoji.className = "room-rank-emoji";
      rankEmoji.src = rankMarkPathForLevel(defaultPlayerLevel);
      rankEmoji.alt = `${rankForLevel(defaultPlayerLevel)} rank mark`;
      card.appendChild(rankEmoji);
    }

    if (!card.querySelector(".room-rank-text")) {
      const rankText = document.createElement("div");
      rankText.className = "room-rank-text";
      rankText.textContent = "Shoshinsha";
      card.appendChild(rankText);
    }

    if (!card.querySelector(".room-info-btn")) {
      const infoButton = document.createElement("button");
      infoButton.className = "room-info-btn";
      infoButton.type = "button";
      infoButton.setAttribute("aria-label", "Edit player profile");
      infoButton.innerHTML = '<img class="room-info-bg" src="assets/runtime/ui_vectors/lobbies/shapes/shapes/1131.svg" alt=""><img class="room-info-icon" src="assets/runtime/ui_vectors/lobbies/shapes/shapes/1132.svg" alt="">';
      infoButton.addEventListener("click", () => {
        const character = playerCharacterForRoomCard(card);
        if (!character) {
          setMessage("AI profile editing is not available yet.");
          return;
        }
        openNinjuEditor({ readOnly: !isLocalEditableRoomCard(card) });
      });
      card.appendChild(infoButton);
    }
  });
  renderRoomCardAvatars();
}

function ensureLobbyBottomButtonArt() {
  if (!roomFrameEl) return;
  if (!roomFrameEl.querySelector(".room-exit-art")) {
    const exitArt = document.createElement("img");
    exitArt.className = "room-bottom-button-art room-exit-art";
    exitArt.src = "dev_assets/exit_button_tight.svg";
    exitArt.alt = "";
    roomFrameEl.appendChild(exitArt);
  }
  if (!roomFrameEl.querySelector(".room-ready-art")) {
    const readyArt = document.createElement("img");
    readyArt.className = "room-bottom-button-art room-ready-art";
    readyArt.src = "dev_assets/yellow_ready_button_tight.svg";
    readyArt.alt = "";
    roomFrameEl.appendChild(readyArt);
  }
}

function weaponPreviewSrcForKey(weaponKey) {
  if (weaponKey === "weapon6") return "assets/room-ui/waiting_room/random_weapon.png";
  return "assets/weapon/blade.png";
}

function updateRoomWeaponPreviews() {
  roomCardEls.forEach((card) => {
    const preview = card.querySelector(".room-weapon-preview");
    const select = card.querySelector(".room-weapon-select");
    if (preview && select) preview.src = weaponPreviewSrcForKey(select.value);
  });
}

function setupControlSelects() {
  if (controlSelectEls.length === 0) return;
  const optionsHtml = `
    <option value="player">Player</option>
    <option value="ai_beginner" selected>Beginner AI</option>
    <option value="ai_money_dart_master">Money Dart Master</option>
    <option value="ai_dart_only_master">Dart Only Master</option>
  `;
  controlSelectEls.forEach((select) => {
    if (!select.innerHTML.trim()) {
      select.innerHTML = optionsHtml;
    } else {
      const current = select.value;
      select.innerHTML = optionsHtml;
      select.value = current;
    }
    if (select.value === "ai") select.value = "ai_beginner";
    if (select.value !== "player" && select.value !== "ai_beginner" && select.value !== "ai_money_dart_master" && select.value !== "ai_dart_only_master") select.value = "player";
    select.addEventListener("change", renderRoomCardAvatars);
  });
}

function setupHpInputs() {
  if (hpInputEls.length === 0) return;
  hpInputEls.forEach((input) => {
    if (!input.value) input.value = String(maxHp);
    const fixed = clamp(Math.round(Number(input.value) || maxHp), 1, 9999);
    input.value = String(fixed);
    input.addEventListener("change", () => {
      const value = clamp(Math.round(Number(input.value) || maxHp), 1, 9999);
      input.value = String(value);
    });
  });
}

function setupRoomSlots() {
  roomCardEls.forEach((card) => {
    const team = card.dataset.team;
    const slot = Number(card.dataset.slot);
    const addBtn = card.querySelector(".room-slot-add");
    const removeBtn = card.querySelector(".room-slot-remove");
    const nameEl = card.querySelector(".room-name");
    const levelEl = card.querySelector(".room-level");
    const controlEl = card.querySelector(".room-control-select");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        card.classList.add("active-slot");
        const storage = storageForRoomSlotKey(roomStorageKey(team, slot));
        if (nameEl) nameEl.textContent = `${team}${slot}`;
        if (levelEl && progressionUiVisible) levelEl.textContent = formatProgressionLine(storage);
        if (controlEl) controlEl.value = "ai_beginner";
        updateRoomEyeImages();
        renderRoomCardAvatars();
        updateRoomWeaponPreviews();
        renderRoomInventoryPanel();
      });
    }
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        if (slot === 1) return;
        card.classList.remove("active-slot");
        renderRoomCardAvatars();
        updateRoomWeaponPreviews();
        renderRoomInventoryPanel();
      });
    }
  });
  roomCardEls.forEach((card) => {
    if (card.classList.contains("active-slot")) storageForRoomSlotKey(roomStorageKey(card.dataset.team, Number(card.dataset.slot)));
  });
  updateRoomEyeImages();
  renderRoomCardAvatars();
  updateRoomProgressionLabels();
}

function updateRoomEyeImages() {
  roomCardEls.forEach((card) => {
    const eyeEl = card.querySelector(".room-avatar-eye");
    if (!eyeEl) return;
    const storage = storageForRoomSlotKey(roomStorageKey(card.dataset.team, Number(card.dataset.slot)));
    eyeEl.src = eyeImagePath(storage.eyeStyle);
  });
}

function playerCharacterForRoomCard(card) {
  if (!card?.classList.contains("active-slot")) return null;
  const controlEl = card.querySelector(".room-control-select");
  if (controlEl?.value !== "player") return null;
  return selectedCharacterProfile();
}

function isLocalEditableRoomCard(card) {
  return card?.dataset.team === "blue" && Number(card.dataset.slot) === 1;
}

function renderRoomCardAvatars() {
  roomCardEls.forEach((card) => {
    const customAvatarEl = card.querySelector(".room-custom-avatar");
    if (!customAvatarEl) return;
    const character = playerCharacterForRoomCard(card);
    const controlEl = card.querySelector(".room-control-select");
    const usesAiAvatar = card.classList.contains("active-slot") && controlEl?.value !== "player";
    card.classList.toggle("uses-custom-avatar", Boolean(character));
    card.classList.toggle("uses-ai-avatar", usesAiAvatar);
    if (!character) {
      customAvatarEl.innerHTML = "";
      return;
    }
    const slotStorage = storageForRoomSlotKey(roomStorageKey(card.dataset.team, Number(card.dataset.slot)));
    const characterStorage = character.storage || createDefaultPlayerStorage();
    const storage = { ...slotStorage, ...characterStorage };
    customAvatarEl.innerHTML = baseAvatarMarkup(
      character.eyeStyle || storage.eyeStyle,
      character.hairStyle || storage.hairStyle,
      character.dressStyle || storage.dressStyle,
      character.hatStyle || storage.hatStyle,
      "room-base-avatar",
    );
  });
}

function describeStoredItems(storage) {
  const slots = storage.itemSlots || [];
  if (slots.length === 0) return "Items: empty";
  return `Items: ${slots.map((type) => `${itemDisplayName(type)} x${storage.items?.[type] || 0}`).join(", ")}`;
}

function itemDisplayName(type) {
  if (type === "backup3") return "Backup";
  return type || "Unknown";
}

function renderRoomInventoryPanel() {
  if (!roomInventoryList) return;
  const activeCards = roomCardEls.filter((card) => card.classList.contains("active-slot"));
  roomInventoryList.innerHTML = activeCards.map((card) => {
    const key = roomStorageKey(card.dataset.team, Number(card.dataset.slot));
    const storage = storageForRoomSlotKey(key);
    const label = card.querySelector(".room-name")?.textContent || key;
    const progression = progressionUiVisible ? progressionSummaryForExp(storage.exp, storage.classBranch) : null;
    const progressionHtml = progression ? `
        <span>Lv. ${progression.level} ${progression.rankTitle}</span>
        <span>EXP: ${progression.nextLevelExp === null ? "MAX" : `${progression.exp}/${progression.nextLevelExp}`}</span>
    ` : "";
    return `
      <div class="room-inventory-row">
        <strong>${label}</strong>
        ${progressionHtml}
        <span>Gold: ${storage.gold || 0}</span>
        <em>${describeStoredItems(storage)}</em>
      </div>
    `;
  }).join("");
}

function toggleRoomInventoryPanel() {
  if (!roomInventoryPanel) return;
  roomInventoryPanel.hidden = !roomInventoryPanel.hidden;
  if (!roomInventoryPanel.hidden) renderRoomInventoryPanel();
}

function selectedWeaponKey(team, slot) {
  const select = weaponSelectEls.find((element) => element.dataset.team === team && Number(element.dataset.slot) === slot);
  return weaponDefinitionByKey[select?.value] ? select.value : defaultWeaponKey;
}

function selectedControlMode(team, slot) {
  const select = controlSelectEls.find((element) => element.dataset.team === team && Number(element.dataset.slot) === slot);
  if (select?.value === "player") return "player";
  if (select?.value === "ai_money_dart_master") return "ai_money_dart_master";
  if (select?.value === "ai_dart_only_master") return "ai_dart_only_master";
  return "ai_beginner";
}

function selectedHpValue(team, slot) {
  const input = hpInputEls.find((element) => element.dataset.team === team && Number(element.dataset.slot) === slot);
  const value = Number(input?.value);
  if (!Number.isFinite(value)) return maxHp;
  return clamp(Math.round(value), 1, 9999);
}

function shuffledCellsInArea(area) {
  const cells = [];
  const xMin = Math.min(area.xMin, area.xMax);
  const xMax = Math.max(area.xMin, area.xMax);
  const yMin = Math.min(area.yMin, area.yMax);
  const yMax = Math.max(area.yMin, area.yMax);

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      cells.push(internalCellCoord({ x, y }));
    }
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells;
}

// ===== Main Loop =====
function draw(now = performance.now()) {
  try {
    const dt = Math.min(0.05, (now - state.lastFrame) / 1000);
    state.lastFrame = now;
    state.pulse += dt;
    updateMatchState(now);
    if (isMatchActive()) {
      updateCharging(dt);
      updateNinju(now);
      updateAi(dt, now);
      updateProjectiles(now);
      updateActiveOugiPathLocks();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackdrop();
    drawBoard();
    drawDrag();
    drawMapObjects();
    if (isMatchEndPromptActive(now)) {
      drawMatchEndPrompt(now);
      drawResultOverlay(false);
      drawGameHud();
      drawNinjuBar();
      updatePanel();
      return;
    }
    drawUnits();
    drawDeathAnimations(now);
    drawNinjuEffects(now);
    drawOugiAnimations(now);
    drawOugiLockIndicators();
    drawMoneyDartShootAnimations(now);
    drawProjectiles(now);
    drawAttacks();
    drawGameHud();
    drawNinjuBar();
    drawCountdownOverlay(now);
    drawResultOverlay();
    updatePanel();
  } catch (error) {
    console.error("Render loop recovered", error);
    state.moneyDartCasts = [];
  state.ougiCasts = [];
    state.projectiles = [];
  } finally {
    requestAnimationFrame(draw);
  }
}

// ===== Per-Frame Updates =====
function updateCharging(dt) {
  if (!state.pressedUnit || state.gameOver) return;
  if (!canUnitMoveNow(state.pressedUnit)) return;
  const held = (performance.now() - state.pressTime) / 1000;
  if (held < holdSeconds) return;
  if (!pointerIsOnUnit(state.pressedUnit)) {
    state.charging = true;
    setMessage(`${state.pressedUnit.name}: move the mouse back onto the character to keep charging.`);
    return;
  }

  state.charging = true;
  state.pressedUnit.skill = Math.min(maxSkill, state.pressedUnit.skill + chargePerSecond * dt);
  setMessage(`${state.pressedUnit.name} charging skill ${state.pressedUnit.skill.toFixed(1)} / ${maxSkill}`);
}

function updateMatchState(now) {
  updatePendingMatchResult(now);
  if (state.matchStart || state.result) return;
  if (!state.countdownStart) state.countdownStart = now;
  if (now - state.countdownStart >= countdownTotalMs) {
    state.matchStart = state.countdownStart + countdownTotalMs;
    state.lastFrame = now;
    if (!state.startSoundPlayed) {
      playSound("gameStarted");
      state.startSoundPlayed = true;
    }
    setMessage("Start.");
  }
}

function isMatchActive() {
  return Boolean(!state.inRoom && state.matchStart && !state.pendingResult && !state.result && !state.gameOver);
}

// ===== Rendering: Background / Board =====
function drawBackdrop() {
  ctx.fillStyle = "#062f37";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawUiPanels();
  if (images.arena) {
    ctx.drawImage(images.arena, grid.left, grid.top, grid.cols * grid.cell, grid.rows * grid.cell);
  } else if (images.bg) {
    ctx.globalAlpha = 0.8;
    ctx.drawImage(images.bg, grid.left, grid.top, grid.cols * grid.cell, grid.rows * grid.cell);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = "#74ad7f";
    ctx.fillRect(grid.left, grid.top, grid.cols * grid.cell, grid.rows * grid.cell);
  }
  drawFrame();
}

function drawUiPanels() {
  const bottom = ui.bottomTop;
  ctx.save();
  ctx.fillStyle = "#074451";
  ctx.fillRect(0, bottom, canvas.width, ui.bottomHeight);
  ctx.fillStyle = "#052b32";
  ctx.fillRect(8, bottom + 10, ui.leftPanelW - 18, ui.bottomHeight - 18);
  ctx.fillRect(ui.midX + 10, bottom + 10, canvas.width - ui.midX - 18, ui.bottomHeight - 18);
  ctx.fillStyle = "rgba(0,0,0,.28)";
  ctx.fillRect(0, 0, canvas.width, 32);
  ctx.restore();
}

function drawFrame() {
  const bottom = ui.bottomTop;
  ctx.save();
  ctx.strokeStyle = "#7b2417";
  ctx.lineWidth = 5;
  ctx.strokeRect(3, 3, canvas.width - 6, bottom - 4);
  ctx.strokeRect(3, bottom, canvas.width - 6, canvas.height - bottom - 4);
  ctx.beginPath();
  ctx.moveTo(ui.midX, bottom);
  ctx.lineTo(ui.midX, canvas.height - 4);
  ctx.stroke();
  for (const [x, y] of [[9, 9], [canvas.width - 9, 9], [9, bottom - 2], [canvas.width - 9, bottom - 2], [9, canvas.height - 9], [ui.midX, bottom], [ui.midX, canvas.height - 9], [canvas.width - 9, canvas.height - 9]]) {
    drawCornerGem(x, y);
  }
  ctx.restore();
}

function drawCornerGem(x, y) {
  ctx.save();
  ctx.fillStyle = "#224d43";
  ctx.strokeStyle = "#d0a15b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#75c7a5";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBoard() {
  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      const r = cellRect(x, y);
      const hovered = state.pointer.cell && state.pointer.cell.x === x && state.pointer.cell.y === y;
      if (hovered) {
        ctx.fillStyle = isBlockedCell(x, y) ? "rgba(255, 82, 69, .22)" : "rgba(255, 238, 124, .22)";
        ctx.fillRect(r.x, r.y, r.w, r.h);
      }
    }
  }

  const selected = selectedUnit();
  if (!selected) return;
  for (const n of neighbors(selected.x, selected.y)) {
    if (!inside(n.x, n.y)) continue;
    const r = cellRect(n.x, n.y);
    ctx.fillStyle = unitAt(n.x, n.y) ? "rgba(255,95,83,.26)" : "rgba(103,212,179,.20)";
    if (isBlockedCell(n.x, n.y)) ctx.fillStyle = "rgba(255,224,109,.18)";
    ctx.fillRect(r.x, r.y, r.w, r.h);
  }
}

// ===== Rendering: Units / Objects / Effects =====
function drawUnits() {
  const now = performance.now();
  for (const unit of state.units) {
    if (isYashaoHiddenFromMatch(unit, now)) continue;
    const resultActor = activeMatchEndActor(unit);
    if (resultActor) {
      const p = unit.alive ? unitPosition(unit) : { x: resultActor.x, y: resultActor.y };
      drawMatchEndUnitFrame(resultActor, p, now);
      continue;
    }
    if (!unit.alive) continue;
    const p = unitPosition(unit);
    const selected = unit.id === state.selectedId && !resultActor;
    const bob = 0;

    if (selected) {
      ctx.strokeStyle = "#ffe06d";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y + 4, 31, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (shouldDrawChargeEffect(unit, now)) {
      drawChargeEffect(p, "back");
    }

    if (unit.hitFlash > 0) {
      unit.hitFlash = Math.max(0, unit.hitFlash - 0.06);
      ctx.save();
      ctx.globalAlpha = unit.hitFlash;
      ctx.fillStyle = "#ff5148";
      ctx.beginPath();
      ctx.arc(p.x, p.y - 10, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (unit.isYashao) {
      drawYashaoUnit(unit, p, now);
      drawHp(unit, p.x, p.y + 30);
      ctx.fillStyle = "#f8fff9";
      ctx.font = "14px Microsoft JhengHei, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(unit.name, p.x, p.y + 52);
      continue;
    }

    const useNinjuSprite = unitUseNinjuSprite(unit);
    const sprite = useNinjuSprite || unitSprite(unit);
    const ougiCast = activeOugiCast(unit);
    const fireToadSprite = fireToadUnitSprite(unit);
    const hideBaseForOugi = ougiCast && ougiCastHasBodyFrames(ougiCast);
    if (!ougiCast && fireToadSprite) {
      drawFireToadUnit(unit, fireToadSprite, p);
    } else if (!hideBaseForOugi && (!activeMoneyDartCast(unit) || ougiCast) && sprite) {
      drawBaseUnitSprite(unit, sprite, p, bob, Boolean(useNinjuSprite), !ougiCast);
    } else if (!hideBaseForOugi && !activeMoneyDartCast(unit)) {
      ctx.fillStyle = unit.team === "blue" ? "#5bb8ff" : "#b5b9b3";
      ctx.beginPath();
      ctx.arc(p.x, p.y - 12 + bob, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!fireToadSprite) drawHeldMoneyDart(unit, p);
    drawRespawnPointer(unit, p);

    drawHp(unit, p.x, p.y + 28);
    ctx.fillStyle = "#f8fff9";
    ctx.font = "14px Microsoft JhengHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(unit.name, p.x, p.y + 50);

    if (shouldDrawChargeEffect(unit, now)) {
      drawChargeEffect(p, "front");
    }
  }
}

function isMatchEndPromptActive(now = performance.now()) {
  return Boolean(state.result && now < (state.resultOverlayAt || 0));
}

function shouldDrawChargeEffect(unit, now = performance.now()) {
  if (!unit || state.gameOver || state.result) return false;
  if (state.pressedUnit !== unit) return false;
  if (!unit.alive || !canControlUnit(unit)) return false;
  if (isUnitDisabled(unit) || isUnitControlLocked(unit) || isFireToadTransforming(unit)) return false;
  return state.charging || now - (state.pressTime || now) >= holdSeconds * 1000;
}

function drawBaseUnitSprite(unit, sprite, p, bob = 0, isUseNinjuSprite = false, drawBuffAura = true) {
  const spriteBox = unitSpriteDrawBox(sprite, isUseNinjuSprite);
  const spriteX = p.x - spriteBox.w / 2;
  const spriteY = p.y + spriteBox.footOffsetY - spriteBox.h + bob;
  if (drawBuffAura) {
    const auraType = activeBuffAuraType(unit);
    if (auraType === "steel") drawSteelSpriteOutline(sprite, p, bob, spriteBox);
    if (auraType === "hotBlood") drawHotBloodSpriteOutline(sprite, p, bob, spriteBox);
  }
  ctx.drawImage(sprite, spriteX, spriteY, spriteBox.w, spriteBox.h);
  if (!isUseNinjuSprite) drawUnitEyes(unit, p, bob);
}

// Draws the skull death animation after the unit disappears from the board.
function drawDeathAnimations(now) {
  if (!state.deathAnimations) return;
  const frames = deathSkullFrames.filter(Boolean);
  for (let i = state.deathAnimations.length - 1; i >= 0; i--) {
    const animation = state.deathAnimations[i];
    const progress = (now - animation.startedAt) / animation.duration;
    if (progress >= 1) {
      state.deathAnimations.splice(i, 1);
      continue;
    }
    const frame = frames.length > 0 ? frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))] : null;
    const alpha = progress < 0.78 ? 1 : Math.max(0, 1 - (progress - 0.78) / 0.22);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (frame) {
      const scale = 0.62;
      const w = frame.width * scale;
      const h = frame.height * scale;
      ctx.drawImage(frame, animation.x - w / 2, animation.y - h + 20, w, h);
    } else {
      drawOutlinedText("KO", animation.x, animation.y - 18, 24, "#dff8ff", "center");
    }
    ctx.restore();
  }
}

function fireToadUnitSprite(unit) {
  if (!isFireToadActive(unit) && !isFireToadTransforming(unit)) return null;
  const teamKey = unit.team === "blue" ? "Blue" : "Grey";
  const dirKey = (fireToadDrawDirection(unit)).replace(/^./, (letter) => letter.toUpperCase());
  return images[`fireToad${teamKey}${dirKey}`] || images[`fireToad${teamKey}Down`];
}

function drawFireToadUnit(unit, sprite, p) {
  const frame = fireToadAnimationFrame(unit) || sprite;
  const bounds = imageAlphaBounds(frame);
  const sourceW = bounds.w || frame.width;
  const sourceH = bounds.h || frame.height;
  const targetBox = 62;
  const scale = Math.min(1, targetBox / Math.max(sourceW, sourceH));
  const w = sourceW * scale;
  const h = sourceH * scale;
  const x = p.x - w / 2;
  const y = p.y - 47 + (targetBox - h) / 2;
  ctx.save();
  ctx.drawImage(frame, bounds.x, bounds.y, sourceW, sourceH, x, y, w, h);
  ctx.restore();
}

function imageAlphaBounds(img) {
  if (!img?.width || !img?.height) return { x: 0, y: 0, w: img?.width || 0, h: img?.height || 0 };
  const cached = fireToadFrameBoundsCache.get(img);
  if (cached) return cached;
  const known = knownFireToadFrameBounds(img);
  if (known) {
    fireToadFrameBoundsCache.set(img, known);
    return known;
  }
  const fallback = { x: 0, y: 0, w: img.width, h: img.height };
  const scratch = document.createElement("canvas");
  scratch.width = img.width;
  scratch.height = img.height;
  const scratchCtx = scratch.getContext("2d", { willReadFrequently: true });
  let data;
  try {
    scratchCtx.drawImage(img, 0, 0);
    data = scratchCtx.getImageData(0, 0, img.width, img.height).data;
  } catch (error) {
    fireToadFrameBoundsCache.set(img, fallback);
    return fallback;
  }
  let minX = img.width;
  let minY = img.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      if (data[(y * img.width + x) * 4 + 3] <= 8) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  const bounds = maxX >= minX ? { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 } : { x: 0, y: 0, w: img.width, h: img.height };
  fireToadFrameBoundsCache.set(img, bounds);
  return bounds;
}

function knownFireToadFrameBounds(img) {
  const src = img.currentSrc || img.src || "";
  if (src.includes("Arrive_Left_Toad")) return { x: 2, y: 48, w: 169, h: 59 };
  if (src.includes("Arrive_Right_Toad")) return { x: 23, y: 48, w: 168, h: 59 };
  if (src.includes("Arrive_Up_Toad")) return { x: 10, y: 59, w: 58, h: 158 };
  if (src.includes("Arrive_Down_Toad")) return { x: 8, y: 24, w: 59, h: 168 };
  if (src.includes("SetOff_Left_Toad")) return { x: 12, y: 0, w: 85, h: 40 };
  if (src.includes("SetOff_Right_Toad")) return { x: 18, y: 0, w: 85, h: 40 };
  if (src.includes("SetOff_Up_Toad")) return { x: 0, y: 12, w: 40, h: 85 };
  if (src.includes("SetOff_Down_Toad")) return { x: 0, y: 18, w: 39, h: 85 };
  if (src.includes("Idle_Right_Toad")) return { x: 18, y: 31, w: 66, h: 72 };
  if (src.includes("Idle_")) return { x: 1, y: 31, w: 66, h: 72 };
  return null;
}

function fireToadDrawDirection(unit) {
  return unit.facing || unit.fireToadFacing || "down";
}

function fireToadAnimationFrame(unit) {
  const team = unit.team === "blue" ? "blue" : "grey";
  const direction = fireToadDrawDirection(unit);
  const now = performance.now();
  if (isFireToadTransforming(unit)) {
    const frames = fireToadFrames[team]?.[direction]?.setoff?.filter(Boolean) || [];
    if (frames.length === 0) return null;
    const startedAt = unit.fireToadTransformStartedAt || now;
    const progress = Math.min(0.999, Math.max(0, (now - startedAt) / fireToadRule().transformMs));
    return frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))];
  }
  if (isFireToadActive(unit)) {
    if (!shouldAnimateFireToad(unit)) return null;
    const frames = fireToadFrames[team]?.[direction]?.arrive?.filter(Boolean) || [];
    if (frames.length === 0) return null;
    const startedAt = unit.fireToadStartedAt || now;
    return frames[Math.floor((now - startedAt) / 85) % frames.length];
  }
  return null;
}

function isYashaoHiddenFromMatch(unit, now = performance.now()) {
  return Boolean(unit?.isYashao && unit.yashaoHiddenUntil && now < unit.yashaoHiddenUntil);
}

function drawYashaoUnit(unit, p, now) {
  const action = activeYashaoAction(unit, now);
  const facing = unit.facing || "down";
  let frame = null;
  let scale = 0.78;

  if (action?.type === "enter") {
    frame = frameAt(yashaoFrames.enter, now - action.startedAt, action.duration);
  } else if (action?.type === "weapon") {
    frame = frameAt(yashaoFrames.weapon[facing], now - action.startedAt, action.duration);
    drawYashaoFxFrame(yashaoFrames.weaponFx[facing], p, now - action.startedAt, action.duration, 1.0);
  } else if (action?.type === "ougi") {
    frame = frameAt(yashaoFrames.ougi[action.slot] || [], now - action.startedAt, action.duration);
    drawYashaoFxFrame(yashaoFrames.ougiFx[action.slot] || [], p, now - action.startedAt, action.duration, 1.25);
    scale = 1.25;
  } else if (unit.moveT < 1) {
    frame = frameAt(yashaoFrames.arrive[facing], unit.moveT, 1);
  }

  frame = frame || yashaoFrames.idle[facing]?.[0] || yashaoFrames.idle.down?.[0] || images.greyDown;
  if (!frame) return;
  drawCenteredUnitFrame(frame, p.x, p.y - 14, 120, scale);
}

function activeYashaoAction(unit, now) {
  const action = unit?.yashaoAction;
  if (!action) return null;
  if (now - action.startedAt >= action.duration) {
    unit.yashaoAction = null;
    return null;
  }
  return action;
}

function drawYashaoFxFrame(frames, p, elapsed, duration, scaleMultiplier = 1) {
  const frame = frameAt(frames, elapsed, duration);
  if (!frame) return;
  drawCenteredUnitFrame(frame, p.x, p.y - 18, 120, scaleMultiplier);
}

function frameAt(frames, elapsed, duration) {
  const loaded = (frames || []).filter(Boolean);
  if (loaded.length === 0) return null;
  const progress = typeof elapsed === "number" && duration ? Math.min(0.999, Math.max(0, elapsed / duration)) : 0;
  return loaded[Math.min(loaded.length - 1, Math.floor(progress * loaded.length))];
}

function drawCenteredUnitFrame(frame, centerX, centerY, targetSize, scaleMultiplier = 1) {
  const scale = Math.min(targetSize / Math.max(1, frame.width, frame.height), 1.6) * scaleMultiplier;
  const w = frame.width * scale;
  const h = frame.height * scale;
  ctx.drawImage(frame, centerX - w / 2, centerY - h / 2, w, h);
}

function shouldAnimateFireToad(unit) {
  return (unit.moveT || 1) < 1 || (state.pressedUnit === unit && state.dragMoved);
}

function drawChargeEffect(p, layer = "all") {
  const now = performance.now();
  const redFrame = chargeRedFrames.length > 0 ? chargeRedFrames[Math.floor(now / 110) % chargeRedFrames.length] : null;
  const yellowFrame = chargeYellowFrames.length > 0 ? chargeYellowFrames[Math.floor(now / 110) % chargeYellowFrames.length] : null;

  ctx.save();
  ctx.globalAlpha = 0.92;
  if ((layer === "all" || layer === "back") && images.chargeOuter) {
    ctx.drawImage(images.chargeOuter, p.x - 46, p.y - 62, 92, 92);
  }
  if (layer === "front" && images.chargeOuter) {
    ctx.globalAlpha = 0.68;
    ctx.drawImage(images.chargeOuter, p.x - 46, p.y - 62, 92, 92);
    ctx.globalAlpha = 0.92;
  }
  if ((layer === "all" || layer === "front") && redFrame) {
    const w = 76;
    const h = 92;
    ctx.drawImage(redFrame, p.x - w / 2 - 4, p.y - 78, w, h);
  }
  if ((layer === "all" || layer === "front") && yellowFrame) {
    const w = 50;
    const h = 60;
    ctx.globalAlpha = 0.82;
    ctx.drawImage(yellowFrame, p.x - w / 2 - 4, p.y - 64, w, h);
  }
  ctx.restore();
}

function drawSteelSpriteOutline(sprite, p, bob = 0, spriteBox = unitSpriteDrawBox(sprite)) {
  drawBuffSpriteOutline(sprite, p, bob, spriteBox, steelOutlineCache, "#5feeff", "#39e8ff", 2, 7);
}

function drawHotBloodSpriteOutline(sprite, p, bob = 0, spriteBox = unitSpriteDrawBox(sprite)) {
  drawBuffSpriteOutline(sprite, p, bob, spriteBox, hotBloodOutlineCache, "#ff2d24", "#ff1f1a", 2, 7);
}

function drawBuffSpriteOutline(sprite, p, bob, spriteBox, cache, fill, shadow, outlineWidth, shadowBlur) {
  const mask = spriteColorMask(sprite, cache, fill);
  if (!mask) return;
  const x = p.x - spriteBox.w / 2;
  const y = p.y + spriteBox.footOffsetY - spriteBox.h + bob;
  const pulse = 0.66 + Math.sin(performance.now() / 170) * 0.1;

  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.shadowColor = shadow;
  ctx.shadowBlur = shadowBlur;
  for (let dx = -outlineWidth; dx <= outlineWidth; dx++) {
    for (let dy = -outlineWidth; dy <= outlineWidth; dy++) {
      const distance = Math.hypot(dx, dy);
      if (distance <= 0 || distance > outlineWidth) continue;
      ctx.drawImage(mask, x + dx, y + dy, spriteBox.w, spriteBox.h);
    }
  }
  ctx.restore();
}

function spriteColorMask(sprite, cache, fill) {
  if (cache.has(sprite)) return cache.get(sprite);
  const canvas = document.createElement("canvas");
  canvas.width = sprite.width;
  canvas.height = sprite.height;
  const maskCtx = canvas.getContext("2d");
  maskCtx.drawImage(sprite, 0, 0);
  maskCtx.globalCompositeOperation = "source-in";
  maskCtx.fillStyle = fill;
  maskCtx.fillRect(0, 0, canvas.width, canvas.height);
  cache.set(sprite, canvas);
  return canvas;
}

function activeBuffAuraType(unit) {
  if (unit.buffAuraType === "steel" && isSteelDefenseActive(unit)) return "steel";
  if (unit.buffAuraType === "hotBlood" && isHotBloodActive(unit)) return "hotBlood";
  if (isSteelDefenseActive(unit)) return "steel";
  if (isHotBloodActive(unit)) return "hotBlood";
  return "";
}

function applyOffset(anchor, offset) {
  return { x: anchor.x + offset.x, y: anchor.y - offset.y };
}

function drawHeldKunai(unit, p) {
  if (activeMoneyDartCast(unit)) return;
  const frame = weaponFrames[unit.weaponKey || defaultWeaponKey]?.hand?.[unit.facing]?.[0];
  if (!frame) return;
  const scale = 1.25;
  const w = frame.width * scale;
  const h = frame.height * scale;
  const offsets = {
    right: { x: 8, y: 39 },
    left: { x: -8 - w, y: 39 },
    up: { x: -w / 2, y: 58 },
    down: { x: -w / 2, y: 22 },
  };
  const offset = offsets[unit.facing] || offsets.down;
  const at = applyOffset(p, offset);
  ctx.drawImage(frame, at.x, at.y, w, h);
}

function drawRespawnPointer(unit, p) {
  const now = performance.now();
  if (!unit.respawnTipUntil || now >= unit.respawnTipUntil) return;
  const remaining = unit.respawnTipUntil - now;
  const elapsed = respawnPointerDuration - remaining;
  const progress = Math.min(0.999, Math.max(0, elapsed / respawnPointerDuration));
  const frame = respawnPointerFrames[Math.floor(progress * respawnPointerFrames.length)];
  if (!frame) return;

  const fade = Math.min(1, remaining / 180);
  const bounce = Math.sin(now / 70) * 3;
  const w = 142;
  const h = 125;
  const x = p.x - 24;
  const y = p.y - 126 + bounce;

  ctx.save();
  ctx.globalAlpha = fade;
  ctx.drawImage(frame, x, y, w, h);
  ctx.restore();
}

function drawOugiLockIndicator(unit, p) {
  const now = performance.now();
  const until = Math.max(unit.ougiLockVisibleUntil || 0, unit.ougiCcUntil || 0);
  if (!until || now >= until) return;
  const startedAt = unit.ougiLockStartedAt || Math.max(0, until - ougiHitControlLockMs);
  const progress = Math.min(0.999, Math.max(0, (now - startedAt) / ougiHitControlLockMs));
  const frames = ougiLockFrames.filter(Boolean);
  const frame = frames.length > 0 ? frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))] : null;
  const remaining = until - now;
  const alpha = Math.min(1, Math.max(0.35, remaining / 220));
  const size = 64 + Math.sin(progress * Math.PI) * 5;
  ctx.save();
  ctx.globalAlpha = alpha;
  if (frame) {
    ctx.drawImage(frame, p.x - size / 2, p.y - 57, size, size);
  }
  ctx.strokeStyle = "rgba(0,0,0,.9)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(p.x, p.y - 25, size * 0.34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}
function drawHeldMoneyDart(unit, p) {
  if (!unit.moneyDart) return;
  const dir = directionVector(unit.facing);
  const holdX = p.x + dir.dx * 18;
  const holdY = p.y - 22 + dir.dy * 12;
  const now = performance.now();
  const elapsed = now - unit.moneyDart.startedAt;
  const readyFrame = moneyDartReadyFrame(elapsed);
  ctx.save();
  if (now < unit.moneyDart.invincibleUntil) {
    ctx.globalAlpha = 0.35 + Math.sin(now / 55) * 0.12;
    ctx.strokeStyle = "#ffe26b";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(p.x, p.y - 18, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  ctx.shadowColor = "#ffd43b";
  ctx.shadowBlur = 12;
  if (readyFrame) {
    const size = Math.max(24, readyFrame.width * 1.15);
    ctx.drawImage(readyFrame, holdX - size / 2, holdY - size / 2, size, size);
  } else if (images.moneyDartHold) {
    ctx.drawImage(images.moneyDartHold, holdX - 12, holdY - 12, 24, 24);
  } else {
    ctx.fillStyle = "#ffd247";
    ctx.beginPath();
    ctx.arc(holdX, holdY, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function moneyDartReadyFrame(elapsed) {
  const frames = moneyDartReadyFrames.filter(Boolean);
  if (frames.length === 0) return null;
  const frameMs = moneyDartReadyMs / frames.length;
  const index = Math.min(frames.length - 1, Math.floor(elapsed / frameMs));
  return frames[index];
}

function drawMapObjects() {
  if (!state.objects) return;
  const sorted = state.objects.filter((object) => object.alive).slice().sort((a, b) => a.y - b.y || a.x - b.x);
  for (const object of sorted) {
    const img = images[object.type];
    const center = cellCenter(object.x, object.y);
    const scale = object.scale || 1;
    const width = grid.cell * scale;
    const height = grid.cell * scale;

    if (img) {
      ctx.drawImage(img, center.x - width / 2, center.y - height * 0.72, width, height);
    } else {
      ctx.fillStyle = object.breakable ? "#d9d260" : "#245038";
      ctx.fillRect(center.x - width / 2, center.y - height / 2, width, height);
    }

    if (object.breakable && object.hp < objectHp) {
      ctx.fillStyle = "rgba(0,0,0,.45)";
      ctx.fillRect(center.x - 16, center.y - height * 0.78, 32, 4);
      ctx.fillStyle = "#ffd766";
      ctx.fillRect(center.x - 16, center.y - height * 0.78, 32 * Math.max(0, object.hp / object.maxHp), 4);
    }
  }
}

function maybeGrantMapItem(object, unit) {
  if (!object || !unit) return false;
  if (Math.random() > mapItemDropChance) return false;
  if (mapGoldDropTypes.includes(object.type)) {
    addGold(unit, 1);
    playSound("takeDart");
    setMessage(`${unit.name} found 1 gold.`);
    return true;
  }
  if (!mapItemDropTypes.includes(object.type)) return false;
  if (!addInventoryItem(unit, "backup3", 1)) return false;
  playSound("takeDart");
  setMessage(`${unit.name} found Backup.`);
  return true;
}

function addGold(unit, amount = 1) {
  if (!unit) return false;
  unit.gold = Math.max(0, Math.floor(Number(unit.gold) || 0) + amount);
  syncUnitStorage(unit);
  return true;
}

function addInventoryItem(unit, type, amount = 1) {
  if (!unit.items) unit.items = {};
  if (!unit.itemSlots) unit.itemSlots = [];
  if (!unit.items[type]) {
    if (unit.itemSlots.length >= 10) return false;
    unit.itemSlots.push(type);
  }
  unit.items[type] = (unit.items[type] || 0) + amount;
  syncUnitStorage(unit);
  return true;
}

function removeInventoryItem(unit, type, amount = 1) {
  if (!unit?.items?.[type]) return false;
  unit.items[type] = Math.max(0, unit.items[type] - amount);
  if (unit.items[type] <= 0) {
    delete unit.items[type];
    unit.itemSlots = (unit.itemSlots || []).filter((slotType) => slotType !== type);
  }
  syncUnitStorage(unit);
  return true;
}

function drawAttacks() {
  if (!state.attacks) return;

  for (let i = state.attacks.length - 1; i >= 0; i--) {
    const attack = state.attacks[i];
    const age = (performance.now() - attack.startedAt) / attack.duration;
    if (age >= 1) {
      state.attacks.splice(i, 1);
      continue;
    }

    const from = cellCenter(attack.from.x, attack.from.y);
    const to = cellCenter(attack.to.x, attack.to.y);
    const weaponFrameSet = weaponFrames[attack.weaponKey || defaultWeaponKey] || weaponFrames[defaultWeaponKey];
    const frames = weaponFrameSet.attack[attack.direction] || [];
    const handFrames = weaponFrameSet.hand[attack.direction] || [];
    const frameIndex = Math.min(frames.length - 1, Math.floor(age * frames.length));
    const handFrameIndex = Math.min(handFrames.length - 1, Math.floor(age * handFrames.length));
    const frame = frames[frameIndex];
    const handFrame = handFrames[handFrameIndex];

    if (handFrame) {
      drawKunaiHandAttackFrame(handFrame, from, to, attack.direction, attack.weaponKey || defaultWeaponKey);
    }
    if (frame) {
      drawKunaiAttackFrame(frame, from, to, attack.direction, attack.weaponKey || defaultWeaponKey, attack.from);
    } else {
      drawSlashArc(from, to, age, attack.side);
    }
  }
}

function drawKunaiAttackFrame(frame, from, to, direction, weaponKey = defaultWeaponKey, originCell = null) {
  const profile = weaponAttackRenderProfile(weaponKey, "attack");
  const scale = 1.55 * profile.scale;
  const anchor = weaponAttackEffectAnchor(from, direction, weaponKey, originCell, profile);
  drawVisibleAnchoredWeaponFrame(frame, anchor, scale);
}

function drawKunaiHandAttackFrame(frame, from, to, direction, weaponKey = defaultWeaponKey) {
  const profile = weaponAttackRenderProfile(weaponKey, "hand");
  const scale = 1.55 * profile.scale;
  const anchor = weaponAttackVisualAnchor(from, direction, profile, "hand");
  drawVisibleAnchoredWeaponFrame(frame, anchor, scale);
}

function weaponRenderProfile(weaponKey) {
  const profile = weaponRenderProfiles[weaponKey] || {};
  const base = weaponRenderProfiles.default;
  return {
    attack: { ...base.attack, ...(profile.attack || {}) },
    hand: { ...base.hand, ...(profile.hand || {}) },
    ougi: { ...base.ougi, ...(profile.ougi || {}) },
  };
}

function weaponAttackRenderProfile(weaponKey, kind) {
  return weaponRenderProfile(weaponKey)[kind] || weaponRenderProfiles.default[kind];
}

function weaponOugiRenderProfile(cast) {
  const profile = weaponRenderProfile(cast?.weaponKey).ougi;
  const slotProfile = profile.slotProfiles?.[Number(cast?.slot)] || {};
  return { ...profile, ...slotProfile };
}

function weaponAttackVisualAnchor(from, direction, profile, kind = "attack") {
  const dir = directionVector(direction);
  const distance = kind === "hand" ? grid.cell * 0.28 : grid.cell * 0.52;
  const horizontal = dir.dx !== 0;
  const lift = kind === "hand" ? (horizontal ? 8 : -6) : -12;
  return applyDirectionalAnchorOffset({
    x: from.x + dir.dx * distance,
    y: from.y + dir.dy * distance + lift,
  }, direction, profile.visibleAnchorOffset);
}

function weaponAttackEffectAnchor(from, direction, weaponKey, originCell, profile) {
  if (!originCell) return weaponAttackVisualAnchor(from, direction, profile, "attack");
  const dir = { name: direction, ...directionVector(direction) };
  const cells = weaponAreaCells({ x: originCell.x, y: originCell.y, weaponKey }, dir);
  if (!cells.length) return weaponAttackVisualAnchor(from, direction, profile, "attack");
  let totalX = 0;
  let totalY = 0;
  for (const cell of cells) {
    const center = cellCenter(cell.x, cell.y);
    totalX += center.x;
    totalY += center.y;
  }
  const horizontal = dir.dx !== 0;
  return applyDirectionalAnchorOffset({
    x: totalX / cells.length,
    y: totalY / cells.length + (horizontal ? grid.cell * 0.08 : -grid.cell * 0.18),
  }, direction, profile.visibleAnchorOffset);
}

function applyDirectionalAnchorOffset(anchor, direction, offset = { x: 0, y: 0 }) {
  return {
    x: anchor.x + (offset.x || 0),
    y: anchor.y + (offset.y || 0),
  };
}

function drawVisibleAnchoredWeaponFrame(frame, anchor, scale) {
  const w = frame.width * scale;
  const h = frame.height * scale;
  const bounds = safeVisibleImageBounds(frame, weaponFrameBoundsCache);
  if (!bounds) {
    ctx.drawImage(frame, anchor.x - w / 2, anchor.y - h / 2, w, h);
    return;
  }
  const visibleCenterX = (bounds.x + bounds.w / 2) * scale;
  const visibleCenterY = (bounds.y + bounds.h / 2) * scale;
  ctx.drawImage(frame, anchor.x - visibleCenterX, anchor.y - visibleCenterY, w, h);
}

function drawProjectiles(now) {
  if (!state.projectiles) return;
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const projectile = state.projectiles[i];
    const age = Math.min(1, (now - projectile.startedAt) / projectile.duration);
    if (!Number.isFinite(age) || !projectile.from || !projectile.to) {
      state.projectiles.splice(i, 1);
      continue;
    }
    const eased = 1 - Math.pow(1 - age, 2);
    const from = cellCenter(projectile.from.x, projectile.from.y);
    const to = cellCenter(projectile.to.x, projectile.to.y);
    const x = from.x + (to.x - from.x) * eased;
    const y = from.y + (to.y - from.y) * eased - 20;
    const img = moneyDartProjectileImage(projectile.dir);

    try {
      ctx.save();
      ctx.globalAlpha = age < 0.9 ? 1 : Math.max(0, (1 - age) / 0.1);
      ctx.shadowColor = "#ffd447";
      ctx.shadowBlur = 14;
      if (img) {
        const horizontal = projectile.dir === "left" || projectile.dir === "right";
        ctx.drawImage(img, x - (horizontal ? 38 : 25), y - (horizontal ? 24 : 38), horizontal ? 76 : 50, horizontal ? 48 : 76);
      } else {
        ctx.fillStyle = "#ffd447";
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } catch (error) {
      ctx.restore();
      state.projectiles.splice(i, 1);
    }
  }
}

function drawMoneyDartShootAnimations(now) {
  if (!state.moneyDartCasts) return;
  for (let i = state.moneyDartCasts.length - 1; i >= 0; i--) {
    const cast = state.moneyDartCasts[i];
    const progress = (now - cast.startedAt) / cast.duration;
    if (!Number.isFinite(progress) || progress >= 1 || now - cast.startedAt > 1000) {
      state.moneyDartCasts.splice(i, 1);
      continue;
    }

    const unit = state.units.find((u) => u.id === cast.unitId && u.alive);
    if (!unit) {
      state.moneyDartCasts.splice(i, 1);
      continue;
    }
    const frames = (moneyDartShootFrames[cast.dir] || []).filter(Boolean);
    if (frames.length === 0) {
      state.moneyDartCasts.splice(i, 1);
      continue;
    }
    const frame = frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))];
    const p = unitPosition(unit);
    const placement = moneyDartShootPlacement(cast.dir, frame, p);

    try {
      ctx.save();
      ctx.globalAlpha = 0.98;
      ctx.drawImage(frame, placement.x, placement.y, placement.w, placement.h);
      ctx.restore();
    } catch (error) {
      ctx.restore();
      state.moneyDartCasts.splice(i, 1);
    }
  }
}

function activeOugiCast(unit) {
  if (!state.ougiCasts) return null;
  const now = performance.now();
  return state.ougiCasts.find((cast) => cast.unitId === unit.id && now - cast.startedAt < cast.duration) || null;
}

function ougiCastHasBodyFrames(cast) {
  if (!cast) return false;
  const frames = ougiBodyFrames[cast.weaponKey]?.[cast.slot]?.[cast.direction] || [];
  return frames.some(Boolean);
}

function activeMatchEndActor(unit) {
  if (!state.result || performance.now() >= (state.resultOverlayAt || 0)) return null;
  return (state.result.actors || []).find((actor) => actor.unitId === unit.id) || null;
}

function activeMoneyDartCast(unit) {
  if (!state.moneyDartCasts) return null;
  const now = performance.now();
  return state.moneyDartCasts.find((cast) => cast.unitId === unit.id && now - cast.startedAt < cast.duration) || null;
}

function moneyDartShootPlacement(direction, frame, p) {
  const scale = 1.05;
  const w = frame.width * scale;
  const h = frame.height * scale;
  if (direction === "right") return { x: p.x - 34, y: p.y - 50, w, h };
  if (direction === "left") return { x: p.x + 34 - w, y: p.y - 50, w, h };
  if (direction === "up") return { x: p.x - w / 2, y: p.y + 18 - h, w, h };
  return { x: p.x - w / 2, y: p.y - 50, w, h };
}

function drawSlashArc(from, to, age, side) {
  const centerX = from.x + (to.x - from.x) * 0.62;
  const centerY = from.y + (to.y - from.y) * 0.62 - 16;
  const baseAngle = Math.atan2(to.y - from.y, to.x - from.x);
  const start = baseAngle - side * (1.1 - age * 0.35);
  const end = baseAngle + side * (0.75 + age * 0.35);
  const alpha = age < 0.65 ? 1 : (1 - age) / 0.35;

  ctx.save();
  ctx.globalAlpha = Math.max(0, alpha);
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255, 244, 166, .95)";
  ctx.lineWidth = 9 * (1 - age * 0.35);
  ctx.beginPath();
  ctx.arc(centerX, centerY, 39 + age * 14, start, end, side < 0);
  ctx.stroke();

  ctx.strokeStyle = "rgba(115, 228, 255, .75)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 51 + age * 10, start + side * 0.1, end, side < 0);
  ctx.stroke();
  ctx.restore();
}

function drawHp(unit, x, y) {
  const hpMax = unit.maxHp || maxHp;
  const hpText = `${Math.max(0, Math.round(unit.hp))}/${hpMax}`;
  ctx.fillStyle = "rgba(0,0,0,.45)";
  ctx.fillRect(x - 25, y, 50, 7);
  ctx.fillStyle = unit.team === "blue" ? "#69d8ff" : "#c6cbc4";
  ctx.fillRect(x - 25, y, 50 * Math.max(0, unit.hp / hpMax), 7);
  ctx.save();
  ctx.font = "700 11px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0,0,0,.75)";
  ctx.strokeText(hpText, x, y - 2);
  ctx.fillStyle = "#f4fff8";
  ctx.fillText(hpText, x, y - 2);
  ctx.restore();
}

function drawUnitEyes(unit, p, bob = 0) {
  const facing = unit.facing || "down";
  if (playerUsesNindou3Sprite(unit)) {
    drawNindou3UnitEyes(unit, p, bob);
    return;
  }
  const offsets = playerUsesNindou3Sprite(unit) ? nindou3EyeOffsets : eyeOffsets;
  const offset = Object.prototype.hasOwnProperty.call(offsets, facing) ? offsets[facing] : offsets.down;
  if (!offset) return;
  const eyeStyle = normalizedEyeStyle(unit.eyeStyle);
  const eyeSet = eyeFrames[eyeStyle] || eyeFrames[defaultEyeStyle];

  if (facing === "left" || facing === "right") {
    const sideEye = eyeSet?.side || eyeSet?.front || images.eyeSide || images.eyesFront;
    if (!sideEye) return;
    ctx.save();
    if (facing === "left") {
      ctx.translate(p.x + offset.x + offset.w, p.y + offset.y + bob);
      ctx.scale(-1, 1);
      ctx.drawImage(sideEye, 0, 0, offset.w, offset.h);
    } else {
      ctx.drawImage(sideEye, p.x + offset.x, p.y + offset.y + bob, offset.w, offset.h);
    }
    ctx.restore();
    return;
  }

  const frontEyes = eyeSet?.front || images.eyesFront;
  if (!frontEyes) return;
  ctx.drawImage(frontEyes, p.x + offset.x, p.y + offset.y + bob, offset.w, offset.h);
}

function drawNindou3UnitEyes(unit, p, bob = 0) {
  const facing = unit.facing || "down";
  const sprite = unitSprite(unit);
  if (!sprite?.width || !sprite?.height) return;
  const spriteBox = unitSpriteDrawBox(sprite);
  const drawX = p.x - spriteBox.w / 2;
  const drawY = p.y + spriteBox.footOffsetY - spriteBox.h + bob;
  const scaleX = spriteBox.w / sprite.width;
  const scaleY = spriteBox.h / sprite.height;
  const face = Object.prototype.hasOwnProperty.call(nindou3FaceBounds, facing) ? nindou3FaceBounds[facing] : nindou3FaceBounds.down;
  if (!face) return;
  const eyeStyle = normalizedEyeStyle(unit.eyeStyle);
  const eyeSet = eyeFrames[eyeStyle] || eyeFrames[defaultEyeStyle];
  const eyeW = face.eyeW;
  const eyeH = face.eyeH;
  const faceCenterX = drawX + (face.x + face.w / 2) * scaleX + (face.biasX || 0);
  const faceCenterY = drawY + (face.y + face.h / 2) * scaleY + (face.biasY || 0);

  if (facing === "left" || facing === "right") {
    const sideEye = eyeSet?.side || eyeSet?.front || images.eyeSide || images.eyesFront;
    if (!sideEye) return;
    ctx.save();
    if (facing === "left") {
      ctx.translate(faceCenterX, faceCenterY);
      ctx.scale(-1, 1);
      drawEyeFrameCentered(sideEye, 0, 0, eyeW, eyeH);
    } else {
      drawEyeFrameCentered(sideEye, faceCenterX, faceCenterY, eyeW, eyeH);
    }
    ctx.restore();
    return;
  }

  const frontEyes = eyeSet?.front || images.eyesFront;
  if (!frontEyes) return;
  drawEyeFrameCentered(frontEyes, faceCenterX, faceCenterY, eyeW, eyeH);
}

function drawEyeFrameCentered(eyeFrame, centerX, centerY, visibleW, visibleH) {
  const bounds = safeVisibleImageBounds(eyeFrame, eyeFrameBoundsCache);
  if (!bounds) {
    ctx.drawImage(eyeFrame, centerX - visibleW / 2, centerY - visibleH / 2, visibleW, visibleH);
    return;
  }
  const scaleX = visibleW / bounds.w;
  const scaleY = visibleH / bounds.h;
  const drawW = eyeFrame.width * scaleX;
  const drawH = eyeFrame.height * scaleY;
  const visibleCenterX = (bounds.x + bounds.w / 2) * scaleX;
  const visibleCenterY = (bounds.y + bounds.h / 2) * scaleY;
  ctx.drawImage(eyeFrame, centerX - visibleCenterX, centerY - visibleCenterY, drawW, drawH);
}

function drawDrag() {
  if (!state.charging || !state.dragMoved || !state.pressedUnit) return;
  if (!canUnitMoveNow(state.pressedUnit)) return;
  const target = dragMoveTargetCell(state.pressedUnit);
  if (!target) return;
  const maxDistance = Math.floor(state.pressedUnit.skill);
  const reachable = maxDistance >= 1 ? reachableMoveCell(state.pressedUnit, target, maxDistance) : null;
  if (!reachable) return;
  const from = unitPosition(state.pressedUnit);
  const to = cellCenter(reachable.x, reachable.y);
  const dist = manhattan(state.pressedUnit, reachable);
  const enough = state.pressedUnit.skill >= Math.max(1, dist);
  const direction = directionFromTarget(state.pressedUnit, reachable);
  if (!direction) return;
  drawDragArrow(from, to, direction, enough);
}

function drawDragArrow(from, to, direction, enough) {
  const directionName = typeof direction === "string" ? direction : direction?.name;
  const frame = dragArrowFrames[directionName]?.[0];
  if (!frame) return;
  const arrowY = -18;
  const thickness = 32;
  const minLength = 36;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.max(minLength, Math.abs(dx) + Math.abs(dy));

  ctx.save();
  ctx.globalAlpha = enough ? 0.95 : 0.45;
  if (directionName === "right") {
    ctx.drawImage(frame, from.x, from.y + arrowY - thickness / 2, length, thickness);
  } else if (directionName === "left") {
    ctx.drawImage(frame, from.x - length, from.y + arrowY - thickness / 2, length, thickness);
  } else if (directionName === "up") {
    ctx.drawImage(frame, from.x - thickness / 2, from.y + arrowY - length, thickness, length);
  } else if (directionName === "down") {
    ctx.drawImage(frame, from.x - thickness / 2, from.y + arrowY, thickness, length);
  }
  ctx.restore();
}

function drawNinjuEffects(now) {
  for (const unit of state.units) {
    if (!unit.alive) continue;
    if (isUnitCastingNinju(unit) && shouldDrawNinjuCastEffect(unit.ninju.type)) {
      const p = unitPosition(unit);
      const progress = Math.min(0.999, (now - unit.ninju.startedAt) / unit.ninju.duration);
      const frames = statusNinjuCastFrames(unit.ninju.type);
      const frame = frames[Math.floor(progress * frames.length)];
      if (frame) {
        const size = specialNinjuConfigs[unit.ninju.type]?.castSize || 92;
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.drawImage(frame, p.x - size / 2, p.y - 22 - size / 2, size, size);
        ctx.restore();
      }
    }
  }
  drawNinjuDamageEffects(now);
}

function shouldDrawNinjuCastEffect(type) {
  return Boolean(specialNinjuConfigs[type] || attackNinjuConfigs[type] || type === "hotBlood" || type === "genki" || type === "kakki" || type === "shinki" || type === "steel" || type === "fireToad");
}

function statusNinjuCastFrames(type) {
  if (specialNinjuConfigs[type]) return specialNinjuFrames[type] || defUpFrames;
  if (type === "hotBlood") return atkUpFrames;
  if (type === "genki") return regenHpSmallFrames;
  if (type === "kakki" || type === "shinki") return regenHpLargeFrames;
  if (attackNinjuConfigs[type]) return attackNinjuConfigs[type].summonFrames || defUpFrames;
  return defUpFrames;
}

function ninjuDamageFrames(type) {
  if (specialNinjuConfigs[type]) return specialNinjuFrames[type] || [];
  if (typeof type === "string" && type.endsWith("Hit")) return specialNinjuHitFrames[type.slice(0, -3)] || [];
  if (attackNinjuConfigs[type]?.hitFrames) return attackNinjuConfigs[type].hitFrames;
  if (type === "steel") return defUpFrames;
  if (type === "hotBlood") return atkUpFrames;
  if (type === "genki") return regenHpSmallFrames;
  if (type === "kakki" || type === "shinki") return regenHpLargeFrames;
  if (type === "flash") return smallThunderDamagedFrames;
  if (type === "wildfire") return smallFireDamagedFrames;
  if (type === "freeze") return smallIceDamagedFrames;
  if (type === "freezeBreak") return smallIceBreakFrames;
  if (type === "flashMiss") return damageFailFrames;
  if (type === "flashHit") return faintedFrames;
  if (type === "flashHitHead") return damageSuccessSmallFrames;
  if (type === "wildfireMiddleHitHead") return damageSuccessMiddleFrames;
  return [];
}

function ninjuDamageFrameBox(type) {
  if (specialNinjuConfigs[type] || (typeof type === "string" && type.endsWith("Hit"))) return { x: 0, y: 38, w: 150, h: 150 };
  if (type === "flashMiss") return { x: 0, y: 76, w: 87, h: 57 };
  if (type === "flashHitHead") return { x: 0, y: 78, w: 87, h: 57 };
  if (type === "wildfireMiddleHitHead") return { x: 0, y: 78, w: 87, h: 57 };
  if (type === "flashHit") return { x: 0, y: 35, w: 74, h: 74 };
  return { x: 0, y: 22, w: 138, h: 138 };
}

function drawNinjuDamageEffects(now) {
  if (!state.ninjuDamageEffects) state.ninjuDamageEffects = [];
  for (let i = state.ninjuDamageEffects.length - 1; i >= 0; i--) {
    const effect = state.ninjuDamageEffects[i];
    const elapsed = now - effect.startedAt;
    if (elapsed < 0) continue;
    if (elapsed >= effect.duration) {
      state.ninjuDamageEffects.splice(i, 1);
      continue;
    }
    const target = state.units.find((unit) => unit.id === effect.unitId);
    if (!target && !effect.at) {
      state.ninjuDamageEffects.splice(i, 1);
      continue;
    }
    const frames = ninjuDamageFrames(effect.type);
    if (!frames.length) continue;
    const frameDuration = effect.options?.frameDuration || effect.duration;
    const progress = Math.min(0.999, elapsed / frameDuration);
    const frameIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const frame = frames[frameIndex];
    if (!frame) continue;
    const p = target && (target.alive || target.respawning) ? unitPosition(target) : effect.at;
    const box = { ...ninjuDamageFrameBox(effect.type) };
    if (effect.options?.targetSize) {
      box.w = effect.options.targetSize;
      box.h = effect.options.targetSize;
    }
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.drawImage(frame, p.x + box.x - box.w / 2, p.y - box.y - box.h / 2, box.w, box.h);
    ctx.restore();
  }
}

function addNinjuDamageEffect(type, target, startedAt, duration, options = {}) {
  if (!target) return;
  if (!state.ninjuDamageEffects) state.ninjuDamageEffects = [];
  const frames = ninjuDamageFrames(type);
  state.ninjuDamageEffects.push({
    type,
    unitId: target.id,
    at: unitPosition(target),
    startedAt,
    duration: duration || Math.max(300, frames.length * 40),
    options,
  });
}

// ===== Rendering: Overlays / Result =====
function drawCountdownOverlay(now) {
  if (state.result || state.matchStart || !state.countdownStart) return;
  const elapsed = now - state.countdownStart;
  const step = countdownStep(elapsed);
  if (!step) return;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, .18)";
  ctx.fillRect(grid.left, grid.top, grid.cols * grid.cell, grid.rows * grid.cell);
  const shake = step.text === "START!" ? Math.sin(now / 35) * 8 : 0;
  const scale = step.text === "START!" ? 1 + Math.sin(now / 70) * 0.06 : 1;
  ctx.translate(canvas.width / 2 + shake, grid.top + grid.rows * grid.cell / 2 - 16);
  ctx.scale(scale, scale);
  drawOutlinedText(step.text, 0, 0, step.text === "START!" ? 76 : 96, step.color, "center");
  ctx.restore();
}

function countdownStep(elapsed) {
  if (elapsed < 500) return { text: "3", color: "#fff1a8" };
  if (elapsed < 1000) return { text: "2", color: "#fff1a8" };
  if (elapsed < 1500) return { text: "1", color: "#fff1a8" };
  if (elapsed < countdownTotalMs) return { text: "START!", color: "#ffea4d" };
  return null;
}

function drawResultOverlay(drawPromptActors = true) {
  if (!state.result) return;
  const now = performance.now();
  if (now < (state.resultOverlayAt || 0)) {
    if (drawPromptActors) drawMatchEndPrompt(now);
    return;
  }
  ctx.save();
  ctx.fillStyle = "rgba(0, 18, 22, .82)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#063d46";
  ctx.strokeStyle = "#d0a65f";
  ctx.lineWidth = 4;
  ctx.fillRect(142, 88, 676, 504);
  ctx.strokeRect(142, 88, 676, 504);

  const title = state.result.winner === "blue" ? "Victory" : "Defeat";
  drawOutlinedText(title, canvas.width / 2, 130, 48, state.result.winner === "blue" ? "#78ddff" : "#ff8d7d", "center");
  drawOutlinedText(`Game Time ${formatMatchTime(state.result.durationMs)}`, canvas.width / 2, 176, 22, "#f6f2d0", "center");

  ctx.font = "700 17px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  drawResultRow(["Unit", "Team", "Kills", "Damage Dealt", "Damage Taken"], 214, true);
  const rows = state.units.slice().sort((a, b) => a.team.localeCompare(b.team) || a.id - b.id);
  rows.forEach((unit, index) => {
    drawResultRow([
      unit.name,
      unit.team === "blue" ? "Blue" : "Grey",
      String(unit.kills),
      formatDamage(unit.damageDone),
      formatDamage(unit.damageTaken),
    ], 248 + index * 42, false, unit.team);
  });
  ctx.restore();
}

function drawResultRow(values, y, header = false, team = "") {
  const x = 186;
  const widths = [150, 100, 80, 140, 140];
  ctx.save();
  ctx.fillStyle = header ? "rgba(255,255,255,.14)" : team === "blue" ? "rgba(80,190,240,.13)" : "rgba(220,220,210,.12)";
  ctx.fillRect(x - 12, y - 18, 606, 34);
  ctx.fillStyle = header ? "#fff1a8" : "#f4fff8";
  ctx.font = `${header ? "700" : "600"} 17px Microsoft JhengHei, sans-serif`;
  let cursor = x;
  for (let i = 0; i < values.length; i++) {
    ctx.fillText(values[i], cursor, y);
    cursor += widths[i];
  }
  ctx.restore();
}

// ===== Rendering: HUD =====
function drawGameHud() {
  drawSoulHud();
  drawTopHud();
  drawBottomPlayerHud();
  drawInventoryHud();
}

function drawSoulHud() {
  const x = 16;
  const y = 470;
  const w = 284;
  const h = 66;
  const barY = y + 44;
  const barH = 7;
  const tickXs = [61, 101, 154, 214, 275];
  const unit = selectedHudUnit();
  const soulSteps = Math.min(soulStepsPerLevel * soulMaxLevel, Math.max(0, unit?.soulSteps || 0));
  const completedLevel = Math.min(soulMaxLevel, Math.floor(soulSteps / soulStepsPerLevel));
  const segmentProgress = completedLevel >= soulMaxLevel ? 1 : (soulSteps % soulStepsPerLevel) / soulStepsPerLevel;
  const imageKey = `soulHud${Math.min(5, completedLevel <= 0 ? 1 : completedLevel + 1)}`;
  const fillColors = ["#1b7a2d", "#1b7a2d", "#20248b", "#8c178e", "#c92116"];

  ctx.save();
  if (images[imageKey]) ctx.drawImage(images[imageKey], x, y, w, h);
  if (soulSteps > 0) {
    const fromTick = tickXs[completedLevel];
    const toTick = tickXs[Math.min(soulMaxLevel, completedLevel + 1)];
    const fillEndOffset = completedLevel >= soulMaxLevel ? tickXs[soulMaxLevel] : fromTick + (toTick - fromTick) * segmentProgress;
    const barX = x + tickXs[0];
    const fillEndX = x + fillEndOffset;
    ctx.fillStyle = fillColors[completedLevel] || fillColors[0];
    ctx.fillRect(barX, barY, Math.max(0, fillEndX - barX), barH);
  }
  ctx.restore();
}

function maxSpecialGaugeSteps() {
  return soulStepsPerLevel * soulMaxLevel;
}

function specialGaugePercent(unit) {
  return Math.min(maxOugi, Math.max(0, ((unit?.soulSteps || 0) / maxSpecialGaugeSteps()) * maxOugi));
}

function ougiCostToSpecialSteps(cost) {
  return (cost / maxOugi) * maxSpecialGaugeSteps();
}

function syncOugiFromSpecialGauge(unit) {
  if (!unit) return;
  unit.ougi = specialGaugePercent(unit);
}

function drawTopHud() {
  ctx.save();
  ctx.textBaseline = "middle";
  const unit = state.units.find((u) => u.id === playerUnitId) || selectedHudUnit();
  if (unit && progressionUiVisible) refreshUnitProgression(unit);
  drawNinjaPortraitImage(images.blueDown || images.blueIcon, 38, 18, 42, 31);
  drawOutlinedText(unit?.name || "Player", 118, 18, 17, "#f4f3dd", "left");
  drawOutlinedText(progressionUiVisible ? `Lv. ${unit?.level || defaultPlayerLevel}` : "Lv. 99", 294, 18, 18, "#f4f3dd", "center");
  drawOutlinedText(progressionUiVisible ? (unit?.rankTitle || rankForLevel(defaultPlayerLevel)) : "Night Rogue", 372, 18, 18, "#f4f3dd", "center");
  if (unit) {
    const coord = displayCellCoord(unit);
    drawOutlinedText(`Cell [${coord.x},${coord.y}]`, grid.left + grid.cols * grid.cell - 10, 18, 13, "#d9f4ff", "right");
  }
  ctx.restore();
}

function drawNinjaPortraitImage(image, x, y, maxW, maxH) {
  if (!image) return;
  const scale = Math.min(maxW / image.width, maxH / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(image, x - w / 2, y - h / 2, w, h);
}

function drawBottomPlayerHud() {
  const unit = selectedHudUnit();
  const hpRatio = unit ? Math.max(0, unit.hp / (unit.maxHp || maxHp)) : 0;
  const skillRatio = unit ? Math.max(0, unit.skill / maxSkill) : 0;

  ctx.save();
  drawHudBar(45, 574, 165, 30, hpRatio, "#a057be", "HP");
  drawHudBar(262, 574, 165, 30, skillRatio, "#38c2f2", "SP");
  drawOutlinedText("WPN", 35, 654, 13, "#f0f0df", "center");
  drawMoneyBox(50, 642, "", 95);
  drawOutlinedText("REP", 175, 654, 13, "#f0f0df", "center");
  drawMoneyBox(190, 642, "0", 95);
  drawOutlinedText("GOLD", 315, 654, 12, "#f0f0df", "center");
  drawMoneyBox(330, 642, String(Math.floor(unit?.gold || 0)), 95);
  ctx.restore();
}

function drawHudBar(x, y, w, h, ratio, color, label) {
  ctx.save();
  ctx.fillStyle = "#26302c";
  ctx.strokeStyle = "#d4a85e";
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "#080808";
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);
  ctx.fillStyle = color;
  ctx.fillRect(x + 6, y + 6, (w - 12) * ratio, h - 12);
  ctx.fillStyle = "#4a4a3d";
  ctx.beginPath();
  ctx.arc(x - 10, y + h / 2, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  drawOutlinedText(label, x - 10, y + h / 2 + 1, 19, "#e9f3dc", "center");
  ctx.restore();
}

// Draws the team-colored win/loss stamps before the stats table appears.
function drawMatchEndPrompt(now) {
  if (!state.result) return;
  const actors = state.result.actors || [];
  for (const actor of actors) {
    drawMatchEndUnitFrame(actor, { x: actor.x, y: actor.y }, now);
  }
}

function drawMatchEndUnitFrame(actor, p, now) {
  const startedAt = state.result?.promptStartedAt || state.matchEnd || now;
  const elapsed = Math.max(0, now - startedAt);
  const frames = (matchEndFrames[actor.team]?.[actor.outcome] || []).filter(Boolean);
  const frame = frames.length > 0 ? frames[Math.floor(elapsed / matchEndFrameMs) % frames.length] : null;
  const offset = 0;
  ctx.save();
  if (frame) {
    const targetBox = 62;
    const scale = Math.min(1, targetBox / Math.max(1, frame.width, frame.height));
    const w = frame.width * scale;
    const h = frame.height * scale;
    const x = p.x - w / 2;
    const y = p.y - 47 + (targetBox - h) / 2 + offset;
    ctx.drawImage(frame, x, y, w, h);
  } else {
    const fallback = actor.team === "blue" ? images.blueDown : images.greyDown;
    if (fallback) {
      const spriteBox = unitSpriteDrawBox(fallback);
      ctx.drawImage(fallback, p.x - spriteBox.w / 2, p.y + spriteBox.footOffsetY - spriteBox.h + offset, spriteBox.w, spriteBox.h);
      drawFallbackMatchEndEyes(actor, p, offset);
    }
  }
  ctx.restore();
}

function drawFallbackMatchEndEyes(actor, p, offset = 0) {
  drawNindou3UnitEyes(actor, p, offset);
}

function drawOugiHudBar(x, y, w, h, ratio) {
  ctx.save();
  ctx.fillStyle = "#26302c";
  ctx.strokeStyle = "#d4a85e";
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  const innerX = x + 6;
  const innerY = y + 6;
  const innerW = w - 12;
  const innerH = h - 12;
  ctx.fillStyle = "#080808";
  ctx.fillRect(innerX, innerY, innerW, innerH);
  const fillW = innerW * Math.min(1, Math.max(0, ratio));
  const fillGradient = ctx.createLinearGradient(innerX, innerY, innerX + innerW, innerY);
  fillGradient.addColorStop(0, "#d9573f");
  fillGradient.addColorStop(0.5, "#f0b65b");
  fillGradient.addColorStop(1, "#ffd86d");
  ctx.fillStyle = fillGradient;
  ctx.fillRect(innerX, innerY, fillW, innerH);
  ctx.strokeStyle = "rgba(255,255,255,.55)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 2; i++) {
    const sx = innerX + innerW * i / 3;
    ctx.beginPath();
    ctx.moveTo(sx, innerY - 3);
    ctx.lineTo(sx, innerY + innerH + 3);
    ctx.stroke();
  }
  ctx.fillStyle = "#4a4a3d";
  ctx.beginPath();
  ctx.arc(x - 10, y + h / 2, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#d4a85e";
  ctx.stroke();
  drawOutlinedText("Z", x - 10, y + h / 2 + 1, 17, "#ffe7a8", "center");
  ctx.restore();
}

function drawMoneyBox(x, y, text, w = 180) {
  ctx.save();
  if (images.moneyPanel) {
    ctx.drawImage(images.moneyPanel, x, y - 4, w, 30);
  } else {
    ctx.fillStyle = "#2a9cca";
    ctx.fillRect(x, y - 4, w, 30);
  }
  ctx.strokeStyle = "#041316";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y - 4, w, 30);
  ctx.fillStyle = "#38c2f2";
  ctx.font = "700 18px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + w / 2, y + 11);
  ctx.restore();
}

function drawInventoryHud() {
  const itemY = itemSlotY;
  const ninjuY = 600;
  const startX = itemSlotStartX;
  const slotW = itemSlotW;
  const gap = itemSlotGap;

  ctx.save();
  drawOutlinedText("ITEM", 482, itemY + 14, 12, "#f0f0df", "center");
  drawOutlinedText("SKILL", 482, ninjuY + 15, 12, "#f0f0df", "center");

  for (let i = 0; i < 10; i++) {
    const x = startX + i * (slotW + gap);
    const itemType = selectedHudUnit()?.itemSlots?.[i] || "";
    drawItemSlot(x, itemY, slotW, 34, Boolean(itemType));
    drawInventoryItemHud(itemType, x, itemY, selectedHudUnit()?.items?.[itemType] || 0);
  }

  const ninjuLabels = ["", "", "", "", "", ""];
  for (let i = 0; i < ninjuLabels.length; i++) {
    const x = 510 + i * 75;
    drawNinjuSlot(x, ninjuY, 60, 30, ninjuLabels[i], false);
  }

  for (const button of currentNinjuButtonList()) {
    drawNinjuSlot(button.x, button.y, button.w, button.h, button.label, button.type);
  }

  drawSmallCounter(476, 644, "#2479a9", String(teamAliveCount("blue")));
  drawSmallCounter(476, 670, "#d8d8d8", String(teamAliveCount("grey")));
  ctx.restore();
}

function itemSlotRect(index) {
  return {
    x: itemSlotStartX + index * (itemSlotW + itemSlotGap),
    y: itemSlotY,
    w: itemSlotW,
    h: itemSlotH,
  };
}

function drawItemSlot(x, y, w, h, filled) {
  ctx.save();
  ctx.fillStyle = filled ? "#12626d" : "#163f49";
  ctx.strokeStyle = "#5eb5b3";
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "rgba(255,255,255,.12)";
  ctx.fillRect(x + 4, y + 3, w - 8, 4);
  ctx.restore();
}

function drawInventoryItemHud(type, x, y, count) {
  if (!type || !count) return;
  const img = itemIconByType(type);
  ctx.save();
  if (img) {
    const size = 23;
    const scale = Math.min(size / Math.max(1, img.width), size / Math.max(1, img.height));
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, x + 19 - w / 2, y + 17 - h / 2, w, h);
  }
  drawOutlinedText(String(count), x + 31, y + 27, 12, "#fff4b8", "center");
  ctx.restore();
}

function itemIconByType(type) {
  if (type === "backup3") return images.backup3Item;
  return null;
}

function useBackupItem() {
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit) || !unit.alive) {
    setMessage("Select a living player to use Backup.");
    return;
  }
  if (isFireToadActive(unit) || isFireToadTransforming(unit) || isFireToadCasting(unit)) {
    setMessage(`${unit.name}: cannot use items as Fire Toad.`);
    return;
  }
  const count = unit.items?.backup3 || 0;
  if (count <= 0) {
    setMessage(`${unit.name}: no Backup item.`);
    return;
  }
  if (unit.skill >= maxSkill) {
    setMessage(`${unit.name}: SP is already full.`);
    return;
  }
  unit.skill = maxSkill;
  removeInventoryItem(unit, "backup3", 1);
  playSound("useNinju");
  setMessage(`${unit.name} used Backup. SP restored.`);
}

function useItemSlot(index) {
  const unit = selectedUnit();
  const itemType = unit?.itemSlots?.[index] || "";
  if (itemType === "backup3") {
    useBackupItem();
    return;
  }
  setMessage("No item in that slot.");
}

function useNinjuByType(type) {
  if (!canEquipNinjuType(type)) {
    const ninju = ninjuByType[type];
    setMessage(ninju ? `${ninju.label}: ${ninjuAvailabilityReason(ninju)}` : "This jutsu is unavailable.");
    return;
  }
  if (type === "moneyDart") useMoneyDart();
  else if (type === "steel") useSteelNinju();
  else if (type === "hotBlood") useHotBloodNinju();
  else if (type === "fireToad") useFireToadNinju();
  else if (type === "genki") useGenkiNinju();
  else if (type === "kakki") useKakkiNinju();
  else if (type === "shinki") useShinkiNinju();
  else if (specialNinjuConfigs[type]) useSpecialNinju(type);
  else if (attackNinjuConfigs[type]) useAttackNinju(type);
  else setMessage(`${ninjuByType[type]?.label || "This jutsu"} is loadout-only until its behavior is implemented.`);
}

function drawNinjuSlot(x, y, w, h, text, type) {
  const unit = selectedHudUnit();
  const isSteel = type === true || type === "steel";
  const isHotBlood = type === "hotBlood";
  const isAttackNinju = Boolean(attackNinjuConfigs[type]);
  const isSpecialNinju = Boolean(specialNinjuConfigs[type]);
  const isMoneyDart = type === "moneyDart";
  const isFireToad = type === "fireToad";
  const isHeal = type === "genki" || type === "kakki" || type === "shinki";
  const isStatusButton = isSteel || isHotBlood || isHeal || isAttackNinju || isSpecialNinju || isFireToad;
  const statusRule = statusButtonRule(type);
  const active = unit && (isStatusButton
    ? ((unit.ninju?.type === type && (isUnitCastingNinju(unit) || isUnitInNinjuGap(unit))) || (isSteel ? isSteelDefenseActive(unit) : isHotBlood ? isHotBloodActive(unit) : isFireToad ? (isFireToadCasting(unit) || isFireToadTransforming(unit) || isFireToadActive(unit)) : false))
    : isMoneyDart ? Boolean(unit.moneyDart) : false);
  const hasAttackSoul = !isAttackNinju || Math.floor((unit?.soulSteps || 0) / soulStepsPerLevel) >= 1;
  const hasRequiredSkill = !isStatusButton || isAttackNinju || unit.skill >= statusRule.cost;
  const ready = unit && unit.alive && !isUnitDisabled(unit) && (isStatusButton ? statusRule.available !== false && hasRequiredSkill && hasAttackSoul : isMoneyDart);
  ctx.save();
  if ((isAttackNinju || isSpecialNinju) && images.flashButton) {
    ctx.globalAlpha = ready ? 1 : 0.55;
    ctx.drawImage(images.flashButton, x, y, w, h);
    ctx.globalAlpha = 1;
    drawNinjuButtonText(text, x + w / 2 - 1, y + h / 2 + 1, text.length > 4 ? 13 : 16, "#232323f8", "center");
  } else if (isHeal && images.healButton) {
    ctx.globalAlpha = ready ? 1 : 0.55;
    ctx.drawImage(images.healButton, x, y, w, h);
    ctx.globalAlpha = 1;
    drawNinjuButtonText(text, x + w / 2 - 1, y + h / 2 + 1, text.length > 4 ? 13 : 16, "#232323f8", "center");
  } else if ((isSteel || isHotBlood || isFireToad) && images.steelButton) {
    ctx.globalAlpha = ready ? 1 : 0.55;
    ctx.drawImage(images.steelButton, x, y, w, h);
    ctx.globalAlpha = 1;
    drawNinjuButtonText(text, x + w / 2 - 1, y + h / 2 + 1, 16, "#232323f8", "center");
  } else if (isMoneyDart && images.moneyDartButton) {
    ctx.globalAlpha = ready ? 1 : 0.55;
    ctx.drawImage(images.moneyDartButton, x, y, w, h);
    ctx.globalAlpha = 1;
    drawNinjuButtonText(text, x + w / 2 -1, y + h / 2 + 1, 16, "#232323f8", "center");
  } else {
    ctx.fillStyle = ready ? "#c78e42" : "#2d3d38";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#77bec6";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    if (text) drawOutlinedText(text, x + w / 2, y + h / 2 + 1, 15, ready ? "#ffe6a6" : "#1b1d18", "center");
  }
  if (active) {
    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.fillRect(x, y, w, h);
  }
  if (isStatusButton && unit && unit.ninju?.type === type && unit.ninju.queue > 0) {
    drawOutlinedText(`x${unit.ninju.queue + 1}`, x + w - 10, y + 8, 12, "#fff2a8", "center");
  }
  ctx.restore();
}

function currentNinjuButtonRects() {
  return {
    moneyDart: moneyDartButtonRect,
    steel: steelButtonRect,
    hotBlood: hotBloodButtonRect,
    fireToad: fireToadButtonRect,
    genki: genkiButtonRect,
    kakki: kakkiButtonRect,
    shinki: shinkiButtonRect,
  };
}

function currentNinjuSlotRects() {
  const rects = currentNinjuButtonRects();
  return [rects.moneyDart, rects.steel, rects.hotBlood, rects.fireToad, rects.genki, rects.kakki];
}

function currentNinjuButtonList() {
  const slots = currentNinjuSlotRects();
  return currentProfileNinjuLoadout().map((type, index) => {
    if (!type || !ninjuByType[type]) return null;
    const source = slots[index] || slots[0];
    const ninju = ninjuByType[type];
    return { ...source, x: source.x + index, type, label: ninju.label };
  }).filter(Boolean);
}

function statusButtonRule(type) {
  if (type === "fireToad") return fireToadRule();
  if (specialNinjuConfigs[type]) return { cost: specialNinjuConfigs[type].cost || flashNinjuCost, available: true };
  if (attackNinjuConfigs[type]) return attackNinjuRule(type);
  if (type === "hotBlood") return hotBloodRule();
  if (type === "genki" || type === "kakki" || type === "shinki") return healNinjuRule(type);
  return steelRule();
}

function drawSmallCounter(x, y, color, text) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y - 5, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8f8f5";
  ctx.font = "13px Microsoft JhengHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 20, y - 4);
  ctx.restore();
}

function drawNinjuButtonText(text, x, y, size, color, align = "center") {
  ctx.save();
  ctx.font = `700 ${size}px DFKai-SB, KaiTi, Microsoft JhengHei, serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function teamAliveCount(team) {
  return state.units.filter((unit) => unit.team === team && (unit.alive || unit.respawning)).length;
}

function drawIconImage(img, x, y, w, h) {
  if (img) {
    ctx.drawImage(img, x, y, w, h);
    return;
  }
  ctx.fillStyle = "#cbd5ce";
  ctx.fillRect(x, y, w, h);
}

function drawOutlinedText(text, x, y, size, color, align = "left") {
  ctx.save();
  ctx.font = `700 ${size}px Microsoft JhengHei, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(0,0,0,.72)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawNinjuBar() {
  const unit = selectedHudUnit();
  if (!unit) return;
  const active = isUnitCastingNinju(unit);
  const gap = isUnitInNinjuGap(unit);
  const steelBuff = isSteelDefenseActive(unit);
  const hotBloodBuff = isHotBloodActive(unit);
  const buff = steelBuff || hotBloodBuff;
  if (!active && !gap && !buff && (!unit.alive || unit.skill >= steelRule().cost)) return;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,.55)";
  ctx.fillRect(814, 616, 62, 30);
  const buffUntil = Math.max(unit.steelUntil || 0, unit.hotBloodUntil || 0);
  const text = active ? "Casting" : gap ? "Move" : buff ? `${Math.ceil((buffUntil - performance.now()) / 1000)}s` : `SP ${steelRule().cost}`;
  drawOutlinedText(text, 845, 631, 14, "#f7f6d7", "center");
  ctx.restore();
}

function unitPosition(unit) {
  const target = cellCenter(unit.x, unit.y);
  if (unit.moveT >= 1) return target;
  const from = cellCenter(unit.fromX, unit.fromY);
  const t = 1 - Math.pow(1 - unit.moveT, 3);
  unit.moveT = Math.min(1, unit.moveT + 0.08);
  return { x: from.x + (target.x - from.x) * t, y: from.y + (target.y - from.y) * t };
}

// ===== Input =====
function pointerDown(event) {
  if (state.inRoom) return;
  if (state.result) {
    if (performance.now() < (state.resultClickableAt || 0)) return;
    returnToRoomFromResult();
    return;
  }
  startBgm();
  pointerMove(event);
  if (!isMatchActive()) return;
  const cell = eventCell(event);
  for (let index = 0; index < 10; index++) {
    if (pointInRect(state.pointer.x, state.pointer.y, itemSlotRect(index))) {
      useItemSlot(index);
      return;
    }
  }
  for (const button of currentNinjuButtonList()) {
    if (pointInRect(state.pointer.x, state.pointer.y, button)) {
      useNinjuByType(button.type);
      return;
    }
  }
  if (!cell || state.gameOver) return;

  const unit = unitAt(cell.x, cell.y);
  const selected = selectedUnit();
  if (state.ougiKeyDown && event.button === 0 && selected) {
    if (cell.x !== selected.x || cell.y !== selected.y) updateFacing(selected, cell);
    useBestWeaponOugi();
    return;
  }
  state.pressedUnit = unit && canControlUnit(unit) ? unit : null;
  state.pressTime = performance.now();
  state.dragMoved = false;
  state.charging = false;

  if (selected && selected.moneyDart) {
    if (cell.x !== selected.x || cell.y !== selected.y) {
      throwMoneyDart(selected, cell);
    } else {
      setMessage(`${selected.name}: choose up, down, left, or right to throw money dart.`);
    }
    return;
  }

  if (unit && canControlUnit(unit)) {
    state.selectedId = unit.id;
    setMessage(`${unit.name}: keep holding to charge skill.`);
    return;
  }

  if (unit && selected && unit.team !== selected.team) {
    if (manhattan(selected, unit) === 1) {
      attack(selected, unit);
    } else {
      attackAimedWeapon(selected, cell);
    }
    return;
  }

  if (selected && (cell.x !== selected.x || cell.y !== selected.y)) {
    attackAimedWeapon(selected, cell);
    return;
  }

  setMessage("Move only works by holding a character, charging, then dragging to a cell.");
}

function pointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  state.pointer.x = (event.clientX - rect.left) * canvas.width / rect.width;
  state.pointer.y = (event.clientY - rect.top) * canvas.height / rect.height;
  state.pointer.cell = pointToCell(state.pointer.x, state.pointer.y);

  const lookUnit = state.pressedUnit || selectedUnit();
  if (state.pointer.cell && lookUnit && canControlUnit(lookUnit) && lookUnit.alive && canUnitMoveNow(lookUnit) && !isFireToadTransforming(lookUnit)) {
    updateFacingFromPointer(lookUnit);
  }

  if (!state.pressedUnit || !event.buttons) return;
  const start = cellCenter(state.pressedUnit.x, state.pressedUnit.y);
  const dx = state.pointer.x - start.x;
  const dy = state.pointer.y - start.y;
  if (Math.hypot(dx, dy) > 12) {
    state.dragMoved = true;
  }
}

function pointerUp(event) {
  startBgm();
  eventCell(event);
  const cell = state.pressedUnit ? dragMoveTargetCell(state.pressedUnit) : null;
  if (state.charging && state.dragMoved && state.pressedUnit && cell) {
    skillMove(state.pressedUnit, cell);
  } else if (state.pressedUnit) {
    setMessage(`${state.pressedUnit.name}: charged to ${state.pressedUnit.skill.toFixed(1)} skill.`);
  }

  state.pressedUnit = null;
  state.dragMoved = false;
  state.charging = false;
}

function addOugi(unit, amount) {
  if (!unit || !Number.isFinite(amount) || amount <= 0) return;
  unit.ougi = Math.min(maxOugi, Math.max(0, (unit.ougi || 0) + amount));
  unit.soulSteps = Math.min(maxSpecialGaugeSteps(), Math.max(0, (unit.ougi / maxOugi) * maxSpecialGaugeSteps()));
}

function ougiPlaybackDurationMs(definition) {
  const authoredDuration = definition?.duration || 0;
  const frameCount = definition?.frameCount || 0;
  if (!authoredDuration || !frameCount) return authoredDuration || 1800;
  const minCleanFps = 24;
  return Math.min(authoredDuration, Math.ceil((frameCount / minCleanFps) * 1000));
}

function useWeaponOugi(slot) {
  if (!isMatchActive()) return;
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit) || !unit.alive) return;
  if (isUnitControlLocked(unit)) {
    setMessage(`${unit.name}: cannot use Ougi right now.`);
    return;
  }
  if (isFireToadActive(unit) || isFireToadTransforming(unit)) {
    setMessage(`${unit.name}: Fire Toad cannot use Ougi.`);
    return;
  }
  const definition = ougiDefinitions[unit.weaponKey]?.[slot];
  if (!definition) {
    setMessage(`${unit.name}: this weapon has no Ougi ${slot}.`);
    return;
  }
  syncOugiFromSpecialGauge(unit);
  if ((unit.soulSteps || 0) < ougiCostToSpecialSteps(definition.cost)) {
    setMessage(`${unit.name}: Ougi ${slot} needs ${definition.cost} Ougi.`);
    return;
  }
  const now = performance.now();
  const duration = ougiPlaybackDurationMs(definition);
  unit.ougi = 0;
  unit.soulSteps = 0;
  unit.ougiCastUntil = now + duration;
  unit.ougiInvincibleAt = unit.ougiCastUntil;
  unit.ougiInvincibleUntil = unit.ougiCastUntil + ougiPostInvincibleMs;
  clearDragState();
  const cast = {
    unitId: unit.id,
    weaponKey: unit.weaponKey,
    slot: String(slot),
    direction: unit.facing || "down",
    startedAt: now,
    duration,
    damagedUnitIds: new Set(),
  };
  state.ougiCasts.push(cast);
  cast.damagedUnitIds = applyOugiDamage(unit, definition, slot);
  playOugiSounds(definition, duration);
  setMessage(cast.damagedUnitIds.size > 0
    ? `${unit.name} used Ougi ${slot} and hit ${cast.damagedUnitIds.size} target${cast.damagedUnitIds.size === 1 ? "" : "s"}.`
    : `${unit.name} used Ougi ${slot}.`);
}

function playOugiSounds(definition, duration = ougiPlaybackDurationMs(definition)) {
  if (Array.isArray(definition.soundEvents) && definition.soundEvents.length > 0) {
    const soundFrameCount = Math.max(1, definition.soundFrameCount || definition.frameCount || 1);
    definition.soundEvents.forEach((event) => {
      if (!event?.key) return;
      const delay = Number.isFinite(event.atMs)
        ? event.atMs
        : Math.round((Math.max(0, event.frame || 0) / soundFrameCount) * duration);
      if (delay <= 0) {
        playSound(event.key);
      } else {
        window.setTimeout(() => playSound(event.key), delay);
      }
    });
    return;
  }
  if (Array.isArray(definition.soundKeys) && definition.soundKeys.length > 0) {
    const spacing = duration / (definition.soundKeys.length + (definition.endSoundKey ? 1 : 0));
    definition.soundKeys.forEach((key, index) => {
      if (index === 0) {
        playSound(key);
        return;
      }
      window.setTimeout(() => playSound(key), Math.max(0, Math.round(index * spacing)));
    });
  } else if (definition.soundKey) {
    playSound(definition.soundKey);
  }
  if (definition.endSoundKey) {
    window.setTimeout(() => playSound(definition.endSoundKey), Math.max(0, duration - 220));
  }
}

function strongestReadyOugiSlot(unit) {
  syncOugiFromSpecialGauge(unit);
  const slots = ougiDefinitions[unit.weaponKey] || {};
  const completedTier = Math.min(soulMaxLevel, Math.floor((unit?.soulSteps || 0) / soulStepsPerLevel));
  const preferredSlot = Math.min(3, completedTier);
  for (let slot = preferredSlot; slot >= 1; slot--) {
    const definition = slots[slot];
    if (definition) return slot;
  }
  return 0;
}

function useBestWeaponOugi() {
  if (!isMatchActive()) return;
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit) || !unit.alive) return;
  if (isUnitControlLocked(unit)) {
    setMessage(`${unit.name}: cannot use Ougi right now.`);
    return;
  }
  const slot = strongestReadyOugiSlot(unit);
  if (!slot) {
    setMessage(`${unit.name}: Ougi needs at least soul tier 1.`);
    return;
  }
  useWeaponOugi(slot);
}

function applyOugiDamage(attacker, definition, slot) {
  const cells = ougiAreaCells(attacker, slot, definition);
  const damagedUnitIds = new Set();
  for (const cell of cells) {
    const unit = unitAt(cell.x, cell.y);
    if (unit && unit.team !== attacker.team) {
      applyOugiHitToUnit(attacker, unit, definition, slot, damagedUnitIds);
    }
  }
  return damagedUnitIds;
}

function applyOugiHitToUnit(attacker, unit, definition, slot, damagedUnitIds) {
  if (isOugiInvincible(unit)) return;
  if (!damagedUnitIds.has(unit.id)) {
    damagedUnitIds.add(unit.id);
    damageUnit(unit, definition.damage || unitWeaponDamage(attacker), `${attacker.name} hit ${unit.name} with Ougi ${slot}`, true, attacker, false, false);
  }
  if (unit.alive) applyOugiControlLock(unit);
}

function ougiAreaCells(unit, slot, definition = null, facing = null) {
  const direction = facing || unit.facing || "down";
  const dir = { name: direction, ...directionVector(direction) };
  const shape = definition?.rangeShape;
  if (shape?.type === "line") return forwardOugiCells(unit, dir, shape.distance || 1);
  if (shape?.type === "forwardRect") return forwardRectOugiCells(unit, dir, shape.distance || 1, shape.halfWidth || 0);
  if (shape?.type === "square") return squareOugiCells(unit, shape.radius || 1);
  if (shape?.type === "cross") return crossOugiCells(unit, shape.distance || 1);
  if (shape?.type === "diamond") return diamondOugiCells(unit, shape.radius || 1);
  if (Number(slot) === 1) return forwardOugiCells(unit, dir, 5);
  return squareOugiCells(unit, Number(slot) === 2 ? 2 : 3);
}

function squareOugiCells(unit, radius) {
  const cells = [];
  for (let y = unit.y - radius; y <= unit.y + radius; y++) {
    for (let x = unit.x - radius; x <= unit.x + radius; x++) {
      if (x === unit.x && y === unit.y) continue;
      if (inside(x, y) && Math.max(Math.abs(x - unit.x), Math.abs(y - unit.y)) <= radius) cells.push({ x, y });
    }
  }
  return cells;
}

function crossOugiCells(unit, distance) {
  const cells = [];
  const crossDirections = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];
  for (const dir of crossDirections) {
    for (let step = 1; step <= distance; step++) {
      const x = unit.x + dir.dx * step;
      const y = unit.y + dir.dy * step;
      if (inside(x, y)) cells.push({ x, y });
    }
  }
  return cells;
}

function diamondOugiCells(unit, radius) {
  const cells = [];
  for (let y = unit.y - radius; y <= unit.y + radius; y++) {
    for (let x = unit.x - radius; x <= unit.x + radius; x++) {
      if (x === unit.x && y === unit.y) continue;
      if (inside(x, y) && Math.abs(x - unit.x) + Math.abs(y - unit.y) <= radius) cells.push({ x, y });
    }
  }
  return cells;
}

function forwardRectOugiCells(unit, dir, distance, halfWidth) {
  const cells = [];
  const perpendicular = dir.dx !== 0 ? { dx: 0, dy: 1 } : { dx: 1, dy: 0 };
  for (let step = 1; step <= distance; step++) {
    for (let side = -halfWidth; side <= halfWidth; side++) {
      const x = unit.x + dir.dx * step + perpendicular.dx * side;
      const y = unit.y + dir.dy * step + perpendicular.dy * side;
      if (inside(x, y)) cells.push({ x, y });
    }
  }
  return cells;
}

function forwardOugiCells(unit, dir, distance) {
  const cells = [];
  for (let step = 1; step <= distance; step++) {
    const x = unit.x + dir.dx * step;
    const y = unit.y + dir.dy * step;
    if (inside(x, y)) cells.push({ x, y });
  }
  return cells;
}

function updateActiveOugiPathLocks() {
  const now = performance.now();
  if (!state.ougiCasts) return;
  for (const cast of state.ougiCasts) {
    if (now - cast.startedAt >= cast.duration) continue;
    if (!cast.lockedUnitIds) cast.lockedUnitIds = new Set();
    if (!cast.damagedUnitIds) cast.damagedUnitIds = new Set();
    const caster = state.units.find((unit) => unit.id === cast.unitId && unit.alive);
    if (!caster) continue;
    const definition = ougiDefinitions[cast.weaponKey]?.[cast.slot];
    if (!definition) continue;
    const facing = cast.direction || caster.facing || "down";
    for (const cell of ougiAreaCells(caster, cast.slot, definition, facing)) {
      const unit = unitAt(cell.x, cell.y);
      if (!unit || unit.team === caster.team || !unit.alive) continue;
      cast.lockedUnitIds.add(unit.id);
      applyOugiHitToUnit(caster, unit, definition, cast.slot, cast.damagedUnitIds);
    }
  }
}
function applyOugiLockMarker(unit) {
  const now = performance.now();
  if (unit.ougiLockVisibleUntil && now < unit.ougiLockVisibleUntil) return;
  unit.ougiLockStartedAt = now;
  unit.ougiLockVisibleUntil = now + ougiHitControlLockMs;
}

function drawOugiLockIndicators() {
  const now = performance.now();
  for (const unit of state.units) {
    if (!unit.alive || !unit.ougiLockVisibleUntil || now >= unit.ougiLockVisibleUntil) continue;
    drawOugiLockIndicator(unit, unitPosition(unit));
  }
}
function applyOugiControlLock(unit) {
  unit.ougiCcUntil = Math.max(unit.ougiCcUntil || 0, performance.now() + ougiHitControlLockMs);
  applyOugiLockMarker(unit);
  unit.moveT = 1;
  unit.fromX = unit.x;
  unit.fromY = unit.y;
  cancelDragIfPressed(unit);
}

function drawOugiAnimations(now) {
  if (!state.ougiCasts) return;
  for (let i = state.ougiCasts.length - 1; i >= 0; i--) {
    const cast = state.ougiCasts[i];
    const definition = ougiDefinitions[cast.weaponKey]?.[cast.slot];
    const bodyFrames = ougiBodyFrames[cast.weaponKey]?.[cast.slot]?.[cast.direction] || [];
    const effectFrames = ougiFrames[cast.weaponKey]?.[cast.slot]?.[cast.direction] || [];
    const fxFrames = ougiFxFrames[cast.weaponKey]?.[cast.slot]?.[cast.direction] || [];
    const progress = definition ? (now - cast.startedAt) / definition.duration : 1;
    if (!definition || !Number.isFinite(progress) || progress >= 1) {
      state.ougiCasts.splice(i, 1);
      continue;
    }
    const unit = state.units.find((candidate) => candidate.id === cast.unitId);
    if (!unit) continue;
    const p = unitPosition(unit);
    ctx.save();
    try {
      ctx.globalAlpha = progress < 0.9 ? 0.96 : Math.max(0, (1 - progress) / 0.1);
      drawOugiLayerFrame(effectFrames, progress, p, definition, cast);
      drawOugiLayerFrame(bodyFrames, progress, p, definition, cast, "body", unit);
      drawOugiLayerFrame(fxFrames, progress, p, definition, cast, "fx");
    } catch (error) {
      drawOugiFallbackPulse(p, progress, definition);
    } finally {
      ctx.restore();
    }
  }
}

function drawOugiLayerFrame(frames, progress, p, definition, cast = null, layer = "effect", unit = null) {
  if (!frames || frames.length === 0) return;
  let frame = frames[Math.min(frames.length - 1, Math.floor(progress * frames.length))];
  if (!frame) return;
  if (layer === "body") frame = teamOugiBodyFrame(frame, unit?.team);
  const scale = Math.min(1, definition.maxSize / Math.max(frame.width, frame.height));
  if (shouldCenterOugiFrame(cast)) {
    drawCenteredOugiFrame(frame, p, scale, centeredOugiOffset(cast.direction));
    return;
  }
  const w = frame.width * scale;
  const h = frame.height * scale;
  ctx.drawImage(frame, p.x - w / 2, p.y - h / 2 - 18, w, h);
}

function shouldCenterOugiFrame(cast) {
  if (!cast?.weaponKey) return false;
  if (cast.weaponKey === "weapon20" || (cast.weaponKey === "weapon19" && Number(cast.slot) === 3)) return true;
  return /^(weapon1|weapon5|weapon6|weapon7|weapon8|weapon10|weapon11|weapon12|weapon13|weapon14|weapon15|weapon16)$/.test(cast.weaponKey);
}

function shouldAnchorOugiBodyFrame(cast) {
  if (!cast?.weaponKey) return false;
  const profile = weaponOugiRenderProfile(cast);
  if (profile.anchorBody !== undefined) return Boolean(profile.anchorBody);
  return cast.weaponKey !== "weapon20" && cast.weaponKey !== "weapon10";
}

function shouldFaceAnchorOugiBodyFrame(cast) {
  if (!cast?.weaponKey) return false;
  const profile = weaponOugiRenderProfile(cast);
  if (profile.faceAnchorBody !== undefined) return Boolean(profile.faceAnchorBody);
  return cast.weaponKey !== "weapon20";
}

function shouldUseExactOugiFrame(cast, layer = "effect") {
  const profile = weaponOugiRenderProfile(cast);
  if (profile.exactFrameLayers) return Boolean(profile.exactFrameLayers[layer]);
  return Boolean(profile.exactFrames || layer === "body");
}

function directedOugiFrame(frame, cast, layer = "effect") {
  if (!shouldTransformOugiDirection(cast, layer) || !frame?.width || !frame?.height) return frame;
  const direction = cast.direction || "right";
  if (direction === "right") return frame;
  let cachedByDirection = directedOugiFrameCache.get(frame);
  if (!cachedByDirection) {
    cachedByDirection = {};
    directedOugiFrameCache.set(frame, cachedByDirection);
  }
  if (cachedByDirection[direction]) return cachedByDirection[direction];
  const canvasEl = document.createElement("canvas");
  const rotate = direction === "up" || direction === "down";
  canvasEl.width = rotate ? frame.height : frame.width;
  canvasEl.height = rotate ? frame.width : frame.height;
  const context = canvasEl.getContext("2d");
  context.save();
  if (direction === "left") {
    context.translate(canvasEl.width, 0);
    context.scale(-1, 1);
    context.drawImage(frame, 0, 0);
  } else {
    context.translate(canvasEl.width / 2, canvasEl.height / 2);
    context.rotate(direction === "up" ? -Math.PI / 2 : Math.PI / 2);
    context.drawImage(frame, -frame.width / 2, -frame.height / 2);
  }
  context.restore();
  cachedByDirection[direction] = canvasEl;
  return canvasEl;
}

function shouldTransformOugiDirection(cast, layer = "effect") {
  if (layer === "body" && cast?.weaponKey === "weapon10" && Number(cast?.slot) === 3) return false;
  const slots = weaponOugiRenderProfile(cast).directionTransformSlots;
  return Boolean(slots && slots[Number(cast?.slot)]);
}

function teamOugiBodyFrame(frame, team) {
  if (team !== "blue" || !frame?.width || !frame?.height) return frame;
  if (ougiBodyTeamFrameCache.has(frame)) return ougiBodyTeamFrameCache.get(frame);
  const canvasEl = document.createElement("canvas");
  canvasEl.width = frame.width;
  canvasEl.height = frame.height;
  const context = canvasEl.getContext("2d");
  context.drawImage(frame, 0, 0);
  context.globalCompositeOperation = "source-atop";
  context.globalAlpha = 0.48;
  context.fillStyle = "#35b8f0";
  context.fillRect(0, 0, canvasEl.width, canvasEl.height);
  context.globalAlpha = 1;
  ougiBodyTeamFrameCache.set(frame, canvasEl);
  return canvasEl;
}

function drawCenteredOugiFrame(frame, p, scale, offset = { x: 0, y: -18 }) {
  const w = frame.width * scale;
  const h = frame.height * scale;
  const bounds = safeVisibleImageBounds(frame, ougiFrameBoundsCache);
  if (!bounds) {
    ctx.drawImage(frame, p.x - w / 2 + offset.x, p.y - h / 2 + offset.y, w, h);
    return;
  }
  const visibleCenterX = (bounds.x + bounds.w / 2) * scale;
  const visibleCenterY = (bounds.y + bounds.h / 2) * scale;
  ctx.drawImage(frame, p.x - visibleCenterX + offset.x, p.y - visibleCenterY + offset.y, w, h);
}

function drawFullCenteredOugiFrame(frame, p, scale, offset = { x: 0, y: -18 }, unit = null, cast = null) {
  const w = frame.width * scale;
  const h = frame.height * scale;
  const drawX = p.x - w / 2 + offset.x;
  const drawY = p.y - h / 2 + offset.y;
  ctx.drawImage(frame, drawX, drawY, w, h);
  drawOugiBodyEyes(frame, unit, drawX, drawY, scale, cast);
}

function drawAnchoredOugiBodyFrame(frame, p, scale, offset = { x: 0, y: -18 }, unit = null, cast = null) {
  const w = frame.width * scale;
  const h = frame.height * scale;
  const bounds = safeVisibleImageBounds(frame, ougiFrameBoundsCache);
  if (!bounds) {
    const drawX = p.x - w / 2 + offset.x;
    const drawY = p.y - h / 2 + offset.y;
    ctx.drawImage(frame, drawX, drawY, w, h);
    drawOugiBodyEyes(frame, unit, drawX, drawY, scale, cast);
    return;
  }
  const visibleCenterX = (bounds.x + bounds.w / 2) * scale;
  const visibleBottomY = (bounds.y + bounds.h) * scale;
  const footY = p.y + 15;
  const drawX = p.x - visibleCenterX + offset.x;
  const drawY = footY - visibleBottomY + offset.y;
  ctx.drawImage(frame, drawX, drawY, w, h);
  drawOugiBodyEyes(frame, unit, drawX, drawY, scale, cast);
}

function drawFaceAnchoredOugiBodyFrame(frame, p, scale, offset = { x: 0, y: -18 }, unit = null, cast = null) {
  const face = ougiBodyFaceBounds(frame);
  if (!face) return false;
  const w = frame.width * scale;
  const h = frame.height * scale;
  const target = ougiUnitFaceAnchor(p, cast?.direction || unit?.facing || "down");
  const sourceX = (face.x + face.w / 2) * scale;
  const sourceY = (face.y + face.h / 2) * scale;
  const drawX = target.x - sourceX + (offset.x || 0);
  const drawY = target.y - sourceY + (offset.y || 0);
  ctx.drawImage(frame, drawX, drawY, w, h);
  drawOugiBodyEyes(frame, unit, drawX, drawY, scale, cast);
  return true;
}

function ougiUnitFaceAnchor(p, direction = "down") {
  if (direction === "right") return { x: p.x + 5, y: p.y - 17 };
  if (direction === "left") return { x: p.x - 5, y: p.y - 17 };
  if (direction === "up") return { x: p.x, y: p.y - 18 };
  return { x: p.x, y: p.y - 17 };
}

function drawOugiBodyEyes(frame, unit, drawX, drawY, scale, cast = null) {
  if (!unit || !frame?.width || !frame?.height) return;
  const face = ougiBodyFaceBounds(frame);
  if (!face) return;
  const direction = cast?.direction || unit.facing || "down";
  if (direction === "up") return;
  const eyeStyle = normalizedEyeStyle(unit.eyeStyle);
  const eyeSet = eyeFrames[eyeStyle] || eyeFrames[defaultEyeStyle];
  const useSide = direction === "left" || direction === "right";
  const eyeFrame = useSide
    ? (eyeSet?.side || eyeSet?.front || images.eyeSide || images.eyesFront)
    : (eyeSet?.front || images.eyesFront);
  if (!eyeFrame) return;
  const aspect = eyeFrame.width && eyeFrame.height ? eyeFrame.height / eyeFrame.width : (useSide ? 14 / 17 : 16 / 35);
  const eyeW = Math.max(8, Math.min(34, face.w * scale * (useSide ? 0.88 : 0.9)));
  const eyeH = Math.max(5, Math.min(16, eyeW * aspect));
  const faceCenterX = drawX + (face.x + face.w / 2) * scale;
  const faceCenterY = drawY + (face.y + face.h * 0.48) * scale;

  ctx.save();
  ctx.fillStyle = face.color || "rgb(237, 172, 128)";
  ctx.globalAlpha = 0.86;
  ctx.beginPath();
  ctx.ellipse(faceCenterX, faceCenterY, eyeW * 0.62, eyeH * 0.72, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  if (direction === "left" && useSide) {
    ctx.translate(faceCenterX, faceCenterY);
    ctx.scale(-1, 1);
    drawEyeFrameCentered(eyeFrame, 0, 0, eyeW, eyeH);
  } else {
    drawEyeFrameCentered(eyeFrame, faceCenterX, faceCenterY, eyeW, eyeH);
  }
  ctx.restore();
}

function ougiBodyFaceBounds(image) {
  if (ougiBodyFaceBoundsCache.has(image)) return ougiBodyFaceBoundsCache.get(image);
  const bounds = detectLargestSkinComponent(image);
  ougiBodyFaceBoundsCache.set(image, bounds);
  return bounds;
}

function detectLargestSkinComponent(image) {
  try {
    const canvasEl = document.createElement("canvas");
    canvasEl.width = image.width;
    canvasEl.height = image.height;
    const context = canvasEl.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height);
    const pixels = imageData.data;
    const width = canvasEl.width;
    const height = canvasEl.height;
    const visited = new Uint8Array(width * height);
    let best = null;

    for (let index = 0; index < visited.length; index++) {
      if (visited[index]) continue;
      const pixelIndex = index * 4;
      if (!isSkinPixel(pixels[pixelIndex], pixels[pixelIndex + 1], pixels[pixelIndex + 2], pixels[pixelIndex + 3])) {
        visited[index] = 1;
        continue;
      }

      const stack = [index];
      visited[index] = 1;
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;
      let count = 0;
      let red = 0;
      let green = 0;
      let blue = 0;

      while (stack.length) {
        const current = stack.pop();
        const x = current % width;
        const y = Math.floor(current / width);
        const currentPixel = current * 4;
        count++;
        red += pixels[currentPixel];
        green += pixels[currentPixel + 1];
        blue += pixels[currentPixel + 2];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;

        const neighbors = [current - 1, current + 1, current - width, current + width];
        for (const next of neighbors) {
          if (next < 0 || next >= visited.length || visited[next]) continue;
          const nx = next % width;
          if ((next === current - 1 && nx !== x - 1) || (next === current + 1 && nx !== x + 1)) continue;
          const nextPixel = next * 4;
          visited[next] = 1;
          if (isSkinPixel(pixels[nextPixel], pixels[nextPixel + 1], pixels[nextPixel + 2], pixels[nextPixel + 3])) stack.push(next);
        }
      }

      const componentWidth = maxX - minX + 1;
      const componentHeight = maxY - minY + 1;
      if (count < 20 || componentWidth < 6 || componentHeight < 6) continue;
      const score = count - Math.abs(componentWidth - componentHeight) * 2;
      if (!best || score > best.score) {
        best = {
          x: minX,
          y: minY,
          w: componentWidth,
          h: componentHeight,
          score,
          color: `rgb(${Math.round(red / count)}, ${Math.round(green / count)}, ${Math.round(blue / count)})`,
        };
      }
    }

    return best;
  } catch (error) {
    return null;
  }
}

function isSkinPixel(red, green, blue, alpha) {
  if (alpha <= 20) return false;
  if (red < 170 || green < 95 || green > 230 || blue < 60 || blue > 205) return false;
  return red > blue + 25 && red > green + 8;
}

function safeVisibleImageBounds(image, cache) {
  try {
    return visibleImageBounds(image, cache);
  } catch (error) {
    cache.set(image, null);
    return null;
  }
}

function visibleImageBounds(image, cache) {
  if (!image || image.width <= 0 || image.height <= 0) return null;
  if (cache.has(image)) return cache.get(image);
  const canvasEl = document.createElement("canvas");
  canvasEl.width = image.width;
  canvasEl.height = image.height;
  const context = canvasEl.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, image.width, image.height).data;
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      if (pixels[(y * image.width + x) * 4 + 3] <= 4) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  const bounds = maxX >= minX && maxY >= minY ? { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 } : null;
  cache.set(image, bounds);
  return bounds;
}

function centeredOugiOffset(direction, override = null) {
  if (override) return override;
  const offsets = {
    up: { x: 0, y: -18 },
    down: { x: 0, y: -18 },
    left: { x: 0, y: -18 },
    right: { x: 0, y: -18 },
  };
  return offsets[direction] || { x: 0, y: -18 };
}

function drawOugiFallbackPulse(p, progress, definition) {
  const radius = Math.max(28, Math.min(92, (definition?.maxSize || 360) * 0.18));
  ctx.save();
  ctx.globalAlpha = 0.75 * (1 - Math.max(0, progress - 0.75) / 0.25);
  ctx.strokeStyle = "#f5d06e";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(p.x, p.y - 18, radius * (0.75 + progress * 0.35), 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function handleOugiKeyDown(event) {
  if (event.key.toLowerCase() !== "z") return;
  if (event.target && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
  state.ougiKeyDown = true;
  const unit = selectedUnit();
  if (unit) setMessage(`${unit.name}: click to use Ougi.`);
  event.preventDefault();
}

function handleOugiKeyUp(event) {
  if (event.key.toLowerCase() !== "z") return;
  state.ougiKeyDown = false;
}
// ===== UI Text / Audio Helpers =====
function updatePanel() {
  const unit = selectedHudUnit();
  if (!unit) return;
  const coord = displayCellCoord(unit);
  unitInfoEl.innerHTML = `
    <div>HP: ${Math.round(unit.hp)}/${unit.maxHp || maxHp}</div>
    <div>SKILL: ${unit.skill.toFixed(1)} / ${maxSkill}</div>
    <div>SPECIAL: ${Math.floor(specialGaugePercent(unit))} / ${maxOugi}</div>
    <div>GOLD: ${Math.floor(unit.gold || 0)}</div>
    <div>CELL: [${coord.x}, ${coord.y}]</div>
  `;
  skillFillEl.style.width = `${Math.min(100, unit.skill / maxSkill * 100)}%`;
}

function unitSprite(unit) {
  const prefix = unit.team === "blue" ? "blue" : "grey";
  const suffix = unit.facing.charAt(0).toUpperCase() + unit.facing.slice(1);
  return images[prefix + suffix];
}

function unitUseNinjuSprite(unit) {
  if (!isUnitCastingNinju(unit)) return null;
  const frames = useNinjuFrames[unit.team] || [];
  if (!frames.length) return null;
  const progress = Math.min(0.999, Math.max(0, (performance.now() - unit.ninju.startedAt) / unit.ninju.duration));
  return frames[Math.floor(progress * frames.length)] || null;
}

function unitSpriteDrawBox(sprite, preserveAspect = false) {
  if (isNindou3UnitSprite(sprite)) return { w: sprite.width * nindou3SpriteScale, h: sprite.height * nindou3SpriteScale, footOffsetY: 15 };
  if (!preserveAspect || !sprite?.width || !sprite?.height) return { w: 62, h: 62, footOffsetY: 15 };
  return { w: sprite.width, h: sprite.height, footOffsetY: 15 };
}

function isNindou3UnitSprite(sprite) {
  return sprite && (
    sprite === images.blueDown ||
    sprite === images.blueLeft ||
    sprite === images.blueRight ||
    sprite === images.blueUp ||
    sprite === images.greyDown ||
    sprite === images.greyLeft ||
    sprite === images.greyRight ||
    sprite === images.greyUp
  );
}

function playerUsesNindou3Sprite(unit) {
  return isNindou3UnitSprite(unitSprite(unit));
}

function updateFacing(unit, target) {
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    unit.facing = dx > 0 ? "right" : "left";
  } else if (dy !== 0) {
    unit.facing = dy > 0 ? "down" : "up";
  }
}

function updateFacingFromPointer(unit) {
  const origin = cellCenter(unit.x, unit.y);
  const dx = state.pointer.x - origin.x;
  const dy = state.pointer.y - origin.y;
  if (Math.hypot(dx, dy) < 8) return;
  if (Math.abs(dx) >= Math.abs(dy)) {
    unit.facing = dx > 0 ? "right" : "left";
  } else {
    unit.facing = dy > 0 ? "down" : "up";
  }
}

function directionFromAdjacent(unit, target) {
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  if (Math.abs(dx) + Math.abs(dy) !== 1) return null;
  if (dx > 0) return { name: "right", dx: 1, dy: 0 };
  if (dx < 0) return { name: "left", dx: -1, dy: 0 };
  if (dy > 0) return { name: "down", dx: 0, dy: 1 };
  return { name: "up", dx: 0, dy: -1 };
}

function directionFromTarget(unit, target) {
  const dx = target.x - unit.x;
  const dy = target.y - unit.y;
  if (dx === 0 && dy === 0) return null;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx > 0 ? { name: "right", dx: 1, dy: 0 } : { name: "left", dx: -1, dy: 0 };
  }
  return dy > 0 ? { name: "down", dx: 0, dy: 1 } : { name: "up", dx: 0, dy: -1 };
}

function directionVector(facing) {
  if (facing === "left") return { dx: -1, dy: 0 };
  if (facing === "right") return { dx: 1, dy: 0 };
  if (facing === "up") return { dx: 0, dy: -1 };
  return { dx: 0, dy: 1 };
}

function moneyDartProjectileImage(direction) {
  if (direction === "left") return images.moneyDartLeft;
  if (direction === "right") return images.moneyDartRight;
  if (direction === "up") return images.moneyDartUp;
  return images.moneyDartDown;
}

function setMessage(text) {
  state.message = text;
  statusEl.textContent = text;
}

function activeBgm() {
  if (state.result) return null;
  if (!state.inRoom && state.gameMode === "yashao") return yashaoBattleBgm;
  return state.inRoom ? roomBgm : battleBgm;
}

function stopBgm(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function syncBgm() {
  const active = activeBgm();
  if (active !== roomBgm && !roomBgm.paused) stopBgm(roomBgm);
  if (active !== battleBgm && !battleBgm.paused) stopBgm(battleBgm);
  if (active !== yashaoBattleBgm && !yashaoBattleBgm.paused) stopBgm(yashaoBattleBgm);
}

function startBgm() {
  syncBgm();
  const bgm = activeBgm();
  if (!bgm || !bgm.paused) return;
  bgm.play().catch(() => {
    setMessage("Click the game once to start background music.");
  });
}

function applyVolumeControls() {
  if (musicVolumeInput) {
    const volume = Number(musicVolumeInput.value) / 100;
    roomBgm.volume = volume;
    battleBgm.volume = volume;
    yashaoBattleBgm.volume = volume;
  }
  if (sfxVolumeInput) {
    const volume = Number(sfxVolumeInput.value) / 100;
    Object.values(sounds).forEach((sound) => {
      sound.volume = volume;
    });
  }
}

function playSound(key) {
  const sound = sounds[key];
  if (!sound) return null;
  const instance = new Audio(sound.currentSrc || sound.src);
  instance.preload = "auto";
  instance.muted = false;
  instance.volume = sound.volume;
  state.activeSounds = (state.activeSounds || []).filter((audio) => !audio.ended && !audio.paused);
  state.activeSounds.push(instance);
  instance.addEventListener("ended", () => {
    state.activeSounds = (state.activeSounds || []).filter((audio) => audio !== instance);
  }, { once: true });
  instance.addEventListener("error", () => {
    state.activeSounds = (state.activeSounds || []).filter((audio) => audio !== instance);
    if (key.startsWith("weapon19Ougi")) setMessage(`Could not play Ougi sound: ${key}`);
  }, { once: true });
  try {
    instance.currentTime = 0;
    instance.load();
  } catch (error) {}
  instance.play().catch(() => {
    state.activeSounds = (state.activeSounds || []).filter((audio) => audio !== instance);
    if (key.startsWith("weapon19Ougi")) setMessage(`Ougi sound blocked: ${key}`);
  });
  return instance;
}

function playBreakSound(object) {
  if (object.type === "vase") {
    playSound("breakVase");
  } else if (object.type === "chest") {
    playSound("breakChest");
  } else {
    playSound("breakDefault");
  }
}

async function startBattleFromRoom() {
  if (state.loadingBattle) return;
  state.loadingBattle = true;
  syncSelectedCharacterFromBlueSlot();
  try {
    await loadOugiAssetsForSelectedWeapons();
    setAppScreen("match");
    state.inRoom = false;
    resetGame();
    syncBgm();
    startBgm();
  } finally {
    state.loadingBattle = false;
  }
}

function toggleGameMode() {
  state.gameMode = state.gameMode === "yashao" ? "random" : "yashao";
  updateGameModeUi();
  renderRoomInventoryPanel();
  setMessage(state.gameMode === "yashao" ? "Yashao mode selected." : "Random Nindou mode selected.");
}

function updateGameModeUi() {
  if (modeTitleEl) modeTitleEl.textContent = state.gameMode === "yashao" ? "Yashao" : "Random Nindou 2 Series";
  if (modePreviewBtn) {
    modePreviewBtn.textContent = state.gameMode === "yashao" ? "Y" : "?";
    modePreviewBtn.classList.toggle("selected", state.gameMode === "yashao");
  }
}

function returnToRoomFromResult() {
  if (state.endSoundInstance) {
    state.endSoundInstance.pause();
    state.endSoundInstance.currentTime = 0;
    state.endSoundInstance = null;
  }
  state.inRoom = true;
  state.result = null;
  state.resultClickableAt = 0;
  state.gameOver = false;
  state.matchStart = 0;
  state.matchEnd = 0;
  state.countdownStart = 0;
  state.pressedUnit = null;
  state.dragMoved = false;
  state.charging = false;
  state.attacks = [];
  state.projectiles = [];
  state.moneyDartCasts = [];
  state.ougiCasts = [];
  state.deathAnimations = [];
  state.pendingResult = null;
  state.resultOverlayAt = 0;
  state.ougiKeyDown = false;
  clearDragState();
  setAppScreen("preGameLobby");
  syncBgm();
  startBgm();
  renderRoomInventoryPanel();
  setMessage("Back to room.");
}

function updateRuleModeUi() {
  if (!ruleModeToggle || !ruleModeCheckbox) return;
  const modeKey = currentRuleModeKey();
  const labels = {
    n3: "Nindou 3",
    original: "Nindou 2 Original",
    modified: "Nindou 2 Modified",
  };
  const checked = modeKey === "original";
  ruleModeToggle.setAttribute("aria-pressed", checked ? "true" : "false");
  ruleModeToggle.setAttribute("aria-label", labels[modeKey] || labels.n3);
  ruleModeToggle.classList.toggle("checked", checked);
  if (ruleModeLabel) ruleModeLabel.textContent = labels[modeKey] || labels.n3;
}

function toggleRuleMode() {
  const order = ["n3", "original", "modified"];
  const currentIndex = order.indexOf(currentRuleModeKey());
  state.ruleModeKey = order[(currentIndex + 1) % order.length];
  state.useOriginalMode = state.ruleModeKey === "original";
  updateRuleModeUi();
}

function openNinjuEditor(options = {}) {
  if (!ninjuEditorEl) return;
  profileEditorReadOnly = Boolean(options.readOnly);
  document.body.classList.add("profile-editor-mode");
  document.body.classList.toggle("profile-editor-readonly", profileEditorReadOnly);
  editNinjuDraft = [...currentProfileNinjuLoadout()];
  editNinjuSlotIndex = 0;
  editEyeStyleDraft = normalizedEyeStyle(currentNinjuProfileStorage().eyeStyle);
  setNinjuEditorMode("ninju");
  renderNinjuEditorProfile();
  renderNinjuEditor();
  if (ninjuEditorResetBtn) ninjuEditorResetBtn.disabled = profileEditorReadOnly;
  if (ninjuEditorSaveBtn) ninjuEditorSaveBtn.disabled = profileEditorReadOnly;
  if (ninjuEditorCancelBtn) ninjuEditorCancelBtn.textContent = profileEditorReadOnly ? "Close" : "Cancel";
  ninjuEditorEl.hidden = false;
}

function closeNinjuEditor() {
  document.body.classList.remove("profile-editor-mode");
  document.body.classList.remove("profile-editor-readonly");
  profileEditorReadOnly = false;
  if (ninjuEditorResetBtn) ninjuEditorResetBtn.disabled = false;
  if (ninjuEditorSaveBtn) ninjuEditorSaveBtn.disabled = false;
  if (ninjuEditorCancelBtn) ninjuEditorCancelBtn.textContent = "Cancel";
  if (ninjuEditorEl) ninjuEditorEl.hidden = true;
}

function saveNinjuEditor() {
  if (profileEditorReadOnly) {
    closeNinjuEditor();
    return;
  }
  const storage = currentNinjuProfileStorage();
  selectedNinjuLoadout = normalizedNinjuLoadout(editNinjuDraft, { enforceAvailability: true, storage });
  storage.ninjuLoadout = [...selectedNinjuLoadout];
  storage.eyeStyle = normalizedEyeStyle(editEyeStyleDraft);
  storage.eyeStyleVersion = eyeStyleSchemaVersion;
  window.localStorage.setItem(ninjuLoadoutStorageKey, JSON.stringify(selectedNinjuLoadout));
  updateRoomEyeImages();
  syncSelectedCharacterFromBlueSlot();
  renderRoomCardAvatars();
  closeNinjuEditor();
}

function loadSavedNinjuLoadout() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(ninjuLoadoutStorageKey) || "null");
    if (Array.isArray(saved) && saved.length === 6 && saved.every((type) => !type || ninjuByType[type])) {
      return normalizedNinjuLoadout(saved);
    }
  } catch (_) {
    // Fall back to the default six slots when stored data is broken.
  }
  return [...defaultNinjuLoadout];
}

function normalizedNinjuLoadout(loadout, options = {}) {
  return Array.from({ length: 6 }, (_, index) => {
    const type = loadout[index];
    if (!ninjuByType[type]) return null;
    if (options.enforceAvailability && !canEquipNinjuType(type, options.storage)) return null;
    return type;
  });
}

function currentNinjuProfileStorage() {
  return storageForRoomSlotKey(roomStorageKey("blue", 1));
}

function currentProfileNinjuLoadout() {
  const storage = currentNinjuProfileStorage();
  storage.ninjuLoadout = normalizedNinjuLoadout(storage.ninjuLoadout, { enforceAvailability: true, storage });
  return storage.ninjuLoadout;
}

function ninjuUnlockRequirement(ninju) {
  return ninjutsuUnlockByName[ninju?.unlockName || ninju?.label] || null;
}

function isNinjuUnlockedForStorage(ninju, storage = currentNinjuProfileStorage()) {
  if (ninjuTestingFullAccess) return Boolean(ninju);
  if (!ninju) return false;
  const unlock = ninjuUnlockRequirement(ninju);
  if (!unlock) return false;
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  if (progression.level < unlock.level) return false;
  return !unlock.branch || storage.classBranch === unlock.branch;
}

function canEquipNinjuType(type, storage = currentNinjuProfileStorage()) {
  const ninju = ninjuByType[type];
  if (ninjuTestingFullAccess) return Boolean(ninju);
  return Boolean(ninju?.implemented && isNinjuUnlockedForStorage(ninju, storage));
}

function ninjuAvailabilityReason(ninju, storage = currentNinjuProfileStorage()) {
  if (!ninju) return "Unknown jutsu.";
  if (ninjuTestingFullAccess && !ninju.implemented) return "Available for loadout testing; behavior is not implemented yet.";
  if (ninjuTestingFullAccess) return "";
  if (!ninju.implemented) return "Not implemented yet.";
  const unlock = ninjuUnlockRequirement(ninju);
  if (!unlock) return "No unlock rule yet.";
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  if (progression.level < unlock.level) return `Unlocks at level ${unlock.level}.`;
  if (unlock.branch && storage.classBranch !== unlock.branch) return `${unlock.branch} only.`;
  return "";
}

function resetNinjuEditorLoadout() {
  if (profileEditorReadOnly) return;
  if (ninjuEditorMode === "eyes") {
    editEyeStyleDraft = defaultEyeStyle;
    renderNinjuEditor();
    return;
  }
  editNinjuDraft = Array(6).fill(null);
  editNinjuSlotIndex = 0;
  renderNinjuEditor();
}

function renderNinjuEditorProfile() {
  const storage = storageForRoomSlotKey(roomStorageKey("blue", 1));
  const progression = progressionSummaryForExp(storage.exp, storage.classBranch);
  if (ninjuEditorLevelEl) ninjuEditorLevelEl.textContent = String(progression.level);
  if (ninjuEditorRoleEl) ninjuEditorRoleEl.textContent = progression.rankTitle;
  if (ninjuEditorRankMarkEl) {
    ninjuEditorRankMarkEl.src = progression.rankMarkPath;
    ninjuEditorRankMarkEl.alt = `${progression.rankTitle} rank mark`;
  }
  if (ninjuEditorAvatarEyeEl) ninjuEditorAvatarEyeEl.src = eyeImagePath(editEyeStyleDraft || storage.eyeStyle);
}

function renderNinjuEditor() {
  if (!ninjuEditorSlotsEl || !ninjuEditorListEl) return;
  renderNinjuEditorProfile();
  if (ninjuEditorMode === "eyes") {
    renderEyeEditor();
    return;
  }
  if (ninjuEditorEl) ninjuEditorEl.dataset.mode = "ninju";
  ninjuEditorSlotsEl.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const type = editNinjuDraft[i];
    const ninju = ninjuByType[type] || { label: "Empty" };
    const button = document.createElement("button");
    button.type = "button";
    button.className = `ninju-slot-choice${i === editNinjuSlotIndex ? " selected" : ""}${type ? "" : " empty"}`;
    if (type) button.dataset.ninjuType = type;
    button.textContent = ninju.label;
    button.disabled = profileEditorReadOnly;
    button.addEventListener("click", () => {
      if (profileEditorReadOnly) return;
      editNinjuDraft[i] = null;
      editNinjuSlotIndex = i;
      renderNinjuEditor();
    });
    ninjuEditorSlotsEl.appendChild(button);
  }

  ninjuEditorListEl.innerHTML = "";
  for (const ninju of ninjuEditorCatalog) {
    const storage = currentNinjuProfileStorage();
    const available = canEquipNinjuType(ninju.type, storage);
    const reason = ninjuAvailabilityReason(ninju, storage);
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = !available;
    button.className = `ninju-option ${ninju.group}${editNinjuDraft.includes(ninju.type) ? " selected" : ""}${!available ? " locked" : ""}${!ninju.implemented ? " unimplemented" : ""}`;
    button.dataset.ninjuType = ninju.type;
    button.dataset.editorRow = ninju.editorRow;
    const editorColumn = ((ninju.editorOrder - 1) % 8) + 1;
    const editorSubrow = Math.floor((ninju.editorOrder - 1) / 8);
    const editorRowBase = ninjuEditorRowOrder[ninju.editorRow] || 1;
    button.style.setProperty("--editor-order", editorColumn);
    button.style.gridRow = String(editorRowBase + editorSubrow);
    button.textContent = ninju.label;
    if (profileEditorReadOnly) button.disabled = true;
    if (reason) button.title = reason;
    button.addEventListener("click", () => {
      if (profileEditorReadOnly || !available) return;
      const existingIndex = editNinjuDraft.indexOf(ninju.type);
      if (existingIndex >= 0) editNinjuDraft[existingIndex] = null;
      const targetIndex = editNinjuSlotIndex >= 0 && editNinjuSlotIndex < 6 ? editNinjuSlotIndex : editNinjuDraft.findIndex((type) => !type);
      if (targetIndex < 0) return;
      editNinjuDraft[targetIndex] = ninju.type;
      const nextEmptyIndex = editNinjuDraft.findIndex((type) => !type);
      editNinjuSlotIndex = nextEmptyIndex >= 0 ? nextEmptyIndex : targetIndex;
      renderNinjuEditor();
    });
    ninjuEditorListEl.appendChild(button);
  }
}

function setNinjuEditorMode(mode) {
  ninjuEditorMode = mode === "eyes" ? "eyes" : "ninju";
  if (ninjuEditorEl) ninjuEditorEl.dataset.mode = ninjuEditorMode;
  ninjuEditorTabEls.forEach((tab) => {
    const label = tab.textContent.trim().toLowerCase();
    const active = (ninjuEditorMode === "eyes" && label === "eyes") || (ninjuEditorMode === "ninju" && label === "ninju");
    tab.classList.toggle("active", active);
  });
}

function renderEyeEditor() {
  setNinjuEditorMode("eyes");
  ninjuEditorSlotsEl.innerHTML = "";
  const preview = document.createElement("div");
  preview.className = "eye-editor-preview";
  preview.innerHTML = `
    <img class="eye-editor-preview-avatar" src="assets/ninja-blue/idleDown.png" alt="">
    <img class="eye-editor-preview-eyes" src="${eyeImagePath(editEyeStyleDraft)}" alt="">
  `;
  ninjuEditorSlotsEl.appendChild(preview);

  ninjuEditorListEl.innerHTML = "";
  for (const id of eyeStyleIds) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `eye-option${id === editEyeStyleDraft ? " selected" : ""}`;
    button.title = `Eyes ${id}`;
    button.style.backgroundImage = `url("${eyeImagePath(id)}")`;
    button.disabled = profileEditorReadOnly;
    button.addEventListener("click", () => {
      if (profileEditorReadOnly) return;
      editEyeStyleDraft = id;
      renderNinjuEditor();
    });
    ninjuEditorListEl.appendChild(button);
  }
}

canvas.addEventListener("pointerdown", pointerDown);
canvas.addEventListener("pointermove", pointerMove);
window.addEventListener("pointerup", pointerUp);
resetBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", startBgm);
ensureAuthenticRoomCardLayers();
ensureLobbyBottomButtonArt();
setupWeaponSelects();
setupControlSelects();
setupHpInputs();
setupRoomSlots();
renderRoomInventoryPanel();
if (battleStartBtn) battleStartBtn.addEventListener("click", startBattleFromRoom);
if (roomLeaveBtn) roomLeaveBtn.addEventListener("click", () => {
  setAppScreen("commonRoom");
  setMessage("Returned to lobby.");
});
if (teamEditBtn) teamEditBtn.addEventListener("click", openNinjuEditor);
ninjuEditorTabEls.forEach((tab) => {
  tab.addEventListener("click", () => {
    const label = tab.textContent.trim().toLowerCase();
    if (label === "eyes") setNinjuEditorMode("eyes");
    else if (label === "ninju") setNinjuEditorMode("ninju");
    renderNinjuEditor();
  });
});
if (ninjuEditorResetBtn) ninjuEditorResetBtn.addEventListener("click", resetNinjuEditorLoadout);
if (ninjuEditorCancelBtn) ninjuEditorCancelBtn.addEventListener("click", closeNinjuEditor);
if (ninjuEditorSaveBtn) ninjuEditorSaveBtn.addEventListener("click", saveNinjuEditor);
if (musicVolumeInput) musicVolumeInput.addEventListener("input", applyVolumeControls);
if (sfxVolumeInput) sfxVolumeInput.addEventListener("input", applyVolumeControls);
if (ruleModeToggle) ruleModeToggle.addEventListener("click", toggleRuleMode);
if (modePreviewBtn) modePreviewBtn.addEventListener("click", toggleGameMode);
if (roomInventoryBtn) roomInventoryBtn.addEventListener("click", toggleRoomInventoryPanel);
if (loginContinueBtn) loginContinueBtn.addEventListener("click", continueFromLogin);
if (loginNameInput) loginNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") continueFromLogin();
});
if (newCharacterBtn) newCharacterBtn.addEventListener("click", () => {
  if ((state.appProfile?.characters?.length || 0) >= 3) return;
  setAppScreen("characterCreate");
});
if (cancelCreateCharacterBtn) cancelCreateCharacterBtn.addEventListener("click", () => {
  setAppScreen((state.appProfile?.characters?.length || 0) > 0 ? "characterSelect" : "login");
});
if (saveCharacterBtn) saveCharacterBtn.addEventListener("click", saveCreatedCharacter);
if (characterTeamSelect) characterTeamSelect.addEventListener("change", updateCreateCharacterPreview);
bindCreateAvatarSelectEvents();
if (changeCharacterBtn) changeCharacterBtn.addEventListener("click", () => setAppScreen("characterSelect"));
if (nekomataReturnBtn) nekomataReturnBtn.addEventListener("click", () => setAppScreen("characterSelect"));
if (commonRoomBtn) commonRoomBtn.addEventListener("click", () => setAppScreen("commonRoom"));
if (profileMapBtn) profileMapBtn.addEventListener("click", () => {
  setAppScreen("preGameLobby");
  openNinjuEditor();
});
if (battleMapBtn) battleMapBtn.addEventListener("click", () => setAppScreen("preGameLobby"));
if (commonRoomMapBtn) commonRoomMapBtn.addEventListener("click", () => setAppScreen("worldMap"));
if (commonRoomBattleBtn) commonRoomBattleBtn.addEventListener("click", () => setAppScreen("preGameLobby"));
renderVillageHall();
window.addEventListener("keydown", startBgm, { once: true });
window.addEventListener("keydown", handleOugiKeyDown);
window.addEventListener("keyup", handleOugiKeyUp);
window.addEventListener("blur", () => {
  state.ougiKeyDown = false;
});

loadImages().then(() => {
  updateRuleModeUi();
  updateGameModeUi();
  applyVolumeControls();
  initializeAppFlow();
  resetGame();
  startBgm();
  draw();
});
