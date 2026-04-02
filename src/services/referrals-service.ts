import { Referral, SubmitReferralPayload, ReferralListParams, PaginatedResponse } from '@/types';
import { apiClient } from './api-client';
import { mockReferrals } from './mock-data/mock-referrals';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getMyReferrals(params?: ReferralListParams): Promise<PaginatedResponse<Referral>> {
  if (USE_MOCK) {
    await delay();
    let data = [...mockReferrals];
    if (params?.status) data = data.filter((r) => r.status === params.status);
    return { data, total: data.length, page: 1, pageSize: 20 };
  }
  // Backend team: implement GET /referrals (current user's referrals)
  const { data } = await apiClient.get<PaginatedResponse<Referral>>('/referrals', { params });
  return data;
}

export async function getReferral(id: string): Promise<Referral> {
  if (USE_MOCK) {
    await delay();
    const ref = mockReferrals.find((r) => r.id === id);
    if (!ref) throw new Error(`Referral ${id} not found`);
    return ref;
  }
  // Backend team: implement GET /referrals/:id
  const { data } = await apiClient.get<Referral>(`/referrals/${id}`);
  return data;
}

/**
 * CV Upload — Presigned S3 URL flow (recommended):
 * 1. POST /referrals/upload-cv → backend returns { uploadUrl, cvUrl }
 * 2. PUT uploadUrl with file (direct to S3, no auth header)
 * 3. submitReferral() with the returned cvUrl
 *
 * Backend team: implement POST /referrals/upload-cv → { uploadUrl: string; cvUrl: string }
 */
export async function uploadCv(file: File): Promise<string> {
  if (USE_MOCK) {
    // Simulate upload delay
    await delay(1500);
    return `https://cdn.example.com/cv-uploads/mock-${Date.now()}-${file.name}`;
  }
  const { data } = await apiClient.post<{ uploadUrl: string; cvUrl: string }>('/referrals/upload-cv', {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });
  // Upload file directly to S3 presigned URL (no auth header)
  await fetch(data.uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
  return data.cvUrl;
}

export async function submitReferral(payload: SubmitReferralPayload): Promise<Referral> {
  if (USE_MOCK) {
    await delay(800);
    const newReferral: Referral = {
      id: `REF-${Date.now()}`,
      candidateName: payload.candidateName,
      candidateEmail: payload.candidateEmail,
      candidatePhone: payload.candidatePhone,
      candidateLinkedin: payload.candidateLinkedin,
      jobId: payload.jobId,
      jobTitle: mockReferrals[0].jobTitle, // approximate
      cvUrl: payload.cvUrl,
      notes: payload.notes,
      status: 'submitted',
      totalPointsEarned: 10,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        { status: 'submitted', label: 'Gửi giới thiệu', date: new Date().toLocaleString('vi-VN'), completed: true, note: 'Bạn đã gửi CV thành công.', pointsAwarded: 10 },
        { status: 'screening',   label: 'Lọc CV',              date: '', completed: false, note: 'Đang chờ TA xử lý.' },
        { status: 'interview_1', label: 'Phỏng vấn vòng 1',    date: '', completed: false, note: '' },
        { status: 'interview_2', label: 'Phỏng vấn vòng 2',    date: '', completed: false, note: '' },
        { status: 'offer_sent',  label: 'Gửi Offer',           date: '', completed: false, note: '' },
        { status: 'onboarded',   label: 'Nhận việc (Onboard)', date: '', completed: false, note: '' },
      ],
    };
    mockReferrals.unshift(newReferral);
    return newReferral;
  }
  // Backend team: implement POST /referrals
  const { data } = await apiClient.post<Referral>('/referrals', payload);
  return data;
}
