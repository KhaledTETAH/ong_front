import { useMemo, useState } from 'react';
import { Footer } from '@/components/Footer/Footer';
import { FilterSidebar } from '@/components/FilterSidebar/FilterSidebar';
import type { FilterGroupDef } from '@/components/FilterSidebar/FilterSidebar';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { Navbar } from '@/components/Navbar/Navbar';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useMissions } from '@/hooks/useMissions';
import type { EngagementType, OfferFilters, RemoteMode } from '@/types/mission';

const filterGroups: FilterGroupDef[] = [
  { id: 'cause', label: 'Cause', type: 'select', options: [{ label: 'Éducation', value: 'education' }, { label: 'Inclusion numérique', value: 'inclusion-numerique' }, { label: 'Jeunesse', value: 'jeunesse' }] },
  { id: 'mode', label: 'Modalité', type: 'checkbox', options: [{ label: 'Présentiel', value: 'on_site' }, { label: 'Hybride', value: 'hybrid' }, { label: 'À distance', value: 'remote' }] },
  { id: 'duration', label: 'Durée', type: 'select', options: [{ label: 'Courte (≤ 30 jours)', value: 'short' }, { label: 'Moyenne (1–6 mois)', value: 'medium' }, { label: 'Longue', value: 'long' }] },
];

const offerTypes = [
  { value: 'volunteering', label: 'Bénévolat' }, { value: 'employment', label: 'Salariat' }, { value: 'freelance', label: 'Freelance' },
  { value: 'consulting', label: 'Consultance' }, { value: 'governance', label: 'Gouvernance' }, { value: 'skills_sponsorship', label: 'Mécénat de compétences' },
];

export function MissionsPage() {
  const [search, setSearch] = useState({ q: '', location: '', type: '' });
  const [filters, setFilters] = useState<Record<string, string | string[]>>({ cause: '', mode: [], duration: '' });
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent');
  const apiFilters = useMemo<OfferFilters>(() => ({
    q: search.q || undefined,
    city: search.location || undefined,
    type: (search.type || undefined) as EngagementType | undefined,
    cause: (filters.cause as string) || undefined,
    mode: ((filters.mode as string[])[0] || undefined) as RemoteMode | undefined,
    duration: ((filters.duration as string) || undefined) as OfferFilters['duration'],
    sort,
  }), [search, filters, sort]);
  const { data: missions = [], isLoading, isError, error } = useMissions(apiFilters);

  return <><Navbar /><main>
    <section className="search-bar-wrap" aria-labelledby="recherche-title"><div className="container"><h1 id="recherche-title" className="search-title">Trouver une mission</h1><SearchBar onSearch={setSearch} defaultTypeOptions={offerTypes} /></div></section>
    <section className="app-section" id="resultats"><div className="container"><div className="row g-4"><aside className="col-lg-3" aria-label="Filtres de recherche"><FilterSidebar groups={filterGroups} filters={filters} onFilterChange={(id, value) => setFilters((previous) => ({ ...previous, [id]: value }))} onReset={() => setFilters({ cause: '', mode: [], duration: '' })} /></aside>
      <div className="col-lg-9"><div className="results-bar"><p className="results-count mb-0">{missions.length} missions correspondantes</p><div className="d-flex align-items-center gap-2"><label htmlFor="tri" className="form-label mb-0 small">Trier par</label><select id="tri" className="form-select form-select-sm" value={sort} onChange={(event) => setSort(event.target.value as 'recent' | 'oldest')}><option value="recent">Date de publication</option><option value="oldest">Les plus anciennes</option></select></div></div>
      {isLoading && <p>Chargement des missions…</p>}{isError && <div className="alert alert-danger">{error instanceof Error ? error.message : 'Impossible de charger les missions.'}</div>}
      {!isLoading && !isError && <div className="row g-3">{missions.length ? missions.map((mission) => <div className="col-md-6" key={mission.id}><MissionCard mission={mission} /></div>) : <div className="col-12"><div className="empty-state"><h3>Aucune mission trouvée</h3><p>Essayez de modifier vos critères.</p></div></div>}</div>}</div>
    </div></div></section></main><Footer /></>;
}