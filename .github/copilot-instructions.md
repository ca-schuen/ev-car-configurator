# Repository instructions for GitHub Copilot

This repository is a lightweight EV car configurator demo.

## Core principles

- Keep the project simple.
- Prefer static solutions.
- Avoid unnecessary dependencies.
- Make small, reviewable changes.
- Preserve existing behavior unless the task explicitly requires a change.

## Technology assumptions

This project should remain as lightweight as possible.

Preferred stack:
- HTML
- CSS
- Vanilla JavaScript
- small shell-based validation in `tests/`

Avoid by default:
- frameworks
- package managers
- backend services
- build steps
- test frameworks
- large architectural rewrites

Do not introduce any of the above unless the task clearly requires it.

## Main files

The most important files are usually:

- `index.html`
- `style.css`
- `app.js`
- `README.md`
- `tests/static-check.sh`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

## Code change philosophy

- Prefer minimal diffs over broad rewrites.
- Reuse existing patterns, naming, and structure.
- Do not refactor unrelated code.
- Do not invent abstractions without a clear need.
- If a task can be solved in one existing file, prefer that over creating new files.
- Keep logic readable and beginner-friendly.

## Frontend guidance

For frontend work:

- Keep interaction logic straightforward.
- Preserve safe fallback behavior.
- Preserve or improve accessibility where relevant.
- Preserve reduced-motion behavior for animations and transitions.
- Avoid brittle DOM logic.
- Prefer explicit state handling over hidden side effects.

When working on sharing, URL state, or configuration state:
- use safe defaults
- handle invalid values gracefully
- maintain backward compatibility where reasonable

## Testing and validation guidance

Preferred validation style:
- dependency-free
- cheap to run
- easy to understand

Preferred location:
- `tests/static-check.sh`

Do not introduce heavy test infrastructure unless explicitly required.

Validation should focus on:
- required files existing
- expected static behavior
- concrete regressions for the current feature
- clear PASS / FAIL output

## CI and workflow guidance

Workflow files are high-impact.

- Edit `.github/workflows/*` only when truly necessary.
- Keep CI minimal and readable.
- Preserve existing checks unless there is a good reason to change them.
- Prefer explicit shell commands over clever workflow complexity.
- Do not change deployment logic unless the task explicitly concerns CI/CD or deployment.

## Agent responsibilities

This repository uses a coordinated multi-agent workflow.

### Planner
Use for:
- planning
- scope reduction
- identifying affected files
- identifying risks and validation ideas

Planner should not edit files.

### Frontend
Use for:
- HTML
- CSS
- JavaScript
- small README updates tied to user-visible behavior

### Backend
Use only when the task truly requires non-static behavior.

### TDD
Use for:
- minimal validation
- improving `tests/static-check.sh`
- determining whether the implementation really satisfies the requested behavior

TDD should prefer lightweight checks over heavy infrastructure.

### Repair
Use for:
- concrete failures from TDD or review
- small, targeted fixes

Repair should not do broad cleanup.

### Ops
Use for:
- CI changes
- workflow wiring
- deployment and repository automation changes

Ops should be conservative.

### Orchestrator
The orchestrator should:
- start with planning
- delegate implementation to the right specialist
- run validation
- trigger repair when needed
- involve ops only when required
- stop when the result is reviewable and validated

## Parallelization rules

Parallelization is allowed only for clearly independent work.

Safe parallel examples:
- frontend and documentation if they do not touch the same files
- implementation and non-overlapping validation planning
- separate independent areas of work

Unsafe parallel examples:
- two agents editing `app.js`
- two agents editing `style.css`
- two agents editing the same workflow file
- implementation and repair on the same file set at the same time

When in doubt, prefer sequential execution.

## Documentation expectations

Update `README.md` when:
- user-visible behavior changes
- sharing/configuration behavior changes
- validation usage changes
- workflow usage for contributors changes

Do not bloat the README with internal noise.

## What good output looks like

A good result in this repository is:
- small
- understandable
- static-first
- validated
- easy to review
- easy to maintain

## What to avoid

Avoid:
- speculative redesign
- framework creep
- dependency creep
- hidden complexity
- editing many files without need
- making CI or workflows more complex than necessary
- rewriting working code just because a cleaner design seems possible

## Final rule

If the task is ambiguous, choose the smallest reasonable implementation that satisfies the request and state your assumption clearly.