import type { Candidate } from "@/types/candidat";

export const candidate: Candidate = {
  id: "candidate-001",
  nom: "Benali",
  prenom: "Amine",
  email: "amine.benali@example.com",

  fiche: {
    titre: "Chef de projet éducation",

    typesEngagement: ["Bénévolat", "Salariat"],

    niveau: "Confirmé",

    causes: "Éducation, Solidarité",
    causesExclues: "",
    geo: "Oran, Alger, à distance",
    mobilite: "Nationale",

    volume: "Temps partiel",
    tjm: undefined,
    disponibleAPartirDu: "2026-09-01",

    competencesAValoriser: "Gestion de projet, pédagogie, coordination",
    competencesADevelopper: "Levée de fonds, suivi-évaluation",

    rechercheActive: true,
    alerteEmail: true,
  },

  stats: {
    candidatures: 4,
    candidaturesHint: "1 en entretien",
    offresSauvegardees: 7,
    offresSauvegardeesHint: "2 nouvelles",
    missionsVerifiees: 3,
    missionsVerifieesHint: "Portfolio",
    messagesNonLus: 2,
    messagesNonLusHint: "Non lus",
  },

  candidatures: [
    {
      id: "app-001",
      offre: "Coordinateur éducation",
      org: "Association Lumière d'Oran",
      type: "Bénévolat",
      badge: "status-warning",
      icon: "bi-hourglass-split",
      etape: "Entretien",
      lieu: "Oran, Algérie",
      dateEnvoi: "2026-06-12",
      maj: "Il y a 2 h",
      tracker: [
        { label: "Étape 1", name: "Reçue", state: "done" },
        { label: "Étape 2", name: "Pré-qualifiée", state: "done" },
        { label: "Étape 3", name: "Entretien", state: "current" },
        { label: "Étape 4", name: "Décision", state: "" },
        { label: "Étape 5", name: "Offre", state: "" },
      ],
    },
    {
      id: "app-002",
      offre: "Formateur numérique",
      org: "Fondation Horizon Solidaire",
      type: "Mécénat",
      badge: "status-neutral",
      icon: "bi-inbox",
      etape: "Pré-qualifiée",
      maj: "Hier",
    },
    {
      id: "app-003",
      offre: "Chargé de projet inclusion",
      org: "Collectif Racines",
      type: "Salariat",
      badge: "status-neutral",
      icon: "bi-inbox",
      etape: "Reçue",
      maj: "Il y a 3 jours",
    },
    {
      id: "app-004",
      offre: "Animateur jeunesse",
      org: "Association Lumière d'Oran",
      type: "Bénévolat",
      badge: "status-success",
      icon: "bi-check-circle",
      etape: "Offre",
      maj: "La semaine dernière",
    },
  ],
};
