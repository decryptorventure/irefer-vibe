# Phase 3: Leaderboard Page (NEW)

## Context Links
- [leaderboard-card.tsx](src/components/dashboard/leaderboard-card.tsx) — Current mini leaderboard
- [mock-leaderboard.ts](src/services/mock-data/mock-leaderboard.ts) — Mock data
- [use-dashboard.ts](src/hooks/use-dashboard.ts) — `useLeaderboard` hook
- [gamification-types.ts](src/types/gamification-types.ts) — LeaderboardEntry type
- Mi Mi: "BXH khi click vao se hien ra 1 trang rieng. ro rang hon ve top 5 va xem duoc top theo thang/quy"

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 4h

Create dedicated Leaderboard page at `/leaderboard` with visual top-3 podium, full ranking list, monthly/quarterly/all-time filters, and current user position highlight.

## Key Insights
- Mi Mi wants separate page for leaderboard — not just a card/dialog
- Should support monthly and quarterly views
- Need visual podium for top 3 (attractive, exciting)
- Current user position always visible (even if not in top 5)
- Clean UI per Dung's direction — no mascot overload

## Requirements
### Functional
- **Top 3 podium**: Visual display with rank 1 (center, taller), rank 2 (left), rank 3 (right)
- **Period tabs**: Monthly / Quarterly / All-time toggle
- **Full list**: Ranked list beyond top 3, paginated or scrollable
- **Current user highlight**: Always show current user's position (even if rank 15)
- **Stats per user**: Points, referral count, onboard count
- **"Ban con cach Top 3: X diem!"** motivational CTA

### Non-functional
- Fast rendering for 50+ entries
- Responsive layout

## Related Code Files

### Modify
- `src/pages/Leaderboard.tsx` — Replace placeholder with full implementation
- `src/hooks/use-dashboard.ts` — May need to add quarterly/alltime variants
- `src/services/mock-data/mock-leaderboard.ts` — Extend mock data for more users

### Create
- `src/components/leaderboard/leaderboard-podium.tsx` — Top 3 visual podium component
- `src/components/leaderboard/leaderboard-list.tsx` — Full ranking list component

## Implementation Steps

1. **Extend mock data**: Add 10-15 mock users to leaderboard with varied points/stats
2. **Extend `useLeaderboard` hook**: Support `period` param (monthly/quarterly/alltime), add `limit` param
3. **Create podium component**:
   - 3 columns: #2 (left, shorter) | #1 (center, tallest) | #3 (right, medium)
   - Each shows: avatar, name, department, points, referral/onboard count
   - Visual differentiation: gold/silver/bronze colors
   - Clean, modern design (no mascot)
4. **Create ranking list component**:
   - Table/list format for rank 4+
   - Current user highlighted with accent background
   - Show rank, avatar, name, department, points
5. **Build Leaderboard page**:
   - Page title: "Bang Xep Hang - Dai Su Gop Lua"
   - Period tabs (Monthly selected by default)
   - Podium for top 3
   - Full list below
   - "Ban con cach Top 3: X diem!" motivational banner (if user not in top 3)
6. **Hot Bonus badge** on leaderboard: Show current month's "HOT BONUS" campaign info (e.g., "Onboard truoc 2 ung vien thang nay nhan 100.000d")
7. **Mobile responsive**: Stack podium vertically or use horizontal scroll on small screens

## Todo List
- [ ] Extend mock leaderboard data (10-15 users)
- [ ] Update useLeaderboard hook for period params
- [ ] Create leaderboard-podium.tsx component
- [ ] Create leaderboard-list.tsx component
- [ ] Build full Leaderboard.tsx page
- [ ] Add period tabs (monthly/quarterly/alltime)
- [ ] Add current user position highlight
- [ ] Add motivational CTA banner
- [ ] Mobile responsive design
- [ ] Compile check

## Success Criteria
- `/leaderboard` shows full page with podium + list
- Period tabs switch data correctly
- Current user always visible with highlight
- Top 3 visually distinct with podium layout
- Responsive on mobile
- Links from Dashboard leaderboard card navigate here

## Risk Assessment
- **Low:** Mock data may not cover all edge cases (user at rank 1, user at rank 50, ties)
- **Low:** Podium design needs careful CSS for responsive — test on mobile early
