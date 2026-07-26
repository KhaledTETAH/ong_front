import { useQuery } from '@tanstack/react-query';
import { getMissions } from '@/services/missionsService';

export function useMissions() {
  return useQuery({ queryKey: ['missions'], queryFn: getMissions });
}