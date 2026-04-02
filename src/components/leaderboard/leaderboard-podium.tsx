import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/types';

interface Props {
  entries: LeaderboardEntry[];
}

const PODIUM_CONFIG = [
  { rank: 2, height: 'h-24', bg: 'bg-slate-200 dark:bg-slate-700', medal: '🥈', ring: 'ring-slate-300 dark:ring-slate-500' },
  { rank: 1, height: 'h-32', bg: 'bg-yellow-200 dark:bg-yellow-700', medal: '🥇', ring: 'ring-yellow-400 dark:ring-yellow-500' },
  { rank: 3, height: 'h-20', bg: 'bg-amber-200 dark:bg-amber-800', medal: '🥉', ring: 'ring-amber-400 dark:ring-amber-600' },
];

export function LeaderboardPodium({ entries }: Props) {
  // Order: #2 left, #1 center, #3 right
  const displayOrder = [1, 0, 2];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6 py-6">
      {displayOrder.map((idx) => {
        const config = PODIUM_CONFIG[idx];
        const user = entries.find((e) => e.rank === config.rank);
        if (!user) return null;

        return (
          <div key={config.rank} className="flex flex-col items-center">
            {/* Medal + Avatar */}
            <div className="relative mb-2">
              <Avatar className={`h-14 w-14 sm:h-16 sm:w-16 ring-4 ${config.ring}`}>
                <AvatarFallback className="bg_secondary text_primary font-bold text-lg">
                  {user.avatar ?? user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="absolute -top-2 -right-2 text-xl">{config.medal}</span>
            </div>

            {/* Name + Department */}
            <p className="text-sm font-bold text_primary text-center truncate max-w-[90px] sm:max-w-[120px]">
              {user.name}
            </p>
            <p className="text-[10px] text_secondary text-center truncate max-w-[90px] sm:max-w-[120px]">
              {user.department}
            </p>

            {/* Points */}
            <span className="text-sm font-bold fg_orange_accent mt-1">{user.points}đ</span>

            {/* Stats */}
            <div className="flex gap-2 mt-1 text-[10px] text_secondary">
              <span>{user.referralCount} GT</span>
              <span>{user.onboardCount} OB</span>
            </div>

            {/* Podium bar */}
            <div className={`${config.height} w-20 sm:w-24 ${config.bg} rounded-t-lg mt-2 flex items-start justify-center pt-2`}>
              <span className="text-2xl font-black text-foreground/20">#{config.rank}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
