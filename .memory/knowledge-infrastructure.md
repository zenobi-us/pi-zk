---
id: 7b6c5d4e
title: Infrastructure & Tooling
created_at: 2026-01-31T22:15:00Z
updated_at: 2026-01-31T22:15:00Z
status: active
area: codebase-structure
tags:
  - infrastructure
  - tooling
  - mise
learned_from: task-9a8b7c6d
---

# Infrastructure & Tooling

## Overview
This project uses **Mise** as the primary task runner and environment manager. While `package.json` scripts exist, they are proxies that delegate to `mise` tasks to ensure consistency across environments.

## Details

### Task Runner: Mise
- **Configuration**: `mise.toml` defines the project's tools and tasks.
- **Execution**: Run tasks using `mise run <task>`.
- **Standard Tasks**:
  - `build`: Builds the project (target: Bun).
  - `test`: Runs tests using Vitest.
  - `lint`: Lints code using ESLint.
  - `format`: Formats code using Prettier.

### Package Scripts
- `package.json` scripts (`npm start`, `npm test`, etc.) are configured to call the corresponding `mise run` commands.
- This ensures that tools (bun, node, etc.) are version-managed by Mise even when invoked via npm/bun scripts.

### Development Environment
- **Runtime**: Bun (managed by Mise).
- **Package Manager**: Bun.
- **Languages**: TypeScript (ESNext).

## Conventions
- **Do not** manually run `bun build` or `bun test` unless debugging specific flags; prefer `mise run build` / `mise run test`.
- **Do not** bypass Mise when adding new lifecycle scripts; add them to `mise.toml` first, then proxy in `package.json` if needed.
