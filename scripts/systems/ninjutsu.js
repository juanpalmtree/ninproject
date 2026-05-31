// ===== Ninjutsu System =====
function updateNinju(now) {
  for (const unit of state.units) {
    if (unit.fireToadTransformUntil) {
      unit.skill = maxSkill;
      if (now < unit.fireToadTransformUntil) {
        continue;
      } else {
        unit.fireToadTransformUntil = 0;
        unit.fireToadUntil = now + (unit.fireToadDurationMs || fireToadRule().durationMs);
        unit.fireToadStartedAt = now;
        playSound("fireToadChid");
        if (canControlUnit(unit)) setMessage(`${unit.name}: Fire Toad!`);
      }
    } else if (isFireToadActive(unit)) {
      unit.skill = maxSkill;
    } else if (unit.fireToadUntil && now >= unit.fireToadUntil) {
      endFireToad(unit);
      if (canControlUnit(unit)) setMessage(`${unit.name}: Fire Toad ended.`);
    }
    if (!unit.ninju) continue;

    if (unit.ninju.phase === "active") {
      if (now - unit.ninju.startedAt < unit.ninju.duration) continue;
      if (unit.ninju.type === "fireToad") {
        unit.ninju = null;
        startFireToadTransform(unit, now);
        continue;
      }
      if (isSpecialNinjuType(unit.ninju.type)) {
        const messageBeforeSpecial = state.message;
        triggerSpecialNinju(unit, unit.ninju.type, now);
        unit.ninju = null;
        if (unit.id === playerUnitId && state.message === messageBeforeSpecial) setMessage(`${unit.name}: ninjutsu cast finished.`);
        continue;
      }
      refreshStatusNinju(unit, unit.ninju.type, now);
      const queuedType = unit.ninju.pendingType || unit.ninju.type;

      if (unit.ninju.pendingMoneyDart) {
        unit.ninju = { type: unit.ninju.type, phase: "gap", nextType: "moneyDart", startedAt: now, duration: ninjuChainGap, queue: unit.ninju.queue || 0, gapMoves: 0 };
        if (unit.id === playerUnitId) setMessage(`${unit.name}: money dart chain gap.`);
      } else if (unit.ninju.queue > 0) {
        unit.ninju = { type: unit.ninju.type, phase: "gap", nextType: queuedType, nextAttackNinjuLevel: unit.ninju.pendingAttackNinjuLevel || 0, startedAt: now, duration: ninjuChainMaxGap, queue: unit.ninju.queue, gapMoves: 0 };
        if (unit.id === playerUnitId) setMessage(`${unit.name}: ninjutsu chain gap.`);
      } else {
        unit.ninju = null;
        if (unit.id === playerUnitId) setMessage(`${unit.name}: ninjutsu cast finished.`);
      }
      continue;
    }

    if (unit.ninju.phase === "gap") {
      const elapsed = now - unit.ninju.startedAt;
      const firstMoveSucceeded = (unit.ninju.gapMoves || 0) > 0;
      if (!firstMoveSucceeded && elapsed < unit.ninju.duration) continue;
      if (unit.ninju.nextType === "moneyDart") {
        unit.ninju = null;
        startMoneyDart(unit, now, true);
      } else {
        const type = unit.ninju.nextType || unit.ninju.type;
        unit.ninju = { type, phase: "active", startedAt: now, duration: statusNinjuRule(type).castDurationMs, queue: Math.max(0, unit.ninju.queue - 1), chainMoves: firstMoveSucceeded ? ninjuFollowupMoveAllowance : 0, attackNinjuLevel: unit.ninju.nextAttackNinjuLevel || 0 };
        if (canControlUnit(unit)) playSound("useNinju");
        playStatusNinjuSound(type);
        if (unit.id === playerUnitId) setMessage(`${unit.name}: ninjutsu cast continued.`);
      }
    }
  }
}

function updateProjectiles(now) {
  if (!state.projectiles) return;
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const projectile = state.projectiles[i];
    if (now - projectile.startedAt < projectile.duration) continue;
    if (projectile.hitUnitId) {
      const target = state.units.find((unit) => unit.id === projectile.hitUnitId);
      if (target && target.alive && !isUnitInvincible(target)) {
        damageUnit(target, moneyDartRule().damage, `${projectile.ownerName} hit ${target.name} with money dart`);
      }
    }
    state.projectiles.splice(i, 1);
  }
}

function useSteelNinju() {
  useStatusNinju("steel", "Steel");
}

function useHotBloodNinju() {
  useStatusNinju("hotBlood", "Hot blood");
}

function useFlashNinju() {
  useAttackNinju("flash");
}

function useAttackNinju(type) {
  const config = attackNinjuConfigs[type];
  useStatusNinju(type, config?.label || type);
}

function useSpecialNinju(type) {
  const unit = selectedUnit();
  const config = specialNinjuConfigs[type];
  if (!unit || !canControlUnit(unit) || !config) return;
  if (isFireToadActive(unit) || isFireToadTransforming(unit) || isFireToadCasting(unit)) {
    setMessage(`${unit.name}: cannot use ninjutsu as Fire Toad.`);
    return;
  }
  if (unit.moneyDart) {
    setMessage(`${unit.name}: cannot use ninjutsu while holding money dart.`);
    return;
  }
  if (isUnitDisabled(unit)) {
    setMessage(`${unit.name}: cannot act now.`);
    return;
  }
  if ((unit.ninjuLockedUntil || 0) > performance.now() || isUnitCastingNinju(unit) || isUnitInNinjuGap(unit)) {
    setMessage(`${unit.name}: cannot use ninjutsu yet.`);
    return;
  }
  const cost = config.cost || flashNinjuCost;
  if (unit.skill < cost) {
    setMessage(`${config.label} needs ${cost} skill.`);
    return;
  }
  unit.skill -= cost;
  const now = performance.now();
  unit.ninju = { type, phase: "active", startedAt: now, duration: config.duration || flashCastDuration, queue: 0 };
  playSound("useNinju");
  if (config.soundKey) playSound(config.soundKey);
  clearDragState();
  setMessage(`${unit.name} used ${config.label}.`);
}

function useGenkiNinju() {
  useStatusNinju("genki", "Genki");
}

function useKakkiNinju() {
  useStatusNinju("kakki", "Kakki");
}

function useShinkiNinju() {
  useStatusNinju("shinki", "Shinki");
}

function useFireToadNinju() {
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit)) return;
  if (isUnitDisabled(unit)) {
    setMessage(`${unit.name}: cannot act now.`);
    return;
  }
  if (unit.moneyDart) {
    setMessage(`${unit.name}: cannot use Fire Toad while holding money dart.`);
    return;
  }
  if (isFireToadActive(unit) || isFireToadTransforming(unit)) {
    setMessage(`${unit.name}: already transformed.`);
    return;
  }
  if (isFireToadCasting(unit)) {
    setMessage(`${unit.name}: Fire Toad is already casting.`);
    return;
  }
  if (isUnitCastingNinju(unit) || isUnitInNinjuGap(unit)) {
    setMessage(`${unit.name}: cannot use Fire Toad while another ninjutsu is casting.`);
    return;
  }
  if ((unit.ninjuLockedUntil || 0) > performance.now()) {
    setMessage(`${unit.name}: cannot use ninjutsu yet.`);
    return;
  }
  const rule = fireToadRule();
  if (unit.skill < rule.cost) {
    setMessage(`Fire Toad needs ${rule.cost} skill.`);
    return;
  }
  unit.skill -= rule.cost;
  const now = performance.now();
  unit.ninju = { type: "fireToad", phase: "active", startedAt: now, duration: rule.castDurationMs, queue: 0 };
  unit.moneyDart = null;
  playSound("useNinju");
  playStatusEnergyUpSequence();
  clearDragState();
  setMessage(`${unit.name} is casting Fire Toad.`);
}

function startFireToadTransform(unit, now = performance.now()) {
  const rule = fireToadRule();
  unit.fireToadTransformUntil = now + rule.transformMs;
  unit.fireToadTransformStartedAt = now;
  unit.fireToadDurationMs = rule.durationMs;
  unit.fireToadUntil = 0;
  unit.fireToadStartedAt = 0;
  unit.fireToadFacing = unit.facing || "down";
  unit.moneyDart = null;
  clearDragState();
  setMessage(`${unit.name} is transforming into Fire Toad.`);
}

function endFireToad(unit) {
  if (!unit) return;
  unit.fireToadTransformUntil = 0;
  unit.fireToadTransformStartedAt = 0;
  unit.fireToadUntil = 0;
  unit.fireToadStartedAt = 0;
  unit.fireToadFacing = "";
  unit.fireToadDurationMs = 0;
  unit.skill = maxSkill * 0.2;
}

function useStatusNinju(type, label) {
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit)) return;
  const isAttackNinju = isAttackNinjuType(type);
  if (isFireToadActive(unit) || isFireToadTransforming(unit)) {
    setMessage(`${unit.name}: cannot use ninjutsu as Fire Toad.`);
    return;
  }
  if (isFireToadCasting(unit)) {
    setMessage(`${unit.name}: cannot use ninjutsu while Fire Toad is casting.`);
    return;
  }
  if (unit.moneyDart) {
    setMessage(`${unit.name}: cannot use ninjutsu while holding money dart.`);
    return;
  }
  const rule = statusNinjuRule(type);
  if (rule.available === false) return;
  if (isUnitDisabled(unit)) {
    setMessage(`${unit.name}: cannot act now.`);
    return;
  }
  if ((unit.ninjuLockedUntil || 0) > performance.now()) {
    setMessage(`${unit.name}: cannot use ninjutsu yet.`);
    return;
  }
  if (isAttackNinju && (isUnitCastingNinju(unit) || isUnitInNinjuGap(unit))) {
    setMessage(`${unit.name}: cannot use ${label} while another ninjutsu is active.`);
    return;
  }
  if (!isAttackNinju && unit.skill < rule.cost) {
    setMessage(`${label} needs ${rule.cost} skill.`);
    return;
  }

  const attackNinjuLevel = isAttackNinju ? consumeAttackNinjuSoulLevel(unit) : 0;
  if (isAttackNinju && attackNinjuLevel < 1) {
    setMessage(`${label} needs Soul 1.`);
    return;
  }

  if (!isAttackNinju) unit.skill -= rule.cost;
  const now = performance.now();

  if (!isAttackNinju && unit.ninju && isStatusNinjuType(unit.ninju.type)) {
    unit.ninju.pendingType = type;
    unit.ninju.queue = (unit.ninju.queue || 0) + 1;
    setMessage(`${unit.name} queued ${label}.`);
  } else {
    unit.ninju = { type, phase: "active", startedAt: now, duration: rule.castDurationMs, queue: 0, attackNinjuLevel };
    playStatusNinjuSound(type);
    setMessage(`${unit.name} used ${label}.`);
  }
  playSound("useNinju");
  clearDragState();
}

function useMoneyDart() {
  const unit = selectedUnit();
  if (!unit || !canControlUnit(unit)) return;
  if (isUnitDisabled(unit)) {
    setMessage(`${unit.name}: cannot act now.`);
    return;
  }
  if (isFireToadActive(unit) || isFireToadTransforming(unit)) {
    setMessage(`${unit.name}: cannot use items as Fire Toad.`);
    return;
  }
  if (isFireToadCasting(unit)) {
    setMessage(`${unit.name}: cannot use items while Fire Toad is casting.`);
    return;
  }
  if (unit.moneyDart) {
    setMessage(`${unit.name}: money dart is already ready.`);
    return;
  }
  if ((unit.ninjuLockedUntil || 0) > performance.now()) {
    setMessage(`${unit.name}: cannot use ninjutsu yet.`);
    return;
  }
  if (isUnitCastingNinju(unit)) {
    if (unit.ninju.pendingMoneyDart) {
      setMessage(`${unit.name}: money dart is already queued.`);
      return;
    }
    unit.ninju.pendingMoneyDart = true;
    playSound("useNinju");
    playSound("takeDart");
    clearDragState();
    setMessage(`${unit.name}: money dart queued after ninjutsu.`);
    return;
  }
  if (isUnitInNinjuGap(unit)) {
    unit.ninju.nextType = "moneyDart";
    playSound("useNinju");
    playSound("takeDart");
    clearDragState();
    setMessage(`${unit.name}: money dart queued in the chain gap.`);
    return;
  }
  playSound("useNinju");
  startMoneyDart(unit, performance.now(), true);
}

function startMoneyDart(unit, now = performance.now(), playActivationSound = true) {
  if (isUnitDisabled(unit)) return;
  if (unit.moneyDart) return;
  unit.moneyDart = { startedAt: now, invincibleUntil: now + moneyDartReadyMs };
  if (playActivationSound) playSound("takeDart");
  if (canControlUnit(unit)) clearDragState();
  setMessage(`${unit.name}: money dart ready. Choose up, down, left, or right.`);
}

function throwMoneyDart(unit, targetCell) {
  if (!unit.moneyDart) return;
  const now = performance.now();
  if (isUnitDisabled(unit)) {
    setMessage(`${unit.name}: cannot act now.`);
    return;
  }
  if (now < unit.moneyDart.invincibleUntil) {
    setMessage(`${unit.name}: money dart is ready after the invincible moment.`);
    return;
  }
  if (isUnitCastingNinju(unit)) {
    setMessage(`${unit.name}: cannot throw while using ninjutsu.`);
    return;
  }

  const dir = directionFromTarget(unit, targetCell);
  if (!dir) {
    setMessage(`${unit.name}: choose a straight direction for money dart.`);
    return;
  }

  const shot = traceMoneyDart(unit, dir);
  updateFacing(unit, targetCell);
  playSound("shootDart");
  unit.moneyDart = null;
  state.moneyDartCasts = state.moneyDartCasts.filter((cast) => cast.unitId !== unit.id);
  if (shot.hitUnit && shot.hitUnit.alive && !isUnitInvincible(shot.hitUnit)) {
    damageUnit(shot.hitUnit, moneyDartRule().damage, `${unit.name} hit ${shot.hitUnit.name} with money dart`, true, unit);
  }
  state.projectiles.push({
    from: { x: unit.x, y: unit.y },
    to: shot.to,
    dir: dir.name,
    hitUnitId: null,
    ownerName: unit.name,
    startedAt: now,
    duration: Math.max(160, shot.distance * grid.cell / moneyDartSpeed * 1000),
  });
  // AI Koban throws skip the hand animation to avoid a single-frame visual flash; player throws keep it.
  if (canControlUnit(unit)) {
    state.moneyDartCasts.push({
      unitId: unit.id,
      dir: dir.name,
      startedAt: now,
      duration: 300,
    });
  }
  unit.ninjuLockedUntil = now + moneyDartPostThrowNinjuLockMs;
  setMessage(`${unit.name} threw money dart.`);
}

function traceMoneyDart(unit, dir) {
  let x = unit.x + dir.dx;
  let y = unit.y + dir.dy;
  let last = { x: unit.x, y: unit.y };
  let distance = 0;

  while (inside(x, y)) {
    if (isPermanentObstacle(x, y) || objectAt(x, y)) break;
    distance += 1;
    last = { x, y };
    const other = unitAt(x, y);
    if (other && other.id !== unit.id) {
      if (other.team !== unit.team) return { to: { x, y }, hitUnit: other, distance };
    }
    x += dir.dx;
    y += dir.dy;
  }

  if (distance === 0) {
    return { to: { x: unit.x + dir.dx, y: unit.y + dir.dy }, hitUnit: null, distance: 1 };
  }
  return { to: last, hitUnit: null, distance };
}

function isUnitCastingNinju(unit) {
  return Boolean(unit && unit.ninju && isCastNinjuType(unit.ninju.type) && unit.ninju.phase === "active" && performance.now() - unit.ninju.startedAt < unit.ninju.duration);
}

function canUnitMoveNow(unit) {
  if (isUnitDisabled(unit)) return false;
  if (isUnitControlLocked(unit)) return false;
  if (isAnyUnitCastingNinju()) return false;
  if (!isUnitCastingNinju(unit)) return true;
  return Boolean(unit.ninju && unit.ninju.chainMoves > 0);
}

function isUnitInvincible(unit) {
  return isFireToadTransforming(unit) || isUnitCastingNinju(unit) || isUnitInNinjuGap(unit) || isJutsuEffectLocked(unit) || isMoneyDartInvincible(unit) || isOugiInvincible(unit) || isFlashInvincible(unit);
}

function isUnitCollisionProtected(unit) {
  return isUnitCastingNinju(unit) || isFireToadTransforming(unit) || isJutsuEffectLocked(unit) || isOugiInvincible(unit);
}

function isUnitControlLocked(unit) {
  const now = performance.now();
  return Boolean(unit && ((unit.fireToadTransformUntil || 0) > now || (unit.jutsuEffectLockUntil || 0) > now || (unit.ougiCastUntil || 0) > now || (unit.ougiCcUntil || 0) > now || (unit.resultAnimUntil || 0) > now));
}

function isUnitDisabled(unit) {
  return Boolean(unit && (unit.disabledUntil || 0) > performance.now());
}

function isJutsuEffectLocked(unit) {
  return Boolean(unit && (unit.jutsuEffectLockUntil || 0) > performance.now());
}

function isAnyUnitCastingNinju() {
  return state.units.some((unit) => unit.alive && isUnitCastingNinju(unit));
}

function isFlashInvincible(unit) {
  return Boolean(unit && (unit.invincibleUntil || 0) > performance.now());
}

function isOugiInvincible(unit) {
  const now = performance.now();
  return Boolean(unit && ((unit.ougiCastUntil || 0) > now || ((unit.ougiInvincibleAt || 0) <= now && now < (unit.ougiInvincibleUntil || 0))));
}

function isMoneyDartInvincible(unit) {
  return Boolean(unit && unit.moneyDart && performance.now() < unit.moneyDart.invincibleUntil);
}

function isFireToadActive(unit) {
  return Boolean(unit && (unit.fireToadUntil || 0) > performance.now());
}

function isFireToadTransforming(unit) {
  return Boolean(unit && (unit.fireToadTransformUntil || 0) > performance.now());
}

function isFireToadCasting(unit) {
  return Boolean(unit && unit.ninju?.type === "fireToad" && unit.ninju.phase === "active" && performance.now() - unit.ninju.startedAt < unit.ninju.duration);
}

function isUnitInNinjuGap(unit) {
  return Boolean(unit && unit.ninju && isStatusNinjuType(unit.ninju.type) && unit.ninju.phase === "gap" && performance.now() - unit.ninju.startedAt < unit.ninju.duration);
}

function isSteelDefenseActive(unit) {
  return Boolean(unit && unit.steelUntil && performance.now() < unit.steelUntil);
}

function isHotBloodActive(unit) {
  return Boolean(unit && unit.hotBloodUntil && performance.now() < unit.hotBloodUntil);
}

function refreshStatusNinju(unit, type, now = performance.now()) {
  if (isAttackNinjuType(type)) {
    triggerAttackNinju(unit, type, unit.ninju?.attackNinjuLevel || 0, now);
    return;
  }
  if (isHealNinjuType(type)) {
    const rule = healNinjuRule(type);
    if (rule.effect === "steelNoDefense") return;
    if (rule.effect === "teamHeal") {
      for (const teammate of state.units) {
        if (teammate.team === unit.team && teammate.alive) {
          teammate.hp = Math.min(teammate.maxHp, teammate.hp + rule.healAmount);
        }
      }
      return;
    }
    unit.hp = Math.min(unit.maxHp, unit.hp + rule.healAmount);
    return;
  }
  if (type === "steel") {
    unit.steelUntil = now + steelRule().durationMs;
    unit.buffAuraType = "steel";
  }
  if (type === "hotBlood") {
    unit.hotBloodUntil = now + hotBloodRule().durationMs;
    unit.buffAuraType = "hotBlood";
  }
}

function statusNinjuRule(type) {
  if (isAttackNinjuType(type)) return attackNinjuRule(type);
  if (isHealNinjuType(type)) return healNinjuRule(type);
  return type === "hotBlood" ? hotBloodRule() : steelRule();
}

function isStatusNinjuType(type) {
  return type === "steel" || type === "hotBlood" || isAttackNinjuType(type) || isHealNinjuType(type);
}

function isSpecialNinjuType(type) {
  return Boolean(specialNinjuConfigs[type]);
}

function isAttackNinjuType(type) {
  return Boolean(attackNinjuConfigs[type]);
}

function isHealNinjuType(type) {
  return type === "genki" || type === "kakki" || type === "shinki";
}

function isCastNinjuType(type) {
  return isStatusNinjuType(type) || isSpecialNinjuType(type) || type === "fireToad";
}

function defendedDamage(unit, baseDamage) {
  return isSteelDefenseActive(unit) ? baseDamage / steelRule().defenseMultiplier : baseDamage;
}

function playStatusEnergyUpSequence() {
  const first = playSound("statusEnergyUp1");
  if (!first) return;
  const onFirstEnded = () => {
    first.removeEventListener("ended", onFirstEnded);
    playSound("statusEnergyUp2");
  };
  first.addEventListener("ended", onFirstEnded);
}

function playStatusNinjuSound(type) {
  if (isAttackNinjuType(type)) {
    const sound = attackNinjuConfigs[type]?.castSound;
    if (sound) playSound(sound);
    return;
  }
  if (type === "genki") {
    playSound("regenHpSmall");
    return;
  }
  if (type === "kakki" || type === "shinki") {
    playSound("regenHpLarge");
    return;
  }
  playStatusEnergyUpSequence();
}

function triggerSpecialNinju(caster, type, now = performance.now()) {
  const config = specialNinjuConfigs[type];
  if (!config) return;
  if (!usesN3JutsuBehavior()) {
    triggerReferenceSpecialNinju(caster, type, config, now);
    return;
  }
  if (type === "butsumetsu") {
    triggerButsumetsuNinju(caster, config, now);
    return;
  }
  if (type === "death") {
    triggerDeathNinju(caster, config, now);
    return;
  }
  if (type === "seven") {
    triggerSevenNinju(caster, config, now);
    return;
  }
  if (config.heal) caster.hp = Math.min(caster.maxHp || maxHp, caster.hp + config.heal);
  const targets = state.units
    .filter((target) => target.alive && target.team !== caster.team && !isUnitInvincible(target))
    .sort((a, b) => manhattan(caster, a) - manhattan(caster, b) || a.id - b.id)
    .slice(0, 1);
  for (const target of targets) {
    target.disabledUntil = now + 1200;
    target.invincibleUntil = target.disabledUntil;
    target.moneyDart = null;
    target.hitFlash = 0.65;
    cancelDragIfPressed(target);
    if (typeof addNinjuDamageEffect === "function") {
      addNinjuDamageEffect(type, target, now, config.duration || 1400, { targetSize: config.effectSize || 150 });
      if (specialNinjuHitFrames[type]?.some(Boolean)) addNinjuDamageEffect(`${type}Hit`, target, now + 500, 1400, { targetSize: config.hitEffectSize || 130 });
    }
    damageUnit(target, config.damage || flashDamage, `${caster.name} hit ${target.name} with ${config.label}`, true, caster);
  }
}

function usesN3JutsuBehavior() {
  return typeof currentRuleModeKey !== "function" || currentRuleModeKey() === "n3";
}

function triggerReferenceSpecialNinju(caster, type, config, now = performance.now()) {
  const target = referenceAttackNinjuTargets(caster, 1)[0];
  if (!target) return;
  if (typeof addNinjuDamageEffect === "function") {
    addNinjuDamageEffect(type, target, now, config.duration || 1500, { targetSize: config.effectSize || 150 });
  }

  if (type === "death") {
    const hit = Math.random() < 0.08;
    applyDeathRollToTarget(caster, target, config, hit, now, `${caster.name} invoked ${config.label} on ${target.name}`);
    if (!hit) setMessage(`${caster.name}'s ${config.label} missed ${target.name}.`);
    return;
  }

  const referenceDamage = type === "butsumetsu" ? 155 : (config.damage || flashDamage);
  target.disabledUntil = now + 1200;
  target.invincibleUntil = target.disabledUntil;
  target.moneyDart = null;
  target.hitFlash = 0.65;
  cancelDragIfPressed(target);
  damageUnit(target, referenceDamage, `${caster.name} hit ${target.name} with ${config.label}`, true, caster);
}

function triggerDeathNinju(caster, config, now = performance.now()) {
  const target = randomFrom(state.units.filter((unit) => unit.alive && unit.team !== caster.team));
  if (!target) return;
  const hit = Math.random() < (config.instantKillChance ?? 0.5);
  const killed = applyDeathRollToTarget(caster, target, config, hit, now, `${caster.name} invoked ${config.label} on ${target.name}`);
  if (!killed) setMessage(`${caster.name}'s ${config.label} missed ${target.name}.`);
}

function triggerSevenNinju(caster, config, now = performance.now()) {
  const roll = Math.floor(Math.random() * 7) + 1;
  if (roll === 1) {
    playStatusNinjuSound("hotBlood");
    for (const target of aliveTeamUnits(caster.team)) applyTeamBuff(target, "hotBlood", now);
    setMessage(`${caster.name}'s Seven rolled Heat.`);
    return;
  }
  if (roll === 2) {
    playStatusNinjuSound("steel");
    for (const target of aliveTeamUnits(caster.team)) applyTeamBuff(target, "steel", now);
    setMessage(`${caster.name}'s Seven rolled Steel.`);
    return;
  }
  if (roll === 3) {
    triggerAttackNinju(caster, "iceArrow", soulMaxLevel, now);
    setMessage(`${caster.name}'s Seven rolled Ice Arrow.`);
    return;
  }
  if (roll === 4) {
    triggerAttackNinju(caster, "thunderbolt", soulMaxLevel, now);
    setMessage(`${caster.name}'s Seven rolled Thunder.`);
    return;
  }
  if (roll === 5) {
    triggerSevenDeathMapRoll(caster, specialNinjuConfigs.death || config, now);
    setMessage(`${caster.name}'s Seven rolled Death.`);
    return;
  }
  if (roll === 6) {
    for (const target of state.units.filter((unit) => unit.alive)) startFireToadTransform(target, now);
    setMessage(`${caster.name}'s Seven rolled Gama.`);
    return;
  }
  playStatusNinjuSound("shinki");
  for (const target of aliveTeamUnits(caster.team)) {
    target.hp = target.maxHp || maxHp;
    target.skill = maxSkill;
    target.jutsuEffectLockUntil = Math.max(target.jutsuEffectLockUntil || 0, now + 1400);
    if (typeof addNinjuDamageEffect === "function") addNinjuDamageEffect("shinki", target, now, 1400, { targetSize: 120 });
  }
  setMessage(`${caster.name}'s Seven rolled Holy Light.`);
}

function triggerSevenDeathMapRoll(caster, config, now = performance.now()) {
  for (const target of shuffledUnits(state.units.filter((unit) => unit.alive && unit.id !== caster.id)).slice(0, 4)) {
    const hitChance = 0.10 + Math.random() * 0.30;
    const hit = Math.random() < hitChance;
    applyDeathRollToTarget(caster, target, config, hit, now, `${caster.name}'s Seven Death reached ${target.name}`);
  }
}

function applyDeathRollToTarget(caster, target, config, hit, now, label) {
  if (typeof addNinjuDamageEffect === "function") {
    addNinjuDamageEffect("death", target, now, config.duration || 1400, { targetSize: config.effectSize || 150 });
    if (specialNinjuHitFrames.death?.some(Boolean)) addNinjuDamageEffect("deathHit", target, now + 500, 1400, { targetSize: config.hitEffectSize || 130 });
  }
  if (!hit || isOugiInvincible(target)) {
    if (typeof addNinjuDamageEffect === "function") addNinjuDamageEffect("flashMiss", target, now + 500, jutsuMissEffectMs);
    return false;
  }
  target.disabledUntil = now + 1200;
  target.invincibleUntil = target.disabledUntil;
  target.moneyDart = null;
  target.hitFlash = 0.65;
  cancelDragIfPressed(target);
  damageUnit(target, Math.max(config.damage || 9999, target.maxHp || maxHp, target.hp), label, true, caster);
  return true;
}

function applyTeamBuff(target, type, now = performance.now()) {
  if (type === "hotBlood") {
    target.hotBloodUntil = now + hotBloodRule().durationMs;
    target.buffAuraType = "hotBlood";
  } else if (type === "steel") {
    target.steelUntil = now + steelRule().durationMs;
    target.buffAuraType = "steel";
  }
  target.jutsuEffectLockUntil = Math.max(target.jutsuEffectLockUntil || 0, now + 1200);
  if (typeof addNinjuDamageEffect === "function") addNinjuDamageEffect(type, target, now, 1200, { targetSize: 92 });
}

function aliveTeamUnits(team) {
  return state.units.filter((unit) => unit.alive && unit.team === team);
}

function randomFrom(items) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function shuffledUnits(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function triggerButsumetsuNinju(caster, config, now = performance.now()) {
  const radius = config.radius || 2;
  const targets = state.units
    .filter((target) => target.alive
      && target.id !== caster.id
      && Math.max(Math.abs(target.x - caster.x), Math.abs(target.y - caster.y)) <= radius)
    .sort((a, b) => a.id - b.id);

  for (const target of targets) {
    if (typeof addNinjuDamageEffect === "function") {
      addNinjuDamageEffect("butsumetsu", target, now, config.duration || 1400, { targetSize: config.effectSize || 220 });
      if (specialNinjuHitFrames.butsumetsu?.some(Boolean)) {
        addNinjuDamageEffect("butsumetsuHit", target, now + 500, 1400, { targetSize: config.hitEffectSize || 170 });
      }
    }

    if (target.id !== caster.id && isOugiInvincible(target)) continue;
    target.disabledUntil = now + 1200;
    target.invincibleUntil = target.disabledUntil;
    target.moneyDart = null;
    target.hitFlash = 0.65;
    cancelDragIfPressed(target);
    damageUnit(target, Math.max(config.damage || 9999, target.maxHp || maxHp, target.hp), `${caster.name} caught ${target.name} in ${config.label}`, true, caster);
  }

  if (config.killsCaster !== false && caster.alive) {
    if (typeof addNinjuDamageEffect === "function") {
      addNinjuDamageEffect("butsumetsu", caster, now, config.duration || 1400, { targetSize: config.effectSize || 220 });
    }
    caster.disabledUntil = Math.max(caster.disabledUntil || 0, now + butsumetsuCasterDeathDelayMs);
    caster.moneyDart = null;
    cancelDragIfPressed(caster);
    window.setTimeout(() => {
      if (!caster.alive) return;
      damageUnit(caster, Math.max(config.damage || 9999, caster.maxHp || maxHp, caster.hp), `${caster.name} was consumed by ${config.label}`, true, caster);
    }, butsumetsuCasterDeathDelayMs);
  }
}

function triggerAttackNinju(caster, type, attackNinjuLevel, now = performance.now()) {
  if (!usesN3JutsuBehavior()) {
    triggerReferenceAttackNinju(caster, type, attackNinjuLevel, now);
    return;
  }
  const config = attackNinjuConfigs[type];
  const tier = Math.max(1, Math.min(soulMaxLevel, attackNinjuLevel || 1));
  const tierRule = attackJutsuTierRules[tier] || attackJutsuTierRules[1];
  const targets = attackNinjuTargets(caster);
  if (targets.length > 0 && config?.hitSound) playSound(config.hitSound);
  const globalHit = Math.random() < tierRule.globalHitChance;
  for (const target of targets) {
    const hit = globalHit || Math.random() < tierRule.perTargetHitChance;
    if (typeof addNinjuDamageEffect === "function") {
      addNinjuDamageEffect(type, target, now, hit && config?.holdHitLastFrame ? attackJutsuStunMs : (hit ? 1500 : 0), config?.holdHitLastFrame ? { frameDuration: 1500 } : {});
      if (hit) {
        if (config?.hitBodyEffect !== null) addNinjuDamageEffect(config?.hitBodyEffect || "flashHit", target, now + 1500, 2000);
        addNinjuDamageEffect(config?.headEffect || "flashHitHead", target, now + 1500, 2000);
        if (config?.breakEffect) addNinjuDamageEffect(config.breakEffect, target, now + attackJutsuStunMs, 350);
      } else {
        addNinjuDamageEffect("flashMiss", target, now + 1500, jutsuMissEffectMs);
      }
    }
    if (!hit || isOugiInvincible(target)) continue;
    target.disabledUntil = Math.max(target.disabledUntil || 0, now + attackJutsuStunMs);
    target.moneyDart = null;
    target.hitFlash = 0.65;
    cancelDragIfPressed(target);
    damageUnit(target, config?.damage || flashDamage, `${caster.name} hit ${target.name} with ${config?.label || type}`, true, caster, true, false);
  }
}

function triggerReferenceAttackNinju(caster, type, attackNinjuLevel, now = performance.now()) {
  const config = attackNinjuConfigs[type];
  const rule = attackNinjuRule(type);
  const targets = referenceAttackNinjuTargets(caster, attackNinjuLevel);
  if (targets.length > 0 && config?.hitSound) playSound(config.hitSound);
  for (const target of targets) {
    const outcome = referenceAttackNinjuOutcome(type, rule, config);
    const hit = Boolean(outcome);
    const disableMs = hit ? (outcome.hitDisableMs || rule.hitDisableMs || attackJutsuStunMs) : (rule.missDisableMs || flashMissDisableMs);
    target.disabledUntil = now + disableMs;
    target.invincibleUntil = target.disabledUntil;
    target.moneyDart = null;
    target.hitFlash = hit ? 0.65 : 0.25;
    cancelDragIfPressed(target);
    if (typeof addNinjuDamageEffect === "function") {
      addNinjuDamageEffect(type, target, now, hit && config?.holdHitLastFrame ? disableMs : (hit ? 1500 : 0), config?.holdHitLastFrame ? { frameDuration: 1500 } : {});
      if (hit) {
        if (config?.hitBodyEffect !== null) addNinjuDamageEffect(config?.hitBodyEffect || "flashHit", target, now + 1500, 2000);
        addNinjuDamageEffect(outcome.headEffect || config?.headEffect || "flashHitHead", target, now + 1500, 2000);
        if (config?.breakEffect) addNinjuDamageEffect(config.breakEffect, target, now + disableMs, 350);
      } else {
        addNinjuDamageEffect("flashMiss", target, now + 1500, jutsuMissEffectMs);
      }
    }
    if (!hit || isOugiInvincible(target)) continue;
    damageUnit(target, outcome.damage, `${caster.name} hit ${target.name} with ${config?.label || type}`, true, caster);
  }
}

function referenceAttackNinjuOutcome(type, rule, config) {
  const outcomes = config?.outcomes;
  if (!outcomes) {
    return Math.random() < (rule.hitChance ?? flashHitChance)
      ? { damage: rule.damage ?? config?.damage ?? flashDamage, headEffect: config?.headEffect || "flashHitHead" }
      : null;
  }
  let roll = Math.random();
  for (const outcome of outcomes) {
    if (roll < outcome.chance) return outcome;
    roll -= outcome.chance;
  }
  return null;
}

function referenceAttackNinjuTargets(caster, attackNinjuLevel) {
  const count = Math.max(0, Math.min(soulMaxLevel, attackNinjuLevel || 0));
  return state.units
    .filter((target) => target.alive && target.team !== caster.team && !isUnitInvincible(target))
    .sort((a, b) => manhattan(caster, a) - manhattan(caster, b) || a.id - b.id)
    .slice(0, count);
}

function attackNinjuTargets(caster) {
  return state.units
    .filter((target) => target.alive && target.team !== caster.team)
    .sort((a, b) => manhattan(caster, a) - manhattan(caster, b) || a.id - b.id);
}

function consumeAttackNinjuSoulLevel(unit) {
  const level = Math.min(soulMaxLevel, Math.floor((unit.soulSteps || 0) / soulStepsPerLevel));
  if (level > 0) {
    unit.soulSteps = 0;
    unit.ougi = 0;
  }
  return level;
}
