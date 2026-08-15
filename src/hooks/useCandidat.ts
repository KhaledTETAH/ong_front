import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/context/authStore";
import type { CandidateDashboard, DesiredPosition } from "@/types/candidat";
import {
  getDashboard,
  getDesiredPosition,
  toggleActivelyLooking,
  updateDesiredPosition,
} from "@/services/CandidatService";

function useToken() {
  return useAuthStore((state) => state.accessToken);
}

export function useCandidatDashboard() {
  const token = useToken();
  return useQuery<CandidateDashboard, Error>({
    queryKey: ["candidate", "dashboard"],
    queryFn: () => getDashboard(token),
    enabled: !!token,
  });
}

export function useDesiredPosition() {
  const token = useToken();
  return useQuery<DesiredPosition, Error>({
    queryKey: ["candidate", "desired-position"],
    queryFn: () => getDesiredPosition(token),
    enabled: !!token,
  });
}

export function useUpdateDesiredPosition() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<DesiredPosition, Error, Partial<DesiredPosition>>({
    mutationFn: (data) => updateDesiredPosition(data, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["candidate", "desired-position"], data);
    },
  });
}

export function useToggleActivelyLooking() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<{ actively_looking: boolean }, Error, boolean>({
    mutationFn: (value) => toggleActivelyLooking(value, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate"] });
    },
  });
}