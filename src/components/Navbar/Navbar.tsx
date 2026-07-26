import { useState } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <a
            href="/"
            className="brand"
            aria-label="Accueil de la Plateforme de l'engagement"
          >
            <span className="brand-mark" aria-hidden="true">
              <i className="bi bi-people-fill"></i>
            </span>
            Plateforme de l'engagement
          </a>

          <nav className="main-navigation" aria-label="Navigation principale">
            <ul>
              <li>
                <a href="/missions">Missions</a>
              </li>
              <li>
                <a href="/annuaire">Annuaire</a>
              </li>
              <li>
                <a href="/mecenat">Mécénat</a>
              </li>
            </ul>
          </nav>

          <div className="header-cta">
            <a href="/connexion" className="btn btn-subtle btn-sm btn-header-desktop">
              Se connecter
            </a>
            <a href="/connexion" className="btn btn-primary btn-sm btn-header-desktop">
              Créer un compte
            </a>
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
                <a href="/missions">Missions</a>
              </li>
              <li>
                <a href="/annuaire">Annuaire</a>
              </li>
              <li>
                <a href="/mecenat">Mécénat</a>
              </li>
              <li>
                <a href="/connexion">Se connecter</a>
              </li>
              <li>
                <a href="/connexion">Créer un compte</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}