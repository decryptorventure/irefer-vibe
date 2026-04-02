export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  isHot: boolean;
  isActive: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  /** Points awarded when referred candidate onboards */
  rewardPoints: number;
  publishDate: string;
  deadline?: string;
  /** Reference ID in iHiring ATS */
  iHiringJobId: string;
  referralCount: number;
}

export interface JobListParams {
  search?: string;
  department?: string;
  location?: string;
  isHot?: boolean;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
