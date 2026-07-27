import {
  BadgeCheck,
  Bell,
  Building2,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function OngHero() {
  return (
    <section className="mt-4 border-y border-border py-10 bg-primary-soft">
      <div className="container-page flex flex-wrap items-center gap-6">
        <span className="grid size-20 shrink-0 place-items-center rounded-xl bg-primary text-3xl font-bold text-primary-foreground">
          LO
        </span>
        <div className="min-w-[320px] flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Association Lumière d'Oran
          </h1>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-primary" /> Organisation
              vérifiée
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" /> Oran, Algérie
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-4 text-primary" /> Association · RNA
              12345
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Éducation", "Solidarité", "Jeunesse"].map((t) => (
              <Badge
                key={t}
                className="bg-accent-soft text-accent-dark hover:bg-accent-soft"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>
            <MessageSquare className="size-4" /> Contacter
          </Button>
          <Button variant="secondary">
            <Bell className="size-4" /> Suivre
          </Button>
        </div>
      </div>
    </section>
  );
}
