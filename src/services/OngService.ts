import type { OngProfile } from "@/types/ong";
import { ongProfile } from "@/data/ong";

export default async function getOngByID(id: string): Promise<OngProfile> {
  // TODO: switch to the real request once the backend endpoint is ready
  // const { data } = await axios.get<OngProfile>(`${API_BASE_URL}/ongs/${id}`);
  // return data;

  return ongProfile;
}
