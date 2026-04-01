import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Briefcase
} from "lucide-react";

const navigation = [
  { name: "Tổng quan", href: "/", icon: LayoutDashboard },
  { name: "Giới thiệu", href: "/refer", icon: UserPlus },
  { name: "Danh sách", href: "/my-referrals", icon: Users },
  { name: "Việc làm", href: "/jobs", icon: Briefcase },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
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
                  ? "text-orange-500"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-orange-500" : "text-muted-foreground"
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
