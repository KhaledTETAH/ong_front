import { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar/FilterSidebar';
import type { FilterGroupDef } from '@/components/FilterSidebar/FilterSidebar';
import { MissionCard } from '@/components/MissionCard/MissionCard';
import { useMissions } from '@/hooks/useMissions';

const filterGroups: FilterGroupDef[] = [
  {
    id: 'cause',
    label: 'Cause',
    type: 'select',
    options: [
      { label: 'Éducation', value: 'Éducation' },
      { label: 'Environnement', value: 'Environnement' },
      { label: 'Santé', value: 'Santé' },
      { label: 'Solidarité', value: 'Solidarité' },
      { label: 'Culture', value: 'Culture' },
      { label: 'Humanitaire', value: 'Humanitaire' }
    ]
  },
  {
    id: 'modality',
    label: 'Modalité',
    type: 'checkbox',
    options: [
      { label: 'Présentiel', value: 'Présentiel' },
      { label: 'Hybride', value: 'Hybride' },
      { label: 'À distance', value: 'Distanciel' }
    ]
  },
  {
    id: 'duration',
    label: 'Durée',
    type: 'select',
    options: [
      { label: 'Ponctuelle', value: 'Ponctuelle' },
      { label: 'Moins de 3 mois', value: 'Moins de 3 mois' },
      { label: '3 à 12 mois', value: '3 à 12 mois' },
      { label: 'Mandat pluriannuel', value: 'Mandat pluriannuel' }
    ]
  }
];

export function MissionsPage() {
  const { data: missions = [], isLoading } = useMissions();
  
  const [searchParams, setSearchParams] = useState({ q: '', location: '', type: '' });
  const [filters, setFilters] = useState<Record<string, string | string[]>>({
    cause: '',
    modality: [],
    duration: ''
  });

  const handleSearch = (params: { q: string; location: string; type: string }) => {
    setSearchParams(params);
  };

  const handleFilterChange = (id: string, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleFilterReset = () => {
    setFilters({ cause: '', modality: [], duration: '' });
  };

  // Basic filtering based on state
  const filteredMissions = missions.filter(m => {
    if (searchParams.q && !m.title.toLowerCase().includes(searchParams.q.toLowerCase()) && !m.description.toLowerCase().includes(searchParams.q.toLowerCase())) return false;
    if (searchParams.location && !m.location.toLowerCase().includes(searchParams.location.toLowerCase())) return false;
    if (searchParams.type && m.engagementType !== searchParams.type) return false;
    
    if (filters.cause && !m.causes.includes(filters.cause as string)) return false;
    if (filters.modality && (filters.modality as string[]).length > 0 && !(filters.modality as string[]).includes(m.modality)) return false;
    
    // Duration filter not fully implemented on mock data since mock has generic strings, but we will leave the structure.
    return true;
  });

  return (
    <>
      <Navbar />
      
      <main>
        <section className="search-bar-wrap" aria-labelledby="recherche-title">
          <div className="container">
            <h1 id="recherche-title" className="search-title">Trouver une mission</h1>
            <SearchBar 
              onSearch={handleSearch} 
              defaultTypeOptions={['Bénévolat', 'Salariat', 'Freelance / consultance', 'Mandat de gouvernance', 'Mécénat de compétences']}
            />
          </div>
        </section>

        <section className="app-section" id="resultats">
          <div className="container">
            <div className="row g-4">
              <aside className="col-lg-3" aria-label="Filtres de recherche">
                <FilterSidebar 
                  groups={filterGroups}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleFilterReset}
                />
              </aside>

              <div className="col-lg-9">
                <div className="results-bar">
                  <p className="results-count mb-0">{filteredMissions.length} missions correspondantes</p>
                  <div className="d-flex align-items-center gap-2">
                    <label htmlFor="tri" className="form-label mb-0 small">Trier par</label>
                    <select id="tri" name="tri" className="form-select form-select-sm" style={{ width: 'auto' }}>
                      <option>Pertinence</option>
                      <option>Date de publication</option>
                      <option>Proximité géographique</option>
                    </select>
                  </div>
                </div>
                <p className="text-soft small mb-3">
                  <i className="bi bi-info-circle"></i> Recherche fonctionnelle en mémoire (mock data).
                </p>

                {isLoading ? (
                  <p>Chargement des missions...</p>
                ) : (
                  <>
                    <div className="row g-3">
                      {filteredMissions.length > 0 ? (
                        filteredMissions.map(mission => (
                          <div className="col-md-6" key={mission.id}>
                            <MissionCard mission={mission} />
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <div className="empty-state">
                            <span className="empty-icon"><i className="bi bi-search"></i></span>
                            <h3>Aucune mission trouvée</h3>
                            <p>Essayez de modifier vos filtres ou vos mots-clés de recherche.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {filteredMissions.length > 0 && (
                      <nav className="mt-4" aria-label="Pages de résultats">
                        <ul className="pagination justify-content-center">
                          <li className="page-item disabled"><span className="page-link">Précédent</span></li>
                          <li className="page-item active" aria-current="page"><span className="page-link">1</span></li>
                          <li className="page-item"><button className="page-link">2</button></li>
                          <li className="page-item"><button className="page-link">Suivant</button></li>
                        </ul>
                      </nav>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
