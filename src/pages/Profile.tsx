import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Users, CheckCircle, Trophy, Star, ArrowUp, ArrowDown, Flame } from 'lucide-react';
import { Skeleton } from '@frontend-team/ui-kit';
import { useAuthStore } from '@/store/auth-store';
import { useDashboardStats, usePointsHistory } from '@/hooks/use-dashboard';
import { BadgesGrid } from '@/components/profile/badges-grid';
import {
  getCurrentTier,
  getNextTier,
  getPointsToNextTier,
  getTierProgress,
  AMBASSADOR_TIERS,
} from '@/lib/points-utils';

export function Profile() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: pointsPage, isLoading: pointsLoading } = usePointsHistory(1, 10);
  const pointsHistory = pointsPage?.data ?? [];

  // Mock user for dev if not logged in
  const displayUser = user ?? {
    name: 'Nguyễn Thành',
    email: 'nguyen.thanh@ikameglobal.com',
    department: 'Phòng Kinh Doanh',
    employeeCode: 'IKG-2024-042',
    points: 85,
    avatar: undefined,
    badges: [],
    joinedAt: '2024-01-15T00:00:00Z',
    id: 'U004',
  };

  const currentTier = getCurrentTier(displayUser.points);
  const nextTier = getNextTier(displayUser.points);
  const pointsNeeded = getPointsToNextTier(displayUser.points);
  const progress = getTierProgress(displayUser.points);

  const initials = displayUser.name
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  const statCards = [
    { label: 'Tổng giới thiệu', value: stats?.totalReferrals ?? 0, icon: Users, color: 'fg_orange_accent' },
    { label: 'Đã onboard', value: stats?.successfulOnboards ?? 0, icon: CheckCircle, color: 'fg_success' },
    { label: 'Hạng BXH', value: `#${stats?.rank ?? '—'}`, icon: Trophy, color: 'fg_yellow_accent' },
    { label: 'Huy hiệu đạt', value: displayUser.badges.filter((b) => b.isEarned).length, icon: Star, color: 'fg_blue_accent' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ── Profile Header ────────────────────────────── */}
      <div className="rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFC700] p-6 md:p-8 shadow-lg relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-white/40 shadow-xl shrink-0">
            {displayUser.avatar ? (
              <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
            ) : null}
            <AvatarFallback className="bg-white/25 text-white text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">{displayUser.name}</h1>
              {currentTier && (
                <Badge className="bg-white/20 text-white border-white/30 border backdrop-blur-sm text-xs px-2 py-0.5">
                  {currentTier.name}
                </Badge>
              )}
            </div>
            <p className="text-orange-50 text-sm">{displayUser.email}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-orange-50 text-sm">
              <span>{displayUser.department}</span>
              <span className="hidden sm:inline">·</span>
              <span>Mã NV: {displayUser.employeeCode}</span>
            </div>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
              <Flame className="h-4 w-4" /> Điểm tích lửa
            </div>
            <div className="text-4xl font-bold text-white drop-shadow-sm">{displayUser.points}</div>
            {nextTier && pointsNeeded !== null && (
              <p className="text-orange-50 text-xs mt-1">
                Cần thêm <span className="font-bold text-white">{pointsNeeded}đ</span> → {nextTier.name}
              </p>
            )}
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="relative z-10 mt-6">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-orange-100 font-medium">
            {AMBASSADOR_TIERS.map((t) => (
              <span key={t.name} className={displayUser.points >= t.points ? 'text-white font-bold' : ''}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg bg_secondary`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{statsLoading ? '—' : stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Two columns: Badges + Points History ──────── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 fg_yellow_accent" /> Bộ sưu tập huy hiệu
            </CardTitle>
          </CardHeader>
          <CardContent>
            {displayUser.badges.length > 0 ? (
              <BadgesGrid badges={displayUser.badges} />
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Chưa có huy hiệu nào. Hãy bắt đầu giới thiệu!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Points History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 fg_orange_accent" /> Lịch sử điểm tích lửa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pointsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-3/4" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            ) : pointsHistory.length > 0 ? (
              <div className="space-y-4">
                {pointsHistory.map((tx) => (
                  <div key={tx.id} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 p-1.5 rounded-full shrink-0 ${
                        tx.type === 'earned'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      {tx.type === 'earned' ? (
                        <ArrowUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug">{tx.reason}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span
                      className={`font-bold text-sm shrink-0 ${
                        tx.type === 'earned' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                      }`}
                    >
                      {tx.type === 'earned' ? '+' : ''}{tx.points}đ
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Chưa có lịch sử điểm.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
