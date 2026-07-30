import { useQuery } from '@tanstack/react-query';
import type { OrganizationFilters } from '@/services/organizationsService';
import { getOrganizations } from '@/services/organizationsService';

export function useOrganizations(filters: OrganizationFilters = {}) {
  return useQuery({ queryKey: ['organizations', filters], queryFn: () => getOrganizations(filters) });
}