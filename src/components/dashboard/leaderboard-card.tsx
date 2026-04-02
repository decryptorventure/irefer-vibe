import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@frontend-team/ui-kit';
import { useLeaderboard } from '@/hooks/use-dashboard';

interface Props {
  className?: string;
}

function getAvatarClass(rank: number) {
  if (rank === 1) return 'bg_yellow_medium fg_on_accent';
  if (rank === 2) return 'bg_slate_subtle fg_slate_strong';
  if (rank === 3) return 'bg_amber_medium fg_on_accent';
  return 'bg_secondary text_secondary';
}

export function LeaderboardCard({ className }: Props) {
  const { data: entries = [], isLoading } = useLeaderboard('monthly');
  const top5 = entries.slice(0, 5);

  function renderEntry(user: (typeof entries)[0], size: 'compact' | 'full' = 'compact') {
    const isCompact = size === 'compact';
    return (
      <div
        key={user.rank}
        className={`flex items-center p-2 rounded-lg transition-colors ${
          user.isCurrentUser ? 'bg_orange_subtle border-l-2 border_orange' : ''
        }`}
      >
        <div className={`${isCompact ? 'w-6' : 'w-8'} text-center font-bold text_secondary text-sm`}>
          {user.rank}
        </div>
        <Avatar className={`${isCompact ? 'h-8 w-8' : 'h-10 w-10'} ml-2`}>
          <AvatarFallback className={getAvatarClass(user.rank)}>
            {user.avatar ?? user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className={`${isCompact ? 'ml-3' : 'ml-4'} flex-1`}>
          <p className={`${isCompact ? 'text-sm' : 'text-base'} font-medium leading-none flex items-center gap-2`}>
            {user.name}
            {user.isCurrentUser && (
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 border_orange fg_orange_accent bg_orange_subtle">
                Bạn
              </Badge>
            )}
          </p>
          <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>{user.department}</p>
        </div>
        <div className={`font-bold ${isCompact ? 'text-sm' : 'text-base'} fg_orange_accent`}>
          {user.points} điểm
        </div>
      </div>
    );
  }

  return (
    <Card className={`flex flex-col ${className ?? ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">🏆 Bảng xếp hạng</CardTitle>
        <Dialog>
          <DialogTrigger className="text-sm fg_orange_accent hover:underline flex items-center">
            Xem BXH <ArrowRight className="ml-1 h-4 w-4" />
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Bảng xếp hạng</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {top5.map((user) => renderEntry(user, 'full'))}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="flex-1">
        {isLoading ? (
          <div className="space-y-4 mt-4">
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
          <div className="space-y-4 mt-4">
            {top5.map((user) => renderEntry(user, 'compact'))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
