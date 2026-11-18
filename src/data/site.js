const email = "ignaciosergiodiaz@gmail.com"
const github = "https://github.com/nachodiazcode"
const portfolio = "https://nachodiazcode.netlify.app/"

const services = [
  {
    id: "landing",
    name: "Landing",
    forWhom: "Una oferta concreta: un local, un curso, una campaña, un lanzamiento.",
    summary: "Una sola página que explica la oferta y deja un camino claro para escribir o llamar.",
    includes: [
      "Mensaje, estructura y diseño de esa página",
      "Formulario de contacto",
      "Título, descripción y datos para buscadores",
      "Publicación en tu dominio",
    ],
    excludes: "No incluye un sitio de varias secciones ni un panel para editar solo.",
    time: "Cerca de dos semanas, si el texto ya está encaminado.",
  },
  {
    id: "presentacion",
    name: "Sitio de presentación",
    forWhom: "Un negocio, un colegio o un estudio que necesita explicar quién es y cómo lo contactan.",
    summary: "Varias páginas, con la misma voz, pensadas para leerse en el teléfono y encontrarse en Google.",
    includes: [
      "Inicio, servicios, trabajos o equipo, y contacto",
      "Diseño de la página principal antes de construir el resto",
      "SEO de base en cada página",
      "Publicación en tu dominio y medición simple de visitas",
    ],
    excludes: "El texto lo cambias conmigo. Si quieres editarlo tú, conviene el sitio editable.",
    time: "Entre tres y cinco semanas, según cuántas páginas y si el contenido ya existe.",
  },
  {
    id: "editable",
    name: "Sitio editable",
    forWhom: "Quien va a cambiar textos o fotos con cierta frecuencia y no quiere depender de un ticket por cada coma.",
    summary: "El sitio público queda separado de un panel. Tú editas. La página que ve la gente no se desarma.",
    includes: [
      "Lo mismo que el sitio de presentación",
      "Panel para textos e imágenes",
      "Una pasada juntos para que sepas cambiar lo cotidiano",
    ],
    excludes: "No es una tienda con inventario, pagos y despachos. Eso se cotiza aparte, si de verdad hace falta.",
    time: "Entre cinco y ocho semanas.",
  },
]

const works = [
  {
    slug: "colegio-london",
    title: "Colegio London",
    kind: "Sitio institucional",
    year: "2026",
    summary:
      "Sitio institucional para un centro educacional en La Florida, con admisión y SEO por ruta.",
    lead: "Un colegio necesitaba un sitio claro para familias: quiénes son, cómo es la admisión y cómo se ve en el teléfono de un apoderado.",
    did: [
      "Varias páginas, entre ellas inicio y admisión",
      "Maquetación para computador, tablet y teléfono",
      "Título, descripción y metadatos propios en cada ruta",
      "El sitio público separado de un panel WordPress para el contenido",
    ],
    url: "https://london-college-chile.netlify.app/",
    urlLabel: "Ver el sitio",
    image: "london-college-desktop.jpg",
    imageAlt: "Página de inicio del sitio del Colegio London en un computador",
  },
  {
    slug: "vocestoons",
    title: "VocesToons",
    kind: "Sitio de presentación",
    year: "2025",
    summary: "Sitio de presentación para una empresa de actuación de voz y producción de voces para animación.",
    lead: "Un estudio especializado en voces para animación necesitaba mostrar sus proyectos, explicar cómo trabaja y recibir consultas desde una sola visita.",
    did: [
      "Carrusel de producciones animadas en portada",
      "Secciones de quiénes somos, servicios, proceso y clientes",
      "Navegación directa y llamado a la acción visible desde el inicio",
      "Formulario de contacto para cotizar proyectos",
    ],
    url: "https://vocestoons.cl/",
    urlLabel: "Ver VocesToons",
    image: "vocestoons.jpg",
    imageAlt: "Página de inicio del sitio de VocesToons en un computador",
  },
]

const steps = [
  {
    title: "Me escribes",
    text: "El negocio, qué tendría que lograr el sitio y si ya tienes textos, fotos o dominio.",
  },
  {
    title: "Propuesta por escrito",
    text: "Alcance, plazo y precio. Si no calza, no empiezo. No hay letra chica después.",
  },
  {
    title: "La página principal primero",
    text: "La ves y la comentas antes de construir el resto. Ahí se nota si la voz es la tuya.",
  },
  {
    title: "Construcción y revisión",
    text: "Programo el sitio, lo revisamos juntos y corrijo lo que hayamos dejado fuera.",
  },
  {
    title: "Publicación a tu nombre",
    text: "Queda en tu dominio, con los accesos y una forma simple de ver visitas.",
  },
]

const faqs = [
  {
    q: "¿El sitio queda a mi nombre?",
    a: "Sí. Dominio, hosting y cuentas se crean a tu nombre. Si más adelante trabajas con otra persona, te llevas el sitio.",
  },
  {
    q: "¿Puedo traer los textos?",
    a: "Sí. Si todavía no los tienes, armo la estructura y un primer borrador para que lo corrijas. No publico un texto que no hayas visto.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de las páginas, de si hay panel editable y de si el contenido ya existe. No tengo un precio de vidriera. El número va en la propuesta, y no empiezo sin tu ok.",
  },
  {
    q: "¿Haces tiendas?",
    a: "Una vitrina corta se puede conversar. Una tienda con inventario, pagos y despachos es otro proyecto: lo digo antes de comprometerme.",
  },
  {
    q: "¿Trabajas sobre el sitio que ya tengo?",
    a: "Sí, cuando conviene arreglarlo. Si está más sano y más barato hacerlo de nuevo, también te lo digo.",
  },
  {
    q: "¿En cuánto respondes?",
    a: "En un día hábil. Si esa semana no puedo tomar el encargo, te lo digo en esa misma respuesta.",
  },
]

const guarantees = [
  { title: "HTML listo", text: "La página llega armada. El visitante no espera a que un servidor la fabrique." },
  { title: "Teléfono primero", text: "Se lee y se usa en la pantalla donde la mayoría va a abrirla." },
  { title: "Cada página, encontrable", text: "Título, descripción y dirección propios. El texto está en la página, no aparece después." },
  { title: "A tu nombre", text: "Dominio, hosting y accesos quedan contigo." },
]

function abs(siteUrl, pathname) {
  if (!pathname || pathname === "/") return `${siteUrl}/`
  return `${siteUrl}${pathname}`
}

function organization(siteUrl) {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#negocio`,
    name: "Ignacio Díaz",
    url: `${siteUrl}/`,
    image: `${siteUrl}/og.jpg`,
    email,
    description:
      "Diseño y desarrollo de sitios web para negocios, con alcance, plazo y precio por escrito.",
    areaServed: { "@type": "Country", name: "Chile" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    founder: {
      "@type": "Person",
      name: "Ignacio Díaz",
      jobTitle: "Diseñador y desarrollador web",
      email,
      sameAs: [github, portfolio],
    },
    knowsAbout: ["Diseño web", "Desarrollo web", "SEO técnico", "Sitios estáticos"],
  }
}

function homeSchema(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(siteUrl),
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#sitio`,
        url: `${siteUrl}/`,
        name: "Ignacio Díaz",
        description:
          "Diseño y desarrollo de sitios web para negocios. Alcance, plazo y precio por escrito.",
        inLanguage: "es-CL",
        publisher: { "@id": `${siteUrl}/#negocio` },
      },
      {
        "@type": "OfferCatalog",
        name: "Sitios web",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.summary,
            provider: { "@id": `${siteUrl}/#negocio` },
            areaServed: "CL",
          },
        })),
      },
    ],
  }
}

function breadcrumb(siteUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(siteUrl, item.path),
    })),
  }
}

function workSchema(siteUrl, work) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: work.title,
        description: work.summary,
        url: abs(siteUrl, `/trabajos/${work.slug}`),
        dateCreated: work.year,
        inLanguage: "es-CL",
        author: { "@id": `${siteUrl}/#negocio` },
        ...(work.url ? { sameAs: work.url } : {}),
      },
      breadcrumb(siteUrl, [
        { name: "Inicio", path: "/" },
        { name: "Trabajos", path: "/trabajos" },
        { name: work.title, path: `/trabajos/${work.slug}` },
      ]),
    ],
  }
}

module.exports = {
  email,
  github,
  portfolio,
  services,
  works,
  steps,
  faqs,
  guarantees,
  abs,
  homeSchema,
  breadcrumb,
  workSchema,
}
