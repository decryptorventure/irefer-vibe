# Phase 5: Hot Bonus Completion & Referral Pipeline Enhancement

## Context Links
- [MyReferrals.tsx](src/pages/MyReferrals.tsx) — Referral list with table/kanban
- [CandidateDetail.tsx](src/pages/CandidateDetail.tsx) — Candidate detail with timeline
- [referral-types.ts](src/types/referral-types.ts) — Referral status types
- [referral-status-utils.ts](src/lib/referral-status-utils.ts) — Status labels/colors
- Spec: Tracking "Hanh trinh ung vien" — pipeline display with stages

## Overview
- **Priority:** P2
- **Status:** Pending
- **Effort:** 4h

Enhance the referral tracking experience with visual pipeline indicators and improve My Referrals page with better candidate journey visualization.

## Key Insights
- Spec describes pipeline: "Gioi thieu CV → CV Screening → Dang phong van → Offer → Onboarding"
- Each iKamer should see clearly where their CV is in the process
- Spec mentions auto-notifications when candidate progresses (future — backend dependent)

## Requirements
### Functional
- **Pipeline header in MyReferrals**: Visual stage pipeline showing counts per stage (how many CVs at each stage)
- **Improved Kanban view**: Better card design with stage indicators
- **Stats summary at top**: "Da gioi thieu: 12 | Sang loc: 4 | Phong van: 3 | Offer: 1 | Onboard: 3"
- **Quick filters**: Click on pipeline stage to filter list

### Non-functional
- Consistent with existing table/kanban toggle
- No breaking changes to CandidateDetail page

## Related Code Files

### Modify
- `src/pages/MyReferrals.tsx` — Add pipeline header, improve layout
- `src/components/dashboard/stats-summary-cards.tsx` — May reuse pattern

### Create
- `src/components/referrals/referral-pipeline-header.tsx` — Pipeline visualization with stage counts

## Implementation Steps

1. **Pipeline header component**:
   - Horizontal bar with stages: Gioi thieu → Sang loc ho so → Phong van → Offer → Onboard
   - Each stage shows count of referrals at that stage
   - Connected with arrows/lines between stages
   - Clickable to filter the list below
2. **Update MyReferrals page**:
   - Add pipeline header above the existing table/kanban
   - Pipeline stages act as clickable filters (alternative to tab filters)
   - Keep existing tab filters but make pipeline the primary visual
3. **Improve referral cards** (in kanban view):
   - Show candidate avatar/initials
   - Stage progress dots (mini pipeline per card)
   - Time in current stage
4. **Connect stats**: Use counts from referrals data to populate pipeline counts

## Todo List
- [ ] Create referral-pipeline-header.tsx
- [ ] Integrate pipeline header into MyReferrals.tsx
- [ ] Make pipeline stages clickable for filtering
- [ ] Improve kanban card design
- [ ] Compile check + responsive test

## Success Criteria
- Pipeline header shows correct counts per stage
- Clicking a stage filters the referral list
- Kanban cards show stage progress
- No regression in table view or candidate detail

## Risk Assessment
- **Low:** Filtering logic already exists — just need to wire pipeline clicks to status filter
- **Low:** Mock data covers all stages already
