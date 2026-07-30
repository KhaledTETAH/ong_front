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