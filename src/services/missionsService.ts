import type { Mission } from '@/types/mission';

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Coordinateur éducation — programme scolaire',
    orgName: "Association Lumière d'Oran",
    orgInitials: 'LO',
    orgVerified: true,
    location: 'Oran, Algérie',
    engagementType: 'Bénévolat',
    duration: '6 mois',
    modality: 'Présentiel',
    causes: ['Éducation', 'Solidarité'],
    publishedAt: '2024-06-12T10:00:00Z',
    description: 'Piloter le programme de soutien scolaire...'
  },
  {
    id: '2',
    title: 'Formateur numérique',
    orgName: 'Fondation Horizon Solidaire',
    orgInitials: 'HS',
    orgVerified: true,
    location: 'Paris, France',
    engagementType: 'Mécénat de compétences',
    duration: '10 jours-homme',
    modality: 'Présentiel',
    causes: ['Éducation', 'Numérique'],
    publishedAt: '2024-06-10T14:30:00Z',
    description: 'Accompagner la transformation numérique des bénéficiaires...'
  },
  {
    id: '3',
    title: 'Administrateur bénévole — comité éducation',
    orgName: 'Waqf El Baraka',
    orgInitials: 'EB',
    orgVerified: true,
    location: 'Tunis, Tunisie',
    engagementType: 'Mandat de gouvernance',
    duration: '2 ans',
    modality: 'Hybride',
    causes: ['Éducation', 'Santé'],
    publishedAt: '2024-06-05T09:15:00Z',
    description: 'Participer au conseil d\'administration du Waqf...'
  },
  {
    id: '4',
    title: 'Chargé de projet (CDD)',
    orgName: 'ONG Racines & Avenir',
    orgInitials: 'RA',
    orgVerified: true,
    location: 'Casablanca, Maroc',
    engagementType: 'Salariat',
    duration: '12 mois',
    modality: 'Présentiel',
    causes: ['Éducation', 'Solidarité'],
    publishedAt: '2024-06-08T11:45:00Z',
    description: 'Développer les projets éducatifs de l\'ONG...'
  },
  {
    id: '5',
    title: 'Médecin pédiatre bénévole',
    orgName: 'Santé Pour Tous',
    orgInitials: 'ST',
    orgVerified: false,
    location: 'Dakar, Sénégal',
    engagementType: 'Bénévolat',
    duration: '1 mois',
    modality: 'Présentiel',
    causes: ['Santé', 'Humanitaire'],
    publishedAt: '2024-06-14T08:00:00Z',
    description: 'Appui aux cliniques locales en pédiatrie...'
  },
  {
    id: '6',
    title: 'Consultant en stratégie environnementale',
    orgName: 'Planète Verte',
    orgInitials: 'PV',
    orgVerified: true,
    location: 'Bruxelles, Belgique',
    engagementType: 'Freelance / consultance',
    duration: '3 mois',
    modality: 'Distanciel',
    causes: ['Environnement'],
    publishedAt: '2024-06-02T16:20:00Z',
    description: 'Audit et stratégie bas-carbone...'
  },
  {
    id: '7',
    title: 'Coach sportif pour jeunes en difficulté',
    orgName: 'Sport & Partage',
    orgInitials: 'SP',
    orgVerified: true,
    location: 'Lyon, Belgique',
    engagementType: 'Bénévolat',
    duration: '3 mois',
    modality: 'Présentiel',
    causes: ['Sport', 'Solidarité'],
    publishedAt: '2024-05-28T10:00:00Z',
    description: 'Organisation de sessions sportives hebdomadaires...'
  },
  {
    id: '8',
    title: 'Expert comptable',
    orgName: 'Fondation Culturelle',
    orgInitials: 'FC',
    orgVerified: true,
    location: 'Genève, Suisse',
    engagementType: 'Mécénat de compétences',
    duration: '5 jours-homme',
    modality: 'Hybride',
    causes: ['Culture'],
    publishedAt: '2024-06-15T09:00:00Z',
    description: 'Revue des comptes annuels et optimisation...'
  },
  {
    id: '9',
    title: 'Logisticien humanitaire',
    orgName: 'Aide Sans Frontières',
    orgInitials: 'AS',
    orgVerified: true,
    location: 'Marseille, France',
    engagementType: 'Salariat',
    duration: 'CDI',
    modality: 'Présentiel',
    causes: ['Humanitaire'],
    publishedAt: '2024-06-01T13:10:00Z',
    description: 'Gestion des approvisionnements...'
  }
];

export async function getMissions(): Promise<Mission[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMissions;
}
