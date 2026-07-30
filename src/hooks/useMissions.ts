import { useQuery } from '@tanstack/react-query';
import type { OfferFilters } from '@/types/mission';
import { getMission, getMissions, getSimilarMissions } from '@/services/missionsService';

export function useMissions(filters: OfferFilters = {}) {
  return useQuery({ queryKey: ['offers', filters], queryFn: () => getMissions(filters) });
}

export function useMission(slug: string, token?: string | null) {
  return useQuery({
    queryKey: ['offer', slug, Boolean(token)],
    queryFn: () => getMission(slug, token),
    enabled: Boolean(slug),
  });
}

export function useSimilarMissions(slug: string) {
  return useQuery({
    queryKey: ['offer', slug, 'similar'],
    queryFn: () => getSimilarMissions(slug),
    enabled: Boolean(slug),
  });
}