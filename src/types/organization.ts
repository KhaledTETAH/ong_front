export type OrganizationType = 'association' | 'foundation' | 'ngo' | 'waqf';
export type VerificationStatus = 'in_progress' | 'verified' | 'certified_plus';

export interface Country {
  code: string;
  name_fr: string;
}

export interface Cause {
  id: string;
  name: string;
  slug: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  country: Country;
  city: string;
  description: string;
  verification_status: VerificationStatus;
  open_offers_count: number;
  causes: Cause[];
}

export interface OrganizationDetail extends Organization {
  registry_number: string;
  size: string;
  mission: string;
  website: string;
  offers: import('./mission').OfferSummary[];
  // Optional presentation fields returned by the detail endpoint.
  logo_url?: string;
  banner_url?: string;
  founded_year?: number | null;
  number_of_volunteers?: number | null;
  documents: OrganizationDocument[];
}

export interface OrganizationDocument {
  id: string;
  label: string;
  document_type: string;
  file_url: string;
  verified: boolean;
}
