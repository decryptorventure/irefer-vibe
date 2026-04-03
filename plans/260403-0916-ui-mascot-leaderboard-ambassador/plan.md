---
title: "UI/UX Polish — Mascot, Leaderboard & Ambassador Card"
description: "Tối ưu vị trí/kích cỡ mascot, revamp leaderboard cho nổi bật, nâng cấp ambassador level card"
status: in-progress
priority: P2
effort: 6h
branch: main
tags: [frontend, ui-ux, polish, mascot, leaderboard, ambassador]
created: 2026-04-03
blockedBy: []
blocks: []
---

# UI/UX Polish — Mascot · Leaderboard · Ambassador Card

## Overview

Three focused UI improvement areas, each independent and parallelizable.

| Phase | Area | Status | File |
|-------|------|--------|------|
| 01 | Mascot placement & sizing | pending | [phase-01-mascot-optimization.md](phase-01-mascot-optimization.md) |
| 02 | Leaderboard visual revamp | pending | [phase-02-leaderboard-revamp.md](phase-02-leaderboard-revamp.md) |
| 03 | Ambassador Level Card upgrade | pending | [phase-03-ambassador-card-upgrade.md](phase-03-ambassador-card-upgrade.md) |

## Key Files

- `src/components/ui/mascot-image.tsx` — mascot component
- `src/pages/Dashboard.tsx` — mascot in greeting header
- `src/pages/Rewards.tsx` — mascot in points banner
- `src/pages/Leaderboard.tsx` — page layout
- `src/components/leaderboard/leaderboard-podium.tsx` — top-3 cards
- `src/components/leaderboard/leaderboard-list.tsx` — rank 4+ list
- `src/components/dashboard/ambassador-level-card.tsx` — level card

## Dependencies

- UI kit: `@frontend-team/ui-kit` (design tokens, cn())
- No new packages required
- Mascot assets: `/public/mascot/` (6 PNGs)
