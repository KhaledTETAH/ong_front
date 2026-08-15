import CandidateSidebar from "@/components/CandidateSidebar/CandidateSidebar";
import { useCandidatDashboard } from "@/hooks/useCandidat";

const STAGE_META: Record<string, { label: string; badge: string; icon: string }> = {
  submitted: { label: "Reçue", badge: "status-neutral", icon: "bi-inbox" },
  prequalified: {
    label: "Pré-qualifiée",
    badge: "status-neutral",
    icon: "bi-inbox",
  },
  interview: { label: "Entretien", badge: "status-warning", icon: "bi-hourglass-split" },
  decision: { label: "Décision", badge: "status-warning", icon: "bi-hourglass-split" },
  offer: { label: "Offre", badge: "status-success", icon: "bi-check-circle" },
};

type DisplayApplication = {
  id: string;
  offre: string;
  org: string;
  type: string;
  badge: string;
  icon: string;
  etape: string;
  lieu?: string;
  tracker?: import("@/types/candidat").TrackerStep[];
};

export default function EspaceCandidatPage() {
  const { data, isLoading, isError, error } = useCandidatDashboard();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur : {error?.message || "Une erreur est survenue"}</p>;
  if (!data) return null;

  const stats = [
    { label: "Candidatures", value: data.applications_count },
    ...(data.saved_offers_count !== undefined
      ? [{ label: "Offres sauvegardées", value: data.saved_offers_count }]
      : []),
    ...(data.verified_missions_count !== undefined
      ? [{ label: "Missions vérifiées", value: data.verified_missions_count }]
      : []),
    ...(data.unread_messages_count !== undefined
      ? [{ label: "Messages", value: data.unread_messages_count }]
      : []),
  ];

  const candidatures: DisplayApplication[] = data.applications.map((a) => {
    const meta = STAGE_META[a.stage] ?? STAGE_META.submitted;
    return {
      id: a.id,
      offre: a.offer,
      org: a.org,
      type: a.engagement_type,
      badge: meta.badge,
      icon: meta.icon,
      etape: meta.label,
      lieu: a.location ?? undefined,
      tracker: a.tracker,
    };
  });

  const tracked = candidatures.find((c) => c.tracker) ?? candidatures[0];

  return (
    <main id="contenu" className="candidate-main">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Espace candidat</p>
          <h1>Bonjour {data.first_name}</h1>
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
                  </div>
                </div>
              ))}
            </div>

            {tracked && (
              <section className="card p-3 mb-4" aria-labelledby="suivi-title">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                  <div>
                    <h2 id="suivi-title" className="h5 mb-1">
                      {tracked.offre} — {tracked.org}
                    </h2>
                    {tracked.lieu && (
                      <p className="text-soft mb-0">
                        <i className="bi bi-geo-alt"></i> {tracked.lieu}
                      </p>
                    )}
                  </div>
                  <span className={`status-badge ${tracked.badge}`}>
                    <i className={`bi ${tracked.icon}`}></i> {tracked.etape}
                  </span>
                </div>

                {tracked.tracker && (
                  <ol className="tracker" aria-label="Étapes de la candidature">
                    {tracked.tracker.map((s) => (
                      <li key={s.name} className={s.state}>
                        <span className="step-label">{s.label}</span>
                        <span className="step-name">{s.name}</span>
                      </li>
                    ))}
                  </ol>
                )}

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