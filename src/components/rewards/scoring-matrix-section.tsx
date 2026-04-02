import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { POINTS_MATRIX, STAGE_LABELS } from '@/lib/points-utils';

const SENIORITY_COLS = [
  { key: 'junior' as const, label: 'Junior', sub: 'L3-L4', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'middle' as const, label: 'Middle', sub: 'L5-L6', color: 'text-purple-600 dark:text-purple-400' },
  { key: 'senior' as const, label: 'Senior+', sub: 'Manager', color: 'text-orange-600 dark:text-orange-400' },
];

const STAGE_ROWS = [
  { stage: 'screening' as const, label: STAGE_LABELS.screening, detail: 'Khi CV ứng viên pass sơ loại trên hệ thống ATS. Điểm được cộng tự động khi trạng thái chuyển sang "Qualified".' },
  { stage: 'shared' as const, label: STAGE_LABELS.shared, detail: 'Khi bạn share bài tuyển dụng trên mạng xã hội và ứng viên nộp CV qua link của bạn. Nhân đôi điểm vòng duyệt CV! Lưu ý: chỉ áp dụng quy tắc "Người đến trước".' },
  { stage: 'interview' as const, label: STAGE_LABELS.interview, detail: 'Khi ứng viên vượt qua vòng phỏng vấn (bất kỳ vòng nào). Điểm tự động cộng khi ATS chuyển sang "Interview Passed".' },
  { stage: 'onboard' as const, label: STAGE_LABELS.onboard, detail: 'Khi ứng viên chính thức nhận việc (Onboard). Đây là mốc điểm cao nhất — bạn đã giúp công ty có thêm đồng đội!' },
];

export function ScoringMatrixSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/20">
            <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400" />
          </div>
          Cơ chế 1: Tích Lửa
        </CardTitle>
        <p className="text-sm text_secondary mt-1">
          Điểm cộng ngay khi trạng thái ứng viên (ATS) thay đổi
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[400px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2.5 font-semibold text_primary">Giai đoạn</th>
                {SENIORITY_COLS.map((col) => (
                  <th key={col.key} className={`px-3 py-2.5 font-semibold text-center ${col.color}`}>
                    {col.label}
                    <br />
                    <span className="text-[10px] font-normal text_secondary">{col.sub}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAGE_ROWS.map((row) => (
                <tr key={row.stage} className="border-b border-border/50 group">
                  <td className="px-3 py-3">
                    <p className={`font-medium ${row.stage === 'onboard' ? 'font-bold' : ''}`}>
                      {row.label}
                    </p>
                    <p className="text-xs text_secondary mt-1 max-w-xs leading-relaxed hidden group-hover:block">
                      {row.detail}
                    </p>
                  </td>
                  {SENIORITY_COLS.map((col) => (
                    <td key={col.key} className="px-3 py-3 text-center font-semibold">
                      +{POINTS_MATRIX[col.key][row.stage]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text_secondary mt-3 italic">
          * Share bài tuyển dụng công khai = x2 điểm vòng duyệt CV. Quy tắc "Người đến trước" áp dụng khi nhiều người giới thiệu cùng 1 ứng viên.
        </p>
      </CardContent>
    </Card>
  );
}
