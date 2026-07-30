import { Link } from 'react-router-dom';
import type { Organization } from '@/types/organization';
import { TrustBadge } from '../TrustBadge/TrustBadge';
import { getInitials } from '@/utils/formatters';

export function OngCard({ org }: { org: Organization }) {
  const isVerified = ['verified', 'certified_plus'].includes(org.verification_status);

  return (
    <article className="card ong-card p-3">
      <div className="ong-head">
        <span className="ong-logo" aria-hidden="true">{getInitials(org.name)}</span>
        <div><h3 className="mb-0">{org.name}</h3>{isVerified && <TrustBadge level="verified" />}</div>
      </div>
      <p className="text-soft ong-desc">{org.description}</p>
      <div className="ong-tags">{org.causes.map((cause) => <span key={cause.id} className="tag">{cause.name}</span>)}</div>
      <div className="ong-foot">
        <span className="text-soft small"><i className="bi bi-geo-alt" aria-hidden="true"></i> {org.city}, {org.country.name_fr} · {org.open_offers_count} offres ouvertes</span>
        <Link to={`/annuaire/${org.slug}`} className="btn btn-outline-primary btn-sm">Voir le profil</Link>
      </div>
    </article>
  );
}