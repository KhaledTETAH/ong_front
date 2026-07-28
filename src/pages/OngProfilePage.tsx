import { Link } from "react-router-dom";

const offers = [
  {
    title: (
      <>
        Coordinateur <mark className="kw">éducation</mark>
      </>
    ),
    lieu: "Oran",
    duree: "6 mois",
    type: "Bénévolat",
  },
  {
    title: (
      <>
        Animateur <mark className="kw">jeunesse</mark> — été
      </>
    ),
    lieu: "Oran",
    duree: "2 mois",
    type: "Bénévolat",
  },
  {
    title: <>Bibliothécaire bénévole</>,
    lieu: "Oran",
    duree: "Récurrent",
    type: "Bénévolat",
  },
];

export default function OngProfilePage() {
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
              Association Lumière d'Oran
            </li>
          </ol>
        </nav>
      </div>

      <section className="ong-hero" aria-labelledby="ong-name">
        <div className="container">
          <div className="ong-hero-inner">
            <span className="ong-logo-lg" aria-hidden="true">
              LO
            </span>
            <div className="ong-hero-main">
              <h1 id="ong-name">Association Lumière d'Oran</h1>
              <p className="ong-hero-meta">
                <span>
                  <i className="bi bi-patch-check-fill"></i> Organisation
                  vérifiée
                </span>
                <span>
                  <i className="bi bi-geo-alt"></i> Oran, Algérie
                </span>
                <span>
                  <i className="bi bi-building"></i> Association · RNA 12345
                </span>
              </p>
              <div className="ong-tags">
                <span className="tag">Éducation</span>
                <span className="tag">Solidarité</span>
                <span className="tag">Jeunesse</span>
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
                <p className="mb-3">
                  L'Association Lumière d'Oran œuvre depuis 2011 pour l'accès à
                  l'éducation des enfants de l'ouest algérien. Elle accompagne
                  chaque année plus de 600 élèves à travers du soutien scolaire,
                  des bibliothèques de quartier et des programmes d'été.
                </p>
                <p className="mb-0 text-soft">
                  Ses actions reposent sur un réseau de bénévoles formés et sur
                  des partenariats avec les établissements scolaires locaux.
                </p>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
                <h2 className="h5 mb-0">Offres ouvertes (3)</h2>
                <a href="#" className="btn btn-subtle btn-sm">
                  Toutes les missions
                </a>
              </div>
              <div className="row g-3">
                {offers.map((o, i) => (
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
                    <strong>2011</strong>
                  </li>
                  <li>
                    <span>Bénévoles</span>
                    <strong>120</strong>
                  </li>
                  <li>
                    <span>Offres ouvertes</span>
                    <strong>3</strong>
                  </li>
                  <li>
                    <span>Causes</span>
                    <strong>Éducation, Solidarité</strong>
                  </li>
                </ul>
              </div>

              <div className="card p-3 mb-3">
                <h2 className="h6">Transparence</h2>
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
