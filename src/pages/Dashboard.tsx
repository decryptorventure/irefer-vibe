import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUp, ArrowRight, UserPlus, CheckCircle, Zap, Flame, Gift, Target, Info, Star, Trophy, Crown, Shield, Award, Gem, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const leaderboard = [
  { rank: 1, name: "Hoàng Minh", department: "Phòng CNTT", points: 150, avatar: "HM" },
  { rank: 2, name: "Thùy Ngân", department: "Phòng Marketing", points: 120, avatar: "TN" },
  { rank: 3, name: "Phúc Long", department: "Phòng Kinh Doanh", points: 95, avatar: "PL" },
  { rank: 4, name: "Nguyễn Thành", department: "Phòng Kinh Doanh", points: 85, avatar: "NT", isCurrentUser: true },
  { rank: 5, name: "Bảo Trân", department: "Phòng HR", points: 60, avatar: "BT" },
];

const recentActivities = [
  { text: <><span className="font-bold">Trần Minh Tuấn</span> đã được tuyển vào vị trí <span className="font-bold">Senior DevOps</span></>, points: "+500 điểm", time: "2 giờ trước", color: "bg-green-500", category: "today" },
  { text: <><span className="font-bold">Lê Thị Hương</span> đang ở bước <span className="font-bold whitespace-nowrap">Phỏng vấn vòng 2</span></>, points: null, time: "5 giờ trước", color: "bg-blue-500", category: "today" },
  { text: <><span className="font-bold">Phạm Văn Đức</span> vừa được giới thiệu cho vị trí <span className="font-bold">Product Designer</span></>, points: "+50 điểm", time: "Hôm qua", color: "bg-orange-500", category: "yesterday" },
  { text: <><span className="font-bold">Ngô Thị Lan</span> đã nhận được offer vị trí <span className="font-bold">Data Analyst</span></>, points: "+200 điểm", time: "2 ngày trước", color: "bg-orange-500", category: "this_week" },
  { text: <><span className="font-bold">Bạn</span> đã mở khóa huy hiệu 🏆 <span className="font-bold text-yellow-500">Top Recruiter</span></>, points: null, time: "3 ngày trước", color: "bg-green-500", category: "this_week" },
];

const hotJobs = [
  { title: "Senior Backend Engineer", department: "Phòng CNTT · Hà Nội", reward: "+135 điểm" },
  { title: "Product Manager", department: "Phòng Sản Phẩm · TP.HCM", reward: "+135 điểm" },
  { title: "UI/UX Designer", department: "Phòng Thiết Kế · Remote", reward: "+135 điểm" },
  { title: "Data Scientist", department: "Phòng AI · Hà Nội", reward: "+135 điểm" },
];

export function Dashboard() {
  const [activityFilter, setActivityFilter] = useState("all");
  const currentPoints = 85;
  const maxPoints = 120;
  const progressPercentage = Math.min(100, Math.max(0, (currentPoints / maxPoints) * 100));

  const tiers = [
    { name: "Bronze", points: 15, reward: "Áo / Cốc iKame", iconColor: "text-amber-700", bgColor: "bg-amber-100", borderColor: "border-amber-200" },
    { name: "Silver", points: 30, reward: "Voucher 500k", iconColor: "text-slate-600", bgColor: "bg-slate-100", borderColor: "border-slate-200" },
    { name: "Gold", points: 80, reward: "Voucher 2 Triệu", iconColor: "text-yellow-600", bgColor: "bg-yellow-100", borderColor: "border-yellow-200" },
    { name: "Diamond", points: 120, reward: "Tiền mặt 5TR", iconColor: "text-cyan-600", bgColor: "bg-cyan-100", borderColor: "border-cyan-200" },
  ];

  const currentTier = tiers.slice().reverse().find(t => currentPoints >= t.points) || { name: "Chưa có hạng", points: 0 };
  const nextTier = tiers.find(t => currentPoints < t.points);
  const pointsNeeded = nextTier ? nextTier.points - currentPoints : 0;

  const getTierTheme = (tierName: string) => {
    switch (tierName) {
      case 'Bronze':
        return {
          cardBg: 'from-amber-50 to-white dark:from-amber-950/20 dark:to-background',
          cardBorder: 'border-amber-200 dark:border-amber-800/50',
          iconColor: 'text-amber-600 dark:text-amber-500',
          badgeBg: 'bg-amber-100 dark:bg-amber-900/50',
          badgeText: 'text-amber-800 dark:text-amber-400',
          badgeBorder: 'border-amber-300 dark:border-amber-700',
          progressFill: 'from-amber-400 to-amber-600',
          icon: <Award className="h-5 w-5 text-amber-600 dark:text-amber-500" />,
          glow: 'shadow-amber-500/20',
          textColor: 'text-amber-600 dark:text-amber-400',
          alertBg: 'bg-amber-50 dark:bg-amber-950/30',
          alertBorder: 'border-amber-200 dark:border-amber-900/50',
          alertText: 'text-amber-900 dark:text-amber-200',
          milestoneBg: 'bg-amber-500',
        };
      case 'Silver':
        return {
          cardBg: 'from-slate-100 to-white dark:from-slate-900/40 dark:to-background',
          cardBorder: 'border-slate-300 dark:border-slate-700',
          iconColor: 'text-slate-500 dark:text-slate-400',
          badgeBg: 'bg-slate-200 dark:bg-slate-800',
          badgeText: 'text-slate-700 dark:text-slate-300',
          badgeBorder: 'border-slate-400 dark:border-slate-600',
          progressFill: 'from-slate-300 to-slate-500',
          icon: <Shield className="h-5 w-5 text-slate-500 dark:text-slate-400" />,
          glow: 'shadow-slate-500/20',
          textColor: 'text-slate-600 dark:text-slate-400',
          alertBg: 'bg-slate-50 dark:bg-slate-900/30',
          alertBorder: 'border-slate-200 dark:border-slate-800/50',
          alertText: 'text-slate-800 dark:text-slate-200',
          milestoneBg: 'bg-slate-500',
        };
      case 'Gold':
        return {
          cardBg: 'from-yellow-50 to-white dark:from-yellow-950/20 dark:to-background',
          cardBorder: 'border-yellow-300 dark:border-yellow-700/50',
          iconColor: 'text-yellow-500 dark:text-yellow-400',
          badgeBg: 'bg-yellow-100 dark:bg-yellow-900/50',
          badgeText: 'text-yellow-800 dark:text-yellow-400',
          badgeBorder: 'border-yellow-400 dark:border-yellow-600',
          progressFill: 'from-yellow-400 to-yellow-500',
          icon: <Crown className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
          glow: 'shadow-yellow-500/30',
          textColor: 'text-yellow-600 dark:text-yellow-400',
          alertBg: 'bg-yellow-50 dark:bg-yellow-950/30',
          alertBorder: 'border-yellow-200 dark:border-yellow-900/50',
          alertText: 'text-yellow-900 dark:text-yellow-200',
          milestoneBg: 'bg-yellow-500',
        };
      case 'Diamond':
        return {
          cardBg: 'from-cyan-50 to-white dark:from-cyan-950/20 dark:to-background',
          cardBorder: 'border-cyan-200 dark:border-cyan-800/50',
          iconColor: 'text-cyan-500 dark:text-cyan-400',
          badgeBg: 'bg-cyan-100 dark:bg-cyan-900/50',
          badgeText: 'text-cyan-800 dark:text-cyan-400',
          badgeBorder: 'border-cyan-300 dark:border-cyan-700',
          progressFill: 'from-cyan-400 to-blue-500',
          icon: <Gem className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />,
          glow: 'shadow-cyan-500/30',
          textColor: 'text-cyan-600 dark:text-cyan-400',
          alertBg: 'bg-cyan-50 dark:bg-cyan-950/30',
          alertBorder: 'border-cyan-200 dark:border-cyan-900/50',
          alertText: 'text-cyan-900 dark:text-cyan-200',
          milestoneBg: 'bg-cyan-500',
        };
      default:
        return {
          cardBg: 'from-gray-50 to-white dark:from-gray-900/20 dark:to-background',
          cardBorder: 'border-gray-200 dark:border-gray-800/50',
          iconColor: 'text-gray-500 dark:text-gray-400',
          badgeBg: 'bg-gray-100 dark:bg-gray-800',
          badgeText: 'text-gray-700 dark:text-gray-300',
          badgeBorder: 'border-gray-300 dark:border-gray-700',
          progressFill: 'from-gray-400 to-gray-500',
          icon: <Trophy className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
          glow: 'shadow-gray-500/10',
          textColor: 'text-gray-600 dark:text-gray-400',
          alertBg: 'bg-gray-50 dark:bg-gray-900/30',
          alertBorder: 'border-gray-200 dark:border-gray-800/50',
          alertText: 'text-gray-800 dark:text-gray-200',
          milestoneBg: 'bg-gray-500',
        };
    }
  };

  const theme = getTierTheme(currentTier.name);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ứng viên đã giới thiệu</CardTitle>
            <UserPlus className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
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
            <CardTitle className="text-sm font-medium">Ứng viên đang process</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <ArrowUp className="mr-1 h-3 w-3" />
                +2 tuần này
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ứng viên đã on-board</CardTitle>
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
            <div className="text-2xl font-bold text-orange-500">{currentPoints}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 inline-flex items-center font-medium">
                <ArrowUp className="mr-1 h-3 w-3" />
                +15 tuần này
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ambassador Status */}
      <Card className={`${theme.cardBorder} bg-gradient-to-br ${theme.cardBg} shadow-sm transition-colors duration-500`}>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                {theme.icon}
                <h2 className="text-2xl font-bold text-foreground">Vị thế Đại sứ</h2>
              </div>
              <p className="text-muted-foreground mt-1 text-base">
                Bạn đang có <span className={`font-bold ${theme.textColor}`}>{currentPoints} điểm</span>
              </p>
            </div>
            <Badge className={`${theme.badgeBg} ${theme.badgeText} hover:${theme.badgeBg} ${theme.badgeBorder} border px-4 py-1.5 text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm`}>
              {theme.icon}
              {currentTier.name !== "Chưa có hạng" ? `Hạng ${currentTier.name}` : "Chưa có hạng"}
            </Badge>
          </div>

          <div className="relative pt-6 pb-12 px-2 md:px-6">
            {/* Progress Bar Background */}
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
              {/* Progress Bar Fill */}
              <div 
                className={`h-full bg-gradient-to-r ${theme.progressFill} rounded-full transition-all duration-1000 ease-out relative`} 
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse rounded-full"></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="absolute top-6 left-2 right-2 md:left-6 md:right-6 h-4 pointer-events-none">
              {tiers.map((tier) => {
                const position = (tier.points / maxPoints) * 100;
                const isAchieved = currentPoints >= tier.points;
                const isCurrentNext = nextTier?.name === tier.name;
                
                return (
                  <div 
                    key={tier.name} 
                    className="absolute flex flex-col items-center pointer-events-auto" 
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                  >
                    <Tooltip>
                      <TooltipTrigger render={<button />}>
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 transition-all duration-300 hover:scale-110 z-10
                          ${isAchieved 
                            ? `${theme.milestoneBg} border-white dark:border-slate-900` 
                            : isCurrentNext 
                              ? `${tier.bgColor} ${tier.borderColor} animate-bounce` 
                              : 'bg-slate-100 border-white dark:bg-slate-800 dark:border-slate-900 opacity-70'}
                        `}>
                          <Gift className={`h-6 w-6 ${isAchieved ? 'text-white' : tier.iconColor}`} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className={`font-medium px-3 py-2 text-sm shadow-xl ${theme.alertBorder} ${theme.alertBg} ${theme.alertText}`}>
                        <p className="flex items-center gap-2">
                          <Gift className="h-4 w-4" />
                          Phần thưởng: <span className="font-bold">{tier.reward}</span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <div className="mt-3 text-center bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                      <div className={`text-sm font-bold ${isAchieved ? theme.textColor : 'text-muted-foreground'}`}>
                        {tier.name}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {tier.points}đ
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {nextTier && (
            <div className={`mt-8 ${theme.alertBg} border ${theme.alertBorder} rounded-xl p-4 flex items-start gap-3 shadow-sm transition-colors duration-500`}>
              <Info className={`h-5 w-5 ${theme.iconColor} shrink-0 mt-0.5`} />
              <div className={`text-sm md:text-base ${theme.alertText}`}>
                Bạn cần tích thêm <span className={`font-bold ${theme.textColor} text-lg`}>{pointsNeeded} điểm</span> nữa để thăng hạng <span className={`font-bold ${theme.textColor}`}>{nextTier.name}</span>. 
                Nhận ngay <span className="font-bold">{nextTier.reward}</span> khi lên hạng! 
                
                <Dialog>
                  <DialogTrigger className="font-bold text-orange-600 dark:text-orange-400 hover:underline ml-1 inline-flex">
                    Xem cách tính điểm &rarr;
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto sm:p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Hệ Thống Điểm & Đổi Thưởng</DialogTitle>
                      <DialogDescription className="text-base">
                        Cơ chế 3 trụ cột giúp bạn nhận thưởng không giới hạn.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {/* Column 1 */}
                      <Card className="border-orange-200 shadow-sm">
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                            <Flame className="h-6 w-6 text-orange-500" />
                          </div>
                          <CardTitle className="text-lg">1. TÍCH LỬA</CardTitle>
                          <CardDescription>Hệ thống tính điểm cơ bản</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">Submit CV hợp lệ:</span>
                            <span className="font-bold text-emerald-500">+5đ</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">CV Pass Sơ loại:</span>
                            <span className="font-bold text-emerald-500">+10đ</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">Pass Phỏng vấn:</span>
                            <span className="font-bold text-emerald-500">+20đ</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold">Ứng viên Onboard:</span>
                            <span className="font-bold text-orange-500">+50đ</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Column 2 */}
                      <Card className="border-yellow-200 shadow-sm">
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                            <Trophy className="h-6 w-6 text-yellow-600" />
                          </div>
                          <CardTitle className="text-lg">2. VỊ THẾ ĐẠI SỨ</CardTitle>
                          <CardDescription>Thăng hạng nhận đặc quyền</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">Bronze (15đ):</span>
                            <span className="text-sm font-medium">Áo / Cốc iKame</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">Silver (30đ):</span>
                            <span className="text-sm font-medium">Voucher 500k</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm">Gold (80đ):</span>
                            <span className="text-sm font-medium">Voucher 2 Triệu</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-orange-500">Diamond (120đ):</span>
                            <span className="text-sm font-bold text-orange-500">Tiền mặt 5TR</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Column 3 */}
                      <Card className="border-red-200 shadow-sm">
                        <CardHeader className="text-center pb-2">
                          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <Zap className="h-6 w-6 text-red-500" />
                          </div>
                          <CardTitle className="text-lg">3. LỬA BÙNG CHÁY</CardTitle>
                          <CardDescription>Hot Bonus cho vị trí khó</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                          <p className="text-sm text-muted-foreground">
                            Nhận thêm điểm cộng cực lớn khi giới thiệu thành công các job có gắn tag <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">HOT</Badge>
                          </p>
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md border text-sm text-muted-foreground">
                            Vd: Job Senior Backend thưởng thêm <span className="font-bold text-orange-500">50đ</span> nếu onboard.
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="md:col-span-1 lg:col-span-4 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Hoạt Động Gần Đây</CardTitle>
            <Dialog>
              <DialogTrigger className="text-sm text-orange-500 hover:underline flex items-center">
                Xem tất cả <ArrowRight className="ml-1 h-4 w-4" />
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto sm:p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Hoạt Động Gần Đây</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 my-4">
                  <Button variant={activityFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setActivityFilter("all")} className={activityFilter === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}>Tất cả</Button>
                  <Button variant={activityFilter === "today" ? "default" : "outline"} size="sm" onClick={() => setActivityFilter("today")} className={activityFilter === "today" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}>Hôm nay</Button>
                  <Button variant={activityFilter === "yesterday" ? "default" : "outline"} size="sm" onClick={() => setActivityFilter("yesterday")} className={activityFilter === "yesterday" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}>Hôm qua</Button>
                  <Button variant={activityFilter === "this_week" ? "default" : "outline"} size="sm" onClick={() => setActivityFilter("this_week")} className={activityFilter === "this_week" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}>Tuần này</Button>
                </div>
                <div className="space-y-6">
                  {recentActivities.filter(a => activityFilter === "all" || a.category === activityFilter).map((activity, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activity.color}`} />
                        <div className="space-y-1.5 flex-1">
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
                  {recentActivities.filter(a => activityFilter === "all" || a.category === activityFilter).length === 0 && (
                    <div className="text-center text-muted-foreground py-8">Không có hoạt động nào.</div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6 mt-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activity.color}`} />
                    <div className="space-y-1.5 flex-1">
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
              🏆 Bảng xếp hạng
            </CardTitle>
            <Dialog>
              <DialogTrigger className="text-sm text-orange-500 hover:underline flex items-center">
                Xem BXH <ArrowRight className="ml-1 h-4 w-4" />
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto sm:p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Bảng xếp hạng</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        user.isCurrentUser 
                          ? "bg-orange-500/10 border-l-4 border-orange-500" 
                          : "bg-muted/30 border"
                      }`}
                    >
                      <div className="w-8 text-center font-bold text-muted-foreground text-base">
                        {user.rank}
                      </div>
                      <Avatar className="h-10 w-10 ml-2">
                        <AvatarFallback className={
                          user.rank === 1 ? "bg-yellow-500 text-white" :
                          user.rank === 2 ? "bg-slate-300 text-slate-700" :
                          user.rank === 3 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"
                        }>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 flex-1">
                        <p className="text-base font-medium leading-none flex items-center gap-2">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-orange-500/30 text-orange-500 bg-orange-500/10">Bạn</Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{user.department}</p>
                      </div>
                      <div className="font-bold text-base text-orange-500">
                        {user.points} điểm
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
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
                    {user.points} điểm
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
                <React.Fragment key={i}>
                  <Dialog>
                    <DialogTrigger className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border cursor-pointer hover:bg-muted/50 transition-colors w-full text-left">
                      <div>
                        <p className="font-medium text-sm">{job.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{job.department}</p>
                      </div>
                      <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10 gap-1 px-2 py-1">
                        <Zap className="h-3 w-3 fill-orange-500" /> {job.reward}
                      </Badge>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md sm:max-w-xl max-h-[90vh] overflow-y-auto sm:p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
                        <DialogDescription>{job.department}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-orange-500 font-bold">
                          <Zap className="h-5 w-5 fill-orange-500" /> Thưởng giới thiệu thành công: {job.reward}
                        </div>
                        <div className="text-sm space-y-2">
                          <p><strong>Mô tả công việc:</strong></p>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Tham gia phát triển các dự án trọng điểm của công ty.</li>
                            <li>Làm việc với các công nghệ mới nhất.</li>
                            <li>Môi trường làm việc năng động, chuyên nghiệp.</li>
                          </ul>
                        </div>
                        <div className="text-sm space-y-2">
                          <p><strong>Yêu cầu:</strong></p>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Có ít nhất 2 năm kinh nghiệm ở vị trí tương đương.</li>
                            <li>Kỹ năng giải quyết vấn đề tốt.</li>
                            <li>Tinh thần trách nhiệm cao.</li>
                          </ul>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4" render={<Link to={`/refer?job=${encodeURIComponent(job.title)}`} />} nativeButton={false}>
                          Giới thiệu ngay
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </React.Fragment>
              ))}
            </div>
            <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white" render={<Link to="/jobs" />} nativeButton={false}>
              Xem Tất Cả Vị Trí <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Tips & Campaigns */}
        <div className="md:col-span-1 lg:col-span-3 space-y-4 flex flex-col">
          {/* Referral Banner */}
          <div className="flex-1 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FFC700] p-6 flex flex-col justify-center shadow-md border border-orange-400/50 group">
            {/* Decorative background elements */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white/30 -rotate-12" />
            <Users className="absolute bottom-0 right-4 h-24 w-24 text-white/10 translate-y-4" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-semibold mb-3 border border-white/30 shadow-sm">
                <Flame className="h-3.5 w-3.5 fill-yellow-200 text-yellow-200" />
                <span>iKame Referral</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-sm">
                Giới thiệu bạn tài <br/> Nhận ngàn ưu đãi!
              </h3>
              <p className="text-orange-50 text-sm mb-4 max-w-[90%] drop-shadow-sm">
                Cùng xây dựng đội ngũ iKame vững mạnh và nhận những phần thưởng cực kỳ hấp dẫn.
              </p>
              <Button className="bg-white text-[#FF6B00] hover:bg-orange-50 font-bold shadow-sm border-0 w-fit" render={<Link to="/refer" />} nativeButton={false}>
                Giới thiệu ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Campaigns */}
          <Card className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200 dark:border-orange-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <Gift className="h-5 w-5" /> Chiến Dịch Tháng 4
              </CardTitle>
              <CardDescription className="text-sm mt-1 text-orange-600/80 dark:text-orange-400/80">Nhân đôi điểm thưởng!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/30">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Giới thiệu thành công vị trí <span className="font-bold text-orange-600 dark:text-orange-400">Senior Developer</span> trong tháng 4 để nhận <span className="font-bold text-red-500">x2 Điểm thưởng</span> và <span className="font-bold text-red-500">Voucher 1.000.000đ</span>.
                </p>
                <Dialog>
                  <DialogTrigger className="text-sm text-orange-600 dark:text-orange-400 mt-1 hover:underline font-medium text-left">
                    Xem chi tiết chương trình &rarr;
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold flex items-center gap-2 text-orange-600 dark:text-orange-500">
                        <Gift className="h-6 w-6" /> Chiến Dịch Tháng 4
                      </DialogTitle>
                      <DialogDescription>
                        Nhân đôi điểm thưởng cho vị trí Senior Developer
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-100 dark:border-orange-900/50">
                        <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">🎁 Phần thưởng đặc biệt:</h4>
                        <ul className="space-y-2 text-sm text-orange-700 dark:text-orange-400">
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> <strong>x2 Điểm thưởng</strong> cho mỗi lượt giới thiệu thành công.</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> <strong>Voucher 1.000.000đ</strong> khi ứng viên pass thử việc.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 text-sm">Điều kiện áp dụng:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Chỉ áp dụng cho vị trí <strong>Senior Developer</strong>.</li>
                          <li>Thời gian gửi CV: từ <strong>01/04/2026</strong> đến hết <strong>30/04/2026</strong>.</li>
                          <li>Ứng viên phải hoàn thành ít nhất vòng phỏng vấn đầu tiên trong tháng 4.</li>
                          <li>Không giới hạn số lượng ứng viên giới thiệu.</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

