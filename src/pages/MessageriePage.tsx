import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import Container from 'react-bootstrap/Container'
import SidebarNav from '../components/SidebarNav';
import {useState} from 'react'
import { Navbar } from '@/components/Navbar/Navbar';

export default function MessageriePage() {
    const [selectedId, setSelectedId] = useState<string >("21d60cbe-2356-4391-a32e-51ef21d3c74b");
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f5f5f0' }}>
<Navbar/>
<Container>
      <main className="container-fluid flex-grow-1 px-4 py-4">
        <div className="mb-4">
          <span
            className="fw-bold text-uppercase d-block mb-1"
            style={{ fontSize: '0.7rem', color: '#adb5bd', letterSpacing: '0.05em' }}
          >
            Espace Candidat
          </span>
          <h1 className="fw-bold text-dark display-6 mb-1">Messagerie</h1>
          <p className="small text-muted mb-0">
            Vos échanges avec les organisations, rattachés à chaque candidature.
          </p>
        </div>

        <div
          className="row g-4"
          style={{ minHeight: 500, height: 'calc(100vh - 220px)' }}
        >
          <div className="col-lg-3 d-none d-lg-block">
            {/* <Sidebar /> */}
            <SidebarNav  link="/messagerie"/>
          </div>
          <div className="col-lg-3">
            <ConversationList selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="col-lg-6">
            <ChatWindow  conversationId={selectedId} />
          </div>
        </div>
      </main></Container>

      <footer className="px-4 py-3  text-left" style={{ backgroundColor: '#1B2A29' }}>
        <p className="small container mb-0 " style={{ fontSize: '0.65rem', color:'#cfd6d5' }}>
          Espace candidat — maquette HTML5/CSS3/Bootstrap 5, sans JavaScript. Envoi de messages et pièces jointes à relier au backend.
        </p>
      </footer>
    </div>
  );
}