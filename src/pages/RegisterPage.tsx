import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { registerCandidate, registerOrganization } from '@/services/authService';
import type { OrganizationRegistration } from '@/types/auth';

type AccountType = 'candidate' | 'organization';

const initialOrganization: OrganizationRegistration = {
  owner_email: '', password: '', organization_name: '', organization_type: 'association', country_code: 'DZ', city: '', registry_number: '', description: '', mission: '',
};

export function RegisterPage({ initialType = 'candidate' }: { initialType?: AccountType }) {
  const [accountType, setAccountType] = useState<AccountType>(initialType);
  const [candidate, setCandidate] = useState({ email: '', phone: '', password: '', confirmPassword: '' });
  const [organization, setOrganization] = useState({ ...initialOrganization, confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { document.body.classList.add('auth-body'); return () => document.body.classList.remove('auth-body'); }, []);

  async function submitCandidate(event: React.FormEvent) {
    event.preventDefault();
    if (candidate.password !== candidate.confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    setError(null); setIsSubmitting(true);
    try {
      await registerCandidate({ email: candidate.email, phone: candidate.phone || undefined, password: candidate.password });
      setSuccess('Votre compte candidat a été créé. Vous pouvez maintenant vous connecter.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Création du compte impossible.');
    } finally { setIsSubmitting(false); }
  }

  async function submitOrganization(event: React.FormEvent) {
    event.preventDefault();
    if (organization.password !== organization.confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    setError(null); setIsSubmitting(true);
    try {
      const data = Object.fromEntries(Object.entries(organization).filter(([key]) => key !== 'confirmPassword')) as unknown as OrganizationRegistration;
      await registerOrganization(data);
      setSuccess('Votre organisation a été inscrite. Vous pouvez maintenant vous connecter.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Inscription de l’organisation impossible.');
    } finally { setIsSubmitting(false); }
  }

  return <><a href="#formulaire" className="skip-link">Aller au formulaire</a><header className="site-header"><div className="container"><div className="header-inner"><Link to="/" className="brand"><span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill" /></span>Plateforme de l'engagement</Link><Link to="/" className="btn btn-subtle btn-sm"><i className="bi bi-arrow-left" /> Retour au portail</Link></div></div></header>
    <main className="auth-main"><div className="auth-grid"><aside className="auth-aside" aria-label="Présentation de la plateforme"><div className="auth-aside-inner"><p className="eyebrow auth-eyebrow">L'engagement qui a du sens</p><h1 className="auth-headline">Rejoignez celles et ceux qui agissent pour l’intérêt général.</h1><p className="auth-sub">Créez votre espace candidat ou inscrivez votre organisation gratuitement.</p><ul className="auth-points"><li><i className="bi bi-search" /> Trouvez des missions qui ont du sens</li><li><i className="bi bi-clipboard-check" /> Suivez vos candidatures simplement</li><li><i className="bi bi-patch-check" /> Publiez au sein d’un réseau vérifié</li></ul></div></aside>
      <section className="auth-panel" aria-labelledby="register-title"><div className="auth-card auth-card-wide" id="formulaire"><div className="section-head"><h2 id="register-title">Créer un compte</h2><p>Choisissez le type d’espace qui vous correspond.</p></div>{error && <div className="alert alert-danger" role="alert">{error}</div>}{success && <div className="alert alert-success" role="status">{success} <Link to="/connexion">Se connecter</Link></div>}
        <div className="auth-choice" role="group" aria-label="Type de compte"><button type="button" className={accountType === 'candidate' ? 'is-selected' : ''} onClick={() => { setAccountType('candidate'); setError(null); }}><i className="bi bi-person" /> Candidat</button><button type="button" className={accountType === 'organization' ? 'is-selected' : ''} onClick={() => { setAccountType('organization'); setError(null); }}><i className="bi bi-building" /> Organisation</button></div>
        {accountType === 'candidate' ? <form onSubmit={submitCandidate}><div className="mb-3"><label htmlFor="candidate-email" className="form-label">Adresse e-mail *</label><input id="candidate-email" type="email" autoComplete="email" className="form-control" required value={candidate.email} onChange={(event) => setCandidate({ ...candidate, email: event.target.value })} /></div><div className="mb-3"><label htmlFor="candidate-phone" className="form-label">Téléphone</label><input id="candidate-phone" type="tel" autoComplete="tel" className="form-control" value={candidate.phone} onChange={(event) => setCandidate({ ...candidate, phone: event.target.value })} /></div><PasswordFields value={candidate} onChange={setCandidate} /><div className="d-grid"><button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>{isSubmitting ? 'Création…' : 'Créer mon compte candidat'}</button></div></form> : <form onSubmit={submitOrganization}><div className="row g-3"><div className="col-sm-6"><label htmlFor="org-name" className="form-label">Nom de l’organisation *</label><input id="org-name" className="form-control" required value={organization.organization_name} onChange={(event) => setOrganization({ ...organization, organization_name: event.target.value })} /></div><div className="col-sm-6"><label htmlFor="org-type" className="form-label">Type *</label><select id="org-type" className="form-select" value={organization.organization_type} onChange={(event) => setOrganization({ ...organization, organization_type: event.target.value as OrganizationRegistration['organization_type'] })}><option value="association">Association</option><option value="foundation">Fondation</option><option value="ngo">ONG</option><option value="waqf">Waqf</option></select></div><div className="col-sm-6"><label htmlFor="org-email" className="form-label">E-mail du responsable *</label><input id="org-email" type="email" className="form-control" required value={organization.owner_email} onChange={(event) => setOrganization({ ...organization, owner_email: event.target.value })} /></div><div className="col-sm-6"><label htmlFor="org-registry" className="form-label">Identifiant légal *</label><input id="org-registry" className="form-control" required value={organization.registry_number} onChange={(event) => setOrganization({ ...organization, registry_number: event.target.value })} /></div><div className="col-sm-6"><label htmlFor="org-country" className="form-label">Pays *</label><select id="org-country" className="form-select" value={organization.country_code} onChange={(event) => setOrganization({ ...organization, country_code: event.target.value })}><option value="DZ">Algérie</option><option value="FR">France</option><option value="MA">Maroc</option></select></div><div className="col-sm-6"><label htmlFor="org-city" className="form-label">Ville *</label><input id="org-city" className="form-control" required value={organization.city} onChange={(event) => setOrganization({ ...organization, city: event.target.value })} /></div></div><div className="mt-3"><label htmlFor="org-description" className="form-label">Présentation *</label><textarea id="org-description" className="form-control" rows={3} required value={organization.description} onChange={(event) => setOrganization({ ...organization, description: event.target.value })} /></div><div className="mt-3"><label htmlFor="org-mission" className="form-label">Mission</label><textarea id="org-mission" className="form-control" rows={2} value={organization.mission} onChange={(event) => setOrganization({ ...organization, mission: event.target.value })} /></div><PasswordFields value={organization} onChange={setOrganization} /><div className="d-grid mt-3"><button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>{isSubmitting ? 'Création…' : 'Inscrire mon organisation'}</button></div></form>}
        <p className="auth-alt">Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link></p></div><p className="auth-legal">En créant un compte, vous acceptez les conditions d’utilisation et la politique de confidentialité.</p></section></div></main></>;
}

function PasswordFields<T extends { password: string; confirmPassword: string }>({ value, onChange }: { value: T; onChange: (value: T) => void }) {
  return <div className="row g-3 mt-0"><div className="col-sm-6"><label htmlFor="password" className="form-label">Mot de passe *</label><input id="password" type="password" autoComplete="new-password" className="form-control" minLength={8} required value={value.password} onChange={(event) => onChange({ ...value, password: event.target.value })} /></div><div className="col-sm-6"><label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe *</label><input id="confirm-password" type="password" autoComplete="new-password" className="form-control" minLength={8} required value={value.confirmPassword} onChange={(event) => onChange({ ...value, confirmPassword: event.target.value })} /></div></div>;
}