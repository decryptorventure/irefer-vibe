---
phase: 06
title: UI Polish, Loading States & Responsive
status: pending
priority: medium
effort: M (1 day)
---

# Phase 06 — UI Polish, Loading States & Responsive

## Overview

Hoàn thiện UI/UX: skeleton loading, error boundaries, responsive móc, animation, và align với ikameglobal UI kit khi có access.

## 1. ikameglobal UI Kit Integration

**Tình trạng:** ui.ikameglobal.com không accessible (Cloudflare block). Cần xác nhận từ team.

**Cách tiếp cận:**
- Giữ nguyên shadcn/ui làm nền tảng (đã có sẵn)
- Tạo CSS variables mapping để dễ override khi có UI kit thực:

```css
/* src/index.css — company brand tokens */
:root {
  --brand-primary: oklch(0.637 0.237 25.331);   /* iKame orange */
  --brand-secondary: oklch(0.45 0.18 264);       /* iKame blue */
  --brand-accent: oklch(0.8 0.15 85);
}
```

- Khi có npm package UI kit: install → replace shadcn imports từng component một
- Không cần refactor lớn nếu UI kit build trên Radix (compatible interface)

**Action items:**
- [ ] Hỏi team về npm package name / GitHub repo
- [ ] Nếu có: `npm install @ikameglobal/ui` và map components
- [ ] Nếu không: giữ shadcn + custom brand tokens

---

## 2. Skeleton Loading States

Tạo skeleton cho từng page:

### `src/components/skeletons/dashboard-skeleton.tsx`
- 4 skeleton stat cards
- Skeleton leaderboard rows
- Skeleton activity items

### `src/components/skeletons/job-list-skeleton.tsx`
- 6 skeleton job cards (grid)

### `src/components/skeletons/referral-list-skeleton.tsx`
- 5 skeleton list rows

### Pattern sử dụng shadcn Skeleton:

```typescript
import { Skeleton } from '@/components/ui/skeleton';

function JobCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-16 w-full" />
      </CardContent>
    </Card>
  );
}
```

---

## 3. Error Boundary

### `src/components/error-boundary.tsx`

```typescript
// Class component error boundary
// Props: fallback UI
// Usage: wrap toàn bộ app và từng page

<ErrorBoundary fallback={<ErrorPage />}>
  <Dashboard />
</ErrorBoundary>
```

### `src/pages/ErrorPage.tsx`
- Friendly error message
- "Thử lại" button → reload
- Link về trang chủ

---

## 4. Responsive Refinement

**Current issues to fix:**
- Dashboard grid cần kiểm tra mobile layout
- Refer form: stepper layout trên mobile
- Header: điểm user bị truncate trên màn nhỏ

**Breakpoint strategy** (Tailwind v4):
- `sm`: 640px — single column layouts
- `md`: 768px — 2 column grids
- `lg`: 1024px — full sidebar + 3 column grids

**Mobile-specific:**
- Bottom nav: 5 items (Tổng quan, Giới thiệu, Việc làm, Đổi thưởng, Tôi)
- Trang Profile và Rewards: full-width cards
- Job filter: collapse to modal/sheet on mobile

---

## 5. Animations (framer-motion)

Đã có framer-motion trong deps, tận dụng cho:

### Page transitions

```typescript
// src/components/layout/page-transition.tsx
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

export function PageTransition({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}
```

### Number counter animation
- Điểm trên Dashboard counter up khi load
- Stat cards animate vào

### Badge earn animation
- Scale + glow khi badge mới được unlock

### Leaderboard rank change
- AnimatePresence cho list reorder

---

## 6. Dark Mode Polish

- Kiểm tra tất cả custom colors có `dark:` variant
- Đảm bảo badge colors, timeline dots đúng trong dark mode
- Test các trang: Dashboard, Rewards catalog

---

## 7. Accessibility (a11y)

- Tất cả interactive elements có `aria-label`
- Focus styles visible
- Color contrast đủ WCAG AA
- Keyboard navigation cho leaderboard, rewards catalog

---

## Files to Create

- `src/components/skeletons/dashboard-skeleton.tsx`
- `src/components/skeletons/job-list-skeleton.tsx`
- `src/components/skeletons/referral-list-skeleton.tsx`
- `src/components/error-boundary.tsx`
- `src/pages/ErrorPage.tsx`
- `src/components/layout/page-transition.tsx`

## Files to Modify

- `src/index.css` — brand tokens, base styles
- `src/components/layout/BottomNav.tsx` — 5-item nav
- `src/App.tsx` — wrap pages with PageTransition + ErrorBoundary

## Success Criteria

- [ ] Mọi page có skeleton khi loading
- [ ] Error boundary bắt crash, hiển thị friendly UI
- [ ] Mọi page responsive từ 375px (iPhone SE) đến 1440px+
- [ ] Page transitions smooth 200ms
- [ ] Dark mode không bị vỡ màu ở bất kỳ trang nào
