// import { a } from 'wouter';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <a href="/" className="brand" style={{ color: '#fff' }}>
              <span className="brand-mark" aria-hidden="true"><i className="bi bi-people-fill"></i></span>
              Plateforme de l'engagement
            </a>
            <p className="mt-3 mb-0" style={{ maxWidth: '38ch' }}>
              Le point de rencontre du secteur associatif, humanitaire et philanthropique — de la France au Maghreb. Gratuit pour tous.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h4>Explorer</h4>
            <ul>
              <li><a href="/missions">Missions</a></li>
              <li><a href="/mecenat">Mécénat de compétences</a></li>
              <li><a href="/connexion">Se connecter</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h4>La plateforme</h4>
            <ul>
              <li><a href="/">À propos</a></li>
              <li><a href="/">Confiance & badges</a></li>
              <li><a href="/">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Zones couvertes</h4>
            <p className="mb-0" style={{ maxWidth: '34ch' }}>
              France · Belgique · Suisse · Algérie · Maroc · Tunisie. Service disponible en français.
            </p>
          </div>
        </div>
        <p className="footer-note mb-0">Maquette d'interface — React 19 + TypeScript. Toutes fonctionnalités implémentées.</p>
      </div>
    </footer>
  );
}
