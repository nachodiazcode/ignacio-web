import { Link } from "gatsby"
import { Layout, PageHead } from "../components/Layout"
import { Seo } from "../components/Seo"

export default function NotFound() {
  return (
    <Layout>
      <div className="wrap page-wrap">
        <PageHead
          eyebrow="404"
          title="Esa página no está."
          lead="El sitio sigue en el inicio, en los servicios y en los trabajos."
        />
        <p>
          <Link className="button" to="/">
            Ir al inicio
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export function Head() {
  return <Seo title="Página no encontrada" description="Esa dirección no existe en el sitio de Ignacio Díaz." pathname="/404" robots="noindex, nofollow" />
}
