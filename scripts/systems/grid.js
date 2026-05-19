// ===== Grid / Coordinate Helpers =====
// Converts internal grid coordinates to player-facing coordinates: the bottom-left walkable cell is [1,1].
function displayCellCoord(cell) {
  return {
    x: cell.x - 1,
    y: grid.rows - 1 - cell.y,
  };
}

// Converts player-facing coordinates back to internal grid coordinates.
function internalCellCoord(cell) {
  return {
    x: cell.x + 1,
    y: grid.rows - 1 - cell.y,
  };
}

// Finds the unit on a cell.
function unitAt(x, y) {
  return state.units.find((u) => u.alive && u.x === x && u.y === y && !(typeof isYashaoHiddenFromMatch === "function" && isYashaoHiddenFromMatch(u)));
}

// Checks whether a cell is occupied by a unit.
function occupied(x, y) {
  return Boolean(unitAt(x, y));
}

// Finds the map object on a cell.
function objectAt(x, y) {
  if (!state.objects) return null;
  return state.objects.find((object) => object.alive && object.x === x && object.y === y) || null;
}

// Gets the orthogonal neighbors of a cell.
function neighbors(x, y) {
  return [{ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 }];
}

// Calculates Manhattan distance between two cells.
function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Clamps a value between a minimum and maximum.
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Checks whether two cells form a horizontal or vertical move.
function isStraightMove(a, b) {
  return a.x === b.x || a.y === b.y;
}

// Checks whether a cell is inside the map bounds.
function inside(x, y) {
  return x >= 0 && x < grid.cols && y >= 0 && y < grid.rows;
}

// Checks whether a cell is blocked by permanent obstacles or objects.
function isBlockedCell(x, y) {
  return isPermanentObstacle(x, y) || Boolean(objectAt(x, y));
}

// Checks whether a cell is an unbreakable outer obstacle.
function isPermanentObstacle(x, y) {
  if (!inside(x, y)) return true;
  if (x === 0 || x === grid.cols - 1) return true;
  if (y === 0 || y === grid.rows - 1) return true;
  if (x === 1 || x === grid.cols - 2) return true;
  return false;
}

// Checks whether the pointer is still over the pressed unit.
function pointerIsOnUnit(unit) {
  if (!state.pointer.cell) return false;
  return state.pointer.cell.x === unit.x && state.pointer.cell.y === unit.y;
}

// Gets the screen rectangle for a cell.
function cellRect(x, y) {
  return { x: grid.left + x * grid.cell, y: grid.top + y * grid.cell, w: grid.cell, h: grid.cell };
}

// Gets the screen center point for a cell.
function cellCenter(x, y) {
  return { x: grid.left + x * grid.cell + grid.cell / 2, y: grid.top + y * grid.cell + grid.cell / 2 };
}

// Converts screen coordinates to a map cell.
function pointToCell(px, py) {
  const x = Math.floor((px - grid.left) / grid.cell);
  const y = Math.floor((py - grid.top) / grid.cell);
  return inside(x, y) ? { x, y } : null;
}

// Converts a pointer event to a map cell.
function eventCell(event) {
  pointerMove(event);
  return state.pointer.cell;
}
