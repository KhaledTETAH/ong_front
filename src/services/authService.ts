import type { AuthTokens, AuthUser, CandidateRegistration, OrganizationRegistration } from '@/types/auth';
import { apiData } from './apiClient';

export function login(email: string, password: string): Promise<AuthTokens> {
  return apiData<AuthTokens>('auth/login/', { method: 'POST', body: { email, password } });
}

export function getCurrentUser(accessToken: string): Promise<AuthUser> {
  return apiData<AuthUser>('auth/me/', { token: accessToken });
}

/** Restores a session from the httpOnly refresh cookie and returns the new access token. */
export function refreshAccessToken(): Promise<AuthTokens> {
  return apiData<AuthTokens>('auth/refresh/', { method: 'POST' });
}

/** Logs out using the httpOnly refresh cookie (cleared server-side). */
export function logout(): Promise<null> {
  return apiData<null>('auth/logout/', { method: 'POST' });
}

export function registerCandidate(data: CandidateRegistration): Promise<AuthUser> {
  return apiData<AuthUser>('auth/register/candidate/', { method: 'POST', body: data });
}

export function registerOrganization(data: OrganizationRegistration): Promise<unknown> {
  return apiData<unknown>('auth/register/organization/', { method: 'POST', body: data });
}