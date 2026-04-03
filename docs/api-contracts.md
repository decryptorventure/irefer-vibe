# iRefer Vibe — API Contracts

Tài liệu này mô tả toàn bộ API endpoints mà Frontend yêu cầu Backend implement.

- **Base URL:** `/api/v1`
- **Auth:** `Authorization: Bearer <accessToken>` (trừ public endpoints)
- **Content-Type:** `application/json` (trừ upload endpoints)

---

## Technical Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| **Auth Provider** | Google OAuth | Frontend sẵn sàng tích hợp, cần `VITE_GOOGLE_CLIENT_ID` |
| **CV Upload** | Presigned S3 URL | Frontend PUT thẳng vào S3, backend chỉ cần trả `uploadUrl` |
| **iHiring Sync** | Webhook (khuyến nghị) | iHiring POST status changes → backend → update referral + trigger points |
| **Points Rules** | Configurable via API | Frontend fetch rules từ `GET /points-rules`, admin panel phase sau |

---

## Error Response Convention

Tất cả API errors phải trả về format sau:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email không hợp lệ",
    "details": [{ "field": "email", "message": "Định dạng email không đúng" }]
  }
}
```

| HTTP Status | Code | Ý nghĩa |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Request body/params không hợp lệ |
| 401 | `UNAUTHORIZED` | Token không hợp lệ hoặc đã hết hạn |
| 403 | `FORBIDDEN` | Không có quyền truy cập resource |
| 404 | `NOT_FOUND` | Resource không tồn tại |
| 409 | `CONFLICT` | Referral đã tồn tại cho candidate này và job này |
| 422 | `UNPROCESSABLE` | Logic error (điểm không đủ để redeem) |
| 500 | `INTERNAL_ERROR` | Lỗi server |

---

## Pagination Convention

Tất cả list endpoints hỗ trợ pagination với format:
```json
{
  "data": [...],
  "total": 42,
  "page": 1,
  "pageSize": 10
}
```
**Query params:** `?page=1&pageSize=10`

---

## Points Rules (Current Defaults)

| Event | Points | Description |
|-------|--------|-------------|
| `submitted` | +5đ | Submit CV hợp lệ |
| `screening` | +10đ | CV pass sơ loại |
| `interview` | +20đ | Pass phỏng vấn |
| `onboarded` | +50đ | Ứng viên onboard |
| `hot_bonus` | +50đ | Bonus cho vị trí HOT |

**Points Matrix theo Seniority** (từ `src/lib/points-utils.ts`):

| Stage | Junior | Middle | Senior |
|-------|--------|--------|--------|
| screening | 1đ | 2đ | 3đ |
| shared (giới thiệu khi share) | 2đ | 4đ | 6đ |
| interview | 3đ | 5đ | 10đ |
| **onboard** | **5đ** | **10đ** | **15đ** |

---

## Ambassador Tiers

| Tier | Points | Reward |
|------|--------|--------|
| Người nhóm lửa | 10đ | 100.000đ |
| Đại sứ dự bị | 25đ | 300.000đ |
| Silver Ambassador | 50đ | 1.000.000đ |
| Đại sứ bền bỉ | 80đ | 2.000.000đ |
| Gold Ambassador | 100đ | Quà công nghệ 5.000.000đ |
| Champion of the Year | 120đ | 10.000.000đ + Vinh danh |

---

## 1. Authentication (Public)

### POST `/auth/google`
Exchange Google ID token cho app session.

**Payload:**
```json
{ "idToken": "eyJhbGciOiJS..." }
```
**Response (200 OK):**
```json
{
  "user": {
    "id": "usr_123",
    "name": "Nguyễn Thành",
    "email": "nguyen.thanh@ikameglobal.com",
    "avatar": "https://cdn.example.com/avatar.jpg",
    "department": "Phòng Kinh Doanh",
    "employeeCode": "IKG-2024-042",
    "points": 85,
    "badges": [],
    "joinedAt": "2024-01-15T00:00:00Z"
  },
  "accessToken": "eyJhbGciO...",
  "refreshToken": "eyJhbGciO...",
  "expiresAt": 1735689600000
}
```
**Errors:** 401 nếu `idToken` không hợp lệ hoặc email không phải `@ikameglobal.com`

---

### POST `/auth/refresh`
Làm mới access token.

**Payload:** `{ "refreshToken": "..." }`
**Response:** `{ "accessToken": "..." }`
**Errors:** 401 nếu refresh token đã hết hạn hoặc bị thu hồi

---

### POST `/auth/logout`
**Header:** `Authorization: Bearer <accessToken>`
**Response:** 200 OK (thu hồi refresh token trên server)

---

### GET `/auth/me`
Trả về current user profile (same shape as `user` trong login response).
**Errors:** 401 nếu token không hợp lệ

---

## 2. Dashboard & Gamification

### GET `/me/stats`
Dashboard summary cho user đang đăng nhập.

**Response (200 OK):**
```json
{
  "totalReferrals": 3,
  "pendingReferrals": 2,
  "successfulOnboards": 1,
  "totalPointsEarned": 90,
  "currentPoints": 85,
  "rank": 4,
  "totalUsers": 42,
  "monthlyReferrals": 2,
  "monthlyPoints": 15
}
```

---

### GET `/leaderboard`
**Query Parameters:**
- `period`: `monthly` (default) | `quarterly` | `alltime`
- `limit`: default `10`

**Response (200 OK):**
```json
[
  {
    "rank": 1,
    "userId": "usr_123",
    "name": "Hoàng Minh",
    "department": "Phòng CNTT",
    "avatar": "https://cdn.example.com/avatar.jpg",
    "points": 115,
    "referralCount": 8,
    "onboardCount": 3,
    "isCurrentUser": false
  }
]
```

---

### GET `/me/points-history`
**Query Parameters:** `page=1`, `pageSize=10`

**Response:** `PaginatedResponse<PointTransaction>`
```json
{
  "data": [
    {
      "id": "PT-001",
      "type": "earned",
      "points": 50,
      "reason": "Michael Chen onboard vào vị trí Product Manager",
      "referralId": "REF-002",
      "createdAt": "2026-04-01T09:00:00Z"
    }
  ],
  "total": 6,
  "page": 1,
  "pageSize": 10
}
```
`type`: `"earned"` | `"redeemed"`

---

### GET `/points-rules`
Configurable points rules (cho admin panel).

**Response:**
```json
[
  { "event": "submitted", "label": "Submit CV hợp lệ", "points": 5 },
  { "event": "screening", "label": "CV Pass Sơ loại", "points": 10 },
  { "event": "interview", "label": "Pass Phỏng vấn", "points": 20 },
  { "event": "onboarded", "label": "Ứng viên Onboard", "points": 50 }
]
```

---

### GET `/badges`
Tất cả badges trong hệ thống + trạng thái đã earn của current user.

**Response:**
```json
[
  {
    "id": "badge_first_fire",
    "name": "Ngọn lửa đầu tiên",
    "description": "Giới thiệu thành công 1 ứng viên",
    "icon": "🔥",
    "isEarned": true,
    "earnedAt": "2026-03-01T00:00:00Z"
  }
]
```

---

### GET `/me/activities`
Hoạt động gần đây của user (cho Activity Feed trên Dashboard).

**Response:**
```json
[
  {
    "id": "act_1",
    "actorName": "Trần Minh Tuấn",
    "action": "đã được tuyển vào vị trí",
    "targetName": "Senior DevOps",
    "points": 50,
    "timeAgo": "2 giờ trước",
    "color": "green",
    "category": "today"
  }
]
```
`color`: `"green"` | `"blue"` | `"orange"` | `"yellow"`
`category`: `"today"` | `"yesterday"` | `"this_week"` | `"earlier"`

---

## 3. Referrals

### GET `/referrals`
Tất cả referrals của user đang đăng nhập.

**Query Parameters:**
- `status`: filter by `ReferralStatus`
- `page`, `pageSize`

**Response:** `PaginatedResponse<Referral>`

---

### GET `/referrals/:id`
Chi tiết referral kèm timeline.

**Response:**
```json
{
  "id": "REF-001",
  "candidateName": "Nguyễn Văn A",
  "candidateEmail": "ungvien@email.com",
  "candidatePhone": "0987654321",
  "candidateLinkedin": "https://linkedin.com/in/nguyenvana",
  "jobId": "JOB-123",
  "jobTitle": "Senior Backend Engineer",
  "cvUrl": "https://cdn.example.com/cv/uuid.pdf",
  "notes": "Ứng viên có 5 năm kinh nghiệm.",
  "status": "interview_1",
  "totalPointsEarned": 15,
  "submittedAt": "2026-03-01T00:00:00Z",
  "updatedAt": "2026-03-15T00:00:00Z",
  "iHiringApplicationId": "IH-APP-001",
  "timeline": [
    { "status": "submitted", "label": "Gửi giới thiệu", "date": "2026-03-01", "completed": true, "note": "CV đã được gửi", "pointsAwarded": 5 },
    { "status": "screening", "label": "Lọc CV", "date": "2026-03-05", "completed": true, "note": "CV pass vòng lọc", "pointsAwarded": 10 },
    { "status": "interview_1", "label": "Phỏng vấn vòng 1", "date": "", "completed": false, "note": "" }
  ]
}
```

**ReferralStatus values:**
- `submitted` — CV vừa gửi
- `screening` — Đang lọc CV
- `interview_1` — Phỏng vấn vòng 1
- `interview_2` — Phỏng vấn vòng 2
- `offer_sent` — Đã gửi offer
- `onboarded` — Đã nhận việc (triggers full point award)
- `rejected` — Từ chối

---

### POST `/referrals/upload-cv`
**Bước 1 của CV upload flow.** Backend tạo presigned S3 URL.

**Payload:**
```json
{
  "fileName": "nguyen-van-a-cv.pdf",
  "fileType": "application/pdf",
  "fileSize": 1048576
}
```
**File constraints:** PDF, DOC, DOCX, max 5MB

**Response (200 OK):**
```json
{
  "uploadUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket/key?X-Amz-Signature=...",
  "cvUrl": "https://cdn.ikameglobal.com/cv-uploads/uuid.pdf"
}
```

> **Frontend flow:**
> 1. `POST /referrals/upload-cv` → nhận `{ uploadUrl, cvUrl }`
> 2. `PUT <uploadUrl>` với raw file (không có Authorization header)
> 3. `POST /referrals` với `cvUrl` từ bước 1

---

### POST `/referrals`
Tạo referral mới.

**Payload:**
```json
{
  "candidateName": "Nguyễn Văn A",
  "candidateEmail": "email@example.com",
  "candidatePhone": "0987654321",
  "candidateLinkedin": "https://linkedin.com/in/nguyenvana",
  "cvUrl": "https://cdn.ikameglobal.com/cv-uploads/uuid.pdf",
  "jobId": "JOB-123",
  "notes": "Ứng viên có 5 năm kinh nghiệm."
}
```

**Response (201 Created):** Referral object như GET `/referrals/:id`

**Errors:**
- 409 nếu candidate email đã được refer cho job này trong 90 ngày
- 400 nếu `jobId` không tồn tại hoặc job đã đóng

---

## 4. Jobs (Sync từ iHiring)

### GET `/jobs`
Danh sách jobs đang mở.

**Query Parameters:**
- `isHot`: `true` | `false`
- `department`: tên phòng ban
- `search`: full-text search trên title
- `page`, `pageSize`

**Response:** `PaginatedResponse<Job>`
```json
{
  "data": [{
    "id": "JOB-123",
    "title": "Senior Backend Engineer",
    "department": "Phòng CNTT",
    "location": "Hà Nội",
    "type": "Full-time",
    "isHot": true,
    "isActive": true,
    "description": "...",
    "responsibilities": ["Thiết kế kiến trúc backend...", "..."],
    "requirements": ["5+ năm kinh nghiệm...", "..."],
    "benefits": ["Lương cạnh tranh", "..."],
    "seniorityLevel": "senior",
    "rewardPoints": 15,
    "publishDate": "2026-03-01",
    "deadline": "2026-05-01",
    "iHiringJobId": "IH-JOB-456",
    "referralCount": 3
  }],
  "total": 12,
  "page": 1,
  "pageSize": 10
}
```

---

### GET `/jobs/:id`
Chi tiết một job.

---

### GET `/jobs/departments`
Danh sách tên phòng ban có jobs đang mở (cho filter dropdown).

**Response:** `string[]` — ví dụ `["Phòng CNTT", "Phòng Marketing", ...]`

---

## 5. Rewards

### GET `/rewards`
Danh sách phần thưởng có thể đổi.

**Query Parameters:** `category`: `voucher` | `gift` | `experience` | `cash`

**Response:**
```json
[
  {
    "id": "RWD-001",
    "name": "Voucher mua sắm 500.000đ",
    "description": "Voucher Tiki / Shopee / Lazada",
    "imageUrl": "https://cdn.example.com/rewards/voucher.png",
    "pointsCost": 30,
    "category": "voucher",
    "stock": 10,
    "isAvailable": true
  }
]
```
`stock`: số nguyên (còn hàng) hoặc `null` (không giới hạn)

---

### POST `/rewards/:id/redeem`
Đổi phần thưởng.

**Header:** `Authorization: Bearer <accessToken>`
**Response (200 OK):**
```json
{
  "success": true,
  "remainingPoints": 20,
  "message": "Đổi thưởng thành công!"
}
```
**Errors:**
- 422 nếu điểm không đủ
- 409 nếu hết hàng

---

### GET `/me/redemptions`
Lịch sử đổi thưởng.

**Response:**
```json
[
  {
    "id": "RDM-001",
    "rewardId": "RWD-001",
    "rewardName": "Voucher mua sắm 500.000đ",
    "pointsCost": 30,
    "redeemedAt": "2026-03-15T00:00:00Z",
    "status": "fulfilled"
  }
]
```
`status`: `"pending"` | `"fulfilled"` | `"cancelled"`

---

## 6. Notifications

### GET `/notifications`
Thông báo của user.

**Query Parameters:** `isRead`: `true` | `false`, `page`, `pageSize`

**Response:**
```json
[
  {
    "id": "notif_001",
    "type": "points_earned",
    "title": "Nhận được điểm thưởng!",
    "body": "Ứng viên Nguyễn Văn A của bạn đã pass vòng sơ loại. +10đ",
    "isRead": false,
    "pointsDelta": 10,
    "referralId": "REF-001",
    "createdAt": "2026-04-01T09:00:00Z"
  }
]
```
`type`: `"referral_update"` | `"points_earned"` | `"badge_earned"` | `"reward_redeemed"` | `"rank_changed"`

---

### PUT `/notifications/read-all`
Đánh dấu tất cả thông báo là đã đọc. **Response:** 200 OK

---

### PUT `/notifications/:id/read`
Đánh dấu một thông báo là đã đọc. **Response:** 200 OK

---

## 7. Webhooks — Backend nhận từ iHiring

### POST `/webhooks/ihiring/status-update`
iHiring gọi endpoint này khi trạng thái ứng viên thay đổi.

**iHiring → iRefer Status Mapping:**
| iHiring Status | iRefer ReferralStatus |
|---|---|
| `new` | `submitted` |
| `screening` | `screening` |
| `interview_1` | `interview_1` |
| `interview_2` | `interview_2` |
| `offer` | `offer_sent` |
| `hired` | `onboarded` |
| `rejected` | `rejected` |

**Expected webhook payload từ iHiring:**
```json
{
  "event": "application.status_changed",
  "applicationId": "IH-APP-001",
  "jobId": "IH-JOB-456",
  "candidateEmail": "ungvien@email.com",
  "oldStatus": "screening",
  "newStatus": "interview_1",
  "changedAt": "2026-04-01T10:00:00Z"
}
```

**Backend phải làm sau khi nhận webhook:**
1. Tìm referral theo `applicationId` (match với `iHiringApplicationId` field)
2. Cập nhật `referral.status` → ReferralStatus tương ứng
3. Tính và award points theo POINTS_MATRIX (dựa trên seniority của job)
4. Tạo notification cho user
5. Nếu status = `onboarded` → award Hot Bonus nếu job `isHot = true`

**Authentication:** Verify signature header từ iHiring (secret key trong env)
