import { cn } from '@frontend-team/ui-kit';
import { ChevronRight } from 'lucide-react';
import { Referral, ReferralStatus } from '@/types';

interface PipelineStage {
  label: string;
  statuses: ReferralStatus[];
  color: string;
  activeColor: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    label: 'Giới thiệu',
    statuses: ['submitted'],
    color: 'bg_secondary text_secondary',
    activeColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
  },
  {
    label: 'Sàng lọc',
    statuses: ['screening'],
    color: 'bg_secondary text_secondary',
    activeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-300 dark:border-orange-700',
  },
  {
    label: 'Phỏng vấn',
    statuses: ['interview_1', 'interview_2'],
    color: 'bg_secondary text_secondary',
    activeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  },
  {
    label: 'Offer',
    statuses: ['offer_sent'],
    color: 'bg_secondary text_secondary',
    activeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-700',
  },
  {
    label: 'Onboard',
    statuses: ['onboarded'],
    color: 'bg_secondary text_secondary',
    activeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  },
];

interface Props {
  referrals: Referral[];
  activeStage: number | null;
  onStageClick: (stageIndex: number | null) => void;
}

export function ReferralPipelineHeader({ referrals, activeStage, onStageClick }: Props) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {/* "All" pill */}
      <button
        onClick={() => onStageClick(null)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors shrink-0 cursor-pointer',
          activeStage === null
            ? 'bg_accent_primary fg_on_accent border-transparent'
            : 'bg_secondary text_secondary border-border hover:bg_secondary'
        )}
      >
        Tất cả
        <span className="font-bold">{referrals.length}</span>
      </button>

      {PIPELINE_STAGES.map((stage, index) => {
        const count = referrals.filter((r) => stage.statuses.includes(r.status)).length;
        const isActive = activeStage === index;

        return (
          <div key={stage.label} className="flex items-center shrink-0">
            <ChevronRight className="h-4 w-4 text_tertiary mx-0.5" />
            <button
              onClick={() => onStageClick(isActive ? null : index)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer',
                isActive
                  ? `${stage.activeColor} border`
                  : 'bg_secondary text_secondary border-border hover:bg_secondary'
              )}
            >
              {stage.label}
              <span className={cn('font-bold', count > 0 ? '' : 'opacity-50')}>
                {count}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** Get the statuses for a pipeline stage index */
export function getPipelineStatuses(stageIndex: number): ReferralStatus[] {
  return PIPELINE_STAGES[stageIndex]?.statuses ?? [];
}
