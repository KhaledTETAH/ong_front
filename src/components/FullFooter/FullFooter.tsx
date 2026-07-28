import { Link } from "react-router-dom";
import "./FullFooter.css";

export default function FullFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <Link to="/ong-profil" className="brand" style={{ color: "#fff" }}>
              <span className="brand-mark" aria-hidden="true">
                <i className="bi bi-people-fill"></i>
              </span>
              <span className="ml-4">Plateforme de l'engagement</span>
            </Link>
            <p className="mt-3 mb-0" style={{ maxWidth: "40ch" }}>
              Gratuit pour tous. France · Belgique · Suisse · Algérie · Maroc ·
              Tunisie.
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h4>Explorer</h4>
            <ul>
              <li>
                <a href="#">Missions</a>
              </li>
              <li>
                <a href="#">Annuaire des ONG</a>
              </li>
              <li>
                <a href="#">Mécénat</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h4>La plateforme</h4>
            <ul>
              <li>
                <a href="#">À propos</a>
              </li>
              <li>
                <a href="#">Confiance &amp; badges</a>
              </li>
              <li>
                <a href="#">Se connecter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
