import type { Candidate } from "@/types/candidat";
import { candidate } from "@/data/candidat";

export default async function getCandidatById(id: string): Promise<Candidate> {
  // TODO: switch to the real request once the backend endpoint is ready
  // const { data } = await axios.get<Candidate>(`${API_BASE_URL}/candidates/${id}`);
  // return data;

  return candidate;
}
