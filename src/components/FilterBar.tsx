interface FilterBarProps {
  keyword?: string;
  location?: string;
  onFilter?: () => void;
}

export default function FilterBar({ keyword = '', location = '', onFilter }: FilterBarProps) {
  return (
    <div className="bg-white rounded-3 border p-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-5">
          <label className="form-label small fw-semibold text-dark mb-1">Mot-clé</label>
          <input
            type="text"
            className="form-control bg-light border-0"
            placeholder="Métier, compétence..."
            defaultValue={keyword}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label small fw-semibold text-dark mb-1">Lieu</label>
          <input
            type="text"
            className="form-control bg-light border-0"
            placeholder="Ville ou pays"
            defaultValue={location}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn w-100 text-white fw-medium"
            style={{ backgroundColor: '#0d5c5c' }}
            onClick={onFilter}
          >
            Affiner
          </button>
        </div>
      </div>
    </div>
  );
}