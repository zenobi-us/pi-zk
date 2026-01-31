---
id: 8e7d6c5b
title: Align Package Scripts with Mise Tasks
created_at: 2026-01-31T22:00:00Z
updated_at: 2026-01-31T22:15:00Z
status: completed
epic_id: 3f7a91b2
phase_id: null
assigned_to: current
---

# Align Package Scripts with Mise Tasks

## Objective
Ensure `package.json` scripts align with the project's established `mise` task runner workflow, correcting previous scaffolding assumptions.

## Related Story
None

## Steps
1. [x] Investigate current setup: Confirm `mise.toml` or `.mise/tasks` usage.
2. [x] Update `package.json`: Add scripts that delegate to `mise run <task>`.
3. [x] Verify `mise` tasks: Ensure `build`, `test`, `lint` tasks exist and work.
4. [x] Documentation: Update memory to reflect `mise` primacy.

## Expected Outcome
`package.json` scripts (`npm test`, `npm run build`) successfully delegate to `mise`, maintaining a single source of truth for task definitions.

## Actual Outcome
- `package.json` scripts were updated to call `mise run` commands.
- Confirmed `mise` is the primary task runner.
- Memory updated to reflect this infrastructure decision.

## Lessons Learned
- Always check for existing task runners (`mise`, `make`, `just`) before scaffolding standard `npm` scripts.
- Trust the existing project structure (`mise.toml`) over generic templates.
