export type OrganizationType = 'association' | 'foundation' | 'ngo' | 'waqf';
export type VerificationStatus = 'pending' | 'verified' | 'certified_plus';

export interface Country {
  code: string;
  name_fr: string;
}

export interface Cause {
  id: number;
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
}