# Phase 2: Dashboard UX Improvements

## Context Links
- [Dashboard.tsx](src/pages/Dashboard.tsx)
- [ambassador-level-card.tsx](src/components/dashboard/ambassador-level-card.tsx)
- [stats-summary-cards.tsx](src/components/dashboard/stats-summary-cards.tsx)
- [activity-feed.tsx](src/components/dashboard/activity-feed.tsx)
- [leaderboard-card.tsx](src/components/dashboard/leaderboard-card.tsx)
- Stakeholder: Rank not prominent, Activity Feed low value, Leaderboard not attractive

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 4h

Improve Dashboard based on stakeholder feedback: make rank/progress more prominent, simplify Activity Feed, enhance leaderboard mini-card, add user profile summary from removed Profile page.

## Key Insights
- Phuong Thanh: "Rank hien tai em chua thay noi bat lam va nhin mai moi ra thanh bar mau vang dang chay chinh la vi tri rank hien tai cua minh"
- Phuong Thanh: "BXH tai trang chu bi kem hap dan qua, visual ko duoc thu hut"
- Phuong Thanh: Some info not important, simplify "Hoat dong gan day"
- Dung: Focus on clean interface, avoid mascot images

## Requirements
### Functional
- **Dashboard header**: Add user greeting + avatar + current rank badge + points prominently (merge from Profile.tsx header)
- **Ambassador card redesign**: Make current rank MUCH more prominent — large badge/icon, clear "You are HERE" indicator
- **Stats cards**: Add "Diem thang nay" card, align with spec (Da gioi thieu, Dang process, Da onboard, Diem thang nay)
- **Activity Feed**: Reduce to compact 3-item list OR replace with "Quick Actions" section
- **Leaderboard mini**: Make more visually engaging — top 3 with podium-style, link to full `/leaderboard` page
- **Remove "Xem cach tinh diem" popup** from ambassador card — replace with link to `/rewards` page

### Non-functional
- Dashboard load time should not increase
- Responsive on mobile

## Related Code Files

### Modify
- `src/pages/Dashboard.tsx` — Restructure layout
- `src/components/dashboard/ambassador-level-card.tsx` — Redesign for rank prominence
- `src/components/dashboard/stats-summary-cards.tsx` — Update stat cards
- `src/components/dashboard/activity-feed.tsx` — Simplify or replace
- `src/components/dashboard/leaderboard-card.tsx` — Enhance visual, link to /leaderboard
- `src/components/dashboard/campaign-banner.tsx` — Keep but may reposition

### Possibly Delete
- ScoringSystemPopup in ambassador-level-card.tsx — Move content to /rewards page

## Implementation Steps

1. **Dashboard header section**: Add a greeting bar with user avatar, name, rank badge, and points (similar to what Profile.tsx had but inline/compact)
2. **Ambassador card redesign**:
   - Make current tier name + icon large and center-prominent
   - Show progress as "45/80 diem → Dai su ben bi" with visual bar
   - Replace "Xem cach tinh diem" dialog trigger with `<Link to="/rewards">Xem chi tiet →</Link>`
   - Remove `ScoringSystemPopup` component from this file
3. **Stats summary cards**: Update to match spec mockup:
   - Card 1: "Da gioi thieu" (total referrals)
   - Card 2: "Dang process" (pending)
   - Card 3: "Da onboard" (successful)
   - Card 4: "Diem thang nay" (monthly points) — needs new field from stats
4. **Activity Feed simplification**:
   - Reduce to showing 3 most recent items inline (no expand)
   - OR replace with "Gioi thieu nhanh" quick-action CTA cards
5. **Leaderboard mini-card enhancement**:
   - Show top 3 with visual differentiation (gold/silver/bronze)
   - Add "Xem BXH" button linking to `/leaderboard` (instead of dialog)
   - Remove full leaderboard dialog — it's now a separate page
6. **Layout reorder**: Stats → Ambassador → Leaderboard mini + Hot Jobs → Campaign

## Todo List
- [ ] Add Dashboard greeting/header with user info
- [ ] Redesign AmbassadorLevelCard for rank prominence
- [ ] Update StatsSummaryCards labels & add monthly points
- [ ] Simplify ActivityFeed
- [ ] Enhance LeaderboardCard with link to /leaderboard
- [ ] Remove ScoringSystemPopup (moved to rewards page)
- [ ] Reorder Dashboard layout
- [ ] Test responsive on mobile
- [ ] Compile check

## Success Criteria
- Current rank is immediately visible and prominent on Dashboard
- "Xem cach tinh diem" links to /rewards instead of popup
- Activity Feed reduced to compact version
- Leaderboard links to /leaderboard page
- All 4 stat cards show correct data
- No regression in existing functionality

## Risk Assessment
- **Medium:** Removing ScoringSystemPopup means users lose in-place explanation until Rewards page is built (Phase 4). Mitigation: build Phase 4 before or in parallel.
- **Low:** Monthly points stat may not exist in mock data — add to mock.
