import { Card } from "@/components/ui/card";

export function OngAbout() {
  return (
    <Card className="mb-6 gap-3 p-6">
      <h2 className="text-lg font-bold">À propos</h2>
      <p>
        L'Association Lumière d'Oran œuvre depuis 2011 pour l'accès à
        l'éducation des enfants de l'ouest algérien. Elle accompagne chaque
        année plus de 600 élèves à travers du soutien scolaire, des
        bibliothèques de quartier et des programmes d'été.
      </p>
      <p className="text-muted-foreground">
        Ses actions reposent sur un réseau de bénévoles formés et sur des
        partenariats avec les établissements scolaires locaux.
      </p>
    </Card>
  );
}
