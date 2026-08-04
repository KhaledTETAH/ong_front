import type { Organization, OrganizationDetail, OrganizationType, VerificationStatus } from '@/types/organization';
import { apiData } from './apiClient';

export interface OrganizationFilters {
  q?: string;
  country?: string;
  city?: string;
  cause?: string;
  verification?: VerificationStatus;
  type?: OrganizationType;
  sort?: 'name' | 'offers';
}

export function getOrganizations(filters: OrganizationFilters = {}): Promise<Organization[]> {
  return apiData<Organization[]>('organizations/', { query: filters });
}

export function getOrganization(slug: string): Promise<OrganizationDetail> {
  return apiData<OrganizationDetail>(`organizations/${slug}/`);
}