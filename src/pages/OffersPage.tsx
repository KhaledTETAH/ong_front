import { useState } from 'react';
import Header from '../components//Header';
import ProfileCard from '../components//ProfileCard';
import SidebarNav from '../components//SidebarNav';
import AdjustButton from '../components//AdjustButton';
import FilterBar from '../components//FilterBar';
import OffersList, { type Offer } from '../components//OffersList';
import AlertCTA from '../components//AlertCTA';
import Container from 'react-bootstrap/Container'
const initialOffers: Offer[] = [
  {
    id: 1,
    org: 'Fondation Horizon Solidaire',
    compatibility: 95,
    title: 'Chef de projet éducation numérique',
    location: 'Alger, Algérie',
    duration: '8 mois',
    contractType: 'Salariat',
    isSaved: false,
  },
  {
    id: 2,
    org: 'Association Lumière d\'Oran',
    compatibility: 88,
    title: 'Animateur solidarité — programme jeunesse',
    location: 'Oran, Algérie',
    duration: 'Récurrent',
    contractType: 'Bénévolat',
    isSaved: true,
  },
  {
    id: 3,
    org: 'ONG Racines & Avenir',
    compatibility: 74,
    title: 'Coordinateur pédagogique éducation',
    location: 'Casablanca, Maroc',
    duration: '12 mois',
    contractType: 'Salariat',
    isSaved: false,
  },
  {
    id: 4,
    org: 'Waqf El Baraka',
    compatibility: 70,
    title: 'Membre de comité — éducation et jeunesse',
    location: 'Tunis, Tunisie',
    duration: 'Mandat 2 ans',
    contractType: 'Gouvernance',
    isSaved: false,
  },
];

export default function OffresPage() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  const handleToggleSave = (id: number) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isSaved: !o.isSaved } : o))
    );
  };

  const handleApply = (id: number) => {
    // TODO: wire to backend / router
    alert(`Postuler à l'offre ${id}`);
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f5f5f0' }}>
      <Header />
<Container>
      <main className="container-fluid flex-grow-1 px-4 py-4">
        {/* Page header */}
        <div className="mb-4">
          <span
            className="fw-bold text-uppercase d-block mb-1"
            style={{ fontSize: '0.7rem', color: '#adb5bd', letterSpacing: '0.05em' }}
          >
            Espace Candidat
          </span>
          <h1 className="fw-bold text-dark display-6 mb-2">Offres correspondantes</h1>
          <p className="small text-muted mb-0" style={{ maxWidth: 600 }}>
            Offres qui correspondent à votre fiche « poste recherché ». Vous restez à
            l'initiative : mot-clé et filtres, sans recommandation automatique.
          </p>
        </div>

        {/* Content */}
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="d-flex flex-column gap-3">
              <ProfileCard />
              <AdjustButton />
                <SidebarNav   link="/offers"/>
             
            </div>
          </div>

          {/* Main */}
          <div className="col-lg-9">
            <div className="d-flex flex-column gap-4">
              <FilterBar keyword="éducation" />
              <OffersList
                offers={offers}
                searchTerm="éducation"
                onApply={handleApply}
                onToggleSave={handleToggleSave}
              />
              <AlertCTA />
            </div>
          </div>
        </div>
      </main>
</Container>
      <footer className="px-4 py-3 text-center">
        <p className="small text-muted mb-0" style={{ fontSize: '0.65rem' }}>
          Espace candidat — maquette HTML5/CSS3/Bootstrap 5, sans JavaScript.
          Recherche, correspondance et alertes à relier au backend.
        </p>
      </footer>
    </div>
  );
}