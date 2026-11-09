import { useEffect, useState } from "react"
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

function NavLinks({ on, className, onItemClick }) {
  return (
    <nav className={className} aria-label="Secciones">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          aria-current={on(link.href) ? "page" : undefined}
          onClick={onItemClick}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function Layout({ children }) {
  const { pathname } = useLocation()
  const on = (href) => pathname === href || pathname.startsWith(`${href}/`)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll detection for modern frosted header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Smooth scroll reveal observer
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

    const reveals = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )

    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="brand" aria-current={pathname === "/" ? "page" : undefined}>
            <span className="brand-mark" aria-hidden="true">Id</span>
            <span className="brand-name">Ignacio Díaz</span>
          </Link>
          <NavLinks on={on} className="desk-nav" />
          <Link to="/contacto" className="header-cta">
            Pedir un sitio
          </Link>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-active" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menú principal">
            <NavLinks on={on} className="mobile-nav" onItemClick={() => setMenuOpen(false)} />
            <div className="mobile-cta-wrap">
              <Link to="/contacto" className="button" onClick={() => setMenuOpen(false)}>
                Pedir un sitio
              </Link>
            </div>
          </div>
        )}
      </header>
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <p className="brand footer-brand">
              <span className="brand-mark" aria-hidden="true">Id</span>
              <span className="brand-name">Ignacio Díaz</span>
            </p>
            <p>Sitios web a medida, desde Santiago de Chile.</p>
          </div>
          <div>
            <p className="footer-label">Escribir</p>
            <a className="footer-mail" href={`mailto:${email}`}>{email}</a>
          </div>
          <div>
            <p className="footer-label">También</p>
            <a href={github} rel="me" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={portfolio} target="_blank" rel="noreferrer">Trayectoria y CV ↗</a>
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
    <header className="page-head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  )
}
