import { Crumbs, Layout, PageHead } from "../components/Layout"
import { JsonLd, Seo, useSite } from "../components/Seo"
import { breadcrumb, email, services } from "../data/site"

export default function Contacto() {
  return (
    <Layout>
      <div className="wrap page-wrap">
        <Crumbs items={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]} />
        <div className="contact-layout">
          <PageHead
            eyebrow="Contacto"
            title="Cuéntame el negocio y qué tiene que lograr el sitio."
            lead="Te respondo en un día hábil. Si prefieres el correo directo, escribe a ignaciosergiodiaz@gmail.com."
          />
          <form
            className="form reveal"
            name="contacto"
            method="POST"
            action="/gracias"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contacto" />
            <input type="hidden" name="subject" value="Pedido de sitio web" />
            <p className="hp">
              <label>
                No llenar este campo
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <label>
              <span>Nombre</span>
              <input name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre o empresa" />
            </label>
            <label>
              <span>Correo</span>
              <input name="email" type="email" required autoComplete="email" placeholder="tu@correo.com" />
            </label>
            <label>
              <span>Negocio o proyecto</span>
              <input name="negocio" type="text" required autoComplete="organization" placeholder="Nombre del proyecto o rubro" />
            </label>
            <label>
              <span>Qué necesitas</span>
              <select name="tipo" defaultValue="Todavía no sé">
                {services.map((service) => (
                  <option key={service.id}>{service.name}</option>
                ))}
                <option>Todavía no sé</option>
              </select>
            </label>
            <label>
              <span>Mensaje</span>
              <textarea
                name="mensaje"
                required
                placeholder="Para qué serviría el sitio, si ya tienes dominio y cuándo lo necesitas..."
              />
            </label>
            <button className="button" type="submit">
              <span>Enviar mensaje</span>
              <span className="arrow-char" aria-hidden="true">→</span>
            </button>
            <p className="note">
              También puedes escribir directo a <a href={`mailto:${email}`}>{email}</a>. El formulario llega a mi bandeja de entrada inmediatamente.
            </p>
          </form>
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
        title="Contacto"
        description="Pide un sitio web a Ignacio Díaz. Respuesta en un día hábil, desde Santiago de Chile."
        pathname="/contacto"
      />
      <JsonLd
        data={breadcrumb(site.siteUrl, [
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ])}
      />
    </>
  )
}
