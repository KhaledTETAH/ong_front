export type SponsorshipVisibility = 'open' | 'verified_organizations';

export interface MecenatSubmission {
  contact_email: string;
  company_name: string;
  company_legal_id: string;
  country_code?: string;
  region: string;
  title: string;
  description: string;
  objectives: string;
  deliverables: string;
  required_profiles: string;
  man_days: number;
  visibility: SponsorshipVisibility;
  consent: boolean;
  website: string;
}

export interface SponsorshipMission {
  tracking_uuid: string;
  contact_email: string;
  company_name: string;
  company_legal_id: string;
  country_code: string | null;
  region: string;
  title: string;
  description: string;
  objectives: string;
  deliverables: string;
  required_profiles: string;
  man_days: number;
  visibility: SponsorshipVisibility;
  status: 'pending_email_verification' | 'submitted';
  verified_email_at: string | null;
  created_at: string;
  debug_verification_token?: string;
}