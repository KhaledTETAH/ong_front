import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnnuairePage } from './pages/AnnuairePage';
import { LoginPage } from './pages/LoginPage';
import { MecenatPage } from './pages/MecenatPage';
import { MissionsPage } from './pages/MissionsPage';
import { OffrePage } from './pages/OffrePage';
import { OrganizationPage } from './pages/OrganizationPage';
import { PortailPage } from './pages/PortailPage';

function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<PortailPage />} />
    <Route path="/connexion" element={<LoginPage />} />
    <Route path="/missions" element={<MissionsPage />} />
    <Route path="/missions/:slug" element={<OffrePage />} />
    <Route path="/annuaire" element={<AnnuairePage />} />
    <Route path="/annuaire/:slug" element={<OrganizationPage />} />
    <Route path="/mecenat" element={<MecenatPage />} />
  </Routes></BrowserRouter>;
}

export default App;