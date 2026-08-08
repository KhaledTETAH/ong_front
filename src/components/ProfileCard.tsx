import { CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/context/authStore';
export default function ProfileCard() {
      const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white rounded-3 border p-4 d-flex align-items-center gap-3">
      <div
        className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 flex-shrink-0"
        style={{ width: 56, height: 56, backgroundColor: '#0d5c5c' }}
      >
        YB
      </div>
      <div>
        <h3 className="fw-bold text-dark mb-0 fs-6">{user?.email}</h3>
        <div className="d-flex align-items-center gap-1 small text-muted mt-1">
          <CheckCircle size={12} style={{ color: '#0d5c5c' }} />
          <span>Profil expert</span>
        </div>
      </div>
    </div>
  );
}