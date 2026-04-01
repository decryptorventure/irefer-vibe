import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Refer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to iHiring
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
      toast.success("Giới thiệu thành công!", {
        description: "CV của ứng viên đã được gửi đến iHiring để xem xét.",
      });
      setFile(null);
      formRef.current?.reset();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Giới thiệu ứng viên</h1>
        <p className="text-muted-foreground mt-1">Gửi CV của ứng viên cho vị trí đang mở và nhận điểm thưởng.</p>
      </div>

      <Card>
        <form ref={formRef} onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Thông tin ứng viên</CardTitle>
            <CardDescription>
              Vui lòng cung cấp thông tin chính xác để giúp đội ngũ tuyển dụng xử lý nhanh hơn.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Info Group */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Thông tin cá nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Tên <span className="text-destructive">*</span></Label>
                  <Input id="firstName" required placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Họ <span className="text-destructive">*</span></Label>
                  <Input id="lastName" required placeholder="Doe" />
                </div>
              </div>
            </div>

            {/* Contact Info Group */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Thông tin liên hệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Địa chỉ Email <span className="text-destructive">*</span></Label>
                  <Input id="email" type="email" required placeholder="jane.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {/* Professional Info Group */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">Thông tin chuyên môn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="linkedin">Link hồ sơ LinkedIn</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/janedoe" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="position">Vị trí ứng tuyển <span className="text-destructive">*</span></Label>
                  <Select required>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Chọn vị trí từ iHiring" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Senior Frontend Engineer</SelectItem>
                      <SelectItem value="backend">Backend Developer (Go/Node)</SelectItem>
                      <SelectItem value="pm">Product Manager</SelectItem>
                      <SelectItem value="design">UI/UX Designer</SelectItem>
                      <SelectItem value="marketing">Growth Marketing Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>CV / Sơ yếu lý lịch <span className="text-destructive">*</span></Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      id="resume" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                    />
                    <label htmlFor="resume" className="cursor-pointer flex flex-col items-center w-full h-full">
                      {file ? (
                        <>
                          <FileText className="h-10 w-10 text-primary mb-2" />
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={(e) => { e.preventDefault(); setFile(null); }}>
                            Xóa
                          </Button>
                        </>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Nhấn để tải lên hoặc kéo thả vào đây</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX tối đa 10MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Tại sao họ phù hợp với vị trí này? (Không bắt buộc)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Chia sẻ suy nghĩ của bạn về lý do ứng viên này sẽ là một sự bổ sung tuyệt vời cho đội ngũ..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button type="button" variant="ghost">Hủy</Button>
            <Button type="submit">Gửi giới thiệu</Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận gửi giới thiệu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn gửi thông tin ứng viên này không? Vui lòng kiểm tra kỹ các thông tin trước khi gửi để đảm bảo tính chính xác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Xác nhận gửi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
