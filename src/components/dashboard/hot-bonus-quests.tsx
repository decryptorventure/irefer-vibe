import { Flame, Zap, Trophy, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface HotBonus {
  id: string;
  title: string;
  description: string;
  reward: string;
  type: 'money' | 'points';
  progress: number;
  total: number;
  isCompleted: boolean;
  icon: React.ReactNode;
  timeframe: string;
  color: string;
}

const MOCK_BONUSES: HotBonus[] = [
  {
    id: 'b-1',
    title: 'Lửa khởi phát',
    description: 'Nằm trong top 5 iKamer đầu tiên gửi CV Qualified trong tháng 4.',
    reward: '50.000đ',
    type: 'money',
    progress: 1,
    total: 1,
    isCompleted: true,
    icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
    timeframe: 'Tháng 4',
    color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  },
  {
    id: 'b-2',
    title: 'Lửa bền bỉ',
    description: 'Giới thiệu thành công 2 ứng viên Onboard trong cùng 1 Quý.',
    reward: '500.000đ',
    type: 'money',
    progress: 1,
    total: 2,
    isCompleted: false,
    icon: <Flame className="h-5 w-5 text-orange-500" />,
    timeframe: 'Quý 2/2026',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  },
  {
    id: 'b-3',
    title: 'Lửa truyền cảm hứng',
    description: 'iKamer có lượt share/like bài tuyển dụng nhiều nhất tháng trên mạng xã hội.',
    reward: '500.000đ',
    type: 'money',
    progress: 3,
    total: 10,
    isCompleted: false,
    icon: <Target className="h-5 w-5 text-pink-500" />,
    timeframe: 'Tháng 4',
    color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
  },
  {
    id: 'b-4',
    title: 'Lửa năng nổ',
    description: 'iKamer gửi CV giới thiệu nhiều nhất tháng (không giới hạn).',
    reward: '1.000.000đ',
    type: 'money',
    progress: 3,
    total: 10,
    isCompleted: false,
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    timeframe: 'Tháng 4',
    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  },
  {
    id: 'b-5',
    title: 'Siêu Hunter Tháng',
    description: 'iKamer có ứng viên onboard nhiều nhất tháng (tối thiểu 2 người)',
    reward: '1.000.000đ',
    type: 'money',
    progress: 0,
    total: 2,
    isCompleted: false,
    icon: <Trophy className="h-5 w-5 text-red-500" />,
    timeframe: 'Tháng 4',
    color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  },
];

export function HotBonusQuests() {
  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              Lửa Bùng Cháy <Zap className="h-5 w-5 text-red-500" />
            </CardTitle>
            <CardDescription className="mt-1">
              Thưởng nóng tiền mặt không giới hạn cho các chiến dịch đặc biệt
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_BONUSES.map((bonus) => {
          const progressPercent = Math.min(100, Math.max(0, (bonus.progress / bonus.total) * 100));

          return (
            <div key={bonus.id} className={`flex flex-col sm:flex-row gap-4 p-4 rounded-xl border ${bonus.isCompleted ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50' : bonus.color} transition-colors relative overflow-hidden`}>
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 dark:bg-black/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-start gap-4 flex-1 z-10">
                <div className={`p-3 rounded-lg flex shrink-0 ${bonus.isCompleted ? 'bg-green-100 dark:bg-green-800/40 text-green-600 dark:text-green-400' : 'bg-background shadow-sm border'}`}>
                  {bonus.isCompleted ? <CheckCircle2 className="h-5 w-5" /> : bonus.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-base truncate pr-2">{bonus.title}</h4>
                    <Badge variant={bonus.isCompleted ? 'success' : 'outline'} className={`shrink-0 ${bonus.isCompleted ? '' : 'bg-background'}`}>
                      {bonus.timeframe}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug mb-3">
                    {bonus.description}
                  </p>
                  
                  {/* Progress Section */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end text-xs font-medium">
                      <span className={bonus.isCompleted ? 'text-green-600 dark:text-green-500 font-bold' : 'text-muted-foreground'}>
                        {bonus.isCompleted ? 'Đã hoàn thành!' : 'Tiến độ'}
                      </span>
                      <span>
                        <span className={bonus.progress > 0 && !bonus.isCompleted ? 'text-foreground font-bold' : ''}>
                          {bonus.progress}
                        </span>
                        <span className="text-muted-foreground"> / {bonus.total}</span>
                      </span>
                    </div>
                    {!bonus.isCompleted && (
                      <Progress value={progressPercent} className="h-1.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Reward Box */}
              <div className="sm:w-32 sm:shrink-0 flex sm:flex-col items-center sm:justify-center p-3 rounded-lg bg-background border border-border shadow-sm z-10 sm:h-auto h-12">
                <span className="text-xs text-muted-foreground sm:mb-1 hidden sm:block">Phần thưởng</span>
                <span className="font-bold text-green-600 dark:text-green-400 sm:text-lg flex items-center gap-1.5">
                  <span className="sm:hidden text-muted-foreground text-xs font-normal">Thưởng:</span>
                  +{bonus.reward}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
