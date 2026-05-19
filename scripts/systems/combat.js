// ===== Combat =====
// Handles direct weapon attacks against enemy units.
function attack(attacker, target) {
  if (isUnitDisabled(attacker)) {
    setMessage(`${attacker.name}: cannot act now.`);
    return;
  }
  if (isFireToadActive(attacker) || isFireToadTransforming(attacker)) {
    setMessage(`${attacker.name}: Fire Toad cannot use weapons.`);
    return;
  }
  if (attacker.moneyDart) {
    setMessage(`${attacker.name}: cannot attack while holding money dart.`);
    return;
  }
  if (isAnyUnitCastingNinju()) {
    setMessage(`${attacker.name}: cannot attack during a ninjutsu cast.`);
    return;
  }
  if (isUnitCastingNinju(attacker)) {
    setMessage(`${attacker.name}: cannot attack while using ninjutsu.`);
    return;
  }
  if (isUnitControlLocked(attacker)) {
    setMessage(`${attacker.name}: cannot attack right now.`);
    return;
  }
  if (!weaponIsReady(attacker)) {
    setMessage(`${attacker.name}: weapon is recovering.`);
    return;
  }
  const dir = weaponDirectionFromTarget(attacker, target);
  if (!dir || !isCellInWeaponRange(attacker, target, dir)) {
    setMessage("Target is outside the Nodachi range.");
    return;
  }
  attackCell(attacker, { x: attacker.x + dir.dx, y: attacker.y + dir.dy });
}

// Applies unit damage, invincibility checks, defense scaling, and death handling.
function damageUnit(target, baseDamage, label, announce = true, attacker = null, playHitSound = true, grantOugi = true) {
  const damage = defendedDamage(target, baseDamage);
  target.hp -= damage;
  if (grantOugi) recordDamage(attacker, target, damage);
  target.hitFlash = 0.65;
  if (playHitSound) playSound("weaponDamaged");
  if (announce) setMessage(`${label} for ${formatDamage(damage)}.`);
  if (target.hp <= 0) {
    defeatUnit(target, attacker);
  }
  return damage;
}

// Records dealt and taken damage for the result screen.
function recordDamage(attacker, target, damage) {
  const amount = Math.max(0, damage);
  if (target) {
    target.damageTaken += amount;
    addOugi(target, amount * ougiTakeGainPerDamage);
  }
  if (attacker && attacker !== target) {
    attacker.damageDone += amount;
    addOugi(attacker, amount * ougiDealGainPerDamage);
  }
}

// Handles weapon hits against map objects and break sounds.
function damageObject(object, attacker) {
  const damage = unitWeaponDamage(attacker);
  object.hp = Math.max(0, object.hp - damage);
  setMessage(`${attacker.name} hit ${object.type} for ${damage}.`);
  if (object.hp <= 0) {
    object.alive = false;
    playBreakSound(object);
    if (!maybeGrantMapItem(object, attacker)) setMessage(`${object.type} destroyed.`);
  }
}

// Attacks a target cell, potentially hitting enemies or objects.
function attackCell(attacker, cell) {
  if (isUnitDisabled(attacker)) {
    setMessage(`${attacker.name}: cannot act now.`);
    return;
  }
  if (isFireToadActive(attacker) || isFireToadTransforming(attacker)) {
    setMessage(`${attacker.name}: Fire Toad cannot use weapons.`);
    return;
  }
  if (attacker.moneyDart) {
    setMessage(`${attacker.name}: cannot attack while holding money dart.`);
    return;
  }
  if (isAnyUnitCastingNinju()) {
    setMessage(`${attacker.name}: cannot attack during a ninjutsu cast.`);
    return;
  }
  if (isUnitCastingNinju(attacker) || isUnitInNinjuGap(attacker)) {
    setMessage(`${attacker.name}: cannot attack while using ninjutsu.`);
    return;
  }
  if (isUnitControlLocked(attacker)) {
    setMessage(`${attacker.name}: cannot attack right now.`);
    return;
  }
  if (!weaponIsReady(attacker)) {
    setMessage(`${attacker.name}: weapon is recovering.`);
    return;
  }
  const dir = directionFromTarget(attacker, cell);
  if (!dir) {
    setMessage(`${attacker.name}: choose a direction to slash.`);
    return;
  }

  const hits = weaponHitInDirection(attacker, dir);
  updateFacing(attacker, { x: attacker.x + dir.dx, y: attacker.y + dir.dy });
  playSlash(attacker, weaponSlashAnchorCell(attacker, dir));
  markWeaponUsed(attacker);
  const targetCount = hits.units.length + hits.objects.length;
  if (targetCount === 0) {
    setMessage(`${attacker.name} slashed.`);
    return;
  }

  for (const unit of hits.units) {
    damageUnit(unit, unitWeaponDamage(attacker), `${attacker.name} attacked ${unit.name}`, false, attacker);
  }
  for (const object of hits.objects) {
    damageObject(object, attacker);
  }
  setMessage(`${attacker.name} hit ${targetCount} targets.`);
}

// When clicking a distant point, derives direction and attacks the adjacent cell.
function attackAimedWeapon(attacker, targetCell) {
  if (isUnitDisabled(attacker)) {
    setMessage(`${attacker.name}: cannot act now.`);
    return;
  }
  if (isFireToadActive(attacker) || isFireToadTransforming(attacker)) {
    setMessage(`${attacker.name}: Fire Toad cannot use weapons.`);
    return;
  }
  if (attacker.moneyDart) {
    setMessage(`${attacker.name}: cannot attack while holding money dart.`);
    return;
  }
  if (isAnyUnitCastingNinju()) {
    setMessage(`${attacker.name}: cannot attack during a ninjutsu cast.`);
    return;
  }
  if (isUnitCastingNinju(attacker) || isUnitInNinjuGap(attacker)) {
    setMessage(`${attacker.name}: cannot attack while using ninjutsu.`);
    return;
  }
  if (isUnitControlLocked(attacker)) {
    setMessage(`${attacker.name}: cannot attack right now.`);
    return;
  }
  if (!weaponIsReady(attacker)) {
    setMessage(`${attacker.name}: weapon is recovering.`);
    return;
  }
  const dir = weaponDirectionFromTarget(attacker, targetCell);
  if (!dir) {
    setMessage(`${attacker.name}: choose a direction to slash.`);
    return;
  }
  attackCell(attacker, { x: attacker.x + dir.dx, y: attacker.y + dir.dy });
}

// Checks whether the unit weapon cooldown has ended.
function weaponIsReady(unit) {
  return performance.now() >= (unit.weaponReadyAt || 0);
}

// Records this slash and applies weapon cooldown.
function markWeaponUsed(unit) {
  const weapon = weaponDefinitionByKey[unit.weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
  unit.weaponReadyAt = performance.now() + (weapon.cooldownMs || weaponCooldownMs);
}

// Gets the current weapon damage, falling back to the global value when needed.
function unitWeaponDamage(unit) {
  const weapon = weaponDefinitionByKey[unit.weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
  if (!weapon) return weaponDamage;
  const baseDamage = weaponDamageForMode(weapon.key, weapon.damage ?? weaponDamage);
  return isHotBloodActive(unit) ? baseDamage * hotBloodRule().weaponDamageMultiplier : baseDamage;
}

// Gets the actual attack cell shape for the equipped weapon.
function weaponAreaCells(attacker, dir) {
  const weapon = weaponDefinitionByKey[attacker.weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
  const x = attacker.x;
  const y = attacker.y;
  if (weapon.area === "single") {
    return [{ x: x + dir.dx, y: y + dir.dy }].filter((cell) => inside(cell.x, cell.y));
  }
  if (weapon.area === "surround") {
    return [
      { x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 },
      { x: x - 1, y },                         { x: x + 1, y },
      { x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 },
    ].filter((cell) => inside(cell.x, cell.y));
  }
  if (weapon.area === "wide331") {
    const perpendicular = dir.dx !== 0 ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const cells = [];
    for (const distance of [1, 2]) {
      for (const side of [-1, 0, 1]) {
        cells.push({
          x: x + dir.dx * distance + perpendicular.x * side,
          y: y + dir.dy * distance + perpendicular.y * side,
        });
      }
    }
    cells.push({ x: x + dir.dx * 3, y: y + dir.dy * 3 });
    return cells.filter((cell) => inside(cell.x, cell.y));
  }
  if (weapon.area === "kogaChain") {
    const perpendicular = dir.dx !== 0 ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const cells = [];
    for (let distance = 1; distance <= 6; distance++) {
      cells.push({ x: x + dir.dx * distance, y: y + dir.dy * distance });
    }
    for (const distance of [1, 2, 5, 6]) {
      for (const side of [-1, 1]) {
        cells.push({
          x: x + dir.dx * distance + perpendicular.x * side,
          y: y + dir.dy * distance + perpendicular.y * side,
        });
      }
    }
    return cells
      .filter((cell, index, list) => inside(cell.x, cell.y) && list.findIndex((candidate) => candidate.x === cell.x && candidate.y === cell.y) === index);
  }
  const lineMatch = /^line(\d+)$/.exec(weapon.area || "");
  if (lineMatch) {
    const distance = Number(lineMatch[1]);
    const cells = [];
    for (let step = 1; step <= distance; step++) {
      cells.push({ x: x + dir.dx * step, y: y + dir.dy * step });
    }
    return cells.filter((cell) => inside(cell.x, cell.y));
  }
  if (weapon.area === "fan") {
    const shapes = {
      up: [{ x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y }, { x: x + 1, y }],
      down: [{ x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }, { x: x - 1, y }, { x: x + 1, y }],
      left: [{ x: x - 1, y: y - 1 }, { x: x - 1, y }, { x: x - 1, y: y + 1 }, { x, y: y - 1 }, { x, y: y + 1 }],
      right: [{ x: x + 1, y: y - 1 }, { x: x + 1, y }, { x: x + 1, y: y + 1 }, { x, y: y - 1 }, { x, y: y + 1 }],
    };
    return (shapes[dir.name] || []).filter((cell) => inside(cell.x, cell.y));
  }
  const shapes = {
    up: [{ x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 }],
    down: [{ x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }],
    left: [{ x: x - 1, y }, { x: x - 1, y: y + 1 }],
    right: [{ x: x + 1, y }, { x: x + 1, y: y + 1 }],
  };
  return (shapes[dir.name] || []).filter((cell) => inside(cell.x, cell.y));
}
// Checks whether a cell is inside the current weapon attack shape.
function isCellInWeaponRange(attacker, cell, dir) {
  return weaponAreaCells(attacker, dir).some((hitCell) => hitCell.x === cell.x && hitCell.y === cell.y);
}

// Uses special weapon shapes to pick direction before falling back to pointer angle.
function weaponDirectionFromTarget(attacker, target) {
  const preferred = directionFromTarget(attacker, target);
  if (preferred && isCellInWeaponRange(attacker, target, preferred)) return preferred;
  const directions = [
    { name: "up", dx: 0, dy: -1 },
    { name: "down", dx: 0, dy: 1 },
    { name: "left", dx: -1, dy: 0 },
    { name: "right", dx: 1, dy: 0 },
  ];
  return directions.find((dir) => isCellInWeaponRange(attacker, target, dir)) || preferred;
}

// Gets the weapon animation anchor; most animations use the adjacent forward cell.
function weaponSlashAnchorCell(attacker, dir) {
  const weapon = weaponDefinitionByKey[attacker.weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
  if (weapon.area === "surround") return { x: attacker.x, y: attacker.y };
  return { x: attacker.x + dir.dx, y: attacker.y + dir.dy };
}
// Scans weapon AOE cells; every enemy and breakable object in range is hit.
function weaponHitInDirection(attacker, dir) {
  const hits = { units: [], objects: [] };
  for (const cell of weaponAreaCells(attacker, dir)) {
    const unit = unitAt(cell.x, cell.y);
    if (unit && unit.team !== attacker.team && !isUnitInvincible(unit)) {
      hits.units.push(unit);
    }

    const object = objectAt(cell.x, cell.y);
    if (object?.breakable) {
      hits.objects.push(object);
    }
  }
  return hits;
}

// Adds one slash animation and plays the weapon sound.
function playSlash(attacker, target) {
  const weapon = weaponDefinitionByKey[attacker.weaponKey] || weaponDefinitionByKey[defaultWeaponKey];
  playSound(weapon?.soundKey || "slash");
  if (!state.attacks) state.attacks = [];
  const direction = directionFromTarget(attacker, target)?.name || attacker.facing;
  state.attacks.push({
    from: { x: attacker.x, y: attacker.y },
    to: { x: target.x, y: target.y },
    direction,
    weaponKey: attacker.weaponKey || defaultWeaponKey,
    startedAt: performance.now(),
    duration: weapon?.cooldownMs || weaponCooldownMs,
    side: attacker.id % 2 === 0 ? -1 : 1,
  });
}


