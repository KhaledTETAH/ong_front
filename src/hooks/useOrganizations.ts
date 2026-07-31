import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organizationService";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationService.getAllOrganizations(),
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => organizationService.getOrganizationById(id),
    enabled: !!id,
  });
}
