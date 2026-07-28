import CandidateSidebar from "@/components/CandidateSidebar/CandidateSidebar";
import { Link } from "react-router-dom";

export default function FicheCandidatPage() {
  return (
    <main id="contenu" className="candidate-main">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Espace candidat</p>
          <h1>Fiche « poste recherché »</h1>
          <p>
            Cette fiche structurée est consultable par les ONG via la recherche
            par mot-clé. Activez « je cherche activement » pour être visible.
          </p>
        </div>

        <div className="candidate-layout">
          <CandidateSidebar active="fiche" />

          <div className="candidate-content">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-block">
                    <h3>Ce que je recherche</h3>
                    <div className="mb-3">
                      <label htmlFor="p-titre" className="form-label">
                        Intitulé du poste recherché{" "}
                        <span className="req" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="p-titre"
                        name="titre"
                        className="form-control"
                        required
                        maxLength={120}
                        defaultValue="Chef de projet éducation"
                      />
                      <p className="form-text">
                        Court et explicite : c'est ce que les ONG verront en
                        premier.
                      </p>
                    </div>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="p-type" className="form-label">
                          Types d'engagement souhaités
                        </label>
                        <select
                          id="p-type"
                          name="p-type"
                          className="form-select"
                          multiple
                          size={4}
                          aria-describedby="p-type-help"
                          defaultValue={["Bénévolat", "Salariat"]}
                        >
                          <option>Bénévolat</option>
                          <option>Salariat</option>
                          <option>Freelance / consultance</option>
                          <option>Mandat de gouvernance</option>
                        </select>
                        <p id="p-type-help" className="form-text">
                          Maintenez Ctrl (Cmd) pour choisir plusieurs types.
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-niveau" className="form-label">
                          Niveau de poste
                        </label>
                        <select
                          id="p-niveau"
                          name="niveau"
                          className="form-select"
                          defaultValue="Confirmé"
                        >
                          <option>Junior</option>
                          <option>Confirmé</option>
                          <option>Expert</option>
                          <option>Mandat / gouvernance</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Causes et zones</h3>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="p-causes" className="form-label">
                          Causes préférées
                        </label>
                        <input
                          type="text"
                          id="p-causes"
                          name="causes"
                          className="form-control"
                          defaultValue="Éducation, Solidarité"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-exclues" className="form-label">
                          Causes exclues
                        </label>
                        <input
                          type="text"
                          id="p-exclues"
                          name="exclues"
                          className="form-control"
                          placeholder="Optionnel"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-geo" className="form-label">
                          Géographies recherchées
                        </label>
                        <input
                          type="text"
                          id="p-geo"
                          name="geo"
                          className="form-control"
                          defaultValue="Oran, Alger, à distance"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-mobilite" className="form-label">
                          Mobilité
                        </label>
                        <select
                          id="p-mobilite"
                          name="mobilite"
                          className="form-select"
                          defaultValue="Nationale"
                        >
                          <option>Locale</option>
                          <option>Nationale</option>
                          <option>Internationale</option>
                          <option>Terrain / missions</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Disponibilité</h3>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="p-volume" className="form-label">
                          Volume horaire
                        </label>
                        <select
                          id="p-volume"
                          name="volume"
                          className="form-select"
                          defaultValue="Temps partiel"
                        >
                          <option>Temps plein</option>
                          <option>Temps partiel</option>
                          <option>Occasionnel</option>
                          <option>Soirs et week-ends</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-tjm" className="form-label">
                          TJM minimum (freelance)
                        </label>
                        <div className="input-group">
                          <input
                            type="number"
                            id="p-tjm"
                            name="tjm"
                            className="form-control"
                            min={0}
                            step={10}
                            placeholder="0"
                          />
                          <span className="input-group-text">€ / jour</span>
                        </div>
                        <p className="form-text">
                          Laissez vide si vous ne cherchez pas de mission
                          facturée.
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="p-dispo" className="form-label">
                          Disponible à partir du{" "}
                          <span className="req" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          type="date"
                          id="p-dispo"
                          name="dispo"
                          className="form-control is-invalid"
                          aria-describedby="p-dispo-err"
                          required
                        />
                        <p id="p-dispo-err" className="field-error">
                          <i className="bi bi-exclamation-circle"></i> Veuillez
                          indiquer une date de disponibilité pour publier la
                          fiche.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Compétences</h3>
                    <div className="mb-3">
                      <label htmlFor="p-comp-valoriser" className="form-label">
                        Compétences à valoriser
                      </label>
                      <input
                        type="text"
                        id="p-comp-valoriser"
                        name="comp-valoriser"
                        className="form-control"
                        defaultValue="Gestion de projet, pédagogie, coordination"
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="p-comp-developper" className="form-label">
                        Compétences à développer
                      </label>
                      <input
                        type="text"
                        id="p-comp-developper"
                        name="comp-developper"
                        className="form-control"
                        placeholder="Ex. levée de fonds, suivi-évaluation"
                      />
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Visibilité et alertes</h3>
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="p-actif"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="p-actif">
                        Mode « je cherche activement » — ma fiche est visible
                        par les ONG
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="p-alerte"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="p-alerte">
                        Recevoir par e-mail les nouvelles offres correspondant à
                        cette fiche
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Enregistrer la fiche
                    </button>
                    <Link to="/" className="btn btn-subtle">
                      Annuler les modifications
                    </Link>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="notice notice-info">
                    <i className="bi bi-lightbulb"></i>
                    <div className="notice-body">
                      <h4>Conseil</h4>
                      <p>
                        Plus votre fiche est complète, plus vous apparaissez
                        dans les recherches par mot-clé des ONG. Les champs avec{" "}
                        <span className="req" aria-hidden="true">
                          *
                        </span>{" "}
                        sont obligatoires.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
