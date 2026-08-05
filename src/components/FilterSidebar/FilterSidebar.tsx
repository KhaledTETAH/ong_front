export interface FilterGroupDef {
  id: string;
  label: string;
  type: 'select' | 'checkbox';
  options: { label: string; value: string }[];
}

interface FilterSidebarProps {
  groups: FilterGroupDef[];
  filters: Record<string, string | string[]>;
  onFilterChange: (id: string, value: string | string[]) => void;
  onReset: () => void;
}

export function FilterSidebar({ groups, filters, onFilterChange, onReset }: FilterSidebarProps) {
  return (
    <div className="filters">
      <div className="filters-head">
        <h2 className="h6 mb-0">Filtres</h2>
        <button type="button" onClick={onReset} className="btn btn-link p-0 small text-decoration-none">
          Réinitialiser
        </button>
      </div>

      {groups.map(group => (
        <div className="filter-group" key={group.id}>
          {group.type === 'select' ? (
            <>
              <label htmlFor={`filter-${group.id}`} className="form-label">{group.label}</label>
              <select 
                id={`filter-${group.id}`} 
                className="form-select"
                value={(filters[group.id] as string) || ''}
                onChange={e => onFilterChange(group.id, e.target.value)}
              >
                <option value="">Toutes / Tous</option>
                {group.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <span className="form-label d-block">{group.label}</span>
              {group.options.map(opt => {
                const isChecked = Array.isArray(filters[group.id]) 
                  ? (filters[group.id] as string[]).includes(opt.value)
                  : false;
                
                return (
                  <div className="form-check" key={opt.value}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`filter-${group.id}-${opt.value}`}
                      checked={isChecked}
                      onChange={e => {
                        const current = (filters[group.id] as string[]) || [];
                        if (e.target.checked) {
                          onFilterChange(group.id, [...current, opt.value]);
                        } else {
                          onFilterChange(group.id, current.filter(v => v !== opt.value));
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={`filter-${group.id}-${opt.value}`}>
                      {opt.label}
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
