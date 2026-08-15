import { useAuthStore } from '@/context/authStore';
import type { ApiEnvelope } from '@/types/api';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1').replace(/\/$/, '');

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | object;
  query?: object;
  token?: string | null;
  _retried?: boolean;
};

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Holds the in-flight refresh so concurrent 401s share a single refresh call.
let refreshPromise: Promise<string | null> | null = null;

/** Refreshes the access token via the backend's httpOnly refresh cookie. */
async function tryRefresh(): Promise<string | null> {
  const { setAccessToken, clearSession } = useAuthStore.getState();

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const payload = (await response.json()) as {
      data?: { access?: string };
    };
    const access = payload.data?.access;

    if (!access) {
      clearSession();
      return null;
    }

    setAccessToken(access);
    return access;
  } catch {
    clearSession();
    return null;
  }
}

/** Sends one request to Django and preserves the server's error details. */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, query, token, headers, _retried, ...requestOptions } = options;
  const accessToken = token ?? useAuthStore.getState().accessToken;
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\//, '')}`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== null && value !== undefined && value !== '') url.searchParams.set(key, String(value));
  }

  const isJsonBody = body !== undefined && !(body instanceof FormData) && !(body instanceof URLSearchParams) && typeof body !== 'string';
  const response = await fetch(url, {
    ...requestOptions,
    // Send cookies (httpOnly refresh token) across origins.
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : body,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const payload: unknown = contentType.includes('application/json') ? await response.json() : null;

  // On an expired token, try a single refresh, then retry the original request.
  if (response.status === 401 && !_retried && !token) {
    if (!refreshPromise) {
      refreshPromise = tryRefresh().finally(() => {
        refreshPromise = null;
      });
    }
    const newAccess = await refreshPromise;
    if (newAccess) {
      return apiRequest<T>(path, { ...options, token: newAccess, _retried: true });
    }
  }

  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null && 'message' in payload
      ? String(payload.message)
      : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

/** Unwraps the common Django success envelope used by every API endpoint. */
export async function apiData<T>(path: string, options?: ApiRequestOptions): Promise<T> {
  const response = await apiRequest<ApiEnvelope<T>>(path, options);
  return response.data;
}