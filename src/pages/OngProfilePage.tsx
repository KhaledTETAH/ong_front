import { Link, useParams } from "react-router-dom";
import { useOrganization } from "@/hooks/useOrganizations";
import { VerificationStatus } from "@/types/organization";

export default function OngProfilePage() {
  // const { id } = useParams();

  const {
    data: organization,
    isPending,
    isError,
    error,
  } = useOrganization("67f24b21-3eb6-49c7-b0a4-ea4bdeef3346"); // just for now to test the api

  if (isPending) return <p>Chargement...</p>;
  if (isError)
    return <p>Erreur : {error?.message || "Une erreur est survenue"}</p>;
  if (!organization) return <p>Organisation non trouvée.</p>;

  return (
    <main id="contenu">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="pt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/annuaire">Annuaire</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {organization.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="ong-hero" aria-labelledby="ong-name">
        <div className="container">
          <div className="ong-hero-inner">
            <span className="ong-logo-lg" aria-hidden="true">
              {organization.logo_url ? (
                <img
                  src={organization.logo_url}
                  alt={organization.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                organization.name.substring(0, 2).toUpperCase()
              )}
            </span>
            <div className="ong-hero-main">
              <h1 id="ong-name">{organization.name}</h1>
              <p className="ong-hero-meta">
                {(organization.verification_status ===
                  VerificationStatus.VERIFIED ||
                  organization.verification_status ===
                    VerificationStatus.CERTIFIED_PLUS) && (
                  <span>
                    <i className="bi bi-patch-check-fill"></i> Organisation
                    vérifiée
                  </span>
                )}
                <span>
                  <i className="bi bi-geo-alt"></i> {organization.city},{" "}
                  {organization.country}
                </span>
                <span>
                  <i className="bi bi-building"></i> {organization.type} · RNA{" "}
                  {organization.registry_number}
                </span>
              </p>
              <div className="ong-tags">
                {organization.causes.map((cause) => (
                  <span className="tag" key={cause}>
                    {cause}
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
                <p className="mb-0">{organization.description}</p>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
                <h2 className="h5 mb-0">
                  Offres ouvertes ({organization.offers.length})
                </h2>
                <a href="#" className="btn btn-subtle btn-sm">
                  Toutes les missions
                </a>
              </div>
              <div className="row g-3">
                {organization.offers.map((o) => (
                  <div className="col-md-6" key={o.id}>
                    <article className="card offer-card p-3 h-100 d-flex flex-column">
                      <h3>{o.title}</h3>
                      <div className="offer-meta">
                        <span>
                          <i className="bi bi-geo-alt"></i> {o.city}
                        </span>
                        <span>
                          <i className="bi bi-clock"></i> {o.duration_label}
                        </span>
                        <span>
                          <i className="bi bi-briefcase"></i>{" "}
                          {o.engagement_type}
                        </span>
                      </div>
                      <a
                        href={`/offres/${o.slug}`}
                        className="btn btn-primary btn-sm mt-auto"
                      >
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
                  {organization.founded_year && (
                    <li>
                      <span>Fondée en</span>
                      <strong>{organization.founded_year}</strong>
                    </li>
                  )}
                  {/* Note: "Bénévoles" count isn't in the API yet, so I removed it to avoid confusion */}
                  <li>
                    <span>Offres ouvertes</span>
                    <strong>{organization.offers.length}</strong>
                  </li>
                  <li>
                    <span>Causes</span>
                    <strong>{organization.causes.join(", ")}</strong>
                  </li>
                </ul>
              </div>

              <div className="card p-3 mb-3">
                <h2 className="h6">Transparence</h2>
                {/* Note: documentsTransparence isn't in the API yet. 
                    I've hardcoded the 3 expected items for the UI. 
                    You'll need to add `documents` to the OrganizationSerializer later. */}
                <ul className="ong-docs">
                  <li>
                    <i className="bi bi-file-earmark-check"></i> Statuts déposés
                  </li>
                  <li>
                    <i className="bi bi-file-earmark-check"></i> Déclaration
                    officielle (RNA)
                  </li>
                  <li>
                    <i className="bi bi-file-earmark-check"></i> Dernier rapport
                    d'activité
                  </li>
                </ul>
                <p className="text-soft small mb-0">
                  Documents contrôlés lors de la vérification documentaire.
                </p>
              </div>

              {(organization.verification_status ===
                VerificationStatus.VERIFIED ||
                organization.verification_status ===
                  VerificationStatus.CERTIFIED_PLUS) && (
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
