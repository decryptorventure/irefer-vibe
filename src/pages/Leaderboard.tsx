import { useState } from 'react';
import { Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@frontend-team/ui-kit';
import { useLeaderboard, useDashboardStats } from '@/hooks/use-dashboard';
import { LeaderboardPodium } from '@/components/leaderboard/leaderboard-podium';
import { LeaderboardList } from '@/components/leaderboard/leaderboard-list';
import { LeaderboardPeriod } from '@/types';
import { MascotImage } from '@/components/ui/mascot-image';

const PERIOD_TABS: { value: LeaderboardPeriod; label: string }[] = [
  { value: 'monthly', label: 'Tháng này' },
  { value: 'quarterly', label: 'Quý này' },
  { value: 'alltime', label: 'Tất cả' },
];

export function Leaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('monthly');
  const { data: entries = [], isLoading } = useLeaderboard(period);
  const { data: stats } = useDashboardStats();

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const currentUser = entries.find((e) => e.isCurrentUser);
  const top3Points = top3[2]?.points ?? 0;
  const gapToTop3 = currentUser && currentUser.rank > 3
    ? top3Points - currentUser.points
    : null;

  return (
    <div className="space-y-6">
      {/* Page header with mascot */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text_primary flex items-center gap-2">
            <Flame className="h-6 w-6 fg_orange_accent" />
            Bảng Xếp Hạng — Đại Sứ Góp Lửa
          </h1>
          <p className="text-sm text_secondary mt-1">
            Ai sẽ dẫn đầu {period === 'monthly' ? 'tháng' : period === 'quarterly' ? 'quý' : 'bảng vàng'} này?
          </p>
        </div>
      </div>

      {/* Period tabs */}
      <div className="flex gap-2">
        {PERIOD_TABS.map(({ value, label }) => (
          <Button
            key={value}
            variant={period === value ? 'primary' : 'border'}
            size="s"
            onClick={() => setPeriod(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex items-end justify-center gap-6">
              {[80, 120, 64].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton style={{ height: h }} className="w-24 rounded-t-lg" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Podium for top 3 */}
          {/* Podium for top 3 */}
          <div className="bg-gradient-to-b from-orange-50 to-white dark:from-slate-900 dark:to-background rounded-[2rem] border border-orange-100 dark:border-orange-900/40 shadow-2xl overflow-hidden relative mb-12">
            {/* Background radiant decorative patterns */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange-200/50 to-transparent dark:from-orange-500/10 pointer-events-none" />
            
            {/* Ambient glows */}
            <div className="absolute top-0 left-10 w-64 h-64 bg-yellow-400/20 dark:bg-yellow-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-10 w-64 h-64 bg-orange-400/20 dark:bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-orange-300/30 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 pt-10 px-4">
              <h2 className="text-center text-xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-yellow-500 bg-clip-text text-transparent mb-4 tracking-widest uppercase drop-shadow-sm">
                Bảng Vàng Vinh Danh
              </h2>
              <LeaderboardPodium entries={top3} />
            </div>
          </div>

          {/* Motivational CTA with mascot */}
          {gapToTop3 !== null && gapToTop3 > 0 && (
            <div className="bg_orange_subtle border border_orange rounded-lg p-4 flex items-center gap-4">
              <MascotImage variant="encourage" size="lg" animate={false} className="shrink-0" />
              <p className="text-sm text_primary flex-1">
                Bạn còn cách Top 3:{' '}
                <span className="font-bold fg_orange_accent">{gapToTop3} điểm!</span>{' '}
                Giới thiệu thêm ứng viên để vươn lên nào!
              </p>
            </div>
          )}

          {/* Full list (rank 4+) */}
          {rest.length > 0 && (
            <Card>
              <CardContent className="py-2">
                <LeaderboardList entries={rest} />
              </CardContent>
            </Card>
          )}

          {/* Your position summary (if not in top 3) */}
          {currentUser && currentUser.rank > 3 && (
            <div className="text-center text-sm text_secondary py-2">
              Vị trí của bạn: <span className="font-bold text_primary">#{currentUser.rank}</span> với{' '}
              <span className="font-bold fg_orange_accent">{currentUser.points}đ</span>
              {stats && <> trên tổng {stats.totalUsers} người tham gia</>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
