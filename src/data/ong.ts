import type { OngProfile } from "@/types/ong";

export const ongProfile: OngProfile = {
  id: "ong-lumiere-oran",
  nom: "Association Lumière d'Oran",
  logoInitiales: "LO",
  verifiee: true,
  localisation: "Oran, Algérie",
  statutJuridique: "Association",
  numeroRna: "12345",
  tags: ["Éducation", "Solidarité", "Jeunesse"],
  aPropos:
    "L'Association Lumière d'Oran œuvre depuis 2011 pour l'accès à l'éducation des enfants de l'ouest algérien. Elle accompagne chaque année plus de 600 élèves à travers du soutien scolaire, des bibliothèques de quartier et des programmes d'été. Ses actions reposent sur un réseau de bénévoles formés et sur des partenariats avec les établissements scolaires locaux.",

  fondeeEn: 2011,
  nombreBenevoles: 120,
  causes: ["Éducation", "Solidarité"],

  documentsTransparence: [
    { label: "Statuts déposés", verifie: true },
    { label: "Déclaration officielle (RNA)", verifie: true },
    { label: "Dernier rapport d'activité", verifie: true },
  ],

  offres: [
    {
      title: "Coordinateur éducation",
      lieu: "Oran",
      duree: "6 mois",
      type: "Bénévolat",
    },
    {
      title: "Animateur jeunesse — été",
      lieu: "Oran",
      duree: "2 mois",
      type: "Bénévolat",
    },
    {
      title: "Bibliothécaire bénévole",
      lieu: "Oran",
      duree: "Récurrent",
      type: "Bénévolat",
    },
  ],
};
