---
title: "iRefer v2 - Stakeholder Feedback Implementation"
description: "Restructure navigation, add dedicated Leaderboard & Points pages, improve Dashboard UX based on stakeholder feedback"
status: pending
priority: P1
effort: 24h
branch: main
tags: [frontend, feature, ux-improvement, gamification]
created: 2026-04-02
---

# iRefer v2 — Stakeholder Feedback Implementation Plan

## Context

Stakeholder feedback (Phuong Thanh, Mi Mi, Dung Nguyen Viet) identified key UX issues:
1. **Profile tab redundant** — Dashboard already shows personal stats; "Ho so" tab duplicates info
2. **Rank not prominent** — Progress bar doesn't clearly convey current rank position
3. **Scoring system hidden** — "Xem cach tinh diem" popup is too abbreviated; needs dedicated page
4. **Leaderboard weak** — Not attractive/exciting; needs separate page with monthly/quarterly views
5. **Activity Feed low value** — "Hoat dong gan day" should be simplified/reduced
6. **Missing Hot Bonuses** — Spec has 5 bonuses, current app only has 3
7. **Keep UI clean** — Avoid mascot overload, focus on clean functional interface

## Gap Analysis (Current vs Spec)

| Feature | Current | Spec | Gap |
|---------|---------|------|-----|
| Navigation | 5 tabs (Dashboard, Refer, Referrals, Jobs, Profile) | 6 tabs (Dashboard, Jobs, Leaderboard, Points, Refer, Referrals) | Profile→remove, add Leaderboard + Points pages |
| Points system | Popup dialog only | Dedicated "Diem & Qua" tab with full explanation | Need new page |
| Leaderboard | Card on Dashboard + dialog | Dedicated page with Top by month/quarter, visual podium | Need new page |
| Hot Bonus | 3 quests | 5 quests | Add "Lua truyen cam hung" + "Lua nang no" |
| Dashboard rank | Small progress bar | Prominent rank display with clear position | Redesign ambassador card |
| Activity Feed | Full section | Simplified/reduced prominence | Simplify or move |
| Candidate pipeline | Table + Kanban | Pipeline visualization with stages | Enhance tracking |

## Phases

| # | Phase | Status | Effort | Priority | Link |
|---|-------|--------|--------|----------|------|
| 1 | Navigation Restructure & Profile Merge | Pending | 3h | P1 | [phase-01](./phase-01-navigation-restructure.md) |
| 2 | Dashboard UX Improvements | Pending | 4h | P1 | [phase-02](./phase-02-dashboard-improvements.md) |
| 3 | Leaderboard Page (NEW) | Pending | 4h | P1 | [phase-03](./phase-03-leaderboard-page.md) |
| 4 | Points & Rewards Page (NEW) | Pending | 5h | P1 | [phase-04](./phase-04-points-rewards-page.md) |
| 5 | Hot Bonus Completion & Referral Pipeline | Pending | 4h | P2 | [phase-05](./phase-05-bonus-pipeline.md) |
| 6 | Testing & Code Review | Pending | 4h | P1 | [phase-06](./phase-06-testing-review.md) |

## Dependencies

- Phase 1 → Phase 2 (navigation changes affect dashboard layout)
- Phase 3, 4 can run in parallel after Phase 1
- Phase 5 independent (can run after Phase 1)
- Phase 6 runs last after all implementation

## Key Decisions

1. **Remove Profile page** — Merge points/rank/badges into Dashboard header area, points history into new "Diem & Qua" page
2. **New pages**: `/leaderboard` and `/rewards` routes
3. **Clean UI approach** — Per Dung's feedback: focus on clean interface, avoid mascot images for now
4. **Points system already correct** — `points-utils.ts` already matches spec (seniority-based matrix, 6 tiers)
