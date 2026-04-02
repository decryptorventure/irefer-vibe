import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getLeaderboard, getPointsHistory } from '@/services/points-service';
import { LeaderboardPeriod } from '@/types';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 30_000,
  });
}

export function useLeaderboard(period: LeaderboardPeriod = 'monthly') {
  return useQuery({
    queryKey: ['leaderboard', period],
    queryFn: () => getLeaderboard(period),
    staleTime: 60_000,
  });
}

export function usePointsHistory(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['points-history', page, pageSize],
    queryFn: () => getPointsHistory(page, pageSize),
    staleTime: 30_000,
  });
}
