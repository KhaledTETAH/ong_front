import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";
import CandidateHeader from "../CandidateHeader/CandidateHeader";
import FullFooter from "../FullFooter/FullFooter";
import SimpleFooter from "../SimpleFooter/SimpleFooter";
import { Navbar } from "../Navbar/Navbar";

// Guards candidate-only routes: requires an authenticated candidate or redirects.
export function RequireCandidate() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (user.role !== "candidate") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

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
      <Navbar />

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
      <Navbar />

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
