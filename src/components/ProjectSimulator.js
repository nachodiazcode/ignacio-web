import { useState } from "react"
import { Link } from "gatsby"
import { services } from "../data/site"

export function ProjectSimulator() {
  const [selectedId, setSelectedId] = useState("presentacion")
  const [hasContent, setHasContent] = useState(true)

  const activeService = services.find((s) => s.id === selectedId) || services[1]

  const adjustedTime = hasContent
    ? activeService.time
    : `${activeService.time} (+ 1 semana si trabajamos los textos juntos)`

  return (
    <section className="section simulator-section" aria-labelledby="simulador-titulo">
      <div className="section-head">
        <div>
          <span className="simulator-kicker">Herramienta interactiva</span>
          <h2 id="simulador-titulo">Calcula y simula tu proyecto</h2>
        </div>
        <p className="simulator-lead">
          Selecciona el formato que buscas para ver qué incluye, plazos y cómo se entrega.
        </p>
      </div>

      <div className="simulator-box">
        {/* Step 1: Selector de tipo de sitio */}
        <div className="simulator-controls">
          <label className="sim-control-label">1. Elige el tipo de sitio:</label>
          <div className="sim-buttons-grid" role="tablist">
            {services.map((srv) => (
              <button
                key={srv.id}
                type="button"
                role="tab"
                aria-selected={selectedId === srv.id}
                className={`sim-btn ${selectedId === srv.id ? "is-active" : ""}`}
                onClick={() => setSelectedId(srv.id)}
              >
                <span className="sim-btn-name">{srv.name}</span>
                <span className="sim-btn-sub">
                  {srv.id === "landing" && "1 página directa"}
                  {srv.id === "presentacion" && "Multi-página institucional"}
                  {srv.id === "editable" && "Con panel autoadministrable"}
                </span>
              </button>
            ))}
          </div>

          {/* Step 2: Toggle textos */}
          <div className="sim-toggle-wrap">
            <span className="sim-control-label">2. ¿Tienes los textos y fotos listos?</span>
            <div className="sim-switch">
              <button
                type="button"
                className={`sim-pill ${hasContent ? "is-active" : ""}`}
                onClick={() => setHasContent(true)}
              >
                ✓ Sí, los tengo
              </button>
              <button
                type="button"
                className={`sim-pill ${!hasContent ? "is-active" : ""}`}
                onClick={() => setHasContent(false)}
              >
                ✍️ Necesito ayuda armándolos
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Result Panel */}
        <div className="simulator-display">
          <div className="sim-header">
            <div className="sim-meta">
              <span className="sim-tag">Formato seleccionado</span>
              <h3 className="sim-title">{activeService.name}</h3>
              <p className="sim-for">{activeService.forWhom}</p>
            </div>
            <div className="sim-time-badge">
              <span className="sim-time-label">Plazo estimado</span>
              <strong className="sim-time-value">{adjustedTime}</strong>
            </div>
          </div>

          <div className="sim-body">
            <p className="sim-summary">{activeService.summary}</p>
            <div className="sim-features">
              <h4>Qué incluye siempre:</h4>
              <ul className="sim-list">
                {activeService.includes.map((inc) => (
                  <li key={inc}>
                    <span className="sim-check" aria-hidden="true">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="sim-excludes">
              <strong>Límite claro:</strong> {activeService.excludes}
            </p>
          </div>

          <div className="sim-footer">
            <Link
              to={`/contacto?tipo=${encodeURIComponent(activeService.name)}&textos=${hasContent ? "si" : "no"}`}
              className="button"
            >
              Pedir este encargo por escrito →
            </Link>
            <span className="sim-hint">
              Alcance, plazo y precio quedan sellados antes de empezar.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
