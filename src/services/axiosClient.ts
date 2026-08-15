import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/context/authStore";
import type { ApiErrorResponse } from "@/types/api";
import { API_BASE_URL } from "./apiClient";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Refresh & Throw Errors
api.interceptors.response.use(
  (response) => response, // Success: pass through

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 1. Handle 401 Unauthorized (Attempt Token Refresh)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setTokens } = useAuthStore.getState();
        if (!refreshToken) throw new Error("No refresh token");

        // Use raw axios to avoid interceptor loops during refresh
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        const newAccess = refreshResponse.data.access;
        const newRefresh = refreshResponse.data.refresh || refreshToken;

        setTokens(newAccess, newRefresh);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed: clear state and let React Query handle the redirect/logic
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    // 2. Throw Standardized Error for React Query
    if (error.response) {
      // Your Django custom_exception_handler already formatted this perfectly
      return Promise.reject(error.response.data as ApiErrorResponse);
    }

    // 3. Throw Network Error Fallback
    return Promise.reject({
      success: false,
      status_code: 0,
      code: "NETWORK_ERROR",
      message: "Network error or server unreachable.",
      errors: null,
      meta: { error_id: "client-network", timestamp: new Date().toISOString() },
    } as ApiErrorResponse);
  },
);

export default api;
