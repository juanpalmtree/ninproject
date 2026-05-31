// ===== Match Flow =====
// Checks whether either team is eliminated and queues the result.
function checkVictory() {
  if (state.result || state.pendingResult) return;
  const blueLeft = state.units.some((u) => u.team === "blue" && (u.alive || u.respawning));
  const greyLeft = state.units.some((u) => u.team === "grey" && (u.alive || u.respawning));
  if (!blueLeft) {
    queueMatchFinish("grey");
  } else if (!greyLeft) {
    queueMatchFinish("blue");
  }
}

// Handles lethal damage, starts the skull animation, then checks battle end.
function defeatUnit(unit, attacker = null) {
  if (!unit || unit.defeated) return;
  unit.defeated = true;
  unit.hp = 0;
  const p = unitPosition(unit);
  unit.deathX = p.x;
  unit.deathY = p.y;
  unit.alive = false;
  unit.respawning = false;
  unit.moneyDart = null;
  if (isFireToadActive(unit) || isFireToadTransforming(unit)) endFireToad(unit);
  unit.ougiCastUntil = 0;
  unit.ougiCcUntil = 0;
  unit.ougiInvincibleAt = 0;
  unit.ougiInvincibleUntil = 0;
  unit.ninjuLockedUntil = 0;
  gainSoul(unit, soulDeathGainSteps);
  if (attacker && attacker !== unit) attacker.kills += 1;
  cancelDragIfPressed(unit);
  startDeathAnimation(unit, p);
  playSound(unit.isYashao ? "yashaoKilled" : "death");
  setMessage(`${unit.name} defeated.`);
  checkVictory();
}

function startDeathAnimation(unit, p) {
  if (!state.deathAnimations) state.deathAnimations = [];
  state.deathAnimations.push({
    unitId: unit.id,
    team: unit.team,
    x: p.x,
    y: p.y,
    facing: unit.facing || "down",
    eyeStyle: unit.eyeStyle,
    startedAt: performance.now(),
    duration: deathSkullAnimationMs,
  });
}

function queueMatchFinish(winner) {
  const now = performance.now();
  state.pendingResult = {
    winner,
    finishAt: Math.max(now + deathSkullAnimationMs, activeDeathAnimationFinishAt(now), activeOugiFinishAt(now)),
  };
  clearDragState();
  setMessage(winner === "blue" ? "Victory incoming." : "Defeat incoming.");
}

function updatePendingMatchResult(now) {
  if (!state.pendingResult || state.result) return;
  state.pendingResult.finishAt = Math.max(state.pendingResult.finishAt || 0, activeDeathAnimationFinishAt(now), activeOugiFinishAt(now));
  if (now < state.pendingResult.finishAt) return;
  const winner = state.pendingResult.winner;
  state.pendingResult = null;
  finishMatch(winner);
}

function activeDeathAnimationFinishAt(now = performance.now()) {
  if (!Array.isArray(state.deathAnimations)) return 0;
  return state.deathAnimations.reduce((latest, animation) => {
    const duration = Number(animation.duration) || 0;
    const startedAt = Number(animation.startedAt) || 0;
    const finishAt = startedAt + duration;
    return finishAt > now ? Math.max(latest, finishAt) : latest;
  }, 0);
}

function activeOugiFinishAt(now = performance.now()) {
  if (!Array.isArray(state.ougiCasts)) return 0;
  return state.ougiCasts.reduce((latest, cast) => {
    const duration = Number(cast.duration) || 0;
    const startedAt = Number(cast.startedAt) || 0;
    const finishAt = startedAt + duration;
    return finishAt > now ? Math.max(latest, finishAt) : latest;
  }, 0);
}

// Ends the match, records time, and plays result audio.
function finishMatch(winner) {
  if (state.result) return state.result;
  const now = performance.now();
  const activeAnimationFinishAt = Math.max(activeDeathAnimationFinishAt(now), activeOugiFinishAt(now));
  if (activeAnimationFinishAt > now) {
    state.pendingResult = {
      winner,
      finishAt: Math.max(state.pendingResult?.finishAt || 0, activeAnimationFinishAt),
    };
    return null;
  }
  state.gameOver = true;
  state.matchEnd = now;
  const resultAnimUntil = now + matchEndPromptMs;
  for (const unit of state.units) {
    unit.resultAnimUntil = resultAnimUntil;
    unit.moveT = 1;
    unit.fromX = unit.x;
    unit.fromY = unit.y;
  }
  state.result = {
    winner,
    promptStartedAt: now,
    actors: buildMatchEndActors(winner),
    durationMs: Math.max(0, now - (state.matchStart || state.countdownStart || now)),
  };
  state.result.expReward = awardSelectedCharacterMatchExp(winner);
  state.resultOverlayAt = now + matchEndPromptMs;
  state.resultClickableAt = state.resultOverlayAt + 2000;
  clearDragState();
  syncBgm();
  if (!state.endSoundPlayed) {
    state.endSoundInstance = playSound(winner === "blue" ? "win" : "lose");
    state.endSoundPlayed = true;
  }
  setMessage(winner === "blue" ? "Victory." : "Defeat.");
  return state.result;
}

function temporaryMatchExpRewardForWinner(winner) {
  return winner === "blue" ? 500 : 200;
}

function awardSelectedCharacterMatchExp(winner) {
  const character = typeof selectedCharacterProfile === "function" ? selectedCharacterProfile() : null;
  if (!character?.storage || typeof awardExpToProfile !== "function") return null;
  const reward = awardExpToProfile(character.storage, temporaryMatchExpRewardForWinner(winner));
  if (typeof saveAppProfile === "function") saveAppProfile();
  if (typeof syncSelectedCharacterToRoom === "function") syncSelectedCharacterToRoom();
  if (typeof renderFlowCharacterSummary === "function") renderFlowCharacterSummary();
  if (typeof renderRoomInventoryPanel === "function") renderRoomInventoryPanel();
  return reward;
}

function buildMatchEndActors(winner) {
  return state.units.map((unit) => {
    const p = unit.alive ? unitPosition(unit) : {
      x: unit.deathX ?? cellCenter(unit.x, unit.y).x,
      y: unit.deathY ?? cellCenter(unit.x, unit.y).y,
    };
    return {
      unitId: unit.id,
      team: unit.team,
      outcome: unit.team === winner ? "win" : "loss",
      facing: unit.facing || "down",
      eyeStyle: unit.eyeStyle,
      x: p.x,
      y: p.y,
    };
  });
}
