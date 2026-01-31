---
id: 8c2d5e1f
title: Blessed Tools Implementation
created_at: 2026-01-31T09:53:01Z
updated_at: 2026-01-31T09:53:01Z
status: proposed
---

# Blessed Tools Implementation

## Vision/Goal
Implement a suite of "blessed" tools that wrap `zk` functionality, ensuring all operations (Search, Update, Create, Remove, Move, List Notebooks, Register Context) adhere to project standards and context awareness.

## Success Criteria
- [ ] `zk-search` tool implemented.
- [ ] `zk-update` tool implemented.
- [ ] `zk-create` tool implemented.
- [ ] `zk-remove` tool implemented.
- [ ] `zk-move` tool implemented.
- [ ] `zk-list-notebooks` tool implemented.
- [ ] `zk-register-context` tool implemented.
- [ ] All tools integrated with `pi` tool system.

## Phases

### Phase 1: Core Wrapper & Basic Tools
- [ ] **Common Wrapper Logic**: Develop a robust TypeScript wrapper to interface with the `zk` binary, handling command execution, output parsing, and error management.
- [ ] **Implement `zk-list`**: Create the `zk-list` tool to list notes within a notebook, supporting filtering and sorting.
- [ ] **Implement `zk-new`**: Create the `zk-new` tool to create new notes with proper frontmatter and templates.
- [ ] **Implement `zk-search`**: Create the `zk-search` tool to perform full-text and tag-based searches across notebooks.

### Phase 2: Manipulation Tools
- [ ] **Implement `zk-edit`**: Create the `zk-edit` tool to modify existing notes, ensuring content integrity.
- [ ] **Implement `zk-mv`**: Create the `zk-mv` tool to rename or move notes, updating links as necessary.
- [ ] **Implement `zk-rm`**: Create the `zk-rm` tool to safely delete notes.


## Dependencies
- Epic 1 (Scaffolding)
