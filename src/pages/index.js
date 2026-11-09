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
        width={1100}
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
      width={1100}
      quality={70}
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
            <StaticImage
              src="../images/ignacio.jpg"
              alt="Ignacio Díaz"
              width={760}
              quality={74}
              placeholder="blurred"
              loading="eager"
              imgStyle={{ objectPosition: "center 12%" }}
              formats={["auto", "webp", "avif"]}
            />
            <figcaption>
              <span>Ignacio Díaz</span>
              <span>Disponible</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap">
        <section className="facts" aria-label="Qué incluye siempre">
          {guarantees.map((item, index) => (
            <article className="fact" key={item.title}>
              <span className="idx">{String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="section" aria-labelledby="trabajos-titulo">
          <div className="section-head">
            <h2 id="trabajos-titulo">Trabajos publicados</h2>
            <Link to="/trabajos">Todos los casos</Link>
          </div>
          <div className="work-list">
            {works.map((work, index) => (
              <Link className={index === 0 ? "work-row is-feature" : "work-row"} to={`/trabajos/${work.slug}`} key={work.slug}>
                <div className="work-copy">
                  <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                  <span className="kind">{work.kind}</span>
                  <h3>{work.title}</h3>
                  <p>{work.summary}</p>
                </div>
                <div className="work-media">
                  <WorkThumb slug={work.slug} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="servicios-titulo">
          <div className="section-head">
            <h2 id="servicios-titulo">Tres formas de encargarlo</h2>
            <Link to="/servicios">Ver qué incluye</Link>
          </div>
          <div className="service-row">
            {services.map((service, index) => (
              <article className="service" key={service.id}>
                <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <Link to={`/servicios#${service.id}`}>Ver el encargo</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="proceso-titulo">
          <div className="section-head">
            <h2 id="proceso-titulo">Cómo se contrata</h2>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <article className="step" key={step.title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="preguntas-titulo">
          <div className="section-head">
            <h2 id="preguntas-titulo">Antes de escribir</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <section className="band">
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
