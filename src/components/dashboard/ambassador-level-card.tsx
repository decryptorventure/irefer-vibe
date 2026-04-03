import { Link } from 'react-router-dom';
import { Gift, Flame, Crown, Gem, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@frontend-team/ui-kit';
import { Tooltip } from '@/components/ui/tooltip';
import { MascotImage } from '@/components/ui/mascot-image';
import {
  AMBASSADOR_TIERS,
  MAX_TIER_POINTS,
  getCurrentTier,
  getNextTier,
  getPointsToNextTier,
  getTierProgress,
} from '@/lib/points-utils';
import {
  TIER_CARD_GRADIENT,
  TIER_NEXT_BG,
  TIER_MASCOT_VARIANT,
  TIER_ICON_MAP,
  TIER_MILESTONE_ACTIVE,
  TIER_TEXT_ACTIVE,
} from './ambassador-level-card-config';

interface Props {
  points: number;
}

export function AmbassadorLevelCard({ points }: Props) {
  const progressPercentage = getTierProgress(points);
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);
  const pointsNeeded = getPointsToNextTier(points);
  const currentTierName = currentTier?.name ?? 'Người nhóm lửa';

  const TierIcon = TIER_ICON_MAP[currentTierName];
  const mascotVariant = TIER_MASCOT_VARIANT[currentTierName] ?? 'celebrate';
  const gradient = TIER_CARD_GRADIENT[currentTierName] ?? 'from-orange-500 to-amber-400';

  return (
    <div className="rounded-xl border border-border shadow-sm overflow-hidden">
      {/* ── Gradient header band ────────────────────────── */}
      <div className={cn('relative p-5 md:p-6 bg-gradient-to-r', gradient)}>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute right-16 bottom-0 w-16 h-16 bg-white/10 rounded-full blur-xl" />

        {/* Mascot — positioned in the header exactly above the current tier bubble */}
        {(() => {
          const mascotTier = currentTier ?? AMBASSADOR_TIERS[0];
          const mascotPosition = (mascotTier.points / MAX_TIER_POINTS) * 100;
          return (
            <div 
              className="absolute transition-all duration-1000 ease-out z-10"
              style={{ 
                left: `calc(1.2rem + ${mascotPosition}%)`, 
                bottom: '-1.8rem' 
              }}
            >
              <MascotImage
                variant="celebrate"
                size="2xl"
                onDarkBg
                animate
                className="drop-shadow-xl -translate-x-1/2"
              />
            </div>
          );
        })()}        {/* Header content */}
        <div className="relative z-10 pr-0 md:pr-36">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="h-5 w-5 text-white drop-shadow" />
            <h2 className="text-lg font-black text-white tracking-tight">Đại sứ iKame</h2>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
              {TierIcon && <TierIcon className="h-4 w-4 text-white" />}
              <span className="font-black text-white text-sm">Hạng: {currentTierName}</span>
            </div>
          </div>
          <p className="text-white/80 text-xs mt-2 font-medium">
            <span className="font-black text-white text-base">{points}</span> điểm tích lửa
          </p>
        </div>
      </div>

      {/* ── Progress + milestones + info box ───────────── */}
      <div className="p-5 md:p-6 bg-card">
        {/* Progress bar (Desktop) */}
        <div className="relative px-0 md:px-4 mb-8 hidden md:block">
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden border border-border shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full" />
            </div>
          </div>

          {AMBASSADOR_TIERS.map((tier) => {
            const position = (tier.points / MAX_TIER_POINTS) * 100;
            const isAchieved = points >= tier.points;
            const isNext = nextTier?.name === tier.name;
            const isHighestAchieved = isAchieved && currentTier?.name === tier.name;

            return (
              <div
                key={tier.name}
                className="absolute flex flex-col items-center"
                style={{ left: `${position}%`, top: isHighestAchieved ? '-16px' : '-10px', transform: 'translateX(-50%)' }}
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
                  <div className={cn(
                    'rounded-full flex items-center justify-center border-[3px] transition-all duration-300 cursor-pointer shadow-md hover:scale-110 z-10',
                    isHighestAchieved
                      ? `${TIER_MILESTONE_ACTIVE[tier.name]} animate-pulse-glow w-12 h-12 shadow-xl ring-4 ring-orange-500/20`
                      : isAchieved
                        ? `${TIER_MILESTONE_ACTIVE[tier.name]} shadow-lg w-9 h-9`
                        : isNext
                          ? 'w-9 h-9 bg-muted border-yellow-500/50 dark:border-yellow-400/50 animate-pulse'
                          : 'w-9 h-9 bg-muted border-border opacity-40'
                  )}>
                    {isHighestAchieved
                      ? <Flame className="h-6 w-6 text-white drop-shadow-md" />
                      : <Gift className={`h-4 w-4 ${isAchieved ? 'text-white' : 'text-muted-foreground'}`} />
                    }
                  </div>
                </Tooltip>
                <div className="mt-3 text-center whitespace-nowrap">
                  <div className={cn(
                    'text-xs font-bold leading-tight mx-auto',
                    isAchieved ? (TIER_TEXT_ACTIVE[tier.name] ?? 'text-foreground') : 'text-muted-foreground'
                  )}>
                    {/* Full name on lg, just points on md */}
                    <span className="hidden lg:block w-24 whitespace-normal">{tier.name}</span>
                    <span className="lg:hidden">{tier.points}đ</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-0.5 hidden lg:block">{tier.points}đ</div>
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
            const isHighestAchieved = isAchieved && currentTier?.name === tier.name;

            return (
              <div key={tier.name} className={cn(
                'flex items-center gap-3 relative p-2 rounded-lg transition-colors',
                isHighestAchieved && 'bg-orange-50 dark:bg-orange-950/20'
              )}>
                {index < AMBASSADOR_TIERS.length - 1 && (
                  <div className={cn(
                    'absolute left-[25px] top-11 bottom-[-16px] w-[2px]',
                    points >= AMBASSADOR_TIERS[index + 1].points
                      ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                      : 'bg-muted'
                  )} />
                )}
                <div className={cn(
                  'rounded-full flex items-center justify-center border-[3px] shrink-0 z-10 transition-all',
                  isHighestAchieved
                    ? `${TIER_MILESTONE_ACTIVE[tier.name]} animate-pulse-glow w-10 h-10 shadow-lg -ml-0.5`
                    : isAchieved
                      ? `${TIER_MILESTONE_ACTIVE[tier.name]} w-9 h-9`
                      : isNext
                        ? 'w-9 h-9 bg-muted border-yellow-500/50'
                        : 'w-9 h-9 bg-muted border-border opacity-50'
                )}>
                  {isHighestAchieved
                    ? <Flame className="h-5 w-5 text-white drop-shadow-sm" />
                    : <Gift className={`h-4 w-4 ${isAchieved ? 'text-white' : 'text-muted-foreground'}`} />
                  }
                </div>
                <div className={isHighestAchieved ? '-mt-1' : ''}>
                  <div className={cn(
                    'text-sm font-bold',
                    isHighestAchieved
                      ? 'text-orange-600 dark:text-orange-400 text-base drop-shadow-sm'
                      : isAchieved
                        ? TIER_TEXT_ACTIVE[tier.name]
                        : 'text-muted-foreground'
                  )}>
                    {tier.name} <span className="font-normal text-xs ml-1">({tier.points}đ)</span>
                  </div>
                  {isHighestAchieved && <div className="text-[10px] text-orange-600/80 dark:text-orange-400/80 font-semibold uppercase tracking-wider mt-0.5 animate-pulse">Vị trí hiện tại</div>}
                  {isNext && <div className="text-xs text-muted-foreground mt-0.5">Phần thưởng: {tier.reward}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-4 hidden md:block" />

        {/* ── Next-tier info box ─────────────────────────── */}
        {nextTier && pointsNeeded !== null && (
          <div className={cn(
            'rounded-xl p-4 flex items-start gap-3 mt-4 border bg-gradient-to-r',
            TIER_NEXT_BG[nextTier.name] ?? 'from-orange-50 to-amber-50 border-orange-200 dark:from-orange-950/20 dark:to-amber-950/20 dark:border-orange-800/40'
          )}>
            <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text_primary mb-1">
                Còn <span className="fg_orange_accent font-black text-base">{pointsNeeded} điểm</span> để lên{' '}
                <span className="font-black text_primary">{nextTier.name}</span>
              </p>
              <p className="text-xs text_secondary">
                Phần thưởng: <span className="font-semibold text_primary">{nextTier.reward}</span>
              </p>
              <Link to="/rewards" className="mt-2 inline-flex items-center gap-1 text-xs font-bold fg_orange_accent hover:underline">
                Xem chi tiết <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Max tier reached */}
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
    </div>
  );
}
