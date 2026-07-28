import { Link } from "react-router-dom";
import "./PublicHeader.css";

export default function PublicHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link
            to="/ong-profil"
            className="brand"
            aria-label="Accueil de la Plateforme de l'engagement"
          >
            <span className="brand-mark" aria-hidden="true">
              <i className="bi bi-people-fill"></i>
            </span>
            Plateforme de l'engagement
          </Link>
          <nav className="main-navigation" aria-label="Navigation principale">
            <ul>
              <li>
                <a href="#">Missions</a>
              </li>
              <li>
                <a href="#" className="is-active">
                  Annuaire
                </a>
              </li>
              <li>
                <a href="#">Mécénat</a>
              </li>
            </ul>
          </nav>
          <div className="header-cta">
            <a href="#" className="btn btn-subtle btn-sm btn-header-desktop">
              Se connecter
            </a>
            <a href="#" className="btn btn-primary btn-sm btn-header-desktop">
              Créer un compte
            </a>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Ouvrir le menu">
              <i className="bi bi-list"></i> Menu
            </summary>
            <ul>
              <li>
                <a href="#">Missions</a>
              </li>
              <li>
                <a href="#">Annuaire</a>
              </li>
              <li>
                <a href="#">Mécénat</a>
              </li>
              <li>
                <a href="#">Se connecter</a>
              </li>
              <li>
                <a href="#">Créer un compte</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
