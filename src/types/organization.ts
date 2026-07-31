// Organization Types
export enum OrganizationType {
  NGO = "ngo",
  ASSOCIATION = "association",
  FOUNDATION = "foundation",
  WAQF = "waqf",
  HUMANITARIAN = "humanitarian",
  CHARITABLE = "charitable",
}

// Trust and Verification Levels
export enum VerificationStatus {
  IN_PROGRESS = "in_progress",
  VERIFIED = "verified",
  CERTIFIED_PLUS = "certified_plus",
}

// Offer Engagement Types
export enum EngagementType {
  EMPLOYMENT = "employment",
  VOLUNTEERING = "volunteering",
  SKILLS_BASED_VOLUNTEERING = "skills_based_volunteering",
  GOVERNANCE = "governance",
  CONSULTING = "consulting",
  FREELANCE = "freelance",
}

// Offer Modalities
export enum RemoteMode {
  ON_SITE = "on_site",
  HYBRID = "hybrid",
  REMOTE = "remote",
}

// lightweight offer model for the "Offres ouvertes" preview cards.
export interface OfferPreview {
  id: string; // UUID
  title: string;
  slug: string;
  city: string;
  country: string; // StringRelatedField returns the country name (e.g., "Algeria")
  duration_label: string;
  engagement_type: EngagementType;
  remote_mode: RemoteMode;
}

// Full Organization model for the public showcase page.
export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  country: string;
  city: string;
  registry_number: string;
  size: string;
  description: string;
  mission: string;
  website: string;
  verification_status: VerificationStatus;
  causes: string[];
  founded_year: number | null;
  logo_url: string;
  banner_url: string;
  offers: OfferPreview[];
}
