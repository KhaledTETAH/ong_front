import { Bell } from 'lucide-react';

export default function AlertCTA() {
  return (
    <div
      className="bg-white rounded-3 p-5 text-center"
      style={{ border: '1px dashed #dee2e6' }}
    >
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
        style={{ width: 48, height: 48, backgroundColor: '#e6f3f3' }}
      >
        <Bell size={20} style={{ color: '#0d5c5c' }} />
      </div>
      <h3 className="fs-6 fw-bold text-dark mb-2">Envie d'aller plus loin ?</h3>
      <p className="small text-muted mb-3 mx-auto" style={{ maxWidth: 400 }}>
        Créez une alerte pour être prévenu par e-mail dès qu'une nouvelle offre correspond à votre fiche.
      </p>
      <button
        className="btn btn-outline-secondary btn-sm fw-medium"
        style={{ borderColor: '#dee2e6' }}
      >
        Créer une alerte e-mail
      </button>
    </div>
  );
}