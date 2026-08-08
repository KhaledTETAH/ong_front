import { useEffect } from 'react';
import Header from '../components//Header';
import ProfileCard from '../components//ProfileCard';
import SidebarNav from '../components//SidebarNav';
import AdjustButton from '../components//AdjustButton';
import FilterBar from '../components//FilterBar';
import OffersList, { type Offer } from '../components//OffersList';
import AlertCTA from '../components//AlertCTA';
import Container from 'react-bootstrap/Container'
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');


import {useOfferStore }from '@/context/offerStore';
export default function OffresPage() {
const urls = [`${API_BASE_URL}/offers/`, `${API_BASE_URL}/conversations/`];
    const { offer, setOffer} = useOfferStore();
useEffect(() => {
  const fetchOffers = async () => {
    try {
      const response = await fetch(urls[0], {
        method: 'GET',
      });

      setOffer( await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  fetchOffers();
}, [setOffer]);

//   const [offers, setOffers] = useState<Offer[]>(initialOffers);
 const handleToggleSave = (_id: number) => {
    /*  setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isSaved: !o.isSaved } : o))
    );*/
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
                <SidebarNav   link="/offers" />
             
            </div>
          </div>

          {/* Main */}
          <div className="col-lg-9">
            <div className="d-flex flex-column gap-4">
              <FilterBar keyword="éducation" />
              <OffersList
                offers={offer as Offer[] | null}
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