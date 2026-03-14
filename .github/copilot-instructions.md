# Repository-wide Copilot Instructions

## Project overview

This repo is a browser-only demo for a fictional EV car configurator called **Voltara**.
There is no build step, no back-end, no package manager, and no framework — just plain HTML, CSS, and JavaScript served as static files.

## General rules

- Prefer plain, simple solutions over frameworks unless explicitly requested.
- Keep changes small and easy to review.
- Do not add build steps or dependencies unless explicitly requested.
- Always update `README.md` when the repository structure or workflow changes.
- Prefer deterministic pricing logic and clear naming.
- Do not change deployment or infrastructure configuration unless explicitly requested.

## Code style

- Use vanilla JavaScript (ES5/ES6); avoid TypeScript or transpilers.
- Keep pricing data in named constants at the top of `app.js`.
- Write self-descriptive variable and function names; avoid abbreviations.
- Limit functions to a single responsibility.

## File structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `style.css` | All styling |
| `app.js` | Pricing logic and DOM updates |
| `README.md` | Project and workflow documentation |
| `.github/copilot-instructions.md` | This file — repository-wide AI instructions |
| `.github/agents/` | Custom agent profiles |

## Constraints

- Everything must run in a modern browser with no local setup.
- No AWS, no CI pipeline changes, no server-side logic — unless explicitly requested.
