# Task: Align Package Scripts with Mise Tasks

## Status
- [x] Investigate current setup (Complete)
- [x] Create memory task file (Complete)
- [x] Update package.json scripts (Complete)
- [x] Verify mise tasks (Complete)

## Context
The user reported "the scaffolding task is wrong we already use mise tasks". The project has a `.mise/tasks` directory with shell scripts for `build`, `test`, `lint`, etc., but `package.json` lacks the corresponding `scripts` block to delegate to them.

## Plan
1.  Add `scripts` to `package.json` that call `mise run <task>`.
2.  Ensure `package.json` works seamlessly with `mise`.

## Notes
- Mise tasks found: `build`, `test`, `lint`, `lint:fix`, `format`, `typecheck`, etc.
- `package.json` currently has no scripts.
