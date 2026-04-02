import { Link, useLocation } from "react-router-dom";
import { cn } from "@frontend-team/ui-kit";
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  Gift,
  UserPlus,
} from "lucide-react";

const navigation = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard },
  { name: "Job", href: "/jobs", icon: Briefcase },
  { name: "Xếp hạng", href: "/leaderboard", icon: Trophy },
  { name: "Tính điểm", href: "/rewards", icon: Gift },
  { name: "Giới thiệu", href: "/refer", icon: UserPlus },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg_canvas_primary pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <nav className="flex items-center justify-around p-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full py-1 px-1 text-[10px] font-medium transition-colors rounded-lg",
                isActive
                  ? "fg_orange_accent"
                  : "text_tertiary hover:state_secondary_soft hover:state_fg_primary_soft"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "fg_orange_accent" : "text_tertiary"
                )}
                aria-hidden="true"
              />
              <span className="truncate w-full text-center">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
