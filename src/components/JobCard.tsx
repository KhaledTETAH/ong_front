import { MapPin, Clock, Briefcase, Sparkles, Bookmark } from 'lucide-react';

interface JobCardProps {
  org: string;
  compatibility: number;
  title: string;
  highlight?: string;
  location: string;
  duration: string;
  contractType: string;
  isSaved: boolean;
  onApply: () => void;
  onToggleSave: () => void;
}

export default function JobCard({
  org,
  compatibility,
  title,
  highlight,
  location,
  duration,
  contractType,
  isSaved,
  onApply,
  onToggleSave,
}: JobCardProps) {
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          key={i}
          style={{ backgroundColor: '#fef3c7', padding: '0 3px', borderRadius: 3 }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white rounded-3 border p-4 h-100 d-flex flex-column">
      {/* Org + compatibility */}
      <div className="d-flex align-items-start justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <Briefcase size={14} className="text-muted" />
          <span className="small fw-semibold text-muted">{org}</span>
        </div>
        <span
          className="badge d-inline-flex align-items-center gap-1 fw-normal"
          style={{
            backgroundColor: '#e6f3f3',
            color: '#0d5c5c',
            fontSize: '0.75rem',
            padding: '0.4rem 0.6rem',
          }}
        >
          <Sparkles size={12} />
          {compatibility} % compatible
        </span>
      </div>

      {/* Title */}
      <h3 className="fs-6 fw-bold text-dark mb-3">{renderTitle()}</h3>

      {/* Meta */}
      <div className="d-flex flex-wrap gap-3 small text-muted mb-4">
        <div className="d-flex align-items-center gap-1">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <Clock size={14} />
          <span>{duration}</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <Briefcase size={14} />
          <span>{contractType}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-2 mt-auto">
        <button
          className="btn btn-sm text-white fw-medium px-3"
          style={{ backgroundColor: '#0d5c5c' }}
          onClick={onApply}
        >
          Postuler
        </button>
        <button
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 px-3"
          onClick={onToggleSave}
        >
          <Bookmark
            size={14}
            fill={isSaved ? '#0d5c5c' : 'none'}
            color={isSaved ? '#0d5c5c' : 'currentColor'}
          />
          <span>{isSaved ? 'Sauvegardée' : 'Sauvegarder'}</span>
        </button>
      </div>
    </div>
  );
}