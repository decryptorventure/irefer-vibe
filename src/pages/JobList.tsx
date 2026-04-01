import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Copy, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const jobs = [
  { 
    id: "JOB-001", 
    title: "Senior Backend Developer (Go/NodeJS)", 
    department: "Engineering", 
    location: "Hà Nội", 
    type: "Full-time", 
    isHot: true, 
    description: "Tìm kiếm kỹ sư Backend có 3+ năm kinh nghiệm với Go hoặc NodeJS. Có kinh nghiệm làm việc với kiến trúc microservices, hệ thống high-traffic và tối ưu hóa database.", 
    reward: "+50đ" 
  },
  { 
    id: "JOB-002", 
    title: "Product Manager", 
    department: "Product", 
    location: "Hồ Chí Minh", 
    type: "Full-time", 
    isHot: false, 
    description: "Quản lý vòng đời sản phẩm từ khâu lên ý tưởng đến khi ra mắt. Làm việc chặt chẽ với đội ngũ Engineering và Design để đảm bảo tiến độ và chất lượng sản phẩm.", 
    reward: "+20đ" 
  },
  { 
    id: "JOB-003", 
    title: "Marketing Executive", 
    department: "Marketing", 
    location: "Hà Nội", 
    type: "Full-time", 
    isHot: false, 
    description: "Lên kế hoạch và triển khai các chiến dịch digital marketing đa kênh. Yêu cầu ít nhất 1 năm kinh nghiệm trong lĩnh vực marketing công nghệ.", 
    reward: "+20đ" 
  },
  { 
    id: "JOB-004", 
    title: "Senior UI/UX Designer", 
    department: "Design", 
    location: "Hà Nội", 
    type: "Full-time", 
    isHot: true, 
    description: "Thiết kế giao diện người dùng và tối ưu hóa trải nghiệm. Yêu cầu thành thạo Figma, có tư duy product-mindset và khả năng làm việc độc lập.", 
    reward: "+50đ" 
  },
  { 
    id: "JOB-005", 
    title: "Data Analyst", 
    department: "Data", 
    location: "Hồ Chí Minh", 
    type: "Full-time", 
    isHot: false, 
    description: "Phân tích dữ liệu người dùng, xây dựng dashboard báo cáo và đưa ra các insight giúp cải thiện sản phẩm. Yêu cầu kỹ năng SQL và Python/R.", 
    reward: "+20đ" 
  }
];

export function JobList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyJD = (job: typeof jobs[0]) => {
    const jdText = `🔥 Cơ hội nghề nghiệp tại iKame: ${job.title}\n📍 Địa điểm: ${job.location}\n💼 Phòng ban: ${job.department}\n\n📝 Mô tả công việc:\n${job.description}\n\n👉 Nếu bạn quan tâm, hãy gửi CV cho mình để được giới thiệu nhé!`;
    
    navigator.clipboard.writeText(jdText).then(() => {
      setCopiedId(job.id);
      toast.success("Đã copy JD!", {
        description: "Bạn có thể dán nội dung này để gửi cho ứng viên."
      });
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách Job</h1>
          <p className="text-muted-foreground mt-1">Các vị trí đang tuyển dụng. Hãy copy JD và gửi cho ứng viên tiềm năng!</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm theo tên job hoặc phòng ban..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <Badge variant="outline" className="bg-muted/50">{job.department}</Badge>
                  {job.isHot && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Flame className="h-3 w-3" /> HOT
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl mt-2 line-clamp-2">
                  <Link to={`/jobs/${job.id}`} className="hover:text-primary hover:underline transition-colors">
                    {job.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {job.type}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>
                <div className="mt-4 inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-900/30 dark:text-orange-400">
                  Thưởng thêm: {job.reward}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t flex flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 px-2" 
                  onClick={() => handleCopyJD(job)}
                >
                  {copiedId === job.id ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                      <span className="truncate">Đã Copy</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 shrink-0" />
                      <span className="truncate">Copy JD</span>
                    </>
                  )}
                </Button>
                <Button render={<Link to={`/jobs/${job.id}`} />} nativeButton={false} className="flex-1 gap-2 px-2">
                  <span className="truncate">Chi tiết</span> <ArrowRight className="h-4 w-4 shrink-0" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Không tìm thấy công việc nào phù hợp với tìm kiếm của bạn.
          </div>
        )}
      </div>
    </div>
  );
}
