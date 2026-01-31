---
id: b4a9c6d3
title: Tool Interception & Hooks
created_at: 2026-01-31T09:53:01Z
updated_at: 2026-01-31T09:53:01Z
status: proposed
---

# Tool Interception & Hooks

## Vision/Goal
Implement an interception layer to prevent generic file manipulation tools (like `write`, `edit`) from directly modifying `zk` vaults, ensuring data integrity and adherence to "Blessed Tools" usage.

## Success Criteria
- [ ] Mechanism to detect and block generic tool access to vault paths.
- [ ] Helpful error messages redirecting users/agents to blessed tools.
- [ ] Whitelist/bypass mechanism for authorized operations (if needed).

## Phases

### Phase 1: Interception Logic
- [ ] **`pi-mono` Hook Implementation**: Implement the `onToolCall` hook within the extension to intercept tool execution requests before they reach the core agent logic.
- [ ] **Vault Path Detection**: Develop a utility function to determine if a targeted file path resides within a discovered `zk` vault.
- [ ] **Access Control Logic**: Implement the enforcement logic to block generic tools (`read`, `edit`, `write`) when targeting vault paths, while explicitly allowing the blessed `zk-*` tools.


## Dependencies
- Epic 2 (Blessed Tools) - Need alternatives before blocking.
