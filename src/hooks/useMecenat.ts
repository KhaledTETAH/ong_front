import { useMutation } from '@tanstack/react-query';
import { submitMecenat } from '@/services/mecenatService';

export function useSubmitMecenat() {
  return useMutation({ mutationFn: submitMecenat });
}