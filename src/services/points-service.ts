import { DashboardStats, LeaderboardEntry, LeaderboardPeriod, PointTransaction, PaginatedResponse } from '@/types';
import { apiClient } from './api-client';
import { mockDashboardStats, mockLeaderboard, mockPointsHistory } from './mock-data/mock-leaderboard';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getDashboardStats(): Promise<DashboardStats> {
  if (USE_MOCK) {
    await delay(300);
    return mockDashboardStats;
  }
  // Backend team: implement GET /me/stats
  const { data } = await apiClient.get<DashboardStats>('/me/stats');
  return data;
}

export async function getLeaderboard(period: LeaderboardPeriod = 'monthly'): Promise<LeaderboardEntry[]> {
  if (USE_MOCK) {
    await delay();
    return mockLeaderboard;
  }
  // Backend team: implement GET /leaderboard?period=monthly|quarterly|alltime
  const { data } = await apiClient.get<LeaderboardEntry[]>('/leaderboard', { params: { period } });
  return data;
}

export async function getPointsHistory(page = 1, pageSize = 10): Promise<PaginatedResponse<PointTransaction>> {
  if (USE_MOCK) {
    await delay();
    return { data: mockPointsHistory, total: mockPointsHistory.length, page, pageSize };
  }
  // Backend team: implement GET /me/points-history
  const { data } = await apiClient.get<PaginatedResponse<PointTransaction>>('/me/points-history', {
    params: { page, pageSize },
  });
  return data;
}
