import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@frontend-team/ui-kit';
import { useLeaderboard } from '@/hooks/use-dashboard';

interface Props {
  className?: string;
}

const RANK_MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

const RANK_BG: Record<number, string> = {
  1: 'bg-yellow-50 dark:bg-yellow-900/20',
  2: 'bg-slate-50 dark:bg-slate-700/20',
  3: 'bg-amber-50 dark:bg-amber-900/20',
};

function getAvatarClass(rank: number) {
  if (rank === 1) return 'bg_yellow_medium fg_on_accent';
  if (rank === 2) return 'bg_slate_subtle fg_slate_strong';
  if (rank === 3) return 'bg_amber_medium fg_on_accent';
  return 'bg_secondary text_secondary';
}

export function LeaderboardCard({ className }: Props) {
  const { data: entries = [], isLoading } = useLeaderboard('monthly');
  const top5 = entries.slice(0, 5);

  return (
    <Card className={`flex flex-col ${className ?? ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          🏆 Bảng xếp hạng
        </CardTitle>
        <Link
          to="/leaderboard"
          className="text-sm fg_orange_accent hover:underline flex items-center"
        >
          Xem BXH <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>

      <CardContent className="flex-1">
        {isLoading ? (
          <div className="space-y-3 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 mt-4">
            {top5.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  user.isCurrentUser
                    ? 'bg_orange_subtle border-l-[3px] border_orange'
                    : RANK_BG[user.rank] ?? ''
                }`}
              >
                <div className="w-7 text-center font-bold text-sm shrink-0">
                  {RANK_MEDAL[user.rank] ?? user.rank}
                </div>
                <Avatar className="h-8 w-8 ml-1">
                  <AvatarFallback className={getAvatarClass(user.rank)}>
                    {user.avatar ?? user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none flex items-center gap-2">
                    <span className="truncate">{user.name}</span>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 border_orange fg_orange_accent bg_orange_subtle shrink-0">
                        Bạn
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{user.department}</p>
                </div>
                <div className="font-bold text-sm fg_orange_accent shrink-0">
                  {user.points}đ
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
