export type UserRole = 'candidate' | 'ngo_member' | 'volunteering_referent' | 'admin' | 'moderator';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  email_verified: boolean;
}

export interface CandidateRegistration {
  email: string;
  phone?: string;
  password: string;
}

export interface OrganizationRegistration {
  owner_email: string;
  password: string;
  organization_name: string;
  organization_type: 'association' | 'foundation' | 'ngo' | 'waqf';
  country_code: string;
  city: string;
  registry_number: string;
  description: string;
  mission?: string;
}