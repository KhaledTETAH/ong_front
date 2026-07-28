import { Link, useParams } from "react-router-dom";
import { useOng } from "@/hooks/useOng";

export default function OngProfilePage() {
  const { id } = useParams();
  const { data: ong, isLoading, isError, error } = useOng(id!);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur : {error.message}</p>;
  if (!ong) return null;

  return (
    <main id="contenu">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="pt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Annuaire</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {ong.nom}
            </li>
          </ol>
        </nav>
      </div>

      <section className="ong-hero" aria-labelledby="ong-name">
        <div className="container">
          <div className="ong-hero-inner">
            <span className="ong-logo-lg" aria-hidden="true">
              {ong.logoInitiales}
            </span>
            <div className="ong-hero-main">
              <h1 id="ong-name">{ong.nom}</h1>
              <p className="ong-hero-meta">
                {ong.verifiee && (
                  <span>
                    <i className="bi bi-patch-check-fill"></i> Organisation
                    vérifiée
                  </span>
                )}
                <span>
                  <i className="bi bi-geo-alt"></i> {ong.localisation}
                </span>
                <span>
                  <i className="bi bi-building"></i> {ong.statutJuridique} · RNA{" "}
                  {ong.numeroRna}
                </span>
              </p>
              <div className="ong-tags">
                {ong.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="ong-hero-actions">
              <a href="#" className="btn btn-primary">
                <i className="bi bi-chat-dots"></i> Contacter
              </a>
              <a href="#" className="btn btn-subtle">
                <i className="bi bi-bell"></i> Suivre
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card p-4 mb-4">
                <h2 className="h5">À propos</h2>
                <p className="mb-0">{ong.aPropos}</p>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
                <h2 className="h5 mb-0">
                  Offres ouvertes ({ong.offres.length})
                </h2>
                <a href="#" className="btn btn-subtle btn-sm">
                  Toutes les missions
                </a>
              </div>
              <div className="row g-3">
                {ong.offres.map((o, i) => (
                  <div className="col-md-6" key={i}>
                    <article className="card offer-card p-3 h-100 d-flex flex-column">
                      <h3>{o.title}</h3>
                      <div className="offer-meta">
                        <span>
                          <i className="bi bi-geo-alt"></i> {o.lieu}
                        </span>
                        <span>
                          <i className="bi bi-clock"></i> {o.duree}
                        </span>
                        <span>
                          <i className="bi bi-briefcase"></i> {o.type}
                        </span>
                      </div>
                      <a href="#" className="btn btn-primary btn-sm mt-auto">
                        Voir la mission
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card p-3 mb-3">
                <h2 className="h6">En bref</h2>
                <ul className="ong-facts">
                  <li>
                    <span>Fondée en</span>
                    <strong>{ong.fondeeEn}</strong>
                  </li>
                  <li>
                    <span>Bénévoles</span>
                    <strong>{ong.nombreBenevoles}</strong>
                  </li>
                  <li>
                    <span>Offres ouvertes</span>
                    <strong>{ong.offres.length}</strong>
                  </li>
                  <li>
                    <span>Causes</span>
                    <strong>{ong.causes.join(", ")}</strong>
                  </li>
                </ul>
              </div>

              <div className="card p-3 mb-3">
                <h2 className="h6">Transparence</h2>
                <ul className="ong-docs">
                  {ong.documentsTransparence.map((doc, i) => (
                    <li key={i}>
                      <i
                        className={
                          doc.verifie
                            ? "bi bi-file-earmark-check"
                            : "bi bi-file-earmark-x"
                        }
                      ></i>{" "}
                      {doc.label}
                    </li>
                  ))}
                </ul>
                <p className="text-soft small mb-0">
                  Documents contrôlés lors de la vérification documentaire.
                </p>
              </div>

              {ong.verifiee && (
                <div className="notice notice-info">
                  <i className="bi bi-shield-check"></i>
                  <div className="notice-body">
                    <h4>Organisation vérifiée</h4>
                    <p>
                      Cette organisation a passé la vérification documentaire de
                      la plateforme.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
