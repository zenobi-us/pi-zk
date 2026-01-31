---
id: 8f6e3d2a
title: Implement ZK New Tool
created_at: 2026-02-01T01:00:57+10:30
updated_at: 2026-02-01T01:00:57+10:30
status: todo
epic_id: 8c2d5e1f
phase_id: null
story_id: null
assigned_to: current
---

# Implement ZK New Tool

## Objective

Create a `zk_new` tool that allows agents to create new notes in a ZK vault with proper frontmatter support, tags, and notebook organization.

## Related Story

Part of the Blessed Tools epic - providing comprehensive ZK operations through dedicated tools.

## Steps

### 1. Research ZK New Command Capabilities
- [ ] Read ZK documentation for `zk new` command syntax
- [ ] Identify supported parameters:
  - `--title` or positional title argument
  - `--group` or `--notebook` for notebook selection
  - stdin support for content
  - template support
  - tag support (via frontmatter or flags)
- [ ] Determine how ZK handles:
  - Default templates
  - Frontmatter injection
  - Tag formatting
- [ ] Document findings in task file

### 2. Update ZkClient Class
- [ ] Add `new()` method to `src/lib/ZkClient.ts`
- [ ] Method signature should support:
  ```typescript
  async new(options: {
    title: string;
    content?: string;
    tags?: string[];
    notebook?: string;
    template?: string;
  }): Promise<{ path: string; title: string }>
  ```
- [ ] Handle content via stdin pipe if provided
- [ ] Build command args based on zk capabilities
- [ ] Parse output to extract created note path
- [ ] Return structured result with path and title

### 3. Write Tests for ZkClient.new()
- [ ] Create test file or extend `src/lib/ZkClient.test.ts`
- [ ] Test cases:
  - Basic note creation with title only
  - Note creation with content via stdin
  - Note creation with tags
  - Note creation in specific notebook
  - Note creation with template (if supported)
  - Error handling for invalid inputs
  - Error handling for ZK command failures
- [ ] Mock `execa` calls appropriately
- [ ] Verify all tests pass

### 4. Implement zk_new Tool
- [ ] Create tool definition in `src/extension.ts`
- [ ] Use ExtensionFactory pattern (similar to `zk_list`)
- [ ] Tool schema:
  ```typescript
  {
    name: "zk_new",
    description: "Create a new note in the ZK vault",
    parameters: {
      title: { type: "string", description: "Note title" },
      content: { type: "string", optional: true, description: "Note content" },
      tags: { type: "array", items: { type: "string" }, optional: true, description: "Tags" },
      notebook: { type: "string", optional: true, description: "Notebook/group name" }
    }
  }
  ```
- [ ] Implement handler using `zkClient.new()`
- [ ] Return structured success/error responses
- [ ] Include created note path in response

### 5. Write Tests for zk_new Tool
- [ ] Create test file or extend tool tests
- [ ] Test cases:
  - Tool registration
  - Successful note creation (various parameter combinations)
  - Error propagation from ZkClient
  - Response format validation
- [ ] Mock ZkClient appropriately
- [ ] Verify all tests pass

### 6. Integration Verification
- [ ] Run full test suite: `mise run test`
- [ ] Verify no linting errors: `mise run lint`
- [ ] Manual testing (if needed):
  - Load extension in Pi
  - Create test note with title only
  - Create test note with content
  - Create test note with tags
  - Verify notes created correctly in vault

## Expected Outcome

- ✅ `ZkClient.new()` method implemented with full parameter support
- ✅ Comprehensive tests for `ZkClient.new()` (100% coverage)
- ✅ `zk_new` tool registered and functional
- ✅ Tool tests passing
- ✅ All existing tests still passing
- ✅ Zero linting errors
- ✅ Documentation updated in code comments

## Actual Outcome

(To be filled during execution)

## Lessons Learned

(To be filled after completion)

## Dependencies

- ZK CLI must be installed and accessible
- Previous tasks completed:
  - Core ZkClient wrapper
  - ZK List tool (provides pattern reference)

## Notes

- Follow TDD approach: write tests first, then implementation
- Keep tool interface consistent with `zk_list` pattern
- Consider ZK's template system for future enhancement
- May need to handle different ZK versions/behaviors
- Content should be properly escaped when passed via stdin
