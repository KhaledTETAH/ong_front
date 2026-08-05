import MissionItem from './MissionItem';

const missions = [
  {
    period: 'Janvier – juin 2025',
    hours: '240 h',
    title: 'Coordinatrice programme scolaire',
    org: 'Association Lumière d\'Oran',
    location: 'Oran, Algérie',
    description: 'Encadrement de 12 bénévoles et suivi de 3 écoles partenaires.',
    skills: ['Coordination', 'Pédagogie'],
    verified: true,
    hasAttestation: true,
  },
  {
    period: 'Septembre – décembre 2024',
    hours: '160 h',
    title: 'Formatrice bénévole — ateliers numériques',
    org: 'Fondation Horizon Solidaire',
    location: 'à distance',
    description: 'Animation d\'ateliers d\'initiation au numérique pour publics éloignés.',
    skills: ['Animation', 'Formation'],
    verified: true,
    hasAttestation: true,
  },
  {
    period: 'Mars – mai 2024',
    hours: '240 h',
    title: 'Chargée de suivi de projet',
    org: 'ONG Racines & Avenir',
    location: 'Casablanca, Maroc',
    description: 'Mise en place d\'indicateurs de suivi et reporting mensuel.',
    skills: ['Suivi-évaluation'],
    verified: true,
    hasAttestation: true,
  },
];

export default function MissionTimeline() {
  return (
    <div>
      <h3 className="fs-5 fw-bold text-dark mb-4">Missions réalisées</h3>
      <div className="position-relative" style={{ paddingLeft: 20 }}>
        {/* Vertical line */}
        <div
          className="position-absolute"
          style={{
            left: 5,
            top: 10,
            bottom: 0,
            width: 2,
            backgroundColor: '#dee2e6',
          }}
        />
        {missions.map((mission, idx) => (
          <MissionItem key={idx} {...mission} />
        ))}
      </div>
    </div>
  );
}