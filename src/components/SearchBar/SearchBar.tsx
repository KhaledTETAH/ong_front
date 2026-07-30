import { useState } from 'react';

export interface SearchOption { label: string; value: string; }

interface SearchBarProps {
  onSearch: (params: { q: string; location: string; type: string }) => void;
  defaultTypeOptions?: SearchOption[];
  placeholder?: string;
}

export function SearchBar({ onSearch, defaultTypeOptions = [], placeholder = 'Cause, compétence, intitulé…' }: SearchBarProps) {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  return (
    <form className="search-bar" onSubmit={(event) => { event.preventDefault(); onSearch({ q, location, type }); }} role="search" aria-label="Recherche">
      <div className="row g-2 align-items-end">
        <div className="col-md-5"><label htmlFor="q" className="form-label">Mot-clé</label><input type="search" id="q" className="form-control" value={q} onChange={(event) => setQ(event.target.value)} placeholder={placeholder} /></div>
        <div className="col-md-3"><label htmlFor="location" className="form-label">Lieu</label><input type="text" id="location" className="form-control" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Ville" /></div>
        <div className="col-md-2"><label htmlFor="type" className="form-label">Type</label><select id="type" className="form-select" value={type} onChange={(event) => setType(event.target.value)}><option value="">Tous</option>{defaultTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
        <div className="col-md-2 d-grid"><button type="submit" className="btn btn-primary">Rechercher</button></div>
      </div>
    </form>
  );
}