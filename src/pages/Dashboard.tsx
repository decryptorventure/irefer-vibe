import { Flame } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard';
import { useAuthStore } from '@/store/auth-store';
import { getCurrentTier } from '@/lib/points-utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      {/* Greeting header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border_orange shrink-0">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={displayName} />
          ) : null}
          <AvatarFallback className="bg_orange_subtle fg_orange_accent font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text_primary truncate">
            Chào {displayName}!
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {currentTier && (
              <Badge variant="warning" className="text-xs">
                {currentTier.name}
              </Badge>
            )}
            <span className="text-sm text_secondary flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 fg_orange_accent" />
              <span className="font-semibold fg_orange_accent">{points}</span> điểm tích lửa
            </span>
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
