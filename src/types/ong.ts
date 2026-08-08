export type OffreType =
  | "Bénévolat"
  | "Salariat"
  | "Freelance / consultance"
  | "Mandat de gouvernance";

export interface Offer {
  title: string;
  lieu: string;
  duree: string;
  type: OffreType;
}

export interface OngFacts {
  fondeeEn: number;
  benevoles: number;
  offresOuvertes: number;
  causes: string[];
}

export interface OngTransparenceDoc {
  label: string;
  verifie: boolean;
}

export interface OngProfile {
  id: string;
  nom: string;
  logoInitiales: string; // ex. "LO"
  verifiee: boolean;
  localisation: string; // ex. "Oran, Algérie"
  statutJuridique: string; // ex. "Association"
  numeroRna: string; // ex. "12345"
  tags: string[]; // ex. ["Éducation", "Solidarité", "Jeunesse"]
  aPropos: string;

  fondeeEn: number;
  nombreBenevoles: number;
  causes: string[];

  documentsTransparence: OngTransparenceDoc[];

  offres: Offer[];
}


