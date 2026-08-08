import type { Offer } from '@/types/offer';

import { apiData } from './apiClient';


export function getCondidateOffers(token: string): Promise<Offer[]> {
  const path = import.meta.env.VITE_CANDIDATE_OFFERS_PATH || 'candidates/me/applications/';

  return apiData<Offer[]>(path, { method: 'GET', token });
}
