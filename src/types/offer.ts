export interface Compatibility {
  score: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  compatibility?: Compatibility;

  saved: boolean;
  applied: boolean;
  period?: string;
  hours?: string;
  org?: string;
  location?: string;
  skills?: string[];
  verified?: boolean;
  hasAttestation?: boolean;
}