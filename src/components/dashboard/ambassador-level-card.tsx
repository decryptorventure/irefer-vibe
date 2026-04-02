import { Link } from 'react-router-dom';
import { Info, Gift, Flame, Trophy, Crown, Gem, Award, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import {
  AMBASSADOR_TIERS,
  MAX_TIER_POINTS,
  getCurrentTier,
  getNextTier,
  getPointsToNextTier,
  getTierProgress,
} from '@/lib/points-utils';

interface Props {
  points: number;
}

/* ── Tier visual config ───────────────────────────────── */
const TIER_ICONS: Record<string, React.ReactNode> = {
  'Người nhóm lửa': <Flame className="h-5 w-5" />,
  'Đại sứ dự bị': <Shield className="h-5 w-5" />,
  'Silver Ambassador': <Award className="h-5 w-5" />,
  'Đại sứ bền bỉ': <Crown className="h-5 w-5" />,
  'Gold Ambassador': <Gem className="h-5 w-5" />,
  'Champion of the Year': <Trophy className="h-5 w-5" />,
};

const TIER_BADGE_STYLES: Record<string, string> = {
  'Người nhóm lửa': 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-700/50',
  'Đại sứ dự bị': 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700/50',
  'Silver Ambassador': 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/50',
  'Đại sứ bền bỉ': 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700/50',
  'Gold Ambassador': 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-700/50',
  'Champion of the Year': 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-400 dark:border-cyan-700/50',
};

const TIER_MILESTONE_ACTIVE: Record<string, string> = {
  'Người nhóm lửa': 'bg-orange-500 border-orange-300 shadow-orange-500/40 dark:border-orange-400',
  'Đại sứ dự bị': 'bg-blue-500 border-blue-300 shadow-blue-500/40 dark:border-blue-400',
  'Silver Ambassador': 'bg-slate-400 border-slate-200 shadow-slate-400/40 dark:border-slate-300',
  'Đại sứ bền bỉ': 'bg-amber-500 border-amber-300 shadow-amber-500/40 dark:border-amber-400',
  'Gold Ambassador': 'bg-yellow-500 border-yellow-300 shadow-yellow-500/40 dark:border-yellow-400',
  'Champion of the Year': 'bg-cyan-400 border-cyan-200 shadow-cyan-400/40 dark:border-cyan-300',
};

const TIER_TEXT_ACTIVE: Record<string, string> = {
  'Người nhóm lửa': 'text-orange-600 dark:text-orange-400',
  'Đại sứ dự bị': 'text-blue-600 dark:text-blue-400',
  'Silver Ambassador': 'text-slate-500 dark:text-slate-300',
  'Đại sứ bền bỉ': 'text-amber-600 dark:text-amber-400',
  'Gold Ambassador': 'text-yellow-600 dark:text-yellow-400',
  'Champion of the Year': 'text-cyan-600 dark:text-cyan-400',
};

/* ── Component ────────────────────────────────────────── */

export function AmbassadorLevelCard({ points }: Props) {
  const progressPercentage = getTierProgress(points);
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);
  const pointsNeeded = getPointsToNextTier(points);
  const currentTierName = currentTier?.name ?? 'Chưa có hạng';

  return (
    <div className="rounded-xl bg-card border border-border p-6 md:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            <h2 className="text-xl font-bold text-foreground">Đại sứ iKame</h2>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Bạn đang có <span className="font-bold text-yellow-600 dark:text-yellow-400">{points} điểm tích lửa</span>
          </p>
        </div>
        {currentTier && (
          <Badge
            className={`${TIER_BADGE_STYLES[currentTierName]} border px-3 py-1.5 text-sm font-semibold flex items-center gap-1.5`}
          >
            {TIER_ICONS[currentTierName]}
            Hạng {currentTierName}
          </Badge>
        )}
      </div>

      {/* ── Progress bar + milestones (Desktop) ──────────────────── */}
      <div className="relative px-0 md:px-4 mb-8 hidden md:block">
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full" />
          </div>
        </div>

        {AMBASSADOR_TIERS.map((tier) => {
          const position = (tier.points / MAX_TIER_POINTS) * 100;
          const isAchieved = points >= tier.points;
          const isNext = nextTier?.name === tier.name;

          return (
            <div
              key={tier.name}
              className="absolute flex flex-col items-center"
              style={{
                left: `${position}%`,
                top: '-12px',
                transform: 'translateX(-50%)',
              }}
            >
              <Tooltip
                side="top"
                content={
                  <p className="flex items-center gap-2 font-medium text-sm">
                    <Gift className="h-4 w-4" />
                    Phần thưởng: <span className="font-bold">{tier.reward}</span>
                  </p>
                }
              >
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 cursor-pointer shadow-md hover:scale-110 z-10
                    ${isAchieved
                      ? `${TIER_MILESTONE_ACTIVE[tier.name]} shadow-lg`
                      : isNext
                        ? 'bg-muted border-yellow-500/50 dark:border-yellow-400/50 animate-pulse'
                        : 'bg-muted border-border opacity-50'}
                  `}
                >
                  <Gift className={`h-4 w-4 ${isAchieved ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
              </Tooltip>
              <div className="mt-3 text-center whitespace-nowrap hidden lg:block">
                <div className={`text-xs font-bold w-24 whitespace-normal leading-tight mx-auto ${isAchieved ? (TIER_TEXT_ACTIVE[tier.name] ?? 'text-foreground') : 'text-muted-foreground'}`}>
                  {tier.name}
                </div>
                <div className="text-[10px] text-muted-foreground font-medium mt-1">{tier.points}đ</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Steps */}
      <div className="md:hidden space-y-4 mb-6">
        <p className="text-sm font-semibold text-muted-foreground mb-4">Tiến trình hạng:</p>
        {AMBASSADOR_TIERS.map((tier, index) => {
          const isAchieved = points >= tier.points;
          const isNext = nextTier?.name === tier.name;
          return (
            <div key={tier.name} className="flex items-center gap-3 relative">
              {index < AMBASSADOR_TIERS.length - 1 && (
                <div className={`absolute left-[17px] top-9 bottom-[-16px] w-[2px] ${points >= AMBASSADOR_TIERS[index + 1].points ? 'bg-amber-500' : 'bg-muted'}`} />
              )}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-[3px] shrink-0 z-10
                 ${isAchieved ? `${TIER_MILESTONE_ACTIVE[tier.name]}` : isNext ? 'bg-muted border-yellow-500/50' : 'bg-muted border-border opacity-50'}`}>
                <Gift className={`h-4 w-4 ${isAchieved ? 'text-white' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <div className={`text-sm font-bold ${isAchieved ? TIER_TEXT_ACTIVE[tier.name] : 'text-muted-foreground'}`}>
                  {tier.name} <span className="font-normal text-xs ml-1">({tier.points}đ)</span>
                </div>
                {isNext && <div className="text-xs text-muted-foreground mt-0.5">Phần thưởng: {tier.reward}</div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Spacer for milestone labels below the bar */}
      <div className="h-4 hidden md:block" />

      {/* ── Next-tier info box ─────────────────────────── */}
      {nextTier && pointsNeeded !== null && (
        <div className="bg-muted/60 dark:bg-muted/40 border border-border rounded-xl p-4 flex items-start gap-3 mt-4">
          <Info className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bạn cần tích thêm{' '}
            <span className="font-bold text-yellow-600 dark:text-yellow-400 text-base">{pointsNeeded} điểm</span>{' '}
            nữa để thăng hạng{' '}
            <span className="font-bold text-yellow-600 dark:text-yellow-400">{nextTier.name}</span>.{' '}
            Nhận ngay <span className="font-bold text-foreground">{nextTier.reward}</span> khi lên hạng!{' '}
            <Link
              to="/rewards"
              className="font-bold text-orange-500 dark:text-orange-400 hover:underline inline-flex items-center gap-0.5 transition-colors mt-2 sm:mt-0 ml-1"
            >
              Xem chi tiết &rarr;
            </Link>
          </p>
        </div>
      )}

      {/* If at max tier */}
      {!nextTier && currentTier && (
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 rounded-xl p-4 flex items-start gap-3 mt-4">
          <Gem className="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-cyan-700 dark:text-cyan-200 leading-relaxed">
            Chúc mừng! Bạn đã đạt hạng <span className="font-bold text-cyan-600 dark:text-cyan-400">Champion of the Year</span> — hạng cao nhất.
            Tiếp tục giới thiệu để duy trì vị thế và nhận vinh danh bảng vàng cuối năm!
          </p>
        </div>
      )}
    </div>
  );
}
