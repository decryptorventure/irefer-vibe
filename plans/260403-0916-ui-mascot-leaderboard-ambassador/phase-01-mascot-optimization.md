# Phase 01 — Mascot Placement & Sizing Optimization

## Status: pending | Priority: P2

## Context Links
- Component: `src/components/ui/mascot-image.tsx`
- Usages: Dashboard.tsx, Rewards.tsx, Leaderboard.tsx, campaign-banner.tsx, JobList.tsx, MyReferrals.tsx, Sidebar.tsx
- Reference design: user-provided screenshot (iRefer Đại Sứ Góp Lửa dashboard)
- Mascot sheet: 12 biểu cảm + 5 tư thế

---

## Reference Design Analysis

From the provided reference screenshot:
1. **Dashboard hero**: Mascot is placed **right-aligned** inside the orange hero banner, large (≈ 2xl), slightly overflowing bottom edge of the card — acts as a "character mascot" not just decoration
2. **Mascot is on orange bg** → use `onDarkBg` prop (no mix-blend-multiply issue)
3. **Hero bg**: Deeper orange gradient than current `from-orange-50 to-amber-50` — reference uses a rich warm orange solid/gradient
4. **Avatar + greeting**: Placed left side, mascot right side — clean separation
5. **Leaderboard sidebar** uses small mascot icons (avatar replacements) — out of scope for this phase

---

## Problem Analysis

### Issue 1 — Dashboard greeting header (HIGH)
**File:** `src/pages/Dashboard.tsx:37-73`

Current layout:
```
[banner: light orange gradient, min-h-[120px]]
  flex row: [MASCOT 2xl/176px] [AVATAR 80px] [Name/Points]
```

Problems:
- Mascot inline with avatar creates visual competition
- Light orange bg + mix-blend-multiply = mascot looks washed out
- Mascot size 2xl (176px) >> avatar (80px), ratio feels off in a row

Target layout (per reference):
```
[banner: deep orange gradient, min-h-[160px], overflow-visible or controlled]
  flex row left: [AVATAR 80px] [Name / Tier / Points]
  absolute right: [MASCOT 2xl, bottom-0, onDarkBg, no blend]
```

Key change: mascot becomes `absolute` decoration on the right, avatar+text own the left.

### Issue 2 — Rewards page header mascot (MEDIUM)
**File:** `src/pages/Rewards.tsx:31-37`

`size="3xl"` (w-56/224px) as `absolute right-4 -bottom-6` on `min-h-[140px]` banner.
224px > 160px banner height — mascot overflows bottom significantly.

Fix: Reduce to `2xl` (176px), adjust `bottom-0` so feet sit at banner bottom.

### Issue 3 — Dead import in Sidebar (LOW)
**File:** `src/components/layout/Sidebar.tsx:12`

`MascotImage` imported but never used in JSX. Remove.

### Issue 4 — Leaderboard encourage banner (LOW)
**File:** `src/pages/Leaderboard.tsx:97-105`

`animate={false}` on a motivational banner feels static. Should animate.
`size="lg"` (112px) in a compact banner is slightly oversized — drop to `md` (80px) + re-enable animation + split copy into 2 lines.

### Issue 5 — Empty state mascots (NO CHANGE)
`JobList.tsx` (3xl), `MyReferrals.tsx` (2xl) — appropriate for empty state heroes.

---

## Implementation Steps

### Step 1 — Dashboard greeting header
**File:** `src/pages/Dashboard.tsx`

Upgrade banner bg + restructure layout:

```tsx
// Banner: richer orange gradient + allow overflow for mascot
<div className="relative rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107]
  border border-orange-400/30 p-5 md:p-6 overflow-hidden min-h-[140px] md:min-h-[160px]">

  {/* Decorative circles */}
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
  <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />

  {/* Mascot — absolute right decoration, on dark/orange bg */}
  <MascotImage
    variant="search"
    size="2xl"
    hideOnMobile
    onDarkBg
    animate
    className="absolute right-2 bottom-0 drop-shadow-xl z-0 opacity-90"
  />

  {/* Content row — left side */}
  <div className="relative z-10 flex items-center gap-4 pr-0 md:pr-48">
    <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-white/40 shrink-0">
      ...
    </Avatar>
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl font-bold text-white truncate">Chào {displayName}! 🔥</h1>
      <p className="text-orange-50 mt-0.5 font-medium text-sm md:text-base">
        Hôm nay bạn đã <span className="font-bold text-white">góp lửa</span> chưa?
      </p>
      <div className="flex flex-wrap items-center gap-3 mt-2">
        {currentTier && <Badge ... className="bg-white/20 text-white border-white/30">...</Badge>}
        <span className="text-orange-50 text-sm flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-white" />
          <span className="font-bold text-white">{points}</span> điểm tích lửa
        </span>
      </div>
    </div>
  </div>
</div>
```

Notes:
- Use `variant="search"` (magnifying glass pose — matches reference image "đi săn ứng viên")
- `onDarkBg` → disables mix-blend-multiply, renders clean on orange
- `pr-0 md:pr-48` on content row ensures text doesn't overlap mascot on desktop
- Avatar border changes from `border_orange` to `border-white/40` since bg is now orange

### Step 2 — Rewards page mascot
**File:** `src/pages/Rewards.tsx`

```tsx
// BEFORE
<MascotImage variant="gift" size="3xl" hideOnMobile onDarkBg
  className="absolute right-4 -bottom-6 drop-shadow-lg z-0 opacity-80" />

// AFTER
<MascotImage variant="gift" size="2xl" hideOnMobile onDarkBg
  className="absolute right-2 bottom-0 drop-shadow-xl z-0 opacity-90" />
```

### Step 3 — Remove dead import from Sidebar
**File:** `src/components/layout/Sidebar.tsx`

Delete line 12: `import { MascotImage } from "@/components/ui/mascot-image";`

### Step 4 — Leaderboard encourage banner
**File:** `src/pages/Leaderboard.tsx:96-105`

```tsx
// BEFORE
<div className="bg_orange_subtle border border_orange rounded-lg p-4 flex items-center gap-4">
  <MascotImage variant="encourage" size="lg" animate={false} className="shrink-0" />
  <p className="text-sm text_primary flex-1">
    Bạn còn cách Top 3:{' '}
    <span className="font-bold fg_orange_accent">{gapToTop3} điểm!</span>{' '}
    Giới thiệu thêm ứng viên để vươn lên nào!
  </p>
</div>

// AFTER
<div className="bg_orange_subtle border border_orange rounded-xl p-4 flex items-center gap-3">
  <MascotImage variant="encourage" size="md" animate className="shrink-0" />
  <div className="flex-1">
    <p className="text-sm font-bold text_primary">Bạn sắp vào Top 3! 🔥</p>
    <p className="text-sm text_secondary mt-0.5">
      Còn <span className="font-bold fg_orange_accent">{gapToTop3} điểm</span> nữa thôi — giới thiệu thêm để vươn lên!
    </p>
  </div>
</div>
```

---

## Files to Modify

| File | Change | Lines |
|------|--------|-------|
| `src/pages/Dashboard.tsx` | Richer gradient bg, mascot → absolute right, avatar style tweak | ~37-73 |
| `src/pages/Rewards.tsx` | 3xl → 2xl, fix position | ~31-37 |
| `src/components/layout/Sidebar.tsx` | Remove dead import | line 12 |
| `src/pages/Leaderboard.tsx` | Enable animate, lg → md, split copy | ~97-105 |

## Files NOT to change
- `src/components/ui/mascot-image.tsx`
- `src/components/dashboard/campaign-banner.tsx` — current pattern already correct
- `src/index.css` — animations fine

---

## Success Criteria
- [ ] Dashboard hero: mascot right-aligned absolute, no visual competition with avatar
- [ ] Dashboard hero: background is rich orange (not pale), mascot renders clean (no blend artifact)
- [ ] Rewards: mascot fits within banner visually (no overflow clipping)
- [ ] Sidebar: dead import removed
- [ ] Leaderboard: encourage banner uses animated md mascot + 2-line message
- [ ] No mobile layout breakage (hideOnMobile where appropriate)
