import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import { logout } from "@/services/authService";
import "./CandidateHeader.css";

const menuLinks = [
  { to: "/candidat/espace", label: "Mes candidatures" },
  { to: "/candidat/fiche", label: "Fiche « poste recherché »" },
] as const;

export default function CandidateHeader() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const clearSession = useAuthStore((s) => s.clearSession);

  async function handleLogout() {
    try {
      if (accessToken && refreshToken) await logout(refreshToken, accessToken);
    } finally {
      clearSession();
      navigate("/");
    }
  }

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
              to="/"
              className="btn btn-subtle btn-sm btn-header-desktop"
            >
              Voir le site
            </Link>
            <span className="header-user btn-header-desktop">
              <i className="bi bi-person-circle" aria-hidden="true"></i>{" "}
              {user?.email || "Candidat"}
            </span>
            <button
              className="btn btn-subtle btn-sm btn-header-desktop"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
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
              <li>
                <Link to="/">Voir le site</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}