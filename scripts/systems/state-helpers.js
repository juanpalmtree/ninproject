// ===== Unit State Helpers =====
// Clears the pressed unit, drag line, and charging state.
function clearDragState() {
  state.pressedUnit = null;
  state.dragMoved = false;
  state.charging = false;
}

// Formats damage values for the result screen.
function formatDamage(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

// Formats milliseconds as mm:ss match time.
function formatMatchTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Checks whether a pointer coordinate is inside a rectangular button.
function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

// Gets the currently controllable player unit.
function selectedUnit() {
  return state.units.find((u) => u.id === state.selectedId && u.alive);
}

// Checks whether a unit is player-controlled; player units are not moved by AI.
function canControlUnit(unit) {
  return unit?.controlMode === "player";
}

// Gets the unit whose data should be shown in the HUD.
function selectedHudUnit() {
  return state.units.find((u) => u.id === state.selectedId) || selectedUnit();
}
