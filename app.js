// ── Pricing tables ────────────────────────────────────────────────────────────

const MODEL_PRICES = {
  Urban:       34900,
  Touring:     42900,
  Performance: 54900,
};

const BATTERY_SURCHARGES = {
  "60": 0,
  "80": 5000,
  "100": 11000,
};

const COLOR_SURCHARGES = {
  White: 0,
  Black: 700,
  Blue:  900,
  Red:   1200,
};

const COLOR_LABELS = {
  White: "Alpine White",
  Black: "Midnight Black",
  Blue:  "Ocean Blue",
  Red:   "Racing Red",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatEUR(amount) {
  return "€" + amount.toLocaleString("en-US");
}

function formatSurcharge(amount) {
  return amount === 0 ? "Included" : "+" + formatEUR(amount);
}

// ── Core update function ──────────────────────────────────────────────────────

function updateConfigurator() {
  const model   = document.querySelector('input[name="model"]:checked').value;
  const battery = document.querySelector('input[name="battery"]:checked').value;
  const color   = document.querySelector('input[name="color"]:checked').value;

  const basePrice     = MODEL_PRICES[model];
  const batterySurch  = BATTERY_SURCHARGES[battery];
  const colorSurch    = COLOR_SURCHARGES[color];
  const total         = basePrice + batterySurch + colorSurch;

  // Update summary values
  document.getElementById("sum-model").textContent        = model;
  document.getElementById("sum-battery").textContent      = battery + " kWh";
  document.getElementById("sum-color").textContent        = COLOR_LABELS[color];
  document.getElementById("sum-base").textContent         = formatEUR(basePrice);
  document.getElementById("sum-battery-price").textContent = formatSurcharge(batterySurch);
  document.getElementById("sum-color-price").textContent  = formatSurcharge(colorSurch);

  // Update total
  document.getElementById("total-price").textContent = formatEUR(total);
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.querySelectorAll('input[name="model"], input[name="battery"], input[name="color"]')
  .forEach(function(input) {
    input.addEventListener("change", updateConfigurator);
  });

// ── Initial render ────────────────────────────────────────────────────────────

updateConfigurator();
