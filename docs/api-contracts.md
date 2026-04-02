# iRefer Vibe API Contracts

This document formalizes the API endpoints required by the Frontend application from the Backend services.
Base URL: `/api/v1`

## Technical Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| **Auth Provider** | Google OAuth | Frontend sẵn sàng tích hợp, cần `VITE_GOOGLE_CLIENT_ID` |
| **CV Upload** | Multipart → Backend → iHiring | Frontend gửi file qua `POST /referrals/upload-cv`, backend forward sang iHiring |
| **iHiring Sync** | Webhook | iHiring POST status changes → backend → update referral + trigger points |
| **Points Rules** | Configurable via Admin Panel | Frontend fetch rules từ API, admin panel sẽ xây ở phase sau |

## Points Rules (Current Defaults)

| Event | Points | Description |
|-------|--------|-------------|
| `submitted` | +5đ | Submit CV hợp lệ |
| `screening` | +10đ | CV pass sơ loại |
| `interview` | +20đ | Pass phỏng vấn |
| `onboarded` | +50đ | Ứng viên onboard |
| `hot_bonus` | +50đ | Bonus cho vị trí HOT |

## Ambassador Tiers

| Tier | Points | Reward |
|------|--------|--------|
| Bronze | 15đ | Áo / Cốc iKame |
| Silver | 30đ | Voucher 500k |
| Gold | 80đ | Voucher 2 Triệu |
| Diamond | 120đ | Tiền mặt 5TR |

---

## 1. Authentication

### POST `/auth/google`
Exchange Google ID token for app session.
**Payload:**
```json
{
  "idToken": "eyJhbGciOiJS..."
}
```
**Response (200 OK):**
```json
{
  "user": {
    "id": "usr_123",
    "name": "Nguyễn Thành",
    "email": "nguyen.thanh@ikameglobal.com",
    "department": "Phòng Kinh Doanh",
    "employeeCode": "IKG-2024-042",
    "points": 85,
    "badges": [],
    "joinedAt": "2024-01-15T00:00:00Z"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "expiresAt": 1735689600000
}
```

### POST `/auth/refresh`
**Payload:** `{ "refreshToken": "..." }`

### POST `/auth/logout`
**Header:** `Authorization: Bearer <accessToken>`

### GET `/auth/me`
Returns current user profile (same shape as `user` above).

---

## 2. Gamification & Dashboard

### GET `/me/stats`
Retrieves dashboard summary statistics for the logged-in user.

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
  "monthlyReferrals": 2
}
```

### GET `/leaderboard`
Retrieves the leaderboard (top users by points).
**Query Parameters:**
- `period` (optional): `monthly` (default). Frontend currently only uses `monthly`.
- `limit` (optional): default `5`

**Response (200 OK):**
```json
[
  {
    "rank": 1,
    "userId": "usr_123",
    "name": "Hoàng Minh",
    "department": "Phòng CNTT",
    "avatar": "HM",
    "points": 115,
    "referralCount": 8,
    "onboardCount": 3,
    "isCurrentUser": false
  }
]
```

### GET `/me/points-history`
**Query Parameters:** `page`, `pageSize` (default 10)

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

### GET `/points-rules`
Returns configurable points rules (for admin panel configuration).

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

## 3. Referrals

### POST `/referrals/upload-cv`
Upload CV file — backend receives file, forwards to iHiring for storage.

**Payload:** `multipart/form-data`
- `file`: The CV file (PDF, DOC, DOCX, max 5MB)
- `jobId`: Target job ID (for iHiring routing)

**Response (200 OK):**
```json
{
  "cvUrl": "https://ihiring.ikameglobal.com/files/uuid.pdf",
  "iHiringFileId": "IH-FILE-001"
}
```

### POST `/referrals`
Submit a new referral.

**Payload:**
```json
{
  "candidateName": "Nguyễn Văn A",
  "candidateEmail": "email@example.com",
  "candidatePhone": "0987654321",
  "candidateLinkedin": "https://linkedin.com/in/nguyenvana",
  "cvUrl": "https://ihiring.ikameglobal.com/files/uuid.pdf",
  "jobId": "JOB-123",
  "notes": "Ứng viên có 5 năm kinh nghiệm."
}
```

### GET `/referrals`
**Query:** `?status=&page=&pageSize=` — returns user's referrals.

### GET `/referrals/:id`
Returns referral detail with timeline.

---

## 4. Jobs

### GET `/jobs`
List available jobs.
**Query Parameters:** `isHot`, `department`, `search`, `page`, `pageSize`

### GET `/jobs/:id`
Returns job detail.

---

## 5. Activities

### GET `/activities`
Global system activities (for the Activity Feed).

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

---

## 6. Webhooks (Backend receives from iHiring)

### POST `/webhooks/ihiring/status-update`
iHiring calls this when referral status changes.

**iHiring Status → iRefer Status Mapping:**
```
new         → submitted
screening   → screening
interview_1 → interview_1
interview_2 → interview_2
offer       → offer_sent
hired       → onboarded
rejected    → rejected
```

Backend should: update referral status → calculate & award points → create notification → broadcast via SSE/polling.
