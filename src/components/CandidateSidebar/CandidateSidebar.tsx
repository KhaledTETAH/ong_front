import { Link } from "react-router-dom";

interface CandidateSidebarProps {
  active: "candidatures" | "fiche" | "offres" | "portfolio" | "messagerie";
  showCta?: boolean;
}

export default function CandidateSidebar({
  active,
  showCta = false,
}: CandidateSidebarProps) {
  const links = [
    {
      key: "candidatures",
      to: "/",
      icon: "bi-clipboard-check",
      label: "Mes candidatures",
    },
    {
      key: "fiche",
      to: "/candidat-fiche",
      icon: "bi-briefcase",
      label: "Fiche « poste recherché »",
    },
  ] as const;

  const placeholders = [
    { key: "offres", icon: "bi-search", label: "Offres correspondantes" },
    {
      key: "portfolio",
      icon: "bi-collection",
      label: "Portfolio d'engagement",
    },
    { key: "messagerie", icon: "bi-chat-dots", label: "Messagerie" },
  ] as const;

  return (
    <aside
      className="candidate-sidebar"
      aria-label="Navigation de l'espace candidat"
    >
      <div className="card profile-card p-3">
        <div className="profile-top">
          <span className="avatar" aria-hidden="true">
            YB
          </span>
          <div>
            <p className="profile-name mb-0">Yasmine Benali</p>
            <span className="trust-badge">
              <i className="bi bi-patch-check"></i> Profil expert
            </span>
          </div>
        </div>
        <div
          className="profile-progress"
          aria-label="Complétude du profil : 80 %"
        >
          <div className="d-flex justify-content-between small">
            <span className="text-soft">Profil complété</span>
            <span className="fw-semibold">80 %</span>
          </div>
          <div
            className="progress mt-1"
            role="progressbar"
            aria-valuenow={80}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-bar" style={{ width: "80%" }}></div>
          </div>
        </div>
        {showCta && (
          <Link
            to="/candidat-fiche"
            className="btn btn-primary btn-sm w-100 mt-3"
          >
            <i className="bi bi-briefcase"></i> Compléter ma fiche
          </Link>
        )}
      </div>

      <nav
        className="side-nav card p-2"
        aria-label="Sections de l'espace candidat"
      >
        {links.map((l) => (
          <Link
            key={l.key}
            to={l.to}
            className={`side-link${active === l.key ? " is-active" : ""}`}
          >
            <i className={`bi ${l.icon}`}></i> {l.label}
          </Link>
        ))}
        {placeholders.map((l) => (
          <a
            key={l.key}
            href="#"
            className={`side-link${active === l.key ? " is-active" : ""}`}
          >
            <i className={`bi ${l.icon}`}></i> {l.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
