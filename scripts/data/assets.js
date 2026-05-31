// Asset paths and frame buffers. Loading still happens in game.js for now.
const roomBgm = new Audio("assets/audio/lobby.mp3");
const battleBgm = new Audio("assets/audio/bgm.mp3");
const yashaoBattleBgm = new Audio("assets/audio/jugodechina.mp4");

const soundSources = {
  move: "assets/sfx/ninja/normalmove.ogg",
  runOver: "assets/sfx/ninja/run_over/3.ogg",
  respawn: "assets/sfx/ninja/respawn_tips_1.ogg",
  weaponDamaged: "assets/sfx/ninja/weapon_damaged.ogg",
  death: "assets/sfx/ninja/death/1.ogg",
  slash: "assets/sfx/weapon/1.ogg",
  muramasaSlash: "assets/sfx/weapon/muramasa.mp3",
  weapon2Slash: "assets/sfx/weapon/2.ogg",
  weapon5Slash: "assets/sfx/weapon/5.ogg",
  weapon6Slash: "assets/sfx/weapon/6.ogg",
  weapon7Slash: "assets/sfx/weapon/7.ogg",
  weapon8Slash: "assets/sfx/weapon/8.ogg",
  weapon9Slash: "assets/sfx/weapon/9.ogg",
  weapon10Slash: "assets/sfx/weapon/10.ogg",
  weapon11Slash: "assets/sfx/weapon/11.ogg",
  weapon12Slash: "assets/sfx/weapon/12.ogg",
  weapon13Slash: "assets/sfx/weapon/13.ogg",
  weapon14Slash: "assets/sfx/weapon/14.ogg",
  weapon14Ougi: "assets/sfx/ougi/weapon14.wav",
  weapon15Slash: "assets/sfx/weapon/15.ogg",
  weapon16Slash: "assets/sfx/weapon/16.ogg",
  weapon17Slash: "assets/sfx/weapon/17.ogg",
  weapon18Slash: "assets/sfx/weapon/18.ogg",
  weapon1Ougi: "assets/sfx/ougi/weapon1.wav",
  weapon5Ougi: "assets/sfx/ougi/weapon5.wav",
  weapon6Ougi: "assets/sfx/ougi/weapon6.wav",
  weapon7Ougi: "assets/sfx/ougi/weapon7.wav",
  weapon8Ougi: "assets/sfx/ougi/weapon8.wav",
  weapon10Ougi: "assets/sfx/ougi/weapon10.wav",
  weapon10OugiEnd: "assets/sfx/ougi/weapon10_end.wav",
  weapon11Ougi: "assets/sfx/ougi/weapon11.wav",
  weapon12Ougi: "assets/sfx/ougi/weapon12.wav",
  weapon13Ougi: "assets/sfx/ougi/weapon13.wav",
  weapon15Ougi: "assets/sfx/ougi/weapon15.wav",
  weapon16Ougi: "assets/sfx/ougi/weapon16.wav",
  weapon20Slash: "assets/sfx/weapon/weapon20.mp3",
  weapon19Ougi1: "assets/sfx/ougi/weapon19_ougi1.mp3",
  weapon19Ougi2: "assets/sfx/ougi/weapon19_ougi2.mp3",
  weapon19Ougi3: "assets/sfx/ougi/weapon19_ougi3.mp3",
  weapon19Ougi1Chid4: "assets/sfx/ougi/weapon19_1_all/4.mp3",
  weapon19Ougi1Chid20: "assets/sfx/ougi/weapon19_1_all/20.mp3",
  weapon19Ougi1Chid25: "assets/sfx/ougi/weapon19_1_all/25.mp3",
  weapon19Ougi1Chid33: "assets/sfx/ougi/weapon19_1_all/33.mp3",
  weapon19Ougi1Chid40: "assets/sfx/ougi/weapon19_1_all/40.mp3",
  weapon19Ougi1Chid45: "assets/sfx/ougi/weapon19_1_all/45.mp3",
  weapon19Ougi1Chid56: "assets/sfx/ougi/weapon19_1_all/56.mp3",
  weapon19Ougi1Chid72: "assets/sfx/ougi/weapon19_1_all/72.mp3",
  weapon19Ougi1Chid74: "assets/sfx/ougi/weapon19_1_all/74.mp3",
  weapon19Ougi1Chid75: "assets/sfx/ougi/weapon19_1_all/75.mp3",
  weapon19Ougi1Chid85: "assets/sfx/ougi/weapon19_1_all/85.mp3",
  weapon19Ougi1Chid93: "assets/sfx/ougi/weapon19_1_all/93.mp3",
  weapon19Ougi1Chid94: "assets/sfx/ougi/weapon19_1_all/94.mp3",
  weapon19Ougi1Chid113: "assets/sfx/ougi/weapon19_1_all/113.mp3",
  weapon19Ougi1Chid119: "assets/sfx/ougi/weapon19_1_all/119.mp3",
  weapon19Ougi1Chid975: "assets/sfx/ougi/weapon19_1_all/975.mp3",
  weapon20Ougi1: "assets/sfx/ougi/weapon20_ougi1.mp3",
  weapon20Ougi2: "assets/sfx/ougi/weapon20_ougi2.mp3",
  weapon20Ougi3: "assets/sfx/ougi/weapon20_ougi3.mp3",
  yashaoRunOver: "assets/yashao/sounds/1_SFX_Bot_RunOver_yashao2.mp3",
  yashaoKilled: "assets/yashao/sounds/2_SFX_Bot_Killed_yashao2.mp3",
  sevenNinju: "assets/ninju/special_exports/sounds/919.mp3",
  angelNinju: "assets/ninju/special_exports/sounds/1052.mp3",
  deathNinju: "assets/ninju/special_exports/sounds/1102.mp3",
  butsumetsuNinju: "assets/ninju/special_exports/sounds/1100.mp3",
  mouryoNinju: "assets/ninju/special_exports/sounds/1002.mp3",
  useNinju: "assets/sfx/ninja/useninju.ogg",
  takeDart: "assets/sfx/ninja/takedart.ogg",
  shootDart: "assets/sfx/ninja/shootdart.ogg",
  statusEnergyUp1: "assets/sfx/ninja/status/energy_up_1.ogg",
  statusEnergyUp2: "assets/sfx/ninja/status/energy_up_2.ogg",
  regenHpSmall: "assets/sounds/ninja/status/regen_hp_s.ogg",
  regenHpLarge: "assets/sounds/ninja/status/regen_hp_l.ogg",
  summonSmall: "assets/sounds/ninja/status/summon/summon_small.ogg",
  smallThunder: "assets/sounds/ninja/status/damaged/small_thunder.ogg",
  smallFire: "assets/sounds/ninja/status/damaged/small_fire.ogg",
  smallIceHit: "assets/sounds/ninja/status/damaged/small_ice_hit.ogg",
  fireToadChid: "assets/nindou_fire_toad/sounds/316.mp3",
  gameStarted: "assets/sfx/in_game/game_started.ogg",
  soulLevelUp: "assets/sounds/in_game/soul/1.ogg",
  soulMax: "assets/sounds/in_game/soul/3.ogg",
  win: "assets/sfx/in_game/game_end/win.ogg",
  lose: "assets/sfx/in_game/game_end/lose1.ogg",
  breakDefault: "assets/sfx/break_item/1.ogg",
  breakVase: "assets/sfx/break_item/2.ogg",
  breakChest: "assets/sfx/break_item/3.ogg",
};

[
  ["weapon20Ougi1Chid", "assets/sfx/ougi/weapon20_1_all", [309, 314, 434, 447, 448, 494, 495, 496, 497, 498, 513, 514]],
  ["weapon20Ougi2Chid", "assets/sfx/ougi/weapon20_2_all", [309, 314, 446, 459, 460, 516, 517, 518, 519, 520, 525, 526, 551, 552, 553, 559, 565, 566]],
  ["weapon20Ougi3Chid", "assets/sfx/ougi/weapon20_3_all", [309, 314, 451, 467, 514, 515, 516, 517, 518, 519, 520, 523, 531, 537, 538, 545]],
].forEach(([prefix, folder, ids]) => {
  ids.forEach((id) => {
    soundSources[`${prefix}${id}`] = `${folder}/${id}.mp3`;
  });
});

const ougiPerTierSoundBanks = {
  weapon1Ougi1Chid: [
    "assets/sfx/ougi/weapon1_1_all",
    [
      114,
      129,
      130,
      137,
      139
    ]
  ],
  weapon1Ougi2Chid: [
    "assets/sfx/ougi/weapon1_2_all",
    [
      133,
      144,
      145,
      155,
      164,
      166
    ]
  ],
  weapon1Ougi3Chid: [
    "assets/sfx/ougi/weapon1_3_all",
    [
      170,
      181,
      186,
      187,
      188,
      189,
      190,
      199
    ]
  ],
  weapon5Ougi1Chid: [
    "assets/sfx/ougi/weapon5_1_all",
    [
      83,
      94,
      95,
      110,
      114
    ]
  ],
  weapon5Ougi2Chid: [
    "assets/sfx/ougi/weapon5_2_all",
    [
      93,
      104,
      109,
      113,
      114,
      122,
      126
    ]
  ],
  weapon5Ougi3Chid: [
    "assets/sfx/ougi/weapon5_3_all",
    [
      114,
      125,
      134,
      139,
      143,
      144,
      145,
      146,
      154,
      158
    ]
  ],
  weapon6Ougi1Chid: [
    "assets/sfx/ougi/weapon6_1_all",
    [
      316,
      362,
      373,
      378,
      387,
      391
    ]
  ],
  weapon6Ougi2Chid: [
    "assets/sfx/ougi/weapon6_2_all",
    [
      316,
      359,
      383,
      384,
      385,
      389
    ]
  ],
  weapon6Ougi3Chid: [
    "assets/sfx/ougi/weapon6_3_all",
    [
      316,
      380,
      391,
      405,
      406,
      411,
      415
    ]
  ],
  weapon7Ougi1Chid: [
    "assets/sfx/ougi/weapon7_1_all",
    [
      180,
      227,
      244,
      255,
      259
    ]
  ],
  weapon7Ougi2Chid: [
    "assets/sfx/ougi/weapon7_2_all",
    [
      180,
      235,
      252,
      261,
      267,
      271
    ]
  ],
  weapon7Ougi3Chid: [
    "assets/sfx/ougi/weapon7_3_all",
    [
      180,
      264,
      284,
      291,
      304,
      305,
      309,
      313
    ]
  ],
  weapon8Ougi1Chid: [
    "assets/sfx/ougi/weapon8_1_all",
    [
      229,
      267,
      283,
      287
    ]
  ],
  weapon8Ougi2Chid: [
    "assets/sfx/ougi/weapon8_2_all",
    [
      229,
      279,
      299,
      304,
      308
    ]
  ],
  weapon8Ougi3Chid: [
    "assets/sfx/ougi/weapon8_3_all",
    [
      229,
      294,
      311,
      316,
      317,
      327,
      331
    ]
  ],
  weapon10Ougi1Chid: [
    "assets/sfx/ougi/weapon10_1_all",
    [
      526,
      599,
      610,
      611,
      635,
      636,
      637,
      660,
      661,
      665
    ]
  ],
  weapon10Ougi2Chid: [
    "assets/sfx/ougi/weapon10_2_all",
    [
      526,
      612,
      623,
      639,
      640,
      641,
      642,
      645,
      646,
      647,
      670,
      671,
      675
    ]
  ],
  weapon10Ougi3Chid: [
    "assets/sfx/ougi/weapon10_3_all",
    [
      526,
      661,
      672,
      688,
      689,
      690,
      691,
      697,
      698,
      699,
      700,
      701,
      705,
      706,
      710
    ]
  ],
  weapon11Ougi1Chid: [
    "assets/sfx/ougi/weapon11_1_all",
    [
      204,
      205,
      238,
      249,
      250,
      255,
      256,
      260,
      264
    ]
  ],
  weapon11Ougi2Chid: [
    "assets/sfx/ougi/weapon11_2_all",
    [
      204,
      205,
      245,
      256,
      265,
      269,
      275,
      283,
      284,
      286,
      299
    ]
  ],
  weapon11Ougi3Chid: [
    "assets/sfx/ougi/weapon11_3_all",
    [
      204,
      205,
      267,
      278,
      287,
      288,
      293,
      294,
      295,
      299,
      301,
      312,
      331,
      338
    ]
  ],
  weapon12Ougi1Chid: [
    "assets/sfx/ougi/weapon12_1_all",
    [
      305,
      369,
      380,
      382,
      394,
      398,
      405
    ]
  ],
  weapon12Ougi2Chid: [
    "assets/sfx/ougi/weapon12_2_all",
    [
      305,
      388,
      403,
      419,
      420,
      421,
      423,
      438
    ]
  ],
  weapon12Ougi3Chid: [
    "assets/sfx/ougi/weapon12_3_all",
    [
      305,
      354,
      365,
      370,
      378,
      382,
      383,
      384,
      385
    ]
  ],
  weapon13Ougi1Chid: [
    "assets/sfx/ougi/weapon13_1_all",
    [
      204,
      214,
      288,
      299,
      315,
      320,
      327,
      331,
      332,
      333,
      335,
      336,
      340,
      351
    ]
  ],
  weapon13Ougi2Chid: [
    "assets/sfx/ougi/weapon13_2_all",
    [
      204,
      214,
      279,
      305,
      306,
      311,
      322,
      323,
      324,
      325,
      326,
      330,
      341
    ]
  ],
  weapon13Ougi3Chid: [
    "assets/sfx/ougi/weapon13_3_all",
    [
      204,
      214,
      299,
      325,
      326,
      331,
      342,
      343,
      344,
      345,
      346,
      350,
      361
    ]
  ],
  weapon14Ougi1Chid: [
    "assets/sfx/ougi/weapon14_1_all",
    [
      222,
      223,
      291,
      306,
      307,
      333,
      339
    ]
  ],
  weapon14Ougi2Chid: [
    "assets/sfx/ougi/weapon14_2_all",
    [
      222,
      223,
      267,
      288,
      289,
      295,
      301,
      302
    ]
  ],
  weapon14Ougi3Chid: [
    "assets/sfx/ougi/weapon14_3_all",
    [
      222,
      223,
      334,
      349,
      350,
      351,
      366,
      372,
      381,
      382
    ]
  ],
  weapon15Ougi1Chid: [
    "assets/sfx/ougi/weapon15_1_all",
    [
      188,
      234,
      245,
      265,
      274,
      282,
      283
    ]
  ],
  weapon15Ougi2Chid: [
    "assets/sfx/ougi/weapon15_2_all",
    [
      188,
      234,
      257,
      296,
      305,
      313,
      314
    ]
  ],
  weapon15Ougi3Chid: [
    "assets/sfx/ougi/weapon15_3_all",
    [
      188,
      235,
      254,
      293,
      298,
      303,
      304,
      312,
      320,
      321
    ]
  ],
  weapon16Ougi1Chid: [
    "assets/sfx/ougi/weapon16_1_all",
    [
      12,
      238,
      253,
      258,
      259,
      279,
      292,
      293
    ]
  ],
  weapon16Ougi2Chid: [
    "assets/sfx/ougi/weapon16_2_all",
    [
      12,
      234,
      249,
      254,
      255,
      287,
      288
    ]
  ],
  weapon16Ougi3Chid: [
    "assets/sfx/ougi/weapon16_3_all",
    [
      12,
      249,
      264,
      265,
      285,
      294,
      295,
      312,
      313
    ]
  ],
  weapon19Ougi1Chid: [
    "assets/sfx/ougi/weapon19_1_all",
    [
      4,
      20,
      25,
      33,
      40,
      45,
      56,
      72,
      74,
      75,
      85,
      93,
      94,
      113,
      119,
      975
    ]
  ],
  weapon19Ougi2Chid: [
    "assets/sfx/ougi/weapon19_2_all",
    [
      4,
      20,
      25,
      33,
      40,
      45,
      56,
      72,
      74,
      75,
      85,
      93,
      94,
      113,
      119,
      975,
      1088
    ]
  ],
  weapon19Ougi3Chid: [
    "assets/sfx/ougi/weapon19_3_all",
    [
      4,
      20,
      25,
      33,
      40,
      45,
      56,
      72,
      74,
      75,
      85,
      93,
      94,
      113,
      119,
      975
    ]
  ]
};
Object.entries(ougiPerTierSoundBanks).forEach(([prefix, [folder, ids]]) => {
  ids.forEach((id) => {
    soundSources[`${prefix}${id}`] = `${folder}/${id}.mp3`;
  });
});

const images = {};
const sounds = Object.fromEntries(Object.entries(soundSources).map(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = 0.1;
  return [key, audio];
}));
[roomBgm, battleBgm, yashaoBattleBgm].forEach((audio) => {
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
  seigaihaOugi2Phantom: "assets/ougi/weapon20/2/phantom/1.png",
  tree: "assets/map-objects/tree.png",
  hay: "assets/map-objects/hay.png",
  vase: "assets/map-objects/vase.png",
  barrel: "assets/map-objects/barrel.png",
  chest: "assets/map-objects/chest.png",
  flower: "assets/map-objects/flower.png",
  rock: "assets/map-objects/rock.png",
  stump: "assets/map-objects/stump.png",
  flashButton: "assets/ninju/buttons/1.png",
  steelButton: "assets/ninju/buttons/2.png",
  healButton: "assets/ninju/buttons/4.png",
  moneyDartButton: "assets/ninju/money_mark/button_base/3.png",
  moneyDartHold: "assets/ninju/money_mark/projectiles/images_weapon_93/taking.png",
  moneyDartDown: "assets/ninju/money_mark/projectiles/images_weapon_93/goldpanD.png",
  moneyDartLeft: "assets/ninju/money_mark/projectiles/images_weapon_93/goldpanL.png",
  moneyDartRight: "assets/ninju/money_mark/projectiles/images_weapon_93/goldpanR.png",
  moneyDartUp: "assets/ninju/money_mark/projectiles/images_weapon_93/goldpanU.png",
  blueIcon: "assets/ui/b_icon.png",
  greyIcon: "assets/ui/g_icon.png",
  blueTeam: "assets/ui/b_team.png",
  greyTeam: "assets/ui/g_team.png",
  soulHud1: "assets/ui/soul/1.png",
  soulHud2: "assets/ui/soul/2.png",
  soulHud3: "assets/ui/soul/3.png",
  soulHud4: "assets/ui/soul/4.png",
  soulHud5: "assets/ui/soul/5.png",
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
  chargeOuter: "assets/charge-effect/outer_moving.png",
  eyesFront: "assets/ninja-composite-parts/eyes-middle/11.png",
  eyeSide: "assets/ninja-composite-parts/eyes-look-right/11.png",
};

const defUpFrameSources = Array.from({ length: 31 }, (_, index) => `assets/ninju/status/def_up/${index + 1}.png`);
const defUpFrames = [];
const atkUpFrameSources = Array.from({ length: 31 }, (_, index) => `assets/ninju/status/atk_up/${index + 1}.png`);
const atkUpFrames = [];
const regenHpSmallFrameSources = Array.from({ length: 23 }, (_, index) => `assets/ninju/status/regen_hp_s/${String(index + 1).padStart(2, "0")}.png`);
const regenHpSmallFrames = [];
const regenHpLargeFrameSources = Array.from({ length: 24 }, (_, index) => `assets/ninju/status/regen_hp_l/${String(index + 1).padStart(2, "0")}.png`);
const regenHpLargeFrames = [];
const smallThunderSummonFrameSources = Array.from({ length: 25 }, (_, index) => `assets/ninju/status/summon/small_thunder/${index + 1}.png`);
const smallThunderSummonFrames = [];
const smallThunderDamagedFrameSources = Array.from({ length: 36 }, (_, index) => `assets/ninju/status/damaged/small_thunder/${index + 1}.png`);
const smallThunderDamagedFrames = [];
const smallFireSummonFrameSources = Array.from({ length: 23 }, (_, index) => `assets/ninju/status/summon/small_fire/${String(index + 1).padStart(2, "0")}.png`);
const smallFireSummonFrames = [];
const smallFireDamagedFrameSources = Array.from({ length: 43 }, (_, index) => `assets/ninju/status/small_fire/${index + 1}.png`);
const smallFireDamagedFrames = [];
const smallIceSummonFrameSources = Array.from({ length: 23 }, (_, index) => `assets/ninju/status/summon/small_ice/${String(index + 1).padStart(2, "0")}.png`);
const smallIceSummonFrames = [];
const smallIceDamagedFrameSources = Array.from({ length: 40 }, (_, index) => `assets/ninju/status/small_ice/${index + 1}.png`);
const smallIceDamagedFrames = [];
const smallIceBreakFrameSources = Array.from({ length: 2 }, (_, index) => `assets/ninju/status/small_ice/${41 + index}.png`);
const smallIceBreakFrames = [];
const damageFailFrameSources = Array.from({ length: 10 }, (_, index) => `assets/ninju/status/damage_fail/${index + 1}.png`);
const damageFailFrames = [];
const faintedFrameSources = Array.from({ length: 34 }, (_, index) => `assets/ninju/status/fainted/${index + 1}.png`);
const faintedFrames = [];
const damageSuccessSmallFrameSources = Array.from({ length: 10 }, (_, index) => `assets/ninju/status/damage_success/small/Symbol ${3090001 + index}.png`);
const damageSuccessSmallFrames = [];
const damageSuccessMiddleFrameSources = Array.from({ length: 10 }, (_, index) => `assets/ninju/status/damage_success/middle/Symbol ${3090001 + index}.png`);
const damageSuccessMiddleFrames = [];
const attackNinjuConfigs = {
  lightning: {
    label: "Lightning",
    unlockName: "Lightning",
    damage: 45,
    summonFrames: smallThunderSummonFrames,
    hitFrames: smallThunderDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallThunder",
  },
  fireBall: {
    label: "FireBall",
    unlockName: "FireBall",
    damage: 55,
    summonFrames: smallFireSummonFrames,
    hitFrames: smallFireDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallFire",
  },
  airBlast: {
    label: "AirBlast",
    unlockName: "AirBlast",
    damage: 65,
    summonFrames: smallThunderSummonFrames,
    hitFrames: smallThunderDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallThunder",
  },
  explode: {
    label: "Explode",
    unlockName: "Explode",
    damage: 75,
    summonFrames: smallFireSummonFrames,
    hitFrames: smallFireDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallFire",
  },
  freeze: {
    label: "Freeze",
    unlockName: "Freeze",
    damage: 85,
    summonFrames: smallIceSummonFrames,
    hitFrames: smallIceDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallIceHit",
    holdHitLastFrame: true,
    breakEffect: "freezeBreak",
    hitBodyEffect: null,
  },
  thunderbolt: {
    label: "Thunderbolt",
    unlockName: "Thunderbolt",
    damage: 95,
    summonFrames: smallThunderSummonFrames,
    hitFrames: smallThunderDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallThunder",
  },
  storm: {
    label: "Storm",
    unlockName: "Storm",
    damage: 110,
    summonFrames: smallThunderSummonFrames,
    hitFrames: smallThunderDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallThunder",
  },
  iceArrow: {
    label: "IceArrow",
    unlockName: "IceArrow",
    damage: 125,
    summonFrames: smallIceSummonFrames,
    hitFrames: smallIceDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallIceHit",
    holdHitLastFrame: true,
    breakEffect: "freezeBreak",
    hitBodyEffect: null,
  },
  flash: {
    label: "Flash",
    unlockName: "Lightning",
    damage: 45,
    rule: "flashRule",
    summonFrames: smallThunderSummonFrames,
    hitFrames: smallThunderDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallThunder",
  },
  wildfire: {
    label: "Wildfire",
    unlockName: "FireBall",
    damage: 55,
    rule: "wildfireRule",
    summonFrames: smallFireSummonFrames,
    hitFrames: smallFireDamagedFrames,
    castSound: "summonSmall",
    hitSound: "smallFire",
    outcomes: [
      { chance: 0.3, damage: 50, headEffect: "flashHitHead" },
      { chance: 0.2, damage: 100, headEffect: "wildfireMiddleHitHead" },
    ],
  },
};
const specialNinjuConfigs = {
  seven: { label: "Seven", frameDir: "DefineSprite_946_Seven", frameCount: 43, soundKey: "sevenNinju", damage: 130, duration: 1720, castSize: 150, effectSize: 150, hitEffectSize: 130 },
  angel: { label: "Angel", frameDir: "DefineSprite_1049_Angel", frameCount: 43, soundKey: "angelNinju", damage: 100, heal: 90, duration: 1720, castSize: 150, effectSize: 150, hitEffectSize: 130 },
  death: { label: "Death", frameDir: "DefineSprite_1070_Death", frameCount: 43, hitFrameDir: "DefineSprite_599_Dmg_Death", hitFrameCount: 45, soundKey: "deathNinju", damage: 9999, instantKillChance: 0.5, duration: 1720, castSize: 150, effectSize: 150, hitEffectSize: 130 },
  butsumetsu: { label: "Butsu", frameDir: "DefineSprite_907_Suicide", frameCount: 46, soundKey: "butsumetsuNinju", damage: 9999, duration: 1840, castSize: 220, effectSize: 220, hitEffectSize: 170, radius: 2, killsCaster: true },
  mouryo: { label: "Mouryo", frameDir: "DefineSprite_1067_Mouryou", frameCount: 43, hitFrameDir: "DefineSprite_580_Dmg_Mouryou", hitFrameCount: 45, soundKey: "mouryoNinju", damage: 145, duration: 1720, castSize: 150, effectSize: 150, hitEffectSize: 130 },
};
const specialNinjuFrameSources = Object.fromEntries(Object.entries(specialNinjuConfigs).map(([type, config]) => [
  type,
  Array.from({ length: config.frameCount }, (_, index) => `assets/ninju/special_exports/sprites/${config.frameDir}/${index + 1}.png`),
]));
const specialNinjuHitFrameSources = Object.fromEntries(Object.entries(specialNinjuConfigs).map(([type, config]) => [
  type,
  config.hitFrameDir ? Array.from({ length: config.hitFrameCount }, (_, index) => `assets/ninju/special_exports/sprites/${config.hitFrameDir}/${index + 1}.png`) : [],
]));
const specialNinjuFrames = Object.fromEntries(Object.keys(specialNinjuConfigs).map((type) => [type, []]));
const specialNinjuHitFrames = Object.fromEntries(Object.keys(specialNinjuConfigs).map((type) => [type, []]));
const chargeRedFrameSources = Array.from({ length: 4 }, (_, index) => `assets/charge-effect/inner_fire/${index + 1}.png`);
const chargeYellowFrameSources = Array.from({ length: 4 }, (_, index) => `assets/charge-effect/inner_fire/${index + 5}.png`);
const chargeRedFrames = [];
const chargeYellowFrames = [];
const respawnPointerFrameSources = Array.from({ length: 32 }, (_, index) => `assets/respawn-pointer/ninja_back_pointer/${index + 1}.png`);
const respawnPointerFrames = [];
const dragArrowFrameSources = {
  right: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer/ninja_arrow_0/${index + 1}.png`),
  left: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer/ninja_arrow_1/${index + 1}.png`),
  up: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer/ninja_arrow_2/${index + 1}.png`),
  down: Array.from({ length: 6 }, (_, index) => `assets/respawn-pointer/ninja_arrow_3/${index + 1}.png`),
};
const dragArrowFrames = { right: [], left: [], up: [], down: [] };
const useNinjuFrameSources = {
  blue: Array.from({ length: 12 }, (_, index) => `assets/runtime/jutsus/sprites/DefineSprite_1548_ShowFingers_B/${index + 1}.png`),
  grey: Array.from({ length: 12 }, (_, index) => `assets/runtime/jutsus/sprites/DefineSprite_1546_ShowFingers_G/${index + 1}.png`),
};
const useNinjuFrames = { blue: [], grey: [] };

const moneyDartReadyFrameSources = Array.from({ length: 10 }, (_, index) => `assets/ninju/money_mark/projectiles/images_ninja_dart/${index + 1}.png`);
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
const deathFallFrameSources = {};
const deathFallFrames = {};
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
const yashaoFrameSources = {
  idle: {
    up: ["assets/yashao/sprites/DefineSprite_242_Idle_Up_yashao2/1.png"],
    right: ["assets/yashao/sprites/DefineSprite_245_Idle_Right_yashao2/1.png"],
    left: ["assets/yashao/sprites/DefineSprite_248_Idle_Left_yashao2/1.png"],
    down: ["assets/yashao/sprites/DefineSprite_250_Idle_Down_yashao2/1.png"],
  },
  arrive: {
    up: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_34_Arrive_Up_yashao2/${index + 1}.png`),
    right: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_62_Arrive_Right_yashao2/${index + 1}.png`),
    left: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_74_Arrive_Left_yashao2/${index + 1}.png`),
    down: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_89_Arrive_Down_yashao2/${index + 1}.png`),
  },
  weapon: {
    up: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_315_W_950_Up_yashao2/${index + 1}.png`),
    right: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_332_W_950_Right_yashao2/${index + 1}.png`),
    left: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_349_W_950_Left_yashao2/${index + 1}.png`),
    down: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_361_W_950_Down_yashao2/${index + 1}.png`),
  },
  weaponFx: {
    up: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_310_W_950_Up_FX_yashao2/${index + 1}.png`),
    right: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_316_W_950_Right_FX_yashao2/${index + 1}.png`),
    left: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_333_W_950_Left_FX_yashao2/${index + 1}.png`),
    down: Array.from({ length: 8 }, (_, index) => `assets/yashao/sprites/DefineSprite_350_W_950_Down_FX_yashao2/${index + 1}.png`),
  },
  ougi: {
    1: Array.from({ length: 76 }, (_, index) => `assets/yashao/sprites/DefineSprite_241_Ougi_950_1_X_yashao2/${index + 1}.png`),
    2: Array.from({ length: 104 }, (_, index) => `assets/yashao/sprites/DefineSprite_224_Ougi_950_2_X_yashao2/${index + 1}.png`),
    3: Array.from({ length: 97 }, (_, index) => `assets/yashao/sprites/DefineSprite_185_Ougi_950_3_X_yashao2/${index + 1}.png`),
  },
  ougiFx: {
    1: Array.from({ length: 76 }, (_, index) => `assets/yashao/sprites/DefineSprite_238_Ougi_950_1_X_fx/${index + 1}.png`),
    2: Array.from({ length: 104 }, (_, index) => `assets/yashao/sprites/DefineSprite_221_Ougi_950_2_X_fx/${index + 1}.png`),
    3: Array.from({ length: 97 }, (_, index) => `assets/yashao/sprites/DefineSprite_154_Ougi_950_3_X_fx/${index + 1}.png`),
  },
  enter: Array.from({ length: 17 }, (_, index) => `assets/yashao/sprites/DefineSprite_290_Enter_yashao2/${index + 1}.png`),
  showFingers: Array.from({ length: 26 }, (_, index) => `assets/yashao/sprites/DefineSprite_269_ShowFingers_yashao2/${index + 1}.png`),
  faint: ["assets/yashao/sprites/DefineSprite_270_Faint_yashao2/1.png"],
};
const yashaoFrames = {
  idle: { up: [], right: [], left: [], down: [] },
  arrive: { up: [], right: [], left: [], down: [] },
  weapon: { up: [], right: [], left: [], down: [] },
  weaponFx: { up: [], right: [], left: [], down: [] },
  ougi: { 1: [], 2: [], 3: [] },
  ougiFx: { 1: [], 2: [], 3: [] },
  enter: [],
  showFingers: [],
  faint: [],
};

