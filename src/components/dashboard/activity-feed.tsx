import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@frontend-team/ui-kit';
import { useRecentActivities } from '@/hooks/use-activities';
import { ActivityCategory, ActivityColor } from '@/types/activity-types';

interface Props {
  className?: string;
}

const COLOR_MAP: Record<ActivityColor, string> = {
  green: 'bg_green_medium',
  blue: 'bg_blue_medium',
  orange: 'bg_orange_medium',
  yellow: 'bg_yellow_medium',
};

const FILTER_LABELS: { value: ActivityCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'today', label: 'Hôm nay' },
  { value: 'yesterday', label: 'Hôm qua' },
  { value: 'this_week', label: 'Tuần này' },
];

export function ActivityFeed({ className }: Props) {
  const [activityFilter, setActivityFilter] = useState<ActivityCategory | 'all'>('all');
  const { data: activities = [], isLoading } = useRecentActivities();

  const filtered = activities.filter(
    (a) => activityFilter === 'all' || a.category === activityFilter,
  );

  function renderItem(item: (typeof activities)[0], key: string | number) {
    return (
      <div key={key} className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${COLOR_MAP[item.color]}`} />
          <div className="space-y-1.5 flex-1">
            <p className="text-sm leading-snug">
              <span className="font-bold">{item.actorName}</span>{' '}
              {item.action}
              {item.targetName && (
                <> <span className="font-bold">{item.targetName}</span></>
              )}
            </p>
            {item.points !== undefined && (
              <Badge
                variant="outline"
                className="text-xs font-semibold rounded-full border-green-300 text-green-700 bg-green-50 dark:border-green-700 dark:text-green-400 dark:bg-green-950/40"
              >
                +{item.points} điểm
              </Badge>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{item.timeAgo}</span>
      </div>
    );
  }

  return (
    <Card className={`flex flex-col ${className ?? ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Hoạt Động Gần Đây</CardTitle>
        <Dialog>
          <DialogTrigger className="text-sm fg_orange_accent hover:underline flex items-center">
            Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Hoạt Động Gần Đây</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 my-4">
              {FILTER_LABELS.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={activityFilter === value ? 'primary' : 'border'}
                  size="s"
                  onClick={() => setActivityFilter(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
            <div className="space-y-6">
              {filtered.length > 0
                ? filtered.map((a, i) => renderItem(a, i))
                : (
                  <div className="text-center text-muted-foreground py-8">Không có hoạt động nào.</div>
                )}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <div className="space-y-6 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-2 w-2 rounded-full mt-2 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {activities.map((a, i) => renderItem(a, i))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
