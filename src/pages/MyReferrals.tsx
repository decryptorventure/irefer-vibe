import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, ChevronLeft, ChevronRight, ArrowRight, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyReferrals } from "@/hooks/use-referrals";
import { ReferralListSkeleton } from "@/components/skeletons/referral-list-skeleton";
import { ReferralPipelineHeader, getPipelineStatuses } from "@/components/referrals/referral-pipeline-header";
import { REFERRAL_STATUS_COLORS, REFERRAL_STATUS_LABELS, STATUS_FILTER_TABS } from "@/lib/referral-status-utils";
import { ReferralStatus } from "@/types";
import { MascotImage } from "@/components/ui/mascot-image";

const KANBAN_STATUSES: ReferralStatus[] = ['submitted', 'interview_1', 'offer_sent', 'onboarded', 'rejected'];

export function MyReferrals() {
  const [activeStatus, setActiveStatus] = useState<ReferralStatus | undefined>(undefined);
  const [activePipelineStage, setActivePipelineStage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const itemsPerPage = 5;

  const { data: referralsPage, isLoading } = useMyReferrals({ status: activeStatus });
  const allReferrals = referralsPage?.data ?? [];

  const filteredReferrals = useMemo(() => {
    let result = allReferrals;
    // Pipeline stage filter
    if (activePipelineStage !== null) {
      const statuses = getPipelineStatuses(activePipelineStage);
      result = result.filter((r) => statuses.includes(r.status));
    }
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) => r.candidateName.toLowerCase().includes(q) || r.jobTitle.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allReferrals, activePipelineStage, searchQuery]);

  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage) || 1;
  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (value: string) => {
    const tab = STATUS_FILTER_TABS.find((t) => (t.value ?? "all") === value);
    setActiveStatus(tab?.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách giới thiệu</h1>
          <p className="text-muted-foreground mt-1">Theo dõi trạng thái của các ứng viên bạn đã giới thiệu.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-md">
          <Button
            variant={viewMode === "table" ? "secondary" : "subtle"}
            size="sm"
            className="px-3"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4 mr-2" />
            Danh sách
          </Button>
          <Button
            variant={viewMode === "kanban" ? "secondary" : "subtle"}
            size="sm"
            className="px-3"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Kanban
          </Button>
        </div>
      </div>

      {/* Pipeline header */}
      <ReferralPipelineHeader
        referrals={allReferrals}
        activeStage={activePipelineStage}
        onStageClick={(stage) => { setActivePipelineStage(stage); setCurrentPage(1); }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giới thiệu</CardTitle>
          <CardDescription>
            Danh sách toàn bộ ứng viên bạn đã giới thiệu và trạng thái hiện tại trên iHiring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {viewMode === "table" && (
              <Tabs
                defaultValue="all"
                value={activeStatus ?? "all"}
                onValueChange={handleTabChange}
                className="w-full md:w-auto overflow-x-auto"
              >
                <TabsList>
                  {STATUS_FILTER_TABS.map((tab) => (
                    <TabsTrigger key={tab.label} value={tab.value ?? "all"}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            <div className={`flex items-center gap-2 w-full ${viewMode === "kanban" ? "md:w-full" : "md:w-auto"}`}>
              <div className="relative flex-1 md:w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm ứng viên..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <ReferralListSkeleton />
          ) : viewMode === "table" ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ứng viên</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Ngày giới thiệu</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Điểm thưởng</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedReferrals.length > 0 ? (
                      paginatedReferrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">
                            <div>{referral.candidateName}</div>
                            <div className="text-xs text-muted-foreground">{referral.id}</div>
                          </TableCell>
                          <TableCell>{referral.jobTitle}</TableCell>
                          <TableCell>{new Date(referral.submittedAt).toLocaleDateString('vi-VN')}</TableCell>
                          <TableCell>
                            <Badge variant="default" className={REFERRAL_STATUS_COLORS[referral.status]}>
                              {REFERRAL_STATUS_LABELS[referral.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center justify-end gap-1 fg_yellow_accent">
                              {referral.totalPointsEarned} <Star className="h-3 w-3 fill-current" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="subtle" size="sm" asChild className="gap-1">
                              <Link to={`/referrals/${referral.id}`}>Chi tiết <ArrowRight className="h-4 w-4" /></Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-48">
                          <div className="flex flex-col items-center justify-center gap-3 py-6">
                            <MascotImage variant="encourage" size="2xl" className="mascot-bounce opacity-90" />
                            <p className="text-muted-foreground font-semibold text-base">Không tìm thấy ứng viên nào.</p>
                            <p className="text-sm text-muted-foreground">Hãy thử thay đổi bộ lọc hoặc giới thiệu thêm ứng viên!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến{" "}
                    {Math.min(currentPage * itemsPerPage, filteredReferrals.length)} trong số{" "}
                    {filteredReferrals.length} ứng viên
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="border"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Trước
                    </Button>
                    <div className="text-sm font-medium">Trang {currentPage} / {totalPages}</div>
                    <Button
                      variant="border"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Sau
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {KANBAN_STATUSES.map((status) => {
                const columnReferrals = filteredReferrals.filter((r) => r.status === status);
                return (
                  <div key={status} className="flex-none w-80 bg-muted/50 rounded-lg p-4 snap-start">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm">{REFERRAL_STATUS_LABELS[status]}</h3>
                      <Badge variant="default" className="bg-background">{columnReferrals.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {columnReferrals.map((referral) => (
                        <Card key={referral.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-sm">{referral.candidateName}</h4>
                                <p className="text-xs text-muted-foreground">{referral.id}</p>
                              </div>
                              <div className="flex items-center gap-1 fg_yellow_accent text-xs font-medium bg_yellow_subtle px-1.5 py-0.5 rounded">
                                {referral.totalPointsEarned} <Star className="h-3 w-3 fill-current" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{referral.jobTitle}</p>
                            <div className="flex items-center justify-between mt-2 pt-3 border-t text-xs text-muted-foreground">
                              <span>{new Date(referral.submittedAt).toLocaleDateString('vi-VN')}</span>
                              <Link to={`/referrals/${referral.id}`} className="text-primary hover:underline flex items-center gap-1">
                                Chi tiết <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {columnReferrals.length === 0 && (
                        <div className="flex flex-col items-center p-6 text-sm text-muted-foreground border-2 border-dashed rounded-lg gap-2">
                          <MascotImage variant="greeting" size="lg" animate={false} />
                          <span>Trống</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
