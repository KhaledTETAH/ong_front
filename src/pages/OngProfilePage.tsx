import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

import { OngHero } from "@/components/ong-profile/ONGHero";
import { OngAbout } from "@/components/ong-profile/ONGAbout";
import { OngOffers } from "@/components/ong-profile/ONGOffers";
import { OngSidebar } from "@/components/ong-profile/ONGSidebar";

export default function OngProfile() {
  return (
    <div className="flex min-h-screen flex-col">
      <main id="contenu" className="flex-1">
        <div className="container-page pt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/ong">Annuaire</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Association Lumière d'Oran</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <OngHero />

        <section className="container-page grid gap-6 py-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OngAbout />
            <OngOffers />
          </div>
          <OngSidebar />
        </section>
      </main>
    </div>
  );
}
