import { useState } from 'react';

interface SearchBarProps {
  onSearch: (params: { q: string; location: string; type: string }) => void;
  defaultTypeOptions?: string[];
  placeholder?: string;
}

export function SearchBar({ onSearch, defaultTypeOptions = [], placeholder = 'Cause, compétence, intitulé…' }: SearchBarProps) {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ q, location, type });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Recherche">
      <div className="row g-2 align-items-end">
        <div className="col-md-5">
          <label htmlFor="q" className="form-label">Mot-clé</label>
          <input 
            type="search" 
            id="q" 
            name="q" 
            className="form-control" 
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={placeholder} 
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="location" className="form-label">Lieu</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            className="form-control" 
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Ville ou pays" 
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="type" className="form-label">Type</label>
          <select 
            id="type" 
            name="type" 
            className="form-select"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="">Tous</option>
            {defaultTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">Rechercher</button>
        </div>
      </div>
    </form>
  );
}
