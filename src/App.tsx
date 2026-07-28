import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CandidateLayout,
  PublicLayout,
  AuthLayout,
} from "@/components/Layout/Layout";
import EspaceCandidatPage from "./pages/EspaceCandidatPage";
import OngProfilePage from "./pages/ONGProfilePage";
import FicheCandidatPage from "./pages/FicheCandidatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- public routes --- */}
        <Route element={<PublicLayout />}>
          <Route path="/ong-profile/:id" element={<OngProfilePage />} />
        </Route>

        {/* --- auth routes --- */}
        <Route element={<AuthLayout />}></Route>

        {/* --- candidate routes --- */}
        <Route element={<CandidateLayout />}>
          <Route path="/candidat/espace" element={<EspaceCandidatPage />} />
          <Route path="/candidat/fiche" element={<FicheCandidatPage />} />
        </Route>

        {/* --- fallback --- */}
        <Route path="*" element={<div>404 - Page non trouvée</div>} />
      </Routes>
    </BrowserRouter>
  );
}
