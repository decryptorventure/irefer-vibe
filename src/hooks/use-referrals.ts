import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyReferrals, getReferral, submitReferral, uploadCv } from '@/services/referrals-service';
import { ReferralListParams, SubmitReferralPayload } from '@/types';

export function useMyReferrals(params?: ReferralListParams) {
  return useQuery({
    queryKey: ['referrals', params],
    queryFn: () => getMyReferrals(params),
    staleTime: 30_000,
  });
}

export function useReferral(id: string) {
  return useQuery({
    queryKey: ['referrals', id],
    queryFn: () => getReferral(id),
    enabled: !!id,
    // Poll every 30s when viewing a referral detail (catches iHiring status updates)
    refetchInterval: 30_000,
  });
}

export function useSubmitReferral() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SubmitReferralPayload) => {
      // If a file was attached, upload it first and replace with URL
      if (payload.cvFile) {
        const cvUrl = await uploadCv(payload.cvFile);
        return submitReferral({ ...payload, cvFile: undefined, cvUrl });
      }
      return submitReferral(payload);
    },
    onSuccess: () => {
      // Invalidate referrals list so it refetches
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      // Also refresh dashboard stats (points updated)
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
