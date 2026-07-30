import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { TrustBadge } from '@/components/TrustBadge/TrustBadge';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { useMissions } from '@/hooks/useMissions';
import { formatDate } from '@/utils/formatDate';

export function OffrePage() {
  const params = useParams();
  const { data: missions = [], isLoading } = useMissions();
  
  const mission = missions.find(m => m.id === params.id) || missions[0]; // fallback to first if not found for mock preview

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container py-5 text-center">
          <p>Chargement de l'offre...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!mission) {
    return (
      <>
        <Navbar />
        <main className="container py-5 text-center">
          <h2>Offre introuvable</h2>
          <Link to="/missions" className="btn btn-primary mt-3">Retour aux missions</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main id="contenu">
        <div className="container">
          <nav aria-label="Fil d'Ariane" className="pt-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
              <li className="breadcrumb-item"><Link to="/missions">Missions</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{mission.title}</li>
            </ol>
          </nav>
        </div>

        <section className="offre-hero" aria-labelledby="offre-title">
          <div className="container">
            <p className="eyebrow mb-1">Offre d'engagement</p>
            <h1 id="offre-title">{mission.title}</h1>
            <p className="offre-org mb-2">
              <i className="bi bi-building" aria-hidden="true"></i>{' '}
              <Link to="/annuaire">{mission.orgName}</Link>{' '}
              {mission.orgVerified && <TrustBadge level="verified" />}
            </p>
            <div className="offre-meta">
              <span><i className="bi bi-geo-alt" aria-hidden="true"></i> {mission.location}</span>
              <span><i className="bi bi-briefcase" aria-hidden="true"></i> {mission.engagementType}</span>
              <span><i className="bi bi-clock" aria-hidden="true"></i> {mission.duration}</span>
              <span><i className="bi bi-easel" aria-hidden="true"></i> {mission.modality}</span>
              <span><i className="bi bi-calendar-event" aria-hidden="true"></i> Publiée le {formatDate(mission.publishedAt)}</span>
            </div>
          </div>
        </section>

        <section className="app-section">
          <div className="container">
            <div className="row g-4">

              {/* Description */}
              <div className="col-lg-8">
                <div className="card p-4">
                  <div className="mb-3 d-flex gap-2">
                    {mission.causes.map((cause, idx) => (
                      <span key={idx} className="status-badge status-neutral">{cause}</span>
                    ))}
                  </div>

                  <h2 className="h5">La mission</h2>
                  <p>{mission.description}</p>
                  
                  <p>Au sein de l'organisation, cette mission implique de piloter et d'accompagner le développement des activités liées. Vous serez amené(e) à travailler en étroite collaboration avec les équipes sur le terrain.</p>

                  <h2 className="h5 mt-4">Profil recherché</h2>
                  <p>Expérience en coordination de projet ou en animation. Sens de l'organisation, autonomie et goût du travail en équipe. Une connaissance du secteur associatif est un plus.</p>

                  <h2 className="h5 mt-4">Compétences requises</h2>
                  <ul className="offre-list">
                    <li><i className="bi bi-check2"></i> Coordination d'équipe et gestion de planning</li>
                    <li><i className="bi bi-check2"></i> Communication et relation partenaires</li>
                    <li><i className="bi bi-check2"></i> Capacité d'analyse et de synthèse</li>
                  </ul>

                  <div className="row g-3 mt-2">
                    <div className="col-sm-6">
                      <h3 className="h6 mb-1">Langues</h3>
                      <p className="text-soft mb-0">Français, local</p>
                    </div>
                    <div className="col-sm-6">
                      <h3 className="h6 mb-1">Conditions</h3>
                      <p className="text-soft mb-0">{mission.engagementType} · {mission.modality}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidature + organisation */}
              <div className="col-lg-4">
                <div className="card apply-card p-4 mb-3">
                  <p className="apply-lead mb-1">Cette mission vous intéresse ?</p>
                  <p className="text-soft small mb-3">La candidature se fait en quelques clics depuis votre espace candidat.</p>
                  <div className="d-grid gap-2">
                    <Link to="/connexion" className="btn btn-primary btn-lg">Postuler</Link>
                    <button className="btn btn-subtle"><i className="bi bi-bookmark"></i> Sauvegarder l'offre</button>
                    <button className="btn btn-subtle"><i className="bi bi-share"></i> Partager</button>
                  </div>
                  <p className="text-soft small mt-3 mb-0"><i className="bi bi-shield-check"></i> Vos échanges restent sur la plateforme.</p>
                </div>

                <div className="card p-3">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <span className="ong-logo-sm" aria-hidden="true">{mission.orgInitials}</span>
                    <div>
                      <p className="fw-bold mb-0">{mission.orgName}</p>
                      {mission.orgVerified && <TrustBadge level="verified" />}
                    </div>
                  </div>
                  <p className="text-soft small mb-2">Engagée pour ses causes.</p>
                  <Link to="/annuaire" className="btn btn-outline-primary btn-sm w-100">Voir le profil de l'organisation</Link>
                </div>
              </div>

            </div>

            {/* Offres similaires */}
            <h2 className="h5 mt-5 mb-3">Missions similaires</h2>
            <div className="row g-3">
              {missions.filter(m => m.id !== mission.id && m.causes.some(c => mission.causes.includes(c))).slice(0, 3).map(sim => (
                <div className="col-md-4" key={sim.id}>
                  <MissionCard mission={sim} />
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
