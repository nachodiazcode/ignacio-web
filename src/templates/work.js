import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Crumbs, Layout } from "../components/Layout"
import { JsonLd, Seo, useSite } from "../components/Seo"
import { workSchema } from "../data/site"

export default function Work({ data, pageContext }) {
  const image = getImage(data.file)
  const work = pageContext

  return (
    <Layout>
      <div className="wrap page-wrap">
        <Crumbs
          items={[
            { label: "Inicio", to: "/" },
            { label: "Trabajos", to: "/trabajos" },
            { label: work.title },
          ]}
        />
        <header className="page-head">
          <p className="eyebrow">
            {work.kind} · {work.year}
          </p>
          <h1>{work.title}</h1>
          <p className="lead">{work.lead}</p>
        </header>
        <article className="detail">
          <div>
            {image ? <GatsbyImage className="frame" image={image} alt={work.imageAlt} /> : null}
            <h2>Qué quedó hecho</h2>
            <ul>
              {work.did.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="panel">
            <p className="kind">Ficha</p>
            <p>{work.summary}</p>
            {work.url ? (
              <p>
                <a href={work.url}>
                  {work.urlLabel}
                </a>
              </p>
            ) : (
              <p>Proyecto propio. Todavía no tiene una dirección pública.</p>
            )}
            <p>
              <Link to="/contacto">Encargar algo parecido</Link>
            </p>
          </aside>
        </article>
      </div>
    </Layout>
  )
}

export function Head({ pageContext }) {
  const site = useSite()
  return (
    <>
      <Seo title={pageContext.title} description={pageContext.summary} pathname={`/trabajos/${pageContext.slug}`} />
      <JsonLd data={workSchema(site.siteUrl, pageContext)} />
    </>
  )
}

export const query = graphql`
  query WorkImage($image: String!) {
    file(relativePath: { eq: $image }) {
      childImageSharp {
        gatsbyImageData(width: 1400, quality: 72, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`
