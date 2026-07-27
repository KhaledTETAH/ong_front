import { Briefcase, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { offers } from "@/data/ong";

export function OngOffers() {
  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">Offres ouvertes ({offers.length})</h2>
        <Button variant="secondary" size="sm">
          Toutes les missions
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((o) => (
          <Card
            key={o.title + o.kw}
            className="gap-3 p-4 transition-shadow hover:shadow-md"
          >
            <h3 className="text-base font-bold">
              {o.title}
              {o.kw && (
                <mark className="rounded bg-accent-soft px-1 text-accent-dark">
                  {o.kw}
                </mark>
              )}
              {o.rest}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> {o.place}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" /> {o.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="size-4" /> Bénévolat
              </span>
            </div>
            <Button size="sm" className="w-fit">
              Voir la mission
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
