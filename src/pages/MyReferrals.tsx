import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MoreHorizontal, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const allReferrals = [
  { id: "REF-001", name: "Sarah Jenkins", position: "Senior Frontend Engineer", date: "2026-03-28", status: "Đang phỏng vấn", pointsEarned: 50, statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  { id: "REF-002", name: "Michael Chen", position: "Product Manager", date: "2026-03-15", status: "Đã gửi Offer", pointsEarned: 200, statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  { id: "REF-003", name: "Emily Davis", position: "UX Designer", date: "2026-04-01", status: "Chờ xử lý", pointsEarned: 10, statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  { id: "REF-004", name: "David Wilson", position: "Backend Developer", date: "2026-02-10", status: "Nhận việc", pointsEarned: 500, statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
  { id: "REF-005", name: "Jessica Taylor", position: "Marketing Lead", date: "2026-01-22", status: "Từ chối", pointsEarned: 10, statusColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  { id: "REF-006", name: "Robert Fox", position: "DevOps Engineer", date: "2026-03-20", status: "Đang phỏng vấn", pointsEarned: 50, statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  { id: "REF-007", name: "Cody Fisher", position: "Data Scientist", date: "2026-03-10", status: "Từ chối", pointsEarned: 10, statusColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  { id: "REF-008", name: "Esther Howard", position: "HR Manager", date: "2026-02-28", status: "Nhận việc", pointsEarned: 500, statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
  { id: "REF-009", name: "Jenny Wilson", position: "QA Engineer", date: "2026-04-02", status: "Chờ xử lý", pointsEarned: 10, statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  { id: "REF-010", name: "Kristin Watson", position: "Mobile Developer", date: "2026-03-05", status: "Đã gửi Offer", pointsEarned: 200, statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  { id: "REF-011", name: "Cameron Williamson", position: "Backend Developer", date: "2026-01-15", status: "Nhận việc", pointsEarned: 500, statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
  { id: "REF-012", name: "Courtney Henry", position: "UI Designer", date: "2026-03-25", status: "Đang phỏng vấn", pointsEarned: 50, statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
];

const STATUSES = ["Tất cả", "Chờ xử lý", "Đang phỏng vấn", "Đã gửi Offer", "Nhận việc", "Từ chối"];

export function MyReferrals() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredReferrals = useMemo(() => {
    return allReferrals.filter(ref => {
      const matchesSearch = ref.name.toLowerCase().includes(searchQuery.toLowerCase()) || ref.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "Tất cả" || ref.status === activeTab;
      const matchesStatus = statusFilter === "Tất cả" || ref.status === statusFilter;
      return matchesSearch && matchesTab && matchesStatus;
    });
  }, [activeTab, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage) || 1;
  const paginatedReferrals = filteredReferrals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách giới thiệu</h1>
          <p className="text-muted-foreground mt-1">Theo dõi trạng thái của các ứng viên bạn đã giới thiệu.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giới thiệu</CardTitle>
          <CardDescription>
            Danh sách toàn bộ ứng viên bạn đã giới thiệu và trạng thái hiện tại trên iHiring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs defaultValue="Tất cả" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto overflow-x-auto">
              <TabsList>
                {STATUSES.map(status => (
                  <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm ứng viên..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
                        <div>{referral.name}</div>
                        <div className="text-xs text-muted-foreground">{referral.id}</div>
                      </TableCell>
                      <TableCell>{referral.position}</TableCell>
                      <TableCell>{new Date(referral.date).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={referral.statusColor}>
                          {referral.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <div className="flex items-center justify-end gap-1 text-yellow-600 dark:text-yellow-500">
                          {referral.pointsEarned} <Star className="h-3 w-3 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" render={<Link to={`/referrals/${referral.id}`} />} className="gap-1">
                          Chi tiết <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      Không tìm thấy ứng viên nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 py-4">
              <div className="text-sm text-muted-foreground">
                Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, filteredReferrals.length)} trong số {filteredReferrals.length} ứng viên
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>
                <div className="text-sm font-medium">
                  Trang {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
