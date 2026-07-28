import CandidateSidebar from "@/components/CandidateSidebar/CandidateSidebar";
import { useCandidat } from "@/hooks/useCandidat";

export default function EspaceCandidatPage() {
  const { data: candidate, isLoading, isError, error } = useCandidat("1");

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur : {error.message}</p>;
  if (!candidate) return null;

  const { stats, candidatures, prenom } = candidate;
  const tracked = candidatures.find((a) => a.tracker);

  return (
    <main id="contenu" className="candidate-main">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Espace candidat</p>
          <h1>Bonjour {prenom}</h1>
          <p>Suivez vos candidatures étape par étape, en temps réel.</p>
        </div>

        <div className="candidate-layout">
          <CandidateSidebar active="candidatures" showCta />

          <div className="candidate-content">
            <div className="row g-3 mb-4">
              <div className="col-6 col-lg-3">
                <div className="card stat-card p-3">
                  <p className="stat-label mb-1">Candidatures</p>
                  <p className="stat-value mb-0">{stats.candidatures}</p>
                  <p className="stat-hint mb-0">{stats.candidaturesHint}</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card stat-card p-3">
                  <p className="stat-label mb-1">Offres sauvegardées</p>
                  <p className="stat-value mb-0">{stats.offresSauvegardees}</p>
                  <p className="stat-hint mb-0">
                    {stats.offresSauvegardeesHint}
                  </p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card stat-card p-3">
                  <p className="stat-label mb-1">Missions vérifiées</p>
                  <p className="stat-value mb-0">{stats.missionsVerifiees}</p>
                  <p className="stat-hint mb-0">
                    {stats.missionsVerifieesHint}
                  </p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card stat-card p-3">
                  <p className="stat-label mb-1">Messages</p>
                  <p className="stat-value mb-0">{stats.messagesNonLus}</p>
                  <p className="stat-hint mb-0">{stats.messagesNonLusHint}</p>
                </div>
              </div>
            </div>

            {tracked && (
              <section className="card p-3 mb-4" aria-labelledby="suivi-title">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                  <div>
                    <h2 id="suivi-title" className="h5 mb-1">
                      {tracked.offre} — {tracked.org}
                    </h2>
                    <p className="text-soft mb-0">
                      <i className="bi bi-geo-alt"></i> {tracked.lieu}
                      {tracked.dateEnvoi && (
                        <> · Candidature envoyée le {tracked.dateEnvoi}</>
                      )}
                    </p>
                  </div>
                  <span className={`status-badge ${tracked.badge}`}>
                    <i className={`bi ${tracked.icon}`}></i> {tracked.etape}
                  </span>
                </div>
                <ol className="tracker" aria-label="Étapes de la candidature">
                  {tracked.tracker!.map((s) => (
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
            )}

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
                  {candidatures.map((a) => (
                    <tr key={a.id}>
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
