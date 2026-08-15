// Standard Django success envelope, unwrapped by the fetch-based apiClient (apiData).
export interface ApiEnvelope<T> {
  success: true;
  status_code: number;
  message: string;
  data: T;
}

// Same success shape, kept for the axios-based services (organizationService).
export interface ApiSuccessResponse<T> {
  success: true;
  status_code: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  status: number;
  code: string; // e.g., "NOT_FOUND", "VALIDATION_ERROR", "INTERNAL_SERVER_ERROR"
  message: string;
  errors: Record<string, unknown> | null; // Field-level errors (e.g., { "email": ["This field is required."] })
  meta: {
    error_id: string; // UUID for tracking
    timestamp: string; // ISO 8601 string
  };
}

// union type for all API responses
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Type Guard to easily check if a response is successful
export function isSuccessResponse<T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> {
  return response.success === true;
}
