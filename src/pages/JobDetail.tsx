import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Briefcase, Copy, CheckCircle2, Flame, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock data extended from JobList
const jobDetails: Record<string, any> = {
  "JOB-001": {
    id: "JOB-001",
    title: "Senior Backend Developer (Go/NodeJS)",
    department: "Engineering",
    location: "Hà Nội",
    type: "Full-time",
    isHot: true,
    reward: "+50đ",
    publishDate: "2026-03-15",
    description: "Tìm kiếm kỹ sư Backend có 3+ năm kinh nghiệm với Go hoặc NodeJS. Có kinh nghiệm làm việc với kiến trúc microservices, hệ thống high-traffic và tối ưu hóa database.",
    responsibilities: [
      "Thiết kế, xây dựng và bảo trì các API hiệu năng cao, có khả năng mở rộng.",
      "Tham gia vào quá trình thiết kế kiến trúc hệ thống (Microservices).",
      "Tối ưu hóa database (PostgreSQL, MongoDB, Redis) cho các hệ thống high-traffic.",
      "Làm việc chặt chẽ với team Frontend và Product để đưa ra giải pháp kỹ thuật tối ưu.",
      "Review code và hướng dẫn các thành viên junior trong team."
    ],
    requirements: [
      "Ít nhất 3 năm kinh nghiệm lập trình Backend với Go hoặc NodeJS.",
      "Hiểu biết sâu sắc về cấu trúc dữ liệu, giải thuật và design patterns.",
      "Kinh nghiệm làm việc với Message Queue (Kafka, RabbitMQ) là một lợi thế.",
      "Quen thuộc với Docker, Kubernetes và môi trường CI/CD.",
      "Kỹ năng giải quyết vấn đề tốt, tư duy logic sắc bén."
    ],
    benefits: [
      "Mức lương cạnh tranh, review lương 2 lần/năm.",
      "Thưởng tháng 13, thưởng hiệu quả công việc (1-3 tháng lương).",
      "Bảo hiểm sức khỏe cao cấp (PVI/Bảo Việt).",
      "Trang bị Macbook Pro và màn hình rời.",
      "Môi trường làm việc trẻ trung, năng động, linh hoạt (Hybrid working)."
    ]
  },
  // Fallback for other jobs
  "default": {
    id: "JOB-XXX",
    title: "Vị trí tuyển dụng",
    department: "Phòng ban",
    location: "Hà Nội / Hồ Chí Minh",
    type: "Full-time",
    isHot: false,
    reward: "+20đ",
    publishDate: "2026-04-01",
    description: "Mô tả công việc đang được cập nhật.",
    responsibilities: ["Đang cập nhật..."],
    requirements: ["Đang cập nhật..."],
    benefits: ["Mức lương cạnh tranh.", "Bảo hiểm sức khỏe.", "Môi trường năng động."]
  }
};

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const job = jobDetails[id || ""] || { ...jobDetails["default"], id: id, title: `Vị trí ${id}` };

  const handleCopyJD = () => {
    const jdText = `🔥 Cơ hội nghề nghiệp tại iKame: ${job.title}\n📍 Địa điểm: ${job.location}\n💼 Phòng ban: ${job.department}\n\n📝 Mô tả công việc:\n${job.description}\n\n👉 Nếu bạn quan tâm, hãy gửi CV cho mình để được giới thiệu nhé!`;
    
    navigator.clipboard.writeText(jdText).then(() => {
      setCopied(true);
      toast.success("Đã copy JD!", {
        description: "Bạn có thể dán nội dung này để gửi cho ứng viên."
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRefer = () => {
    // Navigate to refer page, ideally passing the job ID via state or query param
    navigate('/refer', { state: { jobId: job.id } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Button variant="ghost" render={<Link to="/jobs" />} className="-ml-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại danh sách Job
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-muted/50">{job.department}</Badge>
              {job.isHot && (
                <Badge variant="destructive" className="flex items-center gap-1">
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
              <ul className="list-disc pl-5 space-y-1 mt-3">
                {job.responsibilities.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Yêu cầu ứng viên</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">Quyền lợi</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.benefits.map((item: string, index: number) => (
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
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">{job.reward}</span>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full gap-2 text-base h-12" onClick={handleRefer}>
                  <Users className="h-5 w-5" />
                  Giới thiệu ngay
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full gap-2 h-12" 
                  onClick={handleCopyJD}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Đã Copy JD
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy JD nhanh
                    </>
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
