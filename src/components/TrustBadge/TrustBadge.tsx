export function TrustBadge({ level }: { level: 'verified' | 'pending' }) {
  if (level === 'verified') {
    return (
      <span className="trust-badge">
        <i className="bi bi-patch-check-fill" aria-hidden="true"></i> Organisation vérifiée
      </span>
    );
  }
  return null;
}
