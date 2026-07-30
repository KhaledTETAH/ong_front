import type { OfferSummary } from '@/types/mission';
import type { Country } from '@/types/organization';
import { apiData } from './apiClient';

export interface HomeData {
  stats: {
    open_offers: number;
    verified_organizations: number;
    candidate_price: string;
  };
  featured_offers: OfferSummary[];
  coverage_countries: Country[];
  sponsor: { sponsor_name: string; label: string; copy: string; target_url: string } | null;
}

export function getHomeData(): Promise<HomeData> {
  return apiData<HomeData>('home/');
}