import { Link } from 'react-router-dom';
import type { Mission } from '@/types/mission';
import { TrustBadge } from '../TrustBadge/TrustBadge';

export function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="card offer-card p-3 h-100">
      <p className="offer-org">
        <i className="bi bi-building" aria-hidden="true"></i> {mission.orgName}
      </p>
      <h3 className="text-truncate" title={mission.title}>{mission.title}</h3>
      <div className="offer-meta">
        <span><i className="bi bi-geo-alt" aria-hidden="true"></i> {mission.location}</span>
        <span><i className="bi bi-clock" aria-hidden="true"></i> {mission.duration}</span>
        <span><i className="bi bi-briefcase" aria-hidden="true"></i> {mission.engagementType}</span>
      </div>
      
      <div className="d-flex flex-wrap gap-2 mb-3">
        {mission.causes.map((cause, idx) => (
          <span key={idx} className="status-badge status-neutral">{cause}</span>
        ))}
        {mission.orgVerified && <TrustBadge level="verified" />}
      </div>
      
      <div className="mt-auto pt-2">
        <Link to={`/missions/${mission.id}`} className="btn btn-primary btn-sm">
          Voir l'offre
        </Link>
      </div>
    </article>
  );
}
