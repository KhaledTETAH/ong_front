import { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { useSubmitMecenat } from '@/hooks/useMecenat';
// import { Link } from 'wouter';

export function MecenatPage() {
  const submitMecenat = useSubmitMecenat();
  
  const [formData, setFormData] = useState({
    contactEmail: '',
    company: '',
    contactName: '',
    siret: '',
    missionTitle: '',
    description: '',
    duration: '',
    visibility: 'Libre (toutes les ONG vérifiées)'
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMecenat.mutate({
      company: formData.company,
      contactName: formData.contactName || formData.contactEmail,
      contactEmail: formData.contactEmail,
      missionTitle: formData.missionTitle,
      description: formData.description,
      skills: '',
      duration: formData.duration,
      format: 'Présentiel',
    }, {
      onSuccess: () => setSubmitted(true)
    });
  };

  return (
    <>
      <Navbar />
      
      <main>
        <section className="mecenat-hero" aria-labelledby="mecenat-title">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="eyebrow mecenat-eyebrow">Tunnel mécénat de compétences</p>
                <h1 id="mecenat-title">Mettez vos compétences au service de l'intérêt général</h1>
                <p className="mecenat-lead">
                  Proposez une mission ou des profils de collaborateurs, sans créer de compte multi-utilisateurs.
                  Chaque mission est rattachée à un référent unique qui suit la convention et l'attestation fiscale.
                </p>
                <a href="#depot" className="btn btn-accent btn-lg">Déposer une mission</a>
              </div>
              <div className="col-lg-5">
                <div className="card mecenat-figures">
                  <div className="mecenat-figure">
                    <i className="bi bi-clock-history" aria-hidden="true"></i>
                    <div><span className="fig-value">Jours-homme</span><span className="fig-label">valorisés automatiquement</span></div>
                  </div>
                  <div className="mecenat-figure">
                    <i className="bi bi-receipt" aria-hidden="true"></i>
                    <div><span className="fig-value">Déduction fiscale</span><span className="fig-label">calculée à la mission</span></div>
                  </div>
                  <div className="mecenat-figure">
                    <i className="bi bi-shield-check" aria-hidden="true"></i>
                    <div><span className="fig-value">ONG vérifiées</span><span className="fig-label">avant mise en relation</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="app-section" aria-labelledby="etapes-title">
          <div className="container">
            <div className="section-head text-center">
              <h2 id="etapes-title">Comment ça marche</h2>
              <p className="mx-auto">Un parcours léger en quatre temps, sans onboarding lourd.</p>
            </div>
            <ol className="steps">
              <li className="step">
                <span className="step-num">1</span>
                <h3>Décrivez</h3>
                <p className="text-soft">Votre mission ou vos profils de collaborateurs : objectifs, livrables, durée, causes.</p>
              </li>
              <li className="step">
                <span className="step-num">2</span>
                <h3>Ciblez</h3>
                <p className="text-soft">Laissez la mission en libre accès ou choisissez les ONG vérifiées destinataires.</p>
              </li>
              <li className="step">
                <span className="step-num">3</span>
                <h3>Suivez</h3>
                <p className="text-soft">La convention, la feuille de temps mensuelle et l'avancement, via un référent unique.</p>
              </li>
              <li className="step">
                <span className="step-num">4</span>
                <h3>Recevez</h3>
                <p className="text-soft">L'attestation fiscale annuelle et le reporting d'impact, exportables en PDF.</p>
              </li>
            </ol>
          </div>
        </section>

        <section id="depot" className="app-section section-tinted" aria-labelledby="depot-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Sans compte à créer</p>
              <h2 id="depot-title">Déposer une mission de mécénat</h2>
              <p>Vérification simple par e-mail professionnel. Vous accédez directement au formulaire.</p>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                {submitted ? (
                  <div className="notice notice-success">
                    <i className="bi bi-check-circle-fill"></i>
                    <div className="notice-body">
                      <h4>Mission déposée avec succès !</h4>
                      <p>Nous avons bien reçu votre proposition. Notre équipe reviendra vers vous très prochainement sur l'adresse {formData.contactEmail}.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-block">
                      <h3>Référent de la mission</h3>
                      <div className="mb-3">
                        <label htmlFor="me-email" className="form-label">E-mail professionnel <span className="req" aria-hidden="true">*</span></label>
                        <input 
                          type="email" id="me-email" className="form-control" required placeholder="prenom.nom@entreprise.com"
                          value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                        />
                        <p className="form-text">Vérification simple par e-mail — aucun compte multi-utilisateurs.</p>
                      </div>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <label htmlFor="me-raison" className="form-label">Raison sociale <span className="req" aria-hidden="true">*</span></label>
                          <input 
                            type="text" id="me-raison" className="form-control" required
                            value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="me-siret" className="form-label">Identifiant légal</label>
                          <input 
                            type="text" id="me-siret" className="form-control" placeholder="SIREN / RC (optionnel)"
                            value={formData.siret} onChange={e => setFormData({...formData, siret: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-block">
                      <h3>La mission</h3>
                      <div className="mb-3">
                        <label htmlFor="me-titre" className="form-label">Intitulé de la mission <span className="req" aria-hidden="true">*</span></label>
                        <input 
                          type="text" id="me-titre" className="form-control" required placeholder="Ex. Accompagnement à la transformation numérique"
                          value={formData.missionTitle} onChange={e => setFormData({...formData, missionTitle: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="me-desc" className="form-label">Objectifs et livrables</label>
                        <textarea 
                          id="me-desc" className="form-control" rows={3} placeholder="Objectifs attendus, livrables, profils requis…"
                          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                      </div>
                      <div className="row g-3">
                        <div className="col-sm-4">
                          <label htmlFor="me-jours" className="form-label">Jours-homme</label>
                          <input 
                            type="number" id="me-jours" className="form-control" min="1" placeholder="10"
                            value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                          />
                        </div>
                        <div className="col-sm-8">
                          <label htmlFor="me-visibilite" className="form-label">Visibilité</label>
                          <select 
                            id="me-visibilite" className="form-select"
                            value={formData.visibility} onChange={e => setFormData({...formData, visibility: e.target.value})}
                          >
                            <option>Libre (toutes les ONG vérifiées)</option>
                            <option>Ciblée (ONG choisies)</option>
                            <option>Confidentielle</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-accent" disabled={submitMecenat.isPending}>
                        {submitMecenat.isPending ? 'Envoi...' : 'Déposer la mission'}
                      </button>
                      <a href="/" className="btn btn-subtle">Annuler</a>
                    </div>
                  </form>
                )}
              </div>

              <div className="col-lg-4">
                <div className="notice notice-info">
                  <i className="bi bi-calculator"></i>
                  <div className="notice-body">
                    <h4>Déduction fiscale</h4>
                    <p>La valorisation et la déduction prévisionnelle sont calculées à la mission, à partir des jours-homme déclarés.</p>
                  </div>
                </div>
                
                {/* FAQ section as requested by instructions */}
                <div className="mt-4">
                  <h3 className="h6 mb-3">Questions fréquentes</h3>
                  <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                          Dois-je créer un compte ?
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          Non, le dépôt se fait via votre e-mail professionnel. Un lien unique de suivi vous sera envoyé.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                          Les ONG sont-elles vérifiées ?
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          Absolument, toutes les organisations présentes ont fait l'objet d'une vérification légale avant publication.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
