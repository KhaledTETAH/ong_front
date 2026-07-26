export interface Mission {
  id: string;
  title: string;
  orgName: string;
  orgInitials: string;
  orgVerified: boolean;
  location: string;
  engagementType: 'Bénévolat' | 'Salariat' | 'Freelance / consultance' | 'Mandat de gouvernance' | 'Mécénat de compétences';
  duration: string;
  modality: 'Présentiel' | 'Hybride' | 'Distanciel';
  causes: string[];
  publishedAt: string;
  description: string;
}