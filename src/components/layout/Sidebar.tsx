import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@frontend-team/ui-kit";
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  Gift,
  UserPlus,
  Users,
  LogOut,
  User
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { logout } from "@/services/auth-service";

const navigation = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard },
  { name: "Giới thiệu ứng viên", href: "/refer", icon: UserPlus },
  { name: "Danh sách ứng viên", href: "/my-referrals", icon: Users },
  { name: "Danh sách job", href: "/jobs", icon: Briefcase },
  { name: "Bảng xếp hạng", href: "/leaderboard", icon: Trophy },
  { name: "Cơ chế tính điểm", href: "/rewards", icon: Gift },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearSession, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    clearSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg_canvas_primary px-3 py-4">
      <div className="mb-8 flex items-center px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg_accent_primary fg_on_accent font-bold text-xl">
          iR
        </div>
        <span className="ml-3 text-xl font-bold tracking-tight text_primary">iRefer</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg_accent_primary fg_on_accent"
                  : "text_secondary hover:state_secondary_soft hover:state_fg_primary_soft"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "fg_on_accent" : "text_tertiary"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2 border-t border_secondary mt-4 space-y-1">
        {/* Profile link */}
        <Link
          to="/profile"
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            location.pathname === '/profile'
              ? "bg_accent_primary fg_on_accent"
              : "text_secondary hover:state_secondary_soft hover:state_fg_primary_soft"
          )}
        >
          <User className={cn("mr-3 h-5 w-5 text_tertiary", location.pathname === '/profile' && "fg_on_accent")} />
          {user?.name ?? 'Hồ sơ của tôi'}
        </Link>

        {/* Logout button */}
        <button
          id="btn-sidebar-logout"
          onClick={handleLogout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text_secondary hover:state_secondary_soft hover:state_fg_primary_soft transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text_tertiary" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
