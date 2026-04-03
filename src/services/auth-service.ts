import { LoginResult, User } from '@/types';
import { apiClient } from './api-client';
import { mockAllBadges } from './mock-data/mock-badges';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

/** Mock logged-in user for development */
const MOCK_USER: User = {
  id: 'U004',
  name: 'Nguyễn Thành',
  email: 'nguyen.thanh@ikameglobal.com',
  department: 'Phòng Kinh Doanh',
  employeeCode: 'IKG-2024-042',
  points: 65,
  badges: mockAllBadges,
  joinedAt: '2024-01-15T00:00:00Z',
};

/**
 * Exchange Google ID token for iRefer session.
 * Backend team: implement POST /auth/google
 *   Body: { idToken: string }
 *   Response: LoginResult
 */
export async function loginWithGoogle(idToken: string): Promise<LoginResult> {
  if (USE_MOCK) {
    await delay(800);
    return {
      user: MOCK_USER,
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresAt: Date.now() + 3600_000,
    };
  }
  const { data } = await apiClient.post<LoginResult>('/auth/google', { idToken });
  localStorage.setItem('irefer_access_token', data.accessToken);
  localStorage.setItem('irefer_refresh_token', data.refreshToken);
  return data;
}

export async function logout(): Promise<void> {
  if (USE_MOCK) {
    await delay(200);
    return;
  }
  // Backend team: implement POST /auth/logout (invalidate refresh token)
  await apiClient.post('/auth/logout').catch(() => {});
}

export async function getCurrentUser(): Promise<User> {
  if (USE_MOCK) {
    await delay(300);
    return MOCK_USER;
  }
  // Backend team: implement GET /auth/me
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('irefer_refresh_token');
  if (!refreshToken) throw new Error('No refresh token');
  // Backend team: implement POST /auth/refresh
  const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
  localStorage.setItem('irefer_access_token', data.accessToken);
  return data.accessToken;
}
