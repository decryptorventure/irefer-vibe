# Phase 4: Points & Rewards Page (NEW)

## Context Links
- [points-utils.ts](src/lib/points-utils.ts) — Points matrix, tiers, utils
- [ambassador-level-card.tsx](src/components/dashboard/ambassador-level-card.tsx) — ScoringSystemPopup to extract
- [hot-bonus-quests.tsx](src/components/dashboard/hot-bonus-quests.tsx) — Hot bonus component
- [Profile.tsx](src/pages/Profile.tsx) — Points history section to migrate
- Phuong Thanh: "Xem cach tinh diem khong noi bat de users click" + popup content "van tat qua, khong day du giai nghia"
- Suggestion: Dedicated tab with clickable stages + detailed explanation per stage

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 5h

Create dedicated "Diem & Qua" page at `/rewards` with full scoring system explanation, interactive tier progression, complete Hot Bonus quests, and points history. This replaces the abbreviated popup and merges content from Profile.tsx.

## Key Insights
- Phuong Thanh: Scoring popup too abbreviated, needs full dedicated page
- Spec describes 3 mechanisms: "Tich Lua" (points matrix), "Vi The Dai Su" (rank tiers), "Lua Bung Chay" (hot bonus)
- Each stage/tier needs clickable detail with full explanation
- Points history from Profile.tsx migrates here
- Hot Bonus should show all 5 quests (currently only 3)

## Requirements
### Functional
- **Page sections**:
  1. User's current points summary (banner with rank + points + progress)
  2. "Co che 1: Tich Lua" — Interactive points matrix table with stage explanations
  3. "Co che 2: Vi The Dai Su" — Tier progression with clickable milestones showing rewards
  4. "Co che 3: Lua Bung Chay" — All 5 Hot Bonus quests with progress
  5. Points history timeline (migrated from Profile)
  6. "Doi thuong" reward redemption section (placeholder for future)

- **Interactive details**: Click on each stage (CV screening, interview, onboard) to see detailed explanation of what it means, when points are awarded, rules
- **All 5 Hot Bonuses**:
  1. Lua khoi phat — 50,000d — Top 5 first CV qualifiers
  2. Lua ben bi — 500,000d — 2 onboards in 1 quarter
  3. Lua truyen cam hung — 500,000d — Most shares/likes on job posts
  4. Lua nang no — 1,000,000d — Most CVs referred (monthly)
  5. Sieu Hunter Thang — 1,000,000d — Most onboards/month

### Non-functional
- Informative but not overwhelming — use tabs/accordions
- Responsive layout

## Related Code Files

### Modify
- `src/pages/Rewards.tsx` — Replace placeholder with full implementation
- `src/components/dashboard/hot-bonus-quests.tsx` — Add 2 missing bonuses, make reusable

### Create
- `src/components/rewards/scoring-matrix-section.tsx` — Points matrix with interactive details
- `src/components/rewards/tier-progression-section.tsx` — Tier progression display
- `src/components/rewards/points-history-section.tsx` — Migrated from Profile

### Migrate From
- `src/pages/Profile.tsx` → Points history section
- `src/components/dashboard/ambassador-level-card.tsx` → ScoringSystemPopup content

## Implementation Steps

1. **Points summary banner**: Compact header showing user's total points, current rank badge, next tier progress bar, "Doi thuong" CTA button
2. **Scoring Matrix section** (Co che 1):
   - Extract & enhance ScoringSystemPopup content from ambassador-level-card.tsx
   - Full table with Junior/Middle/Senior columns
   - Each stage row clickable → expands to show detailed rules:
     - When points are awarded (ATS status change)
     - "Nguoi den truoc" priority rule
     - Share x2 multiplier explanation
   - Use Accordion or expandable rows
3. **Tier Progression section** (Co che 2):
   - Visual tier ladder (vertical on mobile, horizontal on desktop)
   - Each tier clickable → shows reward details, "Dac quyen thang hang"
   - Current position highlighted with "BAN O DAY" indicator
   - Progress bar between current and next tier
4. **Hot Bonus section** (Co che 3):
   - Reuse HotBonusQuests component but extend with 2 missing bonuses
   - Add to MOCK_BONUSES in hot-bonus-quests.tsx:
     - "Lua truyen cam hung" (500k) — Most job shares/likes per month
     - "Lua nang no" (1M) — Most CVs referred per month
5. **Points History section**:
   - Migrate from Profile.tsx points history
   - Paginated list with earned/redeemed type
   - Filter by month
6. **Reward Redemption placeholder**: Simple section with "Sap ra mat" badge for future implementation

## Todo List
- [ ] Create Rewards page layout with sections
- [ ] Build scoring-matrix-section.tsx with interactive details
- [ ] Build tier-progression-section.tsx with visual ladder
- [ ] Add 2 missing Hot Bonuses to hot-bonus-quests.tsx
- [ ] Migrate points history from Profile.tsx
- [ ] Add points summary banner
- [ ] Add reward redemption placeholder
- [ ] Mobile responsive
- [ ] Compile check

## Success Criteria
- `/rewards` shows comprehensive 3-pillar scoring system
- Each stage has detailed, clickable explanation
- All 5 Hot Bonuses displayed with progress
- Points history shows correctly
- Tier progression shows user's current position
- Dashboard "Xem chi tiet" links to this page
- Content is informative but organized (not overwhelming)

## Risk Assessment
- **Medium:** Content density — need good use of tabs/accordions to avoid info overload
- **Low:** Points history hook already exists — just reuse `usePointsHistory`
