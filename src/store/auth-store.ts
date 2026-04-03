import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, accessToken: string) => void;
  updateUser: (updates: Partial<User>) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setSession: (user, accessToken) => {
        localStorage.setItem('irefer_access_token', accessToken);
        set({ user, accessToken, isAuthenticated: true });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (current) set({ user: { ...current, ...updates } });
      },

      clearSession: () => {
        localStorage.removeItem('irefer_access_token');
        localStorage.removeItem('irefer_refresh_token');
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'irefer-auth',
      version: 2,
      // Migrate stale cached user to match updated mock data
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as { user: { points?: number } | null; isAuthenticated?: boolean };
        if (version < 2 && state.user) {
          state.user.points = 65; // sync to current MOCK_USER points (Silver Ambassador)
        }
        return state;
      },
      // Only persist user and auth status — token is in localStorage separately
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
