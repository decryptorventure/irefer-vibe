import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/types';
import { Crown, Trophy, Award } from 'lucide-react';

interface Props {
  entries: LeaderboardEntry[];
}

// Rank icons: Crown for #1, Trophy for #2, Award for #3
const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown className="w-12 h-12 sm:w-16 sm:h-16 fill-yellow-500 text-yellow-500" />,
  2: <Trophy className="w-12 h-12 sm:w-16 sm:h-16 fill-blue-400 text-blue-400" />,
  3: <Award className="w-12 h-12 sm:w-16 sm:h-16 fill-pink-400 text-pink-400" />,
};

const PODIUM_CONFIG = [
  {
    rank: 2,
    colorClass: 'text-blue-500',
    borderColor: 'border-blue-200 dark:border-blue-500/20',
    bgClass: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
    width: 'w-36 sm:w-64 lg:w-72',
    yOffset: 'mt-8 sm:mt-12'
  },
  {
    rank: 1,
    colorClass: 'text-yellow-500',
    borderColor: 'border-yellow-400/50 dark:border-yellow-500/30',
    bgClass: 'bg-white/95 dark:bg-slate-800/80 backdrop-blur-md shadow-[0_15px_40px_rgba(250,204,21,0.25)] dark:shadow-[0_10px_30px_rgba(250,204,21,0.15)]',
    width: 'w-40 sm:w-72 lg:w-80',
    yOffset: 'z-10 -mt-2 sm:-mt-4'
  },
  {
    rank: 3,
    colorClass: 'text-pink-500',
    borderColor: 'border-pink-200 dark:border-pink-500/20',
    bgClass: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
    width: 'w-36 sm:w-64 lg:w-72',
    yOffset: 'mt-8 sm:mt-12'
  },
];

export function LeaderboardPodium({ entries }: Props) {
  // Order: #2 left, #1 center, #3 right
  const displayOrder = [0, 1, 2];

  return (
    <div className="relative pb-16">
      <div className="flex items-start justify-center gap-2 sm:gap-8 lg:gap-10 py-6 pb-12">
        {displayOrder.map((idx) => {
          const config = PODIUM_CONFIG[idx];
          const user = entries.find((e) => e.rank === config.rank);
          if (!user) return null;

          const avatarUrl = user.avatar || `https://i.pravatar.cc/150?u=${user.userId || user.name}`;

          return (
            <div
              key={config.rank}
              className={`relative flex flex-col items-center p-4 pt-10 sm:pt-14 rounded-2xl md:rounded-3xl border ${config.borderColor} ${config.bgClass} flex-1 ${config.width} ${config.yOffset} transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-2xl`}
            >
              {/* Rank icon — Crown/Trophy/Award */}
              <div className={`absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 ${config.colorClass} flex items-center justify-center drop-shadow-md`}>
                {RANK_ICONS[config.rank]}
                <span className="absolute text-white text-sm sm:text-xl font-black -mt-0.5">{config.rank}</span>
              </div>

              {/* Avatar */}
              <Avatar className={`${config.rank === 1 ? 'h-20 w-20 sm:h-32 sm:w-32' : 'h-16 w-16 sm:h-24 sm:w-24'} ring-4 ring-white/30 dark:ring-white/10 mb-3 sm:mb-5 bg-white dark:bg-slate-800 shadow-xl`}>
                <AvatarImage src={avatarUrl} alt={user.name} className="object-cover" />
                <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-lg">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <p className={`text-sm sm:text-2xl font-bold text-slate-800 dark:text-slate-100 text-center truncate w-full mb-0.5 leading-tight ${config.rank === 1 ? 'sm:text-3xl' : ''}`}>
                {user.name}
              </p>

              {/* Dept */}
              <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 text-center truncate w-full mb-3 sm:mb-5">
                @{user.department.toLowerCase().replace(/\s/g, '')}
              </p>

              {/* Sub Stats */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-3 w-full px-1 sm:px-2 mb-4 sm:mb-6">
                <div className="flex-1 flex flex-col items-center bg-slate-100/80 dark:bg-slate-800/40 rounded-xl py-1.5 sm:py-2 border border-slate-200/60 dark:border-slate-700/50 shadow-inner">
                  <span className="text-[9px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Giới thiệu</span>
                  <span className="text-sm sm:text-lg font-black text-slate-700 dark:text-slate-200">{user.referralCount}</span>
                </div>
                <div className="flex-1 flex flex-col items-center bg-slate-100/80 dark:bg-slate-800/40 rounded-xl py-1.5 sm:py-2 border border-slate-200/60 dark:border-slate-700/50 shadow-inner">
                  <span className="text-[9px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Onboard</span>
                  <span className="text-sm sm:text-lg font-black text-emerald-600 dark:text-emerald-400">{user.onboardCount}</span>
                </div>
              </div>

              {/* Points */}
              <p className={`${config.rank === 1 ? 'text-4xl lg:text-6xl' : 'text-3xl lg:text-5xl'} font-black ${config.colorClass} tracking-tight drop-shadow-sm`}>
                {user.points} <span className="text-base sm:text-xl font-bold opacity-70">pts</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Decorative podium steps below cards */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 sm:gap-8 lg:gap-10 px-4 pointer-events-none">
        <div className="flex-1 max-w-[9rem] sm:max-w-[16rem] h-12 bg-gradient-to-b from-blue-400/30 to-blue-500/20 dark:from-blue-500/20 dark:to-blue-600/10 rounded-t-md border-t border-x border-blue-300/50 dark:border-blue-600/30" />
        <div className="flex-1 max-w-[10rem] sm:max-w-[18rem] h-20 bg-gradient-to-b from-yellow-400/30 to-yellow-500/20 dark:from-yellow-500/20 dark:to-yellow-600/10 rounded-t-md border-t border-x border-yellow-300/50 dark:border-yellow-600/30" />
        <div className="flex-1 max-w-[9rem] sm:max-w-[16rem] h-8 bg-gradient-to-b from-pink-400/30 to-pink-500/20 dark:from-pink-500/20 dark:to-pink-600/10 rounded-t-md border-t border-x border-pink-300/50 dark:border-pink-600/30" />
      </div>
    </div>
  );
}
