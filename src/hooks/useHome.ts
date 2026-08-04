import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '@/services/homeService';

export function useHome() {
  return useQuery({ queryKey: ['home'], queryFn: getHomeData });
}