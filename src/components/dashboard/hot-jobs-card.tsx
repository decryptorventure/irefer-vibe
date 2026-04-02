import { Flame, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@frontend-team/ui-kit';
import { useJobs } from '@/hooks/use-jobs';
import { POINTS_MATRIX } from '@/lib/points-utils';

interface Props {
  className?: string;
}

export function HotJobsCard({ className }: Props) {
  const { data: jobsPage, isLoading } = useJobs({ isHot: true });
  const hotJobs = jobsPage?.data ?? [];

  return (
    <Card className={`flex flex-col ${className ?? ''}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Vị Trí Đang Tuyển Hot <Flame className="h-5 w-5 fg_orange_accent" />
        </CardTitle>
        <CardDescription>Giới thiệu ngay để nhận điểm thưởng cao hơn</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="space-y-3 flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {hotJobs.map((job) => (
              <Dialog key={job.id}>
                <DialogTrigger className="flex items-center justify-between p-3 rounded-lg bg_secondary border cursor-pointer hover:state_secondary_soft transition-colors w-full text-left">
                  <div>
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text_tertiary mt-1">
                      {job.department} · {job.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/40 gap-1 px-2 py-1 shrink-0 font-semibold">
                    <Zap className="h-3 w-3" />
                    +{(job.rewardPoints ?? POINTS_MATRIX[job.seniorityLevel].onboard)}đ
                  </Badge>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md sm:max-w-xl max-h-[90vh] overflow-y-auto sm:p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
                    <DialogDescription>{job.department} · {job.location}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
                      <Zap className="h-5 w-5" />
                      Thưởng khi ứng viên onboard: +{(job.rewardPoints ?? POINTS_MATRIX[job.seniorityLevel].onboard)}đ
                    </div>
                    <div className="text-sm space-y-2">
                      <p><strong>Mô tả công việc:</strong></p>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    <Button asChild variant="primary" className="w-full mt-4">
                      <Link to={`/refer?job=${job.id}`}>Giới thiệu ngay</Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
        <Button asChild variant="primary" className="w-full mt-4">
          <Link to="/jobs">Xem Tất Cả Vị Trí <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardContent>
    </Card>
  );
}
