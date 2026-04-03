import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeaderboardEntry } from '@/types';
import { Star } from 'lucide-react';

interface Props {
  entries: LeaderboardEntry[];
}

const PODIUM_CONFIG = [
  { 
    rank: 2, 
    colorClass: 'text-blue-500', 
    borderColor: 'border-blue-200 dark:border-blue-500/20',
    starFill: 'fill-blue-500',
    bgClass: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
    width: 'w-36 sm:w-64 lg:w-72',
    yOffset: 'mt-8 sm:mt-12'
  },
  { 
    rank: 1, 
    colorClass: 'text-yellow-500', 
    borderColor: 'border-yellow-400/50 dark:border-yellow-500/30',
    starFill: 'fill-yellow-500',
    bgClass: 'bg-white/95 dark:bg-slate-800/80 backdrop-blur-md shadow-[0_15px_40px_rgba(250,204,21,0.25)] dark:shadow-[0_10px_30px_rgba(250,204,21,0.15)]',
    width: 'w-40 sm:w-72 lg:w-80',
    yOffset: 'z-10 -mt-2 sm:-mt-4'
  },
  { 
    rank: 3, 
    colorClass: 'text-pink-500', 
    borderColor: 'border-pink-200 dark:border-pink-500/20',
    starFill: 'fill-pink-500',
    bgClass: 'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
    width: 'w-36 sm:w-64 lg:w-72',
    yOffset: 'mt-8 sm:mt-12'
  },
];

export function LeaderboardPodium({ entries }: Props) {
  // Order: #2 left, #1 center, #3 right
  const displayOrder = [0, 1, 2];

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-8 lg:gap-10 py-6 pb-12">
      {displayOrder.map((idx) => {
        const config = PODIUM_CONFIG[idx];
        const user = entries.find((e) => e.rank === config.rank);
        if (!user) return null;

        // Use mock realistic avatar if not provided
        const avatarUrl = user.avatar || `https://i.pravatar.cc/150?u=${user.userId || user.name}`;

        return (
          <div 
            key={config.rank} 
            className={`relative flex flex-col items-center p-4 pt-10 sm:pt-14 rounded-2xl md:rounded-3xl border ${config.borderColor} ${config.bgClass} flex-1 max-w-[${config.width.split(' ').pop()?.replace('w-','')}] ${config.width} ${config.yOffset} transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-2xl`}
          >
            {/* The overlapping Star */}
            <div className={`absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 ${config.colorClass} flex items-center justify-center drop-shadow-md`}>
              <Star className={`w-12 h-12 sm:w-16 sm:h-16 ${config.starFill}`} />
              <span className="absolute text-white text-sm sm:text-xl font-black -mt-0.5">{config.rank}</span>
            </div>

            {/* Avatar */}
            <Avatar className={`${config.rank === 1 ? 'h-20 w-20 sm:h-32 sm:w-32' : 'h-16 w-16 sm:h-24 sm:w-24'} ring-4 ring-slate-100 dark:ring-slate-800/50 mb-3 sm:mb-5 bg-white dark:bg-slate-800 shadow-xl`}>
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
              {user.points} <span className="text-base sm:text-xl font-bold opacity-80 mix-blend-multiply dark:mix-blend-normal">pts</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
