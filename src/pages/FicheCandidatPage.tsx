import { Link } from "react-router-dom";
import CandidateSidebar from "@/components/CandidateSidebar/CandidateSidebar";
import type { DesiredPosition } from "@/types/candidat";
import { useDesiredPosition, useUpdateDesiredPosition } from "@/hooks/useCandidat";

const ENGAGEMENT_OPTIONS = [
  { value: "volunteering", label: "Bénévolat" },
  { value: "salaried", label: "Salariat" },
  { value: "freelance", label: "Freelance / consultance" },
  { value: "mandate", label: "Mandat de gouvernance" },
] as const;

const LEVEL_OPTIONS = [
  { value: "junior", label: "Junior" },
  { value: "confirmed", label: "Confirmé" },
  { value: "expert", label: "Expert" },
  { value: "mandate", label: "Mandat / gouvernance" },
] as const;

const MOBILITY_OPTIONS = [
  { value: "local", label: "Locale" },
  { value: "national", label: "Nationale" },
  { value: "international", label: "Internationale" },
  { value: "field", label: "Terrain / missions" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: "full_time", label: "Temps plein" },
  { value: "part_time", label: "Temps partiel" },
  { value: "occasional", label: "Occasionnel" },
  { value: "evenings", label: "Soirs et week-ends" },
] as const;

export default function FicheCandidatPage() {
  const { data, isLoading, isError } = useDesiredPosition();
  const update = useUpdateDesiredPosition();

  if (isLoading) return <p>Chargement...</p>;
  if (isError)
    return <p>Erreur : la fiche n'a pas pu être chargée</p>;
  if (!data) return null;

  const fiche = data;

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                update.mutate({
                  position_title: String(form.get("titre") ?? ""),
                  engagement_types: form.getAll("engagement")
                    .map(String) as DesiredPosition["engagement_types"],
                  position_level: String(form.get("niveau") ?? "") as DesiredPosition["position_level"],
                  mobility: String(form.get("mobilite") ?? "") as DesiredPosition["mobility"],
                  availability: String(form.get("volume") ?? "") as DesiredPosition["availability"],
                  min_daily_rate: form.get("tjm")
                    ? Number(form.get("tjm"))
                    : null,
                  available_from: form.get("dispo")
                    ? String(form.get("dispo"))
                    : null,
                  email_alerts: form.get("alerte") === "on",
                });
              }}
            >
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
                        defaultValue={fiche.position_title}
                      />
                      <p className="form-text">
                        Court et explicite : c'est ce que les ONG verront en
                        premier.
                      </p>
                    </div>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label">
                          Types d'engagement souhaités
                        </label>
                        <select
                          name="engagement"
                          className="form-select"
                          multiple
                          size={4}
                          required
                        >
                          {ENGAGEMENT_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              selected={fiche.engagement_types.includes(opt.value)}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Niveau de poste</label>
                        <select name="niveau" className="form-select">
                          {LEVEL_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              selected={fiche.position_level === opt.value}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Zones et disponibilité</h3>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label">Mobilité</label>
                        <select name="mobilite" className="form-select">
                          {MOBILITY_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              selected={fiche.mobility === opt.value}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Volume horaire</label>
                        <select name="volume" className="form-select">
                          {AVAILABILITY_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              selected={fiche.availability === opt.value}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">
                          TJM minimum (freelance)
                        </label>
                        <div className="input-group">
                          <input
                            type="number"
                            name="tjm"
                            className="form-control"
                            min={0}
                            step={10}
                            placeholder="0"
                            defaultValue={fiche.min_daily_rate ?? 0}
                          />
                          <span className="input-group-text">€ / jour</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">
                          Disponible à partir du{" "}
                          <span className="req" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          type="date"
                          name="dispo"
                          className="form-control"
                          required
                          defaultValue={fiche.available_from ?? ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <h3>Visibilité et alertes</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="p-alerte"
                        name="alerte"
                        defaultChecked={fiche.email_alerts}
                      />
                      <label className="form-check-label" htmlFor="p-alerte">
                        Recevoir par e-mail les nouvelles offres correspondant à
                        cette fiche
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      {update.isPending
                        ? "Enregistrement..."
                        : "Enregistrer la fiche"}
                    </button>
                    <Link to="/" className="btn btn-subtle">
                      Annuler les modifications
                    </Link>
                  </div>
                  {update.isError && (
                    <p className="text-danger mt-2">
                      Une erreur est survenue lors de l'enregistrement.
                    </p>
                  )}
                  {update.isSuccess && (
                    <p className="text-success mt-2">Fiche enregistrée.</p>
                  )}
                </div>

                <div className="col-lg-4">
                  <div className="notice notice-info">
                    <i className="bi bi-lightbulb"></i>
                    <div className="notice-body">
                      <h4>Conseil</h4>
                      <p>
                        Plus votre fiche est complète, plus vous apparaissez
                        dans les recherches par mot-clé des ONG.
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