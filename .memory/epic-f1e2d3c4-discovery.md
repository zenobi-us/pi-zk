---
id: f1e2d3c4
title: Notebook Auto-Discovery & Context
created_at: 2026-01-31T09:53:01Z
updated_at: 2026-01-31T09:53:01Z
status: proposed
---

# Notebook Auto-Discovery & Context

## Vision/Goal
Implement logic to automatically discover `zk` notebooks within the project environment and register them as context for the agent, facilitating seamless knowledge retrieval.

## Success Criteria
- [ ] Auto-discovery logic scans for notebooks.
- [ ] Found notebooks are registered in agent context/memory.
- [ ] Updates to notebook structure are reflected in context.

## Phases

### Phase 1: Notebook Discovery Logic
- [ ] **Scan Default Paths**: Implement recursive search logic to find `.zk` markers in standard locations (e.g., current directory, home directory, known config paths).
- [ ] **Environment Variable Check**: Implement logic to check `ZK_NOTEBOOK_DIR` and other relevant environment variables for notebook locations.
- [ ] **Persist Configuration**: Create a mechanism to store and retrieve discovered notebook configurations (paths, aliases) to persist context across sessions.


## Dependencies
- Epic 1 (Scaffolding)
