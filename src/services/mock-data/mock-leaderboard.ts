import { LeaderboardEntry, PointTransaction, DashboardStats } from '@/types';

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'U001', name: 'Hoàng Minh',    department: 'Phòng CNTT',       points: 115, referralCount: 8, onboardCount: 3, avatar: 'HM' },
  { rank: 2, userId: 'U002', name: 'Thùy Ngân',     department: 'Phòng Marketing',  points: 95,  referralCount: 6, onboardCount: 2, avatar: 'TN' },
  { rank: 3, userId: 'U003', name: 'Phúc Long',     department: 'Phòng Kinh Doanh', points: 90,  referralCount: 5, onboardCount: 1, avatar: 'PL' },
  { rank: 4, userId: 'U004', name: 'Nguyễn Thành',  department: 'Phòng Kinh Doanh', points: 85,  referralCount: 4, onboardCount: 1, avatar: 'NT', isCurrentUser: true },
  { rank: 5, userId: 'U005', name: 'Bảo Trân',      department: 'Phòng HR',         points: 60,  referralCount: 3, onboardCount: 1, avatar: 'BT' },
  { rank: 6, userId: 'U006', name: 'Minh Châu',     department: 'Phòng CNTT',       points: 40,  referralCount: 2, onboardCount: 0, avatar: 'MC' },
  { rank: 7, userId: 'U007', name: 'Quang Hải',     department: 'Phòng Design',     points: 20,  referralCount: 1, onboardCount: 0, avatar: 'QH' },
];

export const mockPointsHistory: PointTransaction[] = [
  { id: 'PT-001', type: 'earned',   points: 50,   reason: 'Michael Chen onboard vào vị trí Product Manager',      referralId: 'REF-002', createdAt: '2026-04-01T09:00:00Z' },
  { id: 'PT-002', type: 'earned',   points: 20,   reason: 'Sarah Jenkins pass phỏng vấn vòng 1',                  referralId: 'REF-001', createdAt: '2026-04-01T10:30:00Z' },
  { id: 'PT-003', type: 'redeemed', points: -10,   reason: 'Đổi Grab Voucher 100k',                                                      createdAt: '2026-03-28T14:00:00Z' },
  { id: 'PT-004', type: 'earned',   points: 5,    reason: 'Phạm Văn Đức gửi giới thiệu thành công',              referralId: 'REF-003', createdAt: '2026-04-01T08:00:00Z' },
  { id: 'PT-005', type: 'earned',   points: 10,   reason: 'Sarah Jenkins pass lọc CV',                            referralId: 'REF-001', createdAt: '2026-03-29T14:30:00Z' },
  { id: 'PT-006', type: 'earned',   points: 5,    reason: 'Sarah Jenkins gửi giới thiệu thành công',             referralId: 'REF-001', createdAt: '2026-03-28T09:00:00Z' },
];

export const mockDashboardStats: DashboardStats = {
  totalReferrals: 3,
  pendingReferrals: 2,
  successfulOnboards: 1,
  totalPointsEarned: 90,
  currentPoints: 85,
  rank: 4,
  totalUsers: 42,
  monthlyReferrals: 2,
};
