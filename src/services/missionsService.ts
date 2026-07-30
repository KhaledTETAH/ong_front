import type { OfferDetail, OfferFilters, OfferSummary } from '@/types/mission';
import { apiData } from './apiClient';

export function getMissions(filters: OfferFilters = {}): Promise<OfferSummary[]> {
  return apiData<OfferSummary[]>('offers/', { query: filters });
}

export function getMission(slug: string, token?: string | null): Promise<OfferDetail> {
  return apiData<OfferDetail>(`offers/${slug}/`, { token });
}

export function getSimilarMissions(slug: string): Promise<OfferSummary[]> {
  return apiData<OfferSummary[]>(`offers/${slug}/similar/`);
}

export function shareMission(slug: string, channel: string): Promise<null> {
  return apiData<null>(`offers/${slug}/share/`, { method: 'POST', body: { channel } });
}

export function saveMission(slug: string, token: string): Promise<null> {
  return apiData<null>(`offers/${slug}/saved/`, { method: 'PUT', token });
}

export function removeSavedMission(slug: string, token: string): Promise<null> {
  return apiData<null>(`offers/${slug}/saved/`, { method: 'DELETE', token });
}

export function applyToMission(slug: string, coverLetter: string, token: string): Promise<{ id: string; status: string; applied_at: string }> {
  return apiData(`offers/${slug}/applications/`, { method: 'POST', body: { cover_letter: coverLetter }, token });
}