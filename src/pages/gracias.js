import { Link } from "gatsby"
import { Layout, PageHead } from "../components/Layout"
import { Seo } from "../components/Seo"
import { email } from "../data/site"

export default function Gracias() {
  return (
    <Layout>
      <div className="wrap page-wrap">
        <PageHead
          eyebrow="Mensaje enviado"
          title="Recibí tu nota."
          lead="Te escribo en un día hábil al correo que dejaste. Si es urgente, escríbeme directo."
        />
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <Link className="button" to="/">
            Volver al inicio
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export function Head() {
  return (
    <Seo
      title="Mensaje enviado"
      description="Tu mensaje llegó. Ignacio Díaz responde en un día hábil."
      pathname="/gracias"
      robots="noindex, nofollow"
    />
  )
}
