import type { CandidateDashboard, DesiredPosition } from "@/types/candidat";
import { apiData } from "./apiClient";

export async function getDashboard(token: string | null): Promise<CandidateDashboard> {
  return apiData<CandidateDashboard>("candidates/me/applications/", { token });
}

export async function getDesiredPosition(
  token: string | null,
): Promise<DesiredPosition> {
  return apiData<DesiredPosition>("candidates/desired-position/", { token });
}

export async function updateDesiredPosition(
  data: Partial<DesiredPosition>,
  token: string | null,
): Promise<DesiredPosition> {
  return apiData<DesiredPosition>("candidates/desired-position/", {
    method: "PUT",
    body: data,
    token,
  });
}

export async function toggleActivelyLooking(
  activelyLiving: boolean,
  token: string | null,
): Promise<{ actively_looking: boolean }> {
  return apiData<{ actively_looking: boolean }>("candidates/actively-looking/", {
    method: "PATCH",
    body: { actively_looking: activelyLiving },
    token,
  });
}