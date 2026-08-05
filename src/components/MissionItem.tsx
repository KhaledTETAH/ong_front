import { CheckCircle, FileText, Building2 } from 'lucide-react';

interface MissionItemProps {
  period: string;
  hours: string;
  title: string;
  org: string;
  location: string;
  description: string;
  skills: string[];
  verified?: boolean;
  hasAttestation?: boolean;
}

export default function MissionItem({
  period,
  hours,
  title,
  org,
  location,
  description,
  skills,
  verified = true,
  hasAttestation = true,
}: MissionItemProps) {
  return (
    <div className="position-relative pb-4 ps-4">
      {/* Timeline dot */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 10,
          height: 10,
          backgroundColor: '#0d5c5c',
          left: -5,
          top: 6,
        }}
      />

      <div className="small text-muted mb-2">
        {period} · {hours}
      </div>

      <h4 className="fw-bold text-dark fs-6 mb-2">{title}</h4>

      <div className="d-flex align-items-center gap-1 small text-muted mb-2">
        <Building2 size={14} />
        <span>
          {org} — {location}
        </span>
      </div>

      <p className="small text-muted mb-3">{description}</p>

      <div className="d-flex flex-wrap gap-2 mb-3">
        {verified && (
          <span
            className="badge fw-normal d-inline-flex align-items-center gap-1"
            style={{
              backgroundColor: '#e6f3f3',
              color: '#0d5c5c',
              fontSize: '0.75rem',
              padding: '0.4rem 0.6rem',
            }}
          >
            <CheckCircle size={12} />
            Vérifiée par l'ONG
          </span>
        )}
        {hasAttestation && (
          <span
            className="badge fw-normal d-inline-flex align-items-center gap-1 border"
            style={{
              backgroundColor: '#fff',
              color: '#495057',
              fontSize: '0.75rem',
              padding: '0.4rem 0.6rem',
            }}
          >
            <FileText size={12} />
            Attestation PDF
          </span>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="badge fw-normal"
            style={{
              backgroundColor: '#e6f3f3',
              color: '#0d5c5c',
              fontSize: '0.75rem',
              padding: '0.4rem 0.6rem',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}