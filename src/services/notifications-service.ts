import { Notification } from '@/types';
import { apiClient } from './api-client';
import { mockNotifications } from './mock-data/mock-notifications';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getNotifications(): Promise<Notification[]> {
  if (USE_MOCK) {
    await delay();
    return mockNotifications;
  }
  // Backend team: implement GET /notifications
  const { data } = await apiClient.get<Notification[]>('/notifications');
  return data;
}

export async function markAllNotificationsRead(): Promise<void> {
  if (USE_MOCK) {
    await delay(200);
    mockNotifications.forEach((n) => (n.isRead = true));
    return;
  }
  // Backend team: implement PUT /notifications/read-all
  await apiClient.put('/notifications/read-all');
}

export async function markNotificationRead(id: string): Promise<void> {
  if (USE_MOCK) {
    await delay(100);
    const n = mockNotifications.find((n) => n.id === id);
    if (n) n.isRead = true;
    return;
  }
  // Backend team: implement PUT /notifications/:id/read
  await apiClient.put(`/notifications/${id}/read`);
}

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.isRead).length;
}
