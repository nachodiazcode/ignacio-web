import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Layout } from "../components/Layout"
import { JsonLd, Seo, useSite } from "../components/Seo"
import { faqs, guarantees, homeSchema, services, steps, works } from "../data/site"

function WorkThumb({ slug }) {
  if (slug === "colegio-london") {
    return (
      <StaticImage
        src="../images/london-college-desktop.png"
        alt="Inicio del sitio del Colegio London"
        width={1100}
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
        width={1100}
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
      width={1100}
      quality={75}
      placeholder="dominantColor"
      formats={["auto", "webp", "avif"]}
    />
  )
}

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span>Santiago</span>
              <span className="kicker-line" aria-hidden="true" />
              <span>Diseño y desarrollo</span>
              <span className="status-badge" title="Disponible para nuevos proyectos">
                <span className="status-dot" aria-hidden="true" />
                <span className="status-text">Disponible</span>
              </span>
            </p>
            <h1>
              <span>Sitios web</span>
              <span>para negocios</span>
              <em>que tienen que funcionar.</em>
            </h1>
            <p className="lead">
              Los armo de punta a punta: cómo se ven, cómo cargan y cómo se encuentran.
              Antes de empezar dejo por escrito el alcance, el plazo y el precio.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/contacto">Cuéntame el proyecto</Link>
              <Link className="button ghost" to="/trabajos">Ver trabajos</Link>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-wrap">
              <StaticImage
                src="../images/ignacio.jpg"
                alt="Ignacio Díaz"
                width={760}
                quality={78}
                placeholder="blurred"
                loading="eager"
                imgStyle={{ objectPosition: "center 12%" }}
                formats={["auto", "webp", "avif"]}
              />
            </div>
            <figcaption>
              <span>Ignacio Díaz</span>
              <span>Santiago · Remoto</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap">
        <section className="facts reveal-stagger" aria-label="Qué incluye siempre">
          {guarantees.map((item, index) => (
            <article className="fact reveal" key={item.title}>
              <span className="idx">{String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="section reveal" aria-labelledby="trabajos-titulo">
          <div className="section-head">
            <h2 id="trabajos-titulo">Trabajos publicados</h2>
            <Link to="/trabajos" className="arrow-link">
              <span>Todos los casos</span>
              <span className="arrow-char" aria-hidden="true">→</span>
            </Link>
          </div>
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
                    <span className="kind-badge">{work.kind}</span>
                  </div>
                  <h3>
                    <span>{work.title}</span>
                    <span className="work-arrow" aria-hidden="true">→</span>
                  </h3>
                  <p>{work.summary}</p>
                </div>
                <div className="work-media">
                  <WorkThumb slug={work.slug} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section reveal" aria-labelledby="servicios-titulo">
          <div className="section-head">
            <h2 id="servicios-titulo">Tres formas de encargarlo</h2>
            <Link to="/servicios" className="arrow-link">
              <span>Ver qué incluye</span>
              <span className="arrow-char" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="service-row reveal-stagger">
            {services.map((service, index) => (
              <article className="service reveal" key={service.id}>
                <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <Link to={`/servicios#${service.id}`} className="service-link">
                  <span>Ver el encargo</span>
                  <span className="arrow-char" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" aria-labelledby="proceso-titulo">
          <div className="section-head">
            <h2 id="proceso-titulo">Cómo se contrata</h2>
          </div>
          <div className="steps reveal-stagger">
            {steps.map((step, index) => (
              <article className="step reveal" key={step.title}>
                <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" aria-labelledby="preguntas-titulo">
          <div className="section-head">
            <h2 id="preguntas-titulo">Antes de escribir</h2>
          </div>
          <div className="faq-list reveal-stagger">
            {faqs.map((item) => (
              <details className="faq reveal" key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <div className="faq-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="band reveal">
        <div className="wrap closing">
          <div>
            <p className="eyebrow">Siguiente paso</p>
            <h2>Cuéntame qué tiene que lograr el sitio.</h2>
          </div>
          <div className="closing-actions">
            <Link className="button" to="/contacto">Escribir</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export function Head() {
  const site = useSite()
  return (
    <>
      <Seo
        title="Ignacio Díaz · Sitios web a medida en Santiago"
        description="Diseño y desarrollo de sitios web para negocios. Alcance, plazo y precio por escrito. Trabajo directo desde Santiago de Chile."
        pathname="/"
      />
      <JsonLd data={homeSchema(site.siteUrl)} />
    </>
  )
}
