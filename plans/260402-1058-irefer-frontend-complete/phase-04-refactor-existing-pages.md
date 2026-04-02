---
phase: 04
title: Refactor Existing Pages → Service Layer
status: pending
priority: high
effort: M (1 day)
---

# Phase 04 — Refactor Existing Pages to Use Service Layer

## Overview

Tất cả mock data inline trong pages phải được chuyển vào service layer. Pages chỉ gọi hooks, không chứa data. Đồng thời thêm loading states, error states, và empty states.

## Files to Modify

### 1. `src/pages/Dashboard.tsx` (699 LOC → split)

**Vấn đề:** 699 LOC, quá lớn, tất cả data hardcode inline.

**Refactor plan — split thành components:**
- `src/components/dashboard/stats-summary-cards.tsx` — 4 metric cards
- `src/components/dashboard/leaderboard-card.tsx` — bảng xếp hạng
- `src/components/dashboard/activity-feed.tsx` — hoạt động gần đây
- `src/components/dashboard/user-level-card.tsx` — level + progress bar
- `src/components/dashboard/badges-showcase.tsx` — huy hiệu nổi bật

**Dashboard.tsx sau refactor (< 80 LOC):**
```typescript
export function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: leaderboard } = useLeaderboard();
  const { data: activities } = useRecentActivities();

  if (isLoading) return <DashboardSkeleton />;
  return (
    <div className="space-y-6">
      <StatsSummaryCards stats={stats} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UserLevelCard className="lg:col-span-1" />
        <LeaderboardCard data={leaderboard} className="lg:col-span-2" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityFeed data={activities} />
        <BadgesShowcase />
      </div>
    </div>
  );
}
```

**Hooks to create:**
- `src/hooks/use-dashboard.ts` → `useDashboardStats()`, `useLeaderboard()`, `useRecentActivities()`

**Skeleton to create:**
- `src/components/dashboard/dashboard-skeleton.tsx`

---

### 2. `src/pages/Refer.tsx` (390 LOC)

**Refactor plan:**
- Extract job selector: `src/components/referrals/job-selector-combobox.tsx`
- Extract CV upload: `src/components/referrals/cv-upload-dropzone.tsx`
- Extract confirm dialog: `src/components/referrals/referral-confirm-dialog.tsx`
- `Refer.tsx` becomes orchestrator ~120 LOC

**Service changes:**
```typescript
// Replace hardcoded jobs array with:
const { data: jobs } = useJobs();

// Replace mock submit with:
const mutation = useMutation({
  mutationFn: (payload: SubmitReferralPayload) => submitReferral(payload),
  onSuccess: () => {
    toast.success('Giới thiệu thành công!');
    navigate('/my-referrals');
  }
});
```

**CV Upload flow:**
1. User chọn file → preview tên file
2. Submit form → `referralsService.uploadCv(file)` → trả về `cvUrl`
3. Submit referral với `cvUrl` đính kèm
4. Mock: simulate upload delay 1.5s, trả về fake URL

---

### 3. `src/pages/MyReferrals.tsx` (261 LOC)

**Refactor plan:**
- Extract referral row: `src/components/referrals/referral-list-item.tsx`
- Extract status badge: `src/components/referrals/referral-status-badge.tsx`
- Add filter tabs: Tất cả | Đang xử lý | Thành công | Từ chối

**Service changes:**
```typescript
const { data: referrals, isLoading } = useMyReferrals({ status: activeTab });
```

**Add empty state:**
```typescript
if (referrals?.length === 0) return (
  <EmptyState
    icon={<Users />}
    title="Chưa có giới thiệu nào"
    action={<Button asChild><Link to="/refer">Giới thiệu ngay</Link></Button>}
  />
);
```

---

### 4. `src/pages/JobList.tsx` (171 LOC)

**Service changes:**
```typescript
const { data: jobsPage, isLoading } = useJobs({ search: searchQuery });
```

**Add:**
- Loading skeleton: 6 skeleton cards
- Empty state khi search không có kết quả
- Filter by department (dropdown)

---

### 5. `src/pages/JobDetail.tsx` (193 LOC)

**Service changes:**
```typescript
const { id } = useParams();
const { data: job, isLoading } = useJob(id!);
if (!job) return <NotFound />;
```

---

### 6. `src/pages/CandidateDetail.tsx` (205 LOC)

**Service changes:**
```typescript
const { id } = useParams();
const { data: referral, isLoading } = useReferral(id!);
```

---

## Shared Components to Create

### `src/components/ui/empty-state.tsx`

```typescript
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}
```

### `src/components/ui/skeleton-card.tsx`

Generic skeleton card for loading states.

### `src/components/ui/error-boundary.tsx`

React error boundary với friendly error UI.

## Implementation Steps

1. Create shared `EmptyState`, `SkeletonCard` components
2. Extract Dashboard sub-components, create `use-dashboard.ts` hook
3. Refactor `Refer.tsx` — extract components, wire up mutation
4. Refactor `MyReferrals.tsx` — service hook + filter tabs
5. Refactor `JobList.tsx` + `JobDetail.tsx`
6. Refactor `CandidateDetail.tsx`
7. Add loading + error + empty states to all pages
8. `npm run lint` — verify no TypeScript errors

## Success Criteria

- [ ] Không còn hardcoded data arrays trong bất kỳ page file nào
- [ ] Tất cả pages có loading state (skeleton)
- [ ] Tất cả pages có empty state
- [ ] `Dashboard.tsx` < 100 LOC sau khi tách components
- [ ] Refer form submit gọi `submitReferral()` service với toast feedback
- [ ] `npm run lint` clean
