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
        src="../images/london-college-desktop.png"
        alt="Inicio del sitio del Colegio London"
        width={1200}
        quality={70}
        placeholder="dominantColor"
        formats={["auto", "webp", "avif"]}
      />
    )
  }
  if (slug === "lupulos") {
    return (
      <StaticImage
        src="../images/lupulos.jpg"
        alt="Captura de Lúpulos"
        width={1200}
        quality={70}
        placeholder="dominantColor"
        formats={["auto", "webp", "avif"]}
      />
    )
  }
  return (
    <StaticImage
      src="../images/vibratto.jpg"
      alt="Captura de Vibratto"
      width={1200}
      quality={70}
      placeholder="dominantColor"
      formats={["auto", "webp", "avif"]}
    />
  )
}

const FILTERS = [
  { id: "all", label: "Todos los casos" },
  { id: "institucional", label: "Institucional", match: "institucional" },
  { id: "comunidad", label: "Comunidad y nicho", match: "comunidad" },
  { id: "producto", label: "Producto web", match: "producto" },
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
          title="Sitios y productos que ya están en línea."
          lead="Tres piezas recientes. El Colegio London es el caso más cercano a un sitio de negocio. Los otros muestran un producto y una comunidad."
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
        description="Casos publicados: Colegio London, Lúpulos y Vibratto."
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
