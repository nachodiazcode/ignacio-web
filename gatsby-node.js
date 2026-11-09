const fs = require("fs")
const path = require("path")
const { works } = require("./src/data/site")

exports.createPages = ({ actions }) => {
  works.forEach((work) => {
    actions.createPage({
      path: `/trabajos/${work.slug}`,
      component: require.resolve("./src/templates/work.js"),
      context: work,
    })
  })
}

exports.onPostBuild = () => {
  const siteUrl = (process.env.URL || "https://ignacio-diaz.netlify.app").replace(/\/$/, "")
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /gracias",
    "",
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
    "",
  ].join("\n")
  fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), body)
}
