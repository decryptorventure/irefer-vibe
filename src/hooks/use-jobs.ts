import { useQuery } from '@tanstack/react-query';
import { getJob, getJobDepartments, getJobs } from '@/services/jobs-service';
import { JobListParams } from '@/types';

export function useJobs(params?: JobListParams) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => getJobs(params),
    staleTime: 60_000,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJob(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useJobDepartments() {
  return useQuery({
    queryKey: ['jobs', 'departments'],
    queryFn: getJobDepartments,
    staleTime: 300_000,
  });
}
