# iRefer — Developer Handoff Checklist

Tài liệu này dành cho dev nhận bàn giao Frontend để tích hợp Backend.

---

## 📦 Cấu trúc bàn giao

```
irefer-vibe/
├── src/                      ← Frontend source code
│   ├── services/README.md    ← Bắt đầu đọc từ đây
│   └── types/               ← TypeScript interfaces = API contracts
├── docs/
│   ├── api-contracts.md      ← REST API spec đầy đủ
│   ├── backend-integration-guide.md
│   ├── ihiring-integration.md
│   └── gamification-rules.md
├── .env.example              ← Copy thành .env.local
└── README.md                 ← Setup guide
```

---

## ✅ Checklist cho Backend Dev

### Setup

- [ ] Đọc `docs/api-contracts.md` — nắm tất cả endpoints cần implement
- [ ] Đọc `src/services/README.md` — bảng service → endpoint
- [ ] Copy `.env.example` → `.env.local` và điền values
- [ ] Chạy `npm install && npm run dev` để xem UI

### Authentication

- [ ] Implement `POST /auth/google` — nhận idToken, verify Google, trả JWT
- [ ] Implement `GET /auth/me` — trả User profile
- [ ] Implement `POST /auth/refresh` — đổi refresh token lấy access token
- [ ] Implement `POST /auth/logout` — thu hồi refresh token
- [ ] Test: set `VITE_USE_MOCK=false`, click "Đăng nhập với Google" → flow hoạt động

### Core API

- [ ] `GET /jobs` — sync từ iHiring, trả `PaginatedResponse<Job>`
- [ ] `GET /jobs/:id` — job detail
- [ ] `GET /jobs/departments` — danh sách phòng ban
- [ ] `POST /referrals/upload-cv` — trả `{ uploadUrl, cvUrl }` (presigned S3)
- [ ] `POST /referrals` — tạo referral + gọi iHiring API
- [ ] `GET /referrals` — danh sách referrals của user
- [ ] `GET /referrals/:id` — chi tiết + timeline

### Gamification

- [ ] `GET /me/stats` — dashboard stats
- [ ] `GET /leaderboard` — top users
- [ ] `GET /me/points-history` — lịch sử điểm
- [ ] `GET /rewards` — danh sách phần thưởng
- [ ] `POST /rewards/:id/redeem` — đổi thưởng
- [ ] `GET /notifications` — thông báo
- [ ] `PUT /notifications/read-all` — mark all read
- [ ] `GET /me/activities` — activity feed

### iHiring Integration

- [ ] Đọc `docs/ihiring-integration.md`
- [ ] Setup iHiring API key và webhook secret trong env
- [ ] Implement logic tạo Application trên iHiring khi `POST /referrals`
- [ ] Implement `POST /webhooks/ihiring/status-update`
- [ ] Verify webhook signature (HMAC-SHA256)
- [ ] Award points theo `docs/gamification-rules.md`
- [ ] Sync jobs từ iHiring (webhook hoặc polling)

### Final Verification

- [ ] Set `VITE_USE_MOCK=false` — tất cả pages load không lỗi
- [ ] Login flow end-to-end hoạt động
- [ ] Submit referral → xuất hiện trong My Referrals
- [ ] iHiring status change → points cập nhật trong frontend
- [ ] CORS được cấu hình đúng cho frontend origin

---

## 🔑 Key Type Interfaces

Đọc trong `src/types/` để biết chính xác response format cần return:

- `src/types/auth-types.ts` — User, LoginResult
- `src/types/job-types.ts` — Job, PaginatedResponse
- `src/types/referral-types.ts` — Referral, ReferralStatus, ReferralTimeline
- `src/types/gamification-types.ts` — DashboardStats, LeaderboardEntry, PointTransaction
- `src/types/reward-types.ts` — Reward, RedemptionResult
- `src/types/notification-types.ts` — Notification

---

## ❓ Liên hệ

Nếu có câu hỏi về frontend integration, liên hệ team Frontend với:
1. File + function name cần hỏi
2. Expected vs actual behavior
3. `VITE_USE_MOCK=true` để test với mock data trước khi report bug
