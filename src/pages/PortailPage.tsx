import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { useMissions } from '@/hooks/useMissions';

export function PortailPage() {
  const { data: missions = [], isLoading } = useMissions();

  return (
    <>
      <Navbar />
      
      <main id="contenu">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="eyebrow hero-eyebrow">Secteur associatif · humanitaire · philanthropique</p>
                <h1 id="hero-title">L'engagement qui a du sens, réuni au même endroit</h1>
                <p className="hero-lead">
                  ONG, associations, fondations et Waqfs rencontrent les candidats à l'engagement
                  et le mécénat de compétences. Gratuit, transparent, de la France au Maghreb.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <Link href="/missions" className="btn btn-accent btn-lg">Voir les missions</Link>
                  <Link href="/mecenat" className="btn btn-outline-light btn-lg">Proposer un mécénat</Link>
                </div>
                <p className="hero-meta">
                  <i className="bi bi-geo-alt"></i> France · Belgique · Suisse · Algérie · Maroc · Tunisie
                </p>
              </div>
              <div className="col-lg-5">
                <div className="hero-stats card">
                  <div className="hero-stat">
                    <span className="hero-stat-value">1 240</span>
                    <span className="hero-stat-label">missions ouvertes</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-value">380</span>
                    <span className="hero-stat-label">organisations vérifiées</span>
                  </div>
                  <div className="hero-stat">
                    <span className="hero-stat-value">100 %</span>
                    <span className="hero-stat-label">gratuit pour les candidats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="app-section" aria-labelledby="missions-title">
          <div className="container">
            <div className="section-head d-flex flex-wrap justify-content-between align-items-end gap-2">
              <div>
                <p className="eyebrow">À la une</p>
                <h2 id="missions-title">Missions proposées sur la plateforme</h2>
                <p>Un aperçu des besoins récents. Retrouvez l'ensemble avec la recherche et les filtres.</p>
              </div>
              <Link href="/missions" className="btn btn-primary">Voir toutes les missions</Link>
            </div>

            {isLoading ? (
              <p>Chargement des missions...</p>
            ) : (
              <div className="row g-3">
                {missions.slice(0, 4).map(mission => (
                  <div className="col-md-6 col-lg-3" key={mission.id}>
                    <MissionCard mission={mission} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="app-section section-tinted" aria-labelledby="valeur-title">
          <div className="container">
            <div className="section-head text-center">
              <h2 id="valeur-title">Une plateforme pour trois besoins</h2>
              <p className="mx-auto">Chaque acteur dispose d'un parcours dédié, sans espace superflu.</p>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card value-card p-4 h-100">
                  <span className="value-icon" aria-hidden="true"><i className="bi bi-building-check"></i></span>
                  <h3>Organisations</h3>
                  <p className="text-soft">Publication illimitée et gratuite, ATS embarqué, vivier de talents, réception de propositions de mécénat.</p>
                  <Link href="/connexion" className="btn btn-outline-primary btn-sm">Espace organisation</Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card value-card p-4 h-100">
                  <span className="value-icon" aria-hidden="true"><i className="bi bi-person-badge"></i></span>
                  <h3>Candidats</h3>
                  <p className="text-soft">Fiche « poste recherché », recherche par mot-clé et alertes, candidature simple et suivi en temps réel.</p>
                  <Link href="/connexion" className="btn btn-outline-primary btn-sm">Espace candidat</Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card value-card p-4 h-100">
                  <span className="value-icon" aria-hidden="true"><i className="bi bi-gift"></i></span>
                  <h3>Entreprises mécènes</h3>
                  <p className="text-soft">Un tunnel léger, sans espace dédié : déposez une mission ou des profils et suivez la convention via un référent unique.</p>
                  <Link href="/mecenat" className="btn btn-outline-primary btn-sm">Découvrir le mécénat</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="app-section" aria-labelledby="soutien-title">
          <div className="container">
            <h2 id="soutien-title" className="visually-hidden">Soutenir la plateforme</h2>
            <div className="row g-3">
              <div className="col-lg-8">
                <div className="callout callout-accent h-100 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                  <div>
                    <h3 className="h5 mb-1">Soutenir la plateforme</h3>
                    <p className="text-soft mb-0">Le service reste gratuit pour tous. Les dons libres financent l'infrastructure et la vérification des organisations.</p>
                  </div>
                  <button className="btn btn-accent">Faire un don libre</button>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ad-slot h-100">
                  <span className="ad-tag">Partenariat</span>
                  <p className="mb-0 mt-1">Emplacement réservé aux annonceurs alignés, hors zones critiques.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
