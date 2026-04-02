import { Bell, Moon, Sun, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, useDarkMode } from "@frontend-team/ui-kit";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";

export function ModeToggle() {
  const { isDark, toggle } = useDarkMode();
  return (
    <Button variant="subtle" size="icon-m" onClick={toggle} aria-label="Chuyển đổi giao diện">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export function Header() {
  const user = useAuthStore((s) => s.user);
  const displayName = user?.name ?? 'Nguyễn Thành';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b bg_canvas_primary px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="md:hidden flex items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg_accent_primary fg_on_accent font-bold text-sm">
          iR
        </div>
      </div>
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Tìm kiếm
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text_tertiary"
            aria-hidden="true"
          />
          <Input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm bg-transparent shadow-none"
            placeholder="Tìm kiếm..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ModeToggle />
          <Button variant="subtle" size="icon-m" aria-label="Xem thông báo">
            <Bell className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px border_secondary" aria-hidden="true" />

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="subtle" className="-m-1.5 flex items-center p-1.5" />}>
              <span className="sr-only">Mở menu người dùng</span>
              <Avatar className="h-8 w-8">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={displayName} />
                ) : null}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text_primary" aria-hidden="true">
                  {displayName}
                </span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Hồ sơ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
