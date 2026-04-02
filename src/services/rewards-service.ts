import { Reward, RewardCategory, RedemptionResult } from '@/types';
import { apiClient } from './api-client';
import { mockRewards } from './mock-data/mock-rewards';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getRewards(category?: RewardCategory): Promise<Reward[]> {
  if (USE_MOCK) {
    await delay();
    if (category) return mockRewards.filter((r) => r.category === category);
    return mockRewards;
  }
  // Backend team: implement GET /rewards?category=voucher|gift|experience|cash
  const { data } = await apiClient.get<Reward[]>('/rewards', { params: { category } });
  return data;
}

export async function redeemReward(rewardId: string, currentPoints: number): Promise<RedemptionResult> {
  if (USE_MOCK) {
    await delay(600);
    const reward = mockRewards.find((r) => r.id === rewardId);
    if (!reward) return { success: false, remainingPoints: currentPoints, message: 'Phần thưởng không tồn tại.' };
    if (!reward.isAvailable || (reward.stock !== null && reward.stock === 0)) {
      return { success: false, remainingPoints: currentPoints, message: 'Phần thưởng đã hết.' };
    }
    if (currentPoints < reward.pointsCost) {
      return { success: false, remainingPoints: currentPoints, message: 'Điểm không đủ để đổi phần thưởng này.' };
    }
    // Decrement mock stock
    if (reward.stock !== null) reward.stock -= 1;
    return { success: true, remainingPoints: currentPoints - reward.pointsCost, message: 'Đổi thưởng thành công!' };
  }
  // Backend team: implement POST /rewards/:id/redeem
  const { data } = await apiClient.post<RedemptionResult>(`/rewards/${rewardId}/redeem`);
  return data;
}
