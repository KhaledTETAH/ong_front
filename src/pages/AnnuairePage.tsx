import { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { FilterSidebar } from '@/components/FilterSidebar/FilterSidebar';
import type {  FilterGroupDef } from '@/components/FilterSidebar/FilterSidebar';
import { OngCard } from '@/components/OngCard/OngCard';
import { useOrganizations } from '@/hooks/useOrganizations';

const filterGroups: FilterGroupDef[] = [
  {
    id: 'verified',
    label: 'Niveau de vérification',
    type: 'checkbox',
    options: [
      { label: 'Organisation vérifiée', value: 'true' }
    ]
  },
  {
    id: 'type',
    label: 'Type de structure',
    type: 'select',
    options: [
      { label: 'Association', value: 'Association' },
      { label: 'Fondation', value: 'Fondation' },
      { label: 'ONG', value: 'ONG' },
      { label: 'Waqf', value: 'Waqf' }
    ]
  }
];

export function AnnuairePage() {
  const { data: orgs = [], isLoading } = useOrganizations();
  
  const [searchParams, setSearchParams] = useState({ q: '', location: '', type: '' });
  const [filters, setFilters] = useState<Record<string, string | string[]>>({
    verified: [],
    type: ''
  });

  const handleSearch = (params: { q: string; location: string; type: string }) => {
    setSearchParams(params);
  };

  const handleFilterChange = (id: string, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleFilterReset = () => {
    setFilters({ verified: [], type: '' });
  };

  // Filter organizations
  const filteredOrgs = orgs.filter(o => {
    if (searchParams.q && !o.name.toLowerCase().includes(searchParams.q.toLowerCase())) return false;
    if (searchParams.location && !o.country.toLowerCase().includes(searchParams.location.toLowerCase())) return false;
    if (searchParams.type && !o.causes.includes(searchParams.type)) return false;
    
    if (filters.type && o.type !== filters.type) return false;
    if (filters.verified && (filters.verified as string[]).length > 0) {
      if ((filters.verified as string[]).includes('true') && !o.verified) return false;
    }
    
    return true;
  });

  return (
    <>
      <Navbar />
      
      <main>
        <section className="search-bar-wrap" aria-labelledby="annuaire-title">
          <div className="container">
            <h1 id="annuaire-title" className="search-title">Annuaire des organisations</h1>
            <p className="text-soft mb-3">Consultez les ONG, associations, fondations et Waqfs vérifiés sur la plateforme.</p>
            <SearchBar 
              onSearch={handleSearch} 
              defaultTypeOptions={['Éducation', 'Environnement', 'Santé', 'Solidarité', 'Culture', 'Humanitaire']}
              placeholder="Nom, cause, ville…"
            />
          </div>
        </section>

        <section className="app-section" id="resultats">
          <div className="container">
            <div className="row g-4">
              <aside className="col-lg-3" aria-label="Filtres">
                <FilterSidebar 
                  groups={filterGroups}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleFilterReset}
                />
              </aside>

              <div className="col-lg-9">
                <div className="results-bar">
                  <p className="results-count mb-0">{filteredOrgs.length} organisations</p>
                  <div className="d-flex align-items-center gap-2">
                    <label htmlFor="tri" className="form-label mb-0 small">Trier par</label>
                    <select id="tri" name="tri" className="form-select form-select-sm" style={{ width: 'auto' }}>
                      <option>Pertinence</option>
                      <option>Nom (A–Z)</option>
                      <option>Nombre d'offres</option>
                    </select>
                  </div>
                </div>
                <p className="text-soft small mb-3">
                  <i className="bi bi-info-circle"></i> Recherche en mémoire (mock data).
                </p>

                {isLoading ? (
                  <p>Chargement des organisations...</p>
                ) : (
                  <>
                    <div className="row g-3">
                      {filteredOrgs.length > 0 ? (
                        filteredOrgs.map(org => (
                          <div className="col-md-6" key={org.id}>
                            <OngCard org={org} />
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <div className="empty-state">
                            <span className="empty-icon"><i className="bi bi-search"></i></span>
                            <h3>Aucune organisation trouvée</h3>
                            <p>Essayez de modifier vos critères.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {filteredOrgs.length > 0 && (
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
