interface SkillsListProps {
  skills: string[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="bg-white rounded-3 border p-4">
      <h3 className="fs-6 fw-semibold text-dark mb-3">Compétences mobilisées</h3>
      <div className="d-flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="badge fw-normal"
            style={{
              backgroundColor: '#e6f3f3',
              color: '#0d5c5c',
              fontSize: '0.8rem',
              padding: '0.5rem 0.75rem',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}