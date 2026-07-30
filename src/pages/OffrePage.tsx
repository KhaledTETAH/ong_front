import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Footer } from '@/components/Footer/Footer';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { Navbar } from '@/components/Navbar/Navbar';
import { TrustBadge } from '@/components/TrustBadge/TrustBadge';
import { useAuthStore } from '@/context/authStore';
import { useMission, useSimilarMissions } from '@/hooks/useMissions';
import { applyToMission, removeSavedMission, saveMission, shareMission } from '@/services/missionsService';
import { engagementTypeLabels, remoteModeLabels } from '@/types/mission';
import { formatDate } from '@/utils/formatDate';

export function OffrePage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const { data: mission, isLoading, isError, error } = useMission(slug, accessToken);
  const { data: similar = [] } = useSimilarMissions(slug);
  const [message, setMessage] = useState<string | null>(null);
  const action = useMutation({
    mutationFn: async (kind: 'apply' | 'save' | 'unsave' | 'share') => {
      if (!mission) throw new Error('Mission indisponible.');
      if (kind === 'share') return shareMission(mission.slug, 'copy_link');
      if (!accessToken) throw new Error('Connectez-vous pour effectuer cette action.');
      if (kind === 'apply') return applyToMission(mission.slug, '', accessToken);
      return kind === 'save' ? saveMission(mission.slug, accessToken) : removeSavedMission(mission.slug, accessToken);
    },
    onSuccess: (_, kind) => setMessage(kind === 'apply' ? 'Candidature envoyée.' : kind === 'share' ? 'Partage enregistré.' : 'Votre sélection a été mise à jour.'),
  });

  if (isLoading) return <><Navbar /><main className="container py-5 text-center"><p>Chargement de l'offre…</p></main><Footer /></>;
  if (isError || !mission) return <><Navbar /><main className="container py-5 text-center"><h2>Offre introuvable</h2><p className="text-soft">{error instanceof Error ? error.message : 'Cette offre n’est plus disponible.'}</p><Link to="/missions" className="btn btn-primary mt-3">Retour aux missions</Link></main><Footer /></>;

  const isVerified = ['verified', 'certified_plus'].includes(mission.organization.verification_status);
  const canApply = user?.role === 'candidate';
  return <><Navbar /><main id="contenu"><div className="container"><nav aria-label="Fil d'Ariane" className="pt-3"><ol className="breadcrumb"><li className="breadcrumb-item"><Link to="/">Accueil</Link></li><li className="breadcrumb-item"><Link to="/missions">Missions</Link></li><li className="breadcrumb-item active" aria-current="page">{mission.title}</li></ol></nav></div>
    <section className="offre-hero"><div className="container"><p className="eyebrow mb-1">Offre d'engagement</p><h1>{mission.title}</h1><p className="offre-org mb-2"><i className="bi bi-building" /> <Link to={`/annuaire/${mission.organization.slug}`}>{mission.organization.name}</Link> {isVerified && <TrustBadge level="verified" />}</p><div className="offre-meta"><span><i className="bi bi-geo-alt" /> {mission.city}, {mission.country.name_fr}</span><span><i className="bi bi-briefcase" /> {engagementTypeLabels[mission.engagement_type]}</span><span><i className="bi bi-clock" /> {mission.duration_label || 'Durée à définir'}</span><span><i className="bi bi-easel" /> {remoteModeLabels[mission.remote_mode]}</span><span><i className="bi bi-calendar-event" /> Publiée le {formatDate(mission.published_at)}</span></div></div></section>
    <section className="app-section"><div className="container"><div className="row g-4"><div className="col-lg-8"><div className="card p-4"><div className="mb-3 d-flex gap-2 flex-wrap">{mission.causes.map((cause) => <span key={cause.id} className="status-badge status-neutral">{cause.name}</span>)}</div><h2 className="h5">La mission</h2><p>{mission.description}</p>{mission.responsibilities && <><h2 className="h5 mt-4">Responsabilités</h2><p>{mission.responsibilities}</p></>}{mission.desired_profile && <><h2 className="h5 mt-4">Profil recherché</h2><p>{mission.desired_profile}</p></>}{mission.skills.length > 0 && <><h2 className="h5 mt-4">Compétences</h2><ul className="offre-list">{mission.skills.map((skill) => <li key={skill.id}><i className="bi bi-check2" /> {skill.name}</li>)}</ul></>}{mission.conditions && <><h2 className="h5 mt-4">Conditions</h2><p>{mission.conditions}</p></>}</div></div>
      <div className="col-lg-4"><div className="card apply-card p-4 mb-3"><p className="apply-lead mb-1">Cette mission vous intéresse ?</p>{message && <div className="alert alert-success py-2">{message}</div>}{action.isError && <div className="alert alert-danger py-2">{action.error instanceof Error ? action.error.message : 'Action impossible.'}</div>}<div className="d-grid gap-2"><button className="btn btn-primary btn-lg" disabled={action.isPending} onClick={() => { if (!accessToken) navigate('/connexion'); else if (!canApply) setMessage('Seuls les comptes candidats peuvent postuler.'); else action.mutate('apply'); }}>Postuler</button><button className="btn btn-subtle" disabled={action.isPending} onClick={() => action.mutate(mission.is_saved ? 'unsave' : 'save')}><i className="bi bi-bookmark" /> {mission.is_saved ? 'Retirer des sauvegardes' : 'Sauvegarder l’offre'}</button><button className="btn btn-subtle" disabled={action.isPending} onClick={() => action.mutate('share')}><i className="bi bi-share" /> Partager</button></div></div>
      <div className="card p-3"><p className="fw-bold mb-1">{mission.organization.name}</p><p className="text-soft small mb-2">{mission.organization.description}</p><Link to={`/annuaire/${mission.organization.slug}`} className="btn btn-outline-primary btn-sm w-100">Voir le profil de l’organisation</Link></div></div></div>
      {similar.length > 0 && <><h2 className="h5 mt-5 mb-3">Missions similaires</h2><div className="row g-3">{similar.slice(0, 3).map((offer) => <div className="col-md-4" key={offer.id}><MissionCard mission={offer} /></div>)}</div></>}</div></section></main><Footer /></>;
}