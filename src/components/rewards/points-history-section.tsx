import { ArrowUp, ArrowDown, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@frontend-team/ui-kit';
import { usePointsHistory } from '@/hooks/use-dashboard';

export function PointsHistorySection() {
  const { data: pointsPage, isLoading } = usePointsHistory(1, 10);
  const pointsHistory = pointsPage?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 fg_orange_accent" /> Lịch sử điểm tích lửa
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        ) : pointsHistory.length > 0 ? (
          <div className="space-y-4">
            {pointsHistory.map((tx) => (
              <div key={tx.id} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 p-1.5 rounded-full shrink-0 ${
                    tx.type === 'earned'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  {tx.type === 'earned' ? (
                    <ArrowUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{tx.reason}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(tx.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`font-bold text-sm shrink-0 ${
                    tx.type === 'earned' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {tx.type === 'earned' ? '+' : ''}{tx.points}đ
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Chưa có lịch sử điểm.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
