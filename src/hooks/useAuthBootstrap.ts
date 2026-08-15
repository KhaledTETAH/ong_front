import { useEffect } from "react";
import { useAuthStore } from "@/context/authStore";
import { refreshAccessToken } from "@/services/authService";

/**
 * On app load, if a user session was persisted but the in-memory access token
 * is gone (page reload), restore the session from the httpOnly refresh cookie
 * by requesting a fresh access token.
 */
export function useAuthBootstrap() {
  useEffect(() => {
    const { user, accessToken, setAccessToken } = useAuthStore.getState();

    // Nothing to restore if there's no persisted user or we already hold a token.
    if (!user || accessToken) return;

    let cancelled = false;
    refreshAccessToken()
      .then((tokens) => {
        if (!cancelled) setAccessToken(tokens.access);
      })
      .catch(() => {
        // Invalid/expired refresh cookie -> clear the stale persisted user.
        if (!cancelled) useAuthStore.getState().clearSession();
      });

    return () => {
      cancelled = true;
    };
  }, []);
}