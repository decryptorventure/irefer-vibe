import { Badge } from '@/types';

export const mockAllBadges: Badge[] = [
  { id: 'first_refer',    name: 'Bắt đầu hành trình', description: 'Gửi giới thiệu đầu tiên',          icon: '🚀', isEarned: true,  earnedAt: '2026-03-15T10:00:00Z' },
  { id: 'three_refers',   name: 'Người kết nối',       description: 'Giới thiệu 3 ứng viên',            icon: '🤝', isEarned: true,  earnedAt: '2026-04-01T08:00:00Z' },
  { id: 'first_onboard',  name: 'Phát hiện tài năng',  description: 'Có ứng viên đầu tiên onboard',     icon: '⭐', isEarned: true,  earnedAt: '2026-04-01T09:00:00Z' },
  { id: 'three_onboards', name: 'Siêu Giới Thiệu',     description: 'Có 3 ứng viên onboard',            icon: '🏆', isEarned: false },
  { id: 'points_500',     name: 'Hạng Vàng',           description: 'Đạt 500 điểm tích luỹ',            icon: '🥇', isEarned: true,  earnedAt: '2026-03-30T11:00:00Z' },
  { id: 'hot_job_refer',  name: 'Săn Job HOT',          description: 'Giới thiệu thành công vào job HOT', icon: '🔥', isEarned: false },
  { id: 'streak_3',       name: 'Bền bỉ',              description: 'Giới thiệu 3 tháng liên tiếp',     icon: '⚡', isEarned: false },
  { id: 'top3',           name: 'Top 3 Bảng Vàng',     description: 'Lọt top 3 bảng xếp hạng tháng',   icon: '👑', isEarned: false },
];
