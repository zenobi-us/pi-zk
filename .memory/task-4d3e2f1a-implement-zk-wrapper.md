---
id: task-4d3e2f1a-implement-zk-wrapper
epic: epic-8c2d5e1f-blessed-tools.md
status: todo
owner: Antigravity
created_at: 2026-01-31
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
- [ ] Create `src/lib/zk-client.ts`
- [ ] Implement `exec` method that spawns `zk` process
- [ ] Support passing arguments and options
- [ ] Handle `stdout` and `stderr`
- [ ] Unit tests for the wrapper (mocking child_process)

## Definition of Done
- `ZkClient` class exists and can successfully run `zk --version` or similar.
- Tests pass.
