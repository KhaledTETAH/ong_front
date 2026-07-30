export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');

type QueryValue = string | number | boolean | null | undefined;

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown>;
  query?: Record<string, QueryValue>;
  token?: string | null;
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

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, query, token, headers, ...requestOptions } = options;
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\//, '')}`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== null && value !== undefined && value !== '') url.searchParams.set(key, String(value));
  }

  const isJsonBody = body !== undefined && !(body instanceof FormData) && !(body instanceof URLSearchParams) && typeof body !== 'string';
  const response = await fetch(url, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isJsonBody ? JSON.stringify(body) : body,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const payload: unknown = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null && 'detail' in payload
      ? String(payload.detail)
      : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }
  return payload as T;
}