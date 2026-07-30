import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUserRole } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // When mounting this page, set a body class equivalent to auth-body
  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setToken('mock-token');
      setUserRole('candidat'); // just default to candidat
      navigate('/');
    }
  };

  return (
    <>
      <a href="#formulaire" className="skip-link">Aller au formulaire</a>

      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill"></i></span>
              Plateforme de l'engagement
            </Link>
            <Link to="/" className="btn btn-subtle btn-sm">
              <i className="bi bi-arrow-left"></i> Retour au portail
            </Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-grid">
          <aside className="auth-aside" aria-label="Présentation de la plateforme">
            <div className="auth-aside-inner">
              <p className="eyebrow auth-eyebrow">L'engagement qui a du sens</p>
              <h1 className="auth-headline">Retrouvez vos candidatures, vos offres et vos missions.</h1>
              <p className="auth-sub">
                Le point de rencontre du secteur associatif, humanitaire et philanthropique —
                de la France au Maghreb. Gratuit pour tous.
              </p>
              <ul className="auth-points">
                <li><i className="bi bi-search" aria-hidden="true"></i> Recherche par mot-clé et alertes</li>
                <li><i className="bi bi-clipboard-check" aria-hidden="true"></i> Suivi de candidature en temps réel</li>
                <li><i className="bi bi-patch-check" aria-hidden="true"></i> Organisations vérifiées avant publication</li>
              </ul>
            </div>
          </aside>

          <section className="auth-panel" aria-labelledby="login-title">
            <div className="auth-card" id="formulaire">
              <div className="section-head">
                <h2 id="login-title">Se connecter</h2>
                <p>Accédez à votre espace candidat ou à votre espace organisation.</p>
              </div>

              <div className="social-stack">
                <button type="button" className="btn btn-social">
                  <i className="bi bi-google" aria-hidden="true"></i> Continuer avec Google
                </button>
                <button type="button" className="btn btn-social">
                  <i className="bi bi-linkedin" aria-hidden="true"></i> Continuer avec LinkedIn
                </button>
                <button type="button" className="btn btn-social">
                  <i className="bi bi-apple" aria-hidden="true"></i> Continuer avec Apple
                </button>
              </div>

              <div className="auth-divider"><span>ou par e-mail</span></div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Adresse e-mail <span className="req" aria-hidden="true">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    autoComplete="email"
                    required 
                    placeholder="prenom.nom@exemple.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <label htmlFor="mdp" className="form-label mb-0">Mot de passe <span className="req" aria-hidden="true">*</span></label>
                    <button type="button" className="btn btn-link p-0 small text-decoration-none">Mot de passe oublié ?</button>
                  </div>
                  <input 
                    type="password" 
                    id="mdp" 
                    name="mdp" 
                    className="form-control mt-1" 
                    autoComplete="current-password"
                    required 
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-check my-3">
                  <input className="form-check-input" type="checkbox" id="souvenir" name="souvenir" />
                  <label className="form-check-label" htmlFor="souvenir">Rester connecté sur cet appareil</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Se connecter</button>
                </div>
              </form>

              <p className="auth-alt">
                Pas encore de compte ?{' '}
                <button type="button" className="btn btn-link p-0">Créer un compte candidat</button>
                {' '}·{' '}
                <button type="button" className="btn btn-link p-0">Inscrire une organisation</button>
              </p>
            </div>

            <p className="auth-legal">
              En vous connectant, vous acceptez les conditions d'utilisation et la politique de confidentialité.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
