import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { loginWithGoogle } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';

/**
 * AuthCallback — xử lý OAuth redirect sau khi user chọn account.
 *
 * Google OAuth flow:
 *   /auth/callback?code=AUTHORIZATION_CODE&state=STATE
 *
 * Backend team:
 *   POST /auth/google với { idToken } hoặc implement code exchange endpoint
 *   Xem: docs/api-contracts.md#authentication
 */
export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSession } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleCallback = async () => {
      try {
        const error = searchParams.get('error');
        if (error) {
          navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
          return;
        }

        /**
         * Production: exchange authorization code for ID token via backend.
         * const code = searchParams.get('code');
         * const result = await exchangeCodeForToken(code);
         *
         * For now using mock loginWithGoogle:
         */
        const result = await loginWithGoogle('callback-token');
        setSession(result.user, result.accessToken);
        navigate('/', { replace: true });
      } catch {
        navigate('/login?error=auth_failed', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, searchParams, setSession]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg_canvas_secondary gap-6">
      {/* Logo */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg">
        <Flame className="h-9 w-9 text-white" />
      </div>

      {/* Spinner */}
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
        <p className="text_secondary text-sm font-medium">Đang xác thực tài khoản...</p>
      </div>
    </div>
  );
}
