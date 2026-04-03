# Phase 02 — Leaderboard Visual Revamp

## Status: pending | Priority: P2

## Context Links
- Page: `src/pages/Leaderboard.tsx`
- Components: `src/components/leaderboard/leaderboard-podium.tsx`, `src/components/leaderboard/leaderboard-list.tsx`
- Dashboard widget: `src/components/dashboard/leaderboard-card.tsx`
- Types: `src/types/index.ts` (LeaderboardEntry)
- Mock data: `src/services/mock-data/mock-leaderboard.ts`
- Reference: user-provided screenshot showing orange podium with mascot avatars

---

## Problem Analysis

### Current State Audit

**Page layout** (`Leaderboard.tsx`):
- Header: plain title + subtitle — no "wow" factor
- Period tabs: basic Button components — minimal visual differentiation
- Podium wrapper: gradient bg + ambient glows — decent base, can be enhanced
- List (rank 4+): plain rows in a Card — no visual hierarchy, no rank change indicators
- User position summary: plain text at bottom

**Podium** (`leaderboard-podium.tsx`):
- Cards sit at same base level, with `mt-8` / `mt-12` for #2 and #3 — no actual podium platform/steps
- Avatar ring uses `ring-slate-100` hardcoded — breaks in dark mode
- Points display is large — but `mix-blend-multiply` on `pts` label causes dark-mode issues
- Star icon for rank badge — works but less distinctive than actual numbered crowns/medals
- No animated entrance

**List** (`leaderboard-list.tsx`):
- Rank number: plain text, no medal treatment for top entries
- No fire/streak indicator for high performers
- Stats (referral count, onboard count) hidden on mobile (`hidden sm:block`)
- Uses raw Tailwind colors (`border-l-3`, `border_orange`) mixed with design tokens

---

## Solution Design

### Enhancement 1 — Period Tabs (EASY WIN)
Add icons to period tabs + use a pill/segmented style instead of separate buttons.

```tsx
// Current: 3 separate Button components
// Target: segmented pill group

const PERIOD_TABS = [
  { value: 'monthly', label: 'Tháng này', icon: <Calendar className="h-3.5 w-3.5" /> },
  { value: 'quarterly', label: 'Quý này', icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { value: 'alltime', label: 'Tất cả', icon: <Trophy className="h-3.5 w-3.5" /> },
];

// Render as inline-flex pill container:
<div className="flex bg_secondary rounded-lg p-1 gap-1">
  {PERIOD_TABS.map(({ value, label, icon }) => (
    <button
      key={value}
      onClick={() => setPeriod(value)}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
        period === value
          ? "bg_accent_primary fg_on_accent shadow-sm"
          : "text_secondary hover:text_primary hover:state_bg_secondary_soft"
      )}
    >
      {icon} {label}
    </button>
  ))}
</div>
```

### Enhancement 2 — Podium Cards: Visual Improvements
**File:** `src/components/leaderboard/leaderboard-podium.tsx`

**2a — Add physical podium steps below cards**

After the cards section, add a visual "stage" element:
```tsx
{/* Podium steps — decorative base under each card */}
<div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 sm:gap-8 lg:gap-10 px-4 pointer-events-none">
  <div className="flex-1 max-w-[9rem] sm:max-w-[16rem] h-12 bg-gradient-to-b from-blue-400/30 to-blue-500/20 dark:from-blue-500/20 dark:to-blue-600/10 rounded-t-md border-t border-x border-blue-300/50 dark:border-blue-600/30" />  {/* #2 */}
  <div className="flex-1 max-w-[10rem] sm:max-w-[18rem] h-20 bg-gradient-to-b from-yellow-400/30 to-yellow-500/20 dark:from-yellow-500/20 dark:to-yellow-600/10 rounded-t-md border-t border-x border-yellow-300/50 dark:border-yellow-600/30" />  {/* #1 */}
  <div className="flex-1 max-w-[9rem] sm:max-w-[16rem] h-8 bg-gradient-to-b from-pink-400/30 to-pink-500/20 dark:from-pink-500/20 dark:to-pink-600/10 rounded-t-md border-t border-x border-pink-300/50 dark:border-pink-600/30" />  {/* #3 */}
</div>
```

Wrap the whole `LeaderboardPodium` in `relative pb-16` to accommodate the steps.

**2b — Crown icon for #1 instead of Star**

Replace `<Star>` rank badge with rank-specific icons:
```tsx
const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown className="w-12 h-12 sm:w-16 sm:h-16 fill-yellow-500 text-yellow-500" />,
  2: <Medal className="w-12 h-12 sm:w-16 sm:h-16 fill-blue-400 text-blue-400" />,
  3: <Award className="w-12 h-12 sm:w-16 sm:h-16 fill-pink-400 text-pink-400" />,
};
```
Import `Crown, Medal, Award` from `lucide-react` (all available in lucide-react v0.400+).

**2c — Fix `mix-blend-multiply` on pts label** (`leaderboard-podium.tsx:96`)
```tsx
// BEFORE
<span className="... mix-blend-multiply dark:mix-blend-normal">pts</span>
// AFTER
<span className="... opacity-70">pts</span>
```

**2d — Fix avatar ring hardcoded color** (line 65)
```tsx
// BEFORE
className={`... ring-4 ring-slate-100 dark:ring-slate-800/50 ...`}
// AFTER  
className={`... ring-4 ring-white/30 dark:ring-white/10 ...`}
```

### Enhancement 3 — Leaderboard List: More Visual Punch
**File:** `src/components/leaderboard/leaderboard-list.tsx`

**3a — Medal treatment for top visible entries (if list starts at rank 4, skip this)**
Current list shows rank 4+. Add a subtle rank-number treatment:
```tsx
<div className={cn(
  "w-8 text-center font-black shrink-0",
  user.rank <= 6 ? "fg_orange_accent text-base" : "text_secondary text-sm"
)}>
  {user.rank}
</div>
```

**3b — Fire indicator for high-point users**
Add a small flame icon next to users with high referralCount (≥5):
```tsx
{user.referralCount >= 5 && (
  <Flame className="h-3.5 w-3.5 text-orange-400 shrink-0" />
)}
```

**3c — Always-visible stat on mobile**
Change `hidden sm:block` to show points always, hide only the detailed breakdown:
```tsx
// Points: always visible
<div className="font-bold text-sm fg_orange_accent w-14 text-right">
  {user.points}đ
</div>
// Referral/onboard detail: hidden on mobile (keep as-is)
<div className="text-right hidden sm:block">...</div>
```
(This is already the current behavior — verify it's correct.)

### Enhancement 4 — Page Header: Add Stats Strip
**File:** `src/pages/Leaderboard.tsx`

Add a stats strip between the header and period tabs:
```tsx
{/* Quick stats strip */}
{!isLoading && (
  <div className="grid grid-cols-3 gap-3">
    <div className="bg_secondary rounded-xl p-3 text-center">
      <p className="text-xs text_secondary font-medium">Tổng người</p>
      <p className="text-xl font-black text_primary">{entries.length}+</p>
    </div>
    <div className="bg_secondary rounded-xl p-3 text-center">
      <p className="text-xs text_secondary font-medium">Điểm cao nhất</p>
      <p className="text-xl font-black fg_orange_accent">{entries[0]?.points ?? 0}</p>
    </div>
    <div className="bg_secondary rounded-xl p-3 text-center">
      <p className="text-xs text_secondary font-medium">Hạng của bạn</p>
      <p className="text-xl font-black text_primary">#{currentUser?.rank ?? '—'}</p>
    </div>
  </div>
)}
```

### Enhancement 5 — Dashboard Leaderboard Card (MINOR)
**File:** `src/components/dashboard/leaderboard-card.tsx`

Add medal emoji for ranks 1-3 (already done with `RANK_MEDAL`). Ensure `isCurrentUser` row has a stronger treatment:
```tsx
// Strengthen current user highlight
user.isCurrentUser
  ? 'bg_orange_subtle border-l-[3px] border_orange'  // thicker left border
  : RANK_BG[user.rank] ?? ''
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Leaderboard.tsx` | Segmented period tabs, stats strip |
| `src/components/leaderboard/leaderboard-podium.tsx` | Crown/Medal/Award icons, podium steps, fix mix-blend, fix ring color |
| `src/components/leaderboard/leaderboard-list.tsx` | Rank number prominence, flame indicator |
| `src/components/dashboard/leaderboard-card.tsx` | Strengthen current-user highlight |

## Files NOT to change
- `src/services/mock-data/mock-leaderboard.ts` — data layer untouched
- `src/types/index.ts` — no type changes needed

---

## Success Criteria
- [ ] Period tabs render as segmented pill (not separate buttons)
- [ ] Podium: physical step platform visible below cards
- [ ] Podium: Crown for #1, distinct icons for #2/#3
- [ ] Podium: no mix-blend-multiply artifact on pts label
- [ ] List: rank number is more prominent for top entries
- [ ] List: flame icon for high-referral users
- [ ] Stats strip shows total participants / top points / your rank
- [ ] Dark mode: all elements render correctly with design tokens

## Risk Notes
- `Crown, Medal` from lucide-react: verify these icons exist in the project's installed version before using. Fallback: use `Trophy`, `Star`, `Award` (all confirmed present).
- Podium steps are purely decorative `div`s — zero risk.
