import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Upload, FileText, Link as LinkIcon, Sparkles, CheckCircle2, Loader2, ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Refer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedJob = searchParams.get("job");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [referralMethod, setReferralMethod] = useState("upload");
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: preselectedJob || "",
    link: "",
    notes: ""
  });

  const formRef = useRef<HTMLFormElement>(null);

  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const positions = [
    "Senior Backend Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Data Scientist",
    "Growth Marketing Lead",
    "Frontend Developer",
    "DevOps Engineer",
    "QA Tester"
  ];

  // Handle File Upload & Simulate AI Parsing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateAIParsing(selectedFile.name);
    }
  };

  const simulateAIParsing = (filename: string) => {
    setIsParsing(true);
    // Simulate a 1.5s delay for "AI parsing"
    setTimeout(() => {
      setIsParsing(false);
      // Auto-fill some dummy data based on the filename to make it feel "smart"
      const nameMatch = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setFormData(prev => ({
        ...prev,
        fullName: nameMatch || "Nguyễn Văn A",
        email: "ungvien.tiemnang@email.com",
        phone: "0987654321"
      }));
      toast.success("Đã trích xuất thông tin từ CV!", {
        description: "Vui lòng kiểm tra lại các thông tin bên dưới."
      });
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralMethod === "upload" && !file) {
      toast.error("Vui lòng tải lên CV của ứng viên");
      return;
    }
    if (referralMethod === "link" && !formData.link) {
      toast.error("Vui lòng nhập link hồ sơ/portfolio");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to iHiring
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
      toast.success("Giới thiệu thành công!", {
        description: "Hồ sơ của ứng viên đã được gửi đến iHiring để xem xét.",
      });
      setFile(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        link: "",
        notes: ""
      });
      navigate("/my-referrals");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Giới thiệu ứng viên</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Gửi hồ sơ ứng viên cho vị trí đang mở và nhận điểm thưởng.</p>
        </div>
      </div>

      {/* Referral Banner */}
      <div className="w-full rounded-xl overflow-hidden relative bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/office/1200/400')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative p-6 sm:p-8 md:p-10 flex flex-col items-start justify-center min-h-[160px] sm:min-h-[200px]">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-3 backdrop-blur-sm">Chương trình giới thiệu</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 max-w-lg leading-tight">Giới thiệu nhân tài, nhận thưởng liền tay!</h2>
          <p className="text-orange-50 max-w-md text-sm sm:text-base">Mời bạn bè gia nhập công ty và nhận ngay phần thưởng hấp dẫn khi ứng viên nhận việc thành công.</p>
        </div>
      </div>

      <Card className="border-t-4 border-t-orange-500 shadow-md">
        <form ref={formRef} onSubmit={handleSubmit}>
          <CardHeader className="pb-4">
            <CardTitle>Thông tin hồ sơ</CardTitle>
            <CardDescription>
              Chọn phương thức cung cấp hồ sơ ứng viên. Tải CV lên để hệ thống tự động điền thông tin!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Method Selection */}
            <Tabs value={referralMethod} onValueChange={setReferralMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-auto min-h-10">
                <TabsTrigger value="upload" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-normal text-center h-auto py-2">
                  <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> 
                  <span>Tải CV lên</span>
                </TabsTrigger>
                <TabsTrigger value="link" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-normal text-center h-auto py-2">
                  <LinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /> 
                  <span>Nhập Link <span className="hidden sm:inline">(LinkedIn/Portfolio)</span></span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 ${file ? 'bg-orange-50/50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/50' : 'hover:bg-muted/50 border-muted-foreground/25'}`}>
                  <input 
                    type="file" 
                    id="resume" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="resume" className="cursor-pointer flex flex-col items-center w-full h-full">
                    {isParsing ? (
                      <div className="flex flex-col items-center text-orange-500 py-4">
                        <Loader2 className="h-12 w-12 animate-spin mb-3" />
                        <p className="text-sm font-medium">Hệ thống đang đọc CV...</p>
                        <p className="text-xs text-orange-500/70 mt-1">Tự động điền thông tin trong giây lát</p>
                      </div>
                    ) : file ? (
                      <div className="flex flex-col items-center py-2">
                        <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full mb-3">
                          <FileText className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        <p className="text-base font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <div className="flex gap-2 mt-4">
                          <Button type="button" variant="outline" size="sm" onClick={(e) => { e.preventDefault(); document.getElementById('resume')?.click(); }}>
                            Thay đổi file
                          </Button>
                          <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => { e.preventDefault(); setFile(null); }}>
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        <div className="bg-muted p-4 rounded-full mb-4">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-base font-medium">Nhấn để tải lên hoặc kéo thả CV vào đây</p>
                        <p className="text-sm text-muted-foreground mt-1">Hỗ trợ PDF, DOC, DOCX (Tối đa 10MB)</p>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-3 py-1.5 rounded-full">
                          <Sparkles className="h-3.5 w-3.5" />
                          Hỗ trợ tự động điền thông tin từ CV
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </TabsContent>
              
              <TabsContent value="link" className="mt-0">
                <div className="space-y-3">
                  <Label htmlFor="link">Đường dẫn hồ sơ <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="link" 
                      type="url" 
                      className="pl-9"
                      placeholder="https://linkedin.com/in/username hoặc link Portfolio/Drive..." 
                      value={formData.link}
                      onChange={(e) => handleInputChange("link", e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sử dụng khi bạn không có file CV trực tiếp của ứng viên.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-2 border-b pb-2">
                <h3 className="text-lg font-medium">Thông tin chi tiết</h3>
                {file && !isParsing && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Đã tự động điền
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2 flex flex-col">
                  <Label htmlFor="position">Vị trí ứng tuyển <span className="text-destructive">*</span></Label>
                  <Popover open={isPositionOpen} onOpenChange={setIsPositionOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isPositionOpen}
                        className="w-full justify-between h-11 font-normal"
                      >
                        {formData.position
                          ? formData.position
                          : "Chọn vị trí đang mở tuyển..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Tìm kiếm vị trí..." />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy vị trí nào.</CommandEmpty>
                          <CommandGroup>
                            {positions.map((position) => (
                              <CommandItem
                                key={position}
                                value={position}
                                onSelect={(currentValue) => {
                                  handleInputChange("position", position);
                                  setIsPositionOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.position === position ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {position}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và Tên <span className="text-destructive">*</span></Label>
                  <Input 
                    id="fullName" 
                    required 
                    placeholder="Nguyễn Văn A" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={file && !isParsing && formData.fullName ? "bg-green-50/30 border-green-200 focus-visible:ring-green-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="nguyenvana@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={file && !isParsing && formData.email ? "bg-green-50/30 border-green-200 focus-visible:ring-green-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="0987 654 321" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={file && !isParsing && formData.phone ? "bg-green-50/30 border-green-200 focus-visible:ring-green-500" : ""}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Tại sao ứng viên này phù hợp? (Không bắt buộc)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Chia sẻ ngắn gọn về điểm mạnh, kinh nghiệm nổi bật hoặc lý do bạn tin tưởng giới thiệu ứng viên này..."
                    className="min-h-[100px] resize-y"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4 rounded-b-xl">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Hủy bỏ</Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white min-w-[150px]">
              Gửi giới thiệu
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Xác nhận gửi giới thiệu</DialogTitle>
            <DialogDescription>
              Bạn đang giới thiệu <strong>{formData.fullName || "ứng viên"}</strong> cho vị trí <strong>{formData.position || "chưa chọn"}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg text-sm text-orange-800 dark:text-orange-300 mt-2">
            <p>Sau khi gửi, CV sẽ được chuyển trực tiếp đến hệ thống iHiring của bộ phận Tuyển dụng.</p>
            <p className="mt-2 font-medium">Bạn có thể theo dõi trạng thái ứng viên tại mục "Giới thiệu của tôi".</p>
          </div>
          <DialogFooter className="mt-4 sm:justify-between">
            <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} disabled={isSubmitting}>
              Quay lại chỉnh sửa
            </Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang gửi...</>
              ) : (
                "Xác nhận gửi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
