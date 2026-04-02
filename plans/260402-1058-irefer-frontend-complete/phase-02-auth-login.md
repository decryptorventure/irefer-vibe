---
phase: 02
title: Authentication & Protected Routes
status: pending
priority: critical
effort: S (0.5 day)
---

# Phase 02 — Authentication & Protected Routes

## Overview

Thêm màn hình đăng nhập bằng email công ty (Google/Microsoft OAuth) và bảo vệ tất cả routes. Backend team chỉ cần cấu hình OAuth client ID là xong.

## Files to Create

### `src/pages/Login.tsx`

- Logo iRefer + tagline
- Nút "Đăng nhập bằng Google Workspace" (primary) 
- Nút "Đăng nhập bằng Microsoft 365" (secondary — nếu dùng M365)
- UI: centered card, company branding
- Sau khi OAuth callback → gọi `authService.loginWithOAuth(token)` → lưu session vào Zustand + localStorage

```typescript
// Login flow
const handleGoogleLogin = async () => {
  // 1. Redirect to Google OAuth URL (từ auth-service)
  // 2. Google callback → /auth/callback?code=xxx
  // 3. AuthCallback component gọi authService.exchangeCode(code)
  // 4. Server trả User + JWT → setSession() → redirect /
};
```

### `src/pages/AuthCallback.tsx`

- Route: `/auth/callback`
- Xử lý OAuth redirect code, gọi backend để exchange token
- Loading spinner trong lúc chờ
- Redirect về `/` khi thành công, `/login?error=xxx` khi thất bại

### `src/components/auth/protected-route.tsx`

```typescript
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

### `src/services/auth-service.ts`

```typescript
export interface LoginResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Mock: tự động login với user giả
export async function loginWithGoogle(idToken: string): Promise<LoginResult> { ... }
export async function loginWithMicrosoft(accessToken: string): Promise<LoginResult> { ... }
export async function logout(): Promise<void> { ... }
export async function refreshAccessToken(refreshToken: string): Promise<string> { ... }
export async function getCurrentUser(): Promise<User> { ... }
```

## Files to Modify

### `src/App.tsx`

```typescript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/auth/callback" element={<AuthCallback />} />
  <Route path="/" element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }>
    {/* existing routes */}
  </Route>
</Routes>
```

### `src/components/layout/Header.tsx`

- Thêm avatar + tên user (từ `useAuthStore`)
- Dropdown: Trang cá nhân, Đổi thưởng, Đăng xuất
- Hiển thị điểm hiện tại của user trên header

## Implementation Steps

1. Create `src/pages/Login.tsx` với Google/Microsoft login buttons
2. Create `src/pages/AuthCallback.tsx` để xử lý OAuth callback
3. Create `src/components/auth/protected-route.tsx`
4. Create `src/services/auth-service.ts` với mock + real dual pattern
5. Update `src/App.tsx` — wrap routes với `ProtectedRoute`
6. Update `src/components/layout/Header.tsx` — user avatar + logout
7. Test mock login flow end-to-end

## UI Design

```
┌────────────────────────────────────┐
│         iRefer                     │
│    Hệ thống giới thiệu nhân sự     │
│                                    │
│  ┌──────────────────────────────┐  │
│  │  🔵 Đăng nhập Google Workspace │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  🟦 Đăng nhập Microsoft 365  │  │
│  └──────────────────────────────┘  │
│                                    │
│  Chỉ tài khoản @ikameglobal.com    │
│  mới được phép đăng nhập           │
└────────────────────────────────────┘
```

## Success Criteria

- [ ] `/login` hiển thị đúng, không thể access routes khác khi chưa login
- [ ] Mock login hoạt động (click button → redirect vào app với user giả)
- [ ] Header hiển thị tên + điểm của logged-in user
- [ ] Logout xóa session và redirect về `/login`
- [ ] `npm run lint` clean
