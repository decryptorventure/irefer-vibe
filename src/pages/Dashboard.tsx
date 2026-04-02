import { useDashboardStats } from '@/hooks/use-dashboard';

import { StatsSummaryCards } from '@/components/dashboard/stats-summary-cards';
import { AmbassadorLevelCard } from '@/components/dashboard/ambassador-level-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { LeaderboardCard } from '@/components/dashboard/leaderboard-card';
import { HotJobsCard } from '@/components/dashboard/hot-jobs-card';
import { CampaignBanner } from '@/components/dashboard/campaign-banner';

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  if (statsLoading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <StatsSummaryCards stats={stats} />
      <AmbassadorLevelCard points={stats?.currentPoints ?? 0} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-4 h-full">
           <ActivityFeed />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
           <LeaderboardCard />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-4 h-full">
           <HotJobsCard />
        </div>
        <div className="md:col-span-1 lg:col-span-3 space-y-4 flex flex-col">
           <CampaignBanner />
        </div>
      </div>
    </div>
  );
}
