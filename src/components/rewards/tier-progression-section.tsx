import { Trophy, Gift, Flame, Shield, Award, Crown, Gem } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AMBASSADOR_TIERS,
  getCurrentTier,
  getNextTier,
  getPointsToNextTier,
} from '@/lib/points-utils';

interface Props {
  points: number;
}

const TIER_ICONS: Record<string, React.ReactNode> = {
  'Người nhóm lửa': <Flame className="h-5 w-5" />,
  'Đại sứ dự bị': <Shield className="h-5 w-5" />,
  'Silver Ambassador': <Award className="h-5 w-5" />,
  'Đại sứ bền bỉ': <Crown className="h-5 w-5" />,
  'Gold Ambassador': <Gem className="h-5 w-5" />,
  'Champion of the Year': <Trophy className="h-5 w-5" />,
};

const TIER_COLORS: Record<string, string> = {
  'Người nhóm lửa': 'border-orange-400 bg-orange-50 dark:bg-orange-900/20',
  'Đại sứ dự bị': 'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
  'Silver Ambassador': 'border-slate-400 bg-slate-50 dark:bg-slate-700/20',
  'Đại sứ bền bỉ': 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
  'Gold Ambassador': 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
  'Champion of the Year': 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20',
};

export function TierProgressionSection({ points }: Props) {
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);
  const pointsNeeded = getPointsToNextTier(points);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-500/20">
            <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          </div>
          Cơ chế 2: Vị Thế Đại Sứ
        </CardTitle>
        <p className="text-sm text_secondary mt-1">
          Đạt mốc điểm → Nhận quà + Thăng hạng
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {AMBASSADOR_TIERS.map((tier, index) => {
            const isAchieved = points >= tier.points;
            const isCurrent = currentTier?.name === tier.name;
            const isNext = nextTier?.name === tier.name;

            return (
              <div
                key={tier.name}
                className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? `${TIER_COLORS[tier.name]} border-2 shadow-sm`
                    : isAchieved
                      ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
                      : 'border-border bg-card opacity-60'
                }`}
              >
                {/* Connecting line */}
                {index < AMBASSADOR_TIERS.length - 1 && (
                  <div className={`absolute left-7 top-full w-0.5 h-3 ${isAchieved ? 'bg-green-400' : 'bg-border'}`} />
                )}

                {/* Icon */}
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  isCurrent ? 'bg-white dark:bg-black/20 shadow-sm' : isAchieved ? 'bg-green-100 dark:bg-green-800/30' : 'bg_secondary'
                }`}>
                  {TIER_ICONS[tier.name]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm">{tier.name}</span>
                    {isCurrent && (
                      <Badge variant="warning" className="text-[10px]">BẠN Ở ĐÂY</Badge>
                    )}
                    {isAchieved && !isCurrent && (
                      <Badge variant="success" className="text-[10px]">Đã đạt</Badge>
                    )}
                    {isNext && (
                      <Badge variant="info" className="text-[10px]">Tiếp theo</Badge>
                    )}
                  </div>
                  <p className="text-xs text_secondary mt-1">
                    Mốc: {tier.points}đ — Thưởng: {tier.reward}
                  </p>
                </div>

                {/* Points badge */}
                <div className="shrink-0 text-right">
                  <span className="text-sm font-bold">{tier.points}đ</span>
                  {isNext && pointsNeeded !== null && (
                    <p className="text-[10px] fg_orange_accent font-medium mt-0.5">
                      Cần {pointsNeeded}đ nữa
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
