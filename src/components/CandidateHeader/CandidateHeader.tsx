import { Link } from "react-router-dom";
import "./CandidateHeader.css";

const menuLinks = [
  { to: "/", label: "Mes candidatures" },
  { to: "/candidat-fiche", label: "Fiche « poste recherché »" },
] as const;

const menuPlaceholders = [
  "Offres correspondantes",
  "Portfolio d'engagement",
  "Messagerie",
];

export default function CandidateHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <i className="bi bi-people-fill"></i>
            </span>
            Plateforme de l'engagement
          </Link>
          <div className="header-cta">
            <Link
              to="/ong-profile"
              className="btn btn-subtle btn-sm btn-header-desktop"
            >
              Voir le site
            </Link>
            <span className="header-user btn-header-desktop">
              <i className="bi bi-person-circle" aria-hidden="true"></i> Yasmine
              B.
            </span>
            <a href="#" className="btn btn-subtle btn-sm btn-header-desktop">
              Déconnexion
            </a>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Ouvrir le menu">
              <i className="bi bi-list"></i> Menu
            </summary>
            <ul>
              {menuLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
              {menuPlaceholders.map((label) => (
                <li key={label}>
                  <a href="#">{label}</a>
                </li>
              ))}
              <li>
                <Link to="/ong-profil">Voir le site</Link>
              </li>
              <li>
                <a href="#">Déconnexion</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
