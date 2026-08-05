import { Users, ExternalLink, User } from 'lucide-react';
import { Container } from 'react-bootstrap';
export default function Header() {
  return (
    <header className="bg-white border-bottom  px-4 py-3 d-flex align-items-center justify-content-between sticky-top">
      <Container className='d-flex align-items-center justify-content-between sticky-top'>
      <div className="d-flex align-items-center gap-2">
        <div
          className="text-white p-2 rounded-3 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: '#0d5c5c' }}
        >
          <Users size={20} strokeWidth={2.5} />
        </div>
        <span className="fw-bold fs-5" style={{ color: '#0d5c5c' }}>
          Plateforme de l'engagement
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link text-muted text-decoration-none d-flex align-items-center gap-1 small p-0">
          <ExternalLink size={14} />
          Voir le site
        </button>

        <div className="d-flex align-items-center gap-2 ps-3 border-start">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle text-white"
            style={{ width: 32, height: 32, backgroundColor: '#0d5c5c' }}
          >
            <User size={16} />
          </div>
          <span className="small fw-medium text-dark">Yasmine B.</span>
        </div>

        <button className="btn btn-outline-secondary btn-sm">
          Déconnexion
        </button>
      </div>
      </Container>
    </header>
  );
}