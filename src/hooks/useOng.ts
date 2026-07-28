import { useQuery } from "@tanstack/react-query";
import type { OngProfile } from "@/types/ong";
import getOngByID from "@/services/OngService";

export function useOng(id: string) {
  return useQuery<OngProfile, Error>({
    queryKey: ["ong", id],
    queryFn: () => getOngByID(id),
    enabled: !!id,
  });
}
