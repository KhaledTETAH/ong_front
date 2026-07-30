import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link
            to="/"
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
                <Link to="/missions">Missions</Link>
              </li>
              <li>
                <Link to="/annuaire">Annuaire</Link>
              </li>
              <li>
                <Link to="/mecenat">Mécénat</Link>
              </li>
            </ul>
          </nav>

          <div className="header-cta">
            <Link to="/connexion" className="btn btn-subtle btn-sm btn-header-desktop">
              Se connecter
            </Link>
            <Link to="/connexion" className="btn btn-primary btn-sm btn-header-desktop">
              Créer un compte
            </Link>
          </div>

          <details
            className="mobile-nav"
            open={menuOpen}
            onToggle={(e) =>
              setMenuOpen((e.target as HTMLDetailsElement).open)
            }
          >
            <summary aria-label="Ouvrir le menu">
              <i className="bi bi-list"></i> Menu
            </summary>

            <ul>
              <li>
                <Link to="/missions">Missions</Link>
              </li>
              <li>
                <Link to="/annuaire">Annuaire</Link>
              </li>
              <li>
                <Link to="/mecenat">Mécénat</Link>
              </li>
              <li>
                <Link to="/connexion">Se connecter</Link>
              </li>
              <li>
                <Link to="/connexion">Créer un compte</Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}