import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LeaderboardEntry } from '@/types';

interface Props {
  entries: LeaderboardEntry[];
}

export function LeaderboardList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text_secondary text-sm">
        Không có dữ liệu xếp hạng.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {entries.map((user) => (
        <div
          key={user.userId}
          className={`flex items-center p-3 rounded-lg transition-colors ${
            user.isCurrentUser
              ? 'bg_orange_subtle border-l-3 border_orange'
              : 'hover:bg_secondary'
          }`}
        >
          <div className="w-8 text-center font-bold text_secondary text-sm shrink-0">
            {user.rank}
          </div>
          <Avatar className="h-9 w-9 ml-2 shrink-0 bg-background">
            <AvatarImage src={user.avatar || `https://i.pravatar.cc/150?u=${user.userId || user.name}`} alt={user.name} />
            <AvatarFallback className="bg_secondary text_primary font-semibold text-sm">
              {user.name.slice(0, 2).toUpperCase()}
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
            <p className="text-xs text_secondary mt-1">{user.department}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text_secondary">{user.referralCount} giới thiệu</p>
              <p className="text-xs text_secondary">{user.onboardCount} onboard</p>
            </div>
            <div className="font-bold text-sm fg_orange_accent w-14 text-right">
              {user.points}đ
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
