import { Outlet } from "react-router-dom";
import CandidateHeader from "../CandidateHeader/CandidateHeader";
import FullFooter from "../FullFooter/FullFooter";
import SimpleFooter from "../SimpleFooter/SimpleFooter";
import PublicHeader from "../PublicHeader/PublicHeader";

// Candidate Dashboard Layout
export function CandidateLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CandidateHeader />
      <Outlet />
      <FullFooter />
    </div>
  );
}

// Public layout
export function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PublicHeader />

      <main className="grow">
        <Outlet />
      </main>

      <FullFooter />
    </div>
  );
}

// Auth layout
export function AuthLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PublicHeader />

      <main className="grow d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <SimpleFooter note="© 2026 Plateforme de l'engagement — Maquette d'interface." />
    </div>
  );
}
