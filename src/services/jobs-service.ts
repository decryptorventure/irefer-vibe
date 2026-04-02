import { Job, JobListParams, PaginatedResponse } from '@/types';
import { apiClient } from './api-client';
import { mockJobs } from './mock-data/mock-jobs';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/** Simulate network delay in mock mode */
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getJobs(params?: JobListParams): Promise<PaginatedResponse<Job>> {
  if (USE_MOCK) {
    await delay();
    let data = [...mockJobs];
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter((j) => j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q));
    }
    if (params?.department) data = data.filter((j) => j.department === params.department);
    if (params?.isHot !== undefined) data = data.filter((j) => j.isHot === params.isHot);
    return { data, total: data.length, page: 1, pageSize: 20 };
  }
  // Backend team: implement GET /jobs returning PaginatedResponse<Job>
  const { data } = await apiClient.get<PaginatedResponse<Job>>('/jobs', { params });
  return data;
}

export async function getJob(id: string): Promise<Job> {
  if (USE_MOCK) {
    await delay();
    const job = mockJobs.find((j) => j.id === id);
    if (!job) throw new Error(`Job ${id} not found`);
    return job;
  }
  // Backend team: implement GET /jobs/:id returning Job
  const { data } = await apiClient.get<Job>(`/jobs/${id}`);
  return data;
}

/** Returns unique department names for filter UI */
export async function getJobDepartments(): Promise<string[]> {
  if (USE_MOCK) {
    await delay(100);
    return [...new Set(mockJobs.map((j) => j.department))];
  }
  const { data } = await apiClient.get<string[]>('/jobs/departments');
  return data;
}
