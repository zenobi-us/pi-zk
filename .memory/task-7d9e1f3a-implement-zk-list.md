---
id: 7d9e1f3a
title: Implement ZK List Tool
created_at: 2026-01-31T23:48:00+10:30
updated_at: 2026-02-01T00:51:00+10:30
status: completed
epic_id: 8c2d5e1f
phase_id:
assigned_to: current-session
---

# Implement ZK List Tool

## Objective
Implement the `zk_list` tool to allow the agent to search and list notes using the `zk` binary. This tool will be the first "blessed tool" in the pi-zk extension, enabling agents to discover and list notes within a zk notebook.

## Related Story
Part of Epic: [Blessed Tools Implementation](epic-8c2d5e1f-blessed-tools.md)
Phase 1: Core Wrapper & Basic Tools

## Steps

### 1. Refactor Extension to ExtensionFactory Pattern
- [x] Update `src/extension.ts` to export default function instead of class
- [x] Function should accept `ExtensionAPI` parameter
- [x] Register tools using `pi.registerTool()`
- [x] Removed old class-based implementation

### 2. Implement Tool Registration
- [x] Call `pi.registerTool('zk_list', ...)` in factory function
- [x] Define TypeBox schema for tool arguments:
  - `tags`: optional string array for filtering by tags
  - `query`: optional string for full-text search
  - `sort`: optional string for sorting (e.g., "created", "modified", "title")
  - `limit`: optional number to limit results
- [x] Implement tool handler function that:
  - Constructs `ZkClient` instance with appropriate notebook directory
  - Maps tool arguments to `zk list` CLI flags
  - Calls `zkClient.list(args)` with mapped arguments
  - Formats output for agent consumption (summary + details)
  - Handles errors gracefully with clear messages

### 3. Argument Mapping Logic
- [x] Map `tags` array to `--tag` flags (e.g., `["work", "urgent"]` → `["--tag", "work", "--tag", "urgent"]`)
- [x] Map `query` to `--match` flag (e.g., `"meeting notes"` → `["--match", "meeting notes"]`)
- [x] Map `sort` to `--sort` flag (e.g., `"created"` → `["--sort", "created"]`)
- [x] Map `limit` to `--limit` flag (e.g., `10` → `["--limit", "10"]`)

### 4. Response Formatting
- [x] Return machine-readable and human-readable text format
- [x] Include metadata: total count, notebook location
- [x] For each note, show: title, path, created/modified dates
- [x] Handle empty results gracefully

### 5. Testing
- [x] Updated `tests/extension.test.ts` for extension factory pattern
- [x] Created `tests/zk-list-tool.test.ts` for tool logic
- [x] Test cases:
  - Tool registration succeeds
  - Arguments are correctly mapped to CLI flags
  - ZkClient.list is called with correct arguments
  - Output is properly formatted
  - Errors are handled gracefully
  - Empty results are handled
- [x] Use mocks for ZkClient to avoid requiring actual `zk` binary

### 6. Documentation
- [x] Add JSDoc comments to tool types and interfaces
- [ ] Update README.md with tool usage examples (deferred)
- [ ] Document supported arguments and their behaviors (deferred)

## Expected Outcome
- `src/extension.ts` uses ExtensionFactory pattern
- `zk_list` tool is registered and functional
- Agent can list notes with filtering, sorting, and limiting
- All tests pass (unit and integration)
- Documentation is complete

## Actual Outcome
Successfully implemented the `zk_list` tool with the following accomplishments:

1. **ExtensionFactory Pattern**: Refactored `src/extension.ts` from class-based to factory function pattern, accepting `ExtensionAPI` and registering tools directly.

2. **Tool Implementation**: Created `zk_list` tool with:
   - TypeBox schema for type-safe parameters (tags, query, sort, limit)
   - Argument mapping to zk CLI flags
   - Proper error handling with informative messages
   - Human-readable output formatting

3. **Testing**: 
   - 14 tests pass (100% pass rate)
   - Comprehensive test coverage for argument mapping, output formatting, error handling
   - Updated extension tests for factory pattern
   - Created dedicated zk-list-tool tests

4. **Code Quality**:
   - Zero linting errors (only warnings for test mocks using `any`)
   - Build passes successfully
   - All tests pass

## Lessons Learned

1. **Pi Extension API**: The ExtensionFactory pattern is straightforward - just a function that receives `ExtensionAPI` and calls `registerTool()`. Much simpler than the old class-based approach.

2. **TypeBox for Schemas**: Using `@sinclair/typebox` provides excellent type safety and integrates seamlessly with Pi's tool system. The `Type.Object()` API is intuitive.

3. **Testing Strategy**: Testing ZkClient separately from the tool logic allowed for cleaner, more focused tests. Mocking spawn at the ZkClient level was cleaner than trying to mock at the tool level.

4. **Error Handling**: Catching errors in the tool handler and returning them as tool results (rather than throwing) provides better UX for agents, who can see what went wrong in their context.

5. **Bun Globals**: Need to add `Blob` and `Response` to ESLint globals config when working with Bun runtime.
