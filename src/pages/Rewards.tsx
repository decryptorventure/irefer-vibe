import { Flame, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';
import { useDashboardStats } from '@/hooks/use-dashboard';
import { getCurrentTier, getNextTier, getPointsToNextTier, getTierProgress } from '@/lib/points-utils';

import { ScoringMatrixSection } from '@/components/rewards/scoring-matrix-section';
import { TierProgressionSection } from '@/components/rewards/tier-progression-section';
import { HotBonusQuests } from '@/components/dashboard/hot-bonus-quests';
import { PointsHistorySection } from '@/components/rewards/points-history-section';

export function Rewards() {
  const user = useAuthStore((s) => s.user);
  const { data: stats } = useDashboardStats();

  const points = user?.points ?? stats?.currentPoints ?? 85;
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);
  const pointsNeeded = getPointsToNextTier(points);
  const progress = getTierProgress(points);

  return (
    <div className="space-y-6">
      {/* Points summary banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFC700] p-5 md:p-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="h-6 w-6" /> Điểm & Quà Tặng
            </h1>
            <p className="text-orange-50 text-sm mt-1">
              Tìm hiểu cơ chế tích điểm và nhận phần thưởng hấp dẫn
            </p>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
              <Flame className="h-3.5 w-3.5" /> Điểm tích lửa
            </div>
            <div className="text-3xl font-bold text-white">{points}đ</div>
            {currentTier && (
              <Badge className="bg-white/20 text-white border-white/30 border text-xs mt-1">
                {currentTier.name}
              </Badge>
            )}
          </div>
        </div>
        {/* Progress bar */}
        {nextTier && pointsNeeded !== null && (
          <div className="relative z-10 mt-4">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-orange-50 text-xs mt-1.5">
              Cần thêm <span className="font-bold text-white">{pointsNeeded}đ</span> để lên{' '}
              <span className="font-bold text-white">{nextTier.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Scoring Matrix (Cơ chế 1) */}
      <ScoringMatrixSection />

      {/* Tier Progression (Cơ chế 2) */}
      <TierProgressionSection points={points} />

      {/* Hot Bonus Quests (Cơ chế 3) — now with all 5 bonuses */}
      <HotBonusQuests />

      {/* Points History */}
      <PointsHistorySection />

      {/* Reward Redemption placeholder */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="p-3 rounded-full bg_secondary">
            <Gift className="h-8 w-8 fg_orange_accent" />
          </div>
          <p className="font-bold text_primary">Đổi Thưởng</p>
          <Badge variant="warning" className="text-xs">Sắp ra mắt</Badge>
          <p className="text-sm text_secondary text-center max-w-sm">
            Chức năng đổi điểm lấy quà tặng sẽ sớm ra mắt. Hãy tích lũy điểm ngay!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
