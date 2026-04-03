import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Chrome } from 'lucide-react';
import { Button } from '@frontend-team/ui-kit';
import { loginWithGoogle } from '@/services/auth-service';
import { useAuthStore } from '@/store/auth-store';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        // Mock: auto-login with fake idToken, service returns mock user
        const result = await loginWithGoogle('mock-google-id-token');
        setSession(result.user, result.accessToken);
        navigate('/', { replace: true });
      } else {
        /**
         * Production flow:
         * 1. Load Google Identity Services (GIS) script
         * 2. google.accounts.id.initialize({ client_id: VITE_GOOGLE_CLIENT_ID, callback })
         * 3. google.accounts.id.prompt() → user picks account
         * 4. GIS calls callback with { credential: idToken }
         * 5. loginWithGoogle(idToken) → backend issues JWT
         *
         * Backend team: implement POST /auth/google
         * See: docs/api-contracts.md#authentication
         */
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) throw new Error('VITE_GOOGLE_CLIENT_ID không được cấu hình');
        // Placeholder for real GIS integration
        throw new Error('Google OAuth chưa được cấu hình cho môi trường này.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg_canvas_secondary p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Card */}
        <div className="bg_canvas_primary rounded-2xl border border_secondary shadow-2xl p-8 space-y-8">
          {/* Brand */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg">
                <Flame className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text_primary tracking-tight">iRefer</h1>
              <p className="text_secondary text-sm mt-1">Hệ thống giới thiệu nhân sự iKame</p>
            </div>
          </div>

          {/* Divider with text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border_secondary" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg_canvas_primary text_tertiary uppercase tracking-wider">
                Đăng nhập để tiếp tục
              </span>
            </div>
          </div>

          {/* Login Buttons */}
          <div className="space-y-3">
            <Button
              id="btn-google-login"
              variant="border"
              className="w-full h-12 text-sm font-medium gap-3"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : (
                <Chrome className="h-5 w-5 text-blue-500" />
              )}
              {USE_MOCK ? 'Đăng nhập (Mock Mode)' : 'Đăng nhập bằng Google Workspace'}
            </Button>

            {/* Microsoft SSO — uncomment when needed */}
            {/* <Button variant="border" className="w-full h-12 text-sm font-medium gap-3" disabled>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7fba00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00a4ef"/>
                <rect x="13" y="13" width="10" height="10" fill="#ffb900"/>
              </svg>
              Đăng nhập bằng Microsoft 365
            </Button> */}
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-center text-xs text_tertiary leading-relaxed">
            Chỉ tài khoản{' '}
            <span className="font-semibold text_secondary">@ikameglobal.com</span>
            {' '}mới được phép đăng nhập.
            {USE_MOCK && (
              <span className="block mt-1 text-orange-500 font-medium">
                🔧 Đang chạy ở Mock Mode
              </span>
            )}
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text_tertiary mt-6">
          © {new Date().getFullYear()} iKame Global. Dành cho nhân viên nội bộ.
        </p>
      </div>
    </div>
  );
}
