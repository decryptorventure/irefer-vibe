export type NotificationType =
  | 'referral_update'
  | 'points_earned'
  | 'badge_earned'
  | 'reward_redeemed'
  | 'rank_changed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  /** Positive = earned, negative = redeemed */
  pointsDelta?: number;
  referralId?: string;
  createdAt: string;
}
