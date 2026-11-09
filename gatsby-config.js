const siteUrl = (process.env.URL || "https://ignacio-diaz.netlify.app").replace(/\/$/, "")
const context = process.env.CONTEXT
const robots =
  context === "deploy-preview" || context === "branch-deploy"
    ? "noindex, nofollow"
    : "index, follow"

module.exports = {
  jsxRuntime: "automatic",
  trailingSlash: "never",
  siteMetadata: {
    title: "Ignacio Díaz",
    description:
      "Diseño y desarrollo de sitios web para negocios. Alcance, plazo y precio por escrito. Trabajo directo desde Santiago de Chile.",
    siteUrl,
    robots,
    author: "Ignacio Díaz",
    email: "ignaciosergiodiaz@gmail.com",
    locale: "es_CL",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/gracias", "/gracias/"],
      },
    },
  ],
}
