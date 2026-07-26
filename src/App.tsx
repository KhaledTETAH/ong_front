import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PortailPage } from './pages/PortailPage'
import { LoginPage } from './pages/LoginPage'
import { MissionsPage } from './pages/MissionsPage'
import { AnnuairePage } from './pages/AnnuairePage'
import { MecenatPage } from './pages/MecenatPage'
import { OffrePage } from './pages/OffrePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortailPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/missions/:id" element={<OffrePage />} />
        <Route path="/annuaire" element={<AnnuairePage />} />
        <Route path="/mecenat" element={<MecenatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App