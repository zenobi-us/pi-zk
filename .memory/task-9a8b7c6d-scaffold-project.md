---
id: 9a8b7c6d
title: Initialize Pi-ZK Package Scaffolding
created_at: 2026-01-31T21:05:00Z
updated_at: 2026-01-31T21:05:00Z
status: todo
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
1. [ ] Initialize `package.json` with `bun init`.
2. [ ] Add `pi-package` keyword and `pi` configuration to `package.json`.
3. [ ] Install dev dependencies: `typescript`, `@types/node`, `eslint`, `prettier`, `vitest`, `@mariozechner/pi-coding-agent`.
4. [ ] Create `tsconfig.json` optimized for Bun/Pi extensions.
5. [ ] Create `mise.toml` for tool management.
6. [ ] Create basic directory structure (`src/`, `extensions/`, `tests/`).
7. [ ] Verify build/test scripts run (even if empty).

## Expected Outcome
A clean, buildable project repository ready for extension development.
