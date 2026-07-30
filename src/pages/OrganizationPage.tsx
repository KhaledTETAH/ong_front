import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Footer } from '@/components/Footer/Footer';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { Navbar } from '@/components/Navbar/Navbar';
import { getOrganization } from '@/services/organizationsService';

export function OrganizationPage() {
  const { slug = '' } = useParams();
  const { data: organization, isLoading, isError, error } = useQuery({ queryKey: ['organization', slug], queryFn: () => getOrganization(slug), enabled: Boolean(slug) });
  if (isLoading) return <><Navbar /><main className="container py-5">Chargement…</main><Footer /></>;
  if (isError || !organization) return <><Navbar /><main className="container py-5"><h1>Organisation introuvable</h1><p>{error instanceof Error ? error.message : 'Cette organisation est indisponible.'}</p><Link to="/annuaire" className="btn btn-primary">Retour à l'annuaire</Link></main><Footer /></>;
  return <><Navbar /><main className="app-section"><div className="container"><Link to="/annuaire" className="btn btn-subtle btn-sm mb-3">Retour à l'annuaire</Link><h1>{organization.name}</h1><p className="text-soft">{organization.city}, {organization.country.name_fr}</p><p>{organization.description}</p>{organization.mission && <><h2 className="h5 mt-4">Mission</h2><p>{organization.mission}</p></>}<h2 className="h5 mt-5">Offres ouvertes</h2><div className="row g-3">{organization.offers.map((offer) => <div className="col-md-6 col-lg-4" key={offer.id}><MissionCard mission={offer} /></div>)}</div></div></main><Footer /></>;
}