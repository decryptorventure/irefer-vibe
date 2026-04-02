---
phase: 05
title: Gamification Completeness
status: pending
priority: medium
effort: M (1 day)
---

# Phase 05 — Gamification Completeness

## Overview

Hoàn thiện hệ thống điểm, huy hiệu, bảng xếp hạng và cơ chế vinh danh. Đây là điểm cốt lõi kích thích người dùng.

## Points System

### Scoring Rules (configurable via API)

| Sự kiện | Điểm |
|---------|------|
| Gửi CV giới thiệu | +10đ |
| CV pass lọc hồ sơ | +10đ |
| CV pass phỏng vấn vòng 1 | +20đ |
| CV pass phỏng vấn vòng 2 | +20đ |
| Ứng viên nhận offer | +50đ |
| **Ứng viên ONBOARD** | **+500đ** (bonus theo job) |
| Giới thiệu vị trí HOT | +50đ bonus |

### `src/types/gamification-types.ts` additions

```typescript
export interface PointsRule {
  event: string;
  points: number;
  description: string;
}

export interface UserLevel {
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  label: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  icon: string;
}

export const LEVEL_THRESHOLDS: UserLevel[] = [
  { level: 'bronze',   label: 'Đồng',    minPoints: 0,    maxPoints: 199,   color: '#CD7F32', icon: '🥉' },
  { level: 'silver',   label: 'Bạc',     minPoints: 200,  maxPoints: 499,   color: '#C0C0C0', icon: '🥈' },
  { level: 'gold',     label: 'Vàng',    minPoints: 500,  maxPoints: 999,   color: '#FFD700', icon: '🥇' },
  { level: 'platinum', label: 'Bạch Kim', minPoints: 1000, maxPoints: 1999, color: '#E5E4E2', icon: '💎' },
  { level: 'diamond',  label: 'Kim Cương', minPoints: 2000, maxPoints: Infinity, color: '#B9F2FF', icon: '💠' },
];
```

### `src/lib/points-utils.ts`

```typescript
export function getUserLevel(points: number): UserLevel
export function getProgressToNextLevel(points: number): { current: number; next: number; percentage: number }
export function formatPoints(points: number): string  // "1,234đ"
```

---

## Badges System

### Badge Definitions

```typescript
// src/services/mock-data/mock-badges.ts
export const ALL_BADGES: BadgeDefinition[] = [
  { id: 'first_refer',    name: 'Bắt đầu hành trình', desc: 'Gửi giới thiệu đầu tiên',   icon: '🚀', condition: { type: 'referral_count', value: 1 } },
  { id: 'three_refers',   name: 'Người kết nối',       desc: 'Giới thiệu 3 ứng viên',      icon: '🤝', condition: { type: 'referral_count', value: 3 } },
  { id: 'first_onboard',  name: 'Phát hiện tài năng',  desc: 'Có ứng viên đầu tiên onboard', icon: '⭐', condition: { type: 'onboard_count', value: 1 } },
  { id: 'three_onboards', name: 'Siêu Giới Thiệu',     desc: 'Có 3 ứng viên onboard',     icon: '🏆', condition: { type: 'onboard_count', value: 3 } },
  { id: 'points_500',     name: 'Hạng Vàng',           desc: 'Đạt 500 điểm',               icon: '🥇', condition: { type: 'points', value: 500 } },
  { id: 'hot_job_refer',  name: 'Săn Job HOT',         desc: 'Giới thiệu vào vị trí HOT',  icon: '🔥', condition: { type: 'hot_referral', value: 1 } },
  { id: 'streak_3',       name: 'Bền bỉ',              desc: 'Giới thiệu 3 tháng liên tiếp', icon: '⚡', condition: { type: 'streak_months', value: 3 } },
  { id: 'top3',           name: 'Top 3 Bảng Vàng',     desc: 'Lọt top 3 bảng xếp hạng',    icon: '👑', condition: { type: 'rank', value: 3 } },
];
```

### `src/components/profile/badges-grid.tsx`

- Grid 4 cột, locked badges mờ với lock icon
- Tooltip khi hover: tên badge + điều kiện đạt
- Animate khi earn new badge (framer-motion scale + glow)

---

## Leaderboard

### `src/components/dashboard/leaderboard-card.tsx` (enhance)

**Features:**
- Top 3 được highlight đặc biệt (crown icon, gold/silver/bronze color)
- Current user row luôn visible (sticky hoặc highlight)
- Tabs: Tháng này | Quý này | Toàn thời gian
- Avatar với fallback initials

```typescript
// Hook
export function useLeaderboard(period: 'monthly' | 'quarterly' | 'alltime' = 'monthly') {
  return useQuery({
    queryKey: ['leaderboard', period],
    queryFn: () => getLeaderboard(period),
  });
}
```

---

## Hall of Fame / Vinh Danh

### New section on Dashboard

**"Nhân vật của tháng"** — Top referrer của tháng trước được spotlight:

```typescript
// src/components/dashboard/hall-of-fame-card.tsx
// Hiển thị: Avatar lớn, tên, phòng ban, số onboard, quote
// Animation: confetti nhẹ khi load
```

---

## Notification Triggers

Khi user đạt badge mới hoặc lên cấp → show `toast` + add notification:

```typescript
// src/hooks/use-gamification-events.ts
// Poll hoặc nhận từ SSE/WebSocket: badge_earned, level_up, rank_changed
// Hiển thị toast animation đặc biệt:
toast('🏆 Huy hiệu mới!', {
  description: 'Bạn vừa đạt "Siêu Giới Thiệu"',
  duration: 6000,
});
```

---

## Files to Create/Modify

**Create:**
- `src/lib/points-utils.ts`
- `src/services/mock-data/mock-badges.ts`
- `src/components/dashboard/hall-of-fame-card.tsx`
- `src/hooks/use-leaderboard.ts`
- `src/hooks/use-gamification-events.ts`

**Modify:**
- `src/components/dashboard/leaderboard-card.tsx` — tabs + top3 highlight
- `src/components/profile/badges-grid.tsx` — locked states + tooltips
- `src/components/dashboard/user-level-card.tsx` — progress bar + level thresholds

## Success Criteria

- [ ] Level system tính đúng dựa vào `LEVEL_THRESHOLDS`
- [ ] Badges grid hiển thị earned/locked đúng
- [ ] Leaderboard có 3 period tabs, current user được highlight
- [ ] Hall of Fame card hiển thị trên Dashboard
- [ ] Toast notification khi badge mới (mock trigger)
