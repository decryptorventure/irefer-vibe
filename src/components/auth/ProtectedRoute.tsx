import { type ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { getCurrentUser } from '@/services/auth-service';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute — wraps all authenticated routes.
 *
 * Behaviour:
 * - Mock mode: if user not in store, fetch mock user and auto-login
 * - Real mode: if not authenticated, redirect to /login
 *
 * Backend team: this component relies on useAuthStore.isAuthenticated.
 * After loginWithGoogle() sets the session, this gate opens automatically.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, setSession } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // In mock mode only: auto-hydrate a fake session so dev can skip login
    if (USE_MOCK && !isAuthenticated) {
      getCurrentUser().then((user) => {
        setSession(user, 'mock-access-token');
      });
    }
  }, [isAuthenticated, setSession]);

  // In real mode: gate unauthenticated users to /login, preserving intended path
  if (!USE_MOCK && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // In mock mode: render children immediately (auto-login happens in background)
  return <>{children}</>;
}
