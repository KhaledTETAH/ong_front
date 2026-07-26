import type { Organization } from '@/types/organization';

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: "Association Lumière d'Oran",
    initials: 'LO',
    verified: true,
    country: 'Algérie',
    causes: ['Éducation', 'Solidarité'],
    type: 'Association',
    description: "Soutien scolaire et accès à l'éducation pour les enfants de l'ouest algérien.",
    memberCount: 45,
    activeMissions: 8
  },
  {
    id: '2',
    name: 'Fondation Horizon Solidaire',
    initials: 'HS',
    verified: true,
    country: 'France',
    causes: ['Éducation', 'Numérique'],
    type: 'Fondation',
    description: 'Inclusion numérique et formation des publics éloignés de l\'emploi.',
    memberCount: 120,
    activeMissions: 5
  },
  {
    id: '3',
    name: 'Waqf El Baraka',
    initials: 'EB',
    verified: true,
    country: 'Tunisie',
    causes: ['Éducation', 'Santé'],
    type: 'Waqf',
    description: 'Gestion de biens de mainmorte au service de l\'éducation et de la santé.',
    memberCount: 12,
    activeMissions: 3
  },
  {
    id: '4',
    name: 'ONG Racines & Avenir',
    initials: 'RA',
    verified: true,
    country: 'Maroc',
    causes: ['Solidarité', 'Éducation'],
    type: 'ONG',
    description: 'Développement local et accompagnement des jeunes au Maghreb.',
    memberCount: 250,
    activeMissions: 6
  },
  {
    id: '5',
    name: 'Santé Pour Tous',
    initials: 'ST',
    verified: false,
    country: 'Sénégal',
    causes: ['Santé', 'Humanitaire'],
    type: 'ONG',
    description: 'Cliniques mobiles et prévention santé dans les zones isolées.',
    memberCount: 300,
    activeMissions: 12
  },
  {
    id: '6',
    name: 'Planète Verte',
    initials: 'PV',
    verified: true,
    country: 'Belgique',
    causes: ['Environnement'],
    type: 'Association',
    description: 'Sensibilisation aux enjeux climatiques et protection de la biodiversité.',
    memberCount: 80,
    activeMissions: 2
  },
  {
    id: '7',
    name: 'Sport & Partage',
    initials: 'SP',
    verified: true,
    country: 'France',
    causes: ['Sport', 'Solidarité'],
    type: 'Association',
    description: 'Inclusion par le sport pour les jeunes en difficulté.',
    memberCount: 60,
    activeMissions: 4
  },
  {
    id: '8',
    name: 'Fondation Culturelle',
    initials: 'FC',
    verified: true,
    country: 'Suisse',
    causes: ['Culture'],
    type: 'Fondation',
    description: 'Soutien aux arts et préservation du patrimoine.',
    memberCount: 40,
    activeMissions: 1
  },
  {
    id: '9',
    name: 'Aide Sans Frontières',
    initials: 'AS',
    verified: true,
    country: 'France',
    causes: ['Humanitaire'],
    type: 'ONG',
    description: 'Intervention d\'urgence et logistique humanitaire.',
    memberCount: 500,
    activeMissions: 15
  }
];

export async function getOrganizations(): Promise<Organization[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOrganizations;
}
