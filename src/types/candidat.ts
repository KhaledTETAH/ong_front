// --- Desired position (page 9, "Fiche poste recherché") ---

export type EngagementType =
  | "volunteering"
  | "salaried"
  | "freelance"
  | "consulting"
  | "mandate";

export type Availability =
  | "full_time"
  | "part_time"
  | "occasional"
  | "evenings"
  | "weekends";

export type Mobility =
  | "local"
  | "regional"
  | "national"
  | "international"
  | "field";

export type PositionLevel =
  | "junior"
  | "confirmed"
  | "senior"
  | "expert"
  | "mandate";

export interface DesiredPosition {
  id: string;
  position_title: string;
  engagement_types: EngagementType[];
  preferred_causes: string[];
  excluded_causes: string[];
  modalities: string[];
  availability: Availability | "";
  mobility: Mobility | "";
  position_level: PositionLevel | "";
  preferred_geographies: string[];
  skills_to_leverage: string[];
  skills_to_develop: string[];
  min_daily_rate: number | null;
  available_from: string | null;
  available_until: string | null;
  email_alerts: boolean;
}

// --- Candidate dashboard (page 8, "Espace candidat") ---

export type ApplicationStage =
  | "submitted"
  | "prequalified"
  | "interview"
  | "decision"
  | "offer";

export type TrackerState = "done" | "current" | "";

export interface TrackerStep {
  label: string;
  name: string;
  state: TrackerState;
}

export interface Application {
  id: string;
  offer: string;
  org: string;
  engagement_type: string;
  stage: ApplicationStage;
  location: string | null;
  submitted_at: string | null;
  updated_at: string;
  tracker: TrackerStep[];
}

export interface CandidateStats {
  candidatures: number;
  offresSauvegardees: number;
  missionsVerifiees: number;
  messagesNonLus: number;
}

export interface CandidateDashboard {
  first_name: string;
  last_name: string;
  email: string;
  applications_count: number;
  saved_offers_count: number;
  verified_missions_count: number;
  unread_messages_count: number;
  applications: Application[];
}