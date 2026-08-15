import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CandidateLayout,
  PublicLayout,
  RequireCandidate,
} from "@/components/Layout/Layout";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

// Pages 1-6 (rafa) — self-contained public pages
import { AnnuairePage } from "./pages/AnnuairePage";
import { LoginPage } from "./pages/LoginPage";
import { MecenatPage } from "./pages/MecenatPage";
import { MissionsPage } from "./pages/MissionsPage";
import { OffrePage } from "./pages/OffrePage";
import { PortailPage } from "./pages/PortailPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SponsorshipTrackingPage } from "./pages/SponsorshipTrackingPage";

// Pages 7-9 (anis) — layout-wrapped pages
import EspaceCandidatPage from "./pages/EspaceCandidatPage";
import OngProfilePage from "./pages/OngProfilePage";
import FicheCandidatPage from "./pages/FicheCandidatPage";

export default function App() {
  useAuthBootstrap();
  return (
    <BrowserRouter>
      <Routes>
        {/* --- public pages (self-contained header/footer) --- */}
        <Route path="/" element={<PortailPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/missions/:slug" element={<OffrePage />} />
        <Route path="/annuaire" element={<AnnuairePage />} />
        <Route path="/mecenat" element={<MecenatPage />} />
        <Route path="/mecenat/suivi" element={<SponsorshipTrackingPage />} />

        {/* --- pages using the shared public layout --- */}
        <Route element={<PublicLayout />}>
          <Route path="/annuaire/:slug" element={<OngProfilePage />} />
        </Route>

        {/* --- candidate routes (auth-guarded) --- */}
        <Route element={<RequireCandidate />}>
          <Route element={<CandidateLayout />}>
            <Route path="/candidat/espace" element={<EspaceCandidatPage />} />
            <Route path="/candidat/fiche" element={<FicheCandidatPage />} />
          </Route>
        </Route>

        {/* --- fallback --- */}
        <Route path="*" element={<div>404 - Page non trouvée</div>} />
      </Routes>
    </BrowserRouter>
  );
}
