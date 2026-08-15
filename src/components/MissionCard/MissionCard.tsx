import { Link } from 'react-router-dom';
import type { OfferSummary } from '@/types/mission';
import { engagementTypeLabels, remoteModeLabels } from '@/types/mission';
import { TrustBadge } from '../TrustBadge/TrustBadge';

export function MissionCard({ mission }: { mission: OfferSummary }) {
  const organization = mission.organization;
  const isVerified = !!organization && ['verified', 'certified_plus'].includes(organization.verification_status);
  const location = [mission.city, mission.country?.name_fr].filter(Boolean).join(', ');
  const orgName = organization?.name ?? 'Organisation';

  return (
    <article className="card offer-card p-3 h-100">
      <p className="offer-org"><i className="bi bi-building" aria-hidden="true"></i> {orgName}</p>
      <h3 className="text-truncate" title={mission.title}>{mission.title}</h3>
      <div className="offer-meta">
        <span><i className="bi bi-geo-alt" aria-hidden="true"></i> {location}</span>
        <span><i className="bi bi-clock" aria-hidden="true"></i> {mission.duration_label || 'Durée à définir'}</span>
        <span><i className="bi bi-briefcase" aria-hidden="true"></i> {engagementTypeLabels[mission.engagement_type]}</span>
        <span><i className="bi bi-easel" aria-hidden="true"></i> {remoteModeLabels[mission.remote_mode]}</span>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {(mission.causes ?? []).map((cause) => <span key={cause.id} className="status-badge status-neutral">{cause.name}</span>)}
        {isVerified && <TrustBadge level="verified" />}
      </div>
      <div className="mt-auto pt-2"><Link to={`/missions/${mission.slug}`} className="btn btn-primary btn-sm">Voir l'offre</Link></div>
    </article>
  );
}