import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/" className="brand" style={{ color: '#fff' }}>
              <span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill"></i></span>
              Plateforme de l'engagement
            </Link>
            <p className="mt-3 mb-0" style={{ maxWidth: '38ch' }}>
              Le point de rencontre du secteur associatif, humanitaire et philanthropique — de la France au Maghreb. Gratuit pour tous.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h4>Explorer</h4>
            <ul>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/mecenat">Mécénat de compétences</Link></li>
              <li><Link to="/connexion">Se connecter</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h4>La plateforme</h4>
            <ul>
              <li><Link to="/">À propos</Link></li>
              <li><Link to="/">Confiance & badges</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Zones couvertes</h4>
            <p className="mb-0" style={{ maxWidth: '34ch' }}>
              France · Belgique · Suisse · Algérie · Maroc · Tunisie. Service disponible en français.
            </p>
          </div>
        </div>
    
      </div>
    </footer>
  );
}
