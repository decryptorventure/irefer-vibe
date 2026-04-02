import { ReferralStatus } from '@/types';

export const REFERRAL_STATUS_LABELS: Record<ReferralStatus, string> = {
  submitted:   'Chờ xử lý',
  screening:   'Đang lọc CV',
  interview_1: 'Phỏng vấn V1',
  interview_2: 'Phỏng vấn V2',
  offer_sent:  'Đã gửi Offer',
  onboarded:   'Nhận việc',
  rejected:    'Từ chối',
};

export const REFERRAL_STATUS_COLORS: Record<ReferralStatus, string> = {
  submitted:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  screening:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  interview_1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  interview_2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  offer_sent:  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  onboarded:   'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  rejected:    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

/** Group statuses by UI filter tab label */
export const STATUS_FILTER_TABS = [
  { label: 'Tất cả',        value: undefined },
  { label: 'Chờ xử lý',    value: 'submitted' as ReferralStatus },
  { label: 'Đang xử lý',   value: 'interview_1' as ReferralStatus },
  { label: 'Đã gửi Offer', value: 'offer_sent' as ReferralStatus },
  { label: 'Nhận việc',    value: 'onboarded' as ReferralStatus },
  { label: 'Từ chối',      value: 'rejected' as ReferralStatus },
];
