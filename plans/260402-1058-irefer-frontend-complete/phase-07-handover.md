---
phase: 07
title: API Contracts & Backend Handover Guide
status: pending
priority: high
effort: S (0.5 day)
---

# Phase 07 — API Contracts & Backend Handover Guide

## Overview

Viết tài liệu bàn giao cho backend dev. Sau phase này, dev chỉ cần đọc doc để biết:
1. Implement những endpoint nào
2. Request/Response format như thế nào
3. Cách swap mock service → real API
4. Cấu hình biến môi trường

## File to Create: `docs/api-contracts.md`

### Auth Endpoints

```
POST /api/v1/auth/google           Body: { idToken: string }
POST /api/v1/auth/microsoft        Body: { accessToken: string }
POST /api/v1/auth/refresh          Body: { refreshToken: string }
POST /api/v1/auth/logout           Header: Authorization Bearer
GET  /api/v1/auth/me               → User object
```

### Jobs Endpoints (từ iHiring sync)

```
GET  /api/v1/jobs                  ?search=&department=&isHot=&page=&pageSize=
GET  /api/v1/jobs/:id              → JobDetail object
```

### Referrals Endpoints

```
GET  /api/v1/referrals             ?status=&page=&pageSize=  → user's referrals
GET  /api/v1/referrals/:id         → ReferralDetail with timeline
POST /api/v1/referrals             Body: SubmitReferralPayload
POST /api/v1/referrals/upload-cv   Body: FormData (file)  → { cvUrl: string }
```

### Gamification Endpoints

```
GET  /api/v1/me/stats              → DashboardStats
GET  /api/v1/me/points-history     ?page=  → PointTransaction[]
GET  /api/v1/leaderboard           ?period=monthly|quarterly|alltime
GET  /api/v1/badges                → Badge[] (all + earned status for current user)
```

### Rewards Endpoints

```
GET  /api/v1/rewards               ?category=
POST /api/v1/rewards/:id/redeem    → { success, remainingPoints }
GET  /api/v1/me/redemptions        → redemption history
```

### Notifications Endpoints

```
GET  /api/v1/notifications         ?page=&isRead=
PUT  /api/v1/notifications/read-all
PUT  /api/v1/notifications/:id/read
```

---

## File to Create: `docs/backend-integration-guide.md`

### How to Swap Mock → Real API

**Step 1:** Set environment variables in `.env.local`:
```
VITE_API_BASE_URL=https://api.irefer.ikameglobal.com/api/v1
VITE_USE_MOCK=false
VITE_AUTH_PROVIDER=google
VITE_GOOGLE_CLIENT_ID=your-client-id-here
```

**Step 2:** Each service file has this structure:
```typescript
// src/services/jobs-service.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function getJobs(params?) {
  if (USE_MOCK) { return mockGetJobs(params); }  // ← mock branch
  const { data } = await apiClient.get('/jobs', { params });  // ← real branch
  return data;
}
```
Backend dev chỉ cần đảm bảo response format khớp với TypeScript interfaces trong `src/types/`.

**Step 3:** Auth setup — implement OAuth callback endpoint:
```
POST /api/v1/auth/google
  Receives: { idToken } from Google
  Returns: { user: User, accessToken: string, refreshToken: string, expiresAt: number }
```

### iHiring Integration Points

Frontend expects trạng thái referral được sync từ iHiring qua:

**Option A (recommended): Webhook**
- iHiring POST tới `/api/v1/webhooks/ihiring/status-update`
- Backend cập nhật referral status + tạo notification + cộng điểm
- Frontend poll `GET /referrals/:id` mỗi 30s khi user đang xem CandidateDetail

**Option B: Polling**
- Backend worker poll iHiring API mỗi 5 phút
- Cập nhật status trong DB
- Frontend nhận qua REST API bình thường

**iHiring data mapping:**
```typescript
// iHiring application status → iRefer ReferralStatus
const STATUS_MAP: Record<string, ReferralStatus> = {
  'new':           'submitted',
  'screening':     'screening',
  'interview_1':   'interview_1',
  'interview_2':   'interview_2',
  'offer':         'offer_sent',
  'hired':         'onboarded',
  'rejected':      'rejected',
};
```

---

## File to Create: `docs/project-overview-pdr.md`

Product Development Requirements covering:
- Business objectives
- User personas (employees by department)
- Feature list with priority
- Non-functional requirements (performance, security, accessibility)
- Tech stack decisions and rationale

---

## File to Create: `.env.example`

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true

# Auth Provider: google | microsoft
VITE_AUTH_PROVIDER=google
VITE_GOOGLE_CLIENT_ID=
VITE_MICROSOFT_CLIENT_ID=
VITE_MICROSOFT_TENANT_ID=

# Feature Flags
VITE_ENABLE_DEVTOOLS=true
```

---

## `src/services/README.md` (inline dev notes)

```markdown
# Services Layer

Each service file exports async functions that either use mock data or call the real API.

Toggle: set VITE_USE_MOCK=false in .env.local to use real API.

## Files
- auth-service.ts      → login, logout, getCurrentUser
- jobs-service.ts      → getJobs, getJob
- referrals-service.ts → getMyReferrals, getReferral, submitReferral, uploadCv
- points-service.ts    → getDashboardStats, getPointsHistory
- rewards-service.ts   → getRewards, redeemReward
- notifications-service.ts → getNotifications, markRead

## Adding a new endpoint
1. Add TypeScript interface to src/types/
2. Add mock data to src/services/mock-data/
3. Add service function with USE_MOCK pattern
4. Add React Query hook to src/hooks/
```

---

## Implementation Steps

1. Create `docs/` directory (if not exists)
2. Write `docs/api-contracts.md` — full REST API spec
3. Write `docs/backend-integration-guide.md` — step-by-step for backend team
4. Write `docs/project-overview-pdr.md` — PDR document
5. Create `.env.example` at project root
6. Create `src/services/README.md`
7. Final: run `npm run build` — verify production build clean

## Success Criteria

- [ ] `docs/api-contracts.md` có đủ tất cả endpoints với request/response format
- [ ] `docs/backend-integration-guide.md` có hướng dẫn rõ ràng swap mock → real
- [ ] `.env.example` có đủ tất cả biến môi trường cần thiết
- [ ] `npm run build` thành công, không có TypeScript errors
- [ ] Backend dev có thể đọc docs và implement mà không cần hỏi thêm
