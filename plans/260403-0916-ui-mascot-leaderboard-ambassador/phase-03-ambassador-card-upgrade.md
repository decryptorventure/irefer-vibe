# Phase 03 — Ambassador Level Card Upgrade

## Status: pending | Priority: P2

## Context Links
- Component: `src/components/dashboard/ambassador-level-card.tsx`
- Utils: `src/lib/points-utils.ts` (AMBASSADOR_TIERS, getCurrentTier, etc.)
- Used in: `src/pages/Dashboard.tsx:76` — rendered directly below StatsSummaryCards
- CSS: `src/index.css` — `animate-pulse-glow`, `mascot-float` etc.

---

## Problem Analysis

### Current State Audit

```
┌─────────────────────────────────────────────────────┐
│  [Crown icon] Đại sứ iKame         [Tier Badge]     │  ← plain white/card bg header
│  Bạn đang có 85 điểm tích lửa                       │
│                                                     │
│  [──── gradient progress bar ────────────────────]  │  ← hidden on mobile
│       ○   ○   ●(current)  ○   ○   ○                 │  ← milestone dots, label collision risk
│                                                     │
│  Mobile: vertical step list                         │
│                                                     │
│  [Info box: cần X điểm nữa để lên hạng Y]          │  ← muted/plain box
└─────────────────────────────────────────────────────┘
```

Issues identified:
1. **No tier identity** — card is plain `bg-card` regardless of current tier. A "Gold Ambassador" should FEEL gold.
2. **Header feels flat** — Crown icon + title + small badge. The tier badge is right-aligned and small — undersells achievement.
3. **Progress bar labels** — milestone labels `hidden` on `md` (only show on `lg`). On medium screens, milestones show dots with no labels.
4. **Milestone dot sizes** — the absolute-positioned approach causes overflow on small cards; labels at `-ml-2` can collide with each other.
5. **Next-tier info box** — `bg-muted/60` is visually dull; the call-to-action "Xem chi tiết →" is easy to miss.
6. **No mascot** — The card manages "ambassador rank" but has no visual personality. A small celebration/level mascot would reinforce the gamification feel.
7. **Mobile steps** — functional but styled too plainly (no tier colors on the current item).

---

## Solution Design

### Enhancement 1 — Tier-Themed Card Header with Gradient

Replace the plain `bg-card` container with a tier-specific gradient header section:

```tsx
const TIER_CARD_GRADIENT: Record<string, string> = {
  'Người nhóm lửa':   'from-orange-500 to-amber-400',
  'Đại sứ dự bị':     'from-blue-500 to-sky-400',
  'Silver Ambassador': 'from-slate-500 to-slate-400',
  'Đại sứ bền bỉ':    'from-amber-500 to-yellow-400',
  'Gold Ambassador':  'from-yellow-500 to-amber-300',
  'Champion of the Year': 'from-cyan-500 to-teal-400',
};
```

Card structure changes:
```tsx
<div className="rounded-xl border border-border shadow-sm overflow-hidden">
  {/* Gradient header band */}
  <div className={cn(
    "relative p-5 md:p-6 bg-gradient-to-r overflow-hidden",
    TIER_CARD_GRADIENT[currentTierName] ?? 'from-orange-500 to-amber-400'
  )}>
    {/* Decorative blur circles */}
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
    <div className="absolute right-16 bottom-0 w-16 h-16 bg-white/10 rounded-full blur-xl" />

    {/* Mascot — right decoration */}
    <MascotImage
      variant="celebrate"
      size="xl"
      hideOnMobile
      onDarkBg
      animate
      className="absolute right-2 bottom-0 drop-shadow-xl opacity-90 z-0"
    />

    {/* Header content */}
    <div className="relative z-10 pr-0 md:pr-36">
      <div className="flex items-center gap-2 mb-1">
        <Crown className="h-5 w-5 text-white drop-shadow" />
        <h2 className="text-lg font-black text-white tracking-tight">Đại sứ iKame</h2>
      </div>
      {/* Current tier — prominent */}
      <div className="flex items-center gap-2 mt-2">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
          {TIER_ICONS[currentTierName]}  {/* icon already white works on colored bg */}
          <span className="font-black text-white text-sm">Hạng: {currentTierName}</span>
        </div>
      </div>
      <p className="text-white/80 text-xs mt-2 font-medium">
        <span className="font-black text-white text-base">{points}</span> điểm tích lửa
      </p>
    </div>
  </div>

  {/* Progress section — white/card bg */}
  <div className="p-5 md:p-6 bg-card">
    {/* existing progress bar + milestones */}
    {/* existing mobile steps */}
    {/* existing next-tier info box (improved below) */}
  </div>
</div>
```

### Enhancement 2 — Progress Bar: Always-Show Labels on md+

Current issue: milestone labels are `hidden lg:block`. Change to show abbreviated labels on md:

```tsx
<div className="mt-3 text-center whitespace-nowrap">
  {/* Full name on lg, abbreviated on md */}
  <div className={cn(
    "text-xs font-bold leading-tight mx-auto",
    isAchieved ? (TIER_TEXT_ACTIVE[tier.name] ?? 'text-foreground') : 'text-muted-foreground'
  )}>
    <span className="hidden lg:block w-24 whitespace-normal">{tier.name}</span>
    <span className="lg:hidden">{tier.points}đ</span>  {/* show just points on md */}
  </div>
  <div className="text-[10px] text-muted-foreground font-medium mt-0.5 hidden lg:block">
    {tier.points}đ
  </div>
</div>
```

This shows points-only labels on `md` (no collision), full names on `lg`.

### Enhancement 3 — Next-Tier Info Box: More Visual Impact

```tsx
// BEFORE: dull muted box
<div className="bg-muted/60 dark:bg-muted/40 border border-border rounded-xl p-4 ...">

// AFTER: tier-colored subtle box with stronger CTA
<div className={cn(
  "rounded-xl p-4 flex items-start gap-3 mt-4 border",
  "bg-gradient-to-r",
  // Use a very light version of the NEXT tier's color
  TIER_NEXT_BG[nextTier.name] ?? 'from-orange-50 to-amber-50 border-orange-200 dark:from-orange-950/20 dark:to-amber-950/20 dark:border-orange-800/40'
)}>
  <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
  <div className="flex-1">
    <p className="text-sm font-semibold text_primary mb-1">
      Còn <span className="fg_orange_accent font-black text-base">{pointsNeeded} điểm</span> để lên{' '}
      <span className="font-black text_primary">{nextTier.name}</span>
    </p>
    <p className="text-xs text_secondary">
      Phần thưởng: <span className="font-semibold text_primary">{nextTier.reward}</span>
    </p>
    <Link to="/rewards" className="mt-2 inline-flex items-center gap-1 text-xs font-bold fg_orange_accent hover:underline">
      Xem chi tiết <ArrowRight className="h-3 w-3" />
    </Link>
  </div>
</div>
```

Add `TIER_NEXT_BG` map (similar pattern to existing TIER_BADGE_STYLES):
```tsx
const TIER_NEXT_BG: Record<string, string> = {
  'Đại sứ dự bị':     'from-blue-50 to-sky-50 border-blue-200 dark:from-blue-950/20 dark:to-sky-950/20 dark:border-blue-800/40',
  'Silver Ambassador': 'from-slate-50 to-slate-100 border-slate-200 dark:from-slate-800/20 dark:border-slate-700/40',
  'Đại sứ bền bỉ':    'from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-950/20 dark:border-amber-800/40',
  'Gold Ambassador':  'from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950/20 dark:border-yellow-800/40',
  'Champion of the Year': 'from-cyan-50 to-teal-50 border-cyan-200 dark:from-cyan-950/20 dark:border-cyan-800/40',
};
```

### Enhancement 4 — Mascot Variant per Tier (Semantic)

Use semantically appropriate mascot per current tier for the card header:
```tsx
const TIER_MASCOT_VARIANT: Record<string, MascotVariant> = {
  'Người nhóm lửa':   'encourage',  // just starting, needs encouragement
  'Đại sứ dự bị':     'typing',     // building up
  'Silver Ambassador': 'search',    // active hunter
  'Đại sứ bền bỉ':    'gift',       // earning rewards
  'Gold Ambassador':  'celebrate',  // celebrating achievement
  'Champion of the Year': 'celebrate', // top tier, celebrate
};
```

Reference in the card:
```tsx
<MascotImage
  variant={TIER_MASCOT_VARIANT[currentTierName] ?? 'celebrate'}
  size="xl"
  hideOnMobile
  onDarkBg
  animate
  className="absolute right-2 bottom-0 drop-shadow-xl opacity-90 z-0"
/>
```

### Enhancement 5 — Mobile Steps: Tier Color on Current Item

Current mobile step item uses `TIER_TEXT_ACTIVE` for text but not background. Add a subtle tier-colored bg for the current (highest achieved) step:

```tsx
<div key={tier.name} className={cn(
  "flex items-center gap-3 relative p-2 rounded-lg transition-colors",
  isHighestAchieved && "bg-orange-50 dark:bg-orange-950/20"  // use tier's accent color
)}>
  ...
</div>
```

---

## Files to Modify

| File | Changes | Est. Lines |
|------|---------|-----------|
| `src/components/dashboard/ambassador-level-card.tsx` | Gradient header, mascot, tier maps, improved info box, mobile step bg | ~220 → ~260 (split if needed) |

**If file exceeds 260 lines after changes**, extract:
- Tier config constants → `src/components/dashboard/ambassador-level-card-config.ts`
- Keep JSX/logic in main file

## New Imports Needed
```tsx
import { MascotImage, MascotVariant } from '@/components/ui/mascot-image';
import { Zap, ArrowRight } from 'lucide-react';  // Zap replaces Info
import { cn } from '@frontend-team/ui-kit';
```

(Remove `Info` import if replaced by `Zap`)

---

## Success Criteria
- [ ] Card header shows tier-specific gradient (orange for "Người nhóm lửa", yellow for Gold, etc.)
- [ ] Current tier name is prominently displayed in the gradient header (not just a small badge)
- [ ] Mascot appears in header, appropriate to current tier, hidden on mobile
- [ ] Progress bar: md screens show point values as labels (no label collision)
- [ ] Next-tier info box has stronger visual treatment + tier-colored background
- [ ] Mobile step: current tier row has subtle colored background
- [ ] Dark mode: gradient header and info box render correctly
- [ ] File stays under 260 lines (extract config if needed)

## Risk Notes
- `MascotImage` import adds a new dependency to this component — low risk
- Gradient header changes the entire card visual significantly — review in context with surrounding dashboard cards to ensure it doesn't dominate too aggressively
- The absolute-positioned milestone dots are fragile on md breakpoint — the label simplification (show points only) mitigates collision but should be tested at 768px viewport
