export type RewardCategory = 'voucher' | 'gift' | 'experience' | 'cash';

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  pointsCost: number;
  category: RewardCategory;
  /** null = unlimited */
  stock: number | null;
  isAvailable: boolean;
}

export interface RedemptionResult {
  success: boolean;
  remainingPoints: number;
  message: string;
}

export interface Redemption {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsCost: number;
  redeemedAt: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
}
