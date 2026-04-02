import { Info, Gift, Flame, Trophy, Crown, Gem, Award, Shield, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AMBASSADOR_TIERS,
  MAX_TIER_POINTS,
  POINTS_RULES,
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
  Bronze:  <Award className="h-5 w-5" />,
  Silver:  <Shield className="h-5 w-5" />,
  Gold:    <Crown className="h-5 w-5" />,
  Diamond: <Gem className="h-5 w-5" />,
};

const TIER_BADGE_STYLES: Record<string, string> = {
  Bronze:  'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700/50',
  Silver:  'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/50',
  Gold:    'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-700/50',
  Diamond: 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-400 dark:border-cyan-700/50',
};

const TIER_MILESTONE_ACTIVE: Record<string, string> = {
  Bronze:  'bg-amber-500 border-amber-300 shadow-amber-500/40 dark:border-amber-400',
  Silver:  'bg-slate-400 border-slate-200 shadow-slate-400/40 dark:border-slate-300',
  Gold:    'bg-yellow-500 border-yellow-300 shadow-yellow-500/40 dark:border-yellow-400',
  Diamond: 'bg-cyan-400 border-cyan-200 shadow-cyan-400/40 dark:border-cyan-300',
};

const TIER_TEXT_ACTIVE: Record<string, string> = {
  Bronze:  'text-amber-600 dark:text-amber-400',
  Silver:  'text-slate-500 dark:text-slate-300',
  Gold:    'text-yellow-600 dark:text-yellow-400',
  Diamond: 'text-cyan-600 dark:text-cyan-400',
};

/* ── Component ────────────────────────────────────────── */

export function AmbassadorLevelCard({ points }: Props) {
  const progressPercentage = getTierProgress(points);
  const currentTier = getCurrentTier(points);
  const nextTier = getNextTier(points);
  const pointsNeeded = getPointsToNextTier(points);
  const currentTierName = currentTier?.name ?? 'Chưa có hạng';

  return (
    <div className="rounded-xl bg-card border border-border p-6 md:p-8 shadow-sm transition-colors">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
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

      {/* ── Progress bar + milestones ──────────────────── */}
      <div className="relative px-0 md:px-4 mb-4">
        {/* Bar track — milestone icons are vertically centered on this */}
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full" />
          </div>
        </div>

        {/* Milestone icons — centered vertically on the progress bar */}
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
                /* top = half the bar height (6px) minus half the icon size (18px) = -12px from the bar top */
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
              <div className="mt-2 text-center whitespace-nowrap">
                <div className={`text-xs font-bold ${isAchieved ? (TIER_TEXT_ACTIVE[tier.name] ?? 'text-foreground') : 'text-muted-foreground'}`}>
                  {tier.name}
                </div>
                <div className="text-[10px] text-muted-foreground font-medium">{tier.points}đ</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer for milestone labels below the bar */}
      <div className="h-14" />

      {/* ── Next-tier info box ─────────────────────────── */}
      {nextTier && pointsNeeded !== null && (
        <div className="bg-muted/60 dark:bg-muted/40 border border-border rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-yellow-500 dark:text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bạn cần tích thêm{' '}
            <span className="font-bold text-yellow-600 dark:text-yellow-400 text-base">{pointsNeeded} điểm</span>{' '}
            nữa để thăng hạng{' '}
            <span className="font-bold text-yellow-600 dark:text-yellow-400">{nextTier.name}</span>.{' '}
            Nhận ngay <span className="font-bold text-foreground">{nextTier.reward}</span> khi lên hạng!{' '}
            <Dialog>
              <DialogTrigger className="font-bold text-orange-500 dark:text-orange-400 hover:underline inline-flex items-center gap-0.5 transition-colors">
                Xem cách tính điểm &rarr;
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto sm:p-6">
                <ScoringSystemPopup />
              </DialogContent>
            </Dialog>
          </p>
        </div>
      )}

      {/* If at max tier */}
      {!nextTier && currentTier && (
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 rounded-xl p-4 flex items-start gap-3">
          <Gem className="h-5 w-5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-cyan-700 dark:text-cyan-200 leading-relaxed">
            Chúc mừng! Bạn đã đạt hạng <span className="font-bold text-cyan-600 dark:text-cyan-400">Diamond</span> — hạng cao nhất.
            Tiếp tục giới thiệu để duy trì vị thế và nhận thêm phần thưởng!
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Popup: Hệ Thống Điểm & Đổi Thưởng ──────────────── */

function ScoringSystemPopup() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Hệ Thống Điểm & Đổi Thưởng
        </DialogTitle>
        <DialogDescription className="text-base">
          Cơ chế 3 trụ cột giúp bạn nhận thưởng không giới hạn.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* ─ Pillar 1: Tích Lửa ─ */}
        <div className="bg-muted/50 dark:bg-muted/30 rounded-xl border border-border p-5">
          <div className="text-center mb-4">
            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center mb-3">
              <Flame className="h-6 w-6 text-orange-500 dark:text-orange-400" />
            </div>
            <h3 className="text-base font-bold">1. TÍCH LỬA</h3>
            <p className="text-xs text-muted-foreground mt-1">Hệ thống tính điểm cơ bản</p>
          </div>
          <div className="space-y-0">
            {POINTS_RULES.map((rule, i) => (
              <div key={rule.event} className={`flex justify-between items-center py-2.5 ${i < POINTS_RULES.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-sm text-muted-foreground">{rule.label}:</span>
                <span className="font-bold text-green-600 dark:text-green-400 text-sm">+{rule.points}đ</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─ Pillar 2: Vị Thế Đại Sứ ─ */}
        <div className="bg-muted/50 dark:bg-muted/30 rounded-xl border border-border p-5">
          <div className="text-center mb-4">
            <div className="mx-auto w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center mb-3">
              <Trophy className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
            </div>
            <h3 className="text-base font-bold">2. VỊ THẾ ĐẠI SỨ</h3>
            <p className="text-xs text-muted-foreground mt-1">Thăng hạng nhận đặc quyền</p>
          </div>
          <div className="space-y-0">
            {AMBASSADOR_TIERS.map((tier, i) => (
              <div key={tier.name} className={`flex justify-between items-center py-2.5 ${i < AMBASSADOR_TIERS.length - 1 ? 'border-b border-border' : ''}`}>
                <span className={`text-sm font-medium ${tier.name === 'Diamond' ? 'text-orange-500 dark:text-orange-400 font-bold' : 'text-muted-foreground'}`}>
                  {tier.name} ({tier.points}đ):
                </span>
                <span className={`text-sm font-medium ${tier.name === 'Diamond' ? 'text-orange-500 dark:text-orange-400 font-bold' : ''}`}>
                  {tier.reward}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─ Pillar 3: Lửa Bùng Cháy ─ */}
        <div className="bg-muted/50 dark:bg-muted/30 rounded-xl border border-border p-5">
          <div className="text-center mb-4">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-3">
              <Zap className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-base font-bold">3. LỬA BÙNG CHÁY</h3>
            <p className="text-xs text-muted-foreground mt-1">Hot Bonus cho vị trí khó</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Nhận thêm điểm cộng cực lớn khi giới thiệu thành công các job có gắn tag{' '}
              <Badge variant="error" className="text-[10px] px-1.5 py-0 h-4 align-middle">HOT</Badge>
            </p>
            <div className="bg-card p-3 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground">
                Vd: Job Senior Backend thưởng thêm{' '}
                <span className="font-bold text-orange-500 dark:text-orange-400">50đ</span> nếu onboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
