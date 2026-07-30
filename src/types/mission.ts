import type { Cause, Country, Organization } from './organization';

export type EngagementType = 'employment' | 'volunteering' | 'skills_sponsorship' | 'governance' | 'consulting' | 'freelance';
export type RemoteMode = 'on_site' | 'hybrid' | 'remote';

export interface Language {
  code: string;
  name_fr: string;
}

export interface Skill {
  id: number;
  name: string;
  slug: string;
}

export interface OfferSummary {
  id: string;
  slug: string;
  title: string;
  engagement_type: EngagementType;
  employment_contract: string;
  country: Country;
  city: string;
  region: string;
  remote_mode: RemoteMode;
  duration_label: string;
  duration_days: number | null;
  experience_level: string;
  featured: boolean;
  published_at: string;
  organization: Organization;
  causes: Cause[];
  languages: Language[];
  skills: Skill[];
}

export interface OfferDetail extends OfferSummary {
  description: string;
  responsibilities: string;
  desired_profile: string;
  conditions: string;
  expires_at: string | null;
  views_count: number;
  is_saved: boolean;
  has_applied: boolean;
}

export interface OfferFilters {
  q?: string;
  country?: string;
  city?: string;
  type?: EngagementType;
  cause?: string;
  mode?: RemoteMode;
  experience_level?: string;
  duration?: 'short' | 'medium' | 'long';
  sort?: 'recent' | 'oldest';
}

export const engagementTypeLabels: Record<EngagementType, string> = {
  employment: 'Salariat',
  volunteering: 'Bénévolat',
  skills_sponsorship: 'Mécénat de compétences',
  governance: 'Mandat de gouvernance',
  consulting: 'Consultance',
  freelance: 'Freelance',
};

export const remoteModeLabels: Record<RemoteMode, string> = {
  on_site: 'Présentiel',
  hybrid: 'Hybride',
  remote: 'À distance',
};