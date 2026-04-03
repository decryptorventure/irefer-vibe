# Gamification Rules — iRefer

Tài liệu này mô tả toàn bộ logic tính điểm, tier hệ thống và cách backend phải implement.

> Source of truth: `src/lib/points-utils.ts`

---

## 1. Points Matrix (Seniority-based)

Điểm được tính dựa trên **seniority của job** (`Job.seniorityLevel`).

| Stage | Junior | Middle | Senior |
|-------|--------|--------|--------|
| `screening` | 1đ | 2đ | 3đ |
| `shared` (giới thiệu khi share) | 2đ | 4đ | 6đ |
| `interview` | 3đ | 5đ | 10đ |
| `onboarded` | 5đ | 10đ | **15đ** |

**Backend logic:**
```typescript
const POINTS_MATRIX = {
  junior: { screening: 1, shared: 2, interview: 3, onboard: 5 },
  middle: { screening: 2, shared: 4, interview: 5, onboard: 10 },
  senior: { screening: 3, shared: 6, interview: 10, onboard: 15 },
};

function calculatePoints(iReferStatus: ReferralStatus, seniorityLevel: 'junior' | 'middle' | 'senior'): number {
  const matrix = POINTS_MATRIX[seniorityLevel];
  switch (iReferStatus) {
    case 'screening':   return matrix.screening;
    case 'interview_1': return matrix.interview;
    case 'interview_2': return 0; // No extra points for round 2
    case 'onboarded':   return matrix.onboard;
    default:            return 0;
  }
}
```

---

## 2. Hot Bonus

Nếu `Job.isHot = true` và ứng viên được `onboarded` → award thêm **+50đ** (hot_bonus).

```typescript
function calculateHotBonus(job: Job, newStatus: ReferralStatus): number {
  if (job.isHot && newStatus === 'onboarded') return 50;
  return 0;
}
```

---

## 3. Ambassador Tiers

Tiers dựa trên **tổng điểm tích lũy** (`User.points`). Các mốc:

| Tier | Điểm tối thiểu | Reward |
|------|----------------|--------|
| Người nhóm lửa | 10đ | 100.000đ |
| Đại sứ dự bị | 25đ | 300.000đ |
| Silver Ambassador | 50đ | 1.000.000đ |
| Đại sứ bền bỉ | 80đ | 2.000.000đ |
| Gold Ambassador | 100đ | Quà công nghệ 5.000.000đ |
| Champion of the Year | 120đ | 10.000.000đ + Vinh danh |

Khi user vượt mốc tier mới:
1. Tạo Notification `type: "rank_changed"`
2. Tạo Badge nếu có badge tương ứng với tier đó

---

## 4. Points Award Flow

```typescript
async function awardPoints(referral: Referral, newStatus: ReferralStatus): Promise<number> {
  const job = await db.jobs.findById(referral.jobId);
  const basePoints = calculatePoints(newStatus, job.seniorityLevel);
  const hotBonus = calculateHotBonus(job, newStatus);
  const totalPoints = basePoints + hotBonus;

  if (totalPoints === 0) return 0;

  // 1. Create PointTransaction record
  await db.pointTransactions.create({
    userId: referral.referrerId,
    type: 'earned',
    points: totalPoints,
    reason: buildPointReason(referral, newStatus, hotBonus),
    referralId: referral.id,
  });

  // 2. Update User.points
  const user = await db.users.incrementPoints(referral.referrerId, totalPoints);

  // 3. Check if tier changed → create notification
  const previousTier = getTierForPoints(user.points - totalPoints);
  const newTier = getTierForPoints(user.points);
  if (newTier && newTier !== previousTier) {
    await createNotification(referral.referrerId, {
      type: 'rank_changed',
      title: `🎉 Bạn đã lên tier ${newTier.name}!`,
      body: `Chúc mừng! Bạn đã đạt ${newTier.name} với phần thưởng ${newTier.reward}`,
      pointsDelta: totalPoints,
    });
  }

  return totalPoints;
}
```

---

## 5. Leaderboard Calculation

- Leaderboard **monthly**: tổng điểm `earned` trong tháng hiện tại
- Leaderboard **quarterly**: tổng điểm `earned` trong quý hiện tại
- Leaderboard **alltime**: tổng `User.points`

Nên pre-compute và cache leaderboard mỗi 5 phút để tránh query nặng.

---

## 6. Badges

Badges được award tự động khi user đạt điều kiện:

| Badge | Điều kiện |
|-------|-----------|
| Ngọn lửa đầu tiên 🔥 | 1 referral thành công |
| Người dẫn đường ⭐ | 3 referrals thành công |
| Đại sứ bạc 🥈 | Đạt Silver Ambassador tier |
| Đại sứ vàng 🥇 | Đạt Gold Ambassador tier |
| Nhà vô địch 🏆 | Champion of the Year |
| Siêu năng lực 💫 | 10 referrals trong 1 tháng |

Backend cần check badge conditions sau mỗi lần award points.
