interface StatsCardProps {
  label: string;
  value: string;
  sublabel: string;
}

export default function StatsCard({ label, value, sublabel }: StatsCardProps) {
  return (
    <div className="bg-white rounded-3 border p-4 h-100">
      <p className="small text-muted mb-2">{label}</p>
      <h2 className="fw-bold mb-1" style={{ color: '#0d5c5c', fontSize: '2rem' }}>
        {value}
      </h2>
      <p className="small text-muted mb-0">{sublabel}</p>
    </div>
  );
}