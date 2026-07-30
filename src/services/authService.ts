import type { AuthTokens, AuthUser } from '@/types/auth';
import { apiData } from './apiClient';

export function login(email: string, password: string): Promise<AuthTokens> {
  return apiData<AuthTokens>('auth/login/', { method: 'POST', body: { email, password } });
}

export function getCurrentUser(accessToken: string): Promise<AuthUser> {
  return apiData<AuthUser>('auth/me/', { token: accessToken });
}

export function refreshAccessToken(refresh: string): Promise<AuthTokens> {
  return apiData<AuthTokens>('auth/refresh/', { method: 'POST', body: { refresh } });
}

export function logout(refresh: string, accessToken: string): Promise<null> {
  return apiData<null>('auth/logout/', { method: 'POST', body: { refresh }, token: accessToken });
}