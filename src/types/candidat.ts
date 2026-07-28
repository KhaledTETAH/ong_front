export type EngagementType =
  | "Bénévolat"
  | "Salariat"
  | "Freelance / consultance"
  | "Mandat de gouvernance"
  | "Mécénat";

export type NiveauPoste =
  | "Junior"
  | "Confirmé"
  | "Expert"
  | "Mandat / gouvernance";

export type Mobilite =
  | "Locale"
  | "Nationale"
  | "Internationale"
  | "Terrain / missions";

export type VolumeHoraire =
  | "Temps plein"
  | "Temps partiel"
  | "Occasionnel"
  | "Soirs et week-ends";

export interface CandidateFiche {
  /** Intitulé du poste recherché */
  titre: string;

  /** Types d'engagement souhaités (multi-select) */
  typesEngagement: EngagementType[];

  /** Niveau de poste recherché */
  niveau: NiveauPoste;

  /** Causes et zones */
  causes: string;
  causesExclues?: string;
  geo: string;
  mobilite: Mobilite;

  /** Disponibilité */
  volume: VolumeHoraire;
  tjm?: number; // TJM minimum (freelance), € / jour
  disponibleAPartirDu: string; // ISO date string, required

  /** Compétences */
  competencesAValoriser: string;
  competencesADevelopper?: string;

  /** Visibilité et alertes */
  rechercheActive: boolean;
  alerteEmail: boolean;
}

/** Étape générique d'un tunnel de candidature */
export type EtapeCandidature =
  | "Reçue"
  | "Pré-qualifiée"
  | "Entretien"
  | "Décision"
  | "Offre";

export type EtapeState = "done" | "current" | "";

export interface TrackerStep {
  label: string; // "Étape 1"
  name: EtapeCandidature;
  state: EtapeState;
}

export type ApplicationBadge =
  | "status-warning"
  | "status-neutral"
  | "status-success";

export interface Application {
  id: string;
  offre: string;
  org: string;
  type: EngagementType;
  badge: ApplicationBadge;
  icon: string; // bootstrap icon class, e.g. "bi-hourglass-split"
  etape: EtapeCandidature;
  lieu?: string;
  dateEnvoi?: string; // ISO date string
  maj: string; // display string, e.g. "Il y a 2 h"
  /** Present only for the currently highlighted/tracked application */
  tracker?: TrackerStep[];
}

export interface CandidateStats {
  candidatures: number;
  candidaturesHint?: string;
  offresSauvegardees: number;
  offresSauvegardeesHint?: string;
  missionsVerifiees: number;
  missionsVerifieesHint?: string;
  messagesNonLus: number;
  messagesNonLusHint?: string;
}

export interface Candidate {
  id: string;
  nom: string;
  prenom: string;
  email: string;

  /** Fiche « poste recherché » — recherche par mot-clé côté ONG */
  fiche: CandidateFiche;

  /** Données du tableau de bord (page Espace candidat) */
  stats: CandidateStats;
  candidatures: Application[];
}
