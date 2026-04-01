import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Linkedin, FileText, Calendar, Clock, CheckCircle2, XCircle, Star, MessageSquare } from "lucide-react";

// Mock data extended from MyReferrals
const candidateDetails: Record<string, any> = {
  "REF-001": {
    id: "REF-001",
    name: "Sarah Jenkins",
    position: "Senior Frontend Engineer",
    date: "2026-03-28",
    status: "Đang phỏng vấn",
    pointsEarned: 50,
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    email: "sarah.jenkins@example.com",
    phone: "+84 987 654 321",
    linkedin: "linkedin.com/in/sarahjenkins",
    resume: "sarah_jenkins_cv.pdf",
    notes: "Sarah có 5 năm kinh nghiệm làm việc với React và hệ sinh thái Frontend. Từng làm việc tại các công ty product lớn.",
    timeline: [
      { status: "Gửi giới thiệu", date: "28/03/2026 09:00", completed: true, note: "Bạn đã gửi CV thành công." },
      { status: "Lọc CV", date: "29/03/2026 14:30", completed: true, note: "TA đã duyệt CV và đánh giá phù hợp (+10đ)." },
      { status: "Phỏng vấn vòng 1", date: "01/04/2026 10:00", completed: true, note: "Pass phỏng vấn kỹ thuật vòng 1 (+20đ)." },
      { status: "Phỏng vấn vòng 2", date: "05/04/2026 15:00", completed: false, note: "Lịch phỏng vấn Culture Fit với Hiring Manager." },
      { status: "Gửi Offer", date: "", completed: false, note: "" },
      { status: "Nhận việc (Onboard)", date: "", completed: false, note: "Thưởng thêm +50đ khi ứng viên nhận việc." }
    ]
  },
  "REF-002": {
    id: "REF-002",
    name: "Michael Chen",
    position: "Product Manager",
    date: "2026-03-15",
    status: "Đã gửi Offer",
    pointsEarned: 200,
    statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    email: "michael.chen@example.com",
    phone: "+84 912 345 678",
    linkedin: "linkedin.com/in/michaelchen",
    resume: "mchen_pm_resume.pdf",
    notes: "Michael rất mạnh về data-driven product management.",
    timeline: [
      { status: "Gửi giới thiệu", date: "15/03/2026 10:00", completed: true, note: "Bạn đã gửi CV thành công." },
      { status: "Lọc CV", date: "16/03/2026 11:00", completed: true, note: "TA đã duyệt CV (+10đ)." },
      { status: "Phỏng vấn vòng 1 & 2", date: "20/03/2026", completed: true, note: "Pass các vòng phỏng vấn (+40đ)." },
      { status: "Gửi Offer", date: "01/04/2026 09:00", completed: true, note: "Đã gửi Offer letter cho ứng viên." },
      { status: "Nhận việc (Onboard)", date: "Dự kiến 15/04", completed: false, note: "Chờ ứng viên confirm." }
    ]
  },
  // Fallback
  "default": {
    id: "REF-XXX",
    name: "Tên ứng viên",
    position: "Vị trí ứng tuyển",
    date: "2026-04-01",
    status: "Chờ xử lý",
    pointsEarned: 0,
    statusColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    email: "email@example.com",
    phone: "Chưa cập nhật",
    linkedin: "Chưa cập nhật",
    resume: "cv_ung_vien.pdf",
    notes: "Không có ghi chú.",
    timeline: [
      { status: "Gửi giới thiệu", date: "01/04/2026", completed: true, note: "Bạn đã gửi CV thành công." },
      { status: "Lọc CV", date: "", completed: false, note: "Đang chờ TA xử lý." }
    ]
  }
};

export function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const candidate = candidateDetails[id || ""] || { ...candidateDetails["default"], id: id, name: `Ứng viên ${id}` };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <Button variant="ghost" render={<Link to="/my-referrals" />} className="-ml-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại danh sách
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{candidate.name}</h1>
            <Badge variant="secondary" className={candidate.statusColor + " text-sm px-2.5 py-0.5"}>
              {candidate.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">{candidate.position}</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-500">Điểm tích lũy:</span>
          <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
            {candidate.pointsEarned} <Star className="h-5 w-5 fill-current" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground break-all">{candidate.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Số điện thoại</p>
                  <p className="text-sm text-muted-foreground">{candidate.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Linkedin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">LinkedIn</p>
                  <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                    {candidate.linkedin}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">CV / Resume</p>
                  <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                    {candidate.resume}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ghi chú của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground italic">
                  "{candidate.notes}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Timeline */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Tiến trình tuyển dụng</CardTitle>
              <CardDescription>Theo dõi trạng thái xử lý CV từ hệ thống iHiring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted ml-3 mt-2 space-y-8 pb-4">
                {candidate.timeline.map((step: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-background ${
                      step.completed ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {step.completed && <CheckCircle2 className="h-3 w-3 text-primary-foreground absolute -top-[1px] -left-[1px]" />}
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.status}
                        </h4>
                        {step.note && (
                          <p className="text-sm text-muted-foreground mt-1">{step.note}</p>
                        )}
                      </div>
                      {step.date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <Clock className="h-3 w-3" />
                          {step.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
