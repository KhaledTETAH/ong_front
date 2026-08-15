import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/authStore';
import { logout } from '@/services/authService';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearSession = useAuthStore((s) => s.clearSession);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      if (accessToken) await logout();
    } finally {
      clearSession();
      setMenuOpen(false);
      setIsLoggingOut(false);
      navigate('/');
    }
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <i className="bi bi-people-fill" />
            </span>
            Plateforme de l'engagement
          </Link>
          <nav className="main-navigation">
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
            {user ? (
              <details className="user-menu">
                <summary aria-label="Ouvrir le menu du compte">
                  <span className="user-avatar">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-menu-label">Mon compte</span>
                </summary>
                <div className="user-menu-popover">
                  <p className="user-menu-email">{user.email}</p>
                  <p className="user-menu-role">
                    {user.role === 'candidate' ? 'Candidat' : 'Organisation'}
                  </p>
                  {user.role === 'candidate' ? (
                    <Link to="/candidat/espace" className="user-menu-link">
                      Profil
                    </Link>
                  ) : null}
                  <button
                    className="user-menu-logout"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                  >
                    {isLoggingOut ? 'Déconnexion…' : 'Se déconnecter'}
                  </button>
                </div>
              </details>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="btn btn-subtle btn-sm btn-header-desktop"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="btn btn-primary btn-sm btn-header-desktop"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>
          <details
            className="mobile-nav"
            open={menuOpen}
            onToggle={(e) =>
              setMenuOpen((e.target as HTMLDetailsElement).open)
            }
          >
            <summary>Menu</summary>
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
              {user?.role === 'candidate' && (
                <li>
                  <Link to="/candidat/espace">Profil</Link>
                </li>
              )}
              <li>
                {user ? (
                  <button onClick={handleLogout}>Se déconnecter</button>
                ) : (
                  <>
                    <Link to="/connexion">Se connecter</Link>
                    <Link to="/inscription">Créer un compte</Link>
                  </>
                )}
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}