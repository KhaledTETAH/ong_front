import { useMemo, useState } from 'react';
import { Footer } from '@/components/Footer/Footer';
import { FilterSidebar } from '@/components/FilterSidebar/FilterSidebar';
import type { FilterGroupDef } from '@/components/FilterSidebar/FilterSidebar';
import { Navbar } from '@/components/Navbar/Navbar';
import { OngCard } from '@/components/OngCard/OngCard';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useOrganizations } from '@/hooks/useOrganizations';
import type { OrganizationFilters } from '@/services/organizationsService';
import type { OrganizationType } from '@/types/organization';

const filterGroups: FilterGroupDef[] = [
  { id: 'verification', label: 'Vérification', type: 'checkbox', options: [{ label: 'Organisation vérifiée', value: 'verified' }] },
  { id: 'type', label: 'Type de structure', type: 'select', options: [{ label: 'Association', value: 'association' }, { label: 'Fondation', value: 'foundation' }, { label: 'ONG', value: 'ngo' }, { label: 'Waqf', value: 'waqf' }] },
];

export function AnnuairePage() {
  const [search, setSearch] = useState({ q: '', location: '', type: '' });
  const [filters, setFilters] = useState<Record<string, string | string[]>>({ verification: [], type: '' });
  const [sort, setSort] = useState<'name' | 'offers'>('name');
  const apiFilters = useMemo<OrganizationFilters>(() => ({
    q: search.q || undefined,
    city: search.location || undefined,
    cause: search.type || undefined,
    type: ((filters.type as string) || undefined) as OrganizationType | undefined,
    verification: (filters.verification as string[]).includes('verified') ? 'verified' : undefined,
    sort,
  }), [search, filters, sort]);
  const { data: organizations = [], isLoading, isError, error } = useOrganizations(apiFilters);

  return <><Navbar /><main>
    <section className="search-bar-wrap" aria-labelledby="annuaire-title"><div className="container"><h1 id="annuaire-title" className="search-title">Annuaire des organisations</h1><p className="text-soft mb-3">Consultez les organisations actives de la plateforme.</p><SearchBar onSearch={setSearch} placeholder="Nom, cause, ville…" defaultTypeOptions={[{ value: 'education', label: 'Éducation' }, { value: 'inclusion-numerique', label: 'Inclusion numérique' }, { value: 'jeunesse', label: 'Jeunesse' }]} /></div></section>
    <section className="app-section"><div className="container"><div className="row g-4"><aside className="col-lg-3"><FilterSidebar groups={filterGroups} filters={filters} onFilterChange={(id, value) => setFilters((previous) => ({ ...previous, [id]: value }))} onReset={() => setFilters({ verification: [], type: '' })} /></aside>
      <div className="col-lg-9"><div className="results-bar"><p className="results-count mb-0">{organizations.length} organisations</p><div className="d-flex align-items-center gap-2"><label htmlFor="tri" className="form-label mb-0 small">Trier par</label><select id="tri" className="form-select form-select-sm" value={sort} onChange={(event) => setSort(event.target.value as 'name' | 'offers')}><option value="name">Nom (A–Z)</option><option value="offers">Nombre d'offres</option></select></div></div>
      {isLoading && <p>Chargement des organisations…</p>}{isError && <div className="alert alert-danger">{error instanceof Error ? error.message : 'Impossible de charger les organisations.'}</div>}
      {!isLoading && !isError && <div className="row g-3">{organizations.length ? organizations.map((organization) => <div className="col-md-6" key={organization.id}><OngCard org={organization} /></div>) : <div className="col-12"><div className="empty-state"><h3>Aucune organisation trouvée</h3><p>Essayez de modifier vos critères.</p></div></div>}</div>}</div>
    </div></div></section></main><Footer /></>;
}