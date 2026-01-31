---
id: 9a8b7c6d
title: Initialize Pi-ZK Package Scaffolding
created_at: 2026-01-31T21:05:00Z
updated_at: 2026-01-31T21:51:00Z
status: completed
epic_id: 3f7a91b2
phase_id: null
assigned_to: current
---

# Initialize Pi-ZK Package Scaffolding

## Objective
Set up the initial project structure for `pi-zk` as a valid `pi` package with TypeScript, Bun, and linting configurations.

## Related Story
None (Foundational task)

## Steps
1. [x] Initialize `package.json` with `bun init`.
2. [x] Add `pi-package` keyword and `pi` configuration to `package.json`.
3. [x] Install dev dependencies: `typescript`, `@types/node`, `eslint`, `prettier`, `vitest`, `@mariozechner/pi-coding-agent`.
4. [x] Create `tsconfig.json` optimized for Bun/Pi extensions.
5. [x] Create `mise.toml` for tool management.
6. [x] Create basic directory structure (`src/`, `extensions/`, `tests/`).
7. [x] Verify build/test scripts run (even if empty).

## Expected Outcome
A clean, buildable project repository ready for extension development.

## Actual Outcome
Project structure verified and updated.
- `package.json` updated with keywords, scripts, and dependencies.
- `tsconfig.json` verified.
- `mise.toml` verified.
- Directory structure (`src`, `extensions`, `tests`) created.
- `src/extension.ts` created.
- `tests/extension.test.ts` created and passing.
- Build script verified.

### Correction (2026-01-31)
User clarified that `mise` was already established as the task runner and scaffolding was largely complete. The `package.json` scripts were updated to proxy to `mise` tasks rather than replacing them. Future tasks should respect `mise.toml` as the source of truth for build/test operations.
