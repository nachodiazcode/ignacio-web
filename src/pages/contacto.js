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
          className="form"
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
            Nombre
            <input name="nombre" type="text" required autoComplete="name" />
          </label>
          <label>
            Correo
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Negocio o proyecto
            <input name="negocio" type="text" required autoComplete="organization" />
          </label>
          <label>
            Qué necesitas
            <select name="tipo" defaultValue="Todavía no sé">
              {services.map((service) => (
                <option key={service.id}>{service.name}</option>
              ))}
              <option>Todavía no sé</option>
            </select>
          </label>
          <label>
            Mensaje
            <textarea name="mensaje" required placeholder="Para qué serviría el sitio, si ya tienes dominio y cuándo lo necesitas." />
          </label>
          <button className="button" type="submit">
            Enviar
          </button>
          <p className="note">
            También puedes escribir a <a href={`mailto:${email}`}>{email}</a>. El formulario llega al correo del
            sitio cuando está publicado en Netlify.
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
