import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, UserPlus, CheckCircle, Zap, Target } from "lucide-react";
import { DashboardStats } from "@/types";

interface StatsSummaryCardsProps {
  stats?: DashboardStats;
}

export function StatsSummaryCards({ stats }: StatsSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ứng viên đã giới thiệu</CardTitle>
          <UserPlus className="h-4 w-4 fg_orange_accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalReferrals ?? 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="fg_success inline-flex items-center font-medium">
              <ArrowUp className="mr-1 h-3 w-3" />
              +{stats?.monthlyReferrals ?? 0} so với tháng trước
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ứng viên đang process</CardTitle>
          <Target className="h-4 w-4 fg_blue_accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.pendingReferrals ?? 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="fg_success inline-flex items-center font-medium">
              Đang chờ cập nhật
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ứng viên đã on-board</CardTitle>
          <CheckCircle className="h-4 w-4 fg_success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.successfulOnboards ?? 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="fg_success inline-flex items-center font-medium">
              Tuyệt vời
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Điểm tháng này</CardTitle>
          <Zap className="h-4 w-4 fg_orange_accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold fg_orange_accent">{stats?.monthlyPoints ?? 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="fg_success inline-flex items-center font-medium">
              <ArrowUp className="mr-1 h-3 w-3" />
              Tổng: {stats?.currentPoints ?? 0} điểm
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
