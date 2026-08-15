import { useQuery } from '@tanstack/react-query';
import type { OrganizationFilters } from '@/services/organizationsService';
import { getOrganization, getOrganizations } from '@/services/organizationsService';

// Directory listing with filters (pages 1-6).
export function useOrganizations(filters: OrganizationFilters = {}) {
  return useQuery({
    queryKey: ['organizations', filters],
    queryFn: () => getOrganizations(filters),
  });
}

// Single organization by slug (public profile from the annuaire).
export function useOrganizationBySlug(slug: string) {
  return useQuery({
    queryKey: ['organization', slug],
    queryFn: () => getOrganization(slug),
    enabled: !!slug,
  });
}
