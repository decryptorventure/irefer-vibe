/**
 * Ambassador Tiers — The single tier system for iRefer.
 * Points are "điểm tích lửa". Users progress through Bronze → Diamond.
 */

export interface AmbassadorTier {
  name: string;
  points: number;
  reward: string;
}

export const AMBASSADOR_TIERS: AmbassadorTier[] = [
  { name: 'Bronze',  points: 15,  reward: 'Áo / Cốc iKame' },
  { name: 'Silver',  points: 30,  reward: 'Voucher 500k' },
  { name: 'Gold',    points: 80,  reward: 'Voucher 2 Triệu' },
  { name: 'Diamond', points: 120, reward: 'Tiền mặt 5TR' },
];

export const MAX_TIER_POINTS = 120;

/** Points awarded at each hiring stage */
export const POINTS_RULES = [
  { event: 'submitted',   label: 'Submit CV hợp lệ',           points: 5  },
  { event: 'screening',   label: 'CV Pass Sơ loại',             points: 10 },
  { event: 'interview',   label: 'Pass Phỏng vấn',              points: 20 },
  { event: 'onboarded',   label: 'Ứng viên Onboard',            points: 50 },
];

/** Get the user's current ambassador tier based on points */
export function getCurrentTier(points: number): AmbassadorTier | null {
  return AMBASSADOR_TIERS.slice().reverse().find((t) => points >= t.points) ?? null;
}

/** Get the next tier to achieve, or null if at max */
export function getNextTier(points: number): AmbassadorTier | null {
  return AMBASSADOR_TIERS.find((t) => points < t.points) ?? null;
}

/** Get progress percentage within the ambassador tier range (0-120) */
export function getTierProgress(points: number): number {
  return Math.min(100, Math.max(0, (points / MAX_TIER_POINTS) * 100));
}

/** Get points needed to reach the next tier */
export function getPointsToNextTier(points: number): number | null {
  const next = getNextTier(points);
  return next ? next.points - points : null;
}

/** Format points to display string */
export function formatPoints(points: number): string {
  return points.toLocaleString('vi-VN') + 'đ';
}
