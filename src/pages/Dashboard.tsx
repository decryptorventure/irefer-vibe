import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUp, ArrowRight, UserPlus, CheckCircle, Zap, Flame, Gift, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const leaderboard = [
  { rank: 1, name: "Hoàng Minh", department: "Phòng CNTT", points: "4.200đ", avatar: "HM" },
  { rank: 2, name: "Thùy Ngân", department: "Phòng Marketing", points: "3.850đ", avatar: "TN" },
  { rank: 3, name: "Phúc Long", department: "Phòng Kinh Doanh", points: "3.100đ", avatar: "PL" },
  { rank: 4, name: "Nguyễn Thành", department: "Phòng Kinh Doanh", points: "2.450đ", avatar: "NT", isCurrentUser: true },
  { rank: 5, name: "Bảo Trân", department: "Phòng HR", points: "2.200đ", avatar: "BT" },
];

const recentActivities = [
  { text: <><span className="font-bold">Trần Minh Tuấn</span> đã được tuyển vào vị trí <span className="font-bold">Senior DevOps</span></>, points: "+500 điểm", time: "2 giờ trước", color: "bg-green-500" },
  { text: <><span className="font-bold">Lê Thị Hương</span> đang ở bước <span className="font-bold">Phỏng vấn vòng 2</span></>, points: null, time: "5 giờ trước", color: "bg-blue-500" },
  { text: <><span className="font-bold">Phạm Văn Đức</span> vừa được giới thiệu cho vị trí <span className="font-bold">Product Designer</span></>, points: "+50 điểm", time: "Hôm qua", color: "bg-orange-500" },
  { text: <><span className="font-bold">Ngô Thị Lan</span> đã nhận được offer vị trí <span className="font-bold">Data Analyst</span></>, points: "+200 điểm", time: "2 ngày trước", color: "bg-orange-500" },
  { text: <><span className="font-bold">Bạn</span> đã mở khóa huy hiệu 🏆 <span className="font-bold text-yellow-500">Top Recruiter</span></>, points: null, time: "3 ngày trước", color: "bg-green-500" },
];

const hotJobs = [
  { title: "Senior Backend Engineer", department: "Phòng CNTT · Hà Nội", reward: "+800đ" },
  { title: "Product Manager", department: "Phòng Sản Phẩm · TP.HCM", reward: "+600đ" },
  { title: "UI/UX Designer", department: "Phòng Thiết Kế · Remote", reward: "+500đ" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giới thiệu tháng này</CardTitle>
            <UserPlus className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <ArrowUp className="mr-1 h-3 w-3" />
                +3 so với tháng trước
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ứng viên được tuyển</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <ArrowUp className="mr-1 h-3 w-3" />
                +1 tháng này
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm tích lũy</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">2.450</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <Zap className="mr-1 h-3 w-3" />
                +350 tuần này
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Xếp hạng tháng này</CardTitle>
            <ArrowUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#4</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <ArrowUp className="mr-1 h-3 w-3" />
                +2 so với tuần trước
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="md:col-span-1 lg:col-span-4 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Hoạt Động Gần Đây</CardTitle>
            <Link to="#" className="text-sm text-orange-500 hover:underline flex items-center">
              Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6 mt-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activity.color}`} />
                    <div className="space-y-1.5">
                      <p className="text-sm leading-snug">{activity.text}</p>
                      {activity.points && (
                        <Badge variant="outline" className="text-xs font-normal rounded-full border-orange-500/30 text-orange-500 bg-orange-500/10">
                          {activity.points}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="md:col-span-1 lg:col-span-3 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              🏆 Top Tuần Này
            </CardTitle>
            <Link to="#" className="text-sm text-orange-500 hover:underline flex items-center">
              Xem BXH <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 mt-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    user.isCurrentUser 
                      ? "bg-orange-500/10 border-l-2 border-orange-500" 
                      : ""
                  }`}
                >
                  <div className="w-6 text-center font-bold text-muted-foreground text-sm">
                    {user.rank}
                  </div>
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback className={
                      user.rank === 1 ? "bg-yellow-500 text-white" :
                      user.rank === 2 ? "bg-slate-300 text-slate-700" :
                      user.rank === 3 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"
                    }>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium leading-none flex items-center gap-2">
                      {user.name}
                      {user.isCurrentUser && (
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-orange-500/30 text-orange-500 bg-orange-500/10">Bạn</Badge>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{user.department}</p>
                  </div>
                  <div className="font-bold text-sm text-orange-500">
                    {user.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Hot Jobs */}
        <Card className="md:col-span-1 lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">Vị Trí Đang Tuyển Hot <Flame className="h-5 w-5 text-orange-500 fill-orange-500" /></CardTitle>
            <CardDescription>Giới thiệu ngay để nhận điểm thưởng cao hơn</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              {hotJobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                  <div>
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{job.department}</p>
                  </div>
                  <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 gap-1 px-2 py-1">
                    <Zap className="h-3 w-3 fill-orange-500" /> {job.reward}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white" render={<Link to="/jobs" />}>
              Xem Tất Cả Vị Trí <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Rewards & Goals */}
        <div className="md:col-span-1 lg:col-span-3 space-y-4 flex flex-col">
          {/* Next Reward */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  <Gift className="h-5 w-5 text-orange-500" /> Phần Thưởng Tiếp Theo
                </CardTitle>
                <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">
                  2.450 / 3.000đ
                </Badge>
              </div>
              <CardDescription className="text-sm mt-1">Voucher Grab 200.000đ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "82%" }} />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Còn thiếu 550 điểm</span>
                <span>82%</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Goal */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-500" /> Mục Tiêu Tháng
                </CardTitle>
                <span className="text-sm font-medium text-emerald-500">8/10</span>
              </div>
              <CardDescription className="text-sm mt-1">10 giới thiệu thành công</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }} />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>2 giới thiệu nữa là xong!</span>
                <span>80%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

