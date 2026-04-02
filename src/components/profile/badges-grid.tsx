import { Lock } from 'lucide-react';
import { Tooltip } from '@frontend-team/ui-kit';
import { Badge } from '@/types';

interface Props {
  badges: Badge[];
}

export function BadgesGrid({ badges }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {badges.map((badge) => (
        <div key={badge.id} className="relative">
          {badge.isEarned ? (
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card hover:bg-accent transition-colors text-center">
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-xs font-medium leading-tight">{badge.name}</span>
            </div>
          ) : (
            <Tooltip content={badge.description}>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-muted/40 text-center grayscale opacity-60 cursor-help relative">
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-xs font-medium leading-tight text-muted-foreground">{badge.name}</span>
                <div className="absolute top-1.5 right-1.5">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
}
