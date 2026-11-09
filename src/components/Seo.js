import { graphql, useStaticQuery } from "gatsby"
import { abs } from "../data/site"

export function useSite() {
  return useStaticQuery(graphql`
    query SiteMeta {
      site {
        siteMetadata {
          siteUrl
          title
          description
          robots
          locale
          email
        }
      }
    }
  `).site.siteMetadata
}

export function Seo({ title, description, pathname, robots }) {
  const site = useSite()
  const url = abs(site.siteUrl, pathname)
  const fullTitle = title.includes("Ignacio Díaz") ? title : `${title} · Ignacio Díaz`
  const desc = description || site.description
  const image = `${site.siteUrl}/og.jpg`

  return (
    <>
      <html lang="es-CL" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={robots || site.robots} />
      <meta name="author" content="Ignacio Díaz" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="es-CL" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:site_name" content="Ignacio Díaz" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sitio del Colegio London, un trabajo de Ignacio Díaz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <meta name="theme-color" content="#f3efe6" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  )
}

export function JsonLd({ data }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>
}
