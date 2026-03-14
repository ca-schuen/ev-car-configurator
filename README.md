# Voltara EV Configurator

A tiny fictional electric-vehicle configurator built as a static demo — no build step, no back-end, no dependencies.

## File structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup — header, option cards (model / battery / color), and a live summary sidebar |
| `style.css` | All styling — responsive layout, card components, color swatches, and the summary panel |
| `app.js` | Pricing logic and live DOM updates |
| `README.md` | This file |

## How the pricing logic works

All prices are defined as plain JavaScript objects at the top of `app.js`:

```
Base price  (model)   Urban €34,900 · Touring €42,900 · Performance €54,900
Battery surcharge     60 kWh +€0 · 80 kWh +€5,000 · 100 kWh +€11,000
Color surcharge       White +€0 · Black +€700 · Blue +€900 · Red +€1,200
```

Every time the user changes any radio button, `updateConfigurator()` reads the three currently-selected values, looks up each price, sums them, and writes the result directly into the DOM — no page reload required.

## Running locally

Open `index.html` in any modern browser. No server or build step is needed.

## GitHub Pages

Because the app is entirely static (plain HTML / CSS / JS), it can be hosted on GitHub Pages without any additional configuration: just point GitHub Pages at the repository root on the `main` branch.

---

*Voltara is a fictional brand. No real vehicles are sold.*
