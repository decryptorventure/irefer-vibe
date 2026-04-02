---
title: iRefer Frontend — Complete Implementation for Backend Handover
status: in_progress
priority: high
created: 2026-04-02
blockedBy: []
blocks: []
---

# iRefer Frontend — Complete Implementation

**Goal:** Hoàn thiện toàn bộ frontend, tách biệt layer data/service để dev chỉ cần swap mock service → real API là chạy được.

## Architecture Summary

```
React 19 + TypeScript + Vite + Tailwind v4 + shadcn/ui
├── src/types/          ← TypeScript interfaces (= API contracts)
├── src/services/       ← Mock service layer (swap to real API here)
├── src/hooks/          ← React Query data hooks
├── src/store/          ← Zustand (auth + UI state)
├── src/pages/          ← Full page components
└── src/components/     ← Reusable UI components
```

## Phases

| # | Phase | Status | Priority |
|---|-------|--------|----------|
| 01 | [Architecture & Data Layer Setup](phase-01-architecture-data-layer.md) | pending | critical |
| 02 | [Authentication & Protected Routes](phase-02-auth-login.md) | pending | critical |
| 03 | [Missing Pages: Profile, Rewards, Notifications](phase-03-missing-pages.md) | pending | high |
| 04 | [Refactor Existing Pages → Service Layer](phase-04-refactor-existing-pages.md) | pending | high |
| 05 | [Gamification Completeness](phase-05-gamification.md) | pending | medium |
| 06 | [UI Polish, Loading States & Responsive](phase-06-ui-polish.md) | pending | medium |
| 07 | [API Contract Docs & Handover Guide](phase-07-handover.md) | pending | high |

## Key Decisions

- **Data layer**: TanStack Query (React Query) v5 for server state
- **Auth state**: Zustand store
- **Mock data**: Isolated in `src/services/*.mock.ts` — swap with real API client
- **ikameglobal UI kit**: Blocked (ui.ikameglobal.com behind Cloudflare) — use shadcn/ui baseline, migrate post-access
- **CV upload**: Implement UI + mock service; real S3/storage handled by backend
- **iHiring integration**: Define webhook/polling interfaces in types layer; real calls by backend team

## Unresolved Questions

- [ ] Is ui.ikameglobal.com accessible internally? npm package name?
- [ ] Auth provider: Google OAuth (GSuite) or Microsoft SSO?
- [ ] CV storage: S3 presigned URL or multipart upload endpoint?
- [ ] iHiring webhook vs polling for status sync?
- [ ] Points calculation rules: defined by business or configurable via API?
- [ ] Rewards catalog: static config or API-driven?
