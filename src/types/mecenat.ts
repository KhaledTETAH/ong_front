export interface MecenatSubmission {
  company: string;
  contactName: string;
  contactEmail: string;
  missionTitle: string;
  description: string;
  skills: string;
  duration: string;
  format: 'Présentiel' | 'Distanciel' | 'Hybride';
  targetOrg?: string;
}