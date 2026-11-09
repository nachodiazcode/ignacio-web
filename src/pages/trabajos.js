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
        quality={75}
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
        quality={75}
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
      quality={75}
      placeholder="dominantColor"
      formats={["auto", "webp", "avif"]}
    />
  )
}

export default function Trabajos() {
  return (
    <Layout>
      <div className="wrap page-wrap">
        <Crumbs items={[{ label: "Inicio", to: "/" }, { label: "Trabajos" }]} />
        <PageHead
          eyebrow="Trabajos"
          title="Sitios y productos que ya están en línea."
          lead="Tres piezas recientes. El Colegio London es el caso más cercano a un sitio de negocio. Los otros muestran un producto y una comunidad."
        />
        <div className="work-list">
          {works.map((work, index) => (
            <Link
              className={index === 0 ? "work-row is-feature reveal" : "work-row reveal"}
              to={`/trabajos/${work.slug}`}
              key={work.slug}
            >
              <div className="work-copy">
                <div className="work-meta-top">
                  <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                  <span className="kind-badge">{work.kind} · {work.year}</span>
                </div>
                <h2>
                  <span>{work.title}</span>
                  <span className="work-arrow" aria-hidden="true">→</span>
                </h2>
                <p>{work.summary}</p>
              </div>
              <div className="work-media">
                <Thumb slug={work.slug} />
              </div>
            </Link>
          ))}
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
