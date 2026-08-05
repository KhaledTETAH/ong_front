import { Bell } from 'lucide-react';
import JobCard from './JobCard';

export interface Offer {
  id: number;
  org: string;
  compatibility: number;
  title: string;
  location: string;
  duration: string;
  contractType: string;
  isSaved: boolean;
}

interface OffersListProps {
  offers: Offer[];
  searchTerm?: string;
  onApply: (id: number) => void;
  onToggleSave: (id: number) => void;
}

export default function OffersList({ offers, searchTerm, onApply, onToggleSave }: OffersListProps) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="fs-6 fw-bold text-dark mb-0">
          {offers.length} offres correspondent à votre fiche
        </h2>
        <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1">
          <Bell size={14} />
          Créer une alerte
        </button>
      </div>

      <div className="row g-3">
        {offers.map((offer) => (
          <div key={offer.id} className="col-md-6">
            <JobCard
              org={offer.org}
              compatibility={offer.compatibility}
              title={offer.title}
              highlight={searchTerm}
              location={offer.location}
              duration={offer.duration}
              contractType={offer.contractType}
              isSaved={offer.isSaved}
              onApply={() => onApply(offer.id)}
              onToggleSave={() => onToggleSave(offer.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}