// ===== Match Flow =====
// 檢查任一隊全滅並觸發結算。
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
    startedAt: performance.now(),
    duration: deathSkullAnimationMs,
  });
}

function queueMatchFinish(winner) {
  const now = performance.now();
  state.gameOver = true;
  state.pendingResult = {
    winner,
    finishAt: now + deathSkullAnimationMs,
  };
  clearDragState();
  setMessage(winner === "blue" ? "Victory incoming." : "Defeat incoming.");
}

function updatePendingMatchResult(now) {
  if (!state.pendingResult || state.result) return;
  if (now < state.pendingResult.finishAt) return;
  const winner = state.pendingResult.winner;
  state.pendingResult = null;
  finishMatch(winner);
}

// 結束比賽、記錄時間並播放勝敗音效。
function finishMatch(winner) {
  const now = performance.now();
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
  state.resultOverlayAt = now + matchEndPromptMs;
  state.resultClickableAt = state.resultOverlayAt + 2000;
  clearDragState();
  syncBgm();
  if (!state.endSoundPlayed) {
    state.endSoundInstance = playSound(winner === "blue" ? "win" : "lose");
    state.endSoundPlayed = true;
  }
  setMessage(winner === "blue" ? "Victory." : "Defeat.");
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
      x: p.x,
      y: p.y,
    };
  });
}
