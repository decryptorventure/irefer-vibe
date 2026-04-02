import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRewards, redeemReward } from '@/services/rewards-service';
import { RewardCategory } from '@/types';
import { useAuthStore } from '@/store/auth-store';

export function useRewards(category?: RewardCategory) {
  return useQuery({
    queryKey: ['rewards', category],
    queryFn: () => getRewards(category),
    staleTime: 120_000,
  });
}

export function useRedeemReward() {
  const queryClient = useQueryClient();
  const { user, updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (rewardId: string) => redeemReward(rewardId, user?.points ?? 0),
    onSuccess: (result) => {
      if (result.success) {
        // Update user points in store immediately (optimistic-like)
        updateUser({ points: result.remainingPoints });
        // Refresh rewards list (stock may have changed)
        queryClient.invalidateQueries({ queryKey: ['rewards'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      }
    },
  });
}
