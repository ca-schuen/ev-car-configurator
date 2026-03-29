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

function buildSlugMapFromKeys(sourceObject) {
  var map = {};
  Object.keys(sourceObject).forEach(function (key) {
    var slug = String(key).toLowerCase();
    map[slug] = key;
  });
  return map;
}

const SLUG_TO_MODEL   = buildSlugMapFromKeys(MODEL_PRICES);
const SLUG_TO_BATTERY = buildSlugMapFromKeys(BATTERY_SURCHARGES);
const SLUG_TO_COLOR   = buildSlugMapFromKeys(COLOR_SURCHARGES);

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

// ── Share configuration ───────────────────────────────────────────────────────

function getValidSlug(raw, slugMap, fallback) {
  if (raw === null) return fallback;
  var resolved = slugMap[raw.toLowerCase()];
  return resolved !== undefined ? resolved : fallback;
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);

  const model   = getValidSlug(params.get("model"),   SLUG_TO_MODEL,   "Urban");
  const battery = getValidSlug(params.get("battery"), SLUG_TO_BATTERY, "60");
  const color   = getValidSlug(params.get("color"),   SLUG_TO_COLOR,   "White");

  const modelInput   = document.querySelector('input[name="model"][value="'   + model   + '"]');
  const batteryInput = document.querySelector('input[name="battery"][value="' + battery + '"]');
  const colorInput   = document.querySelector('input[name="color"][value="'   + color   + '"]');

  if (modelInput)   modelInput.checked   = true;
  if (batteryInput) batteryInput.checked = true;
  if (colorInput)   colorInput.checked   = true;
}

function generateShareURL() {
  const model   = document.querySelector('input[name="model"]:checked').value;
  const battery = document.querySelector('input[name="battery"]:checked').value;
  const color   = document.querySelector('input[name="color"]:checked').value;

  const params = new URLSearchParams({ model: model.toLowerCase(), battery: battery, color: color.toLowerCase() });
  return window.location.origin + window.location.pathname + "?" + params.toString();
}

function resetConfiguration() {
  var modelInput = document.querySelector('input[name="model"][value="Urban"]');
  var batteryInput = document.querySelector('input[name="battery"][value="60"]');
  var colorInput = document.querySelector('input[name="color"][value="White"]');

  if (modelInput) modelInput.checked = true;
  if (batteryInput) batteryInput.checked = true;
  if (colorInput) colorInput.checked = true;

  updateConfigurator();
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.querySelectorAll('input[name="model"], input[name="battery"], input[name="color"]')
  .forEach(function(input) {
    input.addEventListener("change", updateConfigurator);
  });

document.getElementById("share-btn").addEventListener("click", function() {
  var url = generateShareURL();
  var urlInput = document.getElementById("share-url");
  urlInput.value = url;
  document.getElementById("share-section").style.display = "block";
  urlInput.focus();
  urlInput.select();
});

document.getElementById("copy-btn").addEventListener("click", function() {
  var urlInput = document.getElementById("share-url");
  var copyBtn  = document.getElementById("copy-btn");
  navigator.clipboard.writeText(urlInput.value).then(function() {
    copyBtn.classList.add("copied");
    copyBtn.textContent = "✓ Copied!";
    setTimeout(function() {
      copyBtn.classList.remove("copied");
      copyBtn.textContent = "Copy link";
    }, 2000);
  }).catch(function() {
    urlInput.select();
    copyBtn.textContent = "Copy link";
    copyBtn.title = "Copy failed — please copy the URL manually";
    setTimeout(function() { copyBtn.title = ""; }, 3000);
  });
});

document.getElementById("reset-btn").addEventListener("click", resetConfiguration);

// ── Initial render ────────────────────────────────────────────────────────────

loadFromURL();
updateConfigurator();
