import { useQuery } from '@tanstack/react-query';
import { getCondidateOffers } from '@/services/offersServices';
import { useAuthStore } from '@/context/authStore';

export function useCondidateOffers () {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['candidate-offers', accessToken],
    queryFn: () => getCondidateOffers(accessToken as string),
    enabled: Boolean(accessToken),
  });
}