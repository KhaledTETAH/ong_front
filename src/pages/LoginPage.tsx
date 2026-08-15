import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, login } from '@/services/authService';
import { useAuthStore } from '@/context/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { document.body.classList.add('auth-body'); return () => document.body.classList.remove('auth-body'); }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const tokens = await login(email, password);
      const user = await getCurrentUser(tokens.access);
      setSession(tokens.access, user);
      navigate(user.role === 'candidate' ? '/candidat/espace' : '/');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Connexion impossible. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <><a href="#formulaire" className="skip-link">Aller au formulaire</a><header className="site-header"><div className="container"><div className="header-inner"><Link to="/" className="brand"><span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill" /></span>Plateforme de l'engagement</Link><Link to="/" className="btn btn-subtle btn-sm"><i className="bi bi-arrow-left" /> Retour au portail</Link></div></div></header>
    <main className="auth-main"><div className="auth-grid"><aside className="auth-aside"><div className="auth-aside-inner"><p className="eyebrow auth-eyebrow">L'engagement qui a du sens</p><h1 className="auth-headline">Retrouvez vos candidatures, vos offres et vos missions.</h1><p className="auth-sub">Le point de rencontre du secteur associatif, humanitaire et philanthropique.</p></div></aside>
      <section className="auth-panel" aria-labelledby="login-title"><div className="auth-card" id="formulaire"><div className="section-head"><h2 id="login-title">Se connecter</h2><p>Accédez à votre espace candidat ou organisation.</p></div>{error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}><div className="mb-3"><label htmlFor="email" className="form-label">Adresse e-mail <span className="req">*</span></label><input type="email" id="email" className="form-control" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="mb-3"><label htmlFor="password" className="form-label">Mot de passe <span className="req">*</span></label><input type="password" id="password" className="form-control" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div><div className="d-grid"><button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>{isSubmitting ? 'Connexion…' : 'Se connecter'}</button></div></form>
      </div></section></div></main></>;
}