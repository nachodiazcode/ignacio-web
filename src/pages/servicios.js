import { Link } from "gatsby"
import { Crumbs, Layout, PageHead } from "../components/Layout"
import { JsonLd, Seo, useSite } from "../components/Seo"
import { breadcrumb, services } from "../data/site"

export default function Servicios() {
  return (
    <Layout>
      <div className="wrap page-wrap">
        <Crumbs items={[{ label: "Inicio", to: "/" }, { label: "Servicios" }]} />
        <PageHead
          eyebrow="Servicios"
          title="El encargo, con nombre y con límite."
          lead="Tres formatos. El plazo de abajo es una referencia para conversar: el compromiso queda en la propuesta, cuando ya sabemos qué hay que hacer."
        />
        {services.map((service, index) => (
          <article className="offer reveal" key={service.id} id={service.id}>
            <div>
              <span className="idx">{String(index + 1).padStart(2, "0")}</span>
              <h2>{service.name}</h2>
              <p className="for-whom">{service.forWhom}</p>
            </div>
            <div>
              <p className="summary">{service.summary}</p>
              <ul className="offer-list">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="excludes">{service.excludes}</p>
              <p className="timeframe">
                <strong>Plazo de referencia: </strong>
                {service.time}
              </p>
            </div>
          </article>
        ))}

        <section className="section reveal" aria-labelledby="cuidado">
          <div className="section-head">
            <h2 id="cuidado">Velocidad y buscadores, de fábrica</h2>
          </div>
          <div className="care reveal-stagger">
            <article className="panel reveal">
              <h3>Que cargue pronto</h3>
              <p>
                Cada página se publica ya armada. El visitante recibe HTML, no una pantalla en blanco mientras
                un programa la construye. Las fotos salen en el tamaño en que se muestran, y la tipografía viaja
                con el sitio.
              </p>
            </article>
            <article className="panel reveal">
              <h3>Que se pueda encontrar</h3>
              <p>
                Cada página tiene su título, su descripción y su dirección. Hay un mapa del sitio para Google,
                datos del negocio en un formato que los buscadores leen, y el texto está en la página desde el
                primer byte.
              </p>
            </article>
          </div>
          <p className="note reveal">
            Hablas conmigo, no con una cuenta de ventas. Partí en diseño web y después programé interfaces en
            serio, entre otros en BanChile Inversiones. La trayectoria completa está en el{" "}
            <a href="https://nachodiazcode.netlify.app/" target="_blank" rel="noreferrer">portafolio ↗</a>.
          </p>
          <p className="reveal">
            <Link className="button" to="/contacto">
              Pedir una propuesta
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  )
}

export function Head() {
  const site = useSite()
  return (
    <>
      <Seo
        title="Servicios"
        description="Landing, sitio de presentación o sitio editable. Alcance, plazo de referencia y qué queda a tu nombre."
        pathname="/servicios"
      />
      <JsonLd
        data={breadcrumb(site.siteUrl, [
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
    </>
  )
}
