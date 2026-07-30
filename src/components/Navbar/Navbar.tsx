import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/authStore';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const isAuthenticated = Boolean(user);
  const userInitial = user?.email.charAt(0).toUpperCase() ?? '';

  function handleLogout() {
    clearSession();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Accueil de la Plateforme de l'engagement">
            <span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill" /></span>
            Plateforme de l'engagement
          </Link>

          <nav className="main-navigation" aria-label="Navigation principale">
            <ul>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/annuaire">Annuaire</Link></li>
              <li><Link to="/mecenat">Mécénat</Link></li>
            </ul>
          </nav>

          <div className="header-cta">
            {isAuthenticated ? (
              <details className="user-menu">
                <summary aria-label="Ouvrir le menu du compte">
                  <span className="user-avatar" aria-hidden="true">{userInitial}</span>
                  <span className="user-menu-label">Mon compte</span>
                  <i className="bi bi-chevron-down" aria-hidden="true" />
                </summary>
                <div className="user-menu-popover">
                  <p className="user-menu-email">{user?.email}</p>
                  <p className="user-menu-role">{user?.role === 'candidate' ? 'Candidat' : 'Organisation'}</p>
                  <button type="button" className="user-menu-logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" aria-hidden="true" /> Se déconnecter
                  </button>
                </div>
              </details>
            ) : (
              <>
                <Link to="/connexion" className="btn btn-subtle btn-sm btn-header-desktop">Se connecter</Link>
                <Link to="/connexion" className="btn btn-primary btn-sm btn-header-desktop">Créer un compte</Link>
              </>
            )}
          </div>

          <details className="mobile-nav" open={menuOpen} onToggle={(event) => setMenuOpen((event.target as HTMLDetailsElement).open)}>
            <summary aria-label="Ouvrir le menu"><i className="bi bi-list" /> Menu</summary>
            <ul>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/annuaire">Annuaire</Link></li>
              <li><Link to="/mecenat">Mécénat</Link></li>
              {isAuthenticated ? (
                <li><button type="button" className="mobile-nav-logout" onClick={handleLogout}><i className="bi bi-box-arrow-right" aria-hidden="true" /> Se déconnecter</button></li>
              ) : (
                <>
                  <li><Link to="/connexion">Se connecter</Link></li>
                  <li><Link to="/connexion">Créer un compte</Link></li>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}