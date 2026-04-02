import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@frontend-team/ui-kit';
import { useLeaderboard } from '@/hooks/use-dashboard';

export function HallOfFameCard() {
  const { data: entries = [], isLoading } = useLeaderboard('monthly');
  const topUser = entries[0];

  if (isLoading) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 p-6 flex items-center gap-5">
        <Skeleton className="h-16 w-16 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  if (!topUser) return null;

  const initials = topUser.name
    .split(' ')
    .map((n) => n[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  return (
    <div className="rounded-xl bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 p-6 shadow-md border border-orange-300/50 flex items-center gap-5">
      <div className="relative shrink-0">
        <Avatar className="h-16 w-16 border-4 border-white/40 shadow-lg">
          <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
          <Trophy className="h-4 w-4 text-yellow-500" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-0.5">
          Nhân vật của tháng
        </p>
        <p className="text-white text-xl font-bold truncate">{topUser.name}</p>
        <p className="text-white/80 text-sm truncate">{topUser.department}</p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Trophy className="h-3.5 w-3.5 text-white" />
          <span className="text-white text-xs font-semibold">{topUser.points} điểm · Tháng 3/2026</span>
        </div>
      </div>
    </div>
  );
}
