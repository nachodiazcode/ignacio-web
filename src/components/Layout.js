import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import "@fontsource/newsreader/latin-400.css"
import "@fontsource/newsreader/latin-400-italic.css"
import "@fontsource/newsreader/latin-600.css"
import "@fontsource/public-sans/latin-400.css"
import "@fontsource/public-sans/latin-500.css"
import "@fontsource/public-sans/latin-600.css"
import "../styles/global.css"
import { email, github, portfolio } from "../data/site"

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/contacto", label: "Contacto" },
]

function NavLinks({ on, className }) {
  return (
    <nav className={className} aria-label="Secciones">
      {links.map((link) => (
        <Link key={link.href} to={link.href} aria-current={on(link.href) ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function Layout({ children }) {
  const { pathname } = useLocation()
  const on = (href) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-current={pathname === "/" ? "page" : undefined}>
            <span className="brand-mark" aria-hidden="true">Id</span>
            Ignacio Díaz
          </Link>
          <NavLinks on={on} className="desk-nav" />
          <Link to="/contacto" className="header-cta">
            Pedir un sitio
          </Link>
          <details className="nav-more">
            <summary>Menú</summary>
            <NavLinks on={on} className="mobile-nav" />
          </details>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <p className="brand footer-brand">
              <span className="brand-mark" aria-hidden="true">Id</span>
              Ignacio Díaz
            </p>
            <p>Sitios web a medida, desde Santiago.</p>
          </div>
          <div>
            <p className="footer-label">Escribir</p>
            <a className="footer-mail" href={`mailto:${email}`}>{email}</a>
          </div>
          <div>
            <p className="footer-label">También</p>
            <a href={github} rel="me">GitHub</a>
            <a href={portfolio}>Trayectoria y CV</a>
          </div>
        </div>
        <p className="legal">El alcance, el plazo y el precio quedan por escrito antes de empezar.</p>
      </footer>
    </>
  )
}

export function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Ruta">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label}>
              {last || !item.to ? <span>{item.label}</span> : <Link to={item.to}>{item.label}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHead({ eyebrow, title, lead }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  )
}
