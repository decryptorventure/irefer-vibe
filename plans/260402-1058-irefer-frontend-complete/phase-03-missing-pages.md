---
phase: 03
title: Missing Pages — Profile, Rewards, Notifications
status: pending
priority: high
effort: L (2 days)
---

# Phase 03 — Missing Pages

Ba trang còn thiếu cần xây mới hoàn toàn.

## Page 1: Profile (`/profile`)

### Layout

```
┌─────────────────────────────────────────────────┐
│  [Avatar]  Tên User                              │
│  Phòng CNTT • @ikameglobal.com                  │
│  ⭐ 850 điểm  •  Hạng #4  •  Cấp: Gold          │
│  [Progress bar → Diamond]                        │
├─────────────────┬───────────────────────────────┤
│  Thống kê       │  Huy hiệu đã đạt               │
│  ┌───┬───┬───┐  │  [🏆][⚡][🔥][🎯]...           │
│  │12 │ 3 │ 2 │  │                               │
│  │Ref│OnB│PV │  │  Huy hiệu chưa đạt (locked)   │
│  └───┴───┴───┘  │  [🔒][🔒][🔒]...              │
├─────────────────┴───────────────────────────────┤
│  Lịch sử điểm                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │ +50đ  Trần Minh Tuấn onboard  2h trước     │ │
│  │ +20đ  Lê Hương pass PV vòng 1  hôm qua     │ │
│  │ -100đ Đổi voucher Grab 100k   3 ngày trước │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Files to Create

- `src/pages/Profile.tsx` (< 200 LOC, delegate sub-sections to components)
- `src/components/profile/user-stats-card.tsx`
- `src/components/profile/badges-grid.tsx`
- `src/components/profile/points-history-table.tsx`
- `src/hooks/use-profile.ts` — React Query hooks for profile data

### Route

Add to `App.tsx`: `<Route path="profile" element={<Profile />} />`

---

## Page 2: Rewards / Đổi Thưởng (`/rewards`)

Trang catalog phần thưởng với bộ lọc và modal xác nhận đổi thưởng.

### Layout

```
┌─────────────────────────────────────────────────┐
│  Đổi Thưởng          Điểm của bạn: ⭐ 850       │
│  [Tất cả] [Voucher] [Quà tặng] [Trải nghiệm]   │
├─────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Grab  │ │Shopee│ │Coffee│ │Movie │           │
│  │200đ  │ │300đ  │ │100đ  │ │150đ  │           │
│  │[Đổi] │ │[Đổi] │ │[Đổi] │ │[Đổi] │           │
│  └──────┘ └──────┘ └──────┘ └──────┘           │
│                                                 │
│  [Modal xác nhận khi click Đổi]                 │
└─────────────────────────────────────────────────┘
```

### Files to Create

- `src/pages/Rewards.tsx`
- `src/components/rewards/reward-card.tsx`
- `src/components/rewards/redeem-confirm-dialog.tsx`
- `src/hooks/use-rewards.ts`
- `src/services/rewards-service.ts`

### Mock Reward Data

```typescript
// src/services/mock-data/mock-rewards.ts
export const mockRewards: Reward[] = [
  { id: 'R001', name: 'Grab Voucher 100k', pointsCost: 200, category: 'voucher', ... },
  { id: 'R002', name: 'Shopee Voucher 200k', pointsCost: 300, category: 'voucher', ... },
  { id: 'R003', name: 'Phần quà hộp snack', pointsCost: 100, category: 'gift', ... },
  { id: 'R004', name: 'Vé xem phim CGV', pointsCost: 150, category: 'experience', ... },
  { id: 'R005', name: 'Thưởng tiền mặt 500k', pointsCost: 1000, category: 'cash', ... },
];
```

### Route

Add to `App.tsx`: `<Route path="rewards" element={<Rewards />} />`

---

## Page 3: Notifications (`/notifications`)

### Layout

```
┌─────────────────────────────────────────────────┐
│  Thông báo              [Đánh dấu đã đọc tất cả]│
├─────────────────────────────────────────────────┤
│  Hôm nay                                        │
│  🟢 Trần Minh Tuấn đã ONBOARD! +500đ       2h  │
│  🔵 Sarah Jenkins vừa pass PV vòng 2       5h  │
│                                                 │
│  Hôm qua                                        │
│  🟠 CV Phạm Văn Đức đang được xem xét      1d  │
│  ⭐ Bạn đã đạt huy hiệu "Siêu Giới Thiệu"  1d  │
└─────────────────────────────────────────────────┘
```

### Files to Create

- `src/pages/Notifications.tsx`
- `src/components/notifications/notification-item.tsx`
- `src/hooks/use-notifications.ts`
- `src/services/notifications-service.ts`
- `src/types/notification-types.ts`

```typescript
export interface Notification {
  id: string;
  type: 'referral_update' | 'points_earned' | 'badge_earned' | 'reward_redeemed';
  title: string;
  body: string;
  isRead: boolean;
  pointsDelta?: number;
  referralId?: string;
  createdAt: string;
}
```

### Route & Header Badge

- Add to `App.tsx`: `<Route path="notifications" element={<Notifications />} />`
- Update `Header.tsx`: Bell icon với unread count badge
- Add notification bell to `BottomNav.tsx` on mobile

---

## Navigation Updates

### `src/components/layout/Sidebar.tsx` — Add new nav items

```typescript
const navItems = [
  { to: '/',              icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/refer',         icon: UserPlus,        label: 'Giới thiệu' },
  { to: '/my-referrals',  icon: Users,           label: 'Danh sách giới thiệu' },
  { to: '/jobs',          icon: Briefcase,       label: 'Việc làm' },
  { to: '/rewards',       icon: Gift,            label: 'Đổi thưởng' },    // NEW
  { to: '/profile',       icon: User,            label: 'Trang cá nhân' }, // NEW
];
```

### `src/components/layout/BottomNav.tsx` — Mobile nav

Keep to 5 items max: Tổng quan, Giới thiệu, Việc làm, Đổi thưởng, Tôi

## Success Criteria

- [ ] `/profile` hiển thị stats, badges, points history của logged-in user
- [ ] `/rewards` hiển thị catalog, filter theo category, đổi thưởng mở confirm dialog
- [ ] `/notifications` hiển thị list với unread count trên bell icon
- [ ] Sidebar + BottomNav có đủ link tới 3 trang mới
- [ ] Tất cả dùng service layer, không hardcode inline
