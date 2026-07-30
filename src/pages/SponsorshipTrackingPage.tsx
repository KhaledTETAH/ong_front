import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { getSponsorshipMission, verifySponsorshipMission } from '@/services/mecenatService';
import type { SponsorshipMission } from '@/types/mecenat';

export function SponsorshipTrackingPage() {
  const [searchParams] = useSearchParams();
  const [trackingUuid, setTrackingUuid] = useState(searchParams.get('id') ?? '');
  const [token, setToken] = useState(searchParams.get('token') ?? '');
  const [mission, setMission] = useState<SponsorshipMission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMission(event: React.FormEvent) {
    event.preventDefault(); setError(null); setIsLoading(true);
    try { setMission(await getSponsorshipMission(trackingUuid, token)); }
    catch (requestError) { setMission(null); setError(requestError instanceof Error ? requestError.message : 'Suivi introuvable.'); }
    finally { setIsLoading(false); }
  }

  async function verifyMission() {
    setError(null); setIsLoading(true);
    try { setMission(await verifySponsorshipMission(trackingUuid, token)); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Vérification impossible.'); }
    finally { setIsLoading(false); }
  }

  return <><Navbar /><main className="app-section"><div className="container"><div className="row justify-content-center"><div className="col-lg-7"><div className="section-head"><p className="eyebrow">Mécénat de compétences</p><h1>Suivre une mission</h1><p>Consultez ou confirmez une mission grâce au lien et au code reçus par e-mail.</p></div><div className="card p-4"><form onSubmit={loadMission}><div className="mb-3"><label htmlFor="tracking-id" className="form-label">Identifiant de suivi *</label><input id="tracking-id" className="form-control" required value={trackingUuid} onChange={(event) => setTrackingUuid(event.target.value)} /></div><div className="mb-3"><label htmlFor="tracking-token" className="form-label">Code de vérification *</label><input id="tracking-token" className="form-control" required value={token} onChange={(event) => setToken(event.target.value)} /></div><button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Chargement…' : 'Consulter la mission'}</button></form>{error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
      {mission && <div className="mt-4 pt-4 border-top"><div className="d-flex justify-content-between align-items-start gap-3"><div><h2 className="h4 mb-1">{mission.title}</h2><p className="text-soft mb-2">{mission.company_name} · {mission.region || 'Lieu non précisé'}</p></div><span className={`status-badge ${mission.status === 'submitted' ? 'status-success' : 'status-warning'}`}>{mission.status === 'submitted' ? 'Vérifiée' : 'À vérifier'}</span></div><p>{mission.description || 'Aucune description fournie.'}</p><dl className="row small mb-0"><dt className="col-sm-4">Contact</dt><dd className="col-sm-8">{mission.contact_email}</dd><dt className="col-sm-4">Jours-homme</dt><dd className="col-sm-8">{mission.man_days}</dd><dt className="col-sm-4">Visibilité</dt><dd className="col-sm-8">{mission.visibility === 'open' ? 'Ouverte' : 'ONG vérifiées uniquement'}</dd></dl>{mission.status !== 'submitted' && <button type="button" className="btn btn-accent mt-3" disabled={isLoading} onClick={verifyMission}><i className="bi bi-patch-check" /> Vérifier cette mission</button>}</div>}</div><p className="mt-3"><Link to="/mecenat">Déposer une nouvelle mission</Link></p></div></div></div></main><Footer /></>;
}