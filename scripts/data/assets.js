// Asset paths and frame buffers. Loading still happens in game.js for now.
const roomBgm = new Audio("assets/audio/lobby.mp3");
const battleBgm = new Audio("assets/audio/bgm.mp3");

const soundSources = {
  move: "assets/sfx/ninja/normalmove.ogg",
  runOver: "assets/sfx/ninja/run_over/3.ogg",
  respawn: "assets/sfx/ninja/respawn_tips_1.ogg",
  weaponDamaged: "assets/sfx/ninja/weapon_damaged.ogg",
  death: "assets/sfx/ninja/death/1.ogg",
  slash: "assets/sfx/weapon/1.ogg",
  muramasaSlash: "assets/sfx/weapon/muramasa.mp3",
  weapon20Slash: "assets/sfx/weapon/weapon20.mp3",
  weapon19Ougi1: "assets/sfx/ougi/weapon19_ougi1.mp3",
  weapon19Ougi2: "assets/sfx/ougi/weapon19_ougi2.mp3",
  weapon19Ougi3: "assets/sfx/ougi/weapon19_ougi3.mp3",
  weapon19Ougi1Chid4: "assets/nindou_exports/sounds/4.mp3",
  weapon19Ougi1Chid20: "assets/nindou_exports/sounds/20.mp3",
  weapon19Ougi1Chid25: "assets/nindou_exports/sounds/25.mp3",
  weapon19Ougi1Chid33: "assets/nindou_exports/sounds/33.mp3",
  weapon19Ougi1Chid40: "assets/nindou_exports/sounds/40.mp3",
  weapon19Ougi1Chid45: "assets/nindou_exports/sounds/45.mp3",
  weapon19Ougi1Chid56: "assets/nindou_exports/sounds/56.mp3",
  weapon19Ougi1Chid72: "assets/nindou_exports/sounds/72.mp3",
  weapon19Ougi1Chid74: "assets/nindou_exports/sounds/74.mp3",
  weapon19Ougi1Chid75: "assets/nindou_exports/sounds/75.mp3",
  weapon19Ougi1Chid85: "assets/nindou_exports/sounds/85.mp3",
  weapon19Ougi1Chid93: "assets/nindou_exports/sounds/93.mp3",
  weapon19Ougi1Chid94: "assets/nindou_exports/sounds/94.mp3",
  weapon19Ougi1Chid113: "assets/nindou_exports/sounds/113.mp3",
  weapon19Ougi1Chid119: "assets/nindou_exports/sounds/119.mp3",
  weapon19Ougi1Chid975: "assets/nindou_exports/sounds/975.mp3",
  useNinju: "assets/sfx/ninja/useninju.ogg",
  takeDart: "assets/sfx/ninja/takedart.ogg",
  shootDart: "assets/sfx/ninja/shootdart.ogg",
  statusEnergyUp1: "assets/sfx/ninja/status/energy_up_1.ogg",
  statusEnergyUp2: "assets/sfx/ninja/status/energy_up_2.ogg",
  fireToadChid: "assets/nindou_fire_toad/sounds/316.mp3",
  gameStarted: "assets/sfx/in_game/game_started.ogg",
  win: "assets/sfx/in_game/game_end/win.ogg",
  lose: "assets/sfx/in_game/game_end/lose1.ogg",
  breakDefault: "assets/sfx/break_item/1.ogg",
  breakVase: "assets/sfx/break_item/2.ogg",
  breakChest: "assets/sfx/break_item/3.ogg",
};

const images = {};
const sounds = Object.fromEntries(Object.entries(soundSources).map(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = 0.1;
  return [key, audio];
}));
[roomBgm, battleBgm].forEach((audio) => {
  audio.preload = "auto";
  audio.loop = true;
  audio.volume = 0.1;
});

const imageSources = {
  bg: "assets/map/bg.png",
  arena: "assets/map/arena-base.png",
  blueDown: "assets/ninja-blue/idleDown.png",
  blueLeft: "assets/ninja-blue/idleLeft.png",
  blueRight: "assets/ninja-blue/idleRight.png",
  blueUp: "assets/ninja-blue/idleUp.png",
  greyDown: "assets/ninja-grey/idleDown.png",
  greyLeft: "assets/ninja-grey/idleLeft.png",
  greyRight: "assets/ninja-grey/idleRight.png",
  greyUp: "assets/ninja-grey/idleUp.png",
  tree: "assets/map-objects/tree.png",
  hay: "assets/map-objects/hay.png",
  vase: "assets/map-objects/vase.png",
  barrel: "assets/map-objects/barrel.png",
  chest: "assets/map-objects/chest.png",
  flower: "assets/map-objects/flower.png",
  rock: "assets/map-objects/rock.png",
  stump: "assets/map-objects/stump.png",
  steelButton: "assets/ninju/buttons/2.png",
  moneyDartButton: "assets/ninju/money_mark/button_base/3.png",
  moneyDartHold: "assets/ninju/money_mark/projectile_candidates/images_weapon_93/taking.png",
  moneyDartDown: "assets/ninju/money_mark/projectile_candidates/images_weapon_93/goldpanD.png",
  moneyDartLeft: "assets/ninju/money_mark/projectile_candidates/images_weapon_93/goldpanL.png",
  moneyDartRight: "assets/ninju/money_mark/projectile_candidates/images_weapon_93/goldpanR.png",
  moneyDartUp: "assets/ninju/money_mark/projectile_candidates/images_weapon_93/goldpanU.png",
  blueIcon: "assets/ui/b_icon.png",
  greyIcon: "assets/ui/g_icon.png",
  blueTeam: "assets/ui/b_team.png",
  greyTeam: "assets/ui/g_team.png",
  barBackground: "assets/ui/bar/bar_background.png",
  barFrame: "assets/ui/bar/bar.png",
  barLight: "assets/ui/bar/bar_light.png",
  playerOutline: "assets/ui/playerpanel_outline.png",
  moneyPanel: "assets/ui/money_panel.png",
  itemButton: "assets/ui/item_button.png",
  ninjutsuBox: "assets/ninju/buttons/ninjutsuBox.png",
  ninjuIcon1: "assets/ninju/consumables/1.png",
  ninjuIcon2: "assets/ninju/consumables/2.png",
  ninjuIcon3: "assets/ninju/consumables/3.png",
  ninjuIcon4: "assets/ninju/consumables/4.png",
  ninjuIcon5: "assets/ninju/consumables/5.png",
  ninjuIcon6: "assets/ninju/consumables/6.png",
  backup3Item: "assets/ninju/consumables/backup__3.png",
  fireToadBlueUp: "assets/nindou_fire_toad/sprites/DefineSprite_370_Idle_Up_Toad_B/1.png",
  fireToadBlueRight: "assets/nindou_fire_toad/sprites/DefineSprite_387_Idle_Right_Toad_B/1.png",
  fireToadBlueLeft: "assets/nindou_fire_toad/sprites/DefineSprite_389_Idle_Left_Toad_B/1.png",
  fireToadBlueDown: "assets/nindou_fire_toad/sprites/DefineSprite_397_Idle_Down_Toad_B/1.png",
  fireToadGreyUp: "assets/nindou_fire_toad/sprites/DefineSprite_402_Idle_Up_Toad_G/1.png",
  fireToadGreyRight: "assets/nindou_fire_toad/sprites/DefineSprite_414_Idle_Right_Toad_G/1.png",
  fireToadGreyLeft: "assets/nindou_fire_toad/sprites/DefineSprite_416_Idle_Left_Toad_G/1.png",
  fireToadGreyDown: "assets/nindou_fire_toad/sprites/DefineSprite_423_Idle_Down_Toad_G/1.png",
  chargeOuter: "assets/charge-effect-candidates/matched-charge-ring/final-candidate/outer_moving.png",
  eyesFront: "assets/ninja-composite-parts/eyes-middle/11.png",
  eyeSide: "assets/ninja-composite-parts/eyes-look-right/11.png",
};

const defUpFrameSources = Array.from({ length: 31 }, (_, index) => `assets/ninju/status/def_up/${index + 1}.png`);
const defUpFrames = [];
const atkUpFrameSources = Array.from({ length: 31 }, (_, index) => `assets/ninju/status/atk_up/${index + 1}.png`);
const atkUpFrames = [];
const chargeRedFrameSources = Array.from({ length: 4 }, (_, index) => `assets/charge-effect-candidates/matched-charge-ring/final-candidate/inner_fire/${index + 1}.png`);
const chargeYellowFrameSources = Array.from({ length: 4 }, (_, index) => `assets/charge-effect-candidates/matched-charge-ring/final-candidate/inner_fire/${index + 5}.png`);
const chargeRedFrames = [];
const chargeYellowFrames = [];
const respawnPointerFrameSources = Array.from({ length: 32 }, (_, index) => `assets/respawn-pointer-candidates/ninja_back_pointer/${index + 1}.png`);
const respawnPointerFrames = [];
const dragArrowFrameSources = {
  right: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer-candidates/ninja_arrow_0/${index + 1}.png`),
  left: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer-candidates/ninja_arrow_1/${index + 1}.png`),
  up: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer-candidates/ninja_arrow_2/${index + 1}.png`),
  down: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer-candidates/ninja_arrow_3/${index + 1}.png`),
};
const dragArrowFrames = { right: [], left: [], up: [], down: [] };

const moneyDartReadyFrameSources = Array.from({ length: 10 }, (_, index) => `assets/ninju/money_mark/projectile_candidates/images_ninja_dart/${index + 1}.png`);
const moneyDartReadyFrames = [];
const moneyDartShootFrameSources = {
  right: Array.from({ length: 7 }, (_, index) => `assets/ninju/money_mark/shoot_dart_exact/b_shoot_dart_0/${String(index + 1).padStart(2, "0")}_${index + 1}.png`),
  left: Array.from({ length: 7 }, (_, index) => `assets/ninju/money_mark/shoot_dart_exact/b_shoot_dart_1/${String(index + 1).padStart(2, "0")}_${index + 1}.png`),
  down: Array.from({ length: 7 }, (_, index) => `assets/ninju/money_mark/shoot_dart_exact/b_shoot_dart_3/${String(index + 1).padStart(2, "0")}_${index + 1}.png`),
  up: Array.from({ length: 7 }, (_, index) => `assets/ninju/money_mark/shoot_dart_exact/b_shoot_dart_2/${String(index + 1).padStart(2, "0")}_${index + 1}.png`),
};
const moneyDartShootFrames = { right: [], left: [], down: [], up: [] };
const ougiLockFrameSources = Array.from({ length: 8 }, (_, index) => `assets/status/ougi_lock/${index + 1}.png`);
const ougiLockFrames = [];
const deathSkullFrameSources = Array.from({ length: 30 }, (_, index) => `assets/effects/death_skull/${index + 1}.png`);
const deathSkullFrames = [];
const deathSkullAnimationMs = 1050;
const matchEndPromptMs = 4000;
const matchEndFrameSources = {
  blue: {
    win: Array.from({ length: 14 }, (_, index) => `assets/ui/match_end/win_blue/${index + 1}.png`),
    loss: Array.from({ length: 4 }, (_, index) => `assets/ui/match_end/loss_blue/${index + 1}.png`),
  },
  grey: {
    win: Array.from({ length: 14 }, (_, index) => `assets/ui/match_end/win_grey/${index + 1}.png`),
    loss: Array.from({ length: 4 }, (_, index) => `assets/ui/match_end/loss_grey/${index + 1}.png`),
  },
};
const matchEndFrames = {
  blue: { win: [], loss: [] },
  grey: { win: [], loss: [] },
};
const fireToadDirections = ["up", "right", "left", "down"];
const fireToadTeams = ["blue", "grey"];
const fireToadExportDirs = {
  blue: {
    up: { arrive: "DefineSprite_1362_Arrive_Up_Toad_B", setoff: "DefineSprite_1403_SetOff_Up_Toad_B" },
    right: { arrive: "DefineSprite_1361_Arrive_Right_Toad_B", setoff: "DefineSprite_1407_SetOff_Right_Toad_B" },
    left: { arrive: "DefineSprite_1360_Arrive_Left_Toad_B", setoff: "DefineSprite_1405_SetOff_Left_Toad_B" },
    down: { arrive: "DefineSprite_1363_Arrive_Down_Toad_B", setoff: "DefineSprite_1409_SetOff_Down_Toad_B" },
  },
  grey: {
    up: { arrive: "DefineSprite_433_Arrive_Up_Toad_G", setoff: "DefineSprite_1402_SetOff_Up_Toad_G" },
    right: { arrive: "DefineSprite_430_Arrive_Right_Toad_G", setoff: "DefineSprite_1406_SetOff_Right_Toad_G" },
    left: { arrive: "DefineSprite_429_Arrive_Left_Toad_G", setoff: "DefineSprite_1404_SetOff_Left_Toad_G" },
    down: { arrive: "DefineSprite_432_Arrive_Down_Toad_G", setoff: "DefineSprite_1408_SetOff_Down_Toad_G" },
  },
};
const fireToadFrameSources = Object.fromEntries(fireToadTeams.map((team) => [team, Object.fromEntries(fireToadDirections.map((direction) => [
  direction,
  {
    arrive: Array.from({ length: 8 }, (_, index) => `assets/nindou_fire_toad/sprites/${fireToadExportDirs[team][direction].arrive}/${index + 1}.png`),
    setoff: Array.from({ length: 3 }, (_, index) => `assets/nindou_fire_toad/sprites/${fireToadExportDirs[team][direction].setoff}/${index + 1}.png`),
  },
]))]));
const fireToadFrames = Object.fromEntries(fireToadTeams.map((team) => [team, Object.fromEntries(fireToadDirections.map((direction) => [
  direction,
  { arrive: [], setoff: [] },
]))]));

