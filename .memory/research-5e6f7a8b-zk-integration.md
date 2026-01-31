---
id: 5e6f7a8b
title: ZK Integration & Pi Extensions Research
created_at: 2026-01-31T21:00:00Z
updated_at: 2026-01-31T21:00:00Z
status: completed
epic_id: f1e2d3c4
phase_id: null
related_task_id: null
---

# ZK Integration & Pi Extensions Research

## Research Questions
1. How does `zk` work and what are its key commands?
2. How do we create a `pi` package?
3. How do we implement tool interception in `pi`?
4. How do we register custom tools in `pi`?

## Summary
`zk` is a CLI tool for plain text note-taking. `pi` allows creating packages that bundle extensions. Extensions can intercept tool calls and register new tools.

## Findings

### ZK CLI
- `zk` is installed and available.
- **Key Commands**:
  - `zk init`: Create notebook.
  - `zk new`: Create note.
  - `zk list`: List notes.
  - `zk edit`: Edit notes.
  - `zk notebook`: Manage notebooks.
- **Flags**: `--notebook-dir` allows specifying the notebook location manually, which is crucial for our "Context Awareness" epic.

### Pi Packages
- Defined in `package.json` with a `pi` key or convention directories (`extensions/`, `skills/`, etc.).
- Can be installed from npm, git, or local paths.
- We should use the standard structure:
  ```
  package.json
  extensions/
    index.ts (or similar)
  src/
    (implementation details)
  ```

### Tool Interception
- Use `pi.on("tool_call", async (event, ctx) => { ... })`.
- `event` contains `toolName` and `input`.
- Return `{ block: true, reason: "..." }` to stop a tool.
- We can check if `event.input.path` (for file tools) is inside a `zk` notebook and block generic tools (`write`, `edit`) if so.

### Custom Tools
- Use `pi.registerTool({ name: "zk-list", ... })`.
- Can execute shell commands using `pi.exec("zk", ["list", ...])`.
- Can provide custom TUI rendering with `renderCall` and `renderResult`.

## References
- `zk --help`
- `pi` documentation: `packages.md`, `extensions.md`
