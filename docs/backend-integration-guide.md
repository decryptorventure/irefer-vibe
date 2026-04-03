# Backend Integration Guide

Hướng dẫn này giúp dev backend kết nối iRefer frontend với server thực.

---

## 1. Cấu hình môi trường

Tạo file `.env.local` ở root của dự án frontend:

```bash
# API server
VITE_API_BASE_URL=https://api.staging.ikameglobal.com/api/v1
VITE_USE_MOCK=false

# Google OAuth
VITE_AUTH_PROVIDER=google
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>

# Không bắt buộc
VITE_ENABLE_DEVTOOLS=true
```

**Lưu ý:**
- `VITE_USE_MOCK=true` (mặc định): Frontend dùng mock data, không gọi backend
- `VITE_USE_MOCK=false`: Frontend gọi `VITE_API_BASE_URL` thực sự

---

## 2. Cách hoạt động của Service Layer

Mỗi service file trong `src/services/` có cùng pattern:

```typescript
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function getJobs(params?) {
  if (USE_MOCK) {
    return mockGetJobs(params);  // ← Trả mock data ngay lập tức
  }
  // ← Backend chỉ cần implement endpoint này
  const { data } = await apiClient.get('/jobs', { params });
  return data;
}
```

Chỉ cần set `VITE_USE_MOCK=false` và đảm bảo response format match TypeScript interfaces trong `src/types/`.

---

## 3. Authentication Setup

### Google OAuth Flow

```
1. Frontend redirect user đến Google OAuth consent screen
2. User chọn account @ikameglobal.com
3. Google trả về idToken (JWT)
4. Frontend gọi POST /auth/google { idToken }
5. Backend verify idToken với Google
6. Backend tạo iRefer session, trả { user, accessToken, refreshToken, expiresAt }
7. Frontend lưu token, redirect về /
```

Backend cần implement:
```
POST /auth/google      Body: { idToken: string }
GET  /auth/me          Header: Authorization Bearer
POST /auth/refresh     Body: { refreshToken: string }
POST /auth/logout      Header: Authorization Bearer
```

Xem đầy đủ request/response schema trong `docs/api-contracts.md#authentication`

### JWT Configuration (Backend)

```bash
JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=1h                    # Access token TTL
JWT_REFRESH_EXPIRES_IN=7d            # Refresh token TTL
GOOGLE_CLIENT_ID=<same-as-frontend>
```

---

## 4. Bảng Service → Endpoint

Tham khảo đầy đủ trong `src/services/README.md`, tóm tắt:

| Service | Endpoint | Method |
|---------|----------|--------|
| `auth-service.ts` | `/auth/google` | POST |
| `auth-service.ts` | `/auth/me` | GET |
| `jobs-service.ts` | `/jobs` | GET |
| `jobs-service.ts` | `/jobs/:id` | GET |
| `referrals-service.ts` | `/referrals` | GET, POST |
| `referrals-service.ts` | `/referrals/:id` | GET |
| `referrals-service.ts` | `/referrals/upload-cv` | POST |
| `points-service.ts` | `/me/stats` | GET |
| `points-service.ts` | `/leaderboard` | GET |
| `points-service.ts` | `/me/points-history` | GET |
| `rewards-service.ts` | `/rewards` | GET |
| `rewards-service.ts` | `/rewards/:id/redeem` | POST |
| `notifications-service.ts` | `/notifications` | GET |
| `notifications-service.ts` | `/notifications/read-all` | PUT |
| `activities-service.ts` | `/me/activities` | GET |

---

## 5. CV Upload Flow (Presigned S3 URL)

Frontend thực hiện 3 bước:

```
Step 1: POST /referrals/upload-cv
  Body: { fileName, fileType, fileSize }
  Response: { uploadUrl, cvUrl }

Step 2: PUT <uploadUrl>  (direct to S3, NO Authorization header)
  Body: raw file binary
  Headers: Content-Type: application/pdf

Step 3: POST /referrals
  Body: { ..., cvUrl: <cvUrl từ step 1> }
```

Backend chỉ cần:
1. Generate presigned S3 PUT URL (expires sau 5 phút)
2. Trả `uploadUrl` (S3 presigned) và `cvUrl` (CDN URL sau khi upload)
3. Backend không xử lý file binary

---

## 6. Removing Fake Delays

Khi `VITE_USE_MOCK=false`, frontend dùng Axios client thực, không có artificial delays. Loading states được handle bởi React Query — dev không cần làm gì thêm.

React Query đã configured với:
- `staleTime: 30_000` (cache 30 giây)
- `retry: 1` (retry 1 lần khi lỗi)
- 401 → auto clear session + redirect `/login`

---

## 7. CORS Configuration (Backend)

Cho phép requests từ frontend origin:

```
Access-Control-Allow-Origin: http://localhost:3000  (dev)
Access-Control-Allow-Origin: https://irefer.ikameglobal.com  (prod)
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

## 8. iHiring Integration

Xem chi tiết: **`docs/ihiring-integration.md`**

Tóm tắt:
- Backend cần tạo Application trên iHiring khi user submit referral
- iHiring webhook POST tới `/webhooks/ihiring/status-update` khi status thay đổi
- Backend award points theo `docs/gamification-rules.md`

---

## 9. Checklist Integration

- [ ] `POST /auth/google` trả `{ user, accessToken, refreshToken, expiresAt }`
- [ ] `GET /auth/me` trả User object
- [ ] `GET /jobs` trả `PaginatedResponse<Job>` với đúng field types
- [ ] `POST /referrals` returns Referral với timeline đầy đủ
- [ ] `POST /referrals/upload-cv` trả `{ uploadUrl, cvUrl }`
- [ ] `GET /me/stats` trả `DashboardStats` với `monthlyPoints` field
- [ ] Webhook iHiring được verify signature trước khi xử lý
- [ ] CORS configured cho frontend origins
- [ ] Error responses theo convention trong `api-contracts.md`
