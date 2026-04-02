---
phase: 01
title: Architecture & Data Layer Setup
status: pending
priority: critical
effort: M (1 day)
---

# Phase 01 — Architecture & Data Layer Setup

## Overview

Thiết lập nền tảng kiến trúc để toàn bộ app có thể swap mock data → real API chỉ bằng cách thay service implementations. Dev backend chỉ cần implement đúng interface đã định nghĩa.

## Architecture Pattern

```
Page/Component
    ↓ calls
Custom Hook (useJobs, useReferrals...)   ← React Query
    ↓ calls
Service Function (getJobs, submitReferral...)
    ↓ calls
[Mock Implementation] → swap → [Real API Client (axios/fetch)]
```

## Dependencies to Install

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand
npm install axios
```

## Files to Create

### 1. `src/types/index.ts` — Re-export all types

```typescript
export * from './auth-types';
export * from './job-types';
export * from './referral-types';
export * from './gamification-types';
```

### 2. `src/types/auth-types.ts`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;            // company email
  avatar?: string;
  department: string;
  employeeCode: string;
  points: number;
  level: UserLevel;
  badges: Badge[];
  joinedAt: string;
}

export type UserLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
```

### 3. `src/types/job-types.ts`

```typescript
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  isHot: boolean;
  isActive: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  rewardPoints: number;       // points awarded on onboard
  bonusPoints?: number;       // extra bonus if any
  publishDate: string;
  deadline?: string;
  iHiringJobId: string;       // iHiring ATS reference
  referralCount: number;
}

export interface JobListParams {
  search?: string;
  department?: string;
  location?: string;
  isHot?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 4. `src/types/referral-types.ts`

```typescript
export type ReferralStatus =
  | 'submitted'        // CV vừa gửi
  | 'screening'        // Đang lọc CV
  | 'interview_1'      // Phỏng vấn vòng 1
  | 'interview_2'      // Phỏng vấn vòng 2
  | 'offer_sent'       // Đã gửi offer
  | 'onboarded'        // Đã nhận việc
  | 'rejected';        // Từ chối

export interface ReferralTimeline {
  status: ReferralStatus;
  label: string;
  date?: string;
  note?: string;
  pointsAwarded?: number;
  completed: boolean;
}

export interface Referral {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLinkedin?: string;
  jobId: string;
  jobTitle: string;
  cvUrl?: string;
  notes?: string;
  status: ReferralStatus;
  totalPointsEarned: number;
  submittedAt: string;
  updatedAt: string;
  timeline: ReferralTimeline[];
  iHiringApplicationId?: string;   // reference to iHiring
}

export interface SubmitReferralPayload {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLinkedin?: string;
  jobId: string;
  cvFile?: File;
  cvUrl?: string;                  // alternative: LinkedIn/drive URL
  notes?: string;
}
```

### 5. `src/types/gamification-types.ts`

```typescript
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  department: string;
  avatar?: string;
  points: number;
  referralCount: number;
  onboardCount: number;
  isCurrentUser?: boolean;
}

export interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  reason: string;
  referralId?: string;
  rewardId?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  pointsCost: number;
  category: 'voucher' | 'gift' | 'experience' | 'cash';
  stock?: number;
  isAvailable: boolean;
}

export interface DashboardStats {
  totalReferrals: number;
  pendingReferrals: number;
  successfulOnboards: number;
  totalPointsEarned: number;
  currentPoints: number;
  rank: number;
  totalUsers: number;
}
```

### 6. `src/services/api-client.ts`

```typescript
// HTTP client configuration — backend team fills in baseURL from env
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 → redirect to login
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 7. `src/services/mock-data/` — Folder with all mock data files

Move all hardcoded arrays from pages into:
- `src/services/mock-data/mock-jobs.ts`
- `src/services/mock-data/mock-referrals.ts`
- `src/services/mock-data/mock-leaderboard.ts`
- `src/services/mock-data/mock-rewards.ts`

### 8. Service files with dual implementation:

**`src/services/jobs-service.ts`** — example pattern:

```typescript
import { Job, JobListParams, PaginatedResponse } from '@/types';
import { mockJobs } from './mock-data/mock-jobs';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function getJobs(params?: JobListParams): Promise<PaginatedResponse<Job>> {
  if (USE_MOCK) {
    // Mock implementation
    let data = [...mockJobs];
    if (params?.search) {
      data = data.filter(j => j.title.toLowerCase().includes(params.search!.toLowerCase()));
    }
    return { data, total: data.length, page: 1, pageSize: 20 };
  }
  // Real API call — backend fills this in
  const { data } = await apiClient.get('/jobs', { params });
  return data;
}
```

Apply same pattern to: `referrals-service.ts`, `auth-service.ts`, `points-service.ts`, `rewards-service.ts`

### 9. `src/hooks/` — React Query hooks

```typescript
// src/hooks/use-jobs.ts
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '@/services/jobs-service';

export function useJobs(params?: JobListParams) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => getJobs(params),
  });
}
```

### 10. `src/store/auth-store.ts` — Zustand

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setSession: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      clearSession: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    { name: 'irefer-auth' }
  )
);
```

### 11. Update `src/main.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
```

### 12. `.env.local` template

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true
VITE_AUTH_PROVIDER=google    # google | microsoft
VITE_GOOGLE_CLIENT_ID=
VITE_MICROSOFT_CLIENT_ID=
```

## Implementation Steps

1. Install dependencies (`@tanstack/react-query`, `zustand`, `axios`)
2. Create `src/types/` directory with all interface files
3. Create `src/services/mock-data/` — move all hardcoded data from pages here
4. Create service files (jobs, referrals, auth, points, rewards) with mock+real dual pattern
5. Create React Query hooks in `src/hooks/`
6. Create Zustand auth store in `src/store/`
7. Update `main.tsx` with QueryClientProvider
8. Create `.env.local` + `.env.example` files
9. Run `npm run lint` to verify no TypeScript errors

## Success Criteria

- [ ] All TypeScript interfaces defined — zero `any` types in types layer
- [ ] Service files have clear comments marking where real API calls go
- [ ] `VITE_USE_MOCK=false` toggle compiles without errors
- [ ] Mock data extracted from all page files
- [ ] `npm run lint` passes clean
