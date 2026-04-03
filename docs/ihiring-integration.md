# iHiring Integration Guide

Tài liệu này mô tả cách iRefer Backend tích hợp với iHiring ATS (Applicant Tracking System).

---

## Tổng quan Architecture

```
[iRefer Frontend]
       │  POST /referrals (submit CV link or S3 URL)
       ▼
[iRefer Backend]
  ├── Tạo Referral record trong DB
  ├── Tạo Application trong iHiring ATS (via iHiring API)
  │     iHiringApplicationId ← lưu vào Referral record
  └── Trả Referral object về Frontend

[iHiring ATS]
  └── Khi trạng thái ứng viên thay đổi:
        POST /webhooks/ihiring/status-update → [iRefer Backend]
              │
              ├── Cập nhật Referral status
              ├── Award points theo POINTS_MATRIX
              ├── Tạo Notification cho user
              └── (Optional) Broadcast SSE để Frontend realtime update
```

---

## Referral Lifecycle — Sequence Diagram

```
User       Frontend        Backend          iHiring ATS
 │             │               │                 │
 │  Fill form  │               │                 │
 │────────────►│               │                 │
 │             │ POST /referrals/upload-cv        │
 │             │──────────────►│                 │
 │             │◄──────────────│ { uploadUrl, cvUrl }
 │             │ PUT <uploadUrl> (direct to S3)   │
 │             │──────────────────────────────────►│ (S3, not iHiring)
 │             │               │                 │
 │             │ POST /referrals                  │
 │             │──────────────►│                 │
 │             │               │ Create Application
 │             │               │────────────────►│
 │             │               │◄────────────────│ { applicationId }
 │             │               │ Save Referral (status=submitted)
 │             │◄──────────────│ Referral object │
 │             │               │                 │
 │   (Later)   │               │ POST /webhooks/ihiring/status-update
 │             │               │◄────────────────│
 │             │               │ Update status   │
 │             │               │ Award points    │
 │             │               │ Create notification
 │             │               │                 │
 │  Open app   │               │                 │
 │────────────►│ GET /referrals/:id              │
 │             │──────────────►│                 │
 │             │◄──────────────│ Updated Referral│
```

---

## iHiring API Integration (Backend → iHiring)

Backend cần gọi iHiring API để tạo application khi user submit referral.

### Create Application

```http
POST https://api.ihiring.ikameglobal.com/v1/applications
Authorization: Bearer <IHIRING_API_KEY>
Content-Type: application/json

{
  "jobId": "IH-JOB-456",           // Job.iHiringJobId
  "candidateEmail": "ungvien@email.com",
  "candidateName": "Nguyễn Văn A",
  "candidatePhone": "0987654321",
  "cvUrl": "https://cdn.example.com/cv/uuid.pdf",
  "referrerId": "IKG-2024-042",    // employeeCode của người giới thiệu
  "notes": "Giới thiệu qua iRefer"
}
```

**Response:**
```json
{
  "applicationId": "IH-APP-001",
  "status": "new"
}
```

> Lưu `applicationId` vào `Referral.iHiringApplicationId` để mapping sau này.

---

### Sync Jobs từ iHiring

Jobs trên iRefer phải được sync từ iHiring. Backend cần implement sync mechanism:

**Option A (recommended): Webhook từ iHiring**
- iHiring POST tới `/webhooks/ihiring/job-update` khi job được tạo/cập nhật/đóng
- Backend cập nhật `jobs` table

**Option B: Scheduled polling**
- Backend worker chạy mỗi 15 phút: `GET https://api.ihiring.ikameglobal.com/v1/jobs?isActive=true`
- Sync jobs mới, cập nhật jobs đã có, đánh dấu đóng jobs không còn trong list

**Job mapping iHiring → iRefer:**
```typescript
// iHiring job object → Job TypeScript interface
const mapIHiringJob = (ihJob: IHiringJob): Job => ({
  id: `JOB-${ihJob.id}`,
  title: ihJob.title,
  department: ihJob.department,
  location: ihJob.location,
  type: ihJob.employmentType,       // "full-time" → "Full-time"
  isHot: ihJob.tags?.includes('hot') ?? false,
  isActive: ihJob.status === 'open',
  description: ihJob.description,
  responsibilities: ihJob.responsibilities ?? [],
  requirements: ihJob.requirements ?? [],
  benefits: ihJob.benefits ?? [],
  seniorityLevel: mapSeniority(ihJob.level), // "L3" → "senior"
  publishDate: ihJob.publishedAt,
  deadline: ihJob.closingDate,
  iHiringJobId: ihJob.id,
  referralCount: ihJob.referralCount ?? 0,
});
```

---

## Webhook từ iHiring → iRefer Backend

### POST `/webhooks/ihiring/status-update`

**Header verification (bắt buộc):**
```
X-iHiring-Signature: sha256=<HMAC-SHA256(secret, body)>
```
Backend phải verify signature bằng `IHIRING_WEBHOOK_SECRET` trước khi xử lý.

**Payload:**
```json
{
  "event": "application.status_changed",
  "applicationId": "IH-APP-001",
  "jobId": "IH-JOB-456",
  "candidateEmail": "ungvien@email.com",
  "oldStatus": "screening",
  "newStatus": "interview_1",
  "changedAt": "2026-04-01T10:00:00Z",
  "metadata": {
    "interviewDate": "2026-04-10T09:00:00Z",
    "interviewer": "Nguyễn HR Manager"
  }
}
```

### Status Processing Logic (Pseudocode)

```typescript
async function processIHiringWebhook(payload: IHiringWebhookPayload) {
  // 1. Verify signature
  verifyIHiringSignature(payload, headers['x-ihiring-signature']);

  // 2. Find referral
  const referral = await db.referrals.findByIHiringAppId(payload.applicationId);
  if (!referral) return; // Not a referred application, ignore

  // 3. Map iHiring status → iRefer status
  const STATUS_MAP = {
    'new': 'submitted',
    'screening': 'screening',
    'interview_1': 'interview_1',
    'interview_2': 'interview_2',
    'offer': 'offer_sent',
    'hired': 'onboarded',
    'rejected': 'rejected',
  };
  const newStatus = STATUS_MAP[payload.newStatus];

  // 4. Update referral
  await db.referrals.updateStatus(referral.id, newStatus, payload.changedAt);

  // 5. Award points (xem gamification-rules.md)
  const pointsAwarded = await awardPoints(referral, newStatus);

  // 6. Create notification
  await createNotification(referral.referrerId, {
    type: 'referral_update',
    title: `Cập nhật ứng viên ${referral.candidateName}`,
    body: `${referral.candidateName} đã chuyển sang trạng thái: ${STATUS_LABELS[newStatus]}. ${pointsAwarded > 0 ? `+${pointsAwarded}đ` : ''}`,
    referralId: referral.id,
    pointsDelta: pointsAwarded,
  });

  // 7. Update referral timeline
  await db.referralTimeline.addEntry({
    referralId: referral.id,
    status: newStatus,
    completedAt: payload.changedAt,
    pointsAwarded,
  });
}
```

---

## Environment Variables (Backend)

```bash
# iHiring Integration
IHIRING_API_URL=https://api.ihiring.ikameglobal.com/v1
IHIRING_API_KEY=<secret>
IHIRING_WEBHOOK_SECRET=<webhook-signing-secret>

# Frontend URL (for CORS)
FRONTEND_URL=https://irefer.ikameglobal.com

# Auth
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
JWT_SECRET=<jwt-signing-secret>
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```
