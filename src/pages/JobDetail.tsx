import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@frontend-team/ui-kit";
import { ArrowLeft, MapPin, Briefcase, Copy, CheckCircle2, Flame, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useJob } from "@/hooks/use-jobs";
import { POINTS_MATRIX } from "@/lib/points-utils";

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { data: job, isLoading } = useJob(id!);

  const handleCopyJD = () => {
    if (!job) return;
    const jdText = `🔥 Cơ hội nghề nghiệp tại iKame: ${job.title}\n📍 Địa điểm: ${job.location}\n💼 Phòng ban: ${job.department}\n\n📝 Mô tả công việc:\n${job.description}\n\n👉 Nếu bạn quan tâm, hãy gửi CV cho mình để được giới thiệu nhé!`;
    navigator.clipboard.writeText(jdText).then(() => {
      setCopied(true);
      toast.success("Đã copy JD!", { description: "Bạn có thể dán nội dung này để gửi cho ứng viên." });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRefer = () => {
    navigate(`/refer?job=${id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        <Skeleton className="h-8 w-40" />
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="w-full md:w-[320px]">
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        <Button variant="subtle" asChild className="-ml-4 text-muted-foreground hover:text-foreground">
          <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" />Quay lại danh sách Job</Link>
        </Button>
        <div className="text-center py-20 text-muted-foreground">Không tìm thấy công việc này.</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Button variant="subtle" asChild className="-ml-4 text-muted-foreground hover:text-foreground">
        <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" />Quay lại danh sách Job</Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-muted/50">{job.department}</Badge>
              {job.isHot && (
                <Badge variant="error" className="flex items-center gap-1">
                  <Flame className="h-3 w-3" /> HOT
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{job.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Đăng ngày: {new Date(job.publishDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>

          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-3">Mô tả công việc</h3>
              <p>{job.description}</p>
              {job.responsibilities.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 mt-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Yêu cầu ứng viên</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Quyền lợi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar Action Card */}
        <div className="w-full md:w-[320px] shrink-0 sticky top-24">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Thưởng giới thiệu</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-muted-foreground">Ứng viên Onboard</span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">+{job.rewardPoints ?? POINTS_MATRIX[job.seniorityLevel].onboard}đ</span>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2 text-base h-12" onClick={handleRefer}>
                  <Users className="h-5 w-5" />
                  Giới thiệu ngay
                </Button>
                <Button variant="border" className="w-full gap-2 h-12" onClick={handleCopyJD}>
                  {copied ? (
                    <><CheckCircle2 className="h-5 w-5 text-green-500" />Đã Copy JD</>
                  ) : (
                    <><Copy className="h-5 w-5" />Copy JD nhanh</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
