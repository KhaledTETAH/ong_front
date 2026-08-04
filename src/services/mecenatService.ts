import type { MecenatSubmission, SponsorshipMission } from '@/types/mecenat';
import { apiData } from './apiClient';

export function submitMecenat(data: MecenatSubmission): Promise<SponsorshipMission> {
  return apiData<SponsorshipMission>('sponsorship-missions/', { method: 'POST', body: data });
}

export function getSponsorshipMission(trackingUuid: string, token: string): Promise<SponsorshipMission> {
  return apiData<SponsorshipMission>(`sponsorship-missions/${trackingUuid}/`, { query: { token } });
}

export function verifySponsorshipMission(trackingUuid: string, token: string): Promise<SponsorshipMission> {
  return apiData<SponsorshipMission>(`sponsorship-missions/${trackingUuid}/verify/`, { method: 'POST', body: { token } });
}