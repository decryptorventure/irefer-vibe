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
  { name: 'Người nhóm lửa', points: 10, reward: '100.000đ' },
  { name: 'Đại sứ dự bị', points: 25, reward: '300.000đ' },
  { name: 'Silver Ambassador', points: 50, reward: '1.000.000đ' },
  { name: 'Đại sứ bền bỉ', points: 80, reward: '2.000.000đ' },
  { name: 'Gold Ambassador', points: 100, reward: 'Quà công nghệ 5.000.000đ' },
  { name: 'Champion of the Year', points: 120, reward: '10.000.000đ + Vinh danh' },
];

export const MAX_TIER_POINTS = 120;

export const POINTS_MATRIX = {
  junior: { screening: 1, shared: 2, interview: 3, onboard: 5 },
  middle: { screening: 2, shared: 4, interview: 5, onboard: 10 },
  senior: { screening: 3, shared: 6, interview: 10, onboard: 15 },
};

export const STAGE_LABELS = {
  screening: 'CV Pass Sơ loại',
  shared: 'Giới thiệu CV (Khi có Share)',
  interview: 'Pass Phỏng vấn',
  onboard: 'Ứng viên Onboard',
};

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
