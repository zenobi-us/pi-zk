---
id: a5b6c7d8
title: Frontmatter Enforcement
created_at: 2026-01-31T09:53:01Z
updated_at: 2026-01-31T09:53:01Z
status: proposed
---

# Frontmatter Enforcement

## Vision/Goal
Enforce strict validation rules for frontmatter in `zk` notes during write/update operations to ensure metadata consistency and queryability.

## Success Criteria
- [ ] Validation schema defined for note frontmatter.
- [ ] Integration with Blessed Tools (`zk-create`, `zk-update`) to validate before write.
- [ ] Error reporting for invalid frontmatter.

## Phases

### Phase 1: Schema & Validation
- [ ] **Define Frontmatter Schema**: Create a Zod schema to define the expected structure and types for note frontmatter.
- [ ] **Implement Validation Logic**: Write a standalone function that takes frontmatter data and validates it against the schema.
- [ ] **Create Validation Hook**: Develop a generic hook that can be used by interception layers and tools to enforce validation before writing.


## Dependencies
- Epic 2 (Blessed Tools)
