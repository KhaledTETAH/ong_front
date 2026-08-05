import { Share2 } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import SkillsList from '../components/SkillsList';
import MissionTimeline from '../components/MissionTimeline';
import ConversationItem from '@/components/ConversationItem';
import Container from 'react-bootstrap/Container'
import SidebarNav from '../components/SidebarNav';

export default function PortfolioPage() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f5f5f0' }}>
      <Header />
<Container>
      <main className="container-fluid flex-grow-1 px-4 py-4">
        {/* Page header */}
        <div className="mb-4">
          <span
            className="fw-bold text-uppercase d-block mb-1"
            style={{ fontSize: '0.7rem', color: '#adb5bd', letterSpacing: '0.05em' }}
          >
            Espace Candidat
          </span>

          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
            <div>
              <h1 className="fw-bold text-dark display-6 mb-1">Portfolio d'engagement</h1>
              <p className="small text-muted mb-0">
                Vos missions vérifiées par les ONG bénéficiaires, avec heures, causes et
                compétences mobilisées.
              </p>
            </div>
            <button
              className="btn btn-sm text-white d-inline-flex align-items-center gap-2 flex-shrink-0"
              style={{ backgroundColor: '#0d5c5c' }}
            >
              <Share2 size={16} />
              Partager mon profil public
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 d-none d-lg-block">
            {/* <Sidebar /> */}
                        <SidebarNav  link="/portfolio"/>
            
          </div>

          <div className="col-lg-9">
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <StatsCard
                  label="Heures cumulées"
                  value="640 h"
                  sublabel="vérifiées par les ONG"
                />
              </div>
              <div className="col-md-4">
                <StatsCard
                  label="Missions accomplies"
                  value="3"
                  sublabel="2 causes soutenues"
                />
              </div>
              <div className="col-md-4">
                <StatsCard
                  label="Attestations"
                  value="3"
                  sublabel="PDF auto-générés"
                />
              </div>
            </div>

            <div className="mb-4">
              <SkillsList
                skills={[
                  'Coordination de projet',
                  'Pédagogie',
                  'Animation d\'équipe',
                  'Suivi-évaluation',
                  'Bilingue FR / AR',
                ]}
              />
            </div>

            <MissionTimeline />
          </div>
        </div>
      </main>
</Container>
      {/* Footer */}
      <footer className="px-4 py-3 text-left " style={{ backgroundColor: '#1B2A29' }}>
        <p className="small container  mb-0" style={{ fontSize: '0.65rem',color:'#cfd6d5' }}>
          Espace candidat — maquette HTML5/CSS3/Bootstrap 5, sans JavaScript.
          Vérification ONG et génération PDF à relier au backend.
        </p>
      </footer>
    </div>
  );
}