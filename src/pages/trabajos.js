import { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Crumbs, Layout, PageHead } from "../components/Layout"
import { JsonLd, Seo, useSite } from "../components/Seo"
import { breadcrumb, works } from "../data/site"

function Thumb({ slug }) {
  if (slug === "colegio-london") {
    return (
      <StaticImage
        src="../images/london-college-desktop.jpg"
        alt="Inicio del sitio del Colegio London"
        width={1200}
        quality={70}
        placeholder="dominantColor"
        formats={["auto", "webp", "avif"]}
      />
    )
  }
  if (slug === "vocestoons") {
    return (
      <StaticImage
        src="../images/vocestoons.jpg"
        alt="Inicio del sitio de VocesToons"
        width={1200}
        quality={70}
        placeholder="dominantColor"
        formats={["auto", "webp", "avif"]}
      />
    )
  }
  return null
}

const FILTERS = [
  { id: "all", label: "Todos los casos" },
  { id: "institucional", label: "Institucional", match: "institucional" },
  { id: "presentacion", label: "Presentación", match: "presentación" },
]

export default function Trabajos() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredWorks = works.filter((work) => {
    if (activeFilter === "all") return true
    const current = FILTERS.find((f) => f.id === activeFilter)
    if (!current?.match) return true
    return (
      work.kind.toLowerCase().includes(current.match) ||
      work.title.toLowerCase().includes(current.match)
    )
  })

  return (
    <Layout>
      <div className="wrap page-wrap">
        <Crumbs items={[{ label: "Inicio", to: "/" }, { label: "Trabajos" }]} />
        <PageHead
          eyebrow="Trabajos"
          title="Sitios que ya están en línea."
          lead="Dos piezas recientes: un sitio institucional para un colegio y un sitio de presentación para un estudio de voces."
        />

        {/* Interactive Filter Pills */}
        <div className="filter-bar" role="tablist" aria-label="Filtrar proyectos">
          <span className="filter-label">Filtrar por tipo:</span>
          <div className="filter-pills">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={`filter-pill ${activeFilter === filter.id ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="work-list">
          {filteredWorks.map((work, index) => (
            <Link
              className={index === 0 && activeFilter === "all" ? "work-row is-feature animate-fade-in" : "work-row animate-fade-in"}
              to={`/trabajos/${work.slug}`}
              key={work.slug}
            >
              <div className="work-copy">
                <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                <span className="kind">{work.kind} · {work.year}</span>
                <h2>{work.title}</h2>
                <p>{work.summary}</p>
              </div>
              <div className="work-media">
                <Thumb slug={work.slug} />
              </div>
            </Link>
          ))}
          {filteredWorks.length === 0 && (
            <div className="filter-empty">
              <p>No hay proyectos en esta categoría por el momento.</p>
              <button
                type="button"
                className="button ghost"
                onClick={() => setActiveFilter("all")}
              >
                Ver todos los trabajos
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export function Head() {
  const site = useSite()
  return (
    <>
      <Seo
        title="Trabajos"
        description="Casos publicados: Colegio London y VocesToons."
        pathname="/trabajos"
      />
      <JsonLd
        data={breadcrumb(site.siteUrl, [
          { name: "Inicio", path: "/" },
          { name: "Trabajos", path: "/trabajos" },
        ])}
      />
    </>
  )
}
