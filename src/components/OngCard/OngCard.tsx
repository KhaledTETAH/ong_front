
import type { Organization } from '@/types/organization';
import { TrustBadge } from '../TrustBadge/TrustBadge';
import { getInitials } from '@/utils/formatters';

export function OngCard({ org }: { org: Organization }) {
  return (
    <article className="card ong-card p-3">
      <div className="ong-head">
        <span className="ong-logo" aria-hidden="true">{getInitials(org.name)}</span>
        <div>
          <h3 className="mb-0">{org.name}</h3>
          {org.verified && <TrustBadge level="verified" />}
        </div>
      </div>
      
      <p className="text-soft ong-desc">{org.description}</p>
      
      <div className="ong-tags">
        {org.causes.map((cause, idx) => (
          <span key={idx} className="tag">{cause}</span>
        ))}
      </div>
      
      <div className="ong-foot">
        <span className="text-soft small">
          <i className="bi bi-geo-alt" aria-hidden="true"></i> {org.country} · {org.activeMissions} offres ouvertes
        </span>
        <button className="btn btn-outline-primary btn-sm">Voir le profil</button>
      </div>
    </article>
  );
}
