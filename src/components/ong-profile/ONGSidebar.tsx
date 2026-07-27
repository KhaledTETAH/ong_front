import { FileCheck2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { facts } from "@/data/ong";

export function OngSidebar() {
  return (
    <aside className="grid content-start gap-4">
      <Card className="gap-3 p-4">
        <h2 className="font-bold">En bref</h2>
        <ul className="text-sm">
          {facts.map(([k, v], i) => (
            <li
              key={k}
              className={
                "flex justify-between gap-3 py-2" +
                (i < facts.length - 1 ? " border-b border-border" : "")
              }
            >
              <span className="text-muted-foreground">{k}</span>
              <strong>{v}</strong>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="gap-3 p-4">
        <h2 className="font-bold">Transparence</h2>
        <ul className="grid gap-2 text-sm">
          {[
            "Statuts déposés",
            "Déclaration officielle (RNA)",
            "Dernier rapport d'activité",
          ].map((d) => (
            <li key={d} className="flex items-center gap-2">
              <FileCheck2 className="size-4 text-success" /> {d}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          Documents contrôlés lors de la vérification documentaire.
        </p>
      </Card>

      <Card className="flex-row gap-3 border-primary/30 bg-primary-soft p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary-dark" />
        <div>
          <h4 className="font-bold text-primary-dark">Organisation vérifiée</h4>
          <p className="mt-1 text-sm text-primary-dark/80">
            Cette organisation a passé la vérification documentaire de la
            plateforme.
          </p>
        </div>
      </Card>
    </aside>
  );
}
