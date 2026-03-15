# Voltara EV Configurator

A tiny fictional electric-vehicle configurator built as a static demo — no build step, no back-end, no dependencies.

## File structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup — header, option cards (model / battery / color), and a live summary sidebar |
| `style.css` | All styling — responsive layout, card components, color swatches, and the summary panel |
| `app.js` | Pricing logic, live DOM updates, share URL handling, and dark mode logic |
| `README.md` | This file |
| `tests/static-check.sh` | Dependency-free shell script that validates required files and expected code patterns |

## How the pricing logic works

All prices are defined as plain JavaScript objects at the top of `app.js`:

```
Base price  (model)   Urban €34,900 · Touring €42,900 · Performance €54,900
Battery surcharge     60 kWh +€0 · 80 kWh +€5,000 · 100 kWh +€11,000
Color surcharge       White +€0 · Black +€700 · Blue +€900 · Red +€1,200
```

Every time the user changes any radio button, `updateConfigurator()` reads the three currently-selected values, looks up each price, sums them, and writes the result directly into the DOM — no page reload required.

## Dark mode

Click the **🌙 / ☀️** button in the top-right corner of the header to toggle between light and dark mode. The chosen theme is saved to `localStorage` and automatically restored on the next visit. If `localStorage` is unavailable (e.g. private browsing), the page defaults to light mode gracefully.

## Sharing a configuration

Click the **Share configuration** button in the summary panel. A URL is generated with the current selections as query parameters, for example:

```
index.html?model=touring&battery=80&color=blue
```

Click **Copy link** to copy the URL to the clipboard, then share it with anyone. When the page loads with those parameters, `loadFromURL()` reads them and restores the model, battery, and color automatically before the first render. URLs are parsed case-insensitively, so `Touring` and `touring` both work. Any unrecognised or missing value falls back safely to the default (`Urban`, `60`, `White`).

## Running locally

Open `index.html` in any modern browser. No server or build step is needed.

## Running the static checks

```
bash tests/static-check.sh
```

The script requires no dependencies and exits non-zero if any check fails.

## CI checks

`.github/workflows/validate.yml` runs on every push to `main` and on every pull request. It checks that the four core files (`index.html`, `style.css`, `app.js`, `README.md`) are all present. The workflow has no dependencies and requires no local setup — it simply fails if any of those files is missing.

## GitHub Pages

Because the app is entirely static (plain HTML / CSS / JS), it can be hosted on GitHub Pages without any additional configuration: just point GitHub Pages at the repository root on the `main` branch.

---

## GitHub Copilot team scaffold

This repository uses **GitHub Copilot** as a small specialized software team.

### Repository custom instructions

The file `.github/copilot-instructions.md` contains repository-wide rules that every Copilot session applies automatically — things like "no frameworks", "no build steps", and "always update README". This keeps all AI-assisted work consistent with the project's constraints.

### Custom agent profiles

Four agent profiles live in `.github/agents/`. Each one focuses Copilot on a specific role:

| Agent file | Role |
|-----------|------|
| `frontend-builder.agent.md` | UI work — HTML, CSS, JavaScript, responsiveness, UX polish |
| `reviewer.agent.md` | Code review — correctness, edge cases, minimal fixes |
| `ops.agent.md` | Automation — GitHub Actions, deployment, repository configuration |
| `planner.agent.md` | Planning — breaks work into steps and suggests which agent should handle each part |

### Intended workflow

```
New issue
   │
   ▼
Coding agent opens a PR
   │
   ▼
reviewer agent reviews the PR (correctness, edge cases)
   │
   ▼
Human reviews and merges
```

1. A new issue describes a feature or bug.
2. A coding agent (e.g. **frontend-builder**) implements the change and opens a PR.
3. The **reviewer** agent inspects the PR and leaves comments or approves.
4. A human does a final review and merges.

---

*Voltara is a fictional brand. No real vehicles are sold.*