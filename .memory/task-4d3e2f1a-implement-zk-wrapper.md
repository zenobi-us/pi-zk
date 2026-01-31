---
id: task-4d3e2f1a-implement-zk-wrapper
epic: epic-8c2d5e1f-blessed-tools.md
status: completed
owner: Antigravity
created_at: 2026-01-31
updated_at: 2026-01-31
---

# Implement Core ZK Wrapper

## Goal
Create a robust TypeScript wrapper to interface with the `zk` binary. This will serve as the foundation for all specific `zk` tools.

## Context
We need a standard way to execute `zk` commands from our TypeScript code, handling:
- Command construction
- Environment setup (e.g. `ZK_NOTEBOOK_DIR`)
- Output parsing (JSON preferred)
- Error handling

## Requirements
- [x] Create `src/lib/zk-client.ts`
- [x] Implement `exec` method that spawns `zk` process
- [x] Support passing arguments and options
- [x] Handle `stdout` and `stderr`
- [x] Unit tests for the wrapper (mocking child_process)

## Definition of Done
- `ZkClient` class exists and can successfully run `zk --version` or similar.
- Tests pass.

## Actual Outcome
Implemented `ZkClient` class using `Bun.spawn` with support for dependency injection of the spawner for testing. Created comprehensive tests in `tests/zk-client.test.ts` covering success, error handling, empty output, and argument passing.
