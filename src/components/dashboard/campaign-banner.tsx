import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, Flame, ArrowRight, Gift, CheckCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MascotImage } from "@/components/ui/mascot-image";

export function CampaignBanner() {
  return (
    <>
      {/* Gradient banner — intentional brand gradient, kept as inline style */}
      <div className="flex-1 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FFC700] p-6 flex flex-col justify-center shadow-md border border-[#FF6B00]/50 group">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white/30 -rotate-12" />
        <MascotImage variant="encourage" size="3xl" hideOnMobile onDarkBg className="absolute -bottom-4 right-2 opacity-80 drop-shadow-md z-0" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-semibold mb-3 border border-white/30 shadow-sm">
            <Flame className="h-3.5 w-3.5 fill-yellow-200 text-yellow-200" />
            <span>iKame Referral</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight drop-shadow-sm">
            Giới thiệu bạn tài <br/> Nhận ngàn ưu đãi!
          </h3>
          <p className="text-orange-50 text-sm mb-4 max-w-[90%] drop-shadow-sm">
            Cùng xây dựng đội ngũ iKame vững mạnh và nhận những phần thưởng cực kỳ hấp dẫn.
          </p>
          <Button asChild variant="secondary" className="font-bold shadow-sm w-fit">
            <Link to="/refer">Giới thiệu ngay <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <Card className="flex-1 bg_orange_subtle border_orange">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 fg_orange_strong">
            <Gift className="h-5 w-5" /> Chiến Dịch Tháng 4
          </CardTitle>
          <CardDescription className="text-sm mt-1 fg_orange_accent">Nhân đôi điểm thưởng!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg_canvas_primary p-3 rounded-lg border_orange border">
            <p className="text-sm font-medium text_primary">
              Giới thiệu thành công vị trí <span className="font-bold fg_orange_accent">Senior Developer</span> trong tháng 4 để nhận <span className="font-bold fg_error">x2 Điểm thưởng</span> và <span className="font-bold fg_error">Voucher 1.000.000đ</span>.
            </p>
            <Dialog>
              <DialogTrigger className="text-sm fg_orange_accent mt-1 hover:underline font-medium text-left">
                Xem chi tiết chương trình &rarr;
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2 fg_orange_accent">
                    <Gift className="h-6 w-6" /> Chiến Dịch Tháng 4
                  </DialogTitle>
                  <DialogDescription>
                    Nhân đôi điểm thưởng cho vị trí Senior Developer
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg_orange_subtle p-4 rounded-lg border_orange border">
                    <h4 className="font-bold fg_orange_strong mb-2">🎁 Phần thưởng đặc biệt:</h4>
                    <ul className="space-y-2 text-sm fg_orange_accent">
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> <strong>x2 Điểm thưởng</strong> cho mỗi lượt giới thiệu thành công.</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> <strong>Voucher 1.000.000đ</strong> khi ứng viên pass thử việc.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-sm">Điều kiện áp dụng:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Chỉ áp dụng cho vị trí <strong>Senior Developer</strong>.</li>
                      <li>Thời gian gửi CV: từ <strong>01/04/2026</strong> đến hết <strong>30/04/2026</strong>.</li>
                      <li>Ứng viên phải hoàn thành ít nhất vòng phỏng vấn đầu tiên trong tháng 4.</li>
                      <li>Không giới hạn số lượng ứng viên giới thiệu.</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
