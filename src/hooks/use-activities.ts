import { useQuery } from '@tanstack/react-query';
import { getRecentActivities } from '@/services/activities-service';

export function useRecentActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: getRecentActivities,
    staleTime: 30_000,
  });
}
