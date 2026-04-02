export type ReferralStatus =
  | 'submitted'    // CV vừa gửi
  | 'screening'    // Đang lọc CV
  | 'interview_1'  // Phỏng vấn vòng 1
  | 'interview_2'  // Phỏng vấn vòng 2
  | 'offer_sent'   // Đã gửi offer
  | 'onboarded'    // Đã nhận việc — triggers full point award
  | 'rejected';    // Từ chối

export interface ReferralTimeline {
  status: ReferralStatus;
  label: string;
  date?: string;
  note?: string;
  pointsAwarded?: number;
  completed: boolean;
}

export interface Referral {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLinkedin?: string;
  jobId: string;
  jobTitle: string;
  cvUrl?: string;
  notes?: string;
  status: ReferralStatus;
  totalPointsEarned: number;
  submittedAt: string;
  updatedAt: string;
  timeline: ReferralTimeline[];
  /** Reference to iHiring ATS application */
  iHiringApplicationId?: string;
}

export interface SubmitReferralPayload {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLinkedin?: string;
  jobId: string;
  /** File object for upload flow (presigned S3 URL) */
  cvFile?: File;
  /** Alternative: direct link (LinkedIn, Drive, etc.) */
  cvUrl?: string;
  notes?: string;
}

export interface ReferralListParams {
  status?: ReferralStatus;
  page?: number;
  pageSize?: number;
}
