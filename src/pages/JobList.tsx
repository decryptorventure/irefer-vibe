import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Copy, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { Job } from "@/types";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";

export function JobList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: jobsPage, isLoading } = useJobs({ search: searchQuery });
  const jobs = jobsPage?.data ?? [];

  const handleCopyJD = (job: Job) => {
    const jdText = `🔥 Cơ hội nghề nghiệp tại iKame: ${job.title}\n📍 Địa điểm: ${job.location}\n💼 Phòng ban: ${job.department}\n\n📝 Mô tả công việc:\n${job.description}\n\n👉 Nếu bạn quan tâm, hãy gửi CV cho mình để được giới thiệu nhé!`;
    navigator.clipboard.writeText(jdText).then(() => {
      setCopiedId(job.id);
      toast.success("Đã copy JD!", { description: "Bạn có thể dán nội dung này để gửi cho ứng viên." });
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

      {isLoading ? (
        <JobListSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <Badge variant="outline" className="bg-muted/50">{job.department}</Badge>
                    {job.isHot && (
                      <Badge variant="error" className="flex items-center gap-1">
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
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                  <div className="mt-4 inline-flex items-center rounded-md bg-green-50 dark:bg-green-950/40 px-2 py-1 text-xs font-semibold text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 border">
                    Thưởng onboard: +{job.rewardPoints}đ
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t flex flex-row gap-2">
                  <Button variant="border" className="flex-1 gap-2 px-2" onClick={() => handleCopyJD(job)}>
                    {copiedId === job.id ? (
                      <><CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" /><span className="truncate">Đã Copy</span></>
                    ) : (
                      <><Copy className="h-4 w-4 shrink-0" /><span className="truncate">Copy JD</span></>
                    )}
                  </Button>
                  <Button asChild className="flex-1 gap-2 px-2">
                    <Link to={`/jobs/${job.id}`}><span className="truncate">Chi tiết</span> <ArrowRight className="h-4 w-4 shrink-0" /></Link>
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
      )}
    </div>
  );
}
