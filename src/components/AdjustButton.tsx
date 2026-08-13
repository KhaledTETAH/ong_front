import { SlidersHorizontal } from 'lucide-react';

export default function AdjustButton() {
  return (
    <button
      className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
      style={{ backgroundColor: '#fff', border: '1px solid #dee2e6' }}
    >
      <SlidersHorizontal size={16} style={{ color: '#0d5c5c' }} />
      <span className="small fw-medium" style={{ color: '#0d5c5c' }}>
        Ajuster ma fiche
      </span>
    </button>
  );
}