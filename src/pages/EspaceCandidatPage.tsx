import CandidateSidebar from "@/components/CandidateSidebar/CandidateSidebar";

const stats = [
  { label: "Candidatures", value: "4", hint: "1 en entretien" },
  { label: "Offres sauvegardées", value: "7", hint: "2 nouvelles" },
  { label: "Missions vérifiées", value: "3", hint: "Portfolio" },
  { label: "Messages", value: "2", hint: "Non lus" },
];

const steps = [
  { label: "Étape 1", name: "Reçue", state: "done" },
  { label: "Étape 2", name: "Pré-qualifiée", state: "done" },
  { label: "Étape 3", name: "Entretien", state: "current" },
  { label: "Étape 4", name: "Décision", state: "" },
  { label: "Étape 5", name: "Offre", state: "" },
];

const applications = [
  {
    offre: "Coordinateur éducation",
    org: "Association Lumière d'Oran",
    type: "Bénévolat",
    badge: "status-warning",
    icon: "bi-hourglass-split",
    etape: "Entretien",
    maj: "Il y a 2 h",
  },
  {
    offre: "Formateur numérique",
    org: "Fondation Horizon Solidaire",
    type: "Mécénat",
    badge: "status-neutral",
    icon: "bi-inbox",
    etape: "Pré-qualifiée",
    maj: "Hier",
  },
  {
    offre: "Chargé de projet inclusion",
    org: "Collectif Racines",
    type: "Salariat",
    badge: "status-neutral",
    icon: "bi-inbox",
    etape: "Reçue",
    maj: "Il y a 3 jours",
  },
  {
    offre: "Animateur jeunesse",
    org: "Association Lumière d'Oran",
    type: "Bénévolat",
    badge: "status-success",
    icon: "bi-check-circle",
    etape: "Offre",
    maj: "La semaine dernière",
  },
];

export default function EspaceCandidatPage() {
  return (
    <main id="contenu" className="candidate-main">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Espace candidat</p>
          <h1>Bonjour Yasmine</h1>
          <p>Suivez vos candidatures étape par étape, en temps réel.</p>
        </div>

        <div className="candidate-layout">
          <CandidateSidebar active="candidatures" showCta />

          <div className="candidate-content">
            <div className="row g-3 mb-4">
              {stats.map((s) => (
                <div className="col-6 col-lg-3" key={s.label}>
                  <div className="card stat-card p-3">
                    <p className="stat-label mb-1">{s.label}</p>
                    <p className="stat-value mb-0">{s.value}</p>
                    <p className="stat-hint mb-0">{s.hint}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="card p-3 mb-4" aria-labelledby="suivi-title">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <div>
                  <h2 id="suivi-title" className="h5 mb-1">
                    Coordinateur éducation — Association Lumière d'Oran
                  </h2>
                  <p className="text-soft mb-0">
                    <i className="bi bi-geo-alt"></i> Oran, Algérie ·
                    Candidature envoyée le 12 juin
                  </p>
                </div>
                <span className="status-badge status-warning">
                  <i className="bi bi-hourglass-split"></i> En cours d'entretien
                </span>
              </div>
              <ol className="tracker" aria-label="Étapes de la candidature">
                {steps.map((s) => (
                  <li key={s.name} className={s.state}>
                    <span className="step-label">{s.label}</span>
                    <span className="step-name">{s.name}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-3 d-flex flex-wrap gap-2">
                <a href="#" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-chat-dots"></i> Ouvrir la messagerie
                </a>
                <a href="#" className="btn btn-danger-soft btn-sm">
                  Retirer ma candidature
                </a>
              </div>
            </section>

            <h2 className="h5 mb-2">Toutes mes candidatures</h2>
            <div className="table-responsive">
              <table className="table data-table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Offre</th>
                    <th scope="col">Organisation</th>
                    <th scope="col">Type</th>
                    <th scope="col">Étape</th>
                    <th scope="col">Mise à jour</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => (
                    <tr key={a.offre}>
                      <td>{a.offre}</td>
                      <td>{a.org}</td>
                      <td>{a.type}</td>
                      <td>
                        <span className={`status-badge ${a.badge}`}>
                          <i className={`bi ${a.icon}`}></i> {a.etape}
                        </span>
                      </td>
                      <td className="text-soft">{a.maj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
