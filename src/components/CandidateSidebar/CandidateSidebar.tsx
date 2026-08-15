import { Link } from "react-router-dom";
import { useCandidatDashboard } from "@/hooks/useCandidat";

interface CandidateSidebarProps {
  active: "candidatures" | "fiche" | "offres" | "portfolio" | "messagerie";
  showCta?: boolean;
}

export default function CandidateSidebar({
  active,
  showCta = false,
}: CandidateSidebarProps) {
  const { data: dashboard } = useCandidatDashboard();

  const links = [
    {
      key: "candidatures",
      to: "/candidat/espace",
      icon: "bi-clipboard-check",
      label: "Mes candidatures",
    },
    {
      key: "fiche",
      to: "/candidat/fiche",
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

  const firstName = dashboard?.first_name ?? "";
  const lastName = dashboard?.last_name ?? "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <aside
      className="candidate-sidebar"
      aria-label="Navigation de l'espace candidat"
    >
      <div className="card profile-card p-3">
        <div className="profile-top">
          <span className="avatar" aria-hidden="true">
            {initials || "·"}
          </span>
          <div>
            <p className="profile-name mb-0">
              {`${firstName} ${lastName}`.trim() || "Candidat"}
            </p>
            {dashboard?.email && (
              <span className="trust-badge">
                <i className="bi bi-envelope"></i> {dashboard.email}
              </span>
            )}
          </div>
        </div>
        {showCta && (
          <Link
            to="/candidat/fiche"
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