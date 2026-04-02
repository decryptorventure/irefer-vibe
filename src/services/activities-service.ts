import { ActivityItem } from '@/types/activity-types';
import { mockActivities } from './mock-data/mock-activities';
import { apiClient } from './api-client';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getRecentActivities(): Promise<ActivityItem[]> {
  if (USE_MOCK) {
    await delay();
    return mockActivities;
  }
  // Backend: GET /me/activities
  const { data } = await apiClient.get<ActivityItem[]>('/me/activities');
  return data;
}
