export interface Organization {
  id: string;
  name: string;
  initials: string;
  verified: boolean;
  country: string;
  causes: string[];
  type: 'ONG' | 'Association' | 'Fondation' | 'Waqf';
  description: string;
  memberCount: number;
  activeMissions: number;
}