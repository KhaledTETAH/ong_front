import { useEffect } from 'react';
import { useCondidateOffers } from '@/hooks/useCondidateOffers';
import { useOfferStore } from '@/context/offerStore';
import MissionItem from './MissionItem';

export default function MissionTimeline() {
  const { data, isLoading, isError } = useCondidateOffers();
  const candidateOffers = useOfferStore((state) => state.candidateOffers);
  const setCandidateOffers = useOfferStore((state) => state.setCandidateOffers);

  useEffect(() => {
    if (data) setCandidateOffers(data);
  }, [data, setCandidateOffers]);

  return (
    <div>
      <h3 className="fs-5 fw-bold text-dark mb-4">Missions réalisées</h3>

      {isLoading && <p className="small text-muted">Chargement des missions...</p>}
      {isError && <p className="small text-danger">Impossible de charger vos missions.</p>}
      {!isLoading && !isError && candidateOffers.length === 0 && (
        <p className="small text-muted">Aucune mission réalisée pour le moment.</p>
      )}

      {candidateOffers.length > 0 && (
      <div className="position-relative" style={{ paddingLeft: 20 }}>
        {/* Vertical line */}
        <div
          className="position-absolute"
          style={{
            left: 5,
            top: 10,
            bottom: 0,
            width: 2,
            backgroundColor: '#dee2e6',
          }}
        />
        {candidateOffers.map((offer) => (
          <MissionItem
            key={offer.id}
            period={offer.period ?? 'Mission réalisée'}
            hours={offer.hours ?? '—'}
            title={offer.title}
            org={offer.org ?? 'Organisation'}
            location={offer.location ?? '—'}
            description={offer.description}
            skills={offer.skills ?? []}
            verified={offer.verified ?? true}
            hasAttestation={offer.hasAttestation ?? false}
          />
        ))}
      </div>
      )}
    </div>
  );
}