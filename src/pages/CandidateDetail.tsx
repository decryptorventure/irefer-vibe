import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@frontend-team/ui-kit";
import { ArrowLeft, Mail, Phone, Linkedin, FileText, Clock, CheckCircle2, Star, MessageSquare } from "lucide-react";
import { useReferral } from "@/hooks/use-referrals";
import { REFERRAL_STATUS_COLORS, REFERRAL_STATUS_LABELS } from "@/lib/referral-status-utils";

export function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: referral, isLoading } = useReferral(id!);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        <Skeleton className="h-8 w-40" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!referral) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        <Button variant="subtle" asChild className="-ml-4 text-muted-foreground hover:text-foreground">
          <Link to="/my-referrals"><ArrowLeft className="mr-2 h-4 w-4" />Quay lại danh sách</Link>
        </Button>
        <div className="text-center py-20 text-muted-foreground">Không tìm thấy ứng viên này.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <Button variant="subtle" asChild className="-ml-4 text-muted-foreground hover:text-foreground">
        <Link to="/my-referrals"><ArrowLeft className="mr-2 h-4 w-4" />Quay lại danh sách</Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{referral.candidateName}</h1>
            <Badge variant="default" className={`${REFERRAL_STATUS_COLORS[referral.status]} text-sm px-2.5 py-0.5`}>
              {REFERRAL_STATUS_LABELS[referral.status]}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">{referral.jobTitle}</p>
        </div>
        <div className="flex items-center gap-2 bg_yellow_subtle px-4 py-2 rounded-lg border_yellow border">
          <span className="text-sm font-medium fg_yellow_strong">Điểm tích lũy:</span>
          <span className="text-xl font-bold fg_yellow_accent flex items-center gap-1">
            {referral.totalPointsEarned} <Star className="h-5 w-5 fill-current" />
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
                  <p className="text-sm text-muted-foreground break-all">{referral.candidateEmail}</p>
                </div>
              </div>
              {referral.candidatePhone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Số điện thoại</p>
                    <p className="text-sm text-muted-foreground">{referral.candidatePhone}</p>
                  </div>
                </div>
              )}
              {referral.candidateLinkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">LinkedIn</p>
                    <a
                      href={referral.candidateLinkedin.startsWith('http') ? referral.candidateLinkedin : `https://${referral.candidateLinkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {referral.candidateLinkedin}
                    </a>
                  </div>
                </div>
              )}
              {referral.cvUrl && (
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">CV / Resume</p>
                    <a href={referral.cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      Xem CV
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {referral.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ghi chú của bạn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground italic">"{referral.notes}"</p>
                </div>
              </CardContent>
            </Card>
          )}
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
                {referral.timeline.map((step, index) => (
                  <div key={index} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-background ${
                      step.completed ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {step.completed && <CheckCircle2 className="h-3 w-3 text-primary-foreground absolute -top-[1px] -left-[1px]" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </h4>
                        {step.note && (
                          <p className="text-sm text-muted-foreground mt-1">{step.note}</p>
                        )}
                        {step.pointsAwarded && step.pointsAwarded > 0 && (
                          <p className="text-xs fg_yellow_accent mt-1 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" /> +{step.pointsAwarded}đ
                          </p>
                        )}
                      </div>
                      {step.date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <Clock className="h-3 w-3" />
                          {new Date(step.date).toLocaleDateString('vi-VN')}
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
