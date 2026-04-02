import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'points_earned',
    title: 'Ứng viên onboard thành công! 🎉',
    body: 'Michael Chen đã chính thức nhận việc vào vị trí Product Manager. Bạn nhận +50đ.',
    isRead: false,
    pointsDelta: 50,
    referralId: 'REF-002',
    createdAt: '2026-04-01T09:00:00Z',
  },
  {
    id: 'N002',
    type: 'referral_update',
    title: 'Sarah Jenkins pass phỏng vấn vòng 1',
    body: 'CV giới thiệu của bạn đã pass phỏng vấn kỹ thuật. +20đ.',
    isRead: false,
    pointsDelta: 20,
    referralId: 'REF-001',
    createdAt: '2026-04-01T10:30:00Z',
  },
  {
    id: 'N003',
    type: 'badge_earned',
    title: 'Huy hiệu mới: Phát hiện tài năng ⭐',
    body: 'Chúc mừng! Bạn vừa đạt huy hiệu "Phát hiện tài năng" vì có ứng viên đầu tiên onboard.',
    isRead: true,
    createdAt: '2026-03-30T08:00:00Z',
  },
  {
    id: 'N004',
    type: 'referral_update',
    title: 'Phạm Văn Đức đang được xem xét',
    body: 'CV giới thiệu của bạn đang trong quá trình lọc hồ sơ bởi TA.',
    isRead: true,
    referralId: 'REF-003',
    createdAt: '2026-04-01T08:30:00Z',
  },
  {
    id: 'N005',
    type: 'rank_changed',
    title: 'Bạn đang ở hạng #4 bảng xếp hạng',
    body: 'Tiếp tục giới thiệu để leo lên hạng #3 và nhận thêm huy hiệu!',
    isRead: true,
    createdAt: '2026-03-28T07:00:00Z',
  },
];
