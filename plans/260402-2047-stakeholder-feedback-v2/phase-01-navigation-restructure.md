# Phase 1: Navigation Restructure & Profile Merge

## Context Links
- [Sidebar.tsx](src/components/layout/Sidebar.tsx) — Current navigation config
- [BottomNav.tsx](src/components/layout/BottomNav.tsx) — Mobile nav
- [App.tsx](src/App.tsx) — Routes
- [Profile.tsx](src/pages/Profile.tsx) — To be removed
- Stakeholder feedback: Profile tab redundant since Dashboard shows personal stats

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 3h

Remove Profile page/route. Add two new routes: `/leaderboard` and `/rewards`. Restructure navigation to match spec sheet: Dashboard, Job Hot, Bang xep hang, Diem & Qua, and overflow for Refer/Referrals.

## Key Insights
- Phuong Thanh: "Dashboard ca nhan hoa da hien thi tai trang chu roi thi minh co can them tab Ho so nua khong?"
- Mi Mi: "Tab Ho so e dang chua ro y lam. Vi minh da hien thi Personal Dashboard o trang chu rui"
- Spec sheet nav order: Dashboard → Danh sach Job → Diem & Qua tang → Gioi thieu ung vien → Danh sach gioi thieu → Bang xep hang

## Requirements
### Functional
- Remove `/profile` route and Profile.tsx page
- Add `/leaderboard` route → LeaderboardPage (placeholder for Phase 3)
- Add `/rewards` route → RewardsPage (placeholder for Phase 4)
- Update sidebar nav order: Tong quan, Job Hot, Bang xep hang, Diem & Qua, Gioi thieu UV, DS gioi thieu
- Update mobile BottomNav: prioritize 5 most-used tabs
- Keep user avatar/info accessible via Header dropdown

### Non-functional
- No broken routes/links
- Smooth transition — no dead ends

## Related Code Files

### Modify
- `src/App.tsx` — Add new routes, remove `/profile`
- `src/components/layout/Sidebar.tsx` — Update nav items
- `src/components/layout/BottomNav.tsx` — Update mobile nav
- `src/components/layout/Header.tsx` — Ensure user info still accessible via dropdown

### Create
- `src/pages/Leaderboard.tsx` — Placeholder page (built in Phase 3)
- `src/pages/Rewards.tsx` — Placeholder page (built in Phase 4)

### Delete
- `src/pages/Profile.tsx` — Merged into Dashboard + Rewards
- `src/components/profile/badges-grid.tsx` — Move to rewards page later

## Implementation Steps

1. Create placeholder `Leaderboard.tsx` page with basic layout + "Coming soon" or minimal leaderboard
2. Create placeholder `Rewards.tsx` page with basic layout
3. Update `App.tsx`:
   - Remove `/profile` route
   - Add `/leaderboard` → `<Leaderboard />`
   - Add `/rewards` → `<Rewards />`
4. Update `Sidebar.tsx` navigation array:
   ```ts
   const navigation = [
     { name: "Tổng quan", href: "/", icon: LayoutDashboard },
     { name: "Việc làm hot", href: "/jobs", icon: Briefcase },
     { name: "Bảng xếp hạng", href: "/leaderboard", icon: Trophy },
     { name: "Điểm & Quà", href: "/rewards", icon: Gift },
     { name: "Giới thiệu ứng viên", href: "/refer", icon: UserPlus },
     { name: "Danh sách giới thiệu", href: "/my-referrals", icon: Users },
   ];
   ```
5. Update `BottomNav.tsx` with same structure (pick 5 for mobile, collapse rest)
6. Verify all internal links (e.g., from Dashboard cards) don't point to `/profile`
7. Move user info display to Header dropdown if not already there

## Todo List
- [ ] Create Leaderboard.tsx placeholder
- [ ] Create Rewards.tsx placeholder
- [ ] Update App.tsx routes
- [ ] Update Sidebar.tsx navigation
- [ ] Update BottomNav.tsx navigation
- [ ] Remove Profile.tsx and update imports
- [ ] Verify no broken links/references to /profile
- [ ] Compile check

## Success Criteria
- `/profile` returns 404 or redirects to `/`
- `/leaderboard` and `/rewards` render placeholder pages
- Navigation shows correct 6 items in correct order
- Mobile nav works with 5 items
- No console errors, no broken links

## Risk Assessment
- **Low:** Some internal links may reference `/profile` — grep and fix
- **Low:** BottomNav may need overflow menu for 6+ items on mobile
