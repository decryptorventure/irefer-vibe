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

export type LeaderboardPeriod = 'monthly' | 'quarterly' | 'alltime';

export interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  reason: string;
  referralId?: string;
  rewardId?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalReferrals: number;
  pendingReferrals: number;
  successfulOnboards: number;
  totalPointsEarned: number;
  currentPoints: number;
  rank: number;
  totalUsers: number;
  monthlyReferrals: number;
}

/** Business rules for points awarded at each hiring stage — configurable from admin panel */
export interface PointsRule {
  event: string;
  label: string;
  points: number;
}
