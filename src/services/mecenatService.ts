import type { MecenatSubmission } from '@/types/mecenat';

export async function submitMecenat(data: MecenatSubmission): Promise<{ success: boolean }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Mecenat submitted:', data);
  return { success: true };
}
