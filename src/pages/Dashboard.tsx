import { Flame } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard';
import { useAuthStore } from '@/store/auth-store';
import { getCurrentTier } from '@/lib/points-utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MascotImage } from '@/components/ui/mascot-image';

import { StatsSummaryCards } from '@/components/dashboard/stats-summary-cards';
import { AmbassadorLevelCard } from '@/components/dashboard/ambassador-level-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { LeaderboardCard } from '@/components/dashboard/leaderboard-card';
import { HotJobsCard } from '@/components/dashboard/hot-jobs-card';
import { CampaignBanner } from '@/components/dashboard/campaign-banner';

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const user = useAuthStore((s) => s.user);

  const displayName = user?.name ?? 'Nguyễn Thành';
  const points = user?.points ?? stats?.currentPoints ?? 85;
  const currentTier = getCurrentTier(points);
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  if (statsLoading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Greeting header with mascot */}
      <div className="relative rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30 p-5 md:p-6 overflow-hidden min-h-[120px] md:min-h-[140px]">
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center gap-5">
          <MascotImage
            variant="greeting"
            size="2xl"
            className="shrink-0 drop-shadow-md -ml-2"
          />
          <Avatar className="h-20 w-20 border-2 border_orange shrink-0">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={displayName} />
            ) : null}
            <AvatarFallback className="bg_orange_subtle fg_orange_accent font-bold text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text_primary truncate">
              Chào {displayName}! 🔥
            </h1>
            <p className="text-base text_secondary mt-0.5 font-medium">Hôm nay bạn đã <span className="font-semibold fg_orange_accent">góp lửa</span> chưa?</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {currentTier && (
                <Badge variant="warning" className="text-sm px-3 py-0.5">
                  {currentTier.name}
                </Badge>
              )}
              <span className="text-base text_secondary flex items-center gap-1.5">
                <Flame className="h-4 w-4 fg_orange_accent" />
                <span className="font-semibold fg_orange_accent">{points}</span> điểm tích lửa
              </span>
            </div>
          </div>
        </div>
      </div>

      <StatsSummaryCards stats={stats} />
      <AmbassadorLevelCard points={stats?.currentPoints ?? 0} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-3">
           <LeaderboardCard />
        </div>
        <div className="md:col-span-1 lg:col-span-4 h-full">
           <HotJobsCard />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-4 h-full">
           <ActivityFeed />
        </div>
        <div className="md:col-span-1 lg:col-span-3 space-y-4 flex flex-col">
           <CampaignBanner />
        </div>
      </div>
    </div>
  );
}
