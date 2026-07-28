import { useQuery } from "@tanstack/react-query";
import type { Candidate } from "@/types/candidat";
import getCandidatById from "@/services/CandidatService";

export function useCandidat(id: string) {
  return useQuery<Candidate, Error>({
    queryKey: ["candidate", id],
    queryFn: () => getCandidatById(id),
    enabled: !!id,
  });
}
