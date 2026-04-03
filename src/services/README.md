# Services Layer — Dev Guide

Mỗi service file export async functions với pattern `USE_MOCK` để dễ dàng swap từ mock data sang real API.

## Toggle Mock/Real

Trong `.env.local`:
```bash
VITE_USE_MOCK=false          # Dùng real API
VITE_USE_MOCK=true           # Dùng mock data (default)
```

## Service → API Endpoint Mapping

| Service File | Function | Method | Endpoint |
|---|---|---|---|
| `auth-service.ts` | `loginWithGoogle` | POST | `/auth/google` |
| `auth-service.ts` | `logout` | POST | `/auth/logout` |
| `auth-service.ts` | `getCurrentUser` | GET | `/auth/me` |
| `auth-service.ts` | `refreshAccessToken` | POST | `/auth/refresh` |
| `jobs-service.ts` | `getJobs` | GET | `/jobs` |
| `jobs-service.ts` | `getJob` | GET | `/jobs/:id` |
| `jobs-service.ts` | `getJobDepartments` | GET | `/jobs/departments` |
| `referrals-service.ts` | `getMyReferrals` | GET | `/referrals` |
| `referrals-service.ts` | `getReferral` | GET | `/referrals/:id` |
| `referrals-service.ts` | `uploadCv` | POST + PUT | `/referrals/upload-cv` → S3 presigned |
| `referrals-service.ts` | `submitReferral` | POST | `/referrals` |
| `points-service.ts` | `getDashboardStats` | GET | `/me/stats` |
| `points-service.ts` | `getLeaderboard` | GET | `/leaderboard` |
| `points-service.ts` | `getPointsHistory` | GET | `/me/points-history` |
| `rewards-service.ts` | `getRewards` | GET | `/rewards` |
| `rewards-service.ts` | `redeemReward` | POST | `/rewards/:id/redeem` |
| `notifications-service.ts` | `getNotifications` | GET | `/notifications` |
| `notifications-service.ts` | `markAllNotificationsRead` | PUT | `/notifications/read-all` |
| `notifications-service.ts` | `markNotificationRead` | PUT | `/notifications/:id/read` |
| `activities-service.ts` | `getRecentActivities` | GET | `/me/activities` |

## Mock Data Location

Mock data được giữ trong `mock-data/` — xem file `.ts` tương ứng để hiểu shape của response:

```
mock-data/
  mock-activities.ts     ← ActivityItem[]
  mock-badges.ts         ← Badge[]
  mock-jobs.ts           ← Job[]
  mock-leaderboard.ts    ← LeaderboardEntry[], DashboardStats, PointTransaction[]
  mock-notifications.ts  ← Notification[]
  mock-referrals.ts      ← Referral[]
  mock-rewards.ts        ← Reward[]
```

## Thêm endpoint mới

1. Thêm TypeScript interface vào `src/types/`
2. Thêm mock data vào `src/services/mock-data/`
3. Thêm service function với `USE_MOCK` pattern
4. Thêm React Query hook vào `src/hooks/`
5. Cập nhật bảng mapping trên

## Pattern chuẩn

```typescript
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function getExample(): Promise<ExampleType> {
  if (USE_MOCK) {
    await delay(400);
    return mockExample;
  }
  // Backend team: implement GET /example
  const { data } = await apiClient.get<ExampleType>('/example');
  return data;
}
```
