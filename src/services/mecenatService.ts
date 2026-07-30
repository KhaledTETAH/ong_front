import type { MecenatSubmission, SponsorshipMission } from '@/types/mecenat';
import { apiData } from './apiClient';

export function submitMecenat(data: MecenatSubmission): Promise<SponsorshipMission> {
  return apiData<SponsorshipMission>('sponsorship-missions/', { method: 'POST', body: data });
}